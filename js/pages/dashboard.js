/* LinguaPath — Dashboard: what to do next, daily goal, statistics, weekly activity and recommendations. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  const MESSAGES = ['Small steps make progress.', 'You are building a habit.', 'Ready for another lesson?', 'Keep going!', 'Every word you learn is a step forward.'];

  function friendlyMessage() {
    const today = S.today();
    const goal = S.state.profile.dailyGoal;
    const mins = Math.floor(today.seconds / 60);
    if (today.words >= 5) return 'You learned ' + today.words + ' new words today!';
    if (mins >= goal) return 'You reached your daily goal. You are doing well!';
    if (S.streak() >= 3) return 'You are building a habit. ' + S.streak() + ' days in a row!';
    const lastActive = Object.keys(S.state.activity).filter(S.activeDay).sort().pop();
    if (lastActive && lastActive !== S.dayKey() && (Date.now() - S.parseDay(lastActive)) / S.DAY > 2) return 'Welcome back! It’s great to see you again.';
    return MESSAGES[new Date().getDate() % MESSAGES.length];
  }

  LP.pages.dashboard = function (root) {
    const p = S.state.profile;
    const lvl = LP.LEVELS.find(l => l.id === p.level);
    const next = S.nextLesson();
    const todaySec = S.secondsOn(S.dayKey());
    const mins = Math.floor(todaySec / 60);
    const goal = p.dailyGoal;
    const tests = S.state.tests.filter(x => x.kind !== 'placement');
    const avg = S.avgTestScore(x => x.kind !== 'placement');
    const recs = S.recommendations();
    const due = S.dueWords().length;
    const days = S.weekDays();
    const weekData = days.map(d => {
      const k = S.dayKey(d);
      return { label: t(d.toLocaleDateString('en-GB', { weekday: 'short' })), value: Math.round(S.secondsOn(k) / 60), highlight: k === S.dayKey(), title: d.toDateString() + ': ' + Math.round(S.secondsOn(k) / 60) + ' min' };
    });
    const totalWeek = weekData.reduce((s, d) => s + d.value, 0);
    const levelProg = S.levelProgress(p.level);
    const firstTime = !Object.keys(S.state.done).length && !tests.length;

    let html = '<div class="welcome"><div><h1>' + h(t(firstTime ? 'Welcome to LinguaPath!' : 'Welcome back!')) + '</h1>' +
      '<p class="msg">' + h(t(friendlyMessage())) + '</p></div>' +
      '<div class="row"><span class="tag lv">' + p.level + ' · ' + h(t(lvl.name)) + '</span><span class="tag">' + icon('flame') + ' ' + S.streak() + ' ' + h(t('days')) + '</span></div></div>';

    // Continue learning + daily goal
    html += '<div class="grid g-main" style="margin-top:18px">';
    if (next) {
      const unit = S.unitById[next.unit];
      html += '<section class="card accent" aria-labelledby="cont-h"><div class="card-title"><h2 id="cont-h">' + h(t(firstTime ? 'Start a Lesson' : 'Continue Learning')) + '</h2><span class="tag lv">' + next.level + '</span></div>' +
        '<div class="continue"><div><h3>' + h(next.title) + '</h3>' +
        '<div class="meta"><span class="tag">' + h(t(next.category)) + '</span><span>' + icon('clock') + ' ' + next.minutes + ' min</span><span>' + h(t('Unit')) + ' ' + unit.n + ': ' + h(unit.title) + '</span></div>' +
        '<p class="muted" style="margin-top:8px">' + h(t('Status')) + ': ' + h(t('Not started')) + ' · ' + S.lessonsCompleted(next.level) + ' / 30 ' + h(t('lessons done in')) + ' ' + next.level + '</p></div>' +
        '<a class="btn primary" href="#/learn/lesson/' + next.id + '">' + h(t(firstTime ? 'Start' : 'Continue')) + ' ' + icon('arrowR') + '</a></div>' +
        '<div style="margin-top:14px">' + LP.ui.hbars([{ label: t('Estimated level progress') + ' (' + p.level + ')', value: levelProg.estimate, cls: 'teal' }]) + '</div></section>';
    } else {
      html += '<section class="card accent"><h2>' + h(t('You finished all lessons!')) + '</h2><p>' + h(t('Amazing work. Review words and take tests to keep your English fresh.')) + '</p><a class="btn primary" href="#/tests">' + h(t('Take a short test')) + '</a></section>';
    }
    html += '<section class="card" aria-labelledby="goal-h"><div class="card-title"><h2 id="goal-h">' + h(t('Daily Goal')) + '</h2><a class="btn small ghost" href="#/goals">' + h(t('Edit')) + '</a></div>' +
      '<div class="ring-wrap">' + LP.ui.ring(mins, goal, { center: mins + '/' + goal, sub: 'min', label: mins + ' ' + t('of') + ' ' + goal + ' ' + t('minutes completed') }) +
      '<div><p><b>' + mins + ' ' + h(t('of')) + ' ' + goal + ' ' + h(t('minutes completed')) + '</b></p><p class="muted">' +
      h(t(mins >= goal ? 'Goal reached. Great job!' : (goal - mins) + ' minutes to go. You can do it!')) + '</p>' +
      '<p class="muted small">' + h(t('Time counts while you actively use the app.')) + '</p></div></div></section></div>';

    // Statistics
    html += '<section class="section" aria-labelledby="stats-h" style="margin-top:8px"><h2 id="stats-h" class="sr-only">' + h(t('Your Progress')) + '</h2><div class="stats">' +
      stat('book', S.lessonsCompleted(), 'Lessons completed') +
      stat('cards', S.learnedCount(), 'Vocabulary words learned') +
      stat('flame', S.streak() + ' ' + t(S.streak() === 1 ? 'day' : 'days'), 'Current learning streak') +
      stat('test', avg == null ? '—' : avg + '%', 'Average test score') +
      stat('clock', LP.ui.fmtMinutes(S.totalSeconds()), 'Total learning time') + '</div></section>';

    // Quick actions
    html += '<section class="section" aria-labelledby="qa-h"><h2 id="qa-h">' + h(t('Quick actions')) + '</h2><div class="quick">' +
      quick('#/vocab/learn', 'cards', 'Learn 10 new words') +
      quick('#/grammar', 'list', 'Practice grammar') +
      quick('#/practice/speak', 'chat', 'Start a conversation') +
      quick('#/tests/quick', 'test', 'Take a short test') +
      quick('#/vocab/review', 'repeat', due ? 'Review difficult words (' + due + ')' : 'Review difficult words') + '</div></section>';

    // Weekly activity + recommendations
    html += '<div class="grid g2">' +
      '<section class="card" aria-labelledby="wk-h"><div class="card-title"><h2 id="wk-h">' + h(t('This week')) + '</h2><span class="muted">' + totalWeek + ' min</span></div>' +
      LP.ui.bars(weekData, { label: t('Minutes studied each day this week'), goal: goal, goalLabel: t('daily goal'), max: goal }) + (totalWeek ? '' : '<p class="muted small">' + h(t('No study time yet this week. Time is counted while you use the app.')) + '</p>') + '</section>' +
      '<section class="card" aria-labelledby="rec-h"><div class="card-title"><h2 id="rec-h">' + h(t('Recommended for you')) + '</h2></div>' +
      (recs.length ? '<div class="rec-list">' + recs.map(r => '<div class="rec"><div><b>' + h(r.title) + '</b><p>' + h(t(r.reason)) + '</p></div><a class="btn small" href="' + r.href + '">' + h(t('Open')) + '</a></div>').join('') + '</div>'
        : '<p class="muted">' + h(t('Complete a few lessons and we will recommend activities for you.')) + '</p>') + '</section></div>';

    root.innerHTML = html;
  };

  function stat(ic, num, label) {
    return '<div class="card stat">' + icon(ic) + '<span class="num">' + h(num) + '</span><span class="lbl">' + h(t(label)) + '</span></div>';
  }
  function quick(href, ic, label) { return '<a href="' + href + '">' + icon(ic) + '<span>' + h(t(label)) + '</span></a>'; }
})();
