/* LinguaPath — Grammar: index by level and topic, explanations, examples, common mistakes and exercises. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  function lessonFor(gid) { return S.LESSONS.find(l => l.type === 'grammar' && l.ref === gid); }

  // Full explanation of one grammar topic (without the exercise).
  function explanation(g) {
    const showSk = S.state.settings.showSk;
    return '<section class="card"><h2>' + h(t('How we use it')) + '</h2><p class="q-text">' + h(g.use) + '</p>' +
      g.explain.map(p => '<p>' + h(p) + '</p>').join('') +
      '<button type="button" class="btn small ghost" data-act="g-sk" aria-expanded="' + showSk + '">' + icon('globe') + ' ' + h(t(showSk ? 'Hide Slovak explanation' : 'Show Slovak explanation')) + '</button>' +
      '<div class="sk-box" lang="sk"' + (showSk ? '' : ' hidden') + '><b>Slovensky:</b> ' + h(g.sk) + '</div></section>' +
      '<section class="card"><h2>' + h(t('Patterns')) + '</h2><dl class="pattern">' + g.patterns.map(p => '<dt>' + h(t(p[0])) + '</dt><dd>' + h(p[1]) + '</dd>').join('') + '</dl></section>' +
      '<div class="grid g2"><section class="card"><h2>' + h(t('Positive examples')) + '</h2><ul class="ex-list pos">' + g.positive.map(x => '<li><span>' + h(x) + '</span>' + LP.playBtn(x) + '</li>').join('') + '</ul></section>' +
      '<section class="card"><h2>' + h(t('Negative examples')) + '</h2><ul class="ex-list neg">' + g.negative.map(x => '<li><span>' + h(x) + '</span>' + LP.playBtn(x) + '</li>').join('') + '</ul></section></div>' +
      '<section class="card"><h2>' + h(t('Questions and answers')) + '</h2><div class="qa">' + g.qa.map(x => '<div><b>' + h(x[0]) + '</b><br>' + h(x[1]) + '</div>').join('') + '</div></section>' +
      '<section class="card"><h2>' + h(t('Common mistakes')) + '</h2>' + g.mistakes.map(m => '<div class="mistake"><span class="wrong" aria-label="' + h(t('Wrong')) + '">✗ ' + h(m[0]) + '</span><span class="right">✓ ' + h(m[1]) + '</span><span class="why">' + h(m[2]) + '</span></div>').join('') + '</section>';
  }
  function bindExplain(root) {
    return {
      'g-sk': b => { const box = b.nextElementSibling; box.hidden = !box.hidden; b.setAttribute('aria-expanded', !box.hidden); b.innerHTML = icon('globe') + ' ' + h(t(box.hidden ? 'Show Slovak explanation' : 'Hide Slovak explanation')); },
      say: b => LP.speech.speak(b.dataset.text)
    };
  }

  // Grammar lesson component (used by Learn and by the Grammar page).
  LP.comp.grammarLesson = function (parent, gid, opts) {
    opts = opts || {};
    const g = S.grammarById[gid];
    const root = LP.ui.comp(parent);
    root.innerHTML = explanation(g) + '<section class="card accent"><h2>' + h(t('Practice exercise')) + '</h2><p>' + h(t('Answer the questions. You will see the answer and an explanation after each one.')) + '</p><button type="button" class="btn primary" data-act="g-start">' + h(t('Start the exercise')) + ' ' + icon('arrowR') + '</button></section><div class="ex-area"></div>';
    const area = root.querySelector('.ex-area');
    function start() {
      area.innerHTML = '';
      const qs = g.exercise.map(q => Object.assign({}, q, { skill: 'grammar', topic: 'grammar:' + g.id, topicLabel: 'Grammar: ' + g.title }));
      LP.quiz.Quiz(area, {
        title: t('Exercise') + ': ' + g.title, questions: qs, mode: 'practice',
        onFinish: res => { if (opts.onComplete) opts.onComplete(res.score); },
        recommend: res => opts.recommend ? opts.recommend(res) : res.score < 75 ? { text: t('Read the explanation and the common mistakes again, then try once more.') } : { text: t('Great work! Try a grammar test for your level.'), href: '#/tests', label: 'Tests' },
        retake: start, onExit: opts.onExit, exitLabel: opts.exitLabel || 'Done'
      });
      area.scrollIntoView({ block: 'start' });
    }
    LP.ui.on(root, Object.assign(bindExplain(root), { 'g-start': b => { b.closest('section').hidden = true; start(); } }));
    return root;
  };

  function indexPage(root) {
    const done = S.LESSONS.filter(l => l.type === 'grammar' && S.lessonDone(l)).length;
    root.innerHTML = LP.pageHead('Grammar', 'Clear explanations with examples, common mistakes and practice. ' + done + ' of ' + LP.GRAMMAR.length + ' topics completed.');
    const box = LP.ui.comp(root);
    const lv = S.state.profile.level;
    box.innerHTML = S.LEVEL_ORDER.map(level => {
      const items = LP.GRAMMAR.filter(g => g.level === level);
      const topics = Array.from(new Set(items.map(g => g.topic)));
      return '<section class="section" aria-labelledby="gl-' + level + '"><div class="row between"><h2 id="gl-' + level + '">' + level + ' · ' + h(t(LP.LEVELS.find(x => x.id === level).name)) + (level === lv ? ' <span class="tag lv">' + h(t('Your level')) + '</span>' : '') + '</h2>' +
        '<span class="muted">' + items.filter(g => S.lessonDone(lessonFor(g.id))).length + ' / ' + items.length + '</span></div>' +
        '<p class="muted small">' + h(t('Topics')) + ': ' + topics.map(x => h(t(x))).join(', ') + '</p>' +
        '<div class="g-index">' + items.map(g => {
          const l = lessonFor(g.id); const d = S.state.done[l.key];
          return '<a class="g-item' + (d ? ' done' : '') + '" href="#/grammar/' + g.id + '"><div class="row between"><span class="tag">' + h(t(g.topic)) + '</span>' + (d ? '<span class="tag done">' + icon('check') + ' ' + h(t('Completed')) + (d.best != null ? ' · ' + d.best + '%' : '') + '</span>' : '') + '</div><b>' + h(g.title) + '</b><p>' + h(g.use) + '</p></a>';
        }).join('') + '</div></section>';
    }).join('');
  }

  function topicPage(root, gid) {
    const g = S.grammarById[gid];
    if (!g) { root.innerHTML = LP.ui.empty('info', 'Topic not found.', '', '<a class="btn primary" href="#/grammar">' + h(t('Grammar index')) + '</a>'); return; }
    const l = lessonFor(gid);
    const d = S.state.done[l.key];
    const idx = LP.GRAMMAR.indexOf(g);
    const prev = LP.GRAMMAR[idx - 1], next = LP.GRAMMAR[idx + 1];
    root.innerHTML = LP.pageHead(g.title, g.level + ' · ' + g.topic, '<div class="row">' + (d ? '<span class="tag done">' + icon('check') + ' ' + h(t('Completed')) + (d.best != null ? ' · ' + h(t('best')) + ' ' + d.best + '%' : '') + '</span>' : '') +
      '<button type="button" class="btn small" id="mark-done">' + icon(d ? 'x' : 'check') + ' ' + h(t(d ? 'Mark as not completed' : 'Mark as completed')) + '</button></div>', [['Grammar', '#/grammar'], [g.level], [g.title]]);
    LP.comp.grammarLesson(root, gid, {
      onComplete: score => { S.markDone(l.key, score, 'Grammar: ' + g.title, 'grammar'); },
      onExit: () => LP.go('#/grammar'), exitLabel: 'Back to grammar index'
    });
    const navEl = LP.ui.comp(root);
    navEl.innerHTML = '<div class="row between" style="margin-top:20px">' + (prev ? '<a class="btn ghost" href="#/grammar/' + prev.id + '">' + icon('arrowL') + ' ' + h(prev.title) + '</a>' : '<span></span>') + (next ? '<a class="btn ghost" href="#/grammar/' + next.id + '">' + h(next.title) + ' ' + icon('arrowR') + '</a>' : '') + '</div>';
    root.querySelector('#mark-done').addEventListener('click', () => {
      if (S.state.done[l.key]) { delete S.state.done[l.key]; S.save(); LP.ui.toast(t('Marked as not completed.')); }
      else { S.markDone(l.key, null, 'Grammar: ' + g.title, 'grammar'); LP.ui.toast(t('Marked as completed.')); }
      LP.rerender();
    });
  }

  LP.pages.grammar = function (root, parts) {
    if (parts[0]) return topicPage(root, parts[0]);
    return indexPage(root);
  };
})();
