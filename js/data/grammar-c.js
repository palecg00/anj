/* LinguaPath — grammar topics C1. */
window.LP = window.LP || {};
LP.GRAMMAR = LP.GRAMMAR || [];

LP.GRAMMAR.push(
  {
    id: 'c1-hedging', level: 'C1', title: 'Hedging and softening language', topic: 'Style and register',
    use: 'We use hedging to make claims more careful and polite, and to show that we are not 100% certain.',
    explain: [
      'Hedging makes statements less absolute. It is important in academic writing, discussions and diplomacy.',
      'Modal verbs: may, might, could, would: This may suggest that… It could be argued that…',
      'Verbs: seem, appear, tend to, suggest, indicate: The results appear to show… People tend to…',
      'Adverbs and adjectives: arguably, possibly, probably, apparently, likely, unlikely: It is likely that…',
      'Limiting phrases: to some extent, in some cases, broadly speaking, on the whole.',
      'Softening disagreement: I’m not entirely sure that… / I see your point, but… / Wouldn’t it be better to…?',
      'Do not over-hedge. Too many hedges make your opinion unclear.'
    ],
    sk: 'Zmierňovanie (hedging) robí tvrdenia opatrnejšími a zdvorilejšími. Používame modálne slovesá (may, might, could), slovesá ako seem, appear, tend to, príslovky (arguably, possibly) a obmedzujúce frázy (to some extent). Je dôležité v akademickom písaní aj v diskusii, ale nesmieme to preháňať.',
    patterns: [['Modal hedge', 'It may / might / could be the case that…'], ['Verb hedge', 'subject + seem(s) / appear(s) / tend(s) + to + verb'], ['Impersonal', 'It could be argued that… / It is likely that…'], ['Softened disagreement', 'I’m not entirely convinced that… / I see your point, but…']],
    positive: ['The data seems to indicate a slight improvement.', 'It could be argued that remote work increases productivity.', 'To some extent, the policy has been successful.'],
    negative: ['I’m not entirely convinced that this is the best approach.', 'It is unlikely that prices will fall in the near future.'],
    qa: [['Is social media bad for teenagers?', 'It can be, to some extent, but the evidence is mixed.'], ['Will the plan work?', 'It might, provided that we get enough funding.']],
    mistakes: [['This proves that all students are lazy.', 'This may suggest that some students are less motivated.', 'Avoid absolute claims without strong evidence.'], ['It is maybe possibly true.', 'It is possibly true.', 'Do not stack several hedges.'], ['You are wrong.', 'I’m not sure I agree with that.', 'In discussion, soften direct disagreement.']],
    exercise: [
      { t: 'mc', q: 'Which sentence is the most appropriately hedged for an academic essay?', o: ['Social media destroys concentration.', 'Social media may reduce concentration in some users.', 'Social media maybe possibly could reduce concentration.'], a: 1, e: 'It is careful but still clear. The third option over-hedges.' },
      { t: 'fill', q: 'The results ___ to suggest that sleep affects memory. (verb meaning “seem”)', a: ['appear', 'seem'], e: '“The results appear/seem to suggest…” is a common hedge.' },
      { t: 'mc', q: 'Choose the softest way to disagree.', o: ['That’s nonsense.', 'I disagree.', 'I see your point, but I’m not entirely convinced.'], a: 2, e: 'Acknowledging the other view first and using “not entirely” softens disagreement.' },
      { t: 'type', q: 'Hedge this claim using “It could be argued that”: “Cities are better places to live.”', a: ['It could be argued that cities are better places to live.'], e: 'The impersonal phrase makes the claim less absolute.' },
      { t: 'tf', q: 'Using many hedges in every sentence makes writing clearer.', a: false, e: 'Over-hedging makes your position vague. Use hedges where certainty is really limited.' },
      { t: 'match', pairs: [['tend to', 'usually do something'], ['to some extent', 'partly'], ['arguably', 'it can be supported with reasons'], ['broadly speaking', 'in general']], e: 'These hedges each limit a claim in a different way.' },
      { t: 'order', a: 'People tend to overestimate their abilities.', e: 'subject + tend to + verb.' }
    ]
  },
  {
    id: 'c1-inversion', level: 'C1', title: 'Inversion for emphasis', topic: 'Sentence structure',
    use: 'After some negative or limiting adverbials at the start of a sentence, we use question word order to add emphasis.',
    explain: [
      'When a sentence begins with a negative or restrictive expression, the auxiliary verb comes before the subject (like in a question).',
      'Common expressions: Never (before), Rarely, Seldom, Hardly … when, No sooner … than, Not only … but also, Under no circumstances, Only then, Little.',
      'Example: I have never seen such chaos. → Never have I seen such chaos.',
      'If there is no auxiliary, add do / does / did: Rarely does he complain. Not only did she win, but she also broke the record.',
      'Inversion is formal and dramatic. It is used in speeches, formal writing and storytelling, not in everyday chat.',
      'Conditional inversion (formal): Had I known… (= If I had known), Should you need help… (= If you need help), Were it not for… (= If it were not for).'
    ],
    sk: 'Inverzia (výmena poradia podmetu a pomocného slovesa ako v otázke) sa používa po záporných alebo obmedzujúcich výrazoch na začiatku vety (Never, Rarely, Not only, No sooner, Under no circumstances). Pôsobí formálne a dôrazne. Ak veta nemá pomocné sloveso, doplníme do/does/did. Formálne podmienky: Had I known = If I had known.',
    patterns: [['Negative adverbial', 'Never / Rarely / Seldom + auxiliary + subject + verb'], ['Not only', 'Not only + auxiliary + subject + verb, but … also …'], ['No sooner', 'No sooner had + subject + past participle + than …'], ['Conditional', 'Had + subject + past participle… / Should + subject + verb…']],
    positive: ['Never have I seen such a beautiful sunset.', 'Not only did he apologise, but he also offered compensation.', 'No sooner had we arrived than it started to rain.', 'Had I known about the problem, I would have acted.'],
    negative: ['Under no circumstances should you share your password.', 'At no point did the company admit any fault.'],
    qa: [['How rare is it?', 'Rarely does a chance like this come along.'], ['What happened when you got home?', 'Hardly had I opened the door when the phone rang.']],
    mistakes: [['Never I have seen this.', 'Never have I seen this.', 'After “never” at the start, invert the auxiliary and subject.'], ['Not only she sings, but…', 'Not only does she sing, but…', 'Add “does” when there is no auxiliary.'], ['No sooner had we left when…', 'No sooner had we left than…', '“No sooner” goes with “than”.'], ['If had I known…', 'Had I known…', 'In conditional inversion, remove “if”.']],
    exercise: [
      { t: 'mc', q: 'Rarely ___ such a talented student.', o: ['I have met', 'have I met', 'I met'], a: 1, e: 'After “Rarely” at the start, invert: have I met.' },
      { t: 'mc', q: 'No sooner had the meeting started ___ the fire alarm went off.', o: ['when', 'than', 'that'], a: 1, e: '“No sooner … than” is a fixed pair.' },
      { t: 'fill', q: 'Not only ___ she speak French, but she also speaks Japanese.', a: ['does'], e: 'No auxiliary in “she speaks”, so we add “does”.' },
      { t: 'type', q: 'Rewrite with inversion: “If I had known, I would have called.” → Had…', a: ['Had I known, I would have called.'], e: 'Conditional inversion: remove “if” and put “had” before the subject.' },
      { t: 'type', q: 'Rewrite: “You should not open this door under any circumstances.” → Under no circumstances…', a: ['Under no circumstances should you open this door.'], e: 'Negative adverbial + should + subject + verb.' },
      { t: 'tf', q: 'Inversion is typical of relaxed, informal conversation.', a: false, e: 'It is formal or dramatic and is used for emphasis.' },
      { t: 'order', a: 'Seldom do we see such commitment.', e: 'Seldom + do + subject + base verb.' }
    ]
  },
  {
    id: 'c1-cleft', level: 'C1', title: 'Cleft sentences', topic: 'Sentence structure',
    use: 'Cleft sentences split one idea into two parts to focus attention on the most important information.',
    explain: [
      '“It” clefts focus on one element: It was Maria who solved the problem (not someone else).',
      'Structure: It + be + focused element + who/that + rest of the sentence.',
      '“What” clefts (pseudo-clefts) focus on the action or the information at the end: What we need is more time. What surprised me was his tone.',
      'Use “All” to mean “the only thing”: All I want is some peace and quiet.',
      'Other patterns: The reason why… is that… / The thing that… is… / The place where…',
      'Cleft sentences are useful for correcting someone, contrasting ideas and adding emphasis in speaking and writing.'
    ],
    sk: 'Vytýčené vety (cleft sentences) rozdelia jednu myšlienku na dve časti, aby sme zdôraznili kľúčovú informáciu. „It was Maria who…“ = Práve Mária… „What we need is…“ = To, čo potrebujeme, je… Často ich používame pri opravovaní, kontraste a zdôrazňovaní.',
    patterns: [['It-cleft', 'It is / was + focus + who / that + clause'], ['What-cleft', 'What + subject + verb + is / was + focus'], ['All-cleft', 'All + subject + verb + is / was + focus'], ['Reason', 'The reason (why) … is that …']],
    positive: ['It was the tone of the email that upset her, not the content.', 'What I appreciate most is your honesty.', 'All we need is a clear plan.', 'The reason I called is that I need your advice.'],
    negative: ['It wasn’t the price that worried me; it was the quality.', 'What I don’t understand is why nobody told us.'],
    qa: [['Did John send the email?', 'No, it was Kate who sent it.'], ['Why are you upset?', 'What upsets me is the lack of communication.']],
    mistakes: [['What I need it is a holiday.', 'What I need is a holiday.', 'Do not add an extra “it”.'], ['It was in 2010 when I met him.', 'It was in 2010 that I met him.', 'In it-clefts, “that” is more natural after a time.'], ['All what I want is…', 'All I want is…', 'Do not use “what” after “all”.']],
    exercise: [
      { t: 'mc', q: 'Focus on “the manager”: “The manager made the decision.”', o: ['It was the manager who made the decision.', 'What the manager was made the decision.', 'The decision it was the manager.'], a: 0, e: 'It + was + focus (the manager) + who + rest.' },
      { t: 'fill', q: '___ I really need right now is a cup of coffee.', a: ['What', 'All'], e: 'What-cleft: What + subject + verb + is…' },
      { t: 'type', q: 'Rewrite to focus on “his attitude”: “His attitude annoyed me.” → What…', a: ['What annoyed me was his attitude.'], e: 'What + verb + was + focus.' },
      { t: 'tf', q: '“All what we want is peace.” is correct.', a: false, e: 'The correct form is “All we want is peace.”' },
      { t: 'mc', q: '___ I’m calling is to confirm the booking.', o: ['The reason', 'What reason', 'It reason'], a: 0, e: '“The reason (that/why) I’m calling is…” is a common cleft structure.' },
      { t: 'order', a: 'It was in Vienna that we first met.', e: 'It + was + time/place focus + that + clause.' },
      { t: 'match', pairs: [['It was Tom', 'who called.'], ['What matters', 'is the result.'], ['All I ask', 'is a little patience.']], e: 'It-cleft + who; what-cleft + is; all-cleft + is.' }
    ]
  },
  {
    id: 'c1-nominalisation', level: 'C1', title: 'Nominalisation in academic English', topic: 'Style and register',
    use: 'Nominalisation means turning verbs and adjectives into nouns. It makes writing more formal, concise and objective.',
    explain: [
      'Academic and formal English often uses nouns where spoken English uses verbs: “Prices increased quickly” → “There was a rapid increase in prices.”',
      'Common patterns: decide → decision, analyse → analysis, fail → failure, grow → growth, able → ability, important → importance.',
      'Adverbs often become adjectives: increased rapidly → a rapid increase; significantly reduced → a significant reduction.',
      'Nominalisation allows more information in one noun phrase: “the government’s decision to reduce funding for public libraries”.',
      'It also removes the person doing the action, which makes texts sound more objective.',
      'Do not overuse it. Too many abstract nouns can make writing heavy and hard to read.'
    ],
    sk: 'Nominalizácia znamená premenu slovies a prídavných mien na podstatné mená (decide → decision, grow → growth). Akademické texty tak pôsobia formálnejšie, stručnejšie a objektívnejšie. Príslovky sa pritom menia na prídavné mená (rapidly → rapid). Netreba to však preháňať.',
    patterns: [['Verb → noun', 'analyse → analysis, reduce → reduction, fail → failure'], ['Adverb → adjective', 'increase rapidly → a rapid increase'], ['Noun phrase', 'the + noun + of / in + noun']],
    positive: ['The rapid growth of cities has led to a rise in temperatures.', 'The introduction of green roofs resulted in a significant reduction in heat.', 'There is a strong correlation between income and access to green space.'],
    negative: ['The failure of the project was not due to a lack of funding.', 'The absence of trees contributes to the problem.'],
    qa: [['How would you write “We analysed the data carefully” formally?', 'A careful analysis of the data was carried out.'], ['Formal version of “Temperatures rose a lot”?', 'There was a significant rise in temperatures.']],
    mistakes: [['There was a rapidly increase.', 'There was a rapid increase.', 'Use an adjective before a noun.'], ['The analyse of data…', 'The analysis of the data…', 'The noun form is “analysis”.'], ['The implementation of the utilisation of the reduction…', 'Reducing use…', 'Too many nominalisations make text unreadable.']],
    exercise: [
      { t: 'match', pairs: [['decide', 'decision'], ['grow', 'growth'], ['fail', 'failure'], ['able', 'ability']], e: 'These are the noun forms of common verbs and adjectives.' },
      { t: 'mc', q: 'Choose the nominalised version: “The city expanded quickly.”', o: ['The city’s rapid expansion', 'The city expanding quick', 'The quickly expansion of the city'], a: 0, e: 'Verb → noun (expansion), adverb → adjective (rapid).' },
      { t: 'fill', q: 'Prices rose sharply. → There was a sharp ___ in prices.', a: ['rise', 'increase'], e: 'The noun “rise” (or “increase”) replaces the verb.' },
      { t: 'type', q: 'Write the noun form of “analyse”.', a: ['analysis'], e: 'analyse (verb) → analysis (noun).' },
      { t: 'tf', q: 'Nominalisation usually makes a text more formal and objective.', a: true, e: 'It focuses on processes and results rather than people.' },
      { t: 'mc', q: 'Which sentence is the most academic in style?', o: ['People cut down lots of trees, so it got hotter.', 'Deforestation has contributed to rising temperatures.', 'Because people cut trees, it is hot.'], a: 1, e: 'Nominalisation (deforestation) and formal verbs (contributed to) are typical of academic style.' },
      { t: 'order', a: 'The reduction of green space has serious consequences.', e: 'Noun phrase subject (the reduction of…) + verb + object.' }
    ]
  },
  {
    id: 'c1-participle', level: 'C1', title: 'Participle clauses', topic: 'Sentence structure',
    use: 'Participle clauses use -ing or -ed forms to give information in a short, elegant way.',
    explain: [
      'Present participle (-ing) for active meaning: Feeling nervous, she began her presentation. (= Because she felt nervous…)',
      'Past participle (-ed / third form) for passive meaning: Designed in 1920, the building is still modern. (= It was designed…)',
      'Perfect participle (having + past participle) for an action that happened before: Having finished the slides, he rehearsed the talk.',
      'Participle clauses can replace relative clauses: People waiting for the bus… (= who are waiting).',
      'The subject of the participle clause must be the same as the subject of the main clause. Wrong: “Walking into the room, the lights went off.” (The lights did not walk!)',
      'They are common in formal writing, presentations and reports.'
    ],
    sk: 'Príčastné vety (participle clauses) skracujú vedľajšie vety. Tvar -ing má činný význam (Feeling nervous = pretože bola nervózna), 3. tvar slovesa má trpný význam (Designed in 1920 = bol navrhnutý). „Having + 3. tvar“ vyjadruje predčasnosť. Podmet príčastnej vety musí byť rovnaký ako podmet hlavnej vety.',
    patterns: [['Active', 'Verb-ing …, main clause'], ['Passive', 'Past participle …, main clause'], ['Earlier action', 'Having + past participle …, main clause'], ['Reduced relative', 'noun + verb-ing / past participle']],
    positive: ['Having outlined the problem, the speaker presented three solutions.', 'Built in the 14th century, the castle attracts thousands of visitors.', 'Speakers using clear visuals tend to engage the audience more.'],
    negative: ['Not knowing what to say, he remained silent.', 'Never having presented before, she felt anxious.'],
    qa: [['How can I shorten “After I had finished the report, I sent it”?', 'Having finished the report, I sent it.'], ['How can I shorten “The data that was collected in 2020 shows…”?', 'The data collected in 2020 shows…']],
    mistakes: [['Walking home, the rain started.', 'Walking home, I got caught in the rain.', 'The subject must be the same in both parts.'], ['Having finish the talk…', 'Having finished the talk…', 'Use the past participle after “having”.'], ['Writing in 1850, the novel is still popular.', 'Written in 1850, the novel is still popular.', 'The novel was written (passive), so use the past participle.']],
    exercise: [
      { t: 'mc', q: '___ in 1889, the Eiffel Tower is a symbol of Paris.', o: ['Completing', 'Completed', 'Having completing'], a: 1, e: 'The tower was completed (passive) → past participle.' },
      { t: 'mc', q: '___ the report, she sent it to her manager.', o: ['Having written', 'Written', 'Write'], a: 0, e: 'She wrote it first, then sent it → having + past participle.' },
      { t: 'fill', q: '___ (not / know) the answer, he asked a colleague.', a: ['Not knowing'], e: 'Negative participle: not + verb-ing.' },
      { t: 'tf', q: '“Walking into the office, the phone rang.” is correct.', a: false, e: 'This says the phone was walking. The subject must match: “Walking into the office, I heard the phone ring.”' },
      { t: 'type', q: 'Shorten with a participle: “People who live in cities often feel stressed.”', a: ['People living in cities often feel stressed.'], e: 'Active relative clause → -ing participle.' },
      { t: 'order', a: 'Feeling confident, she walked onto the stage.', e: 'Participle clause, + main clause with the same subject.' },
      { t: 'mc', q: 'The slides ___ by our team are on the shared drive.', o: ['prepared', 'preparing', 'having prepared'], a: 0, e: 'The slides were prepared (passive) → past participle.' }
    ]
  },
  {
    id: 'c1-wish', level: 'C1', title: 'Wish, if only, would rather, it’s time', topic: 'Unreal past',
    use: 'We use past forms after wish, if only, would rather and it’s time to talk about unreal situations and preferences.',
    explain: [
      'Wish / if only + past simple: a wish about the present: I wish I had more time. (I don’t have enough time.)',
      'Wish / if only + past perfect: a regret about the past: I wish I hadn’t said that.',
      'Wish + would: annoyance about someone’s behaviour or a wish for change: I wish you would stop interrupting.',
      'Would rather + subject + past simple: a preference about someone else’s action: I’d rather you didn’t smoke here.',
      'It’s (high) time + subject + past simple: something should already be happening: It’s time we left. It’s high time they fixed the road.',
      'These structures often carry implied meaning: “I’d rather you didn’t” is a polite way of saying “Please don’t.”'
    ],
    sk: 'Po „wish“, „if only“, „would rather“ a „it’s time“ používame minulé tvary na vyjadrenie nereálnych situácií. Wish + minulý čas = želanie o prítomnosti; wish + predminulý čas = ľútosť o minulosti; wish + would = podráždenie zo správania niekoho. „I’d rather you didn’t“ je zdvorilý zákaz. „It’s time we left“ = už by sme mali ísť.',
    patterns: [['Present wish', 'wish / if only + past simple'], ['Past regret', 'wish / if only + past perfect'], ['Annoyance', 'wish + person + would + verb'], ['Preference', 'would rather + person + past simple'], ['Overdue', 'it’s (high) time + subject + past simple']],
    positive: ['I wish I spoke Japanese.', 'If only we had left earlier!', 'I’d rather you called me instead of emailing.', 'It’s high time we changed our strategy.'],
    negative: ['I wish I hadn’t sent that email.', 'I’d rather you didn’t mention it to anyone.'],
    qa: [['Do you like your job?', 'It’s fine, but I wish it paid better.'], ['Shall I tell her?', 'I’d rather you didn’t, actually.']],
    mistakes: [['I wish I have a car.', 'I wish I had a car.', 'Use a past form for a present wish.'], ['I wish I didn’t say that yesterday.', 'I wish I hadn’t said that yesterday.', 'Use the past perfect for a past regret.'], ['It’s time we leave.', 'It’s time we left.', 'Use the past simple after “It’s time + subject”.'], ['I wish I would be taller.', 'I wish I were taller.', 'Do not use “would” to wish about yourself.']],
    exercise: [
      { t: 'mc', q: 'I don’t have a car. I wish I ___ one.', o: ['have', 'had', 'would have'], a: 1, e: 'A wish about the present → past simple.' },
      { t: 'mc', q: 'I’m so tired. I wish I ___ to bed earlier last night.', o: ['went', 'had gone', 'would go'], a: 1, e: 'A regret about the past → past perfect.' },
      { t: 'fill', q: 'It’s late. It’s time we ___ (go) home.', a: ['went'], e: 'It’s time + subject + past simple.' },
      { t: 'type', q: 'Say this politely with “I’d rather”: “Please don’t tell anyone.”', a: ['I\'d rather you didn\'t tell anyone.', 'I would rather you didn\'t tell anyone.', 'I would rather you did not tell anyone.'], e: 'I’d rather + you + past simple (negative).' },
      { t: 'tf', q: '“I wish you would stop talking” often shows annoyance.', a: true, e: 'wish + would expresses annoyance or a desire for someone to change.' },
      { t: 'mc', q: '“I’d rather you didn’t smoke here” really means…', o: ['You can smoke if you want.', 'Please don’t smoke here.', 'I want to smoke.'], a: 1, e: 'It is a polite, indirect way to ask someone not to do something.' },
      { t: 'order', a: 'If only I had listened to your advice.', e: 'If only + past perfect for a past regret.' }
    ]
  }
);
