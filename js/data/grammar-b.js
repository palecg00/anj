/* LinguaPath — grammar topics B1 and B2. */
window.LP = window.LP || {};
LP.GRAMMAR = LP.GRAMMAR || [];

LP.GRAMMAR.push(
  {
    id: 'b1-modals', level: 'B1', title: 'Modal verbs: obligation and possibility', topic: 'Modal verbs',
    use: 'We use modal verbs to talk about rules, necessity, permission and possibility.',
    explain: [
      'Obligation: must and have to (necessary), don’t have to (not necessary), mustn’t (not allowed).',
      'Permission: can, could and may. “May” is more formal: May I leave early today?',
      'Possibility: might, may and could mean “perhaps”: I might apply for that job. It could be a good opportunity.',
      'Past obligation: had to. There is no past form of “must” for obligation: I had to work late yesterday.',
      'Modal verbs are followed by the base verb (without “to”), except “have to”.'
    ],
    sk: 'Modálne slovesá vyjadrujú povinnosť (must, have to), zákaz (mustn’t), nepotrebnosť (don’t have to), povolenie (can, could, may) a možnosť (might, may, could = možno). Minulý tvar povinnosti je „had to“. Po modálnych slovesách nasleduje neurčitok bez „to“.',
    patterns: [['Obligation', 'must / have to + verb — past: had to + verb'], ['Permission', 'can / could / may + subject + verb?'], ['Possibility', 'might / may / could + verb']],
    positive: ['Employees have to wear a badge.', 'You can work from home on Fridays.', 'I might study abroad next year.', 'We had to finish the report by Monday.'],
    negative: ['You don’t have to come to the meeting.', 'Students mustn’t use phones during the exam.', 'She might not get the job.'],
    qa: [['May I ask a question?', 'Of course. Go ahead.'], ['Do you have to work at weekends?', 'Sometimes I do.'], ['Will you take the job?', 'I don’t know. I might.']],
    mistakes: [['I must to go.', 'I must go.', 'No “to” after “must”.'], ['Yesterday I must work late.', 'Yesterday I had to work late.', 'Use “had to” for past obligation.'], ['He mights come.', 'He might come.', 'Modal verbs do not take -s.'], ['It’s possible that I might come maybe.', 'I might come.', '“Might” already means “maybe”.']],
    exercise: [
      { t: 'mc', q: 'Last year I ___ wear a uniform at work.', o: ['must', 'had to', 'have to'], a: 1, e: 'Past obligation: had to.' },
      { t: 'mc', q: 'I’m not sure, but I ___ change my job next year.', o: ['might', 'must', 'have to'], a: 0, e: '“Might” expresses possibility (perhaps).' },
      { t: 'mc', q: 'The course is free. You ___ pay anything.', o: ['mustn’t', 'don’t have to', 'can’t'], a: 1, e: 'Not necessary → don’t have to.' },
      { t: 'fill', q: '___ I use your pen, please? (polite, formal)', a: ['May', 'Could'], e: 'We ask for permission politely with “May I…?” or “Could I…?”' },
      { t: 'tf', q: '“She might not come” means she will definitely not come.', a: false, e: '“Might not” means it is possible that she won’t come. It is not certain.' },
      { t: 'type', q: 'Change to the past: “I have to finish this today.” (yesterday)', a: ['I had to finish this yesterday.', 'I had to finish it yesterday.'], e: 'The past form of “have to” is “had to”.' },
      { t: 'order', a: 'Do you have to work on Saturdays?', e: 'Question with “have to”: Do + subject + have to + verb.' }
    ]
  },
  {
    id: 'b1-present-perfect', level: 'B1', title: 'Present perfect', topic: 'Verbs and tenses',
    use: 'We use the present perfect for experiences in our life and for past actions with a result now.',
    explain: [
      'Form: have / has + past participle: I have visited, she has seen, they have gone.',
      'Life experiences (we do not say when): Have you ever climbed a mountain? I’ve never been to Japan.',
      'A past action with a result now: I’ve lost my keys (I don’t have them now).',
      'Unfinished time and recent actions: with just, already, yet, this week, so far.',
      'Duration up to now: with for (a period) and since (a starting point): I’ve lived here for five years / since 2020.',
      'If you say a finished time (yesterday, in 2019, last week), use the past simple instead.'
    ],
    sk: 'Predprítomný čas (have/has + 3. tvar slovesa) nemá v slovenčine priamy ekvivalent. Používame ho pri životných skúsenostiach bez určenia času (Have you ever…?), pri minulých dejoch s výsledkom v prítomnosti a pri dejoch, ktoré trvajú do teraz (for = počas, since = od). Ak uvedieme ukončený čas v minulosti (yesterday), použijeme minulý čas.',
    patterns: [['Positive', 'have / has + past participle'], ['Negative', 'haven’t / hasn’t + past participle'], ['Question', 'Have / Has + subject + (ever) + past participle?'], ['Duration', '… for + period / since + starting point']],
    positive: ['I have run two marathons.', 'She has just finished her exams.', 'We’ve lived in this flat since 2021.'],
    negative: ['I haven’t seen that film yet.', 'He has never flown in a plane.'],
    qa: [['Have you ever won a prize?', 'Yes, I have. I won a photo competition in 2022.'], ['How long have you known Eva?', 'For about ten years.']],
    mistakes: [['I have seen him yesterday.', 'I saw him yesterday.', 'With a finished time (yesterday), use the past simple.'], ['I live here since 2018.', 'I have lived here since 2018.', 'Use the present perfect for duration up to now.'], ['She has went home.', 'She has gone home.', 'Use the past participle: gone.'], ['I have been in Paris for five years ago.', 'I was in Paris five years ago.', '“Ago” goes with the past simple.']],
    exercise: [
      { t: 'mc', q: 'I ___ to Spain three times.', o: ['have been', 'was', 'am'], a: 0, e: 'A life experience without a specific time: present perfect.' },
      { t: 'mc', q: 'We ___ the museum last Saturday.', o: ['have visited', 'visited'], a: 1, e: '“Last Saturday” is a finished time, so use the past simple.' },
      { t: 'fill', q: 'She has worked here ___ 2019.', a: ['since'], e: '2019 is a starting point → since.' },
      { t: 'fill', q: 'They have been married ___ twenty years.', a: ['for'], e: '“Twenty years” is a period → for.' },
      { t: 'type', q: 'Write a question with “ever”: (you / meet / a famous person?)', a: ['Have you ever met a famous person?'], e: 'Have + you + ever + past participle (met).' },
      { t: 'tf', q: '“I haven’t finished my homework yet.” is correct.', a: true, e: '“Yet” is used in negatives and questions, usually at the end.' },
      { t: 'order', a: 'He has already achieved his goal.', e: '“Already” usually goes between “has” and the past participle.' }
    ]
  },
  {
    id: 'b1-past-continuous', level: 'B1', title: 'Past continuous and past simple', topic: 'Verbs and tenses',
    use: 'We use the past continuous for background actions in a story and the past simple for the main events.',
    explain: [
      'Form of the past continuous: was / were + verb-ing: I was walking, they were talking.',
      'Use it for an action in progress at a time in the past: At 8 p.m. I was having dinner.',
      'Use it for the background of a story: The sun was shining and people were sitting in the park.',
      'Use the past simple for a shorter action that interrupts: I was walking home when I saw an old friend.',
      'Use “while” with the longer action and “when” with the shorter action.',
      'Two actions in progress at the same time: While I was cooking, my brother was cleaning.'
    ],
    sk: 'Minulý priebehový čas (was/were + -ing) opisuje dej, ktorý práve prebiehal v minulosti, alebo pozadie príbehu. Jednoduchý minulý čas opisuje krátky dej, ktorý ho prerušil. „While“ (zatiaľ čo) ide s dlhším dejom, „when“ (keď) s krátkym dejom.',
    patterns: [['Background', 'was / were + verb-ing'], ['Interruption', 'past continuous + when + past simple'], ['At the same time', 'While + past continuous, past continuous']],
    positive: ['It was raining when we left the house.', 'I was reading when the phone rang.', 'While she was waiting, she noticed a strange man.'],
    negative: ['I wasn’t listening, sorry.', 'They weren’t sleeping when I arrived.'],
    qa: [['What were you doing at ten last night?', 'I was watching a film.'], ['What happened while you were driving?', 'A deer ran across the road.']],
    mistakes: [['I was walk home.', 'I was walking home.', 'Use was/were + verb-ing.'], ['When I was arriving, they left.', 'When I arrived, they were leaving.', 'The short action uses the past simple.'], ['While I cooked, he was calling.', 'While I was cooking, he called.', 'The long action uses the past continuous; the short one the past simple.']],
    exercise: [
      { t: 'mc', q: 'I ___ a shower when the doorbell rang.', o: ['had', 'was having', 'have'], a: 1, e: 'Longer action in progress, interrupted by the doorbell.' },
      { t: 'mc', q: 'While we were walking in the park, it suddenly ___ to rain.', o: ['started', 'was starting'], a: 0, e: 'A sudden, short action uses the past simple.' },
      { t: 'fill', q: 'At nine o’clock yesterday, they ___ (watch) a match.', a: ['were watching'], e: 'Action in progress at a time in the past: were + watching.' },
      { t: 'fill', q: 'She ___ (not / listen) when the teacher explained it.', a: ['wasn\'t listening', 'was not listening'], e: 'Negative past continuous: wasn’t + verb-ing.' },
      { t: 'tf', q: 'In “I was cooking when he arrived”, the cooking started first.', a: true, e: 'The cooking was in progress; then he arrived and interrupted it.' },
      { t: 'type', q: 'Join with “when”: “I was driving.” + “I saw an accident.”', a: ['I was driving when I saw an accident.', 'When I was driving, I saw an accident.'], e: 'Long action (past continuous) + when + short action (past simple).' },
      { t: 'order', a: 'What were you doing when the lights went out?', e: 'Question in past continuous + when + past simple.' }
    ]
  },
  {
    id: 'b1-conditionals', level: 'B1', title: 'First and second conditionals', topic: 'Conditionals',
    use: 'We use the first conditional for real possibilities and the second conditional for imaginary or unlikely situations.',
    explain: [
      'First conditional: If + present simple, will + verb. It describes a real possibility in the future: If it rains, we will stay at home.',
      'Second conditional: If + past simple, would + verb. It describes an unreal or unlikely situation now or in the future: If I had more money, I would travel more.',
      'In the second conditional, we often use “were” for all persons: If I were you, I would accept the offer.',
      'You can start with either part. Use a comma when the sentence starts with “if”.',
      '“Unless” means “if not”: You won’t pass unless you study.'
    ],
    sk: 'Prvá podmienka (If + prítomný čas, will + sloveso) vyjadruje reálnu možnosť v budúcnosti. Druhá podmienka (If + minulý čas, would + sloveso) vyjadruje nereálnu alebo málo pravdepodobnú situáciu – zodpovedá slovenskému „keby…, tak by…“. Po „if“ nepoužívame „will“ ani „would“.',
    patterns: [['First conditional', 'If + present simple, will / won’t + verb'], ['Second conditional', 'If + past simple, would / wouldn’t + verb'], ['Advice', 'If I were you, I would…']],
    positive: ['If you study, you will pass the exam.', 'If I won the lottery, I would buy a house by the sea.', 'If I were you, I would talk to her.'],
    negative: ['If we don’t hurry, we will miss the bus.', 'I wouldn’t do that if I were you.'],
    qa: [['What will you do if it rains tomorrow?', 'I’ll go to the cinema.'], ['What would you do if you could live anywhere?', 'I would live in New Zealand.']],
    mistakes: [['If it will rain, I will stay home.', 'If it rains, I will stay home.', 'Do not use “will” after “if”.'], ['If I would have time, I would help.', 'If I had time, I would help.', 'Use the past simple after “if” in the second conditional.'], ['If I was you…', 'If I were you…', 'In advice, “If I were you” is the standard form.']],
    exercise: [
      { t: 'mc', q: 'If you heat ice, it ___ .', o: ['melts', 'would melt', 'melted'], a: 0, e: 'This is a fact (zero conditional): if + present, present.' },
      { t: 'mc', q: 'If I ___ a car, I would drive to work.', o: ['have', 'had', 'will have'], a: 1, e: 'Second conditional: if + past simple.' },
      { t: 'fill', q: 'If she calls, I ___ tell her the news. (real possibility)', a: ['will', '\'ll'], e: 'First conditional: if + present, will + verb.' },
      { t: 'fill', q: 'If I ___ you, I would accept the job.', a: ['were'], e: 'For advice we say “If I were you…”.' },
      { t: 'tf', q: '“If I won the lottery” means the speaker thinks winning is likely.', a: false, e: 'The second conditional shows that the situation is unlikely or imaginary.' },
      { t: 'type', q: 'Rewrite with “unless”: “If you don’t hurry, you will be late.”', a: ['Unless you hurry, you will be late.', 'You will be late unless you hurry.', 'Unless you hurry, you\'ll be late.', 'You\'ll be late unless you hurry.'], e: '“Unless” = “if not”, so the verb after it is positive.' },
      { t: 'order', a: 'What would you do if you lost your phone?', e: 'Question: What + would + you + verb + if + past simple.' }
    ]
  },
  {
    id: 'b1-relative', level: 'B1', title: 'Relative clauses', topic: 'Sentence structure',
    use: 'We use relative clauses to give more information about a person, thing or place.',
    explain: [
      'Use “who” for people, “which” for things and “where” for places. “That” can replace “who” or “which” in defining clauses.',
      'Defining clauses tell us which one we mean. No commas: The woman who lives next door is a nurse.',
      'Non-defining clauses add extra information. Use commas and do not use “that”: My brother, who lives in Prague, is a chef.',
      'Use “whose” for possession: That’s the man whose dog bit me.',
      'You can leave out who/which/that when it is the object: The book (that) I bought is great.'
    ],
    sk: 'Vedľajšie vzťažné vety pridávajú informáciu o osobe (who), veci (which) alebo mieste (where). „That“ môže nahradiť who/which iba v určujúcich vetách bez čiarok. Nedeterminujúce (doplňujúce) vety majú čiarky a nikdy v nich nepoužívame „that“. „Whose“ znamená „ktorého/ktorej“.',
    patterns: [['People', 'noun + who / that + clause'], ['Things', 'noun + which / that + clause'], ['Places', 'noun + where + subject + verb'], ['Possession', 'noun + whose + noun']],
    positive: ['A volunteer is a person who works without pay.', 'This is the café where we first met.', 'Lena, whose mother is Italian, speaks three languages.'],
    negative: ['I don’t like films that are too long.', 'He isn’t the man who called yesterday.'],
    qa: [['Who is Tom?', 'He’s the neighbour who helped us move.'], ['What is a library?', 'It’s a place where you can borrow books.']],
    mistakes: [['The man which lives here…', 'The man who lives here…', 'Use “who” for people.'], ['My car, that is old, broke down.', 'My car, which is old, broke down.', 'Do not use “that” with commas.'], ['The town where I was born in…', 'The town where I was born…', 'Do not add “in” after “where”.'], ['The girl who her bag was stolen…', 'The girl whose bag was stolen…', 'Use “whose” for possession.']],
    exercise: [
      { t: 'mc', q: 'That’s the restaurant ___ we had dinner last week.', o: ['which', 'where', 'who'], a: 1, e: 'A place + clause with its own subject → where.' },
      { t: 'mc', q: 'My grandmother, ___ is 90, still goes swimming.', o: ['that', 'who', 'which'], a: 1, e: 'A person in a non-defining clause (with commas) → who. Never “that”.' },
      { t: 'fill', q: 'I have a friend ___ father is a pilot.', a: ['whose'], e: 'Possession → whose.' },
      { t: 'fill', q: 'The phone ___ I bought last year is already broken.', a: ['that', 'which'], e: 'A thing → that / which (here you can also leave it out).' },
      { t: 'tf', q: '“The book, that I read last week, was boring.” is correct.', a: false, e: 'With commas (non-defining), we must use “which”, not “that”.' },
      { t: 'type', q: 'Join the sentences with “who”: “I met a woman. She speaks five languages.”', a: ['I met a woman who speaks five languages.', 'I met a woman that speaks five languages.'], e: '“Who” replaces “she” and joins the two ideas.' },
      { t: 'order', a: 'This is the town where my parents grew up.', e: 'Place + where + subject + verb.' }
    ]
  },
  {
    id: 'b1-phrasal', level: 'B1', title: 'Everyday phrasal verbs', topic: 'Verbs',
    use: 'Phrasal verbs are a verb + a small word (up, out, off…). Together they have a new meaning.',
    explain: [
      'A phrasal verb is a verb plus a particle: look after, find out, give up. The meaning is often different from the verb alone.',
      'Some phrasal verbs have no object: The plane took off. I woke up early.',
      'Separable phrasal verbs can have the object in the middle or at the end: Turn down the music. / Turn the music down.',
      'With a pronoun (it, them, her), the pronoun must go in the middle: Turn it down. (not “Turn down it”).',
      'Some phrasal verbs cannot be separated: look after, get on with, run out of: I look after my sister.',
      'Phrasal verbs are common in speaking. In formal writing, a single verb is often better: find out → discover, put off → postpone.'
    ],
    sk: 'Frázové slovesá sa skladajú zo slovesa a častice (up, out, off…) a majú často úplne iný význam ako samotné sloveso. Pri oddeliteľných frázových slovesách musí zámeno stáť v strede (turn it down). Niektoré sa oddeliť nedajú (look after somebody). Vo formálnom písaní ich často nahrádzame jedným slovesom.',
    patterns: [['No object', 'verb + particle (wake up, take off)'], ['Separable', 'turn down the music / turn the music down / turn it down'], ['Inseparable', 'look after + object / run out of + object']],
    positive: ['I need to find out the price.', 'Can you pick me up at six?', 'We ran out of coffee this morning.', 'They set up their own business.'],
    negative: ['Don’t give up!', 'I didn’t put it off; I did it on time.'],
    qa: [['Who looks after your dog when you travel?', 'My neighbour does.'], ['Did you turn the job down?', 'Yes, I turned it down.']],
    mistakes: [['Turn down it.', 'Turn it down.', 'With pronouns, put the pronoun in the middle.'], ['I look my sister after.', 'I look after my sister.', '“Look after” cannot be separated.'], ['We run out milk.', 'We have run out of milk.', 'The verb is “run out of”.']],
    exercise: [
      { t: 'match', pairs: [['give up', 'stop trying'], ['find out', 'discover information'], ['put off', 'delay'], ['look after', 'take care of']], e: 'These are common phrasal verbs and their meanings.' },
      { t: 'mc', q: 'The music is too loud. Can you ___?', o: ['turn down it', 'turn it down', 'turn it'], a: 1, e: 'With a pronoun, the pronoun goes in the middle: turn it down.' },
      { t: 'fill', q: 'We have run ___ ___ bread. Can you buy some?', a: ['out of'], e: 'The phrasal verb is “run out of”.' },
      { t: 'mc', q: 'Which is more formal?', o: ['We put off the meeting.', 'We postponed the meeting.'], a: 1, e: '“Postpone” is the formal single-word verb for “put off”.' },
      { t: 'tf', q: '“I get on with my colleagues” means I have a good relationship with them.', a: true, e: '“Get on with someone” means to have a friendly relationship.' },
      { t: 'type', q: 'Replace the pronoun: “I turned down the offer.” → I turned ___ down. (write the full sentence)', a: ['I turned it down.'], e: 'Pronoun in the middle: turned it down.' },
      { t: 'order', a: 'Can you look after my plants next week?', e: '“Look after” + object; it cannot be separated.' }
    ]
  },
  // ------------------------- B2 -------------------------
  {
    id: 'b2-passive', level: 'B2', title: 'The passive voice', topic: 'Verbs and tenses',
    use: 'We use the passive when the action is more important than the person who does it, or when we don’t know who does it.',
    explain: [
      'Form: be (in the correct tense) + past participle: The report is written. The report was written. The report has been written.',
      'Use the passive when the doer is unknown, obvious or not important: My bike was stolen. English is spoken here.',
      'The passive is common in formal, professional and scientific writing because it sounds objective.',
      'If you want to say who did the action, use “by”: The project was approved by the board.',
      'Passive with modal verbs: modal + be + past participle: The form must be signed. The meeting will be postponed.',
      'Impersonal passive in reports: It is said that… / It is believed that… / The company is reported to be…'
    ],
    sk: 'Trpný rod (be + 3. tvar slovesa) používame, keď je dôležitejší dej alebo výsledok ako ten, kto ho vykonal, alebo keď vykonávateľa nepoznáme. Je typický pre formálne a odborné texty. Vykonávateľa uvedieme pomocou „by“. Sloveso „be“ dáme do potrebného času.',
    patterns: [['Present', 'am / is / are + past participle'], ['Past', 'was / were + past participle'], ['Perfect', 'has / have been + past participle'], ['Modal', 'will / must / can + be + past participle']],
    positive: ['All applications are reviewed within two weeks.', 'The meeting has been moved to Thursday.', 'The new office was opened by the mayor.', 'Your feedback will be shared with the team.'],
    negative: ['The invoice hasn’t been paid yet.', 'Phones must not be used during the presentation.'],
    qa: [['When was the decision made?', 'It was made last Friday.'], ['Has the contract been signed?', 'Not yet. It will be signed tomorrow.']],
    mistakes: [['The email was send yesterday.', 'The email was sent yesterday.', 'Use the past participle: sent.'], ['The report has written.', 'The report has been written.', 'Perfect passive needs “been”.'], ['It must sign by the manager.', 'It must be signed by the manager.', 'Modal passive: must + be + past participle.']],
    exercise: [
      { t: 'mc', q: 'The products ___ in Germany.', o: ['make', 'are made', 'are making'], a: 1, e: 'Present simple passive: are + made.' },
      { t: 'fill', q: 'The new policy ___ (introduce) last month.', a: ['was introduced'], e: 'Past simple passive: was + past participle.' },
      { t: 'fill', q: 'The results ___ (just / publish).', a: ['have just been published'], e: 'Present perfect passive: have been + past participle; “just” goes after “have”.' },
      { t: 'type', q: 'Make it passive: “Someone cleans the office every day.”', a: ['The office is cleaned every day.'], e: 'The object (the office) becomes the subject. We don’t need “by someone”.' },
      { t: 'mc', q: 'This form ___ in black ink.', o: ['must complete', 'must be completed', 'must completed'], a: 1, e: 'The form cannot complete itself, so we need the passive: modal + be + past participle.' },
      { t: 'tf', q: 'The passive is often used in formal reports to sound objective.', a: true, e: 'The passive focuses on actions and results, which makes texts sound more objective.' },
      { t: 'order', a: 'The meeting will be held next Monday.', e: 'Future passive: will + be + past participle.' }
    ]
  },
  {
    id: 'b2-reported', level: 'B2', title: 'Reported speech', topic: 'Reporting',
    use: 'We use reported speech to say what another person said, without repeating their exact words.',
    explain: [
      'When the reporting verb is in the past (said, told), we usually move the tense one step back: “I am tired.” → She said she was tired.',
      'Tense changes: present simple → past simple; present continuous → past continuous; present perfect / past simple → past perfect; will → would; can → could.',
      'Change pronouns and time words: today → that day, tomorrow → the next day, yesterday → the day before, here → there.',
      '“Say” has no person after it: He said (that)… “Tell” needs a person: He told me (that)…',
      'Reported questions use normal word order and no question mark: “Where do you live?” → She asked where I lived. Yes/no questions use “if” or “whether”.',
      'Reported requests and orders: ask / tell + person + to + verb: She told me to wait.'
    ],
    sk: 'V nepriamej reči sa po minulom uvádzacom slovese (said, told) čas zvyčajne posúva o krok do minulosti (am → was, will → would). Menia sa aj zámená a časové výrazy (tomorrow → the next day). Po „say“ nepoužívame osobu, po „tell“ áno. Nepriame otázky majú poradie slov ako oznamovacia veta.',
    patterns: [['Statement', 'He said (that) + subject + verb (one tense back)'], ['Tell', 'She told + person + (that)…'], ['Question', 'He asked + if / question word + subject + verb'], ['Request', 'She asked / told + person + (not) to + verb']],
    positive: ['The spokesperson said that the company would open a new factory.', 'She told me she had seen the news.', 'He asked if I could help him.'],
    negative: ['They said they didn’t know about the problem.', 'The doctor told me not to worry.'],
    qa: [['What did the manager say?', 'She said the meeting was cancelled.'], ['What did he ask you?', 'He asked where I worked.']],
    mistakes: [['He said me that he was busy.', 'He told me that he was busy.', 'Use “tell” with a person.'], ['She asked where did I live.', 'She asked where I lived.', 'Reported questions use normal word order.'], ['He told to wait.', 'He told me to wait.', '“Tell” needs a person.'], ['She said she will come.', 'She said she would come.', 'will → would after a past reporting verb.']],
    exercise: [
      { t: 'mc', q: '“I am working from home.” → She said she ___ from home.', o: ['is working', 'was working', 'worked'], a: 1, e: 'Present continuous → past continuous.' },
      { t: 'mc', q: 'He ___ me that the train was late.', o: ['said', 'told', 'asked'], a: 1, e: '“Tell” is followed by a person (me).' },
      { t: 'fill', q: '“We will announce the results.” → They said they ___ announce the results.', a: ['would'], e: 'will → would.' },
      { t: 'type', q: 'Report the question: “Do you like your job?” → She asked me…', a: ['She asked me if I liked my job.', 'She asked me whether I liked my job.'], e: 'Yes/no question → if/whether + normal word order + past tense.' },
      { t: 'type', q: 'Report the order: “Close the door.” → He told me…', a: ['He told me to close the door.'], e: 'Order → told + person + to + verb.' },
      { t: 'tf', q: 'In reported speech, “tomorrow” often changes to “the next day”.', a: true, e: 'Time words change because the time of reporting is different.' },
      { t: 'order', a: 'She asked where the meeting was.', e: 'Reported question: asked + question word + subject + verb (no inversion).' }
    ]
  },
  {
    id: 'b2-conditionals', level: 'B2', title: 'Third and mixed conditionals', topic: 'Conditionals',
    use: 'We use the third conditional to imagine a different past. Mixed conditionals connect the past and the present.',
    explain: [
      'Third conditional: If + past perfect, would have + past participle. It is about an imaginary past situation and its imaginary result: If I had left earlier, I wouldn’t have missed the train.',
      'It often expresses regret or criticism. The real situation is the opposite: I didn’t leave early, so I missed the train.',
      'You can use “could have” or “might have” instead of “would have” for possibility: If we had known, we could have helped.',
      'Mixed conditional (past → present): If + past perfect, would + verb: If I had studied medicine, I would be a doctor now.',
      'Mixed conditional (present → past): If + past simple, would have + past participle: If I spoke Spanish, I would have understood the guide.'
    ],
    sk: 'Tretia podmienka (If + predminulý čas, would have + 3. tvar) opisuje nereálnu minulosť – niečo, čo sa nestalo, a jeho nereálny výsledok („keby som bol býval…, bol by som…“). Často vyjadruje ľútosť. Zmiešané podmienky spájajú minulú príčinu s prítomným výsledkom alebo naopak.',
    patterns: [['Third', 'If + had + past participle, would have + past participle'], ['Possibility', '…could have / might have + past participle'], ['Mixed (past → now)', 'If + had + past participle, would + verb (now)'], ['Mixed (now → past)', 'If + past simple, would have + past participle']],
    positive: ['If I had taken the job, I would have moved to Berlin.', 'If she had asked me, I could have helped her.', 'If I had saved more money, I would be on holiday now.'],
    negative: ['If it hadn’t rained, we wouldn’t have cancelled the trip.', 'If I weren’t so shy, I would have spoken to her.'],
    qa: [['What would you have done if you hadn’t gone to university?', 'I would have started working earlier.'], ['Would you be happier now if you had stayed in your hometown?', 'Maybe, but I would have fewer opportunities.']],
    mistakes: [['If I would have known, I would have come.', 'If I had known, I would have come.', 'Do not use “would” in the if-clause.'], ['If I had studied, I would pass.', 'If I had studied, I would have passed.', 'For a past result, use “would have + past participle”.'], ['If I knew it yesterday…', 'If I had known it yesterday…', 'For the past, use the past perfect.']],
    exercise: [
      { t: 'mc', q: 'If we ___ the map, we wouldn’t have got lost.', o: ['checked', 'had checked', 'would check'], a: 1, e: 'Third conditional: if + past perfect.' },
      { t: 'fill', q: 'If you had told me, I ___ ___ ___ you. (help)', a: ['would have helped', 'could have helped'], e: 'Result in the past: would have + past participle.' },
      { t: 'mc', q: 'If I had accepted that job, I ___ in London now.', o: ['would live', 'would have lived', 'lived'], a: 0, e: 'Mixed conditional: past cause → present result (now).' },
      { t: 'tf', q: '“If she had studied harder, she would have passed” means she passed.', a: false, e: 'The real situation is the opposite: she didn’t study hard and didn’t pass.' },
      { t: 'type', q: 'Write a third conditional: “I didn’t know about the party, so I didn’t go.”', a: ['If I had known about the party, I would have gone.', 'If I\'d known about the party, I would have gone.', 'If I had known about the party, I would have gone to it.', 'I would have gone if I had known about the party.'], e: 'Change both parts to the opposite and use had + known / would have + gone.' },
      { t: 'order', a: 'She might have won if she hadn\'t fallen.', e: 'might have + past participle + if + past perfect (negative).' },
      { t: 'match', pairs: [['If I had left earlier,', 'I would have caught the bus.'], ['If I had studied law,', 'I would be a lawyer now.'], ['If I were more organised,', 'I wouldn’t have forgotten the meeting.']], e: 'Third conditional; mixed past → present; mixed present → past.' }
    ]
  },
  {
    id: 'b2-linking', level: 'B2', title: 'Linking words: contrast and addition', topic: 'Sentence structure',
    use: 'Linking words connect ideas and make your arguments clear and logical.',
    explain: [
      'Although / even though + clause (subject + verb): Although it was expensive, we bought it.',
      'Despite / in spite of + noun or -ing form: Despite the cost, we bought it. Despite being tired, she continued.',
      'However and nevertheless start a new sentence (or follow a semicolon) and are followed by a comma: It was cheap. However, the quality was poor.',
      'Whereas and while compare two different facts: Some people prefer cities, whereas others prefer the countryside.',
      'To add ideas: furthermore, moreover, in addition, what is more.',
      'To give results: therefore, as a result, consequently.'
    ],
    sk: 'Spojovacie výrazy robia argumentáciu prehľadnou. „Although“ (hoci) nasleduje veta s podmetom a slovesom; „despite / in spite of“ (napriek) nasleduje podstatné meno alebo tvar -ing. „However“ (avšak) a „nevertheless“ (napriek tomu) stoja zvyčajne na začiatku novej vety s čiarkou. „Whereas“ (zatiaľ čo) porovnáva dva rozdielne fakty.',
    patterns: [['Contrast + clause', 'Although / Even though + subject + verb, …'], ['Contrast + noun', 'Despite / In spite of + noun / verb-ing, …'], ['New sentence', '… . However, / Nevertheless, …'], ['Addition / result', 'Furthermore, / Moreover, / Therefore, …']],
    positive: ['Although the plan is risky, it could be very successful.', 'Despite the rain, the match continued.', 'Cars are convenient. However, they pollute the air.'],
    negative: ['Even though he didn’t have experience, he got the job.', 'In spite of not knowing anyone, she enjoyed the party.'],
    qa: [['What is the main drawback?', 'The cost. Nevertheless, the benefits are clear.'], ['How do the two cities compare?', 'Vienna is expensive, whereas Brno is more affordable.']],
    mistakes: [['Despite it was cold, we swam.', 'Although it was cold, we swam. / Despite the cold, we swam.', '“Despite” is not followed by a clause.'], ['Although of the rain…', 'Despite the rain… / Although it was raining…', '“Although” is followed by subject + verb.'], ['It was late, however we continued.', 'It was late. However, we continued.', 'Use a full stop or semicolon before “however”.'], ['In spite the cost…', 'In spite of the cost…', 'Do not forget “of”.']],
    exercise: [
      { t: 'mc', q: '___ the bad weather, the event was a success.', o: ['Although', 'Despite', 'However'], a: 1, e: '“The bad weather” is a noun phrase, so use “despite”.' },
      { t: 'mc', q: '___ she was nervous, she gave an excellent speech.', o: ['Despite', 'Although', 'In spite of'], a: 1, e: '“She was nervous” is a clause (subject + verb), so use “although”.' },
      { t: 'fill', q: 'The idea is interesting. ___, it is too expensive. (contrast, new sentence)', a: ['However', 'Nevertheless'], e: '“However” / “Nevertheless” start a new sentence and introduce contrast.' },
      { t: 'mc', q: 'My brother loves football, ___ I prefer tennis.', o: ['whereas', 'despite', 'furthermore'], a: 0, e: '“Whereas” compares two different facts.' },
      { t: 'type', q: 'Rewrite with “despite”: “Although he was tired, he finished the race.”', a: ['Despite being tired, he finished the race.', 'Despite his tiredness, he finished the race.', 'He finished the race despite being tired.'], e: 'Despite + verb-ing (being) or a noun (his tiredness).' },
      { t: 'tf', q: '“Furthermore” is used to add another point.', a: true, e: '“Furthermore”, “moreover” and “in addition” add points.' },
      { t: 'order', a: 'In spite of the cost, many people support the project.', e: 'In spite of + noun phrase, + main clause.' }
    ]
  },
  {
    id: 'b2-gerund-infinitive', level: 'B2', title: 'Gerunds and infinitives', topic: 'Verbs',
    use: 'Some verbs are followed by the -ing form (gerund), others by “to + verb” (infinitive). Some change meaning.',
    explain: [
      'Verb + -ing: enjoy, avoid, finish, suggest, mind, consider, keep, can’t stand: I enjoy reading. She avoided answering.',
      'Verb + to + verb: want, decide, hope, plan, refuse, manage, agree, promise, afford: We decided to leave.',
      'After prepositions, always use -ing: I’m interested in learning. She is good at solving problems.',
      'Use -ing as the subject of a sentence: Swimming is good exercise.',
      'Some verbs change meaning: remember / forget / stop / try. “I stopped smoking” (I don’t smoke now). “I stopped to smoke” (I stopped another activity in order to smoke).',
      '“Remember doing” = a memory of the past. “Remember to do” = don’t forget a task.'
    ],
    sk: 'Po niektorých slovesách nasleduje tvar -ing (enjoy, avoid, finish, suggest), po iných „to + sloveso“ (want, decide, hope, refuse). Po predložkách vždy používame -ing (interested in learning). Slovesá stop, remember, forget a try menia význam podľa toho, či po nich nasleduje -ing alebo „to“.',
    patterns: [['Verb + -ing', 'enjoy / avoid / finish / suggest + verb-ing'], ['Verb + to', 'want / decide / hope / refuse + to + verb'], ['Preposition + -ing', 'interested in / good at / tired of + verb-ing'], ['Meaning change', 'stop doing ≠ stop to do; remember doing ≠ remember to do']],
    positive: ['I can’t afford to buy a new laptop.', 'She suggested meeting earlier.', 'Breaking a habit takes time.', 'Remember to lock the door.'],
    negative: ['He refused to pay attention.', 'I don’t mind waiting.'],
    qa: [['What do you enjoy doing at weekends?', 'I enjoy hiking.'], ['Did you remember to call your mum?', 'Oh no, I forgot to call her!']],
    mistakes: [['I enjoy to cook.', 'I enjoy cooking.', '“Enjoy” is followed by -ing.'], ['I decided going.', 'I decided to go.', '“Decide” is followed by “to + verb”.'], ['I’m interested in learn.', 'I’m interested in learning.', 'After a preposition, use -ing.'], ['I look forward to see you.', 'I look forward to seeing you.', 'In “look forward to”, “to” is a preposition, so use -ing.']],
    exercise: [
      { t: 'mc', q: 'Have you finished ___ the report?', o: ['to write', 'writing', 'write'], a: 1, e: '“Finish” is followed by -ing.' },
      { t: 'mc', q: 'We managed ___ the deadline.', o: ['meeting', 'to meet', 'meet'], a: 1, e: '“Manage” is followed by “to + verb”.' },
      { t: 'fill', q: 'She is very good at ___ (solve) problems.', a: ['solving'], e: 'After a preposition (at), use -ing.' },
      { t: 'mc', q: 'He stopped ___ a coffee on the way to work. (He paused his journey in order to get coffee.)', o: ['buying', 'to buy'], a: 1, e: '“Stop to do” = stop one activity in order to do another.' },
      { t: 'tf', q: '“I remember locking the door” means I have a memory of doing it.', a: true, e: '“Remember + -ing” refers to a memory of a past action.' },
      { t: 'type', q: 'Correct the mistake: “I look forward to hear from you.”', a: ['I look forward to hearing from you.'], e: '“To” here is a preposition, so it is followed by -ing.' },
      { t: 'match', pairs: [['avoid', 'making mistakes'], ['refuse', 'to answer'], ['be tired of', 'waiting'], ['hope', 'to see you soon']], e: 'avoid + -ing; refuse + to; preposition + -ing; hope + to.' }
    ]
  },
  {
    id: 'b2-modal-perfect', level: 'B2', title: 'Modals of deduction and past modals', topic: 'Modal verbs',
    use: 'We use modal verbs to guess about the present and the past, and to criticise past actions.',
    explain: [
      'Present deduction: must (I’m sure it’s true), might / could / may (perhaps), can’t (I’m sure it’s not true): She must be at home; the lights are on.',
      'Past deduction: modal + have + past participle: He must have forgotten. They might have missed the bus. She can’t have seen us.',
      '“Should have + past participle” criticises or expresses regret about the past: You should have told me earlier.',
      '“Needn’t have + past participle” means you did something that was not necessary: You needn’t have brought a gift.',
      'In speech, “have” is often weak: “must’ve”, “should’ve”. Never write “must of”.'
    ],
    sk: 'Modálne slovesá používame aj na dedukciu: „must“ (určite), „might/could/may“ (možno), „can’t“ (určite nie). O minulosti hovoríme pomocou modálneho slovesa + have + 3. tvar (He must have forgotten = Určite zabudol). „Should have done“ vyjadruje výčitku alebo ľútosť (mal si to urobiť).',
    patterns: [['Present', 'must / might / could / can’t + be / verb'], ['Past', 'must / might / could / can’t + have + past participle'], ['Criticism / regret', 'should / shouldn’t have + past participle']],
    positive: ['The package must have been delivered to the wrong address.', 'She might have taken the earlier train.', 'You should have called the customer service line.'],
    negative: ['He can’t have received my email; he hasn’t replied.', 'We shouldn’t have left so late.'],
    qa: [['Why isn’t Peter here?', 'He might have overslept.'], ['Where are my keys?', 'You must have left them in the car.']],
    mistakes: [['He must forgot.', 'He must have forgotten.', 'Past deduction: must + have + past participle.'], ['You should of told me.', 'You should have told me.', '“Of” only sounds like “have”.'], ['She mustn’t have seen us.', 'She can’t have seen us.', 'For a negative deduction, use “can’t have”.']],
    exercise: [
      { t: 'mc', q: 'The ground is wet. It ___ rained last night.', o: ['must have', 'can’t have', 'should have'], a: 0, e: 'We are sure, based on evidence: must have.' },
      { t: 'mc', q: 'She ___ written this letter — it’s full of mistakes, and she’s a perfect writer.', o: ['must have', 'can’t have', 'should have'], a: 1, e: 'We are sure it is not true: can’t have.' },
      { t: 'fill', q: 'You ___ have told me about the meeting! Now I’m late. (criticism)', a: ['should'], e: 'Criticism of a past action: should have + past participle.' },
      { t: 'type', q: 'Rewrite with “might have”: “Perhaps they missed the bus.”', a: ['They might have missed the bus.'], e: 'Possibility in the past: might + have + past participle.' },
      { t: 'tf', q: '“You should of asked” is correct written English.', a: false, e: 'The correct form is “should have” (spoken: should’ve).' },
      { t: 'mc', q: 'I bought tickets, but entrance was free. I ___ bought them.', o: ['needn’t have', 'mustn’t have', 'can’t have'], a: 0, e: 'An unnecessary past action: needn’t have + past participle.' },
      { t: 'order', a: 'He must have forgotten our appointment.', e: 'must + have + past participle.' }
    ]
  }
);
