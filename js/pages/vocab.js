/* LinguaPath — Vocabulary: word list, flashcards with spaced repetition, review and practice modes. */
(function () {
  const { h, t, icon, shuffle, sample } = LP.ui;
  const S = LP.store;

  const STATUS_LABEL = { new: 'New', learning: 'Learning', review: 'Needs review', mastered: 'Mastered' };

  function playBtn(text, label) {
    if (!LP.speech.supported) return '';
    return '<button type="button" class="icon-btn" data-act="say" data-text="' + h(text) + '" aria-label="' + h(t('Listen')) + ': ' + h(label || text) + '" title="' + h(t('Listen')) + '">' + icon('volume') + '</button>';
  }
  LP.playBtn = playBtn;

  function wordCard(w, opts) {
    opts = opts || {};
    const st = S.status(w.id);
    const c = S.card(w.id);
    const showSk = S.state.settings.showSk;
    return '<article class="word" data-id="' + h(w.id) + '"><div class="word-top"><div><h3>' + h(w.w) + '</h3><span class="pos">' + h(w.pos) + '</span></div>' +
      '<div class="row">' + playBtn(w.w) + '<button type="button" class="icon-btn' + (c && c.fav ? ' on' : '') + '" data-act="fav" data-id="' + h(w.id) + '" aria-pressed="' + !!(c && c.fav) + '" aria-label="' + h(t('Favourite')) + ': ' + h(w.w) + '" title="' + h(t('Favourite')) + '">' + icon('star') + '</button></div></div>' +
      '<p>' + h(w.def) + '</p>' + (w.ex ? '<p class="ex">“' + h(w.ex) + '”</p>' : '') +
      (w.sk ? '<p class="sk"' + (showSk ? '' : ' hidden') + '>' + icon('globe') + ' ' + h(w.sk) + '</p>' : '') +
      '<div class="actions"><span class="tag status-' + st + '">' + h(t(STATUS_LABEL[st])) + '</span><span class="tag lv">' + h(w.level) + '</span><span class="tag">' + h(w.topic) + '</span>' +
      (w.sk && !showSk ? '<button type="button" class="btn small ghost" data-act="sk">' + h(t('Show translation')) + '</button>' : '') +
      (opts.noReview || st !== 'new' ? '' : '<button type="button" class="btn small ghost" data-act="addrev" data-id="' + h(w.id) + '">' + icon('plus') + ' ' + h(t('Add to review')) + '</button>') +
      (opts.remove ? '<button type="button" class="btn small ghost" data-act="rmword" data-id="' + h(w.id) + '">' + icon('trash') + ' ' + h(t('Remove')) + '</button>' : '') +
      '</div></article>';
  }
  LP.wordCard = wordCard;

  // Shared handlers for word cards.
  function wordHandlers(root, refresh) {
    return {
      say: b => LP.speech.speak(b.dataset.text),
      fav: b => { const on = S.toggleFav(b.dataset.id); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); LP.ui.toast(t(on ? 'Added to favourites.' : 'Removed from favourites.')); },
      sk: b => { const card = b.closest('.word'); const p = card.querySelector('.sk'); if (p) p.hidden = !p.hidden; b.textContent = t(p && !p.hidden ? 'Hide translation' : 'Show translation'); },
      addrev: b => { const c = S.ensureCard(b.dataset.id); c.last = Date.now(); c.due = Date.now(); S.save(); LP.ui.toast(t('Added to Words to Review.')); if (refresh) refresh(); else b.remove(); },
      rmword: async b => {
        const ok = await LP.ui.confirm('Remove this word?', 'The word and its review history will be deleted.', 'Remove', true);
        if (!ok) return;
        S.state.customWords = S.state.customWords.filter(w => w.id !== b.dataset.id); delete S.state.vocab[b.dataset.id]; S.save(); if (refresh) refresh();
      }
    };
  }
  LP.wordHandlers = wordHandlers;

  /* ---------------- flashcards ---------------- */
  // opts: { title, onDone(summary), learn: bool }
  LP.comp.flashcards = function (parent, ids, opts) {
    opts = opts || {};
    const root = LP.ui.comp(parent, 'flash-wrap');
    const queue = ids.slice();
    const repeats = {};
    const counts = { again: 0, hard: 0, good: 0, easy: 0 };
    let i = 0, back = false, skShown = S.state.settings.showSk, done = false;
    function draw() {
      if (i >= queue.length) return finish();
      const w = S.getWord(queue[i]);
      const left = queue.length - i;
      let html = '<div class="row between" style="margin-bottom:10px"><span class="muted">' + h(t('Cards left')) + ': ' + left + '</span><span class="tag status-' + S.status(w.id) + '">' + h(t(STATUS_LABEL[S.status(w.id)])) + '</span></div>' +
        '<div class="flash" aria-live="polite"><div class="big">' + h(w.w) + '</div><div class="pos muted">' + h(w.pos) + '</div>' + playBtn(w.w);
      if (back) {
        html += '<hr style="width:60%"><div class="def">' + h(w.def) + '</div>' + (w.ex ? '<div class="ex">“' + h(w.ex) + '” ' + playBtn(w.ex, t('example')) + '</div>' : '') +
          (w.sk ? (skShown ? '<div class="sk">' + icon('globe') + ' ' + h(w.sk) + '</div>' : '<button type="button" class="btn small ghost" data-act="fc-sk">' + h(t('Show translation')) + '</button>') : '');
      }
      html += '</div>';
      if (!back) {
        html += '<div class="row" style="justify-content:center;margin-top:14px"><button type="button" class="btn primary" data-act="fc-show">' + h(t('Show answer')) + '</button></div><p class="muted small" style="text-align:center">' + h(t('Try to remember the meaning first. Keyboard: Space')) + '</p>';
      } else {
        html += '<p style="text-align:center;margin:14px 0 0"><b>' + h(t('How well did you know it?')) + '</b></p><div class="grades">' +
          ['again', 'hard', 'good', 'easy'].map((g, k) => '<button type="button" class="' + g + '" data-act="fc-grade" data-g="' + g + '">' + h(t(g.charAt(0).toUpperCase() + g.slice(1))) + '<small>' + h(S.previewInterval(w.id, g)) + ' · ' + (k + 1) + '</small></button>').join('') + '</div>';
      }
      root.innerHTML = (opts.title ? '<h2>' + h(opts.title) + '</h2>' : '') + html;
      const f = root.querySelector('[data-act="fc-show"], .grades .good'); if (f) f.focus({ preventScroll: true });
    }
    function finish() {
      if (done) return; done = true;
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      S.logEvent('vocab', 'Flashcards: ' + ids.length + ' words', 'vocabulary', null);
      S.save();
      root.innerHTML = '<div class="card complete-box">' + icon('check') + '<h2>' + h(t('Session complete!')) + '</h2><p>' + h(t('You reviewed')) + ' ' + ids.length + ' ' + h(t('words')) + ' (' + total + ' ' + h(t('answers')) + ').</p>' +
        '<div class="row" style="justify-content:center"><span class="tag bad">' + h(t('Again')) + ': ' + counts.again + '</span><span class="tag warn">' + h(t('Hard')) + ': ' + counts.hard + '</span><span class="tag lv">' + h(t('Good')) + ': ' + counts.good + '</span><span class="tag done">' + h(t('Easy')) + ': ' + counts.easy + '</span></div>' +
        '<p class="muted" style="margin-top:12px">' + h(t('Words you found difficult will come back sooner.')) + '</p></div>';
      if (opts.onDone) opts.onDone(counts);
    }
    function key(e) {
      if (!document.body.contains(root)) { document.removeEventListener('keydown', key); return; }
      if (done || e.target.matches('input, textarea, select')) return;
      if (!back && (e.key === ' ' || e.key === 'Enter') && !e.target.closest('button, a')) { e.preventDefault(); back = true; draw(); }
      else if (back && ['1', '2', '3', '4'].includes(e.key)) gradeIt(['again', 'hard', 'good', 'easy'][+e.key - 1]);
    }
    document.addEventListener('keydown', key);
    function gradeIt(g) {
      const id = queue[i];
      S.grade(id, g); counts[g]++;
      if (g === 'again' && (repeats[id] || 0) < 2) { repeats[id] = (repeats[id] || 0) + 1; queue.push(id); }
      i++; back = false; draw();
    }
    LP.ui.on(root, {
      'fc-show': () => { back = true; draw(); },
      'fc-sk': () => { skShown = true; draw(); },
      'fc-grade': b => gradeIt(b.dataset.g),
      say: b => LP.speech.speak(b.dataset.text)
    });
    if (!queue.length) { root.innerHTML = LP.ui.empty('cards', 'No words here.', ''); } else draw();
    return root;
  };

  // After a vocabulary quiz, words answered wrongly are marked for review.
  LP.vocabAfterQuiz = function (res) {
    res.answers.forEach(a => {
      if (!a.q.wordId) return;
      const c = S.ensureCard(a.q.wordId);
      if (a.s < 1) { c.due = Date.now(); if (!c.last) c.last = Date.now(); c.hard = (c.hard || 0) + 1; }
    });
    S.save();
  };

  /* ---------------- vocabulary lesson (used by Learn) ---------------- */
  LP.comp.vocabLesson = function (parent, unitId, opts) {
    const root = LP.ui.comp(parent);
    const words = S.WORDS.filter(w => w.unit === unitId);
    let step = 0;
    function steps() { return '<div class="steps" aria-label="' + h(t('Lesson steps')) + '">' + ['1. Learn the words', '2. Flashcards', '3. Quick check'].map((s, i) => '<span class="' + (i === step ? 'on' : i < step ? 'done' : '') + '">' + h(t(s)) + '</span>').join('') + '</div>'; }
    function draw() {
      root.innerHTML = steps();
      if (step === 0) {
        const area = LP.ui.comp(root);
        area.innerHTML = '<p>' + h(t('Read each word, its meaning and the example. Press the speaker to listen.')) + '</p><div class="word-list">' + words.map(w => wordCard(w, { noReview: true })).join('') + '</div>' +
          '<div class="quiz-nav" style="margin-top:16px"><button type="button" class="btn primary" data-act="next">' + h(t('Next: Flashcards')) + ' ' + icon('arrowR') + '</button></div>';
        LP.ui.on(area, Object.assign(wordHandlers(area), { next: () => { step = 1; draw(); } }));
      } else if (step === 1) {
        LP.comp.flashcards(root, shuffle(words.map(w => w.id)), {
          onDone: () => {
            const n = LP.ui.comp(root); n.innerHTML = '<div class="quiz-nav"><button type="button" class="btn primary" data-act="next">' + h(t('Next: Quick check')) + ' ' + icon('arrowR') + '</button></div>';
            LP.ui.on(n, { next: () => { step = 2; draw(); } });
          }
        });
      } else {
        const pool = S.WORDS.filter(w => w.level === words[0].level);
        const qs = LP.gen.vocabQuestions(words, 5, ['meaning', 'choose', 'fill', 'type', 'translate'], pool).concat([LP.gen.vocabMatch(sample(words, 4), 'def')]);
        LP.quiz.Quiz(root, {
          questions: qs, mode: 'practice',
          onFinish: res => { LP.vocabAfterQuiz(res); if (opts && opts.onComplete) opts.onComplete(res.score); },
          recommend: res => opts && opts.recommend ? opts.recommend(res) : null,
          retake: () => { step = 2; draw(); },
          onExit: opts && opts.onExit, exitLabel: 'Back to lessons'
        });
      }
      root.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    draw();
  };

  /* ---------------- pages ---------------- */
  function tabs(active) {
    const items = [['', 'Word list'], ['review', 'Words to Review'], ['learn', 'Learn new words'], ['practice', 'Practice'], ['my', 'My words']];
    return '<nav class="tabs" aria-label="' + h(t('Vocabulary sections')) + '">' + items.map(([k, l]) => '<a href="#/vocab' + (k ? '/' + k : '') + '" class="' + (active === k ? 'on' : '') + '"' + (active === k ? ' aria-current="page"' : '') + '>' + h(t(l)) + '</a>').join('') + '</nav>';
  }

  const filterState = { q: '', level: '', topic: '', status: '', fav: false, limit: 60 };

  function listPage(root) {
    root.innerHTML = LP.pageHead('Vocabulary', 'Learn words with examples, review them at the right time, and practise in different ways.') + tabs('');
    const box = LP.ui.comp(root);
    function topicsFor(level) { return Array.from(new Set(S.allWords().filter(w => !level || w.level === level).map(w => w.topic))); }
    function draw() {
      const f = filterState;
      const q = f.q.trim().toLowerCase();
      const list = S.allWords().filter(w =>
        (!q || w.w.toLowerCase().includes(q) || w.def.toLowerCase().includes(q) || (w.sk || '').toLowerCase().includes(q)) &&
        (!f.level || w.level === f.level) && (!f.topic || w.topic === f.topic) && (!f.status || S.status(w.id) === f.status) &&
        (!f.fav || (S.card(w.id) && S.card(w.id).fav)));
      const counts = { new: 0, learning: 0, review: 0, mastered: 0 }; S.allWords().forEach(w => counts[S.status(w.id)]++);
      box.innerHTML = '<div class="row" style="margin-bottom:12px">' + Object.keys(counts).map(k => '<span class="tag status-' + k + '">' + h(t(STATUS_LABEL[k])) + ': ' + counts[k] + '</span>').join('') + '</div>' +
        '<div class="filters" role="search"><div class="search"><label class="sr-only" for="vf-q">' + h(t('Search words')) + '</label><input id="vf-q" type="search" placeholder="' + h(t('Search words, meanings or translations…')) + '" value="' + h(f.q) + '"></div>' +
        sel('vf-level', 'Level', [['', 'All levels']].concat(S.LEVEL_ORDER.map(l => [l, l])), f.level) +
        sel('vf-topic', 'Topic', [['', 'All topics']].concat(topicsFor(f.level).map(x => [x, x])), f.topic) +
        sel('vf-status', 'Status', [['', 'Any status']].concat(Object.keys(STATUS_LABEL).map(k => [k, STATUS_LABEL[k]])), f.status) +
        '<label class="check" style="align-self:center"><input type="checkbox" id="vf-fav"' + (f.fav ? ' checked' : '') + '> ' + h(t('Favourites only')) + '</label></div>' +
        '<p class="muted" aria-live="polite">' + list.length + ' ' + h(t('words found')) + '</p>' +
        (list.length ? '<div class="word-list">' + list.slice(0, f.limit).map(w => wordCard(w)).join('') + '</div>' +
          (list.length > f.limit ? '<div class="quiz-nav" style="justify-content:center;margin-top:14px"><button type="button" class="btn" data-act="more">' + h(t('Show more')) + '</button></div>' : '')
          : LP.ui.empty('search', 'No words found.', 'Try another search or remove some filters.'));
      const qi = box.querySelector('#vf-q');
      qi.addEventListener('input', () => { f.q = qi.value; f.limit = 60; const pos = qi.selectionStart; draw(); const n = box.querySelector('#vf-q'); n.focus(); n.setSelectionRange(pos, pos); });
      box.querySelector('#vf-level').addEventListener('change', e => { f.level = e.target.value; f.topic = ''; draw(); });
      box.querySelector('#vf-topic').addEventListener('change', e => { f.topic = e.target.value; draw(); });
      box.querySelector('#vf-status').addEventListener('change', e => { f.status = e.target.value; draw(); });
      box.querySelector('#vf-fav').addEventListener('change', e => { f.fav = e.target.checked; draw(); });
    }
    LP.ui.on(box, Object.assign(wordHandlers(box, null), { more: () => { filterState.limit += 60; draw(); } }));
    draw();
  }
  function sel(id, label, opts, val) {
    return '<div><label class="sr-only" for="' + id + '">' + h(t(label)) + '</label><select id="' + id + '">' + opts.map(o => '<option value="' + h(o[0]) + '"' + (o[0] === val ? ' selected' : '') + '>' + h(t(o[1])) + '</option>').join('') + '</select></div>';
  }

  function reviewPage(root) {
    root.innerHTML = LP.pageHead('Words to Review', 'Words you find difficult come first. Rate each card honestly: the app plans the next review for you.', '', [['Vocabulary', '#/vocab'], ['Words to Review']]) + tabs('review');
    const box = LP.ui.comp(root);
    const due = S.dueWords();
    const difficult = S.allWords().filter(w => S.difficulty(w.id) >= 2).sort((a, b) => S.difficulty(b.id) - S.difficulty(a.id));
    const upcoming = S.allWords().filter(w => S.card(w.id) && S.card(w.id).last && S.card(w.id).due > Date.now()).sort((a, b) => S.card(a.id).due - S.card(b.id).due);
    let html = '<div class="grid g3" style="margin-bottom:16px">' +
      '<div class="card stat">' + icon('repeat') + '<span class="num">' + due.length + '</span><span class="lbl">' + h(t('Words to review now')) + '</span></div>' +
      '<div class="card stat">' + icon('flame') + '<span class="num">' + difficult.length + '</span><span class="lbl">' + h(t('Difficult words')) + '</span></div>' +
      '<div class="card stat">' + icon('calendar') + '<span class="num">' + (upcoming[0] ? relTime(S.card(upcoming[0].id).due) : '—') + '</span><span class="lbl">' + h(t('Next review')) + '</span></div></div>';
    if (due.length) {
      html += '<div class="card accent row between"><div><h2 style="margin:0">' + due.length + ' ' + h(t('words are ready')) + '</h2><p class="muted" style="margin:0">' + h(t('A session has up to 20 cards. Difficult words come first.')) + '</p></div><button type="button" class="btn primary" data-act="start">' + icon('play') + ' ' + h(t('Start review')) + '</button></div>';
    } else {
      html += LP.ui.empty('check', 'Nothing to review right now.', S.learnedCount() ? 'Great job! Come back later, or practise your difficult words.' : 'Learn some new words first. They will appear here when it is time to review them.',
        '<div class="row" style="justify-content:center"><a class="btn primary" href="#/vocab/learn">' + h(t('Learn 10 new words')) + '</a>' + (difficult.length ? '<button type="button" class="btn" data-act="hard">' + h(t('Practise difficult words')) + '</button>' : '') + '</div>');
    }
    if (difficult.length) html += '<h2 style="margin-top:20px">' + h(t('Difficult words')) + '</h2><div class="word-list">' + difficult.slice(0, 12).map(w => wordCard(w)).join('') + '</div>';
    box.innerHTML = html;
    LP.ui.on(box, Object.assign(wordHandlers(box), {
      start: () => { box.innerHTML = ''; LP.comp.flashcards(box, due.slice(0, 20).map(w => w.id), { onDone: () => doneNav(box) }); },
      hard: () => { box.innerHTML = ''; LP.comp.flashcards(box, difficult.slice(0, 15).map(w => w.id), { onDone: () => doneNav(box) }); }
    }));
  }
  function doneNav(box) {
    const n = LP.ui.comp(box);
    n.innerHTML = '<div class="quiz-nav" style="justify-content:center"><a class="btn" href="#/vocab">' + h(t('Word list')) + '</a><button type="button" class="btn primary" data-act="again">' + h(t('Review more')) + '</button></div>';
    LP.ui.on(n, { again: () => LP.rerender() });
  }
  function relTime(ts) {
    const d = ts - Date.now();
    if (d < 3600000) return Math.max(1, Math.round(d / 60000)) + ' min';
    if (d < S.DAY) return Math.round(d / 3600000) + ' h';
    return Math.round(d / S.DAY) + ' ' + t('days');
  }

  function learnPage(root) {
    root.innerHTML = LP.pageHead('Learn 10 new words', 'New words from your level. Read them, then practise with flashcards.', '', [['Vocabulary', '#/vocab'], ['Learn new words']]) + tabs('learn');
    const box = LP.ui.comp(root);
    const li = S.levelIdx(S.state.profile.level);
    let fresh = [];
    for (let i = li; i < 5 && fresh.length < 10; i++) fresh = fresh.concat(S.WORDS.filter(w => w.level === S.LEVEL_ORDER[i] && S.status(w.id) === 'new'));
    fresh = fresh.slice(0, 10);
    if (!fresh.length) { box.innerHTML = LP.ui.empty('trophy', 'You have seen all the words!', 'Review your words to keep them fresh.', '<a class="btn primary" href="#/vocab/review">' + h(t('Words to Review')) + '</a>'); return; }
    box.innerHTML = '<div class="word-list">' + fresh.map(w => wordCard(w, { noReview: true })).join('') + '</div><div class="quiz-nav" style="margin-top:16px"><button type="button" class="btn primary" data-act="go">' + h(t('Start flashcards')) + ' ' + icon('arrowR') + '</button></div>';
    LP.ui.on(box, Object.assign(wordHandlers(box), {
      go: () => {
        box.innerHTML = '';
        LP.comp.flashcards(box, fresh.map(w => w.id), { onDone: () => {
          const n = LP.ui.comp(box);
          n.innerHTML = '<div class="quiz-nav" style="justify-content:center"><a class="btn" href="#/vocab/practice">' + h(t('Practise these words')) + '</a><button type="button" class="btn primary" data-act="more">' + h(t('Learn 10 more')) + '</button></div>';
          LP.ui.on(n, { more: () => LP.rerender() });
        } });
      }
    }));
  }

  const MODES = [
    { id: 'flashcards', icon: 'cards', name: 'Flashcards', desc: 'See the word, remember the meaning, rate yourself.' },
    { id: 'meaning', icon: 'list', name: 'Multiple choice', desc: 'Choose the correct meaning.' },
    { id: 'match', icon: 'repeat', name: 'Match meanings', desc: 'Match words with their definitions.' },
    { id: 'translate', icon: 'globe', name: 'Match translations', desc: 'Match English words with Slovak.' },
    { id: 'fill', icon: 'pen', name: 'Fill in the missing word', desc: 'Write the word in the example sentence.' },
    { id: 'type', icon: 'edit', name: 'Type the correct word', desc: 'Read the meaning and type the word.' },
    { id: 'choose', icon: 'check', name: 'Choose the word for a sentence', desc: 'Pick the right word for the gap.' },
    { id: 'spell', icon: 'volume', name: 'Spelling', desc: 'Listen and write the word correctly.' },
    { id: 'order', icon: 'sparkle', name: 'Sentence completion', desc: 'Put the example sentence in order.' }
  ];
  const practiceSet = { source: 'level', level: '', topic: '' };

  function practicePage(root, mode) {
    const m = MODES.find(x => x.id === mode);
    root.innerHTML = LP.pageHead(m ? m.name : 'Vocabulary practice', m ? m.desc : 'Choose words and a practice mode.', '', [['Vocabulary', '#/vocab'], ['Practice', m ? '#/vocab/practice' : null]].concat(m ? [[m.name]] : [])) + tabs('practice');
    const box = LP.ui.comp(root);
    if (!practiceSet.level) practiceSet.level = S.state.profile.level;
    function words() {
      const ps = practiceSet;
      if (ps.source === 'review') return S.allWords().filter(w => S.card(w.id) && S.card(w.id).last);
      if (ps.source === 'fav') return S.allWords().filter(w => S.card(w.id) && S.card(w.id).fav);
      if (ps.source === 'difficult') return S.allWords().filter(w => S.difficulty(w.id) >= 1);
      return S.allWords().filter(w => w.level === ps.level && (!ps.topic || w.topic === ps.topic));
    }
    if (!m) {
      const topics = Array.from(new Set(S.WORDS.filter(w => w.level === practiceSet.level).map(w => w.topic)));
      box.innerHTML = '<div class="card"><h2>' + h(t('1. Choose your words')) + '</h2><div class="row">' +
        '<div class="seg" role="group" aria-label="' + h(t('Word source')) + '">' + [['level', 'By level and topic'], ['review', 'My review words'], ['difficult', 'Difficult words'], ['fav', 'Favourites']].map(([k, l]) => '<button type="button" data-act="src" data-v="' + k + '" class="' + (practiceSet.source === k ? 'on' : '') + '" aria-pressed="' + (practiceSet.source === k) + '">' + h(t(l)) + '</button>').join('') + '</div></div>' +
        (practiceSet.source === 'level' ? '<div class="row" style="margin-top:12px">' + sel('vp-level', 'Level', S.LEVEL_ORDER.map(l => [l, l]), practiceSet.level) + sel('vp-topic', 'Topic', [['', 'All topics']].concat(topics.map(x => [x, x])), practiceSet.topic) + '</div>' : '') +
        '<p class="muted" style="margin-top:10px">' + words().length + ' ' + h(t('words selected')) + '</p></div>' +
        '<h2>' + h(t('2. Choose a practice mode')) + '</h2><div class="mode-grid">' + MODES.map(x => '<a class="mode" href="#/vocab/practice/' + x.id + '">' + icon(x.icon) + '<b>' + h(t(x.name)) + '</b><small>' + h(t(x.desc)) + '</small></a>').join('') + '</div>';
      const lvSel = box.querySelector('#vp-level'); if (lvSel) lvSel.addEventListener('change', e => { practiceSet.level = e.target.value; practiceSet.topic = ''; practicePage(root, mode); });
      const tpSel = box.querySelector('#vp-topic'); if (tpSel) tpSel.addEventListener('change', e => { practiceSet.topic = e.target.value; practicePage(root, mode); });
      LP.ui.on(box, { src: b => { practiceSet.source = b.dataset.v; practicePage(root, mode); } });
      return;
    }
    let ws = words();
    if (ws.length < 4) {
      box.innerHTML = LP.ui.empty('cards', 'Not enough words in this set.', 'You need at least 4 words. Choose a level instead, or learn some words first.', '<a class="btn primary" href="#/vocab/practice">' + h(t('Choose words')) + '</a>');
      return;
    }
    const pool = ws.length >= 8 ? ws : S.WORDS.filter(w => w.level === (ws[0].level || S.state.profile.level));
    if (mode === 'flashcards') {
      LP.comp.flashcards(box, sample(ws, 15).map(w => w.id), { onDone: () => doneNav(box) });
      return;
    }
    function run() {
      box.innerHTML = '';
      let qs;
      if (mode === 'match' || mode === 'translate') {
        const field = mode === 'match' ? 'def' : 'sk';
        const usable = ws.filter(w => w[field]);
        if (usable.length < 4) { box.innerHTML = LP.ui.empty('globe', 'These words have no translations.', 'Choose words from a level.'); return; }
        const sh = shuffle(usable);
        qs = [0, 1, 2].map(k => sh.slice(k * 4, k * 4 + 4)).filter(g => g.length === 4).map(g => LP.gen.vocabMatch(g, field));
        if (mode === 'translate') qs = qs.concat(LP.gen.vocabQuestions(sample(usable, 6), 5, ['translate'], pool));
      } else {
        qs = LP.gen.vocabQuestions(sample(ws, 14), 10, [mode], pool);
      }
      if (!qs.length) { box.innerHTML = LP.ui.empty('cards', 'Not enough words for this mode.', 'Try another mode or another set of words.'); return; }
      LP.quiz.Quiz(box, {
        title: t(MODES.find(x => x.id === mode).name), questions: qs, mode: 'practice',
        onFinish: res => { LP.vocabAfterQuiz(res); S.logEvent('practice', 'Vocabulary: ' + mode, 'vocabulary', res.score); S.save(); },
        recommend: res => res.score < 75 ? { text: t('Some words were difficult. They are now in your review list.'), href: '#/vocab/review', label: 'Words to Review' } : { text: t('Well done! Try another practice mode.'), href: '#/vocab/practice', label: 'Practice' },
        retake: run, onExit: () => LP.go('#/vocab/practice'), exitLabel: 'Choose another mode'
      });
    }
    run();
  }

  function myWordsPage(root) {
    root.innerHTML = LP.pageHead('My words', 'Words you saved from reading and listening, or added yourself.', '', [['Vocabulary', '#/vocab'], ['My words']]) + tabs('my');
    const box = LP.ui.comp(root);
    function draw() {
      const list = S.state.customWords;
      box.innerHTML = '<form class="card" id="add-word"><h2>' + h(t('Add a word')) + '</h2><div class="grid g3">' +
        '<div class="field"><label for="aw-w">' + h(t('Word or phrase')) + '</label><input id="aw-w" type="text" required maxlength="60"></div>' +
        '<div class="field"><label for="aw-d">' + h(t('Meaning (in simple English)')) + '</label><input id="aw-d" type="text" maxlength="200"></div>' +
        '<div class="field"><label for="aw-e">' + h(t('Example sentence')) + ' <small>(' + h(t('optional')) + ')</small></label><input id="aw-e" type="text" maxlength="300"></div></div>' +
        '<button type="submit" class="btn primary">' + icon('plus') + ' ' + h(t('Add word')) + '</button></form>' +
        (list.length ? '<div class="word-list">' + list.slice().reverse().map(w => wordCard(w, { remove: true })).join('') + '</div>' : LP.ui.empty('book', 'No saved words yet.', 'In Reading practice, click a highlighted word and choose “Save word”.'));
      box.querySelector('#add-word').addEventListener('submit', e => {
        e.preventDefault();
        const w = box.querySelector('#aw-w').value.trim();
        if (!w) { LP.ui.toast(t('Please write a word.'), 'error'); return; }
        S.addCustomWord(w, box.querySelector('#aw-d').value.trim(), box.querySelector('#aw-e').value.trim(), 'my list');
        LP.ui.toast(t('Word saved.')); draw();
      });
    }
    LP.ui.on(box, wordHandlers(box, () => draw()));
    draw();
  }

  LP.pages.vocab = function (root, parts) {
    const sub = parts[0] || '';
    if (sub === 'review') return reviewPage(root);
    if (sub === 'learn') return learnPage(root);
    if (sub === 'practice') return practicePage(root, parts[1]);
    if (sub === 'my') return myWordsPage(root);
    return listPage(root);
  };
})();
