/* LinguaPath — Progress analytics, weekly summary, achievements and self-assessment. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  function achievements() {
    const st = S.state;
    const lessons = S.lessonsCompleted();
    const words = S.learnedCount();
    const tests = st.tests.filter(x => x.kind !== 'placement');
    const unitsDone = LP.UNITS.filter(u => S.LESSONS.filter(l => l.unit === u.id).every(S.lessonDone)).length;
    const list = [
      ['First step', 'Complete your first lesson.', lessons >= 1],
      ['Getting started', 'Complete 10 lessons.', lessons >= 10],
      ['Dedicated learner', 'Complete 50 lessons.', lessons >= 50],
      ['Unit finished', 'Complete all 5 lessons in a unit.', unitsDone >= 1],
      ['Word collector', 'Learn 25 words.', words >= 25],
      ['Word master', 'Learn 100 words.', words >= 100],
      ['Habit builder', 'Study 3 days in a row.', S.bestStreak() >= 3],
      ['One week strong', 'Study 7 days in a row.', S.bestStreak() >= 7],
      ['Test taker', 'Finish your first test.', tests.length >= 1],
      ['High score', 'Score 90% or more in a test.', tests.some(x => x.score >= 90)],
      ['Conversation starter', 'Finish a conversation.', Object.keys(st.done).some(k => k.startsWith('scenario:'))],
      ['Writer', 'Finish a writing task.', Object.keys(st.done).some(k => k.startsWith('writing:'))],
      ['Good listener', 'Finish a listening activity.', Object.keys(st.done).some(k => k.startsWith('text:l-'))],
      ['Five hours', 'Study for 5 hours in total.', S.totalSeconds() >= 5 * 3600],
      ['Self-aware', 'Complete a self-assessment after the first one.', st.selfAssess.length >= 2]
    ];
    return list.map(([name, desc, ok]) => ({ name, desc, ok }));
  }

  function weeklySummary() {
    const start = S.weekStart().getTime();
    const prevStart = start - 7 * S.DAY;
    const ev = S.state.events.filter(e => e.t >= start);
    const prevEv = S.state.events.filter(e => e.t >= prevStart && e.t < start);
    const studied = {};
    ev.forEach(e => { if (e.type === 'done' || e.type === 'test' || e.type === 'practice' || e.type === 'vocab') { const k = e.skill || 'mixed'; studied[k] = (studied[k] || []).concat(e.title); } });
    const avg = (arr, sk) => { const s = arr.filter(e => e.score != null && (e.skill || 'mixed') === sk); return s.length ? Math.round(s.reduce((a, b) => a + b.score, 0) / s.length) : null; };
    const improved = [];
    const keys = Array.from(new Set(ev.concat(prevEv).map(e => e.skill || 'mixed')));
    keys.forEach(k => { const a = avg(ev, k), b = avg(prevEv, k); if (a != null && b != null && a > b) improved.push(LP.ui.skillName(k) + ': ' + b + '% → ' + a + '%'); });
    const minNow = Math.round(S.weekSeconds(0) / 60), minPrev = Math.round(S.weekSeconds(1) / 60);
    if (minNow > minPrev && minPrev > 0) improved.push(t('Study time') + ': ' + minPrev + ' → ' + minNow + ' min');
    const wordsNow = S.weekDays().reduce((s, d) => s + ((S.state.activity[S.dayKey(d)] || {}).words || 0), 0);
    return { studied, improved, minNow, minPrev, wordsNow, count: ev.length };
  }

  function progressPage(root) {
    root.innerHTML = LP.pageHead('Your Progress', 'All numbers come from your own activity on this device.', '<a class="btn" href="#/self">' + icon('smile') + ' ' + h(t('How Do You Feel About Your English?')) + '</a>');
    const box = LP.ui.comp(root);
    const st = S.state;
    const tests = st.tests.filter(x => x.kind !== 'placement');
    const lvl = st.profile.level;

    // weekly study time (last 8 weeks)
    const weeks = []; for (let i = 7; i >= 0; i--) { const ws = S.addDays(S.weekStart(), -7 * i); weeks.push({ label: ws.getDate() + '/' + (ws.getMonth() + 1), value: Math.round(S.weekSeconds(i) / 60), highlight: i === 0 }); }
    // last 14 days
    const days14 = []; for (let i = 13; i >= 0; i--) { const d = S.addDays(new Date(), -i); days14.push({ label: String(d.getDate()), value: Math.round(S.secondsOn(S.dayKey(d)) / 60), highlight: i === 0, cls: S.secondsOn(S.dayKey(d)) >= st.profile.dailyGoal * 60 ? 'green' : '' }); }
    // vocabulary
    const vc = { new: 0, learning: 0, review: 0, mastered: 0 }; S.allWords().forEach(w => vc[S.status(w.id)]++);
    const vTotal = S.allWords().length;
    // skill scores
    const sk = S.skillScores();
    // grammar results over time
    const gRes = [];
    tests.forEach(x => { if (x.skillScores && x.skillScores.grammar != null) gRes.push({ d: x.date, s: x.skillScores.grammar }); });
    Object.keys(st.done).forEach(k => { if (k.startsWith('grammar:') && st.done[k].score != null) gRes.push({ d: st.done[k].date, s: st.done[k].score }); });
    gRes.sort((a, b) => a.d - b.d);
    const gLast = gRes.slice(-12);
    const rl = kind => {
      const arr = [];
      tests.forEach(x => { if (x.skillScores && x.skillScores[kind] != null) arr.push(x.skillScores[kind]); });
      Object.keys(st.done).forEach(k => { if (k.startsWith('text:') && S.textById[k.slice(5)] && S.textById[k.slice(5)].kind === kind && st.done[k].score != null) arr.push(st.done[k].score); });
      return { n: arr.length, avg: arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null, last: arr.length ? arr[arr.length - 1] : null };
    };
    const rd = rl('reading'), ls = rl('listening');
    const diff = S.difficultTopics(6);
    const ach = achievements();
    const sum = weeklySummary();
    const recs = S.recommendations();
    const weak = S.weakSkills().slice(0, 2);
    const activeWeek = S.weekDays().filter(d => S.activeDay(S.dayKey(d))).length;
    const goalDaysWeek = S.weekDays().filter(d => S.secondsOn(S.dayKey(d)) >= st.profile.dailyGoal * 60).length;

    let html = '<div class="stats">' +
      stat('clock', LP.ui.fmtMinutes(S.totalSeconds()), 'Total learning time') + stat('book', S.lessonsCompleted() + ' / 150', 'Lessons completed') +
      stat('cards', S.learnedCount(), 'Words learned') + stat('test', tests.length, 'Tests taken') + stat('flame', S.streak() + ' ' + t('days'), 'Current streak') + '</div>';

    // weekly summary
    html += '<section class="card accent" style="margin-top:16px" aria-labelledby="ws-h"><h2 id="ws-h">' + h(t('Weekly summary')) + '</h2>' +
      (sum.count || sum.minNow ? '<div class="grid g2"><div><h3>' + h(t('What you studied')) + '</h3><ul class="summary-list"><li>' + sum.minNow + ' ' + h(t('minutes of study')) + ' (' + h(t('last week')) + ': ' + sum.minPrev + ')</li>' + (sum.wordsNow ? '<li>' + sum.wordsNow + ' ' + h(t('new words learned')) + '</li>' : '') +
        Object.keys(sum.studied).map(k => '<li>' + h(LP.ui.skillName(k)) + ': ' + sum.studied[k].length + ' ' + h(t(sum.studied[k].length === 1 ? 'activity' : 'activities')) + '</li>').join('') + '</ul>' +
        '<h3>' + h(t('What improved')) + '</h3>' + (sum.improved.length ? '<ul class="summary-list">' + sum.improved.map(x => '<li>' + h(x) + '</li>').join('') + '</ul>' : '<p class="muted">' + h(t('Not enough results yet to compare with last week.')) + '</p>') + '</div>' +
        '<div><h3>' + h(t('What still needs practice')) + '</h3><ul class="summary-list">' + (diff.length ? diff.slice(0, 3).map(d => '<li>' + h(d.label) + ' (' + d.wrong + ' ' + h(t('mistakes')) + ')</li>').join('') : '') +
        weak.map(w => '<li>' + h(t(w.name)) + (w.perf != null ? ' — ' + w.perf + '%' : '') + ' · ' + h(t('confidence')) + ' ' + w.conf + '/5</li>').join('') + '</ul>' +
        '<h3>' + h(t('Suggested for next week')) + '</h3><ul class="summary-list">' + recs.slice(0, 3).map(r => '<li><a href="' + r.href + '">' + h(r.title) + '</a></li>').join('') +
        '<li>' + h(t('Study on')) + ' ' + st.goals.weeklyDays + ' ' + h(t('days for')) + ' ' + st.profile.dailyGoal + ' ' + h(t('minutes')) + '.</li></ul></div></div>'
        : '<p class="muted">' + h(t('Your summary will appear after your first activities this week.')) + '</p>') + '</section>';

    html += '<div class="grid g2"><section class="card"><h2>' + h(t('Study time per week')) + '</h2>' + LP.ui.bars(weeks, { label: t('Minutes per week, last 8 weeks'), goal: st.goals.weeklyMinutes, goalLabel: t('weekly target') }) + '</section>' +
      '<section class="card"><h2>' + h(t('Daily activity (last 14 days)')) + '</h2>' + LP.ui.bars(days14, { label: t('Minutes per day'), goal: st.profile.dailyGoal, goalLabel: t('daily goal'), showValues: false }) +
      '<p class="muted small">' + h(t('This week')) + ': ' + activeWeek + ' ' + h(t('study days')) + ' (' + h(t('target')) + ' ' + st.goals.weeklyDays + '), ' + h(t('daily goal reached on')) + ' ' + goalDaysWeek + '.</p></section></div>';

    html += '<section class="card"><h2>' + h(t('Estimated level progress')) + '</h2><div class="disclaimer">' + icon('info') + '<span>' + h(t('This estimate combines completed lessons (50%), results from several tests (30%) and learned vocabulary (20%). It shows your learning progress in this app. It is not an official CEFR certificate.')) + '</span></div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>' + h(t('Level')) + '</th><th style="width:35%">' + h(t('Estimated progress')) + '</th><th>' + h(t('Lessons')) + '</th><th>' + h(t('Tests (average best)')) + '</th><th>' + h(t('Vocabulary')) + '</th></tr></thead><tbody>' +
      S.LEVEL_ORDER.map(l => { const p = S.levelProgress(l); return '<tr><td><b>' + l + '</b>' + (l === lvl ? ' <span class="tag lv">' + h(t('you')) + '</span>' : '') + '</td><td><div class="progress"><span class="teal" style="width:' + p.estimate + '%"></span></div><span class="small muted">' + p.estimate + '%</span></td><td>' + Math.round(p.lessons * 30) + ' / 30</td><td>' + (p.tests == null ? '—' : Math.round(p.tests * 100) + '% (' + p.testCount + ')') + '</td><td>' + Math.round(p.vocab * 100) + '%</td></tr>'; }).join('') + '</tbody></table></div></section>';

    html += '<div class="grid g2"><section class="card"><h2>' + h(t('Vocabulary mastery')) + '</h2><div class="stacked" role="img" aria-label="' + h(t('Vocabulary status')) + '">' +
      [['new', 'var(--border)'], ['learning', 'var(--primary)'], ['review', 'var(--orange)'], ['mastered', 'var(--green)']].map(([k, c]) => '<span style="width:' + (100 * vc[k] / vTotal) + '%;background:' + c + '" title="' + k + ': ' + vc[k] + '"></span>').join('') + '</div>' +
      '<div class="legend" style="justify-content:flex-start"><span><i style="background:var(--border)"></i>' + h(t('New')) + ' ' + vc.new + '</span><span><i></i>' + h(t('Learning')) + ' ' + vc.learning + '</span><span><i class="b"></i>' + h(t('Needs review')) + ' ' + vc.review + '</span><span><i class="c"></i>' + h(t('Mastered')) + ' ' + vc.mastered + '</span></div>' +
      '<p class="muted small" style="margin-top:8px">' + h(t('A word is “mastered” when its next review is at least 3 weeks away.')) + '</p></section>' +
      '<section class="card"><h2>' + h(t('Skill results')) + '</h2>' + LP.ui.hbars(LP.SKILLS.map(s => ({ label: t(s.name), value: sk[s.id], cls: sk[s.id] >= 75 ? 'green' : 'teal' }))) + '<p class="muted small" style="margin-top:8px">' + h(t('Average of your tests and activities for each skill. “—” means no results yet.')) + '</p></section></div>';

    html += '<div class="grid g2"><section class="card"><h2>' + h(t('Grammar test performance')) + '</h2>' + (gLast.length ? LP.ui.line(gLast.map(x => new Date(x.d).getDate() + '/' + (new Date(x.d).getMonth() + 1)), [{ values: gLast.map(x => x.s), label: t('Grammar') }], { label: t('Grammar results over time') }) + '<p class="muted small">' + h(t('Last')) + ' ' + gLast.length + ' ' + h(t('grammar results.')) + '</p>' : '<p class="muted">' + h(t('No grammar results yet. Try a grammar lesson or test.')) + '</p>') + '</section>' +
      '<section class="card"><h2>' + h(t('Reading and listening')) + '</h2>' + LP.ui.hbars([{ label: t('Reading average'), value: rd.avg, note: rd.avg == null ? '—' : rd.avg + '% (' + rd.n + ')', cls: 'teal' }, { label: t('Listening average'), value: ls.avg, note: ls.avg == null ? '—' : ls.avg + '% (' + ls.n + ')', cls: 'teal' }]) +
      '<p class="muted small" style="margin-top:8px">' + h(t('Last reading result')) + ': ' + (rd.last == null ? '—' : rd.last + '%') + ' · ' + h(t('last listening result')) + ': ' + (ls.last == null ? '—' : ls.last + '%') + '</p></section></div>';

    html += '<div class="grid g2"><section class="card"><h2>' + h(t('Most difficult topics')) + '</h2>' + (diff.length ? '<ul class="weak-list">' + diff.map(d => '<li><span>' + h(d.label) + '</span><span class="muted">' + d.wrong + ' ' + h(t('wrong')) + ' / ' + (d.right + d.wrong) + '</span></li>').join('') + '</ul>' : '<p class="muted">' + h(t('No difficult topics yet. They appear when you make mistakes several times in the same topic.')) + '</p>') + '</section>' +
      '<section class="card"><h2>' + h(t('Achievements')) + '</h2>' + ach.sort((a, b) => b.ok - a.ok).map(a => '<div class="ach' + (a.ok ? '' : ' locked') + '"><span class="badge">' + icon(a.ok ? 'trophy' : 'star') + '</span><div><b>' + h(t(a.name)) + '</b><br><span class="muted small">' + h(t(a.desc)) + '</span></div></div>').join('') + '</section></div>';

    html += '<section class="card"><h2>' + h(t('Recent activity')) + '</h2>' + (st.events.length ? '<div class="table-wrap"><table class="table"><tbody>' + st.events.slice(0, 12).map(e => '<tr><td>' + LP.ui.fmtDate(e.t) + '</td><td>' + h(e.title) + '</td><td>' + (e.score != null ? e.score + '%' : '') + '</td></tr>').join('') + '</tbody></table></div>' : '<p class="muted">' + h(t('No activity yet.')) + '</p>') + '</section>';
    box.innerHTML = html;
  }

  /* ---------------- self-assessment ---------------- */
  function selfPage(root) {
    root.innerHTML = LP.pageHead('How Do You Feel About Your English?', 'Rate your confidence and think about your learning. There are no wrong answers.', '', [['Progress', '#/progress'], ['Self-assessment']]);
    const box = LP.ui.comp(root);
    const hist = S.state.selfAssess;
    const last = hist[hist.length - 1];
    const ratings = Object.assign({}, S.state.profile.confidence);
    let feeling = '';
    function draw() {
      const sk = S.skillScores();
      const axes = LP.SKILLS.map(s => t(s.name));
      const first = hist[0];
      const series = [];
      if (last) series.push({ values: LP.SKILLS.map(s => last.ratings ? last.ratings[s.id] : 0), label: t('Your latest self-assessment') });
      const perf = LP.SKILLS.map(s => sk[s.id] == null ? 0 : sk[s.id] / 20);
      const hasPerf = LP.SKILLS.some(s => sk[s.id] != null);
      if (hasPerf) series.push({ values: perf, cls: 'b', label: t('Your results (converted to 1–5)') });
      const weakest = LP.SKILLS.slice().sort((a, b) => ratings[a.id] - ratings[b.id]).slice(0, 2);
      const ACT = { speaking: ['#/practice/speak', 'Practise a conversation'], listening: ['#/practice/listening', 'Do a listening activity'], reading: ['#/practice/reading', 'Read a text'], writing: ['#/practice/writing', 'Do a writing task'], grammar: ['#/grammar', 'Review a grammar topic'], vocabulary: ['#/vocab/review', 'Review your words'] };
      box.innerHTML = '<div class="grid g2"><form class="card" id="sa-form"><h2>' + h(t('Rate your confidence')) + '</h2><p class="muted">' + h(t('1 = not confident, 5 = very confident.')) + '</p>' +
        LP.SKILLS.map(s => '<div class="scale-row"><span id="sa-' + s.id + '"><b>' + h(t(s.name)) + '</b></span><div class="scale" role="radiogroup" aria-labelledby="sa-' + s.id + '">' + [1, 2, 3, 4, 5].map(n => '<button type="button" role="radio" aria-checked="' + (ratings[s.id] === n) + '" aria-label="' + h(t(s.name)) + ' ' + n + '" class="' + (ratings[s.id] === n ? 'selected' : '') + '" data-act="rate" data-s="' + s.id + '" data-v="' + n + '">' + n + '</button>').join('') + '</div></div>').join('') +
        '<h2 style="margin-top:18px">' + h(t('Reflection')) + '</h2>' +
        '<div class="field"><label for="sa-easy">' + h(t('What feels easy?')) + '</label><textarea id="sa-easy" style="min-height:70px" maxlength="500"></textarea></div>' +
        '<div class="field"><label for="sa-diff">' + h(t('What is difficult?')) + '</label><textarea id="sa-diff" style="min-height:70px" maxlength="500"></textarea></div>' +
        '<div class="field"><label for="sa-next">' + h(t('What do you want to improve next?')) + '</label><textarea id="sa-next" style="min-height:70px" maxlength="500"></textarea></div>' +
        '<fieldset class="field" style="border:0;padding:0"><legend><b>' + h(t('Do you feel more confident than last week?')) + '</b></legend><div class="seg">' +
        [['more', 'Yes, more confident'], ['same', 'About the same'], ['less', 'Less confident']].map(([k, l]) => '<button type="button" data-act="feel" data-v="' + k + '" class="' + (feeling === k ? 'on' : '') + '" aria-pressed="' + (feeling === k) + '">' + h(t(l)) + '</button>').join('') + '</div></fieldset>' +
        '<button type="submit" class="btn primary">' + h(t('Save my answers')) + '</button></form>' +
        '<div><section class="card"><h2>' + h(t('Your skills')) + '</h2>' + (series.length ? LP.ui.radar(axes, series, { label: t('Self-assessment and results') }) +
          '<div class="legend">' + (last ? '<span><i></i>' + h(t('Self-assessment')) + ' (' + LP.ui.fmtDate(last.date) + ')</span>' : '') + (hasPerf ? '<span><i class="b"></i>' + h(t('Test and activity results')) + '</span>' : '') + '</div>' : '<p class="muted">' + h(t('Save your first self-assessment to see the chart.')) + '</p>') +
          '<div class="disclaimer" style="margin-top:12px">' + icon('info') + '<span>' + h(t('Confidence and test scores measure different things. Confidence is how you feel when you use English. Scores show how many answers were correct in this app. Both are useful, and they are often different.')) + '</span></div></section>' +
          (hist.length >= 2 ? '<section class="card"><h2>' + h(t('Your confidence over time')) + '</h2>' + LP.ui.line(hist.slice(-10).map(x => new Date(x.date).getDate() + '/' + (new Date(x.date).getMonth() + 1)), [{ values: hist.slice(-10).map(x => x.ratings ? Math.round(10 * LP.SKILLS.reduce((a, s) => a + (x.ratings[s.id] || 0), 0) / 6) / 10 : null), label: t('Average confidence') }], { max: 5, label: t('Average confidence over time') }) +
            (first && last && first !== last ? '<p class="muted small">' + h(t('First')) + ': ' + avg(first) + ' → ' + h(t('latest')) + ': ' + avg(last) + ' / 5</p>' : '') + '</section>' : '') +
          '<section class="card"><h2>' + h(t('Recommended practice')) + '</h2><p class="muted">' + h(t('Based on your lowest ratings')) + ':</p>' + weakest.map(s => '<div class="rec"><div><b>' + h(t(s.name)) + ' (' + ratings[s.id] + '/5)</b><p>' + h(t(ACT[s.id][1])) + '</p></div><a class="btn small" href="' + ACT[s.id][0] + '">' + h(t('Open')) + '</a></div>').join('') + '</section></div></div>' +
        (hist.filter(x => x.easy || x.difficult || x.next).length ? '<section class="card"><h2>' + h(t('Your past reflections')) + '</h2>' + hist.slice().reverse().filter(x => x.easy || x.difficult || x.next).slice(0, 6).map(x => '<div class="goal-item"><div class="txt"><b>' + LP.ui.fmtDate(x.date) + '</b>' + (x.feeling && x.feeling !== 'first' ? ' · ' + h(t({ more: 'More confident', same: 'About the same', less: 'Less confident' }[x.feeling])) : '') +
          (x.easy ? '<br><span class="muted">' + h(t('Easy')) + ':</span> ' + h(x.easy) : '') + (x.difficult ? '<br><span class="muted">' + h(t('Difficult')) + ':</span> ' + h(x.difficult) : '') + (x.next ? '<br><span class="muted">' + h(t('Next')) + ':</span> ' + h(x.next) : '') + '</div></div>').join('') + '</section>' : '');
      box.querySelector('#sa-form').addEventListener('submit', e => {
        e.preventDefault();
        S.addSelfAssessment({ ratings: Object.assign({}, ratings), easy: box.querySelector('#sa-easy').value.trim(), difficult: box.querySelector('#sa-diff').value.trim(), next: box.querySelector('#sa-next').value.trim(), feeling });
        LP.ui.toast(t('Saved. Thank you for reflecting!'));
        LP.rerender();
      });
    }
    function avg(x) { return x.ratings ? (LP.SKILLS.reduce((a, s) => a + (x.ratings[s.id] || 0), 0) / 6).toFixed(1) : '—'; }
    // keep typed reflections when re-drawing for rating clicks
    function keep(fn) { return b => { const vals = ['#sa-easy', '#sa-diff', '#sa-next'].map(s => box.querySelector(s).value); fn(b); draw(); ['#sa-easy', '#sa-diff', '#sa-next'].forEach((s, i) => { box.querySelector(s).value = vals[i]; }); }; }
    LP.ui.on(box, {
      rate: keep(b => { ratings[b.dataset.s] = +b.dataset.v; }),
      feel: keep(b => { feeling = b.dataset.v; })
    });
    draw();
  }

  function stat(ic, num, label) { return '<div class="card stat">' + icon(ic) + '<span class="num">' + h(num) + '</span><span class="lbl">' + h(t(label)) + '</span></div>'; }

  LP.pages.progress = progressPage;
  LP.pages.self = selfPage;
})();
