/* LinguaPath — question generators and the test catalogue. */
window.LP = window.LP || {};

(function () {
  const S = LP.store;
  const { shuffle, sample } = LP.ui;

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  // Find the word in its example sentence and replace it with a gap.
  function gap(word) {
    const re = new RegExp(escapeRe(word.w).replace(/'/g, "['’]"), 'i');
    const m = word.ex.match(re);
    if (!m) return null;
    return { text: word.ex.replace(re, '_____'), found: m[0] };
  }
  function distractors(word, pool, n, field) {
    const others = pool.filter(w => w.id !== word.id && w[field] !== word[field]);
    const samePos = others.filter(w => w.pos === word.pos);
    const pick = sample(samePos, n);
    if (pick.length < n) pick.push(...sample(others.filter(w => !pick.includes(w)), n - pick.length));
    return pick;
  }
  function mcFrom(word, pool, field, makeQ, e, extra) {
    const opts = shuffle([word].concat(distractors(word, pool, 3, field)));
    return Object.assign({ t: 'mc', q: makeQ, o: opts.map(w => w[field]), a: opts.indexOf(word), e }, meta(word), extra || {});
  }
  function meta(word) { return { skill: 'vocabulary', topic: 'vocab:' + word.topic, topicLabel: 'Vocabulary: ' + word.topic, wordId: word.id }; }

  const vocabMakers = {
    meaning: (w, pool) => mcFrom(w, pool, 'def', 'What does “' + w.w + '” mean?', '“' + w.w + '” means: ' + w.def + ' Example: ' + w.ex),
    word: (w, pool) => mcFrom(w, pool, 'w', 'Which word or phrase means: “' + w.def + '”?', 'The answer is “' + w.w + '”. Example: ' + w.ex),
    choose: (w, pool) => { const g = gap(w); if (!g) return null; return mcFrom(w, pool, 'w', g.text, 'The sentence is: ' + w.ex, { prompt: 'Choose the correct word for the sentence.' }); },
    translate: (w, pool) => w.sk ? mcFrom(w, pool, 'w', 'Which English word or phrase means “' + w.sk + '” in Slovak?', '“' + w.sk + '” = “' + w.w + '”.', { prompt: 'Match the translation.' }) : null,
    fill: w => { const g = gap(w); if (!g) return null; return Object.assign({ t: 'fill', q: g.text, a: [g.found, w.w], e: 'The full sentence is: ' + w.ex, hint: w.def }, meta(w)); },
    type: w => Object.assign({ t: 'type', q: 'Write the word or phrase that means: “' + w.def + '” (It starts with “' + w.w.charAt(0) + '”.)', a: [w.w], e: 'The answer is “' + w.w + '”.', prompt: 'Type the correct word.' }, meta(w)),
    spell: w => Object.assign({ t: 'type', q: LP.speech.supported ? 'Listen and write the word or phrase you hear.' : 'Spell the word: ' + w.w.split('').map((c, i) => i % 2 ? '_' : c).join(''), audio: LP.speech.supported ? w.w : undefined, a: [w.w], e: 'The spelling is “' + w.w + '”. Meaning: ' + w.def, hint: w.def, prompt: 'Spelling.' }, meta(w)),
    order: w => w.ex.split(/\s+/).length <= 10 ? Object.assign({ t: 'order', a: w.ex, e: 'The sentence is: ' + w.ex, prompt: 'Complete the example sentence: put the words in order.' }, meta(w)) : null
  };
  function vocabMatch(words, field) {
    const ws = words.slice(0, 4);
    return Object.assign({ t: 'match', q: field === 'sk' ? 'Match the words with their Slovak translations.' : 'Match the words with their meanings.', pairs: ws.map(w => [w.w, w[field]]), e: ws.map(w => w.w + ' = ' + w[field]).join('; ') }, meta(ws[0]),
      { topic: 'vocab:' + ws[0].topic, topicLabel: 'Vocabulary: ' + ws[0].topic });
  }

  // Generate vocabulary questions for a list of words.
  function vocabQuestions(words, n, types, pool) {
    pool = pool && pool.length >= 4 ? pool : S.allWords().filter(w => w.level === (words[0] || {}).level);
    if (pool.length < 4) pool = S.WORDS;
    types = types || ['meaning', 'word', 'choose', 'fill', 'type', 'translate'];
    const out = [];
    const list = shuffle(words);
    let ti = Math.floor(Math.random() * types.length);
    for (let i = 0; out.length < n && i < list.length * 3; i++) {
      const w = list[i % list.length];
      const q = vocabMakers[types[ti % types.length]](w, pool);
      ti++;
      if (q && !out.some(x => x.wordId === w.id && x.t === q.t)) out.push(q);
    }
    return out.slice(0, n);
  }

  function grammarQ(g, q) {
    return Object.assign({}, q, { skill: 'grammar', topic: 'grammar:' + g.id, topicLabel: 'Grammar: ' + g.title, _tokens: undefined, _rights: undefined });
  }
  function grammarQuestions(gids, n) {
    const all = [];
    gids.forEach(id => { const g = S.grammarById[id]; if (g) g.exercise.forEach(q => all.push(grammarQ(g, q))); });
    // Spread questions across topics.
    const byTopic = {}; all.forEach(q => { (byTopic[q.topic] = byTopic[q.topic] || []).push(q); });
    Object.keys(byTopic).forEach(k => { byTopic[k] = shuffle(byTopic[k]); });
    const out = []; let added = true;
    while (out.length < n && added) { added = false; Object.keys(byTopic).forEach(k => { if (out.length < n && byTopic[k].length) { out.push(byTopic[k].shift()); added = true; } }); }
    return shuffle(out);
  }
  function textQuestions(tx, n) {
    const qs = tx.questions.map(q => Object.assign({}, q, {
      skill: tx.kind, topic: tx.kind + ':' + tx.level, topicLabel: (tx.kind === 'reading' ? 'Reading' : 'Listening') + ' comprehension (' + tx.level + ')',
      passage: tx.kind === 'reading' ? tx.id : undefined, audio: tx.kind === 'listening' ? tx.id : undefined
    }));
    return n ? qs.slice(0, n) : qs;
  }

  /* ---------------- test catalogue ---------------- */
  function unitTest(u) {
    const words = S.WORDS.filter(w => w.unit === u.id);
    const pool = S.WORDS.filter(w => w.level === u.level);
    const tx = S.textById[u.text];
    const qs = vocabQuestions(words, 3, ['meaning', 'choose', 'fill'], pool)
      .concat([vocabMatch(sample(words, 4), 'def')])
      .concat(grammarQuestions([u.grammar], 4))
      .concat(sample(textQuestions(tx), 2));
    return qs;
  }

  function catalogue() {
    const list = [{ id: 'placement', title: 'Placement Test', kind: 'placement', level: null, skill: 'mixed', count: LP.PLACEMENT.length, minutes: 15, desc: 'Not sure about your level? Get an approximate recommendation.' }];
    S.LEVEL_ORDER.forEach(lv => {
      list.push({ id: 'vocab-' + lv, title: lv + ' Vocabulary Test', kind: 'vocabulary', level: lv, skill: 'vocabulary', count: 15, minutes: 10, desc: 'Meanings, gaps, spelling and translations.' });
      list.push({ id: 'grammar-' + lv, title: lv + ' Grammar Test', kind: 'grammar', level: lv, skill: 'grammar', count: 15, minutes: 12, desc: 'All ' + lv + ' grammar topics, different question types.' });
      list.push({ id: 'reading-' + lv, title: lv + ' Reading Test', kind: 'reading', level: lv, skill: 'reading', count: 10, minutes: 15, desc: 'Two texts with comprehension questions.' });
      list.push({ id: 'listening-' + lv, title: lv + ' Listening Test', kind: 'listening', level: lv, skill: 'listening', count: 10, minutes: 15, desc: 'Two recordings with questions.' });
      LP.UNITS.filter(u => u.level === lv).forEach(u => list.push({ id: 'unit-' + u.id, title: 'Unit ' + u.n + ': ' + u.title, kind: 'unit', level: lv, skill: 'mixed', count: 10, minutes: 10, unit: u.id, desc: 'Mixed-skill unit test.' }));
      list.push({ id: 'level-' + lv, title: lv + ' Full Level Review', kind: 'level', level: lv, skill: 'mixed', count: 24, minutes: 25, desc: 'Vocabulary, grammar, reading and listening from the whole level.' });
    });
    return list;
  }

  function buildTest(id) {
    const meta = catalogue().find(x => x.id === id);
    if (!meta) return null;
    let qs = [];
    const lv = meta.level;
    const levelWords = S.WORDS.filter(w => w.level === lv);
    const units = LP.UNITS.filter(u => u.level === lv);
    const texts = kind => LP.TEXTS.filter(x => x.level === lv && x.kind === kind);
    switch (meta.kind) {
      case 'placement':
        qs = LP.PLACEMENT.map(q => Object.assign({}, q, { topic: 'placement:' + q.lv, topicLabel: 'Level ' + q.lv + ' questions' }));
        break;
      case 'vocabulary':
        qs = vocabQuestions(sample(levelWords, 14), 13, ['meaning', 'word', 'choose', 'fill', 'type', 'spell', 'translate'], levelWords)
          .concat([vocabMatch(sample(levelWords, 4), 'def'), vocabMatch(sample(levelWords, 4), 'sk')]);
        break;
      case 'grammar':
        qs = grammarQuestions(units.map(u => u.grammar), 15);
        break;
      case 'reading': case 'listening':
        sample(texts(meta.kind), 2).forEach(tx => { qs = qs.concat(textQuestions(tx)); });
        break;
      case 'unit':
        qs = unitTest(S.unitById[meta.unit]);
        break;
      case 'level':
        qs = vocabQuestions(sample(levelWords, 8), 7, ['meaning', 'choose', 'fill', 'translate'], levelWords)
          .concat([vocabMatch(sample(levelWords, 4), 'def')])
          .concat(grammarQuestions(units.map(u => u.grammar), 10))
          .concat(sample(textQuestions(sample(texts('reading'), 1)[0]), 3))
          .concat(sample(textQuestions(sample(texts('listening'), 1)[0]), 3));
        break;
    }
    if (meta.kind !== 'reading' && meta.kind !== 'listening' && meta.kind !== 'placement') {
      // Keep text questions grouped at the end so the passage is read once.
      const textQs = qs.filter(q => q.passage || (q.audio && LP.store.textById[q.audio]));
      qs = qs.filter(q => !textQs.includes(q)).concat(textQs);
    }
    return Object.assign({}, meta, { questions: qs, timeLimit: meta.minutes * 60 });
  }

  // Placement result: highest level where the learner gets at least 3 of 5 and all lower levels too.
  function placementLevel(answers) {
    const per = {}; S.LEVEL_ORDER.forEach(l => { per[l] = { right: 0, total: 0 }; });
    answers.forEach(a => { const lv = a.q.lv; per[lv].total++; per[lv].right += a.s; });
    let level = 'A1';
    for (const l of S.LEVEL_ORDER) { if (per[l].total && per[l].right / per[l].total >= 0.6) level = l; else break; }
    return { level, per };
  }

  LP.gen = { vocabQuestions, vocabMatch, grammarQuestions, textQuestions, unitTest, catalogue, buildTest, placementLevel, gap, vocabMakers };
})();
