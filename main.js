/* ═══════════════════════════════════════════
   MAIN — state, init, global setup
   ═══════════════════════════════════════════ */

/* ── Global state ── */
let lang = (function() {
  try { const v = localStorage.getItem('gdpr-lang'); return (v === 'de') ? 'de' : 'en'; }
  catch(_) { return 'en'; }
})();

let state = {};

/* ── Persistence ── */
function loadState() {
  try { const r = localStorage.getItem('gdpr-checklist'); state = r ? JSON.parse(r) : {}; }
  catch(_) { state = {}; }
}

function saveState() {
  try { localStorage.setItem('gdpr-checklist', JSON.stringify(state)); }
  catch(_) {}
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  loadState();
  render();
  updateCharCount();
});
