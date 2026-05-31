/* ═══════════════════════════════════════════
   CHECKLIST — render, toggle, progress, modals
   ═══════════════════════════════════════════ */

let openSections = {};

function t(path) {
  const d = I18N[lang];
  if (path === 'sections') return d.sections;
  return d[path] || '';
}

/* ── Article Modal ── */
function parseArticleRefs(ref) {
  var parts = ref.split(/,\s*/);
  var result = [];
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i].trim();
    var rangeMatch = part.match(/^(.+?)(\d+)[–-](\d+)$/);
    if (rangeMatch) {
      var prefix = rangeMatch[1];
      var start = parseInt(rangeMatch[2], 10);
      var end = parseInt(rangeMatch[3], 10);
      for (var n = start; n <= end; n++) {
        result.push(prefix + n);
      }
    } else {
      result.push(part);
    }
  }
  return result;
}

function showArticle(artRef) {
  var entry = ARTICLES[artRef];
  if (entry) {
    document.getElementById('modalTitle').innerHTML = artRef.replace(/^Art\.\s*/, 'Art. ');
    document.getElementById('modalBody').innerHTML = entry[lang] || entry['en'];
    document.getElementById('modalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
    return;
  }

  var parts = parseArticleRefs(artRef);
  if (parts.length > 1) {
    var found = [];
    for (var i = 0; i < parts.length; i++) {
      var partKey = parts[i];
      var e = ARTICLES[partKey];
      if (!e && !/^Art\./.test(partKey)) {
        partKey = 'Art. ' + partKey;
        e = ARTICLES[partKey];
      }
      if (e) found.push({ key: partKey, text: e[lang] || e['en'] });
    }
    if (found.length > 0) {
      var title = found.map(function(f) { return f.key; }).join(', ');
      var body = found.map(function(f) {
        return '<h4 style="font-family:DM Serif Display,serif;font-size:16px;margin:16px 0 8px;color:var(--red)">' + f.key + '</h4>' + f.text;
      }).join('');
      document.getElementById('modalTitle').innerHTML = title;
      document.getElementById('modalBody').innerHTML = body;
      document.getElementById('modalOverlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

/* ── Language ── */
function setLang(l) {
  if (l === lang) return;
  lang = l;
  try { localStorage.setItem('gdpr-lang', lang); } catch(_) {}
  updateLangButtons();
  render();
}

function updateLangButtons() {
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');
  document.getElementById('btnDE').classList.toggle('active', lang === 'de');
  document.documentElement.lang = lang;
  document.title = t('pageTitle');
}

/* ── Render Checklist ── */
function render() {
  // Save current open section state
  var currentOpen = {};
  document.querySelectorAll('.section.open').forEach(function(el) { currentOpen[el.dataset.section] = true; });
  openSections = currentOpen;

  updateLangButtons();

  document.getElementById('mastheadTitle').innerHTML = t('mastheadTitle');
  document.getElementById('mastheadDesc').textContent = t('mastheadDesc');
  document.getElementById('progressLabel').textContent = t('progressLabel');
  document.getElementById('scannerTitle').textContent = t('scannerTitle');
  document.getElementById('scannerNote').textContent = t('scannerNote');
  document.getElementById('scanInput').placeholder = t('scanPlaceholder');
  document.getElementById('fileLabel').textContent = t('fileLabel');
  document.getElementById('scanBtn').textContent = t('scanBtn');
  document.getElementById('resetBtn').textContent = t('resetBtn');
  document.getElementById('disclaimer').textContent = t('disclaimer');

  const sections = t('sections');
  const container = document.getElementById('checklist');
  let html = '';
  const numerals = ['I','II','III','IV','V','VI','VII','VIII'];

  sections.forEach(function(sec, idx) {
    const doneCount = sec.items.filter(function(it) { return state[it.id]; }).length;
    const isOpen = openSections[sec.id];

    html += '<div class="section' + (isOpen ? ' open' : '') + '" data-section="' + sec.id + '">';
    html += '<div class="section-header" onclick="toggleSection(this)">';
    html += '<span class="sec-num">' + (numerals[idx] || '') + '</span>';
    html += '<span class="sec-title">' + sec.title + ' <span style="font-size:13px;color:var(--muted);font-family:\'DM Sans\',sans-serif;font-style:normal;">' + sec.sub + '</span></span>';
    html += '<span class="sec-badge">' + doneCount + '/' + sec.items.length + '</span>';
    html += '<span class="sec-toggle">+</span>';
    html += '</div>';

    html += '<div class="section-body">';
    sec.items.forEach(function(it) {
      const ck = state[it.id] ? ' checked' : '';
      html += '<div class="item" onclick="toggleItem(this)">';
      html += '<input type="checkbox" id="' + it.id + '"' + ck + '>';
      html += '<label for="' + it.id + '"></label>';
      html += '<div class="item-text">';
      html += '<div class="item-title">' + it.title + ' <span class="art-ref" onclick="event.stopPropagation();showArticle(\'' + it.art + '\')">' + it.art + '</span></div>';
      html += '<div class="item-desc">' + it.desc + '</div>';
      html += '</div></div>';
    });
    html += '</div></div>';
  });

  container.innerHTML = html;
  updateProgress();
}

function toggleSection(el) {
  el.parentElement.classList.toggle('open');
}

function toggleItem(el) {
  const cb = el.querySelector('input[type="checkbox"]');
  cb.checked = !cb.checked;
  state[cb.id] = cb.checked;
  saveState();
  render();
}

function updateProgress() {
  const sections = t('sections');
  const allIds = sections.flatMap(function(s) { return s.items.map(function(i) { return i.id; }); });
  const done = allIds.filter(function(id) { return state[id]; }).length;
  const pct = allIds.length ? Math.round((done / allIds.length) * 100) : 0;
  document.getElementById('pct').textContent = pct + '%';
  document.getElementById('progressFill').style.width = pct + '%';
}

function resetAll() {
  const msg = lang === 'de'
    ? 'Möchten Sie wirklich alle Einträge löschen? Dies kann nicht rückgängig gemacht werden.'
    : 'Are you sure you want to clear all entries? This cannot be undone.';
  if (!confirm(msg)) return;
  state = {};
  try { localStorage.removeItem('gdpr-checklist'); } catch(_) {}
  render();
}
