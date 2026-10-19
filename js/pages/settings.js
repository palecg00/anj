/* LinguaPath — Settings and data management (export, import, reset). */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  LP.pages.settings = function (root) {
    root.innerHTML = LP.pageHead('Settings', 'Change how LinguaPath works for you. Changes are saved immediately.');
    const box = LP.ui.comp(root);
    function draw() {
      const st = S.state.settings, p = S.state.profile;
      const voices = LP.speech.voices;
      box.innerHTML = '<div class="grid g2">' +
        '<section class="card"><h2>' + h(t('Language and level')) + '</h2>' +
        field('Interface language', '<div class="seg" role="group" aria-label="' + h(t('Interface language')) + '">' + [['en', 'English'], ['sk', 'Slovenčina']].map(([k, l]) => '<button type="button" data-act="lang" data-v="' + k + '" class="' + (st.lang === k ? 'on' : '') + '" aria-pressed="' + (st.lang === k) + '">' + l + '</button>').join('') + '</div>', 'Lessons and exercises stay in English. Slovak is support only.') +
        '<label class="check"><input type="checkbox" id="s-sk"' + (st.showSk ? ' checked' : '') + '> ' + h(t('Show Slovak translations automatically')) + '</label>' +
        '<label class="check"><input type="checkbox" id="s-hints"' + (st.hints !== false ? ' checked' : '') + '> ' + h(t('Show hints and useful phrases in conversations')) + '</label>' +
        '<div class="field" style="margin-top:10px"><label for="s-level">' + h(t('Your CEFR level')) + '</label><select id="s-level">' + LP.LEVELS.map(l => '<option value="' + l.id + '"' + (p.level === l.id ? ' selected' : '') + '>' + l.id + ' — ' + h(t(l.name)) + '</option>').join('') + '</select><small>' + h(t('Used to recommend lessons. Not sure? Take the placement test.')) + ' <a href="#/tests/run/placement">' + h(t('Placement test')) + '</a></small></div>' +
        '<div class="field"><label for="s-goal">' + h(t('Daily goal')) + '</label><select id="s-goal">' + [5, 10, 15, 20, 30, 45, 60].map(m => '<option value="' + m + '"' + (p.dailyGoal === m ? ' selected' : '') + '>' + m + ' ' + h(t('minutes')) + '</option>').join('') + '</select></div>' +
        '<fieldset class="field" style="border:0;padding:0"><legend><b>' + h(t('Preferred learning skills')) + '</b></legend><div class="grid g2">' + LP.SKILLS.map(s => '<label class="check"><input type="checkbox" name="s-skill" value="' + s.id + '"' + ((st.preferredSkills || []).includes(s.id) ? ' checked' : '') + '> ' + h(t(s.name)) + '</label>').join('') + '</div></fieldset>' +
        '<fieldset class="field" style="border:0;padding:0"><legend><b>' + h(t('My learning goals')) + '</b></legend>' + LP.GOAL_OPTIONS.map(g => '<label class="check"><input type="checkbox" name="s-lgoal" value="' + g.id + '"' + (p.goals.includes(g.id) ? ' checked' : '') + '> ' + h(t(g.label)) + '</label>').join('') + '</fieldset>' +
        '<h3>' + h(t('Confidence')) + '</h3><p class="muted small">' + h(t('Update your confidence ratings on the self-assessment page.')) + ' <a href="#/self">' + h(t('How Do You Feel About Your English?')) + '</a></p></section>' +

        '<section class="card"><h2>' + h(t('Appearance and sound')) + '</h2>' +
        field('Theme', '<div class="seg" role="group" aria-label="' + h(t('Theme')) + '">' + [['light', 'Light'], ['dark', 'Dark'], ['system', 'Same as device']].map(([k, l]) => '<button type="button" data-act="theme" data-v="' + k + '" class="' + (st.theme === k ? 'on' : '') + '" aria-pressed="' + (st.theme === k) + '">' + h(t(l)) + '</button>').join('') + '</div>') +
        '<label class="check"><input type="checkbox" id="s-motion"' + (st.reducedMotion ? ' checked' : '') + '> ' + h(t('Reduce motion (turn off animations)')) + '</label>' +
        '<label class="check"><input type="checkbox" id="s-timer"' + (st.timer ? ' checked' : '') + '> ' + h(t('Use time limits in tests')) + '</label>' +
        '<hr><div class="field"><label for="s-rate">' + h(t('Speech speed')) + ': <span id="s-rate-v">' + st.speechRate.toFixed(2) + '×</span></label><input id="s-rate" type="range" min="0.5" max="1.3" step="0.05" value="' + st.speechRate + '"><small>' + h(t('Used for word pronunciation and examples. Listening exercises have their own speed control.')) + '</small></div>' +
        (LP.speech.supported ? '<div class="field"><label for="s-voice">' + h(t('Voice')) + '</label><select id="s-voice"><option value="">' + h(t('Automatic')) + '</option>' + voices.map(v => '<option' + (st.voice === v.name ? ' selected' : '') + ' value="' + h(v.name) + '">' + h(v.name + ' (' + v.lang + ')') + '</option>').join('') + '</select>' +
          (voices.length ? '' : '<small>' + h(t('No English voices found yet. They may load in a moment, or your system may not have them.')) + '</small>') + '</div><button type="button" class="btn" data-act="test-voice">' + icon('volume') + ' ' + h(t('Test the voice')) + '</button>'
          : '<p class="note">' + icon('info') + ' ' + h(t('Speech playback is not available in this browser. Listening exercises will show the text instead.')) + '</p>') +
        '<p class="muted small" style="margin-top:10px">' + h(t('Speech recognition (for speaking practice)')) + ': <b>' + h(t(LP.speech.recognitionSupported ? 'available' : 'not available in this browser')) + '</b></p></section></div>' +

        '<section class="card"><h2>' + h(t('Your data')) + '</h2><div class="disclaimer">' + icon('info') + '<span>' + h(t('Your progress is saved only in this browser on this device (localStorage). Nothing is sent to a server. Export a backup file if you want to move your progress to another device or browser.')) + '</span></div>' +
        '<div class="row"><button type="button" class="btn" data-act="export">' + icon('download') + ' ' + h(t('Export progress')) + '</button>' +
        '<label class="btn" for="s-import" style="font-weight:600">' + icon('upload') + ' ' + h(t('Import progress')) + '</label><input id="s-import" type="file" accept="application/json,.json" class="sr-only">' +
        '<button type="button" class="btn danger" data-act="reset">' + icon('trash') + ' ' + h(t('Reset progress')) + '</button></div>' +
        '<p class="muted small" style="margin-top:10px">' + h(t('Saved data')) + ': ' + Object.keys(S.state.done).length + ' ' + h(t('completed activities')) + ', ' + Object.values(S.state.vocab).filter(c => c.last).length + ' ' + h(t('words in review')) + ', ' + S.state.tests.length + ' ' + h(t('test results')) + ', ' + Object.keys(S.state.activity).length + ' ' + h(t('days of activity')) + '.</p>' +
        '<button type="button" class="btn small ghost" data-act="onboard">' + icon('repeat') + ' ' + h(t('Run the first-time setup again')) + '</button></section>' +
        '<section class="card"><h2>' + h(t('About LinguaPath')) + '</h2><p>' + h(t('LinguaPath is a local-first English course from A1 to C1. It works without an account and without an internet connection after the files are loaded. Speech features depend on your browser and operating system.')) + '</p>' +
        '<p class="muted small">' + S.LESSONS.length + ' ' + h(t('lessons')) + ' · ' + S.WORDS.length + ' ' + h(t('words')) + ' · ' + LP.GRAMMAR.length + ' ' + h(t('grammar topics')) + ' · ' + LP.TEXTS.length + ' ' + h(t('texts')) + ' · ' + LP.SCENARIOS.length + ' ' + h(t('conversations')) + ' · ' + LP.WRITING.length + ' ' + h(t('writing tasks')) + '</p></section>';

      const on = (sel, ev, fn) => { const el = box.querySelector(sel); if (el) el.addEventListener(ev, fn); };
      on('#s-sk', 'change', e => { st.showSk = e.target.checked; saved(); });
      on('#s-hints', 'change', e => { st.hints = e.target.checked; saved(); });
      on('#s-level', 'change', e => { p.level = e.target.value; saved(); });
      on('#s-goal', 'change', e => { p.dailyGoal = +e.target.value; saved(); });
      box.querySelectorAll('[name="s-skill"]').forEach(c => c.addEventListener('change', () => { st.preferredSkills = Array.from(box.querySelectorAll('[name="s-skill"]:checked')).map(x => x.value); S.state.goals.skills = st.preferredSkills.slice(); saved(); }));
      box.querySelectorAll('[name="s-lgoal"]').forEach(c => c.addEventListener('change', () => { p.goals = Array.from(box.querySelectorAll('[name="s-lgoal"]:checked')).map(x => x.value); saved(); }));
      on('#s-motion', 'change', e => { st.reducedMotion = e.target.checked; LP.applyTheme(); saved(); });
      on('#s-timer', 'change', e => { st.timer = e.target.checked; saved(); });
      on('#s-rate', 'input', e => { st.speechRate = +e.target.value; box.querySelector('#s-rate-v').textContent = st.speechRate.toFixed(2) + '×'; S.save(); });
      on('#s-voice', 'change', e => { st.voice = e.target.value; saved(); });
      on('#s-import', 'change', e => importFile(e.target.files[0], e.target));
    }
    function field(label, control, help) { return '<div class="field"><span><b>' + h(t(label)) + '</b></span>' + control + (help ? '<small>' + h(t(help)) + '</small>' : '') + '</div>'; }
    function saved() { S.save(); LP.ui.toast(t('Settings saved.')); }

    async function importFile(file, input) {
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { LP.ui.toast(t('This file is too big.'), 'error'); input.value = ''; return; }
      const text = await file.text();
      const res = S.validateImport(text);
      input.value = '';
      if (!res.ok) { LP.ui.modal({ title: t('Import failed'), body: '<p>' + h(t(res.error)) + '</p><p class="muted">' + h(t('Your current progress was not changed.')) + '</p>' }); return; }
      const sm = res.summary;
      const ok = await LP.ui.modal({
        title: t('Import this progress?'),
        body: '<p>' + h(t('The file contains')) + ':</p><ul class="summary-list"><li>' + h(t('Level')) + ': ' + h(sm.level) + '</li><li>' + sm.lessons + ' ' + h(t('completed activities')) + '</li><li>' + sm.words + ' ' + h(t('words in review')) + '</li><li>' + sm.tests + ' ' + h(t('test results')) + '</li><li>' + sm.days + ' ' + h(t('days of activity')) + '</li></ul><p><b>' + h(t('This will replace your current progress on this device.')) + '</b></p>',
        actions: [{ label: 'Cancel', value: false }, { label: 'Import', cls: 'primary', value: true }]
      });
      if (!ok) return;
      S.importData(res.data);
      LP.applyTheme(); LP.refreshShell();
      LP.ui.toast(t('Progress imported.'));
      if (!S.state.profile.onboarded) LP.onboarding.open(); else LP.rerender();
    }

    LP.ui.on(box, {
      lang: b => { S.state.settings.lang = b.dataset.v; S.save(); LP.applyTheme(); LP.refreshShell(); LP.rerender(); },
      theme: b => { S.state.settings.theme = b.dataset.v; LP.applyTheme(); S.save(); draw(); },
      'test-voice': () => LP.speech.speak('Hello! This is how I sound. Let’s improve your English together.'),
      export: () => {
        const name = 'linguapath-progress-' + S.dayKey() + '.json';
        LP.ui.download(name, S.exportData());
        LP.ui.toast(t('Progress exported') + ': ' + name);
      },
      reset: async () => {
        const ok = await LP.ui.modal({
          title: t('Reset all progress?'),
          body: '<p>' + h(t('This deletes all lessons, words, test results, goals and settings saved on this device. This cannot be undone.')) + '</p><p>' + h(t('Tip: export your progress first if you may want it later.')) + '</p>' +
            '<div class="field"><label for="reset-confirm">' + h(t('Type RESET to confirm')) + '</label><input id="reset-confirm" type="text" autocomplete="off"></div>',
          actions: [{ label: 'Cancel', value: false }, { label: 'Reset progress', cls: 'danger', value: true }],
          collect: m => m.querySelector('#reset-confirm').value.trim().toUpperCase() === 'RESET' ? true : 'wrong'
        });
        if (ok === 'wrong') { LP.ui.toast(t('Nothing was deleted. Please type RESET to confirm.'), 'error'); return; }
        if (!ok) return;
        S.reset();
        LP.applyTheme(); LP.refreshShell();
        LP.ui.toast(t('All progress was deleted.'));
        location.hash = '#/dashboard';
        LP.onboarding.open();
      },
      onboard: () => { LP.onboarding.open(); }
    });
    document.addEventListener('lp:voices', function onV() { if (document.body.contains(box)) draw(); else document.removeEventListener('lp:voices', onV); });
    draw();
  };
})();
