/* LinguaPath — question engine and quiz runner.
   Question types: mc, tf, fill, type, order, match. Modes: 'practice' (instant feedback) and 'test' (results at the end). */
window.LP = window.LP || {};

(function () {
  const { h, t, icon, shuffle } = LP.ui;

  /* ---------------- answer checking ---------------- */
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+([.,!?;:])/g, '$1')
      .replace(/[.!?]+$/g, '')
      .replace(/\s+/g, ' ').trim();
  }
  function score(q, r) {
    if (r == null || r === '') return 0;
    switch (q.t) {
      case 'mc': return r === q.a ? 1 : 0;
      case 'tf': return r === q.a ? 1 : 0;
      case 'fill': case 'type': {
        const ans = (Array.isArray(q.a) ? q.a : [q.a]).map(norm);
        return ans.includes(norm(r)) ? 1 : 0;
      }
      case 'order': return norm(r.map(i => q._tokens[i]).join(' ')) === norm(q.a) ? 1 : 0;
      case 'match': {
        let ok = 0; q.pairs.forEach((p, i) => { if (r[i] === p[1]) ok++; });
        return ok / q.pairs.length;
      }
    }
    return 0;
  }
  function answered(q, r) {
    if (r == null || r === '') return false;
    if (q.t === 'order') return r.length > 0;
    if (q.t === 'match') return r.some(Boolean);
    return true;
  }
  function correctText(q) {
    switch (q.t) {
      case 'mc': return q.o[q.a];
      case 'tf': return q.a ? t('True') : t('False');
      case 'fill': case 'type': return (Array.isArray(q.a) ? q.a : [q.a])[0];
      case 'order': return q.a;
      case 'match': return q.pairs.map(p => p[0] + ' → ' + p[1]).join('; ');
    }
    return '';
  }
  function responseText(q, r) {
    if (!answered(q, r)) return t('No answer');
    switch (q.t) {
      case 'mc': return q.o[r];
      case 'tf': return r ? t('True') : t('False');
      case 'fill': case 'type': return r;
      case 'order': return r.map(i => q._tokens[i]).join(' ');
      case 'match': return q.pairs.map((p, i) => p[0] + ' → ' + (r[i] || '—')).join('; ');
    }
    return '';
  }

  // Prepare random parts once per question (word tiles, matching options).
  function prepare(q) {
    if (q.t === 'order' && !q._tokens) {
      const tokens = q.a.split(/\s+/);
      let sh = shuffle(tokens.map((_, i) => i));
      if (tokens.length > 1) { let tries = 0; while (sh.every((v, i) => v === i) && tries++ < 10) sh = shuffle(sh); }
      q._tokens = sh.map(i => tokens[i]);
    }
    if (q.t === 'match' && !q._rights) q._rights = shuffle(q.pairs.map(p => p[1]));
    return q;
  }

  /* ---------------- rendering ---------------- */
  function typeHint(q) {
    return {
      mc: 'Choose the correct answer.', tf: 'Is this true or false?', fill: 'Write the missing word or words.',
      type: 'Write your answer.', order: 'Put the words in the correct order.', match: 'Match each item with the correct answer.'
    }[q.t];
  }
  function passageBlock(q, mode) {
    let out = '';
    if (q.passage) {
      const tx = LP.store.textById[q.passage];
      if (tx) out += '<details class="passage" open><summary>' + icon('book') + ' ' + h(t('Read the text')) + ': ' + h(tx.title) + '</summary><div class="passage-body">' +
        tx.text.split(/\n\n+/).map(p => '<p>' + h(p) + '</p>').join('') + '</div></details>';
    }
    if (q.audio) {
      const tx = LP.store.textById[q.audio];
      const script = tx ? tx.text : q.audio;
      out += '<div class="audio-box">' +
        '<button type="button" class="btn small" data-act="q-audio">' + icon('volume') + ' ' + h(t(tx ? 'Play the recording' : 'Play')) + '</button>' +
        '<button type="button" class="btn small ghost" data-act="q-audio-stop">' + icon('stop') + ' ' + h(t('Stop')) + '</button>' +
        (!LP.speech.supported ? '<p class="note">' + h(t('Speech is not available in this browser. Read the transcript instead.')) + '</p><div class="passage-body">' + script.split(/\n+/).map(p => '<p>' + h(p) + '</p>').join('') + '</div>' :
          (mode === 'practice' && tx ? '<details class="transcript"><summary>' + h(t('Show transcript')) + '</summary><div class="passage-body">' + script.split(/\n+/).map(p => '<p>' + h(p) + '</p>').join('') + '</div></details>' : '')) +
        '</div>';
    }
    return out;
  }
  function render(q, r, reveal, opts) {
    opts = opts || {};
    prepare(q);
    const s = reveal ? score(q, r) : null;
    let body = '';
    const qtext = q.q ? '<p class="q-text">' + h(q.q).replace(/_{2,}/g, '<span class="gap">_____</span>') + '</p>' : '';
    if (q.t === 'mc') {
      body = '<div class="options" role="radiogroup" aria-label="' + h(t('Answers')) + '">' + q.o.map((o, i) => {
        let cls = r === i ? ' selected' : '';
        if (reveal) { if (i === q.a) cls += ' correct'; else if (r === i) cls += ' wrong'; }
        return '<button type="button" role="radio" aria-checked="' + (r === i) + '" class="option' + cls + '" data-act="q-pick" data-v="' + i + '"' + (reveal ? ' disabled' : '') + '><span class="opt-key">' + String.fromCharCode(65 + i) + '</span><span>' + h(o) + '</span></button>';
      }).join('') + '</div>';
    } else if (q.t === 'tf') {
      body = '<div class="options tf" role="radiogroup">' + [true, false].map(v => {
        let cls = r === v ? ' selected' : '';
        if (reveal) { if (v === q.a) cls += ' correct'; else if (r === v) cls += ' wrong'; }
        return '<button type="button" role="radio" aria-checked="' + (r === v) + '" class="option' + cls + '" data-act="q-pick" data-v="' + v + '"' + (reveal ? ' disabled' : '') + '>' + h(t(v ? 'True' : 'False')) + '</button>';
      }).join('') + '</div>';
    } else if (q.t === 'fill' || q.t === 'type') {
      const id = 'qin-' + Math.random().toString(36).slice(2, 8);
      body = '<label class="sr-only" for="' + id + '">' + h(t('Your answer')) + '</label><input id="' + id + '" class="q-input' + (reveal ? (s ? ' correct' : ' wrong') : '') + '" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" value="' + h(r || '') + '" placeholder="' + h(t('Type here…')) + '"' + (reveal ? ' disabled' : '') + '>' +
        (q.hint ? '<p class="note">' + icon('lightbulb') + ' ' + h(q.hint) + '</p>' : '');
    } else if (q.t === 'order') {
      const used = r || [];
      body = '<div class="order-built' + (reveal ? (s ? ' correct' : ' wrong') : '') + '" aria-label="' + h(t('Your sentence')) + '">' + (used.length ? used.map((ti, k) =>
        '<button type="button" class="chip on" data-act="q-unorder" data-k="' + k + '"' + (reveal ? ' disabled' : '') + '>' + h(q._tokens[ti]) + '</button>').join('') : '<span class="muted">' + h(t('Tap the words below to build the sentence.')) + '</span>') + '</div>' +
        '<div class="order-pool">' + q._tokens.map((tk, i) => used.includes(i) ? '' : '<button type="button" class="chip" data-act="q-order" data-i="' + i + '"' + (reveal ? ' disabled' : '') + '>' + h(tk) + '</button>').join('') + '</div>';
    } else if (q.t === 'match') {
      const rr = r || [];
      body = '<div class="match">' + q.pairs.map((p, i) => {
        const id = 'qm-' + i + '-' + Math.random().toString(36).slice(2, 6);
        const ok = reveal ? rr[i] === p[1] : null;
        return '<div class="match-row' + (reveal ? (ok ? ' correct' : ' wrong') : '') + '"><label for="' + id + '">' + h(p[0]) + '</label>' +
          '<select id="' + id + '" data-mi="' + i + '"' + (reveal ? ' disabled' : '') + '><option value="">' + h(t('Choose…')) + '</option>' +
          q._rights.map(o => '<option' + (rr[i] === o ? ' selected' : '') + '>' + h(o) + '</option>').join('') + '</select>' +
          (reveal && !ok ? '<span class="match-fix">' + icon('check') + ' ' + h(p[1]) + '</span>' : '') + '</div>';
      }).join('') + '</div>';
    }
    let fb = '';
    if (reveal) {
      const good = s >= 1, part = s > 0 && s < 1;
      fb = '<div class="feedback ' + (good ? 'ok' : part ? 'part' : 'bad') + '" role="status">' +
        '<strong>' + h(t(good ? 'Correct!' : part ? 'Partly correct.' : 'Not quite.')) + '</strong>' +
        (!good ? '<p>' + h(t('Correct answer')) + ': <b>' + h(correctText(q)) + '</b></p>' : '') +
        (q.e ? '<p>' + h(q.e) + '</p>' : '') + '</div>';
    }
    return '<div class="question" data-type="' + q.t + '">' +
      (opts.hideHint ? '' : '<p class="q-hint">' + h(t(q.prompt || typeHint(q))) + '</p>') +
      passageBlock(q, opts.mode) + qtext + body + fb + '</div>';
  }

  // Read current answer from inputs (for typed answers and matching).
  function collect(root, q, r) {
    if (q.t === 'fill' || q.t === 'type') { const i = root.querySelector('.q-input'); return i ? i.value : r; }
    if (q.t === 'match') { const out = []; root.querySelectorAll('select[data-mi]').forEach(s => { out[+s.dataset.mi] = s.value; }); return out; }
    return r;
  }
  function audioText(q) {
    const tx = LP.store.textById[q.audio];
    const raw = tx ? tx.text : q.audio;
    return raw.split(/\n+/).map(l => l.replace(/^[A-Z][\w .’']{0,20}:\s+/, '')).join(' ');
  }

  /* ---------------- quiz runner ---------------- */
  // opts: { title, intro, questions, mode, timeLimit (seconds), id, onFinish(result), onExit(), recommend(result), previous: [results], retake() }
  function Quiz(parent, opts) {
    const root = LP.ui.comp(parent, 'quiz');
    const qs = opts.questions.map(prepare);
    const resp = new Array(qs.length).fill(null);
    const revealed = new Array(qs.length).fill(false);
    let idx = 0, finished = false, startedAt = Date.now(), timer = null, remaining = opts.timeLimit || 0;
    const mode = opts.mode || 'practice';

    function header() {
      const done = mode === 'practice' ? revealed.filter(Boolean).length : resp.filter((r, i) => answered(qs[i], r)).length;
      return '<div class="quiz-head">' +
        '<div class="quiz-progress"><span>' + h(t('Question')) + ' ' + (idx + 1) + ' / ' + qs.length + '</span>' +
        (remaining && mode === 'test' ? '<span class="timer' + (remaining < 60 ? ' warn' : '') + '" aria-live="off">' + icon('clock') + ' <b>' + fmt(remaining) + '</b></span>' : '') + '</div>' +
        '<div class="progress" role="progressbar" aria-label="' + h(t('Progress')) + '" aria-valuemin="0" aria-valuemax="' + qs.length + '" aria-valuenow="' + done + '"><span style="width:' + (100 * done / qs.length) + '%"></span></div>' +
        (mode === 'test' ? '<div class="qdots" aria-label="' + h(t('Questions')) + '">' + qs.map((q, i) => '<button type="button" class="qdot' + (i === idx ? ' cur' : '') + (answered(q, resp[i]) ? ' done' : '') + '" data-act="q-goto" data-i="' + i + '" aria-label="' + h(t('Question')) + ' ' + (i + 1) + '">' + (i + 1) + '</button>').join('') + '</div>' : '') +
        '</div>';
    }
    function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
    function draw() {
      if (finished) return;
      const q = qs[idx];
      const rev = mode === 'practice' && revealed[idx];
      const last = idx === qs.length - 1;
      let nav;
      if (mode === 'practice') {
        nav = rev ? '<button type="button" class="btn primary" data-act="q-next">' + h(t(last ? 'See results' : 'Next')) + ' ' + icon('arrowR') + '</button>'
          : '<button type="button" class="btn ghost" data-act="q-skip">' + h(t('Skip')) + '</button><button type="button" class="btn primary" data-act="q-check">' + h(t('Check')) + '</button>';
      } else {
        nav = '<button type="button" class="btn ghost" data-act="q-prev"' + (idx === 0 ? ' disabled' : '') + '>' + icon('arrowL') + ' ' + h(t('Previous')) + '</button>' +
          (last ? '<button type="button" class="btn primary" data-act="q-finish">' + h(t('Finish test')) + '</button>' : '<button type="button" class="btn primary" data-act="q-next">' + h(t('Next')) + ' ' + icon('arrowR') + '</button>');
      }
      root.innerHTML = (opts.title ? '<h2 class="quiz-title">' + h(opts.title) + '</h2>' : '') + header() +
        '<div class="card q-card">' + render(q, resp[idx], rev, { mode }) + '</div>' +
        '<div class="quiz-nav">' + nav + '</div>';
      const inp = root.querySelector('.q-input:not([disabled])');
      if (inp) setTimeout(() => inp.focus({ preventScroll: false }), 30);
    }
    function sync() { resp[idx] = collect(root, qs[idx], resp[idx]); }

    root.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.classList.contains('q-input')) {
        e.preventDefault(); sync();
        if (mode === 'practice') { if (!revealed[idx]) check(); else next(); } else next();
      }
    });
    root.addEventListener('change', e => { if (e.target.matches('select[data-mi]')) sync(); });

    function check() {
      sync();
      if (!answered(qs[idx], resp[idx])) { LP.ui.toast(t('Please answer the question first.'), 'error'); return; }
      revealed[idx] = true; draw();
      const fb = root.querySelector('.feedback'); if (fb) fb.focus && fb.setAttribute('tabindex', '-1');
    }
    function next() {
      sync();
      if (idx < qs.length - 1) { idx++; draw(); } else finish();
    }
    async function finish(auto) {
      sync();
      if (mode === 'test' && !auto) {
        const empty = qs.filter((q, i) => !answered(q, resp[i])).length;
        if (empty) {
          const ok = await LP.ui.confirm('Finish the test?', 'You have ' + empty + ' unanswered question(s). Unanswered questions count as wrong.', 'Finish test');
          if (!ok) return;
        }
      }
      finished = true;
      clearInterval(timer);
      LP.speech.stop();
      const answers = qs.map((q, i) => ({ q, r: resp[i], s: score(q, resp[i]) }));
      const total = qs.length;
      const correct = answers.reduce((s, a) => s + a.s, 0);
      const pct = total ? Math.round(100 * correct / total) : 0;
      // Weak areas and per-skill scores
      const topics = {}; const skills = {};
      answers.forEach(a => {
        const k = a.q.topicLabel || a.q.topic || 'General';
        topics[k] = topics[k] || { label: k, right: 0, total: 0, key: a.q.topic };
        topics[k].total++; topics[k].right += a.s;
        if (a.q.skill) { skills[a.q.skill] = skills[a.q.skill] || { sum: 0, n: 0 }; skills[a.q.skill].sum += a.s; skills[a.q.skill].n++; }
        LP.store.recordTopic(a.q.topic, a.q.topicLabel, a.q.skill, a.s >= 1);
      });
      const weak = Object.values(topics).filter(x => x.right / x.total < 0.75).sort((a, b) => a.right / a.total - b.right / b.total);
      const skillScores = {}; Object.keys(skills).forEach(k => { skillScores[k] = Math.round(100 * skills[k].sum / skills[k].n); });
      const result = { score: pct, correct: Math.round(correct * 10) / 10, total, answers, weak, skillScores, seconds: Math.round((Date.now() - startedAt) / 1000) };
      LP.store.save();
      const previous = opts.previous ? opts.previous() : [];
      if (opts.onFinish) opts.onFinish(result);
      showResults(result, previous);
    }

    function showResults(res, previous) {
      const r = LP.ui.rating(res.score);
      const rec = opts.recommend ? opts.recommend(res) : null;
      let cmp = '';
      if (previous && previous.length) {
        const last = previous[previous.length - 1];
        const best = Math.max(...previous.map(p => p.score));
        const diff = res.score - last.score;
        cmp = '<div class="compare"><span>' + h(t('Last time')) + ': <b>' + last.score + '%</b></span><span>' + h(t('Best')) + ': <b>' + Math.max(best, res.score) + '%</b></span><span class="' + (diff >= 0 ? 'up' : 'down') + '">' + (diff >= 0 ? '+' : '') + diff + '%</span></div>';
      }
      root.innerHTML = '<div class="results">' +
        '<div class="results-top card">' + LP.ui.ring(res.score, 100, { center: res.score + '%', sub: t(r.label), label: t('Score') + ' ' + res.score + '%' }) +
        '<div><h2>' + h(opts.title || t('Results')) + '</h2>' +
        '<p class="rating ' + r.cls + '">' + h(t(r.label)) + '</p>' +
        '<p>' + h(t('You answered')) + ' <b>' + res.correct + '</b> ' + h(t('of')) + ' <b>' + res.total + '</b> ' + h(t('questions correctly.')) + '</p>' +
        '<p class="muted">' + h(t('Time')) + ': ' + Math.floor(res.seconds / 60) + ' min ' + (res.seconds % 60) + ' s</p>' + cmp + '</div></div>' +
        (res.weak.length ? '<div class="card"><h3>' + h(t('Areas to review')) + '</h3><ul class="weak-list">' + res.weak.map(w => '<li><span>' + h(w.label) + '</span><span class="muted">' + Math.round(w.right * 10) / 10 + ' / ' + w.total + '</span></li>').join('') + '</ul></div>'
          : '<div class="card"><h3>' + h(t('Areas to review')) + '</h3><p>' + h(t('No weak areas in this activity. Great work!')) + '</p></div>') +
        (rec ? '<div class="card next-step">' + icon('lightbulb') + '<div><h3>' + h(t('Recommended next step')) + '</h3><p>' + h(rec.text) + '</p>' + (rec.href ? '<a class="btn primary" href="' + rec.href + '">' + h(t(rec.label || 'Continue')) + '</a>' : '') + '</div></div>' : '') +
        '<details class="card review-answers"><summary><h3>' + h(t('Review your answers')) + '</h3></summary><ol>' + res.answers.map(a =>
          '<li class="' + (a.s >= 1 ? 'ok' : a.s > 0 ? 'part' : 'bad') + '"><p class="q-text">' + h(a.q.q || typeHint(a.q)) + '</p>' +
          '<p>' + icon(a.s >= 1 ? 'check' : 'x') + ' ' + h(t('Your answer')) + ': <b>' + h(responseText(a.q, a.r)) + '</b></p>' +
          (a.s < 1 ? '<p>' + h(t('Correct answer')) + ': <b>' + h(correctText(a.q)) + '</b></p>' : '') +
          (a.q.e ? '<p class="muted">' + h(a.q.e) + '</p>' : '') + '</li>').join('') + '</ol></details>' +
        '<div class="quiz-nav">' + (opts.retake ? '<button type="button" class="btn" data-act="q-retake">' + icon('repeat') + ' ' + h(t('Try again')) + '</button>' : '') +
        (opts.onExit ? '<button type="button" class="btn primary" data-act="q-exit">' + h(t(opts.exitLabel || 'Done')) + '</button>' : '') + '</div></div>';
      root.scrollIntoView({ behavior: LP.reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }

    LP.ui.on(root, {
      'q-pick': b => { const q = qs[idx]; resp[idx] = q.t === 'tf' ? b.dataset.v === 'true' : +b.dataset.v; draw(); },
      'q-order': b => { sync(); resp[idx] = (resp[idx] || []).concat(+b.dataset.i); draw(); },
      'q-unorder': b => { const arr = (resp[idx] || []).slice(); arr.splice(+b.dataset.k, 1); resp[idx] = arr; draw(); },
      'q-check': check,
      'q-skip': () => { sync(); revealed[idx] = true; draw(); },
      'q-next': next,
      'q-prev': () => { sync(); if (idx > 0) { idx--; draw(); } },
      'q-goto': b => { sync(); idx = +b.dataset.i; draw(); },
      'q-finish': () => finish(false),
      'q-audio': () => LP.speech.speak(audioText(qs[idx]), { rate: LP.store.state.settings.speechRate }),
      'q-audio-stop': () => LP.speech.stop(),
      'q-retake': () => { clearInterval(timer); opts.retake(); },
      'q-exit': () => opts.onExit()
    });

    if (opts.timeLimit && mode === 'test') {
      timer = setInterval(() => {
        if (!document.body.contains(root)) { clearInterval(timer); return; }
        remaining--;
        const el = root.querySelector('.timer b'); if (el) { el.textContent = fmt(Math.max(0, remaining)); el.parentElement.classList.toggle('warn', remaining < 60); }
        if (remaining <= 0) { clearInterval(timer); LP.ui.toast(t('Time is up!')); finish(true); }
      }, 1000);
    }
    draw();
    return { root, finish };
  }

  LP.quiz = { render, score, norm, Quiz, prepare, correctText };
})();
