/* LinguaPath — writing practice with drafts, checklist and basic local feedback.
   The checker uses simple rules. It finds some common problems but it is not a full grammar checker. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;

  const MISSPELL = {
    recieve: 'receive', becuase: 'because', beacuse: 'because', definately: 'definitely', wich: 'which', untill: 'until', tommorow: 'tomorrow', tommorrow: 'tomorrow',
    beleive: 'believe', seperate: 'separate', freind: 'friend', freinds: 'friends', goverment: 'government', enviroment: 'environment', accomodation: 'accommodation',
    wierd: 'weird', alot: 'a lot', thier: 'their', occured: 'occurred', begining: 'beginning', adress: 'address', necesary: 'necessary', neccessary: 'necessary',
    sucess: 'success', succesful: 'successful', realy: 'really', writting: 'writing', intresting: 'interesting', languge: 'language', beautifull: 'beautiful',
    wellcome: 'welcome', sincerly: 'sincerely', recomend: 'recommend', reccomend: 'recommend', comming: 'coming', studing: 'studying', truely: 'truly',
    arguement: 'argument', calender: 'calendar', collegue: 'colleague', embarassed: 'embarrassed', familly: 'family', foward: 'forward', grammer: 'grammar',
    happend: 'happened', hapened: 'happened', knowlege: 'knowledge', occurence: 'occurrence', oppinion: 'opinion', posible: 'possible', prefered: 'preferred',
    responsability: 'responsibility', shedule: 'schedule', togheter: 'together', whith: 'with', wether: 'whether', woud: 'would', yesterdy: 'yesterday',
    finaly: 'finally', exemple: 'example', expirience: 'experience', experiance: 'experience', diffrent: 'different', diferent: 'different', informations: 'information',
    advices: 'advice', luggages: 'luggage', furnitures: 'furniture', peoples: 'people', childs: 'children', mans: 'men', womans: 'women'
  };
  const RULES = [
    [/\b(he|she|it)\s+(don't|do not)\b/gi, 'With he, she or it, use “doesn’t” (does not).'],
    [/\b(he|she)\s+have\b(?!\s+to\b)/gi, 'With he or she, use “has”.'],
    [/\b(he|she|it)\s+are\b/gi, 'With he, she or it, use “is”.'],
    [/\bi\s+(is|are)\b/gi, 'With I, use “am”.'],
    [/\b(you|we|they)\s+is\b/gi, 'With you, we or they, use “are”.'],
    [/\b(you|we|they)\s+(was)\b/gi, 'With you, we or they, use “were”.'],
    [/\b(i|you|we|they)\s+(has|does|doesn't)\b/gi, 'With I, you, we or they, use “have / do / don’t”.'],
    [/\bdid(?:n't| not)?\s+(went|saw|ate|took|bought|came|made|got|was|were|had|gone|found|told|said)\b/gi, 'After “did / didn’t”, use the base form of the verb (go, see, eat…).'],
    [/\b(can|could|should|must|will|would|might|may)\s+to\s+[a-z]+/gi, 'Do not use “to” after modal verbs (can, should, must, will…).'],
    [/\b(more|most)\s+(better|worse|bigger|smaller|cheaper|faster|easier|older|younger|larger|higher|lower|longer|shorter|happier|best|worst)\b/gi, 'Don’t use “more/most” with a comparative or superlative form (better, bigger…).'],
    [/\bmore\s+(good|bad|big|small|cheap|fast|easy|old|young|nice|hot|cold)\b/gi, 'Short adjectives use -er (bigger, cheaper). “Good” → “better”.'],
    [/\b(would|should|could|must|might)\s+of\b/gi, 'Write “would have / should have”, not “of”.'],
    [/\b(their)\s+(is|are|was|were)\b/gi, 'Did you mean “there is / there are”?'],
    [/\bdepend(s|ed)?\s+of\b/gi, 'We say “depend on”.'],
    [/\bmarried\s+with\b/gi, 'We say “married to”.'],
    [/\bdiscuss(ed)?\s+about\b/gi, 'We say “discuss something” (no “about”).'],
    [/\bexplain(ed)?\s+(me|him|her|us|them)\b/gi, 'We say “explain to me / explain something to someone”.'],
    [/\bsaid\s+(me|him|her|us|them)\b/gi, 'Use “told me / told him” or “said to me”.'],
    [/\b(i|we|they)\s+(am|are)\s+agree\b/gi, '“Agree” is a verb: “I agree” (not “I am agree”).'],
    [/\bsince\s+(\d+|two|three|four|five|six|seven|eight|nine|ten|many|several)\s+(years|months|weeks|days|hours)\b/gi, 'Use “for” with a period of time (for three years). Use “since” with a starting point (since 2020).'],
    [/\b(i|we|they|you)\s+have\s+(\d+|twenty|thirty|forty|fifty)\s+years\b/gi, 'For age, say “I am 25 years old”, not “I have 25 years”.'],
    [/\bmake\s+(my|your|the|our)?\s*homework\b/gi, 'We say “do homework”.'],
    [/\bif\s+(i|you|he|she|it|we|they)\s+will\b/gi, 'In “if” clauses about the future, use the present: “If it rains…”, not “If it will rain…”.'],
    [/\bin\s+the\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi, 'Use “on” with days: “on Monday”.'],
    [/\bi\s+look\s+forward\s+to\s+(see|hear|meet)\b/gi, '“Look forward to” is followed by -ing: “I look forward to seeing you.”'],
    [/\b(enjoy|enjoys|enjoyed|avoid|finish|suggest)\s+to\s+[a-z]+/gi, 'This verb is followed by -ing (enjoy reading), not “to”.'],
    [/\ba\s+(apple|egg|hour|honest|orange|idea|interesting|important|old|umbrella|example|email|evening|office|answer|uncle|aunt)\b/gi, 'Use “an” before a vowel sound (an apple, an hour).'],
    [/\ban\s+(university|european|one|use|user|useful|unique|uniform|union|unit|usual|euro|book|car|house|good|big|new)\b/gi, 'Use “a” before a consonant sound (a university, a book).']
  ];
  const CONTRACTIONS = /\b(i'm|i've|i'd|i'll|don't|doesn't|didn't|can't|won't|isn't|aren't|wasn't|weren't|haven't|hasn't|it's|that's|there's|we're|they're|you're|couldn't|wouldn't|shouldn't|let's)\b/gi;

  function stats(text) {
    const clean = text.trim();
    const words = clean ? clean.split(/\s+/).filter(w => /[a-zA-Z0-9]/.test(w)).length : 0;
    const sentences = clean ? (clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter(s => /[a-zA-Z]/.test(s)).length : 0;
    const paragraphs = clean ? clean.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    return { words, sentences, paragraphs, avg: sentences ? Math.round(words / sentences) : 0 };
  }

  function check(text, opts) {
    opts = opts || {};
    const issues = [];
    const st = stats(text);
    const norm = text.replace(/[’‘]/g, "'");
    // spelling
    const seen = new Set();
    (norm.match(/[A-Za-z']+/g) || []).forEach(w => {
      const lw = w.toLowerCase();
      if (MISSPELL[lw] && !seen.has(lw)) { seen.add(lw); issues.push({ type: 'spell', msg: '“' + w + '” → “' + MISSPELL[lw] + '”', ex: w }); }
    });
    if (/(^|[\s(“"])i([\s,.!?']|$)/.test(norm)) issues.push({ type: 'grammar', msg: t('Write “I” (me) as a capital letter.') });
    RULES.forEach(([re, msg]) => {
      re.lastIndex = 0;
      const m = norm.match(re);
      if (m) issues.push({ type: 'grammar', msg: t(msg) + ' (' + t('found') + ': “' + m[0] + '”)' });
    });
    // repeated words
    const rep = norm.match(/\b([a-z]+)\s+\1\b/i);
    if (rep && !['that', 'had', 'very'].includes(rep[1].toLowerCase())) issues.push({ type: 'grammar', msg: t('Repeated word') + ': “' + rep[0] + '”.' });
    // sentence structure
    const sentences = norm.match(/[^.!?]+[.!?]*/g) || [];
    let lower = 0, long = 0;
    sentences.forEach(s => {
      const tr = s.trim();
      if (tr && /^[a-z]/.test(tr)) lower++;
      if (tr.split(/\s+/).length > 35) long++;
    });
    if (lower) issues.push({ type: 'grammar', msg: lower + ' ' + t(lower === 1 ? 'sentence starts' : 'sentences start') + ' ' + t('with a small letter. Start every sentence with a capital letter.') });
    if (norm.trim() && !/[.!?)"”']\s*$/.test(norm.trim())) issues.push({ type: 'grammar', msg: t('The text does not end with a full stop, question mark or exclamation mark.') });
    if (long) issues.push({ type: 'style', msg: long + ' ' + t(long === 1 ? 'sentence is' : 'sentences are') + ' ' + t('very long (more than 35 words). Try to split them.') });
    if (/ {2,}/.test(norm)) issues.push({ type: 'style', msg: t('There are double spaces in your text.') });
    if (/\s[,.!?]/.test(norm)) issues.push({ type: 'style', msg: t('Do not put a space before a comma or full stop.') });
    if (/,(?=[A-Za-z])/.test(norm)) issues.push({ type: 'style', msg: t('Put a space after a comma.') });
    // sentence starts
    const starts = {};
    sentences.forEach(s => { const w = (s.trim().split(/\s+/)[0] || '').toLowerCase(); if (w) starts[w] = (starts[w] || 0) + 1; });
    Object.keys(starts).forEach(w => { if (starts[w] >= 4 && st.sentences >= 6 && w !== 'i') issues.push({ type: 'style', msg: t('Many sentences start with') + ' “' + w + '”. ' + t('Try to vary your sentences.') }); });
    if (st.sentences >= 6 && starts.i >= Math.max(4, st.sentences * 0.6)) issues.push({ type: 'style', msg: t('Most sentences start with “I”. Try other beginnings: “Usually…”, “After that…”, “My…”.') });
    // overused words
    const counts = {};
    (norm.toLowerCase().match(/[a-z']{4,}/g) || []).forEach(w => { counts[w] = (counts[w] || 0) + 1; });
    const stop = ['that', 'this', 'with', 'have', 'they', 'there', 'their', 'from', 'what', 'when', 'were', 'will', 'would', 'which', 'about', 'because', 'your'];
    Object.keys(counts).forEach(w => { if (!stop.includes(w) && counts[w] >= Math.max(4, st.words / 25)) issues.push({ type: 'style', msg: t('You use') + ' “' + w + '” ' + counts[w] + ' ' + t('times. Can you use a synonym?') }); });
    if (opts.formal) { const c = norm.match(CONTRACTIONS); if (c) issues.push({ type: 'style', msg: t('This is a formal text. Avoid contractions such as') + ' “' + c[0] + '”.' }); }
    if (st.sentences && st.avg < 5 && st.sentences >= 4 && opts.level && opts.level >= 2) issues.push({ type: 'style', msg: t('Your sentences are very short. Try joining ideas with because, although, which…') });
    return Object.assign(st, { issues });
  }
  // Short messages for free conversation mode.
  check.quick = function (text) { return check(text).issues.filter(i => i.type !== 'style' && !/full stop/.test(i.msg)).map(i => i.msg); };
  check.stats = stats;
  LP.writingCheck = check;

  function evalItem(item, text, ticks, idx) {
    const st = stats(text);
    const low = text.toLowerCase().replace(/[’‘]/g, "'");
    switch (item.k) {
      case 'words': return st.words >= item.v;
      case 'sentences': return st.sentences >= item.v;
      case 'paragraphs': return st.paragraphs >= item.v;
      case 'range': return st.words >= item.v[0] && st.words <= item.v[1];
      case 'any': return item.v.some(x => low.includes(x));
      case 'count': return item.v.filter(x => low.includes(x)).length >= (item.n || 1);
      case 'occurs': return item.v.reduce((n, x) => n + (low.split(x).length - 1), 0) >= item.n;
      case 'none': return st.words > 0 && !item.v.some(x => low.includes(x));
      case 'nocontractions': { CONTRACTIONS.lastIndex = 0; const has = CONTRACTIONS.test(low); CONTRACTIONS.lastIndex = 0; return st.words > 0 && !has; }
      case 'manual': return !!ticks[idx];
    }
    return false;
  }

  // opts: { onComplete(score), onExit, exitLabel }
  LP.comp.writing = function (parent, id, opts) {
    opts = opts || {};
    const w = S.writingById[id];
    const root = LP.ui.comp(parent);
    const saved = S.state.writing[id] || (S.state.writing[id] = { text: '', updated: 0, ticks: {} });
    if (!saved.ticks) saved.ticks = {};
    let showModel = false, feedback = null;
    const formal = /formal|complaint|proposal|essay|summary/i.test(w.type + ' ' + w.title) && !/informal/i.test(w.type);

    function checklistHtml(text) {
      return '<ul class="checklist">' + w.checklist.map((c, i) => {
        const ok = evalItem(c, text, saved.ticks, i);
        return '<li>' + (c.k === 'manual' ? '<input type="checkbox" id="tick-' + i + '" data-tick="' + i + '"' + (saved.ticks[i] ? ' checked' : '') + ' aria-label="' + h(c.t) + '"><label for="tick-' + i + '" style="font-weight:500">' + h(c.t) + ' <small class="muted">(' + h(t('check yourself')) + ')</small></label>'
          : '<span class="st ' + (ok ? 'ok' : '') + '" aria-label="' + h(t(ok ? 'Done' : 'Not yet')) + '">' + (ok ? icon('check') : '') + '</span><span>' + h(c.t) + '</span>') + '</li>';
      }).join('') + '</ul>';
    }
    function score(text) {
      const auto = w.checklist.map((c, i) => evalItem(c, text, saved.ticks, i));
      return Math.round(100 * auto.filter(Boolean).length / auto.length);
    }
    function draw() {
      const st = stats(saved.text);
      root.innerHTML = '<div class="two-col"><div>' +
        '<div class="card accent"><h2>' + h(t('Your task')) + '</h2><p class="q-text">' + h(w.prompt) + '</p><p class="muted">' + h(t('Length')) + ': ' + w.min + '–' + w.max + ' ' + h(t('words')) + '</p>' +
        (w.source ? '<details class="passage" open><summary>' + h(t('Source text')) + '</summary><div class="passage-body"><p>' + h(w.source) + '</p></div></details>' : '') + '</div>' +
        '<div class="card"><label for="w-editor"><b>' + h(t('Your text')) + '</b></label>' +
        '<textarea id="w-editor" spellcheck="true" lang="en" placeholder="' + h(t('Start writing here. Your draft is saved automatically.')) + '">' + h(saved.text) + '</textarea>' +
        '<div class="editor-bar"><span id="w-count"><b>' + st.words + '</b> ' + h(t('words')) + ' · ' + st.sentences + ' ' + h(t('sentences')) + ' · ' + st.paragraphs + ' ' + h(t('paragraphs')) + '</span><span id="w-saved">' + (saved.updated ? h(t('Draft saved')) + ' ' + new Date(saved.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '') + '</span></div>' +
        '<div class="quiz-nav" style="margin-top:12px"><button type="button" class="btn" data-act="w-check">' + icon('search') + ' ' + h(t('Check my writing')) + '</button>' +
        '<button type="button" class="btn" data-act="w-model" aria-expanded="' + showModel + '">' + icon('eye') + ' ' + h(t(showModel ? 'Hide model answer' : 'Show model answer')) + '</button>' +
        '<button type="button" class="btn primary" data-act="w-finish">' + icon('check') + ' ' + h(t('Finish task')) + '</button></div></div>' +
        '<div class="w-feedback">' + (feedback ? feedbackHtml(feedback) : '') + '</div>' +
        (showModel ? '<div class="card"><h2>' + h(t('Model answer')) + '</h2><div class="model">' + h(w.model) + '</div><p class="note">' + h(t('This is one possible answer. Your text can be different and still be very good.')) + '</p></div>' : '') +
        '</div><aside class="scenario-side"><div class="card"><h3>' + h(t('Checklist')) + '</h3><div id="w-check">' + checklistHtml(saved.text) + '</div></div>' +
        '<div class="card"><h3>' + h(t('Suggested vocabulary')) + '</h3><p class="muted small">' + h(t('Click a phrase to add it to your text.')) + '</p><div class="chips">' + w.vocab.map(v => '<button type="button" class="chip" style="cursor:pointer" data-act="w-ins" data-text="' + h(v) + '">' + h(v) + '</button>').join('') + '</div></div>' +
        '<div class="card"><h3>' + h(t('Tips')) + '</h3><ul class="summary-list">' + w.tips.map(x => '<li>' + h(x) + '</li>').join('') + '</ul></div></aside></div>';
      const ed = root.querySelector('#w-editor');
      let timer = null;
      ed.addEventListener('input', () => {
        saved.text = ed.value;
        const s2 = stats(ed.value);
        root.querySelector('#w-count').innerHTML = '<b>' + s2.words + '</b> ' + h(t('words')) + ' · ' + s2.sentences + ' ' + h(t('sentences')) + ' · ' + s2.paragraphs + ' ' + h(t('paragraphs')) + (s2.words > w.max ? ' · <span style="color:var(--red)">' + h(t('too long')) + '</span>' : '');
        root.querySelector('#w-check').innerHTML = checklistHtml(ed.value);
        clearTimeout(timer);
        timer = setTimeout(() => { saved.updated = Date.now(); S.state.writing[id] = saved; S.save(); const el = root.querySelector('#w-saved'); if (el) el.textContent = t('Draft saved') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }, 600);
      });
      root.querySelector('#w-check').addEventListener('change', e => {
        if (e.target.dataset.tick != null) { saved.ticks[e.target.dataset.tick] = e.target.checked; S.save(); }
      });
    }
    function feedbackHtml(fb) {
      const groups = { spell: 'Spelling', grammar: 'Grammar and punctuation', style: 'Sentence structure and style' };
      return '<div class="card"><h2>' + h(t('Feedback')) + '</h2><div class="disclaimer">' + icon('info') + '<span>' + h(t('This is basic automatic feedback. It finds some common spelling patterns, grammar errors and sentence problems, but it cannot check everything. A teacher or the model answer can help you more.')) + '</span></div>' +
        '<p>' + fb.words + ' ' + h(t('words')) + ' · ' + fb.sentences + ' ' + h(t('sentences')) + ' · ' + h(t('average sentence length')) + ': ' + fb.avg + ' ' + h(t('words')) + '</p>' +
        (fb.words < w.min ? '<p class="tag warn">' + h(t('Your text is shorter than the task asks')) + ' (' + w.min + '+).</p>' : '') +
        (fb.words > w.max ? '<p class="tag warn">' + h(t('Your text is longer than the task asks')) + ' (' + t('max') + ' ' + w.max + ').</p>' : '') +
        (fb.issues.length ? Object.keys(groups).map(g => {
          const list = fb.issues.filter(i => i.type === g);
          return list.length ? '<h3 style="margin-top:12px">' + h(t(groups[g])) + '</h3><ul class="issues">' + list.map(i => '<li class="' + g + '">' + h(i.msg) + '</li>').join('') + '</ul>' : '';
        }).join('') : '<p class="feedback ok">' + h(t('We did not find common problems. Well done! Now compare your text with the model answer.')) + '</p>') + '</div>';
    }
    LP.ui.on(root, {
      'w-check': () => {
        if (!saved.text.trim()) { LP.ui.toast(t('Please write something first.'), 'error'); return; }
        feedback = check(saved.text, { formal, level: S.levelIdx(w.level) });
        draw();
        root.querySelector('.w-feedback').scrollIntoView({ block: 'start', behavior: LP.reducedMotion() ? 'auto' : 'smooth' });
      },
      'w-model': () => { showModel = !showModel; draw(); },
      'w-ins': b => {
        const ed = root.querySelector('#w-editor');
        const pos = ed.selectionStart || ed.value.length;
        const ins = b.dataset.text.replace(/…$/, '');
        const before = ed.value.slice(0, pos), after = ed.value.slice(pos);
        const pre = before && !/\s$/.test(before) ? ' ' : '';
        ed.value = before + pre + ins + after;
        ed.focus(); ed.setSelectionRange(pos + pre.length + ins.length, pos + pre.length + ins.length);
        ed.dispatchEvent(new Event('input'));
      },
      'w-finish': async () => {
        const st = stats(saved.text);
        if (st.words < 5) { LP.ui.toast(t('Please write your text first.'), 'error'); return; }
        if (st.words < w.min) {
          const ok = await LP.ui.confirm('Finish the task?', 'Your text has ' + st.words + ' words. The task asks for at least ' + w.min + '. You can still finish and continue later.', 'Finish');
          if (!ok) return;
        }
        const sc = score(saved.text);
        saved.updated = Date.now(); saved.finished = Date.now(); S.save();
        if (opts.onComplete) opts.onComplete(sc);
        const done = LP.ui.comp(root);
        done.innerHTML = '<div class="card complete-box">' + icon('check') + '<h2>' + h(t('Task complete!')) + '</h2><p>' + h(t('Checklist completed')) + ': <b>' + sc + '%</b></p><p class="muted">' + h(t('Your text is saved. You can come back and improve it at any time.')) + '</p>' +
          (opts.onExit ? '<button type="button" class="btn primary" data-act="exit">' + h(t(opts.exitLabel || 'Done')) + '</button>' : '') + '</div>';
        LP.ui.on(done, { exit: () => opts.onExit() });
        done.scrollIntoView({ block: 'center' });
      }
    });
    draw();
    return root;
  };
})();
