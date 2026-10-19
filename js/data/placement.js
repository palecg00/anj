/* LinguaPath — placement test. 5 questions per level. Gives an approximate recommendation only. */
window.LP = window.LP || {};

LP.PLACEMENT = [
  // A1
  { lv: 'A1', skill: 'grammar', t: 'mc', q: 'My sister ___ a teacher.', o: ['am', 'is', 'are'], a: 1, e: 'Use “is” with he, she and it.' },
  { lv: 'A1', skill: 'grammar', t: 'mc', q: 'I have ___ apple in my bag.', o: ['a', 'an', 'the some'], a: 1, e: '“Apple” starts with a vowel sound, so we use “an”.' },
  { lv: 'A1', skill: 'vocabulary', t: 'mc', q: 'You eat this meal in the morning:', o: ['dinner', 'lunch', 'breakfast'], a: 2, e: 'Breakfast is the first meal of the day.' },
  { lv: 'A1', skill: 'grammar', t: 'mc', q: 'He ___ football every Saturday.', o: ['play', 'plays', 'playing'], a: 1, e: 'Present simple with he: plays.' },
  { lv: 'A1', skill: 'reading', t: 'mc', q: '“The bank is opposite the park.” This means the bank is…', o: ['inside the park', 'on the other side of the street, facing the park', 'far from the park'], a: 1, e: '“Opposite” means facing something, on the other side.' },
  // A2
  { lv: 'A2', skill: 'grammar', t: 'mc', q: 'Last summer we ___ to Croatia.', o: ['go', 'went', 'have gone'], a: 1, e: '“Last summer” is a finished time → past simple: went.' },
  { lv: 'A2', skill: 'grammar', t: 'mc', q: 'How ___ money do you need?', o: ['many', 'much', 'lot'], a: 1, e: '“Money” is uncountable → how much.' },
  { lv: 'A2', skill: 'grammar', t: 'mc', q: 'This hotel is ___ than the one we stayed in last year.', o: ['more cheap', 'cheaper', 'the cheapest'], a: 1, e: 'Short adjective comparative: cheaper than.' },
  { lv: 'A2', skill: 'vocabulary', t: 'mc', q: 'You have a headache and a fever. You should…', o: ['go running', 'rest and see a doctor', 'eat a lot of sugar'], a: 1, e: 'This is the sensible advice for illness.' },
  { lv: 'A2', skill: 'grammar', t: 'mc', q: 'Look at those black clouds! It ___ rain.', o: ['is going to', 'will to', 'rains'], a: 0, e: 'A prediction based on evidence → going to.' },
  // B1
  { lv: 'B1', skill: 'grammar', t: 'mc', q: 'I ___ in this city since 2019.', o: ['live', 'lived', 'have lived'], a: 2, e: 'Duration up to now with “since” → present perfect.' },
  { lv: 'B1', skill: 'grammar', t: 'mc', q: 'If I had more free time, I ___ learn to play the piano.', o: ['will', 'would', 'am going to'], a: 1, e: 'Second conditional: if + past, would + verb.' },
  { lv: 'B1', skill: 'grammar', t: 'mc', q: 'I was having a shower when the phone ___.', o: ['rang', 'was ringing', 'rings'], a: 0, e: 'The short action that interrupts → past simple.' },
  { lv: 'B1', skill: 'vocabulary', t: 'mc', q: 'We’ve run ___ milk. Can you buy some?', o: ['out of', 'off', 'over'], a: 0, e: '“Run out of” = have no more of something.' },
  { lv: 'B1', skill: 'grammar', t: 'mc', q: 'That’s the woman ___ son plays for the national team.', o: ['who', 'whose', 'which'], a: 1, e: 'Possession → whose.' },
  // B2
  { lv: 'B2', skill: 'grammar', t: 'mc', q: 'The new bridge ___ by the end of next year.', o: ['will complete', 'will be completed', 'is completing'], a: 1, e: 'Future passive: will be + past participle.' },
  { lv: 'B2', skill: 'grammar', t: 'mc', q: 'She told me that she ___ the report the day before.', o: ['has finished', 'had finished', 'finishes'], a: 1, e: 'Reported speech: past simple → past perfect.' },
  { lv: 'B2', skill: 'grammar', t: 'mc', q: 'If we had left earlier, we ___ the train.', o: ['wouldn’t miss', 'wouldn’t have missed', 'didn’t miss'], a: 1, e: 'Third conditional: would have + past participle.' },
  { lv: 'B2', skill: 'grammar', t: 'mc', q: '___ the heavy rain, the match went ahead.', o: ['Although', 'Despite', 'However'], a: 1, e: '“Despite” + noun phrase.' },
  { lv: 'B2', skill: 'vocabulary', t: 'mc', q: 'We worked all weekend to ___ the deadline.', o: ['do', 'meet', 'make'], a: 1, e: 'Collocation: meet a deadline.' },
  // C1
  { lv: 'C1', skill: 'grammar', t: 'mc', q: 'Not only ___ late, but he also forgot the documents.', o: ['he arrived', 'did he arrive', 'arrived he'], a: 1, e: 'Inversion after “Not only”: did he arrive.' },
  { lv: 'C1', skill: 'grammar', t: 'mc', q: '___ the report, she sent it to the director.', o: ['Having finished', 'Finished', 'To finish'], a: 0, e: 'Perfect participle for an earlier action.' },
  { lv: 'C1', skill: 'vocabulary', t: 'mc', q: 'Which sentence is the most appropriately hedged for an academic text?', o: ['This proves that diets fail.', 'The data may indicate that some diets are less effective.', 'Diets are totally useless.'], a: 1, e: 'Academic writing uses cautious language (may indicate, some).' },
  { lv: 'C1', skill: 'vocabulary', t: 'mc', q: '“Losing that job was a blessing in disguise” means…', o: ['it was a disaster', 'it seemed bad but led to something good', 'it was a secret'], a: 1, e: 'A blessing in disguise seems bad at first but has a good result.' },
  { lv: 'C1', skill: 'reading', t: 'mc', q: 'A colleague says: “Your plan is… certainly ambitious.” What are they most likely implying?', o: ['It is excellent.', 'It may be unrealistic.', 'It is too simple.'], a: 1, e: 'The hesitation and “certainly ambitious” suggest polite doubt.' }
];
