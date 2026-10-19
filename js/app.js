/* LinguaPath — app shell: navigation, routing, theme and reminders. */
window.LP = window.LP || {};
LP.pages = LP.pages || {};
LP.comp = LP.comp || {};

(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', mobile: 'Home' },
    { id: 'learn', label: 'Learn', icon: 'book', mobile: 'Learn' },
    { id: 'vocab', label: 'Vocabulary', icon: 'cards', mobile: 'Words' },
    { id: 'grammar', label: 'Grammar', icon: 'list' },
    { id: 'practice', label: 'Practice', icon: 'chat', mobile: 'Practice' },
    { id: 'tests', label: 'Tests', icon: 'test' },
    { id: 'goals', label: 'My Goals', icon: 'target' },
    { id: 'progress', label: 'Progress', icon: 'chart' },
    { id: 'settings', label: 'Settings', icon: 'gear' }
  ];
  const MOBILE_MAIN = ['dashboard', 'learn', 'vocab', 'practice'];

  LP.reducedMotion = function () {
    return S.state.settings.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  function applyTheme() {
    const st = S.state.settings;
    const dark = st.theme === 'dark' || (st.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.classList.toggle('reduced', !!st.reducedMotion);
    document.documentElement.lang = st.lang === 'sk' ? 'sk' : 'en';
  }
  LP.applyTheme = applyTheme;
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

  function renderShell() {
    const side = document.getElementById('side-nav');
    side.innerHTML = NAV.map(n => '<a href="#/' + n.id + '" data-nav="' + n.id + '">' + icon(n.icon) + '<span>' + h(t(n.label)) + '</span></a>').join('');
    const bottom = document.getElementById('bottom-nav');
    bottom.innerHTML = MOBILE_MAIN.map(id => { const n = NAV.find(x => x.id === id); return '<a href="#/' + id + '" data-nav="' + id + '">' + icon(n.icon) + '<span>' + h(t(n.mobile)) + '</span></a>'; }).join('') +
      '<button type="button" id="more-btn" aria-expanded="false" aria-controls="more-sheet">' + icon('more') + '<span>' + h(t('More')) + '</span></button>';
    const more = document.getElementById('more-sheet');
    more.innerHTML = NAV.filter(n => !MOBILE_MAIN.includes(n.id)).map(n => '<a href="#/' + n.id + '" data-nav="' + n.id + '">' + icon(n.icon) + '<span>' + h(t(n.label)) + '</span></a>').join('');
    document.getElementById('more-btn').addEventListener('click', e => {
      e.stopPropagation();
      const open = more.classList.toggle('open');
      e.currentTarget.setAttribute('aria-expanded', open);
      if (open) { const f = more.querySelector('a'); if (f) f.focus(); }
    });
    document.addEventListener('click', e => { if (!more.contains(e.target)) { more.classList.remove('open'); const b = document.getElementById('more-btn'); if (b) b.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && more.classList.contains('open')) { more.classList.remove('open'); document.getElementById('more-btn').focus(); } });
    document.querySelector('.skip-link').textContent = t('Skip to content');
    updateSideFoot();
  }

  function updateSideFoot() {
    const el = document.getElementById('side-foot');
    if (!el) return;
    const st = S.streak();
    const mins = Math.floor(S.secondsOn(S.dayKey()) / 60);
    el.innerHTML = '<div class="side-streak">' + icon('flame') + '<span>' + st + ' ' + h(t(st === 1 ? 'day streak' : 'days streak')) + '</span></div>' +
      '<div>' + h(t('Today')) + ': ' + mins + ' / ' + S.state.profile.dailyGoal + ' min</div>' +
      '<div class="muted small" style="margin-top:6px">' + h(t('Saved on this device only.')) + '</div>';
  }
  document.addEventListener('lp:tick', updateSideFoot);

  function setActive(page) {
    document.querySelectorAll('[data-nav]').forEach(a => {
      const on = a.dataset.nav === page;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const mb = document.getElementById('more-btn');
    if (mb) mb.classList.toggle('active', !MOBILE_MAIN.includes(page));
  }

  function reminderBanner() {
    const r = S.state.settings.reminder;
    if (!r || !r.enabled || !S.state.profile.onboarded) return '';
    const now = new Date();
    const [hh, mm] = (r.time || '18:00').split(':').map(Number);
    if (now.getHours() * 60 + now.getMinutes() < hh * 60 + mm) return '';
    if (S.state.reminderDismissed === S.dayKey()) return '';
    const mins = Math.floor(S.secondsOn(S.dayKey()) / 60);
    if (mins >= S.state.profile.dailyGoal) return '';
    return '<div class="banner" role="note">' + '<span>' + icon('clock') + ' ' + h(t('Reminder: you have studied')) + ' ' + mins + ' ' + h(t('of')) + ' ' + S.state.profile.dailyGoal + ' ' + h(t('minutes today. Ready for another lesson?')) + '</span>' +
      '<span class="row"><a class="btn small primary" href="#/learn">' + h(t('Start a Lesson')) + '</a><button type="button" class="btn small ghost" id="dismiss-rem">' + h(t('Not today')) + '</button></span></div>';
  }

  let currentPage = null;
  function route() {
    const hash = location.hash.replace(/^#\/?/, '') || 'dashboard';
    const parts = hash.split('/').map(decodeURIComponent);
    let page = parts[0];
    if (!LP.pages[page]) page = 'dashboard';
    LP.speech.stop();
    currentPage = page === 'self' ? 'progress' : page;
    setActive(currentPage);
    const main = document.getElementById('main');
    main.innerHTML = reminderBanner();
    const dr = document.getElementById('dismiss-rem');
    if (dr) dr.addEventListener('click', () => { S.state.reminderDismissed = S.dayKey(); S.save(); dr.closest('.banner').remove(); });
    const root = LP.ui.comp(main, 'page page-' + page);
    try {
      LP.pages[page](root, parts.slice(1));
    } catch (e) {
      console.error(e);
      root.innerHTML = LP.ui.empty('info', 'Something went wrong.', 'Please go back to the dashboard and try again.', '<a class="btn primary" href="#/dashboard">' + h(t('Go to Dashboard')) + '</a>');
    }
    const head = root.querySelector('h1');
    document.title = (head ? head.textContent + ' · ' : '') + 'LinguaPath';
    window.scrollTo(0, 0);
    if (route.initial) { route.initial = false; } else if (head) { head.setAttribute('tabindex', '-1'); head.focus({ preventScroll: true }); }
    document.getElementById('more-sheet').classList.remove('open');
    updateSideFoot();
  }
  route.initial = true;

  LP.go = function (hash) { if (location.hash === hash) route(); else location.hash = hash; };
  LP.rerender = route;
  LP.refreshShell = function () { renderShell(); setActive(currentPage); };

  // Page header helper used by all pages.
  LP.pageHead = function (title, sub, right, crumbs) {
    return (crumbs ? '<nav class="crumbs" aria-label="' + h(t('Breadcrumb')) + '">' + crumbs.map((c, i) => (i ? '<span aria-hidden="true">›</span>' : '') + (c[1] ? '<a href="' + c[1] + '">' + h(t(c[0])) + '</a>' : '<span>' + h(t(c[0])) + '</span>')).join('') + '</nav>' : '') +
      '<div class="page-head"><div><h1>' + h(t(title)) + '</h1>' + (sub ? '<p>' + h(t(sub)) + '</p>' : '') + '</div>' + (right || '') + '</div>';
  };

  function start() {
    applyTheme();
    renderShell();
    window.addEventListener('hashchange', route);
    if (!S.state.profile.onboarded) LP.onboarding.open(); else route();
    if (!S.storageOk) LP.ui.toast(t('Your browser is blocking local storage. Progress may not be saved.'), 'error');
    if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }
  LP.start = start;
  LP.route = route;
  document.addEventListener('DOMContentLoaded', start);
})();
