/* LinguaPath — curriculum structure (levels, units). Lessons are built from units in store.js */
window.LP = window.LP || {};

LP.LEVELS = [
  { id: 'A1', name: 'Beginner', sk: 'Začiatočník', desc: 'Simple words and phrases about you, your family and your day.' },
  { id: 'A2', name: 'Elementary', sk: 'Mierne pokročilý', desc: 'Everyday situations: shopping, travel, plans and health.' },
  { id: 'B1', name: 'Intermediate', sk: 'Stredne pokročilý', desc: 'Work, experiences, stories and your opinions.' },
  { id: 'B2', name: 'Upper Intermediate', sk: 'Vyššie stredne pokročilý', desc: 'Professional English, news, debates and formal writing.' },
  { id: 'C1', name: 'Advanced', sk: 'Pokročilý', desc: 'Nuance, idioms, register, academic English and implied meaning.' }
];

/* Each unit has 5 lessons:
   1 vocabulary, 2 grammar, 3 reading or listening (text), 4 speaking or writing (practice), 5 review test */
LP.UNITS = [
  // ---------- A1 ----------
  { id: 'a1u1', level: 'A1', n: 1, title: 'Hello and Welcome', topic: 'Greetings and introductions', grammar: 'a1-be', text: 'r-a1-1', practice: { type: 'speaking', id: 'sc-introduce' } },
  { id: 'a1u2', level: 'A1', n: 2, title: 'Numbers, Dates and Time', topic: 'Numbers, dates and time', grammar: 'a1-articles', text: 'l-a1-1', practice: { type: 'writing', id: 'w-a1-about' } },
  { id: 'a1u3', level: 'A1', n: 3, title: 'Family and Friends', topic: 'Family and friends', grammar: 'a1-possessive', text: 'r-a1-2', practice: { type: 'speaking', id: 'sc-friend' } },
  { id: 'a1u4', level: 'A1', n: 4, title: 'Food and Drinks', topic: 'Food and drinks', grammar: 'a1-thereis', text: 'l-a1-2', practice: { type: 'speaking', id: 'sc-cafe' } },
  { id: 'a1u5', level: 'A1', n: 5, title: 'My Day', topic: 'Daily routines', grammar: 'a1-present-simple', text: 'r-a1-3', practice: { type: 'writing', id: 'w-a1-routine' } },
  { id: 'a1u6', level: 'A1', n: 6, title: 'In Town', topic: 'Places in town', grammar: 'a1-questions', text: 'l-a1-3', practice: { type: 'writing', id: 'w-a1-town' } },
  // ---------- A2 ----------
  { id: 'a2u1', level: 'A2', n: 1, title: 'Shopping', topic: 'Shopping and prices', grammar: 'a2-countable', text: 'r-a2-1', practice: { type: 'speaking', id: 'sc-shopping' } },
  { id: 'a2u2', level: 'A2', n: 2, title: 'Travel and Transport', topic: 'Travel and transport', grammar: 'a2-past-simple', text: 'l-a2-1', practice: { type: 'writing', id: 'w-a2-postcard' } },
  { id: 'a2u3', level: 'A2', n: 3, title: 'Towns and Cities', topic: 'Towns, cities and directions', grammar: 'a2-comparatives', text: 'r-a2-2', practice: { type: 'speaking', id: 'sc-directions' } },
  { id: 'a2u4', level: 'A2', n: 4, title: 'Plans for the Future', topic: 'Future plans', grammar: 'a2-future', text: 'l-a2-2', practice: { type: 'writing', id: 'w-a2-email' } },
  { id: 'a2u5', level: 'A2', n: 5, title: 'Holidays and Hotels', topic: 'Holidays and hotels', grammar: 'a2-present-continuous', text: 'r-a2-3', practice: { type: 'speaking', id: 'sc-hotel' } },
  { id: 'a2u6', level: 'A2', n: 6, title: 'Health', topic: 'Health and everyday problems', grammar: 'a2-should', text: 'l-a2-3', practice: { type: 'writing', id: 'w-a2-advice' } },
  // ---------- B1 ----------
  { id: 'b1u1', level: 'B1', n: 1, title: 'Work and Education', topic: 'Work and education', grammar: 'b1-modals', text: 'r-b1-1', practice: { type: 'speaking', id: 'sc-school-work' } },
  { id: 'b1u2', level: 'B1', n: 2, title: 'Experiences and Achievements', topic: 'Experiences and achievements', grammar: 'b1-present-perfect', text: 'l-b1-1', practice: { type: 'writing', id: 'w-b1-experience' } },
  { id: 'b1u3', level: 'B1', n: 3, title: 'Telling Stories', topic: 'Telling stories', grammar: 'b1-past-continuous', text: 'r-b1-2', practice: { type: 'speaking', id: 'sc-airport' } },
  { id: 'b1u4', level: 'B1', n: 4, title: 'Choices and Possibilities', topic: 'Choices and possibilities', grammar: 'b1-conditionals', text: 'l-b1-2', practice: { type: 'writing', id: 'w-b1-opinion' } },
  { id: 'b1u5', level: 'B1', n: 5, title: 'People and Places', topic: 'People, places and hobbies', grammar: 'b1-relative', text: 'r-b1-3', practice: { type: 'speaking', id: 'sc-hobbies' } },
  { id: 'b1u6', level: 'B1', n: 6, title: 'Phrasal Verbs and Opinions', topic: 'Everyday phrasal verbs and opinions', grammar: 'b1-phrasal', text: 'l-b1-3', practice: { type: 'writing', id: 'w-b1-advice' } },
  // ---------- B2 ----------
  { id: 'b2u1', level: 'B2', n: 1, title: 'Professional Communication', topic: 'Professional communication', grammar: 'b2-passive', text: 'r-b2-1', practice: { type: 'speaking', id: 'sc-interview' } },
  { id: 'b2u2', level: 'B2', n: 2, title: 'News and Reporting', topic: 'News and reporting', grammar: 'b2-reported', text: 'l-b2-1', practice: { type: 'writing', id: 'w-b2-complaint' } },
  { id: 'b2u3', level: 'B2', n: 3, title: 'Regrets and Alternatives', topic: 'Decisions and regrets', grammar: 'b2-conditionals', text: 'r-b2-2', practice: { type: 'speaking', id: 'sc-problem' } },
  { id: 'b2u4', level: 'B2', n: 4, title: 'Debates and Arguments', topic: 'Debates and arguments', grammar: 'b2-linking', text: 'l-b2-2', practice: { type: 'writing', id: 'w-b2-essay' } },
  { id: 'b2u5', level: 'B2', n: 5, title: 'Natural English', topic: 'Collocations and habits', grammar: 'b2-gerund-infinitive', text: 'r-b2-3', practice: { type: 'speaking', id: 'sc-meeting' } },
  { id: 'b2u6', level: 'B2', n: 6, title: 'Formal and Informal English', topic: 'Formal and informal English', grammar: 'b2-modal-perfect', text: 'l-b2-3', practice: { type: 'writing', id: 'w-b2-review' } },
  // ---------- C1 ----------
  { id: 'c1u1', level: 'C1', n: 1, title: 'Nuanced Opinions', topic: 'Nuanced opinions and arguments', grammar: 'c1-hedging', text: 'r-c1-1', practice: { type: 'speaking', id: 'sc-debate' } },
  { id: 'c1u2', level: 'C1', n: 2, title: 'Idiomatic English', topic: 'Idiomatic expressions', grammar: 'c1-inversion', text: 'l-c1-1', practice: { type: 'writing', id: 'w-c1-summary' } },
  { id: 'c1u3', level: 'C1', n: 3, title: 'Register and Tone', topic: 'Register and tone', grammar: 'c1-cleft', text: 'r-c1-2', practice: { type: 'speaking', id: 'sc-negotiation' } },
  { id: 'c1u4', level: 'C1', n: 4, title: 'Academic English', topic: 'Academic writing', grammar: 'c1-nominalisation', text: 'l-c1-2', practice: { type: 'writing', id: 'w-c1-essay' } },
  { id: 'c1u5', level: 'C1', n: 5, title: 'Presentations and Persuasion', topic: 'Professional presentations', grammar: 'c1-participle', text: 'r-c1-3', practice: { type: 'speaking', id: 'sc-panel' } },
  { id: 'c1u6', level: 'C1', n: 6, title: 'Reading Between the Lines', topic: 'Understanding implied meaning', grammar: 'c1-wish', text: 'l-c1-3', practice: { type: 'writing', id: 'w-c1-proposal' } }
];

LP.SKILLS = [
  { id: 'speaking', name: 'Speaking', sk: 'Hovorenie' },
  { id: 'listening', name: 'Listening', sk: 'Počúvanie' },
  { id: 'reading', name: 'Reading', sk: 'Čítanie' },
  { id: 'writing', name: 'Writing', sk: 'Písanie' },
  { id: 'grammar', name: 'Grammar', sk: 'Gramatika' },
  { id: 'vocabulary', name: 'Vocabulary', sk: 'Slovná zásoba' }
];

LP.GOAL_OPTIONS = [
  { id: 'speak', label: 'Speak English with confidence.', skills: ['speaking'] },
  { id: 'movies', label: 'Understand movies and videos.', skills: ['listening', 'vocabulary'] },
  { id: 'grammar', label: 'Improve grammar.', skills: ['grammar'] },
  { id: 'vocab', label: 'Learn more vocabulary.', skills: ['vocabulary'] },
  { id: 'exams', label: 'Prepare for school exams.', skills: ['grammar', 'reading', 'writing'] },
  { id: 'travel', label: 'Prepare for work or travel.', skills: ['speaking', 'listening'] },
  { id: 'readwrite', label: 'Improve writing and reading.', skills: ['reading', 'writing'] }
];
