/* ═══════════════════════════════════════════
   SCANNER — runScan, runAIScan, handleFile, exportReport
   ═══════════════════════════════════════════ */

let lastScanData = null;
let scanMode = 'keyword'; // 'keyword' or 'ai'
const AI_PROXY_URL = 'http://localhost:8765/v1/messages';

function getApiKey() {
  try { return localStorage.getItem('gdpr-api-key') || ''; } catch(_) { return ''; }
}
function setApiKey(k) { try { localStorage.setItem('gdpr-api-key', k); } catch(_) {} }

function handleFile(input) {
  const file = input.files[0];
  if (!file) return;
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'pdf') {
    const reader = new FileReader();
    reader.onload = async function(e) {
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const typedarray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(function(item) { return item.str; }).join(' ') + '\n';
        }
        document.getElementById('scanInput').value = text.trim();
        updateCharCount();
      } catch(err) {
        alert((lang === 'de' ? 'PDF-Datei konnte nicht gelesen werden: ' : 'Could not read PDF file: ') + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  } else if (ext === 'docx') {
    const reader = new FileReader();
    reader.onload = async function(e) {
      try {
        const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
        document.getElementById('scanInput').value = result.value.trim();
        updateCharCount();
      } catch(err) {
        alert((lang === 'de' ? 'Word-Datei konnte nicht gelesen werden: ' : 'Could not read Word file: ') + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('scanInput').value = e.target.result;
      updateCharCount();
    };
    reader.onerror = function() {
      alert(lang === 'de' ? 'Datei konnte nicht gelesen werden.' : 'Could not read file.');
    };
    reader.readAsText(file);
  }
  input.value = '';
}

function updateCharCount() {
  const len = document.getElementById('scanInput').value.length;
  document.getElementById('charCount').textContent = len + ' ' + t('chars');
}

document.getElementById('scanInput').addEventListener('input', updateCharCount);

function scrollToSection(sectionId) {
  const el = document.querySelector('.section[data-section="' + sectionId + '"]');
  if (!el) return;
  el.classList.add('open');
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.style.transition = 'background 0.3s';
  el.style.background = 'rgba(0,0,0,0.03)';
  setTimeout(function() { el.style.background = ''; }, 1600);
}

/* ── Escape HTML ── */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ── Run Scanner ── */
function runScan() {
  const text = document.getElementById('scanInput').value.trim();
  const resultsDiv = document.getElementById('scanResults');

  if (!text) {
    resultsDiv.classList.remove('visible');
    alert(lang === 'de' ? 'Bitte Text einfügen oder Datei hochladen.' : 'Please paste text or upload a file first.');
    return;
  }

  // Collect all matches per pattern
  const patternResults = [];
  const allMatches = [];

  SCAN_PATTERNS.forEach(function(pattern) {
    const regex = pattern[lang] || pattern['en'];
    const matches = [];
    let m;
    const re = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
    while ((m = re.exec(text)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
      allMatches.push({ start: m.index, end: m.index + m[0].length, text: m[0], pattern: pattern });
      if (m.index === re.lastIndex) re.lastIndex++;
    }
    const status = matches.length >= 2 ? 'found' : (matches.length >= 1 ? 'partial' : 'missing');
    patternResults.push({
      pattern: pattern,
      status: status,
      matchCount: matches.length,
      sectionId: pattern.sectionId,
      itemIds: pattern.itemIds
    });
  });

  // Auto-check matched items
  const allSections = t('sections');
  const allItems = allSections.flatMap(function(s) { return s.items; });
  const matchedItemIds = new Set();

  patternResults.forEach(function(pr) {
    if (pr.status === 'found' || pr.status === 'partial') {
      pr.itemIds.forEach(function(itemId) {
        matchedItemIds.add(itemId);
        if (!state[itemId]) { state[itemId] = true; }
      });
    }
  });

  saveState();
  render();

  // ── Aggregate by section ──
  const sectionOrder = ['tech', 'basics', 'lawful', 'roles', 'rights', 'security', 'govern', 'supervision'];
  const numerals = ['I','II','III','IV','V','VI','VII','VIII'];
  const sectionMeta = {};

  sectionOrder.forEach(function(sid, idx) {
    sectionMeta[sid] = { id: sid, numeral: numerals[idx], title: '', totalMatches: 0, foundCount: 0, partialCount: 0, missingCount: 0, status: 'missing' };
  });

  allSections.forEach(function(sec) {
    if (sectionMeta[sec.id]) sectionMeta[sec.id].title = sec.title;
  });

  patternResults.forEach(function(pr) {
    const sm = sectionMeta[pr.sectionId];
    if (!sm) return;
    sm.totalMatches += pr.matchCount;
    if (pr.status === 'found') sm.foundCount++;
    else if (pr.status === 'partial') sm.partialCount++;
    else sm.missingCount++;
  });

  // Determine section-level status
  sectionOrder.forEach(function(sid) {
    const sm = sectionMeta[sid];
    if (sm.foundCount > 0) sm.status = 'found';
    else if (sm.partialCount > 0) sm.status = 'partial';
    else sm.status = 'missing';
  });

  // ── Store scan data for export ──
  lastScanData = {
    text: text,
    allMatches: allMatches,
    patternResults: patternResults,
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder,
    allSections: allSections,
    allItems: allItems,
    matchedItemIds: matchedItemIds
  };

  // ── Calculate score ──
  const matchedPct = Math.round((matchedItemIds.size / allItems.length) * 100);
  let tier;
  if (matchedPct >= 65) tier = 'high';
  else if (matchedPct >= 35) tier = 'mid';
  else tier = 'low';

  const matchLabel = lang === 'de' ? 'Treffer' : 'matches';
  const statusLabels = { found: t('scanFound'), partial: t('scanPartial'), missing: t('scanMissing') };

  // ── Build results HTML ──
  let html = '<div class="scan-summary">';
  html += '<div class="scan-score ' + tier + '">' + matchedPct + '%</div>';
  html += '<div class="scan-meta"><strong>' + t('scanResultsTitle') + '</strong><br>' +
    (lang === 'de'
      ? matchedItemIds.size + ' von ' + allItems.length + ' DSGVO-Anforderungen abgedeckt'
      : matchedItemIds.size + ' of ' + allItems.length + ' GDPR requirements covered') +
    '</div>';
  html += '</div>';

  // One row per section
  sectionOrder.forEach(function(sid) {
    const sm = sectionMeta[sid];
    if (!sm || !sm.title) return;
    const clickable = sm.status === 'found' || sm.status === 'partial';

    html += '<div class="scan-section-row' + (clickable ? ' clickable' : '') + '"' +
      (clickable ? ' onclick="scrollToSection(\'' + sm.id + '\')"' : '') + '>';
    html += '<span class="scan-cat-dot ' + sm.status + '"></span>';
    html += '<span class="scan-sec-numeral">' + sm.numeral + '</span>';
    html += '<span class="scan-sec-title">' + sm.title + '</span>';
    if (sm.totalMatches > 0) {
      html += '<span class="scan-cat-match">' + sm.totalMatches + ' ' + matchLabel + '</span>';
    } else {
      html += '<span class="scan-cat-status">' + statusLabels[sm.status] + '</span>';
    }
    if (clickable) html += '<span class="arrow">&rarr;</span>';
    html += '</div>';
  });

  // Export buttons
  html += '<div class="export-wrap">';
  html += '<button class="export-btn" onclick="exportReport(\'html\')">' + t('exportHtml') + '</button> ';
  html += '<button class="export-btn pdf" onclick="exportReport(\'pdf\')">' + t('exportPdf') + '</button>';
  html += '</div>';

  resultsDiv.innerHTML = html;
  resultsDiv.classList.add('visible');
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── AI-Powered GDPR Compliance Scan ── */
async function runAIScan() {
  const text = document.getElementById('scanInput').value.trim();
  const resultsDiv = document.getElementById('scanResults');

  if (!text) {
    resultsDiv.classList.remove('visible');
    alert(lang === 'de' ? 'Bitte Text einfügen oder Datei hochladen.' : 'Please paste text or upload a file first.');
    return;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    alert(lang === 'de'
      ? 'Bitte geben Sie zuerst Ihren Anthropic API-Key ein (Einstellungen unten).'
      : 'Please enter your Anthropic API key first (settings below).');
    return;
  }

  resultsDiv.innerHTML = '<div class="scan-summary"><div class="scan-meta" style="font-size:16px;padding:20px">' +
    (lang === 'de' ? 'KI-Analyse läuft… Bitte warten (kann bis zu 60 Sekunden dauern)…' : 'AI analysis in progress… Please wait (may take up to 60 seconds)…') +
    '<br><span style="font-size:13px;color:var(--muted)">' +
    (lang === 'de' ? 'Die Datenschutzerklärung wird gegen 47 GDPR-Anforderungen geprüft.' : 'Analyzing privacy policy against 47 GDPR requirements.') +
    '</span></div></div>';
  resultsDiv.classList.add('visible');
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Build the system prompt
  const allSections = t('sections');
  const sectionDescriptions = allSections.map(function(sec, i) {
    const items = sec.items.map(function(it) {
      return '    - [' + it.id + '] ' + (lang === 'de' ? it.title : it.title) + ': ' + (lang === 'de' ? it.desc : it.desc);
    }).join('\n');
    return 'Section ' + sec.id + ' "' + sec.title + '":\n' + items;
  }).join('\n\n');

  const systemPrompt = lang === 'de'
    ? 'Du bist ein DSGVO-Compliance-Analyst. Analysiere den folgenden Datenschutzerklärungstext und beurteile für jede der unten aufgeführten Anforderungen, ob der Text sie ERFÜLLT (found), TEILWEISE ERFÜLLT (partial) oder NICHT ERFÜLLT (missing). Gib für jede Bewertung konkrete Zitate aus dem Text als Beleg an. Antworte AUSSCHLIESSLICH mit einem gültigen JSON-Objekt (kein Markdown, kein Begleittext).'
    : 'You are a GDPR compliance analyst. Analyze the following privacy policy text and determine, for each requirement listed below, whether the text ADDRESSES it (found), PARTIALLY ADDRESSES it (partial), or does NOT ADDRESS it (missing). Provide specific quotes from the text as evidence for each assessment. Respond EXCLUSIVELY with a valid JSON object (no markdown, no surrounding text).';

  const userPrompt = (lang === 'de'
    ? 'Analysiere den folgenden Datenschutzerklärungstext gegen jede DSGVO-Anforderung.\n\n=== ZU PRÜFENDE ANFORDERUNGEN ===\n\n'
    : 'Analyze the following privacy policy text against each GDPR requirement.\n\n=== REQUIREMENTS TO CHECK ===\n\n')
    + sectionDescriptions + '\n\n'
    + (lang === 'de'
      ? '=== ZU ANALYSIERENDER TEXT ===\n\n'
      : '=== TEXT TO ANALYZE ===\n\n')
    + text + '\n\n'
    + (lang === 'de'
      ? 'Gib DEINE ANTWORT ALS JSON mit dieser Struktur (kein Markdown, kein Begleittext, NUR das JSON-Objekt):\n{"overallScore":<0-100 Zahl>,"sections":[{"id":"<section_id>","status":"found|partial|missing","matchedItems":["<item_id>",...],"evidence":["<Zitat aus Text>",...],"reasoning":"<kurze Begründung, 1-2 Sätze>"},...]}\n\nWICHTIG: Antworte AUSSCHLIESSLICH mit dem JSON. Kein ```json, kein "Here is the analysis", NUR das reine JSON-Objekt.'
      : 'Return YOUR ANSWER AS JSON with this structure (no markdown, no surrounding text, ONLY the JSON object):\n{"overallScore":<0-100 number>,"sections":[{"id":"<section_id>","status":"found|partial|missing","matchedItems":["<item_id>",...],"evidence":["<quote from text>",...],"reasoning":"<brief explanation, 1-2 sentences>"},...]}\n\nIMPORTANT: Respond EXCLUSIVELY with the JSON. No ```json, no "Here is the analysis", ONLY the raw JSON object.');

  try {
    const response = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 8192,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = 'API error ' + response.status;
      try {
        const errJson = JSON.parse(errText);
        if (errJson.error && errJson.error.message) errMsg = errJson.error.message;
      } catch(_) {}
      throw new Error(errMsg);
    }

    const data = await response.json();
    const content = data.content || [];
    const textResponse = content.filter(function(b) { return b.type === 'text'; }).map(function(b) { return b.text; }).join('');

    // Try to extract JSON from response (handle cases where model wraps in markdown)
    let jsonStr = textResponse.trim();
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];

    const analysis = JSON.parse(jsonStr);

    // Process results: update checklist state
    scanMode = 'ai';
    const allItems = allSections.flatMap(function(s) { return s.items; });
    const matchedItemIds = new Set();

    if (analysis.sections) {
      analysis.sections.forEach(function(sec) {
        if (sec.status === 'found' || sec.status === 'partial') {
          if (sec.matchedItems) {
            sec.matchedItems.forEach(function(id) { matchedItemIds.add(id); if (!state[id]) state[id] = true; });
          }
        }
      });
    }

    saveState();
    render();

    // Store scan data for export
    const sectionMeta = {};
    ['tech','basics','lawful','roles','rights','security','govern','supervision'].forEach(function(sid) { sectionMeta[sid] = {id:sid, status:'missing', totalMatches:0, title:''}; });
    allSections.forEach(function(sec) { if (sectionMeta[sec.id]) sectionMeta[sec.id].title = sec.title; });
    if (analysis.sections) {
      analysis.sections.forEach(function(sec) {
        if (sectionMeta[sec.id]) sectionMeta[sec.id].status = sec.status;
      });
    }

    lastScanData = {
      text: text,
      aiAnalysis: analysis,
      allMatches: [],
      patternResults: [],
      sectionMeta: sectionMeta,
      sectionOrder: ['tech','basics','lawful','roles','rights','security','govern','supervision'],
      allSections: allSections,
      allItems: allItems,
      matchedItemIds: matchedItemIds
    };

    // Build results display
    const matchedPct = Math.round((matchedItemIds.size / allItems.length) * 100);
    let tier;
    if (matchedPct >= 65) tier = 'high';
    else if (matchedPct >= 35) tier = 'mid';
    else tier = 'low';

    const statusLabels = { found: t('scanFound'), partial: t('scanPartial'), missing: t('scanMissing') };
    const numerals = ['I','II','III','IV','V','VI','VII','VIII'];

    let html = '<div class="scan-summary">';
    html += '<div class="scan-score ' + tier + '">' + matchedPct + '%</div>';
    html += '<div class="scan-meta"><strong>' + (lang === 'de' ? 'KI-Analyse Ergebnis' : 'AI Analysis Result') + '</strong><br>' +
      (lang === 'de'
        ? matchedItemIds.size + ' von ' + allItems.length + ' DSGVO-Anforderungen abgedeckt'
        : matchedItemIds.size + ' of ' + allItems.length + ' GDPR requirements covered') +
      ' <span style="font-size:11px;color:var(--muted)">(' + (lang === 'de' ? 'KI-gestützt' : 'AI-powered') + ')</span>' +
      '</div>';
    html += '</div>';

    const sm = lastScanData.sectionMeta;
    ['tech','basics','lawful','roles','rights','security','govern','supervision'].forEach(function(sid, i) {
      const s = sm[sid];
      if (!s || !s.title) return;
      // Count evidence from AI analysis
      let evidenceCount = 0;
      if (analysis.sections) {
        const as = analysis.sections.find(function(x) { return x.id === sid; });
        if (as && as.evidence) evidenceCount = as.evidence.length;
      }
      const clickable = s.status === 'found' || s.status === 'partial';
      html += '<div class="scan-section-row' + (clickable ? ' clickable' : '') + '"' +
        (clickable ? ' onclick="scrollToSection(\'' + s.id + '\')"' : '') + '>';
      html += '<span class="scan-cat-dot ' + s.status + '"></span>';
      html += '<span class="scan-sec-numeral">' + (numerals[i]||'') + '</span>';
      html += '<span class="scan-sec-title">' + s.title + '</span>';
      html += '<span class="scan-cat-match">' + evidenceCount + ' ' + (lang === 'de' ? 'Belege' : 'evidence') + '</span>';
      if (clickable) html += '<span class="arrow">&rarr;</span>';
      html += '</div>';
    });

    html += '<div class="export-wrap">';
    html += '<button class="export-btn" onclick="exportReport(\'html\')">' + t('exportHtml') + '</button> ';
    html += '<button class="export-btn pdf" onclick="exportReport(\'pdf\')">' + t('exportPdf') + '</button>';
    html += '</div>';

    resultsDiv.innerHTML = html;
    resultsDiv.classList.add('visible');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  } catch(err) {
    resultsDiv.innerHTML = '<div class="scan-summary"><div class="scan-meta" style="color:var(--red);padding:20px"><strong>' +
      (lang === 'de' ? 'KI-Analyse fehlgeschlagen' : 'AI Analysis Failed') + '</strong><br>' +
      escapeHtml(err.message || String(err)) + '<br><br><span style="font-size:12px;color:var(--muted)">' +
      (lang === 'de'
        ? 'Stellen Sie sicher, dass server.py läuft (python3 server.py) und Ihr API-Key gültig ist.'
        : 'Make sure server.py is running (python3 server.py) and your API key is valid.') +
      '</span></div></div>';
  }
}

/* ── Export Report (format: 'html' downloads file, 'pdf' opens print dialog) ── */
function exportReport(format) {
  if (!lastScanData) { alert(lang === 'de' ? 'Bitte zuerst einen Scan durchführen.' : 'Please run a scan first.'); return; }

  const d = lastScanData;
  const sectionOrder = d.sectionOrder;
  const sectionMeta = d.sectionMeta;
  const numerals = ['I','II','III','IV','V','VI','VII','VIII'];
  const isAI = scanMode === 'ai' && d.aiAnalysis;

  // Build highlighted text based on scan mode
  let spans = [];
  if (isAI && d.aiAnalysis && d.aiAnalysis.sections) {
    // AI mode: highlight evidence quotes from the analysis
    const allEvidence = [];
    d.aiAnalysis.sections.forEach(function(sec) {
      if (sec.evidence) {
        sec.evidence.forEach(function(quote) {
          if (quote && quote.length > 5) allEvidence.push({ text: quote, articleRef: sec.id, label: sec.id });
        });
      }
    });
    // Find each quote in text
    allEvidence.sort(function(a, b) { return a.text.length - b.text.length; }); // longest first for priority
    const usedRanges = [];
    allEvidence.forEach(function(ev) {
      let idx = d.text.indexOf(ev.text);
      if (idx === -1) {
        // Try finding a shorter substring
        const shortText = ev.text.slice(0, Math.floor(ev.text.length * 0.7));
        idx = d.text.indexOf(shortText);
        if (idx !== -1) ev.text = d.text.slice(idx, idx + shortText.length);
      }
      if (idx === -1) return;
      // Check overlap with existing marks
      const overlaps = usedRanges.some(function(r) { return idx < r.end && idx + ev.text.length > r.start; });
      if (!overlaps) {
        usedRanges.push({ start: idx, end: idx + ev.text.length });
        spans.push({ type: 'mark', text: ev.text, articleRef: ev.articleRef, label: ev.label });
      }
    });
    // Sort and fill gaps
    spans.sort(function(a, b) { return d.text.indexOf(a.text) - d.text.indexOf(b.text); });
    const filledSpans = [];
    let cursor = 0;
    spans.forEach(function(s) {
      const idx = d.text.indexOf(s.text, cursor);
      if (idx === -1) return;
      if (idx > cursor) filledSpans.push({ type: 'text', text: d.text.slice(cursor, idx) });
      filledSpans.push(s);
      cursor = idx + s.text.length;
    });
    if (cursor < d.text.length) filledSpans.push({ type: 'text', text: d.text.slice(cursor) });
    spans = filledSpans;
  } else {
    // Keyword mode: use regex matches
    const matches = d.allMatches.slice();
    matches.sort(function(a, b) { return a.start - b.start; });
    let cursor = 0;
    matches.forEach(function(m) {
      if (m.start >= cursor) {
        if (m.start > cursor) spans.push({ type: 'text', text: d.text.slice(cursor, m.start) });
        spans.push({ type: 'mark', text: d.text.slice(m.start, m.end), articleRef: m.pattern.articleRef, label: m.pattern.label[lang] || m.pattern.label['en'] });
        cursor = m.end;
      } else if (m.end > cursor) {
        const last = spans[spans.length - 1];
        if (last && last.type === 'mark') { last.text += d.text.slice(cursor, m.end); last.articleRef += '; ' + m.pattern.articleRef; }
        cursor = m.end;
      }
    });
    if (cursor < d.text.length) spans.push({ type: 'text', text: d.text.slice(cursor) });
  }

  // Build right column
  const rightSections = [];
  sectionOrder.forEach(function(sid) {
    const sm = sectionMeta[sid];
    if (!sm || !sm.title) return;
    if (sm.status === 'missing') return;

    if (isAI && d.aiAnalysis && d.aiAnalysis.sections) {
      const as = d.aiAnalysis.sections.find(function(x) { return x.id === sid; });
      if (as && (as.status === 'found' || as.status === 'partial')) {
        rightSections.push({
          id: sid, title: sm.title, numeral: sm.numeral, status: as.status,
          aiSection: as
        });
      }
    } else {
      const secPatterns = [];
      const seenRefs = {};
      d.patternResults.forEach(function(pr) {
        if (pr.sectionId === sid && (pr.status === 'found' || pr.status === 'partial')) {
          const key = pr.pattern.articleRef;
          if (!seenRefs[key]) { seenRefs[key] = true; secPatterns.push(pr); }
        }
      });
      if (secPatterns.length > 0) {
        rightSections.push({ id: sid, title: sm.title, numeral: sm.numeral, patterns: secPatterns, status: sm.status });
      }
    }
  });

  const matchedPct = Math.round((d.matchedItemIds.size / d.allItems.length) * 100);

  // Generate right column content based on scan mode
  let rightColumnHtml = '';
  rightSections.forEach(function(rs) {
    rightColumnHtml += '<div class="r-sec">';
    rightColumnHtml += '<div class="r-sec-header" style="background:' + (rs.status === 'found' ? '#3b7a3b' : '#c7852a') + ';color:#fff;padding:4px 10px;font-size:11px;font-family:monospace;letter-spacing:0.04em;margin-bottom:8px;">' + rs.numeral + ' ' + escapeHtml(rs.title) + '</div>';

    if (rs.aiSection) {
      // AI mode: show reasoning and evidence
      rightColumnHtml += '<div class="r-item">';
      rightColumnHtml += '<div style="font-size:13px;color:#1a1917;line-height:1.6;margin-bottom:8px">' + escapeHtml(rs.aiSection.reasoning || '') + '</div>';
      if (rs.aiSection.evidence && rs.aiSection.evidence.length > 0) {
        rightColumnHtml += '<div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px">' + (lang === 'de' ? 'Belege aus dem Text:' : 'Evidence from text:') + '</div>';
        rs.aiSection.evidence.forEach(function(ev) {
          rightColumnHtml += '<div class="r-evidence" style="background:#fffde7;border-left:3px solid #e6d200;padding:6px 10px;margin-bottom:4px;font-size:12px;color:#5c5a55;font-style:italic;line-height:1.5">' + escapeHtml(ev) + '</div>';
        });
      }
      if (rs.aiSection.matchedItems && rs.aiSection.matchedItems.length > 0) {
        rightColumnHtml += '<div style="margin-top:4px">';
        rs.aiSection.matchedItems.forEach(function(itemId) {
          var item = ITEM_MAP[itemId];
          if (item) {
            rightColumnHtml += '<div class="r-item-detail-export" style="padding:4px 0;font-size:12px"><strong>' + escapeHtml(item.title) + '</strong><br><span style="color:#8b8982">' + escapeHtml(item.desc) + '</span></div>';
          }
        });
        rightColumnHtml += '</div>';
      }
      rightColumnHtml += '</div>';
    } else if (rs.patterns) {
      // Keyword mode
      rs.patterns.forEach(function(pr) {
        var itemDescs = pr.itemIds.map(function(id) {
          var item = ITEM_MAP[id];
          return item ? '<strong>' + escapeHtml(item.title) + '</strong>: ' + escapeHtml(item.desc) : '';
        }).filter(Boolean).join('<br><br>');
        rightColumnHtml += '<div class="r-item">';
        rightColumnHtml += '<span class="r-art">' + escapeHtml(pr.pattern.articleRef) + '</span>';
        rightColumnHtml += '<span class="r-label" onclick="showDetail(\'' + pr.itemIds[0] + '\')">' + escapeHtml(pr.pattern.label[lang] || pr.pattern.label['en']) + '</span>';
        rightColumnHtml += '<div class="r-item-detail" id="r-' + pr.itemIds[0] + '">' + itemDescs + '</div>';
        rightColumnHtml += '</div>';
      });
    }
    rightColumnHtml += '</div>';
  });

  // Interactive JS for the generated report
  const reportJS = ''
    + 'function showDetail(id) {'
    + '  var el = document.getElementById("r-" + id);'
    + '  if (!el) return;'
    + '  var all = document.querySelectorAll(".r-item-detail");'
    + '  for (var i = 0; i < all.length; i++) { all[i].style.display = "none"; }'
    + '  el.style.display = "block";'
    + '  el.scrollIntoView({behavior:"smooth",block:"center"});'
    + '  el.style.background = "#fffde7";'
    + '  setTimeout(function(){ el.style.background = ""; }, 2000);'
    + '}';

  const reportHtml = '<!DOCTYPE html>\n<html lang="' + lang + '">\n<head>\n<meta charset="UTF-8">\n' +
    '<title>' + (lang === 'de' ? 'DSGVO Compliance Scan-Bericht' : 'GDPR Compliance Scan Report') + '</title>\n' +
    '<script>' + reportJS + '</' + 'script>\n' +
    '<style>\n' +
    '*{box-sizing:border-box;margin:0;padding:0}\n' +
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff;color:#1a1917;line-height:1.6}\n' +
    '.report-header{background:#1a1917;color:#faf9f5;padding:32px 40px;margin-bottom:32px}\n' +
    '.report-header h1{font-size:24px;margin-bottom:8px}\n' +
    '.report-header .score{font-size:56px;font-weight:700;color:' + (matchedPct >= 65 ? '#3b7a3b' : matchedPct >= 35 ? '#c7852a' : '#cd3b3b') + '}\n' +
    '.report-header .meta{font-size:14px;opacity:0.7;margin-top:4px}\n' +
    '.no-print{display:inline-block}\n' +
    '.report-body{display:flex;gap:0;padding:0 40px 40px;max-width:1240px;margin:0 auto}\n' +
    '.col-left{flex:0 0 62%;padding-right:28px;border-right:1px solid #e4e1da}\n' +
    '.col-left-inner{font-size:14px;line-height:1.9;white-space:pre-wrap;word-break:break-word}\n' +
    '.col-left-inner mark{background:#fff3b0;border-bottom:2px solid #e6d200;padding:1px 3px;color:#1a1917;cursor:pointer;position:relative;transition:background 0.15s}\n' +
    '.col-left-inner mark:hover{background:#ffe08a}\n' +
    '.col-left-inner mark::after{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:#1a1917;color:#faf9f5;font-size:11px;padding:5px 10px;white-space:nowrap;max-width:340px;pointer-events:none;opacity:0;transition:opacity 0.15s;z-index:50;border-radius:2px}\n' +
    '.col-left-inner mark:hover::after{opacity:1}\n' +
    '.col-right{flex:0 0 38%;padding-left:28px;font-size:13px;overflow-y:auto;max-height:80vh}\n' +
    '.col-right h3{font-size:16px;margin-bottom:16px;color:#1a1917;position:sticky;top:0;background:#fff;padding-bottom:8px;z-index:5}\n' +
    '.r-sec{margin-bottom:20px}\n' +
    '.r-sec-header{font-weight:600;border-radius:2px;margin-bottom:8px}\n' +
    '.r-item{padding:6px 0;border-bottom:1px solid #efede8;line-height:1.5}\n' +
    '.r-art{font-family:monospace;font-size:11px;color:#cd3b3b;font-weight:600;display:block}\n' +
    '.r-label{color:#5c5a55;font-size:12px;cursor:pointer}\n' +
    '.r-label:hover{color:#1a1917;text-decoration:underline}\n' +
    '.r-item-detail{display:none;padding:8px 10px;margin-top:4px;background:#faf9f5;border-left:3px solid #cd3b3b;font-size:12px;color:#5c5a55;line-height:1.6}\n' +
    '.r-item-detail strong{color:#1a1917}\n' +
    '.section-list{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0}\n' +
    '.section-chip{padding:6px 14px;border-radius:3px;font-size:12px;font-weight:600}\n' +
    '.section-chip.found{background:#d4edda;color:#155724}\n' +
    '.section-chip.partial{background:#fff3cd;color:#856404}\n' +
    '.section-chip.missing{background:#f8d7da;color:#721c24}\n' +
    'footer{padding:0 40px 40px;font-size:12px;color:#8b8982;text-align:center}\n' +
    '@media print{.no-print{display:none!important}.report-body{flex-direction:column}.col-left,.col-right{flex:1 1 auto;padding:0;border:none}.col-right{margin-top:20px;max-height:none}.col-left-inner mark::after{display:none}.r-item-detail{display:block!important}}\n' +
    '</style>\n</head>\n<body>\n' +
    '<div class="report-header">\n' +
    '<h1>' + (lang === 'de' ? 'DSGVO Compliance Scan-Bericht' : 'GDPR Compliance Scan Report') + '</h1>\n' +
    '<div class="score">' + matchedPct + '%</div>\n' +
    '<div class="meta">' + (lang === 'de'
      ? d.matchedItemIds.size + ' von ' + d.allItems.length + ' DSGVO-Anforderungen abgedeckt — ' + new Date().toISOString().slice(0,10)
      : d.matchedItemIds.size + ' of ' + d.allItems.length + ' GDPR requirements covered — ' + new Date().toISOString().slice(0,10)) + '</div>\n' +
    '<div class="section-list no-print">\n' +
    sectionOrder.map(function(sid, i) {
      const sm = sectionMeta[sid];
      if (!sm || !sm.title) return '';
      return '<span class="section-chip ' + sm.status + '">' + (numerals[i]||'') + ' ' + escapeHtml(sm.title) + '</span>';
    }).join('\n') +
    '</div>\n</div>\n' +
    '<div class="report-body">\n' +
    '<div class="col-left"><div class="col-left-inner">' +
    spans.map(function(s) {
      if (s.type === 'text') return escapeHtml(s.text);
      const refId = s.itemIds ? s.itemIds[0] : '';
      return '<mark onclick="showDetail(\'' + refId + '\')" data-tooltip="' + escapeHtml(s.articleRef) + '">' + escapeHtml(s.text) + '</mark>';
    }).join('') +
    '</div></div>\n' +
    '<div class="col-right"><h3 class="no-print">' + (lang === 'de' ? 'Zugeordnete Vorschriften' : 'Matched Regulations') +
    ' <span style="font-weight:400;font-size:11px;color:#8b8982">(' + (lang === 'de' ? 'anklicken für Details' : 'click for details') + ')</span></h3>\n' +
    rightSections.map(function(rs) {
      let secHtml = '<div class="r-sec">';
      secHtml += '<div class="r-sec-header" style="background:' + (rs.status === 'found' ? '#3b7a3b' : '#c7852a') + ';color:#fff;padding:4px 10px;font-size:11px;font-family:monospace;letter-spacing:0.04em;margin-bottom:8px;">' + rs.numeral + ' ' + escapeHtml(rs.title) + '</div>';
      rs.patterns.forEach(function(pr) {
        const itemDescs = pr.itemIds.map(function(id) {
          const item = ITEM_MAP[id];
          return item ? '<strong>' + escapeHtml(item.title) + '</strong>: ' + escapeHtml(item.desc) : '';
        }).filter(Boolean).join('<br><br>');
        secHtml += '<div class="r-item">';
        secHtml += '<span class="r-art">' + escapeHtml(pr.pattern.articleRef) + '</span>';
        secHtml += '<span class="r-label" onclick="showDetail(\'' + pr.itemIds[0] + '\')">' + escapeHtml(pr.pattern.label[lang] || pr.pattern.label['en']) + '</span>';
        secHtml += '<div class="r-item-detail" id="r-' + pr.itemIds[0] + '">' + itemDescs + '</div>';
        secHtml += '</div>';
      });
      secHtml += '</div>';
      return secHtml;
    }).join('\n') +
    '\n</div>\n</div>\n' +
    '<footer class="no-print">' + (lang === 'de'
      ? 'Generiert von DSGVO Compliance-Checkliste — Nur zu Informationszwecken, keine Rechtsberatung.'
      : 'Generated by GDPR Compliance Checklist — For informational purposes only, not legal advice.') + '</footer>\n' +
    '</body>\n</html>';

  if (format === 'pdf') {
    // Open in new tab and trigger print
    const win = window.open('', '_blank', 'width=1024,height=800');
    if (!win) { alert(lang === 'de' ? 'Bitte erlauben Sie Pop-ups für den PDF-Export.' : 'Please allow pop-ups for PDF export.'); return; }
    win.document.write(reportHtml);
    win.document.close();
    win.onload = function() { win.print(); };
  } else {
    // Download as HTML file
    const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (lang === 'de' ? 'DSGVO-Scan-Bericht-' : 'GDPR-Scan-Report-') + new Date().toISOString().slice(0,10) + '.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
