/* LinguaPath — local data store: progress, spaced repetition, activity tracking, statistics and recommendations.
   Everything is saved in localStorage. Nothing leaves the browser. */
window.LP = window.LP || {};

(function () {
  const KEY = 'linguapath.v1';
  const DAY = 86400000;
  const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1'];

  /* ---------------- dates ---------------- */
  function dayKey(d) {
    d = d ? new Date(d) : new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function parseDay(k) { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function weekStart(d) { const x = new Date(d || Date.now()); x.setHours(0, 0, 0, 0); const wd = (x.getDay() + 6) % 7; return addDays(x, -wd); }
  function weekDays(d) { const s = weekStart(d); return Array.from({ length: 7 }, (_, i) => addDays(s, i)); }

  /* ---------------- default state ---------------- */
  function defaults() {
    return {
      version: 1,
      created: Date.now(),
      profile: {
        onboarded: false, level: 'A1', goals: [], dailyGoal: 10,
        confidence: { speaking: 3, listening: 3, reading: 3, writing: 3, grammar: 3, vocabulary: 3 }
      },
      settings: {
        lang: 'en', showSk: false, theme: 'system', reducedMotion: false, speechRate: 0.9, voice: '',
        preferredSkills: [], hints: true, timer: true, reminder: { enabled: false, time: '18:00' }
      },
      done: {},          // contentKey -> { score, best, date, attempts }
      vocab: {},         // wordId -> SRS card
      customWords: [],   // words saved by the learner
      tests: [],         // test results
      activity: {},      // dayKey -> { seconds, items }
      events: [],        // recent activity log
      topicStats: {},    // topic -> { label, skill, right, wrong, last }
      writing: {},       // taskId -> { text, updated, ticks }
      selfAssess: [],
      goals: { weeklyDays: 5, weeklyMinutes: 70, targetLevel: 'B1', targetDate: '', skills: [], custom: [] },
      placement: null
    };
  }

  function deepMerge(base, extra) {
    if (!extra || typeof extra !== 'object' || Array.isArray(extra)) return base;
    Object.keys(extra).forEach(k => {
      if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) && extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k])) {
        base[k] = deepMerge(base[k], extra[k]);
      } else if (extra[k] !== undefined) base[k] = extra[k];
    });
    return base;
  }

  let state = defaults();
  let storageOk = true;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) state = deepMerge(defaults(), JSON.parse(raw));
    } catch (e) { storageOk = false; console.warn('LinguaPath: could not read saved data', e); }
  }
  let saveTimer = null, dirty = false;
  function save(now) {
    clearTimeout(saveTimer);
    dirty = true;
    const doSave = () => {
      try { localStorage.setItem(KEY, JSON.stringify(state)); storageOk = true; dirty = false; } catch (e) { storageOk = false; console.warn('LinguaPath: could not save', e); }
    };
    if (now) doSave(); else saveTimer = setTimeout(doSave, 300);
  }
  // Save pending changes when the page closes (but never overwrite newer data with an unchanged copy).
  const flush = () => { if (dirty) save(true); };
  window.addEventListener('beforeunload', flush);
  window.addEventListener('pagehide', flush);
  // Keep several open tabs in sync.
  window.addEventListener('storage', e => {
    if (e.key !== KEY || dirty) return;
    try { state = e.newValue ? deepMerge(defaults(), JSON.parse(e.newValue)) : defaults(); document.dispatchEvent(new CustomEvent('lp:tick')); } catch (err) { /* ignore */ }
  });

  /* ---------------- content indexes ---------------- */
  const unitById = {}; LP.UNITS.forEach(u => { unitById[u.id] = u; });
  const grammarById = {}; LP.GRAMMAR.forEach(g => { grammarById[g.id] = g; });
  const textById = {}; LP.TEXTS.forEach(t => { textById[t.id] = t; });
  const scenarioById = {}; LP.SCENARIOS.forEach(s => { scenarioById[s.id] = s; });
  const writingById = {}; LP.WRITING.forEach(w => { writingById[w.id] = w; });

  // Vocabulary entries
  const WORDS = [];
  Object.keys(LP.VOCAB_RAW).forEach(uid => {
    const u = unitById[uid];
    LP.VOCAB_RAW[uid].forEach((r, i) => {
      WORDS.push({ id: uid + '-' + i, w: r[0], pos: r[1], def: r[2], ex: r[3], sk: r[4], level: u.level, topic: u.topic, unit: uid });
    });
  });
  const wordById = {}; WORDS.forEach(w => { wordById[w.id] = w; });
  function allWords() { return WORDS.concat(state.customWords); }
  function getWord(id) { return wordById[id] || state.customWords.find(w => w.id === id); }

  /* ---------------- lessons (built from units) ---------------- */
  const SKILL_OF_TYPE = { vocab: 'vocabulary', grammar: 'grammar', reading: 'reading', listening: 'listening', speaking: 'speaking', writing: 'writing', review: 'mixed' };
  const LESSONS = [];
  LP.UNITS.forEach(u => {
    const lv = LEVEL_ORDER.indexOf(u.level);
    const text = textById[u.text];
    const g = grammarById[u.grammar];
    const p = u.practice;
    const pc = p.type === 'speaking' ? scenarioById[p.id] : writingById[p.id];
    const base = { unit: u.id, level: u.level, unitTitle: u.title };
    LESSONS.push(Object.assign({}, base, { id: u.id + '-l1', n: 1, type: 'vocab', category: 'Vocabulary', title: 'Words: ' + u.topic, desc: 'Learn 10 useful words and phrases with examples.', minutes: 10, key: 'vocab:' + u.id, ref: u.id }));
    LESSONS.push(Object.assign({}, base, { id: u.id + '-l2', n: 2, type: 'grammar', category: 'Grammar', title: g.title, desc: g.use, minutes: 15, key: 'grammar:' + g.id, ref: g.id }));
    LESSONS.push(Object.assign({}, base, { id: u.id + '-l3', n: 3, type: text.kind, category: text.kind === 'reading' ? 'Reading' : 'Listening', title: text.title, desc: (text.kind === 'reading' ? 'Read' : 'Listen to') + ' an original text and answer questions.', minutes: 8 + lv * 2, key: 'text:' + text.id, ref: text.id }));
    LESSONS.push(Object.assign({}, base, {
      id: u.id + '-l4', n: 4, type: p.type,
      category: p.type === 'writing' ? 'Writing' : (pc.category === 'everyday' ? 'Everyday English' : 'Speaking'),
      title: pc.title, desc: p.type === 'writing' ? pc.prompt : pc.situation, minutes: p.type === 'writing' ? 15 + lv * 3 : 10,
      key: (p.type === 'writing' ? 'writing:' : 'scenario:') + p.id, ref: p.id
    }));
    LESSONS.push(Object.assign({}, base, { id: u.id + '-l5', n: 5, type: 'review', category: 'Review and assessment', title: 'Unit ' + u.n + ' Review', desc: 'A short mixed test: vocabulary, grammar and ' + text.kind + '.', minutes: 12, key: 'test:unit-' + u.id, ref: u.id }));
  });
  LESSONS.forEach(l => { l.skill = SKILL_OF_TYPE[l.type]; });
  const lessonById = {}; LESSONS.forEach(l => { lessonById[l.id] = l; });

  /* ---------------- activity & time ---------------- */
  function today() {
    const k = dayKey();
    if (!state.activity[k]) state.activity[k] = { seconds: 0, items: 0, words: 0 };
    return state.activity[k];
  }
  let lastInteraction = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => window.addEventListener(ev, () => { lastInteraction = Date.now(); }, { passive: true }));
  const TICK = 15;
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (!state.profile.onboarded) return;
    const speaking = window.speechSynthesis && window.speechSynthesis.speaking;
    if (Date.now() - lastInteraction > 90000 && !speaking) return; // idle: don't count
    today().seconds += TICK;
    save();
    document.dispatchEvent(new CustomEvent('lp:tick'));
  }, TICK * 1000);

  function logEvent(type, title, skill, score, ref) {
    state.events.unshift({ t: Date.now(), type, title, skill: skill || '', score: score == null ? null : Math.round(score), ref: ref || '' });
    if (state.events.length > 600) state.events.length = 600;
    today().items += 1;
  }

  function markDone(key, score, title, skill) {
    const prev = state.done[key];
    const s = score == null ? null : Math.round(score);
    state.done[key] = {
      score: s,
      best: prev && prev.best != null ? Math.max(prev.best, s == null ? 0 : s) : s,
      date: Date.now(),
      first: prev ? prev.first || prev.date : Date.now(),
      attempts: (prev ? prev.attempts : 0) + 1
    };
    logEvent('done', title || key, skill, s, key);
    save();
  }
  function isDone(key) { return !!state.done[key]; }
  function lessonDone(l) { return isDone(l.key); }

  function recordTopic(topic, label, skill, correct) {
    if (!topic) return;
    const t = state.topicStats[topic] || (state.topicStats[topic] = { label: label || topic, skill: skill || '', right: 0, wrong: 0, last: 0 });
    if (correct) t.right++; else t.wrong++;
    t.last = Date.now();
  }

  function recordTest(res) {
    // res: { id, title, kind, level, skill, score, correct, total, weak }
    const entry = Object.assign({ date: Date.now() }, res);
    state.tests.push(entry);
    if (state.tests.length > 400) state.tests.shift();
    logEvent('test', res.title, res.skill, res.score, res.id);
    save();
    return entry;
  }

  /* ---------------- spaced repetition ---------------- */
  function card(id) { return state.vocab[id]; }
  function ensureCard(id) {
    if (!state.vocab[id]) state.vocab[id] = { ease: 2.5, interval: 0, due: Date.now(), reps: 0, lapses: 0, hard: 0, last: 0, fav: false, added: Date.now(), seen: 0 };
    return state.vocab[id];
  }
  function status(id) {
    const c = state.vocab[id];
    if (!c || !c.last) return 'new';
    if (c.interval >= 21 && c.due > Date.now()) return 'mastered';
    if (c.due <= Date.now()) return 'review';
    return 'learning';
  }
  function difficulty(id) { const c = state.vocab[id]; return c ? c.lapses * 2 + c.hard : 0; }
  function previewInterval(id, grade) {
    const c = Object.assign({}, ensureCardPreview(id));
    return schedule(c, grade).label;
  }
  function ensureCardPreview(id) { return state.vocab[id] || { ease: 2.5, interval: 0, reps: 0, lapses: 0, hard: 0 }; }
  function schedule(c, grade) {
    const now = Date.now();
    let interval = c.interval, ease = c.ease, reps = c.reps, due, label;
    if (grade === 'again') {
      ease = Math.max(1.3, ease - 0.2); reps = 0; interval = 0; due = now + 10 * 60000; label = '10 min';
    } else if (grade === 'hard') {
      ease = Math.max(1.3, ease - 0.15); reps += 1; interval = interval < 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
      due = now + interval * DAY; label = interval + (interval === 1 ? ' day' : ' days');
    } else if (grade === 'good') {
      reps += 1; interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(Math.max(interval, 1) * ease);
      due = now + interval * DAY; label = interval + (interval === 1 ? ' day' : ' days');
    } else {
      reps += 1; ease = ease + 0.15; interval = reps === 1 ? 4 : Math.round(Math.max(interval, 1) * ease * 1.3);
      due = now + interval * DAY; label = interval + ' days';
    }
    return { interval, ease, reps, due, label };
  }
  function grade(id, g) {
    const c = ensureCard(id);
    const wasNew = !c.last;
    const r = schedule(c, g);
    c.interval = r.interval; c.ease = r.ease; c.reps = r.reps; c.due = r.due; c.last = Date.now(); c.seen = (c.seen || 0) + 1;
    if (g === 'again') c.lapses += 1;
    if (g === 'hard') c.hard += 1;
    if (wasNew && g !== 'again') today().words += 1;
    const w = getWord(id);
    recordTopic('vocab:' + (w ? w.topic : 'words'), 'Vocabulary: ' + (w ? w.topic : 'my words'), 'vocabulary', g === 'good' || g === 'easy');
    save();
  }
  function toggleFav(id) { const c = ensureCard(id); c.fav = !c.fav; save(); return c.fav; }
  function dueWords() {
    return allWords().filter(w => state.vocab[w.id] && state.vocab[w.id].last && state.vocab[w.id].due <= Date.now())
      .sort((a, b) => difficulty(b.id) - difficulty(a.id) || state.vocab[a.id].due - state.vocab[b.id].due);
  }
  function learnedCount() { return Object.values(state.vocab).filter(c => c.last && c.interval >= 1).length; }
  function addCustomWord(w, def, ex, source) {
    const clean = String(w || '').trim().slice(0, 60);
    if (!clean) return null;
    const exist = allWords().find(x => x.w.toLowerCase() === clean.toLowerCase());
    if (exist) {
      const c = ensureCard(exist.id);
      if (!c.last) { c.last = Date.now(); c.due = Date.now(); } // put it in "Words to Review"
      save(); return exist;
    }
    const entry = { id: 'my-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), w: clean, pos: '', def: String(def || '').slice(0, 200) || 'Saved from ' + (source || 'practice') + '.', ex: String(ex || '').slice(0, 300), sk: '', level: state.profile.level, topic: 'My words', unit: '' };
    state.customWords.push(entry);
    ensureCard(entry.id);
    save();
    return entry;
  }

  /* ---------------- statistics ---------------- */
  function secondsOn(k) { return state.activity[k] ? state.activity[k].seconds : 0; }
  function activeDay(k) { const a = state.activity[k]; return !!a && (a.seconds >= 60 || a.items > 0 || a.words > 0); }
  function streak() {
    let d = new Date(); let n = 0;
    if (!activeDay(dayKey(d))) d = addDays(d, -1);
    while (activeDay(dayKey(d))) { n++; d = addDays(d, -1); }
    return n;
  }
  function bestStreak() {
    const days = Object.keys(state.activity).filter(activeDay).sort();
    let best = 0, cur = 0, prev = null;
    days.forEach(k => { const d = parseDay(k); cur = prev && (d - prev) / DAY < 1.5 ? cur + 1 : 1; best = Math.max(best, cur); prev = d; });
    return best;
  }
  function totalSeconds() { return Object.values(state.activity).reduce((s, a) => s + (a.seconds || 0), 0); }
  function avgTestScore(filter) {
    const t = state.tests.filter(filter || (() => true));
    if (!t.length) return null;
    return Math.round(t.reduce((s, x) => s + x.score, 0) / t.length);
  }
  function lessonsCompleted(level) { return LESSONS.filter(l => (!level || l.level === level) && lessonDone(l)).length; }
  function weekSeconds(offsetWeeks) {
    const days = weekDays(addDays(new Date(), -7 * (offsetWeeks || 0)));
    return days.reduce((s, d) => s + secondsOn(dayKey(d)), 0);
  }

  // Average performance per skill (0-100) from tests, completed activities and question topics.
  function skillScores() {
    const acc = {}; LP.SKILLS.forEach(s => { acc[s.id] = { sum: 0, n: 0 }; });
    state.tests.forEach(t => {
      if (t.skillScores) Object.keys(t.skillScores).forEach(k => { if (acc[k]) { acc[k].sum += t.skillScores[k]; acc[k].n++; } });
      else if (acc[t.skill]) { acc[t.skill].sum += t.score; acc[t.skill].n++; }
    });
    Object.keys(state.done).forEach(k => {
      const d = state.done[k]; if (d.score == null) return;
      let sk = null;
      if (k.startsWith('grammar:')) sk = 'grammar';
      else if (k.startsWith('vocab:')) sk = 'vocabulary';
      else if (k.startsWith('scenario:')) sk = 'speaking';
      else if (k.startsWith('text:')) { const t = textById[k.slice(5)]; sk = t ? t.kind : null; }
      if (sk && acc[sk]) { acc[sk].sum += d.score; acc[sk].n++; }
    });
    const out = {}; Object.keys(acc).forEach(k => { out[k] = acc[k].n ? Math.round(acc[k].sum / acc[k].n) : null; });
    return out;
  }

  function levelProgress(level) {
    const lessons = LESSONS.filter(l => l.level === level);
    const lp = lessons.filter(lessonDone).length / lessons.length;
    const tests = state.tests.filter(t => t.level === level && t.kind !== 'placement');
    const byId = {}; tests.forEach(t => { byId[t.id] = Math.max(byId[t.id] || 0, t.score); });
    const ids = Object.keys(byId);
    const tp = ids.length ? ids.reduce((s, k) => s + byId[k], 0) / ids.length / 100 : 0;
    const lw = WORDS.filter(w => w.level === level);
    const vp = lw.filter(w => { const c = state.vocab[w.id]; return c && c.last && c.interval >= 1; }).length / lw.length;
    // Tests count only when several have been taken, so one quiz never decides a level.
    const testWeight = Math.min(ids.length, 4) / 4;
    const est = 0.5 * lp + 0.3 * tp * testWeight + 0.2 * vp;
    return { lessons: lp, tests: ids.length ? tp : null, testCount: ids.length, vocab: vp, estimate: Math.round(est * 100) };
  }

  function difficultTopics(limit) {
    return Object.keys(state.topicStats).map(k => Object.assign({ key: k }, state.topicStats[k]))
      .filter(t => t.wrong >= 2 && t.wrong / (t.right + t.wrong) >= 0.3)
      .sort((a, b) => (b.wrong / (b.right + b.wrong)) - (a.wrong / (a.right + a.wrong)) || b.wrong - a.wrong)
      .slice(0, limit || 5);
  }

  /* ---------------- recommendations ---------------- */
  function levelIdx(l) { return LEVEL_ORDER.indexOf(l); }
  function nextLesson() {
    const li = levelIdx(state.profile.level);
    for (let i = li; i < LEVEL_ORDER.length; i++) {
      const l = LESSONS.find(x => x.level === LEVEL_ORDER[i] && !lessonDone(x));
      if (l) return l;
    }
    return LESSONS.find(x => !lessonDone(x)) || null;
  }
  function weakSkills() {
    const sc = skillScores();
    return LP.SKILLS.map(s => {
      const conf = state.profile.confidence[s.id] || 3;
      const perf = sc[s.id];
      const val = perf == null ? conf * 20 : (conf * 20 + perf) / 2;
      return { id: s.id, name: s.name, conf, perf, val };
    }).sort((a, b) => a.val - b.val);
  }
  const TYPE_FOR_SKILL = { vocabulary: 'vocab', grammar: 'grammar', reading: 'reading', listening: 'listening', speaking: 'speaking', writing: 'writing' };
  function recommendations() {
    const out = [];
    const due = dueWords().length;
    if (due) out.push({ kind: 'review', title: 'Review ' + due + (due === 1 ? ' word' : ' words'), reason: 'These words are ready for review today.', href: '#/vocab/review', skill: 'vocabulary' });
    const dt = difficultTopics(3);
    dt.forEach(t => {
      if (out.length >= 5) return;
      if (t.key.startsWith('grammar:')) {
        const g = grammarById[t.key.slice(8)];
        if (g) out.push({ kind: 'grammar', title: 'Review: ' + g.title, reason: 'You made ' + t.wrong + ' mistakes in this topic.', href: '#/grammar/' + g.id, skill: 'grammar' });
      }
    });
    const preferred = state.settings.preferredSkills || [];
    const goalSkills = [];
    (state.profile.goals || []).forEach(gid => { const g = LP.GOAL_OPTIONS.find(x => x.id === gid); if (g) g.skills.forEach(s => goalSkills.push(s)); });
    const weak = weakSkills();
    const ordered = weak.slice(0, 3).map(w => w.id);
    preferred.concat(goalSkills).forEach(s => { if (!ordered.includes(s)) ordered.push(s); });
    const lv = levelIdx(state.profile.level);
    const used = new Set();
    ordered.forEach(skill => {
      if (out.length >= 5) return;
      const type = TYPE_FOR_SKILL[skill];
      const l = LESSONS.find(x => x.type === type && levelIdx(x.level) >= lv && !lessonDone(x) && !used.has(x.id));
      if (!l) return;
      used.add(l.id);
      const w = weak.find(x => x.id === skill);
      let reason;
      if (w && w.perf != null && w.perf < 70) reason = 'Your ' + w.name.toLowerCase() + ' results are ' + w.perf + '%. More practice will help.';
      else if (w && w.conf <= 2) reason = 'You rated your ' + w.name.toLowerCase() + ' ' + w.conf + ' out of 5.';
      else if (preferred.includes(skill)) reason = 'You chose ' + skill + ' as a skill to practise.';
      else if (goalSkills.includes(skill)) reason = 'This matches your learning goals.';
      else reason = 'This builds your ' + skill + ' skills at your level.';
      out.push({ kind: 'lesson', title: l.title, reason, href: '#/learn/lesson/' + l.id, skill, lesson: l });
    });
    return out.slice(0, 5);
  }

  /* ---------------- self-assessment ---------------- */
  function addSelfAssessment(entry) {
    state.selfAssess.push(Object.assign({ date: Date.now() }, entry));
    if (entry.ratings) state.profile.confidence = Object.assign({}, state.profile.confidence, entry.ratings);
    logEvent('self', 'Self-assessment', '', null);
    save();
  }

  /* ---------------- export / import / reset ---------------- */
  function exportData() {
    return JSON.stringify({ app: 'LinguaPath', exported: new Date().toISOString(), data: state }, null, 2);
  }
  function validateImport(text) {
    let obj;
    try { obj = JSON.parse(text); } catch (e) { return { ok: false, error: 'This file is not valid JSON.' }; }
    const data = obj && obj.app === 'LinguaPath' ? obj.data : obj;
    if (!data || typeof data !== 'object') return { ok: false, error: 'The file does not contain LinguaPath data.' };
    if (!data.profile || typeof data.profile !== 'object') return { ok: false, error: 'The file has no learning profile.' };
    if (data.version !== 1) return { ok: false, error: 'Unknown data version. This file may come from a different app.' };
    const checks = [['done', 'object'], ['vocab', 'object'], ['activity', 'object'], ['tests', 'array'], ['events', 'array'], ['selfAssess', 'array'], ['customWords', 'array']];
    for (const [k, type] of checks) {
      if (data[k] === undefined) continue;
      const isArr = Array.isArray(data[k]);
      if ((type === 'array') !== isArr || typeof data[k] !== 'object' || data[k] === null) return { ok: false, error: 'The field “' + k + '” has the wrong format.' };
    }
    if (data.profile.level && !LEVEL_ORDER.includes(data.profile.level)) return { ok: false, error: 'The saved level is not valid.' };
    for (const t of data.tests || []) { if (typeof t.score !== 'number' || t.score < 0 || t.score > 100) return { ok: false, error: 'A test result in the file is not valid.' }; }
    for (const k of Object.keys(data.activity || {})) { if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) return { ok: false, error: 'The activity history in the file is not valid.' }; }
    const merged = deepMerge(defaults(), data);
    const summary = {
      lessons: Object.keys(merged.done).length,
      words: Object.values(merged.vocab).filter(c => c && c.last).length,
      tests: merged.tests.length,
      days: Object.keys(merged.activity).length,
      level: merged.profile.level
    };
    return { ok: true, data: merged, summary };
  }
  function importData(data) { state = data; save(true); }
  function reset() { state = defaults(); try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } save(true); }

  load();

  LP.store = {
    get state() { return state; },
    save, dayKey, parseDay, addDays, weekStart, weekDays, DAY, LEVEL_ORDER, levelIdx,
    WORDS, allWords, getWord, wordById, LESSONS, lessonById, unitById, grammarById, textById, scenarioById, writingById,
    today, logEvent, markDone, isDone, lessonDone, recordTopic, recordTest,
    card, ensureCard, status, difficulty, previewInterval, grade, toggleFav, dueWords, learnedCount, addCustomWord,
    secondsOn, activeDay, streak, bestStreak, totalSeconds, avgTestScore, lessonsCompleted, weekSeconds, skillScores,
    levelProgress, difficultTopics, nextLesson, weakSkills, recommendations, addSelfAssessment,
    exportData, validateImport, importData, reset,
    get storageOk() { return storageOk; }
  };
})();
