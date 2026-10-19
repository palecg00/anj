/* LinguaPath — My Goals: daily and weekly targets, target level, personal goals, weekly calendar and reminders. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  function message() {
    const st = S.streak();
    const week = S.weekDays().filter(d => S.activeDay(S.dayKey(d))).length;
    if (st >= 7) return 'Amazing! You have studied ' + st + ' days in a row.';
    if (st >= 2) return 'You are building a habit. Keep going!';
    if (week >= 1) return 'Small steps make progress. Every day counts.';
    return 'A new week is a fresh start. Ready for another lesson?';
  }

  LP.pages.goals = function (root) {
    const g = S.state.goals, p = S.state.profile;
    root.innerHTML = LP.pageHead('My Goals', 'Set your targets and track your learning habit. Missing a day is OK — just continue.');
    const box = LP.ui.comp(root);
    let editing = null;

    function draw() {
      const days = S.weekDays();
      const todayK = S.dayKey();
      const activeDays = days.filter(d => S.activeDay(S.dayKey(d))).length;
      const goalDays = days.filter(d => S.secondsOn(S.dayKey(d)) >= p.dailyGoal * 60).length;
      const weekMin = Math.round(S.weekSeconds(0) / 60);
      const tl = g.targetLevel;
      const lp = S.levelProgress(p.level);
      let daysLeft = null;
      if (g.targetDate) daysLeft = Math.ceil((S.parseDay(g.targetDate) - S.parseDay(todayK)) / S.DAY);

      let html = '<p class="msg">' + h(t(message())) + '</p>';
      html += '<div class="stats stats4">' +
        stat('flame', S.streak() + ' ' + t('days'), 'Current streak') + stat('trophy', S.bestStreak() + ' ' + t('days'), 'Best streak') +
        stat('calendar', activeDays + ' / ' + g.weeklyDays, 'Study days this week') + stat('clock', weekMin + ' / ' + g.weeklyMinutes + ' min', 'Minutes this week') + '</div>';

      html += '<section class="card" style="margin-top:16px" aria-labelledby="wk-cal"><div class="card-title"><h2 id="wk-cal">' + h(t('This week')) + '</h2><span class="muted small">' + h(t('Green = you studied. Dark green = daily goal reached.')) + '</span></div><div class="week">' +
        days.map(d => {
          const k = S.dayKey(d), sec = S.secondsOn(k), act = S.activeDay(k), met = sec >= p.dailyGoal * 60;
          return '<div class="day' + (met ? ' goal' : act ? ' active' : '') + (k === todayK ? ' today' : '') + '"><span>' + h(t(d.toLocaleDateString('en-GB', { weekday: 'short' }))) + '</span><b>' + d.getDate() + '</b><span>' + Math.round(sec / 60) + ' min</span>' + (met ? icon('check') : '') + '</div>';
        }).join('') + '</div>' +
        '<div class="grid g2" style="margin-top:14px">' + LP.ui.hbars([{ label: t('Weekly study days'), value: Math.round(100 * Math.min(1, activeDays / g.weeklyDays)), note: activeDays + ' / ' + g.weeklyDays, cls: 'green' }]) +
        LP.ui.hbars([{ label: t('Weekly minutes'), value: Math.round(100 * Math.min(1, weekMin / Math.max(1, g.weeklyMinutes))), note: weekMin + ' / ' + g.weeklyMinutes + ' min' }]) + '</div>' +
        '<p class="muted small" style="margin-top:8px">' + h(t('Daily goal reached on')) + ' ' + goalDays + ' ' + h(t(goalDays === 1 ? 'day this week.' : 'days this week.')) + '</p></section>';

      html += '<div class="grid g2"><section class="card" aria-labelledby="tg-h"><h2 id="tg-h">' + h(t('Your targets')) + '</h2><form id="goal-form">' +
        '<div class="grid g2"><div class="field"><label for="gf-daily">' + h(t('Daily learning goal')) + '</label><select id="gf-daily">' + [5, 10, 15, 20, 30, 45, 60].map(m => '<option value="' + m + '"' + (p.dailyGoal === m ? ' selected' : '') + '>' + m + ' ' + h(t('minutes')) + '</option>').join('') + '</select></div>' +
        '<div class="field"><label for="gf-days">' + h(t('Study days per week')) + '</label><select id="gf-days">' + [1, 2, 3, 4, 5, 6, 7].map(n => '<option' + (g.weeklyDays === n ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></div>' +
        '<div class="field"><label for="gf-wmin">' + h(t('Weekly study target (minutes)')) + '</label><input id="gf-wmin" type="number" min="10" max="2000" step="5" value="' + g.weeklyMinutes + '"></div>' +
        '<div class="field"><label for="gf-level">' + h(t('Target CEFR level')) + '</label><select id="gf-level">' + S.LEVEL_ORDER.map(l => '<option' + (tl === l ? ' selected' : '') + '>' + l + '</option>').join('') + '</select></div>' +
        '<div class="field"><label for="gf-date">' + h(t('Target date')) + ' <small>(' + h(t('optional')) + ')</small></label><input id="gf-date" type="date" value="' + h(g.targetDate || '') + '"></div></div>' +
        '<fieldset class="field" style="border:0;padding:0"><legend><b>' + h(t('Skills to improve')) + '</b></legend><div class="grid g3">' + LP.SKILLS.map(s => '<label class="check"><input type="checkbox" name="gf-skill" value="' + s.id + '"' + (g.skills.includes(s.id) ? ' checked' : '') + '> ' + h(t(s.name)) + '</label>').join('') + '</div></fieldset>' +
        '<button type="submit" class="btn primary">' + h(t('Save targets')) + '</button></form></section>' +
        '<section class="card" aria-labelledby="tp-h"><h2 id="tp-h">' + h(t('Target progress')) + '</h2>' +
        '<p>' + h(t('Current level')) + ': <b>' + p.level + '</b> → ' + h(t('target')) + ': <b>' + tl + '</b>' + (daysLeft != null ? ' · ' + (daysLeft >= 0 ? daysLeft + ' ' + h(t('days left')) : h(t('target date has passed'))) : '') + '</p>' +
        LP.ui.hbars(S.LEVEL_ORDER.slice(S.levelIdx(p.level), Math.max(S.levelIdx(p.level), S.levelIdx(tl)) + 1).map(l => ({ label: l + ' ' + t('estimated progress'), value: S.levelProgress(l).estimate, cls: 'teal' }))) +
        (S.levelIdx(tl) < S.levelIdx(p.level) ? '<p class="note">' + h(t('Your target level is lower than your current level. Choose a higher target to keep growing.')) + '</p>' : '') +
        (daysLeft != null && daysLeft > 0 && S.levelIdx(tl) > S.levelIdx(p.level) ? '<p class="note">' + h(t('Lessons left until the end of your target level')) + ': ' + S.LESSONS.filter(l => S.levelIdx(l.level) >= S.levelIdx(p.level) && S.levelIdx(l.level) <= S.levelIdx(tl) && !S.lessonDone(l)).length + '. ' + h(t('That is about')) + ' ' + Math.ceil(S.LESSONS.filter(l => S.levelIdx(l.level) >= S.levelIdx(p.level) && S.levelIdx(l.level) <= S.levelIdx(tl) && !S.lessonDone(l)).length / Math.max(1, Math.ceil(daysLeft / 7))) + ' ' + h(t('lessons per week.')) + '</p>' : '') +
        '<p class="note">' + icon('info') + ' ' + h(t('Estimated progress is not an official CEFR level.')) + ' ' + h(t('Current level progress')) + ': ' + lp.estimate + '%.</p>' +
        '<hr><h3>' + h(t('In-app reminder')) + '</h3><label class="check"><input type="checkbox" id="rem-on"' + (S.state.settings.reminder.enabled ? ' checked' : '') + '> ' + h(t('Show a friendly reminder in the app if I have not reached my daily goal')) + '</label>' +
        '<div class="row"><label for="rem-time">' + h(t('after')) + '</label><input id="rem-time" type="time" value="' + h(S.state.settings.reminder.time) + '" style="width:auto"></div>' +
        '<p class="muted small">' + h(t('The reminder appears only inside LinguaPath. We never ask for notification permission.')) + '</p></section></div>';

      html += '<section class="card" aria-labelledby="pg-h"><div class="card-title"><h2 id="pg-h">' + h(t('Personal goals')) + '</h2><span class="muted">' + g.custom.filter(x => x.done).length + ' / ' + g.custom.length + ' ' + h(t('completed')) + '</span></div>' +
        '<form id="pg-add" class="row"><label class="sr-only" for="pg-text">' + h(t('New personal goal')) + '</label><input id="pg-text" type="text" maxlength="140" style="flex:2;min-width:200px" placeholder="' + h(t('e.g. Watch one film in English without subtitles')) + '">' +
        '<label class="sr-only" for="pg-due">' + h(t('Due date')) + '</label><input id="pg-due" type="date" style="flex:1;min-width:150px"><button type="submit" class="btn primary">' + icon('plus') + ' ' + h(t('Add goal')) + '</button></form>' +
        (g.custom.length ? '<div style="margin-top:10px">' + g.custom.map(c => editing === c.id ?
          '<form class="goal-item" data-edit="' + c.id + '"><input type="text" class="pg-etext" maxlength="140" value="' + h(c.text) + '" aria-label="' + h(t('Goal')) + '" style="flex:2"><input type="date" class="pg-edue" value="' + h(c.due || '') + '" aria-label="' + h(t('Due date')) + '" style="flex:1"><button type="submit" class="btn small primary">' + h(t('Save')) + '</button><button type="button" class="btn small ghost" data-act="pg-cancel">' + h(t('Cancel')) + '</button></form>' :
          '<div class="goal-item' + (c.done ? ' done' : '') + '"><input type="checkbox" data-goal="' + c.id + '" id="pg-' + c.id + '"' + (c.done ? ' checked' : '') + '><label class="txt" for="pg-' + c.id + '"><b>' + h(c.text) + '</b><br><span class="muted small">' + (c.due ? h(t('Due')) + ': ' + LP.ui.fmtDate(S.parseDay(c.due)) : h(t('No due date'))) + (c.done && c.doneAt ? ' · ' + h(t('completed')) + ' ' + LP.ui.fmtDate(c.doneAt) : '') + '</span></label>' +
          '<button type="button" class="icon-btn" data-act="pg-edit" data-id="' + c.id + '" aria-label="' + h(t('Edit')) + '">' + icon('edit') + '</button><button type="button" class="icon-btn" data-act="pg-del" data-id="' + c.id + '" aria-label="' + h(t('Delete')) + '">' + icon('trash') + '</button></div>').join('') + '</div>'
          : LP.ui.empty('target', 'No personal goals yet.', 'Add a small, clear goal. For example: “Learn 50 words about travel this month.”')) + '</section>';
      box.innerHTML = html;

      box.querySelector('#goal-form').addEventListener('submit', e => {
        e.preventDefault();
        p.dailyGoal = +box.querySelector('#gf-daily').value;
        g.weeklyDays = +box.querySelector('#gf-days').value;
        const wm = +box.querySelector('#gf-wmin').value;
        if (!wm || wm < 10) { LP.ui.toast(t('Please enter at least 10 minutes per week.'), 'error'); return; }
        g.weeklyMinutes = Math.round(wm);
        g.targetLevel = box.querySelector('#gf-level').value;
        g.targetDate = box.querySelector('#gf-date').value;
        g.skills = Array.from(box.querySelectorAll('[name="gf-skill"]:checked')).map(x => x.value);
        S.state.settings.preferredSkills = g.skills.slice();
        S.save(); LP.ui.toast(t('Targets saved.')); draw();
      });
      box.querySelector('#rem-on').addEventListener('change', e => { S.state.settings.reminder.enabled = e.target.checked; S.save(); LP.ui.toast(t(e.target.checked ? 'Reminder turned on.' : 'Reminder turned off.')); });
      box.querySelector('#rem-time').addEventListener('change', e => { S.state.settings.reminder.time = e.target.value || '18:00'; S.save(); });
      box.querySelector('#pg-add').addEventListener('submit', e => {
        e.preventDefault();
        const text = box.querySelector('#pg-text').value.trim();
        if (!text) { LP.ui.toast(t('Please write your goal.'), 'error'); return; }
        g.custom.push({ id: Date.now().toString(36), text, due: box.querySelector('#pg-due').value, done: false, created: Date.now() });
        S.save(); LP.ui.toast(t('Goal added.')); draw();
      });
      box.querySelectorAll('[data-goal]').forEach(cb => cb.addEventListener('change', () => {
        const c = g.custom.find(x => x.id === cb.dataset.goal); c.done = cb.checked; c.doneAt = cb.checked ? Date.now() : null;
        if (cb.checked) { S.logEvent('goal', 'Goal completed: ' + c.text, '', null); LP.ui.toast(t('Well done! Goal completed.')); }
        S.save(); draw();
      }));
      const ef = box.querySelector('[data-edit]');
      if (ef) {
        ef.querySelector('.pg-etext').focus();
        ef.addEventListener('submit', e => {
          e.preventDefault();
          const c = g.custom.find(x => x.id === ef.dataset.edit);
          const text = ef.querySelector('.pg-etext').value.trim();
          if (!text) { LP.ui.toast(t('Please write your goal.'), 'error'); return; }
          c.text = text; c.due = ef.querySelector('.pg-edue').value; editing = null; S.save(); draw();
        });
      }
    }
    LP.ui.on(box, {
      'pg-edit': b => { editing = b.dataset.id; draw(); },
      'pg-cancel': () => { editing = null; draw(); },
      'pg-del': async b => {
        const ok = await LP.ui.confirm('Delete this goal?', 'This cannot be undone.', 'Delete', true);
        if (!ok) return;
        g.custom = g.custom.filter(x => x.id !== b.dataset.id); S.state.goals.custom = g.custom; S.save(); draw();
      }
    });
    draw();
  };

  function stat(ic, num, label) { return '<div class="card stat">' + icon(ic) + '<span class="num">' + h(num) + '</span><span class="lbl">' + h(t(label)) + '</span></div>'; }
})();
