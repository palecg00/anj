/* LinguaPath — reading and listening activities. Listening uses the browser's speech synthesis. */
(function () {
  const { h, t, icon } = LP.ui;
  const S = LP.store;
  const WPM = { A1: 70, A2: 90, B1: 120, B2: 150, C1: 170 };
  const RATE = { A1: 0.75, A2: 0.85, B1: 0.92, B2: 1.0, C1: 1.05 };

  LP.textMinutes = function (tx) {
    const words = tx.text.split(/\s+/).length;
    return Math.max(1, Math.round(words / WPM[tx.level])) + (tx.kind === 'listening' ? 1 : 0);
  };

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  // Highlight vocabulary words (first occurrence of each) inside escaped paragraph HTML.
  function highlight(htmlText, words, used) {
    let parts = [htmlText];
    words.forEach((w, i) => {
      if (used[i]) return;
      const re = new RegExp('(^|[^\\w&#])(' + escapeRe(h(w[0])).replace(/'|&#39;/g, "(?:'|’|&#39;)") + ')(?=[^\\w]|$)', 'i');
      // Only replace inside plain text, never inside tags that were already added.
      parts = parts.flatMap(p => p.split(/(<[^>]+>[^<]*<\/button>)/));
      for (let k = 0; k < parts.length; k++) {
        if (parts[k].startsWith('<')) continue;
        if (re.test(parts[k])) {
          parts[k] = parts[k].replace(re, (m, pre, word) => pre + '<button type="button" class="hl-word" data-act="tx-word" data-i="' + i + '">' + word + '</button>');
          used[i] = true; break;
        }
      }
    });
    return parts.join('');
  }
  function splitLines(tx) {
    if (tx.kind === 'listening') return tx.text.split(/\n+/).filter(Boolean).flatMap(line => {
      const m = line.match(/^([A-Z][\w .’']{0,20}):\s+(.*)$/);
      const spk = m ? m[1] : '';
      const body = m ? m[2] : line;
      return body.match(/[^.!?]+[.!?]+["”’]?\s*|[^.!?]+$/g).map(s => ({ spk, text: s.trim() })).filter(x => x.text);
    });
    return [];
  }

  // opts: { onComplete(score), onExit, exitLabel }
  LP.comp.text = function (parent, id, opts) {
    opts = opts || {};
    const tx = S.textById[id];
    const root = LP.ui.comp(parent);
    const isL = tx.kind === 'listening';
    let showSk = false, showTr = !isL || !LP.speech.supported;
    let stage = 'text';
    let quizScore = null;
    // listening player state
    const lines = splitLines(tx);
    const speakers = Array.from(new Set(lines.map(l => l.spk).filter(Boolean)));
    let cur = 0, playing = false, rate = RATE[tx.level], playToken = 0;

    function info() {
      return '<div class="meta" style="margin-bottom:12px"><span class="tag lv">' + tx.level + '</span><span class="tag">' + h(tx.topic) + '</span><span>' + icon('clock') + ' ' + (isL ? h(t('about')) + ' ' : '') + LP.textMinutes(tx) + ' min ' + h(t(isL ? 'listening' : 'reading time')) + '</span><span>' + tx.text.split(/\s+/).length + ' ' + h(t('words')) + '</span></div>';
    }
    function readerHtml() {
      const used = {};
      const paras = tx.text.split(/\n\n+/).map(p => '<p>' + highlight(h(p), tx.words, used) + '</p>').join('');
      return '<div class="card"><div class="reader">' + paras + '</div><div class="word-pop" aria-live="polite"></div>' +
        '<hr><div class="row between"><button type="button" class="btn small ghost" data-act="tx-sk" aria-expanded="' + showSk + '">' + icon('globe') + ' ' + h(t(showSk ? 'Hide Slovak translation' : 'Show Slovak translation')) + '</button>' +
        (LP.speech.supported ? '<button type="button" class="btn small ghost" data-act="tx-readall">' + icon('volume') + ' ' + h(t('Read the text aloud')) + '</button>' : '') + '</div>' +
        (showSk ? '<div class="sk-box" lang="sk">' + tx.sk.split(/\n\n+/).map(p => '<p>' + h(p) + '</p>').join('') + '</div>' : '') + '</div>';
    }
    function playerHtml() {
      const sup = LP.speech.supported;
      return '<div class="card player">' +
        (!sup ? '<div class="disclaimer">' + icon('info') + '<span>' + h(t('Speech playback is not available in this browser, so this is a reading exercise. Read the transcript below and answer the questions.')) + '</span></div>' :
          '<div class="player-controls">' +
          '<button type="button" class="btn primary" data-act="pl-play">' + icon(playing ? 'pause' : 'play') + ' ' + h(t(playing ? 'Pause' : cur > 0 ? 'Continue' : 'Play')) + '</button>' +
          '<button type="button" class="btn" data-act="pl-repeat">' + icon('repeat') + ' ' + h(t('Repeat sentence')) + '</button>' +
          '<button type="button" class="icon-btn" data-act="pl-prev" aria-label="' + h(t('Previous sentence')) + '">' + icon('arrowL') + '</button>' +
          '<button type="button" class="icon-btn" data-act="pl-next" aria-label="' + h(t('Next sentence')) + '">' + icon('arrowR') + '</button>' +
          '<button type="button" class="icon-btn" data-act="pl-stop" aria-label="' + h(t('Stop and go to the start')) + '">' + icon('stop') + '</button>' +
          '<div class="speed"><label for="pl-rate">' + h(t('Speed')) + '</label><input id="pl-rate" type="range" min="0.5" max="1.3" step="0.05" value="' + rate + '"><span class="muted" id="pl-rate-v">' + rate.toFixed(2) + '×</span></div></div>' +
          '<p class="muted small">' + h(t('Sentence')) + ' <span id="pl-pos">' + (cur + 1) + '</span> / ' + lines.length + '. ' + h(t('Tip: listen once without the transcript. Then listen again and read.')) + '</p>') +
        '<div class="row"><button type="button" class="btn small ghost" data-act="pl-tr" aria-expanded="' + showTr + '">' + icon('eye') + ' ' + h(t(showTr ? 'Hide transcript' : 'Show transcript')) + '</button>' +
        '<button type="button" class="btn small ghost" data-act="tx-sk" aria-expanded="' + showSk + '">' + icon('globe') + ' ' + h(t(showSk ? 'Hide Slovak translation' : 'Show Slovak translation')) + '</button></div>' +
        '<div class="lines' + (showTr ? '' : ' blurred') + '" aria-hidden="' + !showTr + '">' + lines.map((l, i) => '<div class="line-item' + (i === cur && (playing || cur > 0) ? ' cur' : '') + '" data-line="' + i + '">' + (l.spk ? '<span class="spk">' + h(l.spk) + '</span>' : '') + '<span style="flex:1">' + h(l.text) + '</span>' +
          (sup && showTr ? '<button type="button" class="icon-btn" data-act="pl-line" data-i="' + i + '" aria-label="' + h(t('Play this sentence')) + '">' + icon('volume') + '</button>' : '') + '</div>').join('') + '</div>' +
        (showSk ? '<div class="sk-box" lang="sk">' + tx.sk.split(/\n+/).map(p => '<p>' + h(p) + '</p>').join('') + '</div>' : '') +
        (showTr ? '<p class="muted small">' + h(t('Useful words')) + ': ' + tx.words.map(w => '<b>' + h(w[0]) + '</b> (' + h(w[1]) + ')').join(', ') + '</p>' : '') + '</div>';
    }
    function playFrom(i, single) {
      if (!LP.speech.supported || i >= lines.length) { playing = false; draw(); return; }
      cur = i; playing = !single;
      const token = ++playToken;
      const voice = Math.max(0, speakers.indexOf(lines[i].spk));
      updateCur();
      LP.speech.speak(lines[i].text, {
        rate, voice,
        onend: () => {
          if (token !== playToken) return;
          if (single) { draw(); return; }
          if (playing && cur + 1 < lines.length) playFrom(cur + 1);
          else { playing = false; if (cur + 1 >= lines.length) { cur = 0; S.logEvent('listen', 'Listened: ' + tx.title, 'listening', null); } draw(); }
        }
      });
      draw();
    }
    function updateCur() { root.querySelectorAll('.line-item').forEach(el => el.classList.toggle('cur', +el.dataset.line === cur)); const p = root.querySelector('#pl-pos'); if (p) p.textContent = cur + 1; }
    function stopPlay() { playToken++; playing = false; LP.speech.stop(); }

    function draw() {
      if (stage !== 'text') return;
      root.innerHTML = info() + (isL ? playerHtml() : readerHtml()) +
        (!isL ? '<form class="card row" id="save-word"><label for="sw-in" style="flex-basis:100%">' + h(t('Did you find an unknown word? Save it to your review list.')) + '</label><input id="sw-in" type="text" maxlength="60" style="flex:1" placeholder="' + h(t('Type the word…')) + '"><button type="submit" class="btn">' + icon('plus') + ' ' + h(t('Save word')) + '</button></form>' : '') +
        '<div class="quiz-nav"><button type="button" class="btn primary" data-act="tx-q">' + h(t('Answer the questions')) + ' ' + icon('arrowR') + '</button></div>';
      const rateEl = root.querySelector('#pl-rate');
      if (rateEl) rateEl.addEventListener('input', () => { rate = +rateEl.value; root.querySelector('#pl-rate-v').textContent = rate.toFixed(2) + '×'; });
      const sw = root.querySelector('#save-word');
      if (sw) sw.addEventListener('submit', e => {
        e.preventDefault();
        const w = sw.querySelector('#sw-in').value.trim();
        if (!w) return;
        const sentence = (tx.text.match(new RegExp('[^.!?\\n]*\\b' + escapeRe(w) + '\\b[^.!?\\n]*[.!?]', 'i')) || [''])[0].trim();
        S.addCustomWord(w, '', sentence, tx.title);
        LP.ui.toast(t('Saved to My words and Words to Review.'));
        sw.querySelector('#sw-in').value = '';
      });
    }
    function questions() {
      stopPlay();
      stage = 'quiz';
      root.innerHTML = '';
      const back = LP.ui.comp(root);
      back.innerHTML = '<div class="row" style="margin-bottom:10px"><button type="button" class="btn small ghost" data-act="back">' + icon('arrowL') + ' ' + h(t(isL ? 'Back to the recording' : 'Back to the text')) + '</button></div>';
      LP.ui.on(back, { back: () => { stage = 'text'; draw(); } });
      // Keep a compact version of the text available during the questions.
      const ref = LP.ui.comp(root);
      if (isL) {
        ref.innerHTML = LP.speech.supported ? '<div class="audio-box"><button type="button" class="btn small" data-act="all">' + icon('volume') + ' ' + h(t('Play the recording')) + '</button><button type="button" class="btn small ghost" data-act="stop">' + icon('stop') + ' ' + h(t('Stop')) + '</button></div>' : '';
        LP.ui.on(ref, { all: () => LP.speech.speak(lines.map(l => l.text).join(' '), { rate }), stop: () => LP.speech.stop() });
      } else {
        ref.innerHTML = '<details class="passage"><summary>' + icon('book') + ' ' + h(t('Read the text again')) + '</summary><div class="passage-body">' + tx.text.split(/\n\n+/).map(p => '<p>' + h(p) + '</p>').join('') + '</div></details>';
      }
      const qs = LP.gen.textQuestions(tx).map(q => Object.assign(q, { passage: undefined, audio: undefined }));
      LP.quiz.Quiz(root, {
        title: t('Questions'), questions: qs, mode: 'practice',
        onFinish: res => { quizScore = res.score; },
        recommend: () => ({ text: t('Now write a short summary to practise the main ideas.') }),
        retake: () => questions(), onExit: summaryTask, exitLabel: 'Next: Summary'
      });
    }
    function summaryTask() {
      stage = 'summary';
      const sm = tx.summary;
      root.innerHTML = '<div class="card"><h2>' + h(t('Summary task')) + '</h2><p class="q-text">' + h(sm.prompt) + '</p>' +
        '<label class="sr-only" for="sum-in">' + h(t('Your summary')) + '</label><textarea id="sum-in" style="min-height:130px" placeholder="' + h(t('Write here…')) + '"></textarea>' +
        '<div class="editor-bar"><span id="sum-wc">0 ' + h(t('words')) + '</span></div>' +
        '<div class="quiz-nav" style="margin-top:10px"><button type="button" class="btn" data-act="sum-check">' + h(t('Compare with the model')) + '</button></div><div class="sum-fb"></div></div>' +
        '<div class="quiz-nav"><button type="button" class="btn primary" data-act="finish">' + icon('check') + ' ' + h(t('Finish activity')) + '</button></div>';
      const ta = root.querySelector('#sum-in');
      ta.addEventListener('input', () => { root.querySelector('#sum-wc').textContent = (ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0) + ' ' + t('words'); });
      ta.focus();
    }
    function sumCheck() {
      const text = root.querySelector('#sum-in').value.trim();
      const sm = tx.summary;
      const low = text.toLowerCase();
      const hits = sm.keywords.filter(k => low.includes(k.toLowerCase()));
      const issues = text ? LP.writingCheck(text).issues.slice(0, 4) : [];
      root.querySelector('.sum-fb').innerHTML = '<div class="feedback ' + (hits.length >= Math.ceil(sm.keywords.length / 2) ? 'ok' : 'part') + '">' +
        (text ? '<p><b>' + h(t('Key ideas you mentioned')) + ':</b> ' + hits.length + ' / ' + sm.keywords.length + (hits.length ? ' (' + hits.map(h).join(', ') + ')' : '') + '</p>' : '<p>' + h(t('You did not write a summary. You can still read the model answer.')) + '</p>') +
        (issues.length ? '<p><b>' + h(t('Possible problems')) + ':</b></p><ul class="summary-list">' + issues.map(i => '<li>' + h(i.msg) + '</li>').join('') + '</ul>' : '') +
        '<p><b>' + h(t('Model answer')) + ':</b> ' + h(sm.model) + '</p><p class="note">' + h(t('This check only looks for key words. It cannot fully judge your summary.')) + '</p></div>';
    }
    function finish() {
      const sc = quizScore == null ? null : quizScore;
      if (opts.onComplete) opts.onComplete(sc);
      root.innerHTML = '<div class="card complete-box">' + icon('check') + '<h2>' + h(t('Activity complete!')) + '</h2>' + (sc != null ? '<p>' + h(t('Your score')) + ': <b>' + sc + '%</b> · ' + h(t(LP.ui.rating(sc).label)) + '</p>' : '') +
        '<div class="row" style="justify-content:center"><button type="button" class="btn" data-act="again">' + icon('repeat') + ' ' + h(t('Do it again')) + '</button>' + (opts.onExit ? '<button type="button" class="btn primary" data-act="exit">' + h(t(opts.exitLabel || 'Done')) + '</button>' : '') + '</div></div>';
    }

    LP.ui.on(root, {
      'tx-word': b => {
        const w = tx.words[+b.dataset.i];
        const pop = root.querySelector('.word-pop');
        pop.innerHTML = '<div class="card soft row between"><div><b>' + h(w[0]) + '</b> — ' + h(w[1]) + '</div><div class="row">' + LP.playBtn(w[0]) + '<button type="button" class="btn small" data-act="tx-save" data-i="' + b.dataset.i + '">' + icon('plus') + ' ' + h(t('Save word')) + '</button></div></div>';
      },
      'tx-save': b => {
        const w = tx.words[+b.dataset.i];
        const sentence = (tx.text.match(new RegExp('[^.!?\\n]*' + escapeRe(w[0]) + '[^.!?\\n]*[.!?]', 'i')) || [''])[0].trim();
        S.addCustomWord(w[0], w[1], sentence, tx.title);
        LP.ui.toast(t('Saved to My words and Words to Review.'));
      },
      'tx-sk': () => { showSk = !showSk; draw(); },
      'tx-readall': () => LP.speech.speak(tx.text.replace(/\n+/g, ' '), { rate: RATE[tx.level] }),
      'tx-q': questions,
      'pl-play': () => { if (playing) { stopPlay(); draw(); } else playFrom(cur); },
      'pl-repeat': () => { stopPlay(); playFrom(cur, true); },
      'pl-prev': () => { stopPlay(); cur = Math.max(0, cur - 1); playFrom(cur, true); },
      'pl-next': () => { stopPlay(); cur = Math.min(lines.length - 1, cur + 1); playFrom(cur, true); },
      'pl-stop': () => { stopPlay(); cur = 0; draw(); },
      'pl-line': b => { stopPlay(); playFrom(+b.dataset.i, true); },
      'pl-tr': () => { showTr = !showTr; draw(); },
      'sum-check': sumCheck,
      finish,
      again: () => { stage = 'text'; quizScore = null; draw(); },
      exit: () => opts.onExit(),
      say: b => LP.speech.speak(b.dataset.text)
    });
    draw();
    return root;
  };
})();
