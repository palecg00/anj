/* LinguaPath — browser speech features (optional). Speech synthesis for listening,
   speech recognition (where the browser supports it) for speaking practice. */
window.LP = window.LP || {};

(function () {
  const synth = window.speechSynthesis;
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  let voices = [];
  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang));
    document.dispatchEvent(new CustomEvent('lp:voices'));
  }
  if (synth) { loadVoices(); if ('onvoiceschanged' in synth) synth.onvoiceschanged = loadVoices; }

  function pickVoice(index) {
    if (!voices.length) return null;
    const pref = LP.store.state.settings.voice;
    let list = voices.slice();
    if (pref) { const p = list.find(v => v.name === pref); if (p) list = [p].concat(list.filter(v => v !== p)); }
    else {
      // Prefer a local British/American voice when available.
      list.sort((a, b) => (b.localService ? 1 : 0) - (a.localService ? 1 : 0));
    }
    return list[(index || 0) % list.length];
  }

  const speech = {
    get supported() { return !!(synth && window.SpeechSynthesisUtterance); },
    get recognitionSupported() { return !!Rec; },
    get voices() { return voices; },
    speak(text, opts) {
      opts = opts || {};
      if (!speech.supported) { if (opts.onend) opts.onend(); return false; }
      if (!opts.queue) synth.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      u.lang = 'en-GB';
      const v = pickVoice(opts.voice || 0);
      if (v) { u.voice = v; u.lang = v.lang; }
      u.rate = opts.rate || LP.store.state.settings.speechRate || 0.9;
      u.onend = () => { if (opts.onend) opts.onend(); };
      u.onerror = () => { if (opts.onend) opts.onend(true); };
      synth.speak(u);
      return true;
    },
    stop() { if (synth) synth.cancel(); },
    get speaking() { return !!(synth && synth.speaking); },
    listen(opts) {
      // Returns a stop function. Recognised text is passed to opts.onresult(text, confidence).
      if (!Rec) { if (opts.onerror) opts.onerror('not-supported'); return () => {}; }
      const r = new Rec();
      r.lang = 'en-GB';
      r.interimResults = false;
      r.maxAlternatives = 1;
      let got = false;
      r.onresult = e => { got = true; const res = e.results[0][0]; if (opts.onresult) opts.onresult(res.transcript, res.confidence); };
      r.onerror = e => { if (opts.onerror) opts.onerror(e.error); };
      r.onend = () => { if (opts.onend) opts.onend(got); };
      try { r.start(); } catch (e) { if (opts.onerror) opts.onerror('start-failed'); }
      return () => { try { r.stop(); } catch (e) { /* ignore */ } };
    }
  };

  // Word-level comparison between a target sentence and what the learner said or typed.
  speech.compare = function (target, said) {
    const norm = s => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean);
    const a = norm(target), b = norm(said);
    // Longest common subsequence to align words.
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const matched = new Array(a.length).fill(false);
    let i = 0, j = 0;
    while (i < a.length && j < b.length) { if (a[i] === b[j]) { matched[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
    const hits = matched.filter(Boolean).length;
    const extra = Math.max(0, b.length - hits);
    const score = a.length ? Math.round(100 * hits / (a.length + extra * 0.5)) : 0;
    return { words: a.map((w, k) => ({ w, ok: matched[k] })), score: Math.max(0, Math.min(100, score)), missing: a.filter((w, k) => !matched[k]) };
  };

  LP.speech = speech;
})();
