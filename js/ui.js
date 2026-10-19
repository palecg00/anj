/* LinguaPath — UI helpers: escaping, icons, dialogs, toasts and simple SVG charts. */
window.LP = window.LP || {};

(function () {
  const ui = {};

  ui.h = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  };
  ui.t = function (s) { return LP.t ? LP.t(s) : s; };

  ui.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  ui.sample = function (arr, n) { return ui.shuffle(arr).slice(0, n); };

  ui.fmtMinutes = function (sec) {
    const m = Math.round((sec || 0) / 60);
    if (m < 60) return m + ' min';
    const h = Math.floor(m / 60), r = m % 60;
    return h + ' h' + (r ? ' ' + r + ' min' : '');
  };
  ui.fmtDate = function (ts) {
    const d = new Date(ts);
    return d.toLocaleDateString(LP.store.state.settings.lang === 'sk' ? 'sk-SK' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  ui.rating = function (pct) {
    if (pct >= 90) return { label: 'Excellent', cls: 'excellent' };
    if (pct >= 75) return { label: 'Good', cls: 'good' };
    if (pct >= 60) return { label: 'Keep practicing', cls: 'ok' };
    return { label: 'Review the lesson', cls: 'low' };
  };

  /* ---------------- icons (simple stroke icons) ---------------- */
  const P = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13 7l4 4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    test: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-5M12 16V8M16 16v-8"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    play: '<path d="M7 4l13 8-13 8V4z"/>',
    pause: '<path d="M7 4h4v16H7zM14 4h4v16h-4z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
    volume: '<path d="M4 9h4l5-4v14l-5-4H4V9z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    repeat: '<path d="M4 12a8 8 0 0 1 14-5l2 2"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M4 20v-5h5"/>',
    star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3z"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-6 1 1 2 2 2 4 1-2 1-5 1-8z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrowL: '<path d="M15 5l-7 7 7 7"/>',
    arrowR: '<path d="M9 5l7 7-7 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    upload: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
    lightbulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z"/>',
    heart: '<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
    ear: '<path d="M7 15a6 6 0 1 1 10-4c0 3-3 4-3 7a3 3 0 0 1-5 2"/><path d="M10 11a2 2 0 1 1 4 0"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H4a4 4 0 0 0 4 4M16 6h4a4 4 0 0 1-4 4M12 13v4M8 21h8M9 17h6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14a5 5 0 0 0 8 0M9 9.5v.5M15 9.5v.5"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'
  };
  ui.icon = function (name, cls) {
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (P[name] || P.info) + '</svg>';
  };

  /* ---------------- events ---------------- */
  // Delegated click handling scoped to one component root (data-comp).
  ui.on = function (root, handlers) {
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b || !root.contains(b)) return;
      if (b.closest('[data-comp]') !== root) return;
      const fn = handlers[b.dataset.act];
      if (fn) { fn(b, e); }
    });
  };
  ui.comp = function (parent, cls) {
    const el = document.createElement('div');
    el.dataset.comp = '1';
    if (cls) el.className = cls;
    parent.appendChild(el);
    return el;
  };

  /* ---------------- toasts ---------------- */
  ui.toast = function (msg, type) {
    const wrap = document.getElementById('toasts');
    const el = document.createElement('div');
    el.className = 'toast ' + (type || '');
    el.setAttribute('role', 'status');
    el.innerHTML = ui.icon(type === 'error' ? 'info' : 'check') + '<span>' + ui.h(msg) + '</span>';
    wrap.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 2800);
  };

  /* ---------------- modal dialogs ---------------- */
  let lastFocus = null;
  ui.modal = function (opts) {
    // opts: { title, body (html), actions: [{label, cls, value}], onClose(value) }
    return new Promise(resolve => {
      lastFocus = document.activeElement;
      const back = document.createElement('div');
      back.className = 'modal-back';
      back.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<h2 id="modal-title">' + ui.h(opts.title) + '</h2><div class="modal-body">' + (opts.body || '') + '</div>' +
        '<div class="modal-actions">' + (opts.actions || [{ label: 'OK', cls: 'primary', value: true }]).map((a, i) =>
          '<button type="button" class="btn ' + (a.cls || '') + '" data-i="' + i + '">' + ui.h(ui.t(a.label)) + '</button>').join('') + '</div></div>';
      document.body.appendChild(back);
      const modal = back.querySelector('.modal');
      const close = v => { back.remove(); document.removeEventListener('keydown', key); if (lastFocus) lastFocus.focus(); resolve(v); };
      const key = e => {
        if (e.key === 'Escape') close(false);
        if (e.key === 'Tab') {
          const f = modal.querySelectorAll('button, input, select, textarea, [href]');
          if (!f.length) return;
          if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
          else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
        }
      };
      document.addEventListener('keydown', key);
      back.addEventListener('click', e => { if (e.target === back) close(false); });
      modal.querySelectorAll('.modal-actions button').forEach(b => b.addEventListener('click', () => {
        const a = opts.actions ? opts.actions[+b.dataset.i] : { value: true };
        if (opts.collect && a.value) close(opts.collect(modal)); else close(a.value);
      }));
      const first = modal.querySelector('input, select, textarea') || modal.querySelector('.modal-actions .primary, .modal-actions .danger') || modal.querySelector('button');
      if (first) first.focus();
    });
  };
  ui.confirm = function (title, body, okLabel, danger) {
    return ui.modal({ title: ui.t(title), body: '<p>' + ui.h(ui.t(body)) + '</p>', actions: [{ label: 'Cancel', value: false }, { label: okLabel || 'OK', cls: danger ? 'danger' : 'primary', value: true }] });
  };

  /* ---------------- charts ---------------- */
  ui.ring = function (value, max, opts) {
    opts = opts || {};
    const size = opts.size || 132, stroke = opts.stroke || 12, r = (size - stroke) / 2, c = 2 * Math.PI * r;
    const pct = max ? Math.max(0, Math.min(1, value / max)) : 0;
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' + ui.h(opts.label || Math.round(pct * 100) + '%') + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" class="ring-bg" stroke-width="' + stroke + '" fill="none"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" class="ring-fg ' + (pct >= 1 ? 'full' : '') + '" stroke-width="' + stroke + '" fill="none" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - pct)).toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' +
      '<text x="50%" y="' + (opts.sub ? '46%' : '50%') + '" text-anchor="middle" dominant-baseline="middle" class="ring-text">' + ui.h(opts.center != null ? opts.center : Math.round(pct * 100) + '%') + '</text>' +
      (opts.sub ? '<text x="50%" y="64%" text-anchor="middle" class="ring-sub">' + ui.h(opts.sub) + '</text>' : '') + '</svg>';
  };

  // Vertical bar chart. data: [{label, value, title, highlight}]
  ui.bars = function (data, opts) {
    opts = opts || {};
    const w = opts.width || 520, h = opts.height || 180, pad = 28, top = 14;
    const max = Math.max(opts.max || 0, ...data.map(d => d.value), 1);
    const bw = (w - pad) / data.length;
    let s = '<svg class="bars" viewBox="0 0 ' + w + ' ' + (h + 22) + '" role="img" aria-label="' + ui.h(opts.label || 'Chart') + '" preserveAspectRatio="xMidYMid meet">';
    if (opts.goal) {
      const gy = top + (h - top) * (1 - Math.min(opts.goal, max) / max);
      s += '<line x1="' + pad + '" x2="' + w + '" y1="' + gy + '" y2="' + gy + '" class="goal-line"/><text x="' + (w - 2) + '" y="' + (gy - 4) + '" text-anchor="end" class="chart-note">' + ui.h(opts.goalLabel || 'goal') + '</text>';
    }
    s += '<line x1="' + pad + '" x2="' + w + '" y1="' + h + '" y2="' + h + '" class="axis"/>';
    data.forEach((d, i) => {
      const bh = (h - top) * (d.value / max);
      const x = pad + i * bw + bw * 0.18, bwid = bw * 0.64;
      s += '<g><title>' + ui.h(d.title || (d.label + ': ' + d.value)) + '</title>' +
        '<rect x="' + x.toFixed(1) + '" y="' + (h - bh).toFixed(1) + '" width="' + bwid.toFixed(1) + '" height="' + Math.max(bh, d.value ? 2 : 0).toFixed(1) + '" rx="3" class="bar ' + (d.highlight ? 'hl' : '') + (d.cls ? ' ' + d.cls : '') + '"/>' +
        (d.value && opts.showValues !== false ? '<text x="' + (x + bwid / 2).toFixed(1) + '" y="' + (h - bh - 4).toFixed(1) + '" text-anchor="middle" class="bar-val">' + ui.h(d.display != null ? d.display : d.value) + '</text>' : '') +
        '<text x="' + (x + bwid / 2).toFixed(1) + '" y="' + (h + 16) + '" text-anchor="middle" class="bar-label">' + ui.h(d.label) + '</text></g>';
    });
    return s + '</svg>';
  };

  // Horizontal progress bars. items: [{label, value(0-100), note}]
  ui.hbars = function (items) {
    return '<div class="hbars">' + items.map(it =>
      '<div class="hbar"><div class="hbar-head"><span>' + ui.h(it.label) + '</span><span class="muted">' + ui.h(it.note != null ? it.note : (it.value == null ? '—' : it.value + '%')) + '</span></div>' +
      '<div class="progress" role="progressbar" aria-label="' + ui.h(it.label) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + (it.value || 0) + '"><span class="' + (it.cls || '') + '" style="width:' + Math.max(0, Math.min(100, it.value || 0)) + '%"></span></div></div>').join('') + '</div>';
  };

  // Radar chart. axes: [labels], series: [{values: [0..max], cls, label}]
  ui.radar = function (axes, series, opts) {
    opts = opts || {};
    const size = opts.size || 300, cx = size / 2, cy = size / 2 + 4, R = size / 2 - 48, max = opts.max || 5;
    const pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / axes.length; return [cx + Math.cos(a) * R * v / max, cy + Math.sin(a) * R * v / max]; };
    let s = '<svg class="radar" viewBox="0 0 ' + size + ' ' + (size + 8) + '" role="img" aria-label="' + ui.h(opts.label || 'Skill chart') + '">';
    for (let l = 1; l <= max; l++) {
      s += '<polygon class="radar-grid" points="' + axes.map((_, i) => pt(i, l).map(n => n.toFixed(1)).join(',')).join(' ') + '"/>';
    }
    axes.forEach((a, i) => {
      const [x, y] = pt(i, max); const [lx, ly] = pt(i, max + 0.9);
      s += '<line class="radar-axis" x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>' +
        '<text class="radar-label" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle">' + ui.h(a) + '</text>';
    });
    series.forEach(se => {
      s += '<polygon class="radar-area ' + (se.cls || '') + '" points="' + se.values.map((v, i) => pt(i, v || 0).map(n => n.toFixed(1)).join(',')).join(' ') + '"><title>' + ui.h(se.label || '') + '</title></polygon>';
      se.values.forEach((v, i) => { const [x, y] = pt(i, v || 0); s += '<circle class="radar-dot ' + (se.cls || '') + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3"/>'; });
    });
    return s + '</svg>';
  };

  // Line chart. series: [{values: [], cls, label}], labels: []
  ui.line = function (labels, series, opts) {
    opts = opts || {};
    const w = opts.width || 520, h = opts.height || 180, pl = 30, pb = 22, pt = 10, max = opts.max || 100;
    const x = i => pl + (labels.length < 2 ? (w - pl) / 2 : i * (w - pl - 10) / (labels.length - 1));
    const y = v => pt + (h - pt - pb) * (1 - v / max);
    let s = '<svg class="linechart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + ui.h(opts.label || 'Chart') + '">';
    [0, max / 2, max].forEach(v => { s += '<line class="gridline" x1="' + pl + '" x2="' + w + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="bar-label" x="' + (pl - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>'; });
    labels.forEach((l, i) => { if (labels.length <= 8 || i % Math.ceil(labels.length / 8) === 0) s += '<text class="bar-label" x="' + x(i) + '" y="' + (h - 4) + '" text-anchor="middle">' + ui.h(l) + '</text>'; });
    series.forEach(se => {
      const pts = se.values.map((v, i) => v == null ? null : [x(i), y(v)]).filter(Boolean);
      if (pts.length > 1) s += '<polyline class="line ' + (se.cls || '') + '" points="' + pts.map(p => p.join(',')).join(' ') + '"/>';
      pts.forEach(p => { s += '<circle class="line-dot ' + (se.cls || '') + '" cx="' + p[0] + '" cy="' + p[1] + '" r="3.5"><title>' + ui.h(se.label || '') + '</title></circle>'; });
    });
    return s + '</svg>';
  };

  ui.empty = function (icon, title, text, action) {
    return '<div class="empty">' + ui.icon(icon || 'sparkle') + '<h3>' + ui.h(ui.t(title)) + '</h3>' + (text ? '<p>' + ui.h(ui.t(text)) + '</p>' : '') + (action || '') + '</div>';
  };

  ui.skillName = function (id) {
    const s = LP.SKILLS.find(x => x.id === id);
    return s ? ui.t(s.name) : id === 'mixed' ? ui.t('Mixed skills') : id;
  };

  ui.download = function (filename, text) {
    const blob = new Blob([text], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  LP.ui = ui;
})();
