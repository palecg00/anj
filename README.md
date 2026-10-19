# LinguaPath — Interactive English Learning (A1 → C1)

A local-first English course that runs entirely in the browser. It has no backend, no account and no external APIs. Progress is stored in `localStorage`.

## Run it
Open `index.html` in a modern browser (Chrome, Edge, Firefox or Safari). That's all.
Optional: serve the folder over http (for example `npx http-server`) so the service worker caches everything for full offline use.

## What's inside
- **Curriculum:** 5 CEFR levels × 6 units × 5 lessons = **150 lessons**: vocabulary, grammar, reading/listening, speaking/writing and a unit review.
- **Content:** 300 words (definition, example, part of speech, Slovak translation), 30 grammar topics, 30 original reading/listening texts with Slovak translations, 15 branching conversations, 15 writing tasks and a 25-question placement test.
- **Vocabulary:** flashcards with spaced repetition (Again/Hard/Good/Easy), Words to Review, search and filters, favourites, 9 practice modes, and your own saved words.
- **Practice:** guided conversations and a free typing mode (with approximate rule-based feedback), pronunciation (speech synthesis/recognition when the browser supports it, with a dictation fallback), reading with highlighted words, a listening player with speed control and sentence repeat, and writing with drafts, a checklist, local feedback and model answers.
- **Tests:** placement, vocabulary, grammar, reading, listening, unit and full-level tests. Question types: multiple choice, true/false, gap fill, typed answer, ordering and matching. Tests have a timer, previous/next navigation, explanations, weak areas, a recommended next step and comparison with earlier attempts.
- **Goals, progress and self-assessment:** streaks, weekly calendar, personal goals, an in-app reminder (it never asks for notification permission), charts, estimated level progress (not an official CEFR result), a weekly summary and achievements.
- **Settings:** English or Slovak interface, translations, level, daily goal, preferred skills, speech speed and voice, light/dark theme, reduced motion, and JSON export/import (validated) and reset (with confirmation).

## Structure
- `js/data/*` — content only (curriculum, vocabulary, grammar, texts, scenarios, writing tasks, placement test)
- `js/store.js` — state, persistence, spaced repetition, statistics and recommendations
- `js/quiz.js`, `js/gen.js` — question engine and test generation
- `js/pages/*` — pages and reusable activity components
