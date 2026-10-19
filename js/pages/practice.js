/* LinguaPath — Practice hub, Speak & Communicate (rule-based conversations) and pronunciation practice. */
(function () {
  const { h, t, icon, shuffle } = LP.ui;
  const S = LP.store;

  /* ---------------- conversation engine ---------------- */
  const QUALITY_POINTS = { good: 1, ok: 0.5, bad: 0, unknown: 0.5 };

  // opts: { mode: 'guided' | 'free', onComplete(score), onExit }
  LP.comp.scenario = function (parent, id, opts) {
    opts = opts || {};
    const sc = S.scenarioById[id];
    const root = LP.ui.comp(parent, 'two-col');
    const mode = opts.mode || 'guided';
    let node = sc.start;
    const log = [];        // { who: 'them'|'me', text, sk, q, fb, model }
    const results = [];    // quality per turn
    const tips = [];
    let showHints = S.state.settings.hints !== false;
    let showSk = S.state.settings.showSk;
    let readAloud = false;
    const order = {};      // shuffled option order per node
    let finished = false;

    function say(text) { if (readAloud) LP.speech.speak(text); }
    function pushThem(nid) {
      const n = sc.nodes[nid];
      log.push({ who: 'them', text: n.say, sk: n.sk });
      say(n.say);
    }
    pushThem(node);

    function side() {
      return '<aside class="scenario-side"><div class="card"><h2>' + h(t('The situation')) + '</h2><p>' + h(sc.situation) + '</p>' +
        '<p><b>' + h(t('Your role')) + ':</b> ' + h(sc.you) + '<br><b>' + h(t('The other person')) + ':</b> ' + h(sc.them) + '</p>' +
        '<label class="check"><input type="checkbox" data-opt="hints"' + (showHints ? ' checked' : '') + '> ' + h(t('Show hints and useful phrases')) + '</label>' +
        '<label class="check"><input type="checkbox" data-opt="sk"' + (showSk ? ' checked' : '') + '> ' + h(t('Show Slovak translations')) + '</label>' +
        (LP.speech.supported ? '<label class="check"><input type="checkbox" data-opt="aloud"' + (readAloud ? ' checked' : '') + '> ' + h(t('Read the other person’s lines aloud')) + '</label>' : '') + '</div>' +
        (showHints ? '<div class="card"><h3>' + h(t('Useful phrases')) + '</h3>' + sc.phrases.map(p => '<div class="phrase"><span>' + h(p[0]) + (showSk ? '<span class="sk">' + h(p[1]) + '</span>' : '') + '</span>' + LP.playBtn(p[0]) + '</div>').join('') + '</div>' +
          '<div class="card"><h3>' + h(t('Vocabulary support')) + '</h3>' + sc.vocab.map(v => '<div class="phrase"><span><b>' + h(v[0]) + '</b> — ' + h(v[1]) + '</span></div>').join('') + '</div>' : '') + '</aside>';
    }
    function chat() {
      return '<div class="chat" aria-live="polite">' + log.map(m => {
        if (m.who === 'them') return '<div class="bubble them"><span class="who">' + h(sc.themName) + '</span>' + h(m.text) + ' ' + LP.playBtn(m.text) + (showSk && m.sk ? '<span class="sk" lang="sk">' + h(m.sk) + '</span>' : '') + '</div>';
        return '<div class="bubble me ' + (m.q === 'good' ? '' : m.q) + '"><span class="who">' + h(t('You')) + '</span>' + h(m.text) + '</div>' +
          '<div class="bubble-fb ' + (m.q === 'unknown' ? 'ok' : m.q) + '">' + icon(m.q === 'good' ? 'check' : m.q === 'bad' ? 'x' : 'info') + '<span>' + h(m.fb) + (m.model ? '<br><b>' + h(t('Model answer')) + ':</b> ' + h(m.model) : '') + '</span></div>';
      }).join('') + '</div>';
    }
    function draw() {
      const n = sc.nodes[node];
      let input = '';
      if (finished) input = summary();
      else if (mode === 'guided') {
        if (!order[node]) order[node] = shuffle(n.o.map((_, i) => i));
        input = '<h3>' + h(t('Choose your answer')) + '</h3><div class="reply-opts">' + order[node].map(i => '<button type="button" class="option" data-act="sc-pick" data-i="' + i + '">' + h(n.o[i][0]) + '</button>').join('') + '</div>';
      } else {
        input = '<form class="free-form"><label for="free-in"><b>' + h(t('Write your answer')) + '</b></label>' +
          '<div class="row" style="margin-top:6px"><input id="free-in" type="text" autocomplete="off" maxlength="300" style="flex:1" placeholder="' + h(t('Type your reply in English…')) + '">' +
          (LP.speech.recognitionSupported ? '<button type="button" class="icon-btn" data-act="sc-mic" aria-label="' + h(t('Speak your answer')) + '" title="' + h(t('Speak your answer')) + '">' + icon('mic') + '</button>' : '') +
          '<button type="submit" class="btn primary">' + h(t('Send')) + '</button></div>' +
          (showHints ? '<p class="note">' + icon('lightbulb') + ' ' + h(t('Hint')) + ': ' + h(t('the other person said')) + ' “' + h(n.say) + '”. ' + h(t('Use the useful phrases on the right.')) + '</p>' : '') +
          '<p class="note">' + icon('info') + ' ' + h(t('Feedback in this mode is approximate. The app compares your answer with expected answers and checks some common mistakes. It does not understand every sentence.')) + '</p></form>';
      }
      root.innerHTML = '<div><div class="card"><div class="row between"><h2 style="margin:0">' + h(sc.title) + '</h2><span class="tag">' + h(t(mode === 'guided' ? 'Guided mode' : 'Free conversation mode')) + '</span></div>' + chat() + '<div class="sc-input">' + input + '</div></div></div>' + side();
      const form = root.querySelector('.free-form');
      if (form) {
        form.addEventListener('submit', e => { e.preventDefault(); const v = form.querySelector('#free-in').value.trim(); if (!v) { LP.ui.toast(t('Please write an answer first.'), 'error'); return; } freeAnswer(v); });
        setTimeout(() => { const i = form.querySelector('#free-in'); if (i) i.focus({ preventScroll: true }); }, 30);
      }
      root.querySelectorAll('[data-opt]').forEach(c => c.addEventListener('change', () => {
        if (c.dataset.opt === 'hints') showHints = c.checked;
        if (c.dataset.opt === 'sk') showSk = c.checked;
        if (c.dataset.opt === 'aloud') { readAloud = c.checked; if (!readAloud) LP.speech.stop(); }
        draw();
      }));
      const chatEl = root.querySelector('.chat'); if (chatEl && log.length > 2) { const last = chatEl.lastElementChild; if (last) last.scrollIntoView({ block: 'nearest' }); }
    }
    function advance(next) {
      node = next;
      pushThem(node);
      if (sc.nodes[node].end) finish();
      draw();
    }
    function pick(i) {
      const n = sc.nodes[node];
      const o = n.o[i];
      log.push({ who: 'me', text: o[0], q: o[1], fb: o[2] });
      results.push(o[1]);
      if (o[1] !== 'good') tips.push(o[2]);
      advance(o[3]);
    }
    function freeAnswer(text) {
      const n = sc.nodes[node];
      const goodOpt = n.o.find(o => o[1] === 'good');
      let best = null, bestScore = 0;
      n.o.forEach(o => { const c = LP.speech.compare(o[0], text); if (c.score > bestScore) { bestScore = c.score; best = o; } });
      const issues = LP.writingCheck ? LP.writingCheck.quick(text) : [];
      let q, fb, next;
      if (best && bestScore >= 60) {
        q = best[1]; fb = (q === 'good' ? t('Good! Your answer is close to an expected answer.') + ' ' : t('Your answer looks like this option:') + ' “' + best[0] + '”. ') + best[2]; next = q === 'bad' ? goodOpt[3] : best[3];
      } else {
        q = 'unknown';
        fb = t('We could not check this answer exactly. Compare it with the model answer.');
        next = goodOpt[3];
      }
      if (issues.length) { fb += ' ' + t('Also check') + ': ' + issues.slice(0, 2).join(' '); if (q === 'good') q = 'ok'; }
      log.push({ who: 'me', text, q, fb, model: goodOpt[0] });
      results.push(q);
      if (q !== 'good') tips.push(q === 'unknown' ? t('Model answer') + ': ' + goodOpt[0] : fb);
      advance(next);
    }
    function finish() {
      finished = true;
      const sc100 = Math.round(100 * results.reduce((s, q) => s + QUALITY_POINTS[q], 0) / Math.max(1, results.length));
      S.recordTopic('speaking:' + sc.level, 'Speaking (' + sc.level + ')', 'speaking', sc100 >= 75);
      if (opts.onComplete) opts.onComplete(sc100);
      finish.score = sc100;
    }
    function summary() {
      const s = finish.score;
      const g = results.filter(q => q === 'good').length, ok = results.filter(q => q === 'ok' || q === 'unknown').length, bad = results.filter(q => q === 'bad').length;
      const r = LP.ui.rating(s);
      return '<div class="card soft"><h3>' + h(t('Conversation feedback')) + '</h3><p class="rating ' + r.cls + '">' + s + '% · ' + h(t(r.label)) + '</p>' +
        '<div class="row"><span class="tag done">' + h(t('Good answers')) + ': ' + g + '</span><span class="tag warn">' + h(t('OK answers')) + ': ' + ok + '</span><span class="tag bad">' + h(t('Answers to improve')) + ': ' + bad + '</span></div>' +
        (tips.length ? '<h4 style="margin-top:12px">' + h(t('Tips for next time')) + '</h4><ul class="summary-list">' + tips.map(x => '<li>' + h(x) + '</li>').join('') + '</ul>' : '<p style="margin-top:10px">' + h(t('Excellent! All your answers were natural and correct.')) + '</p>') +
        (mode === 'free' ? '<p class="note">' + h(t('Remember: feedback in free mode is approximate.')) + '</p>' : '') +
        '<div class="quiz-nav"><button type="button" class="btn" data-act="sc-again">' + icon('repeat') + ' ' + h(t('Try again')) + '</button>' +
        (mode === 'guided' ? '<a class="btn" href="#/practice/free/' + sc.id + '">' + h(t('Try free conversation mode')) + '</a>' : '<a class="btn" href="#/practice/speak/' + sc.id + '">' + h(t('Guided mode')) + '</a>') +
        (opts.onExit ? '<button type="button" class="btn primary" data-act="sc-exit">' + h(t(opts.exitLabel || 'Done')) + '</button>' : '') + '</div></div>';
    }
    let stopRec = null;
    LP.ui.on(root, {
      'sc-pick': b => pick(+b.dataset.i),
      'sc-again': () => { parent.innerHTML = ''; LP.comp.scenario(parent, id, opts); },
      'sc-exit': () => opts.onExit(),
      'sc-mic': b => {
        if (stopRec) { stopRec(); return; }
        b.classList.add('on');
        stopRec = LP.speech.listen({
          onresult: txt => { const i = root.querySelector('#free-in'); if (i) i.value = txt; },
          onerror: err => LP.ui.toast(t(err === 'not-allowed' ? 'Microphone access was blocked.' : 'Speech recognition did not work. Please type instead.'), 'error'),
          onend: () => { stopRec = null; b.classList.remove('on'); }
        });
      },
      say: b => LP.speech.speak(b.dataset.text)
    });
    draw();
    return root;
  };

  /* ---------------- pronunciation ---------------- */
  function pronunciationPage(root) {
    root.innerHTML = LP.pageHead('Pronunciation practice', 'Listen to a sentence, then say it or type it.', '', [['Practice', '#/practice'], ['Pronunciation']]);
    const box = LP.ui.comp(root);
    let level = S.state.profile.level;
    let list = [], i = 0, said = null, typed = null, listening = null;
    function build() { list = shuffle(S.WORDS.filter(w => w.level === level).map(w => w.ex)); i = 0; said = typed = null; }
    build();
    function draw() {
      const target = list[i];
      const res = said != null ? LP.speech.compare(target, said) : typed != null ? LP.speech.compare(target, typed) : null;
      box.innerHTML = '<div class="disclaimer">' + icon('info') + '<span>' + h(t('Speech recognition shows which words the browser heard. This is not an exact measure of your pronunciation quality. Use it as practice, and listen carefully to the model.')) + '</span></div>' +
        '<div class="row" style="margin-bottom:14px"><span class="muted">' + h(t('Level')) + ':</span><div class="seg">' + S.LEVEL_ORDER.map(l => '<button type="button" data-act="lv" data-v="' + l + '" class="' + (l === level ? 'on' : '') + '" aria-pressed="' + (l === level) + '">' + l + '</button>').join('') + '</div></div>' +
        '<div class="card"><p class="muted">' + h(t('Sentence')) + ' ' + (i + 1) + ' / ' + list.length + '</p><p class="q-text" style="font-size:1.35rem">' + h(target) + '</p>' +
        '<div class="row">' + (LP.speech.supported ? '<button type="button" class="btn" data-act="play">' + icon('volume') + ' ' + h(t('Listen')) + '</button><button type="button" class="btn" data-act="slow">' + icon('volume') + ' ' + h(t('Listen slowly')) + '</button>' : '<span class="note">' + h(t('Speech playback is not available in this browser.')) + '</span>') +
        (LP.speech.recognitionSupported ? '<button type="button" class="btn primary' + (listening ? ' on' : '') + '" data-act="speak">' + icon('mic') + ' ' + h(t(listening ? 'Listening… click to stop' : 'Say it')) + '</button>' : '') + '</div>' +
        (!LP.speech.recognitionSupported ? '<p class="note" style="margin-top:10px">' + icon('info') + ' ' + h(t('Speech recognition is not available in this browser. Use the typing practice below: listen and type what you hear.')) + '</p>' : '') +
        '<form class="row" id="dict" style="margin-top:14px"><label class="sr-only" for="dict-in">' + h(t('Type what you hear')) + '</label><input id="dict-in" type="text" autocomplete="off" style="flex:1" placeholder="' + h(t('Type what you hear (dictation)…')) + '"><button type="submit" class="btn">' + h(t('Check')) + '</button></form>' +
        (res ? '<div class="feedback ' + (res.score >= 90 ? 'ok' : res.score >= 60 ? 'part' : 'bad') + '" role="status"><p><b>' + h(t(said != null ? 'The browser heard' : 'You typed')) + ':</b> “' + h(said != null ? said : typed) + '”</p>' +
          '<p class="diff">' + res.words.map(w => '<span class="' + (w.ok ? 'ok' : 'miss') + '">' + h(w.w) + '</span>').join(' ') + '</p>' +
          '<p><b>' + h(t('Word match')) + ': ' + res.score + '%</b>. ' + h(t(res.score >= 90 ? 'Very close to the sentence!' : res.score >= 60 ? 'Good try. Listen again to the words marked in red.' : 'Listen again slowly and try once more.')) + '</p>' +
          (res.missing.length ? '<p class="muted">' + h(t('Words to practise')) + ': ' + res.missing.map(h).join(', ') + '</p>' : '') + '</div>' : '') +
        '<div class="quiz-nav" style="margin-top:14px"><button type="button" class="btn ghost" data-act="prev"' + (i === 0 ? ' disabled' : '') + '>' + icon('arrowL') + ' ' + h(t('Previous')) + '</button><button type="button" class="btn primary" data-act="next">' + h(t('Next sentence')) + ' ' + icon('arrowR') + '</button></div></div>';
      box.querySelector('#dict').addEventListener('submit', e => { e.preventDefault(); const v = box.querySelector('#dict-in').value.trim(); if (!v) return; typed = v; said = null; S.logEvent('practice', 'Pronunciation (dictation)', 'listening', LP.speech.compare(list[i], v).score); draw(); });
    }
    LP.ui.on(box, {
      lv: b => { level = b.dataset.v; build(); draw(); },
      play: () => LP.speech.speak(list[i]),
      slow: () => LP.speech.speak(list[i], { rate: 0.6 }),
      next: () => { i = (i + 1) % list.length; said = typed = null; draw(); },
      prev: () => { i = Math.max(0, i - 1); said = typed = null; draw(); },
      speak: () => {
        if (listening) { listening(); return; }
        listening = LP.speech.listen({
          onresult: txt => { said = txt; typed = null; S.logEvent('practice', 'Pronunciation (speaking)', 'speaking', LP.speech.compare(list[i], txt).score); },
          onerror: err => LP.ui.toast(t(err === 'not-allowed' ? 'Microphone access was blocked.' : err === 'no-speech' ? 'No speech was detected. Please try again.' : 'Speech recognition did not work. Please type instead.'), 'error'),
          onend: () => { listening = null; draw(); }
        });
        draw();
      }
    });
    draw();
  }

  /* ---------------- hub & lists ---------------- */
  let levelFilter = null;
  function levelSeg(base) {
    const lv = levelFilter || S.state.profile.level;
    return '<div class="row" style="margin-bottom:14px"><span class="muted">' + h(t('Level')) + ':</span><div class="seg" role="group" aria-label="' + h(t('Level')) + '">' +
      ['all'].concat(S.LEVEL_ORDER).map(l => '<button type="button" data-act="flt" data-v="' + l + '" class="' + (l === lv ? 'on' : '') + '" aria-pressed="' + (l === lv) + '">' + h(l === 'all' ? t('All') : l) + '</button>').join('') + '</div></div>';
  }
  function inLevel(x) { const lv = levelFilter || S.state.profile.level; return lv === 'all' || x.level === lv; }
  function doneTag(key) { const d = S.state.done[key]; return d ? '<span class="tag done">' + icon('check') + ' ' + (d.best != null ? d.best + '%' : h(t('Done'))) + '</span>' : ''; }

  function hub(root) {
    root.innerHTML = LP.pageHead('Practice', 'Practise speaking, pronunciation, reading, listening and writing.');
    const box = LP.ui.comp(root);
    const cnt = (arr, key) => arr.filter(x => S.isDone(key + x.id)).length + ' / ' + arr.length;
    box.innerHTML = '<div class="mode-grid">' +
      card('#/practice/speak', 'chat', 'Speak & Communicate', 'Realistic conversations with choices and feedback.', cnt(LP.SCENARIOS, 'scenario:')) +
      card('#/practice/pronunciation', 'mic', 'Pronunciation', 'Listen, repeat and compare.', '') +
      card('#/practice/reading', 'book', 'Reading', 'Original texts with questions.', cnt(LP.TEXTS.filter(x => x.kind === 'reading'), 'text:')) +
      card('#/practice/listening', 'ear', 'Listening', 'Recordings read by your browser.', cnt(LP.TEXTS.filter(x => x.kind === 'listening'), 'text:')) +
      card('#/practice/writing', 'pen', 'Writing', 'Tasks with checklists, feedback and model answers.', cnt(LP.WRITING, 'writing:')) +
      card('#/self', 'smile', 'How Do You Feel About Your English?', 'Rate your confidence and reflect.', '') + '</div>';
    function card(href, ic, title, desc, extra) { return '<a class="mode" href="' + href + '">' + icon(ic) + '<b>' + h(t(title)) + '</b><small>' + h(t(desc)) + '</small>' + (extra ? '<span class="tag" style="align-self:flex-start">' + extra + ' ' + h(t('done')) + '</span>' : '') + '</a>'; }
  }

  function speakList(root) {
    root.innerHTML = LP.pageHead('Speak & Communicate', 'Practise real conversations. Choose answers in guided mode, or write your own in free mode.', '', [['Practice', '#/practice'], ['Speak & Communicate']]);
    const box = LP.ui.comp(root);
    function draw() {
      const list = LP.SCENARIOS.filter(inLevel);
      box.innerHTML = levelSeg() + '<div class="g-index">' + list.map(sc => '<div class="g-item"><div class="row between"><span class="tag lv">' + sc.level + '</span>' + doneTag('scenario:' + sc.id) + '</div><b>' + h(sc.title) + '</b><p>' + h(sc.situation) + '</p>' +
        '<div class="row" style="margin-top:6px"><a class="btn small primary" href="#/practice/speak/' + sc.id + '">' + h(t('Guided mode')) + '</a><a class="btn small" href="#/practice/free/' + sc.id + '">' + h(t('Free mode')) + '</a></div></div>').join('') + '</div>';
    }
    LP.ui.on(box, { flt: b => { levelFilter = b.dataset.v; draw(); } });
    draw();
  }
  function scenarioPage(root, id, mode) {
    const sc = S.scenarioById[id];
    if (!sc) { root.innerHTML = LP.ui.empty('info', 'Conversation not found.', '', '<a class="btn primary" href="#/practice/speak">' + h(t('All conversations')) + '</a>'); return; }
    root.innerHTML = LP.pageHead(sc.title, sc.level + ' · ' + t(mode === 'free' ? 'Free conversation mode' : 'Guided mode'), '', [['Practice', '#/practice'], ['Speak & Communicate', '#/practice/speak'], [sc.title]]);
    LP.comp.scenario(root, id, { mode, onComplete: s => S.markDone('scenario:' + id, s, 'Conversation: ' + sc.title, 'speaking'), onExit: () => LP.go('#/practice/speak'), exitLabel: 'All conversations' });
  }
  function textList(root, kind) {
    const title = kind === 'reading' ? 'Reading' : 'Listening';
    root.innerHTML = LP.pageHead(title + ' practice', kind === 'reading' ? 'Read original texts. Click highlighted words for help, then answer the questions.' : 'Listen to recordings read by your browser. You can slow them down and repeat sentences.', '', [['Practice', '#/practice'], [title]]);
    const box = LP.ui.comp(root);
    function draw() {
      const list = LP.TEXTS.filter(x => x.kind === kind && inLevel(x));
      box.innerHTML = levelSeg() + '<div class="g-index">' + list.map(tx => '<a class="g-item" href="#/practice/' + kind + '/' + tx.id + '"><div class="row between"><span class="tag lv">' + tx.level + '</span>' + doneTag('text:' + tx.id) + '</div><b>' + h(tx.title) + '</b><p>' + h(tx.topic) + ' · ' + LP.textMinutes(tx) + ' min</p></a>').join('') + '</div>';
    }
    LP.ui.on(box, { flt: b => { levelFilter = b.dataset.v; draw(); } });
    draw();
  }
  function textPage(root, kind, id) {
    const tx = S.textById[id];
    if (!tx || tx.kind !== kind) { root.innerHTML = LP.ui.empty('info', 'Text not found.', '', '<a class="btn primary" href="#/practice/' + kind + '">' + h(t('Back')) + '</a>'); return; }
    root.innerHTML = LP.pageHead(tx.title, tx.level + ' · ' + tx.topic, '', [['Practice', '#/practice'], [kind === 'reading' ? 'Reading' : 'Listening', '#/practice/' + kind], [tx.title]]);
    LP.comp.text(root, id, { onComplete: s => S.markDone('text:' + id, s, (kind === 'reading' ? 'Reading: ' : 'Listening: ') + tx.title, kind), onExit: () => LP.go('#/practice/' + kind), exitLabel: 'More texts' });
  }
  function writingList(root) {
    root.innerHTML = LP.pageHead('Writing practice', 'Write texts for real situations. Your drafts are saved automatically.', '', [['Practice', '#/practice'], ['Writing']]);
    const box = LP.ui.comp(root);
    function draw() {
      const list = LP.WRITING.filter(inLevel);
      box.innerHTML = levelSeg() + '<div class="g-index">' + list.map(w => {
        const d = S.state.writing[w.id];
        return '<a class="g-item" href="#/practice/writing/' + w.id + '"><div class="row between"><span class="tag lv">' + w.level + '</span>' + (S.isDone('writing:' + w.id) ? '<span class="tag done">' + icon('check') + ' ' + h(t('Done')) + '</span>' : d && d.text ? '<span class="tag warn">' + h(t('Draft saved')) + '</span>' : '') + '</div><b>' + h(w.title) + '</b><p>' + h(w.type) + ' · ' + w.min + '–' + w.max + ' ' + h(t('words')) + '</p></a>';
      }).join('') + '</div>';
    }
    LP.ui.on(box, { flt: b => { levelFilter = b.dataset.v; draw(); } });
    draw();
  }
  function writingPage(root, id) {
    const w = S.writingById[id];
    if (!w) { root.innerHTML = LP.ui.empty('info', 'Task not found.', '', '<a class="btn primary" href="#/practice/writing">' + h(t('Back')) + '</a>'); return; }
    root.innerHTML = LP.pageHead(w.title, w.level + ' · ' + w.type, '', [['Practice', '#/practice'], ['Writing', '#/practice/writing'], [w.title]]);
    LP.comp.writing(root, id, { onComplete: s => S.markDone('writing:' + id, s, 'Writing: ' + w.title, 'writing'), onExit: () => LP.go('#/practice/writing'), exitLabel: 'More writing tasks' });
  }

  LP.pages.practice = function (root, parts) {
    const [sub, id] = parts;
    if (sub === 'speak') return id ? scenarioPage(root, id, 'guided') : speakList(root);
    if (sub === 'free') return scenarioPage(root, id, 'free');
    if (sub === 'pronunciation') return pronunciationPage(root);
    if (sub === 'reading' || sub === 'listening') return id ? textPage(root, sub, id) : textList(root, sub);
    if (sub === 'writing') return id ? writingPage(root, id) : writingList(root);
    return hub(root);
  };
})();
