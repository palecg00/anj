/* LinguaPath — first-time setup (5 short steps). */
window.LP = window.LP || {};

(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  function open() {
    const el = document.getElementById('onboard');
    el.hidden = false;
    document.getElementById('app').setAttribute('aria-hidden', 'true');
    const draft = {
      level: S.state.profile.level, unsure: false, goals: S.state.profile.goals.slice(),
      dailyGoal: S.state.profile.dailyGoal, confidence: Object.assign({}, S.state.profile.confidence)
    };
    let step = 0;
    const root = el.querySelector('.onboard-inner');

    function dots() { return '<div class="dots" aria-hidden="true">' + [0, 1, 2, 3, 4].map(i => '<span class="' + (i <= step ? 'on' : '') + '"></span>').join('') + '</div><p class="muted small">' + h(t('Step')) + ' ' + (step + 1) + ' / 5</p>'; }
    function nav(nextLabel, canBack) {
      return '<div class="onboard-nav">' + (canBack ? '<button type="button" class="btn ghost" data-ob="back">' + icon('arrowL') + ' ' + h(t('Back')) + '</button>' : '<span></span>') +
        '<button type="button" class="btn primary" data-ob="next">' + h(t(nextLabel || 'Next')) + ' ' + icon('arrowR') + '</button></div>';
    }
    function draw() {
      let html = '';
      if (step === 0) {
        html = '<div class="hero-mark">LP</div><h1 id="ob-title">' + h(t('Let’s improve your English!')) + '</h1>' +
          '<p class="lead">' + h(t('LinguaPath helps you learn English step by step, from A1 (beginner) to C1 (advanced).')) + '</p>' +
          '<ul class="summary-list"><li>' + h(t('Short lessons with words, grammar, reading, listening, speaking and writing.')) + '</li><li>' + h(t('Tests and a review system that remembers which words are difficult for you.')) + '</li><li>' + h(t('No account. Your progress stays in this browser.')) + '</li></ul>' +
          '<p class="muted">' + h(t('Answer five short questions so we can recommend the right lessons. You can change everything later.')) + '</p>' +
          '<div class="row" style="margin-top:12px"><span class="muted">' + h(t('Interface language')) + ':</span><div class="seg"><button type="button" data-lang="en" class="' + (S.state.settings.lang === 'en' ? 'on' : '') + '">English</button><button type="button" data-lang="sk" class="' + (S.state.settings.lang === 'sk' ? 'on' : '') + '">Slovenčina</button></div></div>' +
          nav('Start', false);
      } else if (step === 1) {
        html = dots() + '<h1 id="ob-title">' + h(t('What is your English level now?')) + '</h1><p class="lead">' + h(t('Choose the level that feels right. It is OK to guess.')) + '</p><div class="choice-grid" role="radiogroup">' +
          LP.LEVELS.map(l => '<button type="button" role="radio" aria-checked="' + (!draft.unsure && draft.level === l.id) + '" class="choice' + (!draft.unsure && draft.level === l.id ? ' selected' : '') + '" data-level="' + l.id + '"><span class="tag lv">' + l.id + '</span><span><b>' + h(t(l.name)) + '</b><small>' + h(t(l.desc)) + '</small></span></button>').join('') +
          '<button type="button" role="radio" aria-checked="' + draft.unsure + '" class="choice' + (draft.unsure ? ' selected' : '') + '" data-level="unsure">' + icon('test') + '<span><b>' + h(t('Not sure')) + '</b><small>' + h(t('Take a placement test after the setup.')) + '</small></span></button></div>' + nav('Next', true);
      } else if (step === 2) {
        html = dots() + '<h1 id="ob-title">' + h(t('What are your main goals?')) + '</h1><p class="lead">' + h(t('Choose one or more.')) + '</p><div class="choice-grid">' +
          LP.GOAL_OPTIONS.map(g => '<button type="button" aria-pressed="' + draft.goals.includes(g.id) + '" class="choice' + (draft.goals.includes(g.id) ? ' selected' : '') + '" data-goal="' + g.id + '">' + icon(draft.goals.includes(g.id) ? 'check' : 'plus') + '<span>' + h(t(g.label)) + '</span></button>').join('') + '</div>' + nav('Next', true);
      } else if (step === 3) {
        html = dots() + '<h1 id="ob-title">' + h(t('Choose your daily learning goal')) + '</h1><p class="lead">' + h(t('Small steps every day work better than long lessons once a week.')) + '</p><div class="choice-grid" role="radiogroup">' +
          [5, 10, 15, 20, 30].map(m => '<button type="button" role="radio" aria-checked="' + (draft.dailyGoal === m) + '" class="choice' + (draft.dailyGoal === m ? ' selected' : '') + '" data-min="' + m + '">' + icon('clock') + '<span><b>' + m + ' ' + h(t('minutes')) + '</b><small>' + h(t(m <= 5 ? 'Easy start' : m <= 10 ? 'Relaxed' : m <= 15 ? 'Regular' : m <= 20 ? 'Serious' : 'Intensive')) + '</small></span></button>').join('') + '</div>' + nav('Next', true);
      } else if (step === 4) {
        html = dots() + '<h1 id="ob-title">' + h(t('How confident do you feel?')) + '</h1><p class="lead">' + h(t('1 = not confident, 5 = very confident.')) + '</p><div class="card">' +
          LP.SKILLS.map(s => '<div class="scale-row"><span id="sc-' + s.id + '"><b>' + h(t(s.name)) + '</b></span><div class="scale" role="radiogroup" aria-labelledby="sc-' + s.id + '">' +
            [1, 2, 3, 4, 5].map(n => '<button type="button" role="radio" aria-checked="' + (draft.confidence[s.id] === n) + '" aria-label="' + s.name + ' ' + n + '" class="' + (draft.confidence[s.id] === n ? 'selected' : '') + '" data-skill="' + s.id + '" data-v="' + n + '">' + n + '</button>').join('') + '</div></div>').join('') +
          '</div>' + nav(draft.unsure ? 'Finish and take the test' : 'Finish', true);
      }
      root.innerHTML = html;
      const title = root.querySelector('h1'); if (title) { title.setAttribute('tabindex', '-1'); title.focus(); }
    }

    root.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.lang) { S.state.settings.lang = b.dataset.lang; S.save(); LP.applyTheme(); LP.refreshShell(); draw(); return; }
      if (b.dataset.level) { if (b.dataset.level === 'unsure') { draft.unsure = true; } else { draft.unsure = false; draft.level = b.dataset.level; } draw(); return; }
      if (b.dataset.goal) { const i = draft.goals.indexOf(b.dataset.goal); if (i >= 0) draft.goals.splice(i, 1); else draft.goals.push(b.dataset.goal); draw(); return; }
      if (b.dataset.min) { draft.dailyGoal = +b.dataset.min; draw(); return; }
      if (b.dataset.skill) { draft.confidence[b.dataset.skill] = +b.dataset.v; draw(); return; }
      if (b.dataset.ob === 'back') { step = Math.max(0, step - 1); draw(); return; }
      if (b.dataset.ob === 'next') {
        if (step === 2 && !draft.goals.length) { LP.ui.toast(t('Please choose at least one goal.'), 'error'); return; }
        if (step < 4) { step++; draw(); return; }
        finish();
      }
    };

    function finish() {
      const p = S.state.profile;
      p.level = draft.unsure ? 'A1' : draft.level;
      p.goals = draft.goals; p.dailyGoal = draft.dailyGoal; p.confidence = draft.confidence; p.onboarded = true;
      S.state.goals.targetLevel = S.LEVEL_ORDER[Math.min(S.levelIdx(p.level) + 1, 4)];
      const skills = new Set(); draft.goals.forEach(g => { const o = LP.GOAL_OPTIONS.find(x => x.id === g); if (o) o.skills.forEach(s => skills.add(s)); });
      S.state.settings.preferredSkills = Array.from(skills);
      S.state.goals.skills = Array.from(skills);
      S.addSelfAssessment({ ratings: draft.confidence, easy: '', difficult: '', next: '', feeling: 'first' });
      S.save(true);
      el.hidden = true;
      document.getElementById('app').removeAttribute('aria-hidden');
      LP.ui.toast(t('Your profile is saved. Let’s start!'));
      if (draft.unsure) LP.go('#/tests/run/placement'); else LP.go('#/dashboard');
    }
    draw();
  }

  LP.onboarding = { open };
})();
