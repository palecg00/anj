/* LinguaPath — Tests: catalogue, test runner, results history and the placement test. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  // Recommended next step after a test.
  LP.testRecommend = function (res, ctx) {
    ctx = ctx || {};
    const weak = res.weak[0];
    if (res.score < 60) {
      if (weak && /^Grammar: /.test(weak.label)) {
        const g = LP.GRAMMAR.find(x => 'Grammar: ' + x.title === weak.label);
        if (g) return { text: t('Review the grammar topic') + ' “' + g.title + '” ' + t('and do its exercise again.'), href: '#/grammar/' + g.id, label: 'Open grammar' };
      }
      if (weak && /^Vocabulary/.test(weak.label)) return { text: t('Review your difficult words with flashcards.'), href: '#/vocab/review', label: 'Words to Review' };
      if (ctx.unit) return { text: t('Review the lessons of this unit and take the test again.'), href: '#/learn/' + ctx.level, label: 'Go to lessons' };
      return { text: t('Review the lessons of this level and try again.'), href: '#/learn/' + (ctx.level || S.state.profile.level), label: 'Go to lessons' };
    }
    if (res.score < 75) return { text: t('Keep practicing. Focus on the areas to review above, then retake the test.'), href: weak && /^Grammar/.test(weak.label) ? '#/grammar' : '#/vocab/review', label: 'Practise' };
    const next = S.nextLesson();
    if (res.score >= 90 && ctx.level) {
      const lp = S.levelProgress(ctx.level);
      if (lp.estimate >= 75 && S.levelIdx(ctx.level) < 4) return { text: t('Excellent! Your estimated progress in') + ' ' + ctx.level + ' ' + t('is high. You could start the next level when you feel ready.'), href: '#/learn/' + S.LEVEL_ORDER[S.levelIdx(ctx.level) + 1], label: 'See the next level' };
    }
    return next ? { text: t('Great result! Continue with your next lesson') + ': ' + next.title, href: '#/learn/lesson/' + next.id, label: 'Continue Learning' } : { text: t('Great result! Try a test from a higher level.'), href: '#/tests', label: 'Tests' };
  };

  function history(id) { return S.state.tests.filter(x => x.id === id); }

  function index(root) {
    root.innerHTML = LP.pageHead('Tests', 'Check what you know. You can retake every test and compare your results.');
    const box = LP.ui.comp(root);
    const cat = LP.gen.catalogue();
    const lv = S.state.profile.level;
    const place = cat[0];
    const ph = history('placement');
    const recent = S.state.tests.slice(-8).reverse();
    function row(m) {
      const hist = history(m.id);
      const best = hist.length ? Math.max(...hist.map(x => x.score)) : null;
      const last = hist.length ? hist[hist.length - 1].score : null;
      return '<div class="rec"><div><b>' + h(m.title) + '</b><p>' + m.count + ' ' + h(t('questions')) + ' · ' + m.minutes + ' min · ' + h(t(m.desc)) + '</p>' +
        (hist.length ? '<p>' + h(t('Last')) + ': <b>' + last + '%</b> · ' + h(t('Best')) + ': <b>' + best + '%</b> · ' + hist.length + ' ' + h(t(hist.length === 1 ? 'attempt' : 'attempts')) + '</p>' : '') + '</div>' +
        '<a class="btn small ' + (hist.length ? '' : 'primary') + '" href="#/tests/run/' + m.id + '">' + h(t(hist.length ? 'Retake' : 'Start')) + '</a></div>';
    }
    let html = '<div class="grid g2"><section class="card accent"><h2>' + icon('target') + ' ' + h(t('Placement test')) + '</h2><p>' + h(t(place.desc)) + '</p>' +
      '<div class="disclaimer">' + icon('info') + '<span>' + h(t('The placement test gives an approximate learning recommendation. It is not an official CEFR certificate.')) + '</span></div>' +
      (ph.length ? '<p>' + h(t('Last result')) + ': <b>' + ph[ph.length - 1].score + '%</b> → ' + h(t('recommended level')) + ' <b>' + h(ph[ph.length - 1].placed || '') + '</b></p>' : '') +
      '<a class="btn primary" href="#/tests/run/placement">' + h(t(ph.length ? 'Retake the placement test' : 'Take the placement test')) + '</a></section>' +
      '<section class="card"><h2>' + h(t('Short test')) + '</h2><p>' + h(t('8 quick mixed questions from your level. Good for a five-minute check.')) + '</p><a class="btn" href="#/tests/quick">' + h(t('Take a short test')) + '</a>' +
      '<hr><h3>' + h(t('Scoring')) + '</h3><ul class="summary-list"><li><b>90–100%</b>: ' + h(t('Excellent')) + '</li><li><b>75–89%</b>: ' + h(t('Good')) + '</li><li><b>60–74%</b>: ' + h(t('Keep practicing')) + '</li><li><b>' + h(t('Below 60%')) + '</b>: ' + h(t('Review the lesson')) + '</li></ul></section></div>';
    html += S.LEVEL_ORDER.map(l => {
      const items = cat.filter(m => m.level === l);
      const skillTests = items.filter(m => ['vocabulary', 'grammar', 'reading', 'listening', 'level'].includes(m.kind));
      const unitTests = items.filter(m => m.kind === 'unit');
      return '<details class="card"' + (l === lv ? ' open' : '') + '><summary style="cursor:pointer"><h2 style="display:inline">' + l + ' · ' + h(t(LP.LEVELS.find(x => x.id === l).name)) + '</h2>' + (l === lv ? ' <span class="tag lv">' + h(t('Your level')) + '</span>' : '') + '</summary>' +
        '<h3 style="margin-top:14px">' + h(t('Skill tests and full review')) + '</h3><div class="rec-list">' + skillTests.map(row).join('') + '</div>' +
        '<h3 style="margin-top:16px">' + h(t('Unit tests')) + '</h3><div class="rec-list">' + unitTests.map(row).join('') + '</div></details>';
    }).join('');
    html += '<section class="card"><h2>' + h(t('Recent results')) + '</h2>' + (recent.length ? '<div class="table-wrap"><table class="table"><thead><tr><th>' + h(t('Test')) + '</th><th>' + h(t('Date')) + '</th><th>' + h(t('Score')) + '</th><th>' + h(t('Result')) + '</th></tr></thead><tbody>' +
      recent.map(r => '<tr><td>' + h(r.title) + '</td><td>' + LP.ui.fmtDate(r.date) + '</td><td>' + r.score + '% (' + r.correct + '/' + r.total + ')</td><td><span class="rating ' + LP.ui.rating(r.score).cls + '" style="font-size:.9rem">' + h(t(LP.ui.rating(r.score).label)) + '</span></td></tr>').join('') + '</tbody></table></div>'
      : '<p class="muted">' + h(t('No tests yet. Your results will appear here.')) + '</p>') + '</section>';
    box.innerHTML = html;
  }

  function quickTest(root) {
    const lv = S.state.profile.level;
    const units = LP.UNITS.filter(u => u.level === lv);
    const words = S.WORDS.filter(w => w.level === lv);
    const qs = LP.gen.vocabQuestions(LP.ui.sample(words, 6), 4, ['meaning', 'choose', 'fill'], words).concat(LP.gen.grammarQuestions(units.map(u => u.grammar), 4));
    run(root, { id: 'quick-' + lv, title: lv + ' ' + t('Short Test'), kind: 'quick', level: lv, skill: 'mixed', questions: LP.ui.shuffle(qs), timeLimit: 6 * 60 });
  }

  function run(root, test) {
    root.innerHTML = LP.pageHead(test.title, (test.questions.length) + ' ' + t('questions') + (S.state.settings.timer && test.timeLimit ? ' · ' + t('time limit') + ' ' + Math.round(test.timeLimit / 60) + ' min' : ''), '', [['Tests', '#/tests'], [test.title]]);
    const box = LP.ui.comp(root);
    const prev = history(test.id);
    box.innerHTML = '<div class="card"><h2>' + h(t('Before you start')) + '</h2><ul class="summary-list">' +
      '<li>' + h(t('Use Previous and Next to move between questions. You can change your answers.')) + '</li>' +
      '<li>' + h(t(S.state.settings.timer && test.timeLimit ? 'There is a time limit. The test finishes automatically when the time is up.' : 'There is no time limit. (You can turn the timer on in Settings.)')) + '</li>' +
      '<li>' + h(t('You will see your score, the correct answers and explanations at the end.')) + '</li></ul>' +
      (test.kind === 'placement' ? '<div class="disclaimer">' + icon('info') + '<span>' + h(t('This test gives an approximate recommendation, not an official CEFR certificate. Questions get more difficult. It is OK not to know the answers — just choose what you think.')) + '</span></div>' : '') +
      (prev.length ? '<p class="muted">' + h(t('Previous attempts')) + ': ' + prev.slice(-5).map(p => p.score + '%').join(', ') + '</p>' : '') +
      '<button type="button" class="btn primary" data-act="go">' + h(t('Start the test')) + '</button></div>';
    LP.ui.on(box, {
      go: () => {
        box.innerHTML = '';
        const fresh = test.kind === 'quick' ? test : (LP.gen.buildTest(test.id) || test);
        LP.quiz.Quiz(box, {
          questions: fresh.questions, mode: 'test', timeLimit: S.state.settings.timer ? fresh.timeLimit : 0,
          previous: () => history(test.id),
          onFinish: res => {
            LP.vocabAfterQuiz(res);
            const entry = { id: test.id, title: test.title, kind: test.kind, level: test.level, skill: test.skill, score: res.score, correct: res.correct, total: res.total, weak: res.weak.map(w => w.label), skillScores: res.skillScores };
            if (test.kind === 'placement') {
              const pl = LP.gen.placementLevel(res.answers);
              entry.placed = pl.level;
              placementResult(box, pl);
            }
            S.recordTest(entry);
            if (test.kind !== 'quick' && test.kind !== 'placement') S.markDone('test:' + test.id, res.score, test.title, test.skill === 'mixed' ? '' : test.skill);
          },
          recommend: res => test.kind === 'placement' ? null : LP.testRecommend(res, { level: test.level, unit: test.kind === 'unit' ? test.id.slice(5) : null }),
          retake: () => run(root, test), onExit: () => LP.go('#/tests'), exitLabel: 'All tests'
        });
      }
    });
  }

  function placementResult(box, pl) {
    const card = document.createElement('div');
    card.className = 'card accent';
    card.dataset.comp = '1';
    card.innerHTML = '<h2>' + h(t('Your recommended starting level')) + ': ' + pl.level + ' · ' + h(t(LP.LEVELS.find(l => l.id === pl.level).name)) + '</h2>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>' + h(t('Level')) + '</th><th>' + h(t('Correct')) + '</th></tr></thead><tbody>' + S.LEVEL_ORDER.map(l => '<tr><td>' + l + '</td><td>' + pl.per[l].right + ' / ' + pl.per[l].total + '</td></tr>').join('') + '</tbody></table></div>' +
      '<p class="note">' + h(t('This is an approximate recommendation based on 25 questions, not an official CEFR result. Your current level setting is')) + ' <b>' + S.state.profile.level + '</b>.</p>' +
      '<div class="row"><button type="button" class="btn primary" data-act="set">' + h(t('Use level')) + ' ' + pl.level + '</button><a class="btn" href="#/learn/' + pl.level + '">' + h(t('See the lessons')) + '</a></div>';
    setTimeout(() => { const results = box.querySelector('.results'); if (results) results.prepend(card); else box.prepend(card); }, 0);
    LP.ui.on(card, {
      set: () => {
        S.state.profile.level = pl.level; S.state.placement = { date: Date.now(), level: pl.level }; S.save();
        LP.ui.toast(t('Your level is now') + ' ' + pl.level + '.');
        LP.go('#/dashboard');
      }
    });
  }

  LP.pages.tests = function (root, parts) {
    if (parts[0] === 'quick') return quickTest(root);
    if (parts[0] === 'run') {
      const meta = LP.gen.catalogue().find(m => m.id === parts[1]);
      if (!meta) { root.innerHTML = LP.ui.empty('info', 'Test not found.', '', '<a class="btn primary" href="#/tests">' + h(t('All tests')) + '</a>'); return; }
      return run(root, Object.assign({ questions: new Array(meta.count), timeLimit: meta.minutes * 60 }, meta));
    }
    return index(root);
  };
})();
