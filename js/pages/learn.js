/* LinguaPath — Learn: CEFR curriculum (5 levels × 6 units × 5 lessons) and the lesson player. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;
  const CAT_ICON = { Vocabulary: 'cards', Grammar: 'list', Reading: 'book', Listening: 'ear', Speaking: 'chat', 'Everyday English': 'chat', Writing: 'pen', 'Review and assessment': 'test' };

  function tile(l) {
    const d = S.state.done[l.key];
    return '<a class="lesson-tile' + (d ? ' done' : '') + '" href="#/learn/lesson/' + l.id + '" aria-label="' + h(t('Lesson')) + ' ' + l.n + ': ' + h(l.title) + (d ? ', ' + h(t('completed')) : '') + '">' +
      (d ? '<span class="tick">' + icon('check') + '</span>' : '') +
      '<span class="cat">' + icon(CAT_ICON[l.category] || 'book') + h(t(l.category)) + '</span><span class="ttl">' + h(l.title) + '</span>' +
      '<span class="foot"><span>' + l.minutes + ' min</span><span>' + (d ? (d.best != null ? d.best + '%' : h(t('Done'))) : '') + '</span></span></a>';
  }

  function index(root, level) {
    level = S.LEVEL_ORDER.includes(level) ? level : S.state.profile.level;
    const lp = S.levelProgress(level);
    root.innerHTML = LP.pageHead('Learn', 'Follow the course step by step. Each unit has 5 lessons: words, grammar, reading or listening, speaking or writing, and a review.');
    const box = LP.ui.comp(root);
    const next = S.nextLesson();
    box.innerHTML = '<nav class="level-tabs" aria-label="' + h(t('Levels')) + '">' + LP.LEVELS.map(l => {
      const done = S.lessonsCompleted(l.id);
      return '<a class="level-tab' + (l.id === level ? ' on' : '') + '" href="#/learn/' + l.id + '"' + (l.id === level ? ' aria-current="page"' : '') + '><b>' + l.id + '</b><small>' + h(t(l.name)) + ' · ' + done + '/30</small></a>';
    }).join('') + '</nav>' +
      '<div class="card"><div class="row between"><div><h2 style="margin:0">' + level + ' · ' + h(t(LP.LEVELS.find(x => x.id === level).name)) + '</h2><p class="muted" style="margin:0">' + h(t(LP.LEVELS.find(x => x.id === level).desc)) + '</p></div>' +
      (next && next.level === level ? '<a class="btn primary" href="#/learn/lesson/' + next.id + '">' + h(t('Continue')) + ': ' + h(next.title) + '</a>' : '') + '</div>' +
      '<div class="grid g3" style="margin-top:14px">' + LP.ui.hbars([{ label: t('Lessons completed'), value: Math.round(lp.lessons * 100), cls: 'green' }]) + LP.ui.hbars([{ label: t('Vocabulary learned'), value: Math.round(lp.vocab * 100), cls: 'teal' }]) + LP.ui.hbars([{ label: t('Estimated progress'), value: lp.estimate }]) + '</div>' +
      '<p class="note" style="margin-top:10px">' + icon('info') + ' ' + h(t('Estimated progress combines lessons, several test results and vocabulary. It is a learning estimate, not an official CEFR result. All levels are open, so you can explore freely.')) + '</p></div>' +
      LP.UNITS.filter(u => u.level === level).map(u => {
        const ls = S.LESSONS.filter(l => l.unit === u.id);
        const done = ls.filter(S.lessonDone).length;
        return '<section class="unit card" aria-labelledby="u-' + u.id + '"><div class="unit-head"><div><h3 id="u-' + u.id + '">' + h(t('Unit')) + ' ' + u.n + ': ' + h(u.title) + '</h3><span class="muted small">' + h(u.topic) + '</span></div>' +
          '<span class="tag ' + (done === 5 ? 'done' : done ? 'warn' : '') + '">' + done + ' / 5 ' + h(t('done')) + '</span></div><div class="lessons">' + ls.map(tile).join('') + '</div></section>';
      }).join('');
  }

  function lessonPage(root, id) {
    const l = S.lessonById[id];
    if (!l) { root.innerHTML = LP.ui.empty('info', 'Lesson not found.', '', '<a class="btn primary" href="#/learn">' + h(t('Back to lessons')) + '</a>'); return; }
    const u = S.unitById[l.unit];
    const unitLessons = S.LESSONS.filter(x => x.unit === u.id);
    const gi = S.LESSONS.indexOf(l);
    const prev = S.LESSONS[gi - 1], next = S.LESSONS[gi + 1];
    const d = S.state.done[l.key];
    root.innerHTML = LP.pageHead(l.title, '', '', [['Learn', '#/learn/' + l.level], [l.level, '#/learn/' + l.level], [t('Unit') + ' ' + u.n + ': ' + u.title]]) +
      '<div class="meta" style="margin:-8px 0 12px"><span class="tag">' + icon(CAT_ICON[l.category]) + ' ' + h(t(l.category)) + '</span><span>' + icon('clock') + ' ' + l.minutes + ' min</span>' +
      '<span class="tag ' + (d ? 'done' : '') + '">' + h(t(d ? 'Completed' : 'Not started')) + (d && d.best != null ? ' · ' + h(t('best')) + ' ' + d.best + '%' : '') + '</span>' +
      '<span>' + h(t('Lesson')) + ' ' + l.n + ' / 5</span></div>' +
      '<div class="steps" aria-label="' + h(t('Lessons in this unit')) + '">' + unitLessons.map(x => '<a href="#/learn/lesson/' + x.id + '" style="text-decoration:none"><span class="' + (x.id === l.id ? 'on' : S.lessonDone(x) ? 'done' : '') + '">' + x.n + '. ' + h(t(x.category)) + '</span></a>').join('') + '</div>' +
      '<p class="muted">' + h(l.desc) + '</p>';
    const area = LP.ui.comp(root);
    const doneBox = LP.ui.comp(root);

    function complete(score) {
      S.markDone(l.key, score, l.title, l.skill === 'mixed' ? '' : l.skill);
      const nl = next && next.level === l.level ? next : next;
      doneBox.innerHTML = '<div class="card accent row between" role="status"><div><b>' + icon('check') + ' ' + h(t('Lesson complete!')) + '</b>' + (score != null ? ' ' + h(t('Score')) + ': ' + score + '%' : '') +
        '<p class="muted" style="margin:0">' + h(t(score != null && score < 60 ? 'Review the lesson and try again. You can do it!' : 'You are doing well! Keep going.')) + '</p></div>' +
        (nl ? '<a class="btn primary" href="#/learn/lesson/' + nl.id + '">' + h(t('Next lesson')) + ': ' + h(nl.title) + ' ' + icon('arrowR') + '</a>' : '') + '</div>';
    }
    function recommend(res) {
      if (res.score < 60) return { text: t('Review the lesson: read the explanations again and repeat the exercise.') };
      if (next) return { text: t('Continue with the next lesson') + ': ' + next.title, href: '#/learn/lesson/' + next.id, label: 'Next lesson' };
      return null;
    }
    const exit = () => LP.go('#/learn/' + l.level);
    switch (l.type) {
      case 'vocab': LP.comp.vocabLesson(area, l.ref, { onComplete: complete, recommend, onExit: exit }); break;
      case 'grammar': LP.comp.grammarLesson(area, l.ref, { onComplete: complete, recommend, onExit: exit, exitLabel: 'Back to lessons' }); break;
      case 'reading': case 'listening': LP.comp.text(area, l.ref, { onComplete: complete, onExit: exit, exitLabel: 'Back to lessons' }); break;
      case 'speaking': LP.comp.scenario(area, l.ref, { mode: 'guided', onComplete: complete, onExit: exit, exitLabel: 'Back to lessons' }); break;
      case 'writing': LP.comp.writing(area, l.ref, { onComplete: complete, onExit: exit, exitLabel: 'Back to lessons' }); break;
      case 'review': {
        const start = () => {
          area.innerHTML = '';
          const testId = 'unit-' + u.id;
          LP.quiz.Quiz(area, {
            title: l.title, questions: LP.gen.unitTest(u), mode: 'test', timeLimit: S.state.settings.timer ? 12 * 60 : 0,
            previous: () => S.state.tests.filter(x => x.id === testId),
            onFinish: res => {
              LP.vocabAfterQuiz(res);
              S.recordTest({ id: testId, title: 'Unit ' + u.n + ': ' + u.title, kind: 'unit', level: u.level, skill: 'mixed', score: res.score, correct: res.correct, total: res.total, weak: res.weak.map(w => w.label), skillScores: res.skillScores });
              complete(res.score);
            },
            recommend: res => LP.testRecommend(res, { level: u.level, unit: u.id }),
            retake: start, onExit: exit, exitLabel: 'Back to lessons'
          });
        };
        area.innerHTML = '<div class="card"><h2>' + h(t('Unit review test')) + '</h2><p>' + h(t('10 questions: vocabulary, grammar and a text from this unit.')) + ' ' + (S.state.settings.timer ? h(t('Time limit')) + ': 12 min.' : '') + '</p>' +
          '<p class="muted">' + h(t('You can move between questions with Previous and Next. You will see the results at the end.')) + '</p><button type="button" class="btn primary" data-act="go">' + h(t('Start the test')) + '</button></div>';
        LP.ui.on(area, { go: start });
        break;
      }
    }
    const navEl = LP.ui.comp(root);
    navEl.innerHTML = '<div class="row between" style="margin-top:22px">' + (prev ? '<a class="btn ghost" href="#/learn/lesson/' + prev.id + '">' + icon('arrowL') + ' ' + h(t('Previous lesson')) + '</a>' : '<span></span>') + (next ? '<a class="btn ghost" href="#/learn/lesson/' + next.id + '">' + h(t('Next lesson')) + ' ' + icon('arrowR') + '</a>' : '') + '</div>';
  }

  LP.pages.learn = function (root, parts) {
    if (parts[0] === 'lesson') return lessonPage(root, parts[1]);
    return index(root, parts[0]);
  };
})();
