/* LinguaPath — grammar topics A1 and A2.
   Exercise question types: mc (options + answer index), tf (true/false), fill (typed gap), type (short typed answer),
   order (put words in order; answer is the sentence), match (pairs). Every question has an explanation (e). */
window.LP = window.LP || {};
LP.GRAMMAR = LP.GRAMMAR || [];

LP.GRAMMAR.push(
  {
    id: 'a1-be', level: 'A1', title: 'The verb “to be”', topic: 'Verbs and tenses',
    use: 'We use “to be” (am, is, are) to say who people are, what things are like and where they are.',
    explain: [
      'The verb “to be” has three forms in the present: am, is and are.',
      'Use am with I. Use is with he, she and it. Use are with you, we and they.',
      'In speaking, we often use short forms: I’m, you’re, he’s, she’s, it’s, we’re, they’re.',
      'To make a question, put the verb before the person: Are you…? Is she…?'
    ],
    sk: 'Sloveso „to be“ (byť) má v prítomnom čase tri tvary: am (ja), is (on, ona, ono) a are (ty/vy, my, oni). Zápor tvoríme slovom „not“ (I am not, she isn’t). V otázke dáme sloveso pred podmet: Are you…? Is he…? V krátkej kladnej odpovedi nepoužívame skrátený tvar (Yes, I am.).',
    patterns: [['Positive', 'I am / he, she, it is / you, we, they are + …'], ['Negative', 'I am not / she is not (isn’t) / we are not (aren’t)'], ['Question', 'Am I…? / Is it…? / Are you…?']],
    positive: ['I am a student.', 'She is from Spain.', 'We are happy today.', 'It’s cold outside.'],
    negative: ['I’m not tired.', 'He isn’t at home.', 'They aren’t teachers.'],
    qa: [['Are you from Slovakia?', 'Yes, I am. / No, I’m not.'], ['Is she your sister?', 'Yes, she is. / No, she isn’t.'], ['Where are they?', 'They are at school.']],
    mistakes: [['He are my friend.', 'He is my friend.', 'Use “is” with he, she and it.'], ['I is a student.', 'I am a student.', 'Use “am” only with I.'], ['You are from Italy?', 'Are you from Italy?', 'In questions, put “are” before “you”.'], ['Yes, I’m.', 'Yes, I am.', 'Do not use short forms at the end of short answers.']],
    exercise: [
      { t: 'mc', q: 'She ___ a doctor.', o: ['am', 'is', 'are'], a: 1, e: 'Use “is” with she.' },
      { t: 'fill', q: 'We ___ from Slovakia.', a: ['are'], e: 'Use “are” with we.' },
      { t: 'fill', q: 'I ___ not hungry.', a: ['am'], e: 'Use “am” with I.' },
      { t: 'order', a: 'Are they your parents?', e: 'In a question, “are” comes first, before the subject “they”.' },
      { t: 'tf', q: '“Yes, I’m.” is a correct short answer.', a: false, e: 'We say “Yes, I am.” We do not use short forms at the end of short positive answers.' },
      { t: 'type', q: 'Make this sentence negative: “He is at work.”', a: ['He is not at work.', 'He isn\'t at work.', 'He\'s not at work.'], e: 'Add “not” after “is”: He is not (isn’t) at work.' },
      { t: 'match', pairs: [['I', 'am'], ['he', 'is'], ['they', 'are']], e: 'I → am; he, she, it → is; you, we, they → are.' }
    ]
  },
  {
    id: 'a1-articles', level: 'A1', title: 'A, an and plural nouns', topic: 'Nouns and articles',
    use: 'We use “a” or “an” with one thing. We add -s or -es to talk about more than one thing.',
    explain: [
      'Use “a” before a consonant sound: a book, a car, a university (it starts with a “you” sound).',
      'Use “an” before a vowel sound: an apple, an egg, an hour (the “h” is silent).',
      'For most plurals, add -s: one book → two books. After -s, -sh, -ch, -x add -es: bus → buses, watch → watches.',
      'Some plurals are irregular: man → men, woman → women, child → children, person → people.',
      'Use “this” and “that” with one thing, and “these” and “those” with more than one thing.'
    ],
    sk: 'V slovenčine členy nemáme. V angličtine dávame pred jedno počítateľné podstatné meno „a“ (pred spoluhláskou) alebo „an“ (pred samohláskou – rozhoduje výslovnosť, nie písmeno). Množné číslo tvoríme koncovkou -s alebo -es. Niektoré tvary sú nepravidelné (child → children, person → people).',
    patterns: [['One thing', 'a + consonant sound / an + vowel sound'], ['More than one', 'noun + -s / -es (irregular: men, children, people)'], ['Near / far', 'this, these (near) — that, those (far)']],
    positive: ['I have a brother and an aunt.', 'There are three buses at the station.', 'These apples are green.', 'Two people are waiting.'],
    negative: ['I don’t have a car.', 'Those aren’t my books.'],
    qa: [['Is this an orange?', 'Yes, it is.'], ['How many children do they have?', 'They have two children.']],
    mistakes: [['a apple', 'an apple', '“Apple” starts with a vowel sound, so use “an”.'], ['two childs', 'two children', '“Child” has an irregular plural.'], ['an university', 'a university', '“University” starts with a “you” sound, so use “a”.'], ['this books', 'these books', 'Use “these” with plural nouns.']],
    exercise: [
      { t: 'mc', q: 'I eat ___ egg every morning.', o: ['a', 'an', '—'], a: 1, e: '“Egg” starts with a vowel sound, so we use “an”.' },
      { t: 'mc', q: 'She is ___ university student.', o: ['a', 'an'], a: 0, e: '“University” starts with a “you” sound (a consonant sound), so we use “a”.' },
      { t: 'fill', q: 'One bus, two ___.', a: ['buses'], e: 'Nouns ending in -s take -es in the plural.' },
      { t: 'fill', q: 'One woman, three ___.', a: ['women'], e: '“Woman” is irregular: woman → women.' },
      { t: 'match', pairs: [['child', 'children'], ['person', 'people'], ['box', 'boxes'], ['city', 'cities']], e: 'child → children and person → people are irregular. box → boxes (-es after x). city → cities (consonant + y → ies).' },
      { t: 'tf', q: 'We say “these book” for two books.', a: false, e: 'The noun must also be plural: “these books”.' },
      { t: 'order', a: 'Those are my new shoes.', e: '“Those” (plural, far) + are + my + adjective + plural noun.' }
    ]
  },
  {
    id: 'a1-possessive', level: 'A1', title: 'Possessives and “have got”', topic: 'Pronouns and possession',
    use: 'We use my, your, his, her and ’s to say who something belongs to. We use “have got” for family and things we own.',
    explain: [
      'Possessive adjectives come before a noun: my, your, his, her, its, our, their. Example: my sister, their house.',
      'Add ’s to a person’s name to show possession: Anna’s bag, my brother’s car.',
      'For plural nouns ending in -s, add only an apostrophe: my parents’ house.',
      '“Have got” means “have” (own). Use “has got” with he, she and it. Short forms: I’ve got, she’s got.',
      'Questions: Have you got…? Has she got…? Negative: I haven’t got… He hasn’t got…'
    ],
    sk: 'Privlastňovacie zámená (my, your, his, her, its, our, their) stoja pred podstatným menom a nemenia sa podľa rodu ani čísla vlastníctva. Pri menách používame ’s: Anna’s bag = Annina taška. „Have got“ znamená „mať“; pri he/she/it použijeme „has got“.',
    patterns: [['Possessive adjective', 'my / your / his / her / its / our / their + noun'], ['Possessive ’s', 'name + ’s + noun (Tom’s phone)'], ['Have got', 'I / you / we / they have got — he / she / it has got']],
    positive: ['This is my brother. His name is Marek.', 'Lucy’s mother is a nurse.', 'We have got two cats.', 'She has got blue eyes.'],
    negative: ['I haven’t got a sister.', 'He hasn’t got a car.'],
    qa: [['Have you got any brothers?', 'Yes, I have. I’ve got one brother.'], ['Has your dad got a bike?', 'No, he hasn’t.'], ['Whose phone is this?', 'It’s Peter’s phone.']],
    mistakes: [['She has got a brother. He name is Jan.', 'His name is Jan.', 'Use “his” for a man or boy.'], ['He have got a dog.', 'He has got a dog.', 'Use “has got” with he, she and it.'], ['the car of my father', 'my father’s car', 'With people, we usually use ’s.'], ['Have you a car?', 'Have you got a car?', 'In modern English, use “Have you got…?” or “Do you have…?”']],
    exercise: [
      { t: 'mc', q: 'This is Maria. ___ dog is very small.', o: ['His', 'Her', 'Their'], a: 1, e: 'Maria is a woman, so we use “her”.' },
      { t: 'fill', q: 'My sister ___ got a new phone.', a: ['has'], e: 'Use “has got” with he, she and it (my sister = she).' },
      { t: 'mc', q: 'That is ___ bike.', o: ['Tom', 'Toms', 'Tom’s'], a: 2, e: 'Add ’s to a name to show who something belongs to.' },
      { t: 'type', q: 'Write the question: (you / got / a pet?)', a: ['Have you got a pet?'], e: 'Questions with “have got”: Have + you + got + …?' },
      { t: 'tf', q: '“They have got a big house. Their house is in Nitra.” is correct.', a: true, e: '“Their” is the possessive for “they”. Both sentences are correct.' },
      { t: 'match', pairs: [['I', 'my'], ['we', 'our'], ['she', 'her'], ['they', 'their']], e: 'Each subject pronoun has its own possessive adjective.' },
      { t: 'order', a: 'He hasn\'t got any brothers.', e: 'Negative: subject + hasn’t got + noun.' }
    ]
  },
  {
    id: 'a1-thereis', level: 'A1', title: 'There is / there are, some and any', topic: 'Sentence structure',
    use: 'We use “there is” and “there are” to say that something exists in a place.',
    explain: [
      'Use “there is” (there’s) with one thing or with uncountable nouns: There is a bottle of water. There is some milk.',
      'Use “there are” with plural nouns: There are three eggs.',
      'Use “some” in positive sentences and “any” in negative sentences and questions.',
      'Questions: Is there…? Are there…? Short answers: Yes, there is. / No, there aren’t.'
    ],
    sk: '„There is / There are“ používame, keď hovoríme, že niečo niekde je alebo existuje (napr. V chladničke je mlieko = There is some milk in the fridge). „Some“ používame v kladných vetách, „any“ v záporných vetách a otázkach.',
    patterns: [['Positive', 'There is + one thing / There are + plural'], ['Negative', 'There isn’t any… / There aren’t any…'], ['Question', 'Is there a/any…? / Are there any…?']],
    positive: ['There is a café near my house.', 'There are some apples on the table.', 'There is some cheese in the fridge.'],
    negative: ['There isn’t any bread.', 'There aren’t any eggs.'],
    qa: [['Is there a supermarket near here?', 'Yes, there is.'], ['Are there any tomatoes?', 'No, there aren’t.']],
    mistakes: [['There are a cat in the garden.', 'There is a cat in the garden.', 'Use “there is” with one thing.'], ['There aren’t some eggs.', 'There aren’t any eggs.', 'Use “any” in negative sentences.'], ['Have there any milk?', 'Is there any milk?', 'Questions start with “Is there” or “Are there”.']],
    exercise: [
      { t: 'mc', q: 'There ___ two bananas in the bag.', o: ['is', 'are'], a: 1, e: '“Two bananas” is plural, so use “there are”.' },
      { t: 'mc', q: 'Is there ___ sugar in my coffee?', o: ['some', 'any'], a: 1, e: 'In questions we usually use “any”.' },
      { t: 'fill', q: 'There ___ a good restaurant in this street.', a: ['is', '\'s'], e: '“A good restaurant” is one thing: there is.' },
      { t: 'fill', q: 'We have ___ cheese, but we haven’t got any bread.', a: ['some'], e: 'Use “some” in positive sentences.' },
      { t: 'type', q: 'Make a question: “There are some cups.” → ?', a: ['Are there any cups?'], e: 'Change the order (Are there) and change “some” to “any”.' },
      { t: 'tf', q: '“There isn’t any water.” is correct.', a: true, e: 'Negative + uncountable noun: there isn’t any water.' },
      { t: 'order', a: 'Are there any eggs in the fridge?', e: 'Question: Are there + any + plural noun + place.' }
    ]
  },
  {
    id: 'a1-present-simple', level: 'A1', title: 'Present simple', topic: 'Verbs and tenses',
    use: 'We use the present simple for habits, routines and facts.',
    explain: [
      'We use the present simple for things we do regularly (habits) and for things that are always true (facts).',
      'With he, she and it, add -s to the verb: I work → she works. Add -es after -o, -s, -sh, -ch, -x: go → goes, watch → watches.',
      'Negative: use do not (don’t) or does not (doesn’t) + the base verb: She doesn’t work on Sundays.',
      'Questions: use do or does + subject + base verb: Does he play football?',
      'After “does” and “doesn’t”, the verb has no -s: Does she like tea? (not “Does she likes”).',
      'Time words: always, usually, often, sometimes, never, every day, on Mondays.'
    ],
    sk: 'Jednoduchý prítomný čas používame na zvyky, opakované činnosti a všeobecné fakty. V 3. osobe jednotného čísla (he, she, it) pridáme k slovesu -s/-es. Zápor a otázku tvoríme pomocným slovesom do/does. Po „does“ a „doesn’t“ už sloveso nemá -s.',
    patterns: [['Positive', 'I / you / we / they work — he / she / it works'], ['Negative', 'I don’t work — she doesn’t work'], ['Question', 'Do you work…? — Does he work…?']],
    positive: ['I work every day.', 'She works in a shop.', 'Water boils at 100 degrees.', 'He usually goes to bed at ten.'],
    negative: ['They do not live here.', 'My brother doesn’t drink coffee.'],
    qa: [['Does he play football?', 'Yes, he does. / No, he doesn’t.'], ['Do you like pizza?', 'Yes, I do.'], ['What time do you get up?', 'I get up at seven.']],
    mistakes: [['She work in a bank.', 'She works in a bank.', 'Add -s with he, she and it.'], ['He doesn’t likes tea.', 'He doesn’t like tea.', 'After “doesn’t”, use the base verb.'], ['Do she speak English?', 'Does she speak English?', 'Use “does” with he, she and it.'], ['I am work in an office.', 'I work in an office.', 'Do not use “am” with a present simple verb.']],
    exercise: [
      { t: 'fill', q: 'She ___ (watch) TV every evening.', a: ['watches'], e: 'He/she/it + verb + -es after -ch: watches.' },
      { t: 'mc', q: '___ your brother play tennis?', o: ['Do', 'Does', 'Is'], a: 1, e: 'Use “does” in questions with he, she and it.' },
      { t: 'fill', q: 'We ___ (not / live) in the city.', a: ['don\'t live', 'do not live'], e: 'Negative with we: do not (don’t) + base verb.' },
      { t: 'type', q: 'Correct the mistake: “My father don’t like fish.”', a: ['My father doesn\'t like fish.', 'My father does not like fish.'], e: '“My father” = he, so use “doesn’t”.' },
      { t: 'order', a: 'Does he play football on Saturdays?', e: 'Question: Does + subject + base verb + rest.' },
      { t: 'tf', q: '“She go to school by bus.” is correct.', a: false, e: 'With she, add -es to “go”: She goes to school by bus.' },
      { t: 'mc', q: 'Which sentence is a fact?', o: ['The sun rises in the east.', 'I’m eating now.', 'I went home.'], a: 0, e: 'We use the present simple for facts that are always true.' }
    ]
  },
  {
    id: 'a1-questions', level: 'A1', title: 'Question words and “can”', topic: 'Questions',
    use: 'We use question words (what, where, when, who, how) to ask for information. We use “can” for ability and requests.',
    explain: [
      'Question words: What (thing), Where (place), When (time), Who (person), Why (reason), How (way), How much / How many (amount).',
      'Word order with “be”: Question word + be + subject: Where is the station?',
      'Word order with other verbs: Question word + do/does + subject + verb: Where do you live?',
      '“Can” is the same for all people: I can, she can, they can. After “can” use the base verb: She can swim.',
      'Negative: cannot (can’t). Question: Can you help me?'
    ],
    sk: 'Opytovacie slová stoja na začiatku otázky (What, Where, When, Who, Why, How). Za nimi nasleduje sloveso „be“ alebo pomocné sloveso do/does. Modálne sloveso „can“ (vedieť, môcť) má rovnaký tvar pre všetky osoby a po ňom nasleduje neurčitok bez „to“.',
    patterns: [['With “be”', 'Where / What / Who + is / are + subject?'], ['With other verbs', 'Question word + do / does + subject + verb?'], ['Can', 'subject + can / can’t + verb — Can + subject + verb?']],
    positive: ['I can speak two languages.', 'She can drive.', 'You can buy tickets here.'],
    negative: ['I can’t swim.', 'We can’t find the bank.'],
    qa: [['Where is the library?', 'It’s next to the park.'], ['What time does the shop open?', 'At nine o’clock.'], ['Can you play the guitar?', 'Yes, I can. / No, I can’t.'], ['How many people live here?', 'About two thousand.']],
    mistakes: [['Where you live?', 'Where do you live?', 'Use “do” in questions with most verbs.'], ['She can to swim.', 'She can swim.', 'Do not use “to” after “can”.'], ['She cans speak French.', 'She can speak French.', '“Can” does not change. No -s.'], ['Where the bank is?', 'Where is the bank?', 'Put “is” before the subject in questions.']],
    exercise: [
      { t: 'match', pairs: [['Where', 'a place'], ['When', 'a time'], ['Who', 'a person'], ['Why', 'a reason']], e: 'Each question word asks about a different kind of information.' },
      { t: 'mc', q: '___ is your name?', o: ['What', 'Where', 'Who'], a: 0, e: 'We ask “What is your name?”' },
      { t: 'mc', q: 'He can ___ very fast.', o: ['run', 'runs', 'to run'], a: 0, e: 'After “can”, use the base verb.' },
      { t: 'order', a: 'Where do your parents live?', e: 'Question word + do + subject + verb.' },
      { t: 'fill', q: '___ much is this ticket? — It’s five euros.', a: ['How'], e: 'We ask about price with “How much”.' },
      { t: 'type', q: 'Write a question with “can”: (you / speak / German?)', a: ['Can you speak German?'], e: 'Can + subject + base verb.' },
      { t: 'tf', q: '“Where the station is?” is a correct question.', a: false, e: 'The correct question is “Where is the station?”' }
    ]
  },
  // ------------------------- A2 -------------------------
  {
    id: 'a2-countable', level: 'A2', title: 'Countable and uncountable nouns', topic: 'Nouns and quantity',
    use: 'Some nouns can be counted (apples), and some cannot (water, money). We use different words to talk about their amount.',
    explain: [
      'Countable nouns have a singular and a plural form: one bag, two bags.',
      'Uncountable nouns have no plural and do not use a/an: money, bread, information, advice, luggage.',
      'Use “many” with countable nouns and “much” with uncountable nouns, mainly in questions and negatives: How many shirts? How much money?',
      '“A lot of” works with both: a lot of shoes, a lot of time.',
      'Use “a few” (countable) and “a little” (uncountable) for small amounts.',
      'To count uncountable things, use containers or units: a bottle of water, a piece of advice, a loaf of bread.'
    ],
    sk: 'Počítateľné podstatné mená majú jednotné aj množné číslo (one apple, two apples). Nepočítateľné nemajú množné číslo ani člen a/an (money, advice, information, luggage). Pri počítateľných používame many / a few, pri nepočítateľných much / a little. „A lot of“ ide s oboma.',
    patterns: [['Countable', 'How many + plural? / a few + plural / many + plural'], ['Uncountable', 'How much + noun? / a little + noun / much + noun'], ['Both', 'a lot of / some / any + noun']],
    positive: ['I bought a few T-shirts.', 'We have a lot of time.', 'Can I have a bottle of water?', 'She gave me some good advice.'],
    negative: ['I don’t have much money.', 'There aren’t many people in the shop.'],
    qa: [['How much is this jacket?', 'It’s 45 euros.'], ['How many bags do you need?', 'Just two, please.']],
    mistakes: [['How many money do you have?', 'How much money do you have?', '“Money” is uncountable.'], ['an information', 'some information', '“Information” is uncountable. No a/an.'], ['many luggages', 'a lot of luggage', '“Luggage” has no plural.'], ['a few milk', 'a little milk', 'Use “a little” with uncountable nouns.']],
    exercise: [
      { t: 'mc', q: 'How ___ apples do you want?', o: ['much', 'many'], a: 1, e: '“Apples” is countable and plural, so use “many”.' },
      { t: 'mc', q: 'How ___ does this cost?', o: ['much', 'many'], a: 0, e: 'We ask about price with “How much”.' },
      { t: 'tf', q: '“Advice” is an uncountable noun.', a: true, e: 'We say “some advice” or “a piece of advice”, not “an advice”.' },
      { t: 'fill', q: 'There is only a ___ sugar left. (small amount)', a: ['little'], e: 'Sugar is uncountable, so “a little sugar”.' },
      { t: 'match', pairs: [['a bottle of', 'water'], ['a loaf of', 'bread'], ['a piece of', 'advice'], ['a bar of', 'chocolate']], e: 'These containers and units help us count uncountable things.' },
      { t: 'type', q: 'Correct the mistake: “I need an information about the train.”', a: ['I need some information about the train.', 'I need information about the train.'], e: '“Information” is uncountable, so we cannot use “an”.' },
      { t: 'order', a: 'We don\'t have much time.', e: 'Negative + much + uncountable noun.' }
    ]
  },
  {
    id: 'a2-past-simple', level: 'A2', title: 'Past simple', topic: 'Verbs and tenses',
    use: 'We use the past simple for finished actions in the past, often with a time: yesterday, last week, in 2019.',
    explain: [
      'Regular verbs add -ed: work → worked, visit → visited, stop → stopped, study → studied.',
      'Many common verbs are irregular: go → went, see → saw, have → had, buy → bought, take → took.',
      'Negative: did not (didn’t) + base verb: We didn’t go out.',
      'Questions: Did + subject + base verb: Did you like the film?',
      'The verb “be” is different: was (I, he, she, it) and were (you, we, they).'
    ],
    sk: 'Jednoduchý minulý čas vyjadruje ukončenú činnosť v minulosti, často s časovým údajom (yesterday, last year). Pravidelné slovesá majú koncovku -ed, nepravidelné sa treba naučiť (go → went). V zápore a otázke použijeme „did“ a sloveso v základnom tvare.',
    patterns: [['Positive', 'subject + verb-ed / irregular form (went, saw)'], ['Negative', 'subject + didn’t + base verb'], ['Question', 'Did + subject + base verb?'], ['Be', 'I / he / she / it was — you / we / they were']],
    positive: ['We visited Vienna last summer.', 'I took the train at eight.', 'She bought a new suitcase.', 'The hotel was very nice.'],
    negative: ['I didn’t miss the bus.', 'They weren’t at home.'],
    qa: [['Did you enjoy the trip?', 'Yes, I did. It was great.'], ['Where did you go?', 'We went to Croatia.'], ['How long was the journey?', 'It was about four hours.']],
    mistakes: [['I goed to London.', 'I went to London.', '“Go” is irregular: went.'], ['Did you went?', 'Did you go?', 'After “did”, use the base verb.'], ['She didn’t liked it.', 'She didn’t like it.', 'After “didn’t”, use the base verb.'], ['We was tired.', 'We were tired.', 'Use “were” with we, you and they.']],
    exercise: [
      { t: 'fill', q: 'Yesterday I ___ (go) to the station by bike.', a: ['went'], e: '“Go” is irregular: go → went.' },
      { t: 'fill', q: 'We ___ (visit) my aunt last weekend.', a: ['visited'], e: 'Regular verb: visit + -ed.' },
      { t: 'mc', q: '___ you buy a return ticket?', o: ['Do', 'Did', 'Were'], a: 1, e: 'Past simple questions use “did”.' },
      { t: 'match', pairs: [['see', 'saw'], ['take', 'took'], ['buy', 'bought'], ['have', 'had']], e: 'These are common irregular verbs. Learn them by heart.' },
      { t: 'type', q: 'Make it negative: “The train left on time.”', a: ['The train didn\'t leave on time.', 'The train did not leave on time.'], e: 'didn’t + base verb (leave, not left).' },
      { t: 'tf', q: '“They was at the airport.” is correct.', a: false, e: 'Use “were” with they: They were at the airport.' },
      { t: 'order', a: 'Where did you stay in Prague?', e: 'Question word + did + subject + base verb.' }
    ]
  },
  {
    id: 'a2-comparatives', level: 'A2', title: 'Comparatives and superlatives', topic: 'Adjectives',
    use: 'We use comparatives to compare two things and superlatives to say which one is “number one” in a group.',
    explain: [
      'Short adjectives (one syllable): add -er / -est: cheap → cheaper → the cheapest.',
      'Adjectives ending in -y: change y to i: busy → busier → the busiest.',
      'Short adjectives ending in one vowel + consonant: double the last letter: big → bigger → the biggest.',
      'Long adjectives (two or more syllables): use more / the most: modern → more modern → the most modern.',
      'Irregular: good → better → the best; bad → worse → the worst; far → further → the furthest.',
      'Use “than” after a comparative: Prague is bigger than Brno. Use “as … as” to say two things are equal.'
    ],
    sk: '2. stupeň (comparative) tvoríme pri krátkych prídavných menách koncovkou -er, pri dlhých slovom „more“. Po 2. stupni nasleduje „than“ (ako). 3. stupeň (superlative) tvoríme pomocou „the …-est“ alebo „the most“. Nepravidelné: good – better – the best, bad – worse – the worst.',
    patterns: [['Comparative', 'adjective-er + than / more + adjective + than'], ['Superlative', 'the + adjective-est / the most + adjective'], ['Equal', 'as + adjective + as']],
    positive: ['My town is quieter than the capital.', 'This is the oldest bridge in the city.', 'The museum is more interesting than the zoo.', 'Today is as hot as yesterday.'],
    negative: ['The bus isn’t as fast as the train.', 'It’s not the most expensive hotel.'],
    qa: [['Which is bigger, London or Paris?', 'London is bigger.'], ['What is the best restaurant here?', 'I think the best one is near the square.']],
    mistakes: [['more big', 'bigger', 'Short adjectives use -er.'], ['more better', 'better', '“Better” is already a comparative.'], ['She is taller that me.', 'She is taller than me.', 'Use “than”, not “that”.'], ['the most cheap', 'the cheapest', 'Short adjectives use -est.']],
    exercise: [
      { t: 'fill', q: 'A car is ___ (fast) than a bike.', a: ['faster'], e: 'Short adjective: fast → faster.' },
      { t: 'fill', q: 'This is the ___ (interesting) museum in town.', a: ['most interesting'], e: 'Long adjective: the most interesting.' },
      { t: 'mc', q: 'My English is ___ than last year.', o: ['gooder', 'better', 'more good'], a: 1, e: '“Good” is irregular: good → better → the best.' },
      { t: 'mc', q: 'August is the ___ month of the year here.', o: ['hotter', 'hottest', 'most hot'], a: 1, e: 'Superlative of hot: the hottest (double the t).' },
      { t: 'tf', q: '“The village is as quiet as a library.” means the two places are equally quiet.', a: true, e: '“as … as” shows that two things are equal.' },
      { t: 'type', q: 'Correct the mistake: “Košice is more small than Bratislava.”', a: ['Košice is smaller than Bratislava.', 'Kosice is smaller than Bratislava.'], e: '“Small” is short: smaller than.' },
      { t: 'order', a: 'It is the busiest street in the city.', e: 'the + superlative + noun + in + place.' }
    ]
  },
  {
    id: 'a2-future', level: 'A2', title: 'Future: “going to” and “will”', topic: 'Verbs and tenses',
    use: 'We use “going to” for plans and “will” for decisions made now, promises and predictions.',
    explain: [
      'Use “be going to + verb” for plans you have already made: I’m going to visit my grandma on Sunday.',
      'Also use “going to” when you can see something will happen: Look at those clouds! It’s going to rain.',
      'Use “will + verb” for decisions you make at the moment of speaking: “It’s cold.” “I’ll close the window.”',
      'Use “will” for promises, offers and opinions about the future: I’ll help you. I think it will be sunny.',
      'Negative: I’m not going to… / I won’t (will not)…'
    ],
    sk: '„Going to“ používame na plány a zámery, o ktorých sme už rozhodli, a na predpovede podľa toho, čo vidíme. „Will“ používame na okamžité rozhodnutia, sľuby, ponuky a názory o budúcnosti. Zápor od „will“ je „won’t“.',
    patterns: [['Plan', 'am / is / are + going to + verb'], ['Instant decision / promise', 'will (’ll) + verb'], ['Negative', 'not going to + verb / won’t + verb']],
    positive: ['We are going to travel to Italy in July.', 'I’ll call you tonight.', 'I think you will love this film.'],
    negative: ['She isn’t going to study medicine.', 'I won’t be late, I promise.'],
    qa: [['What are you going to do this weekend?', 'I’m going to see a concert.'], ['Will you help me with this bag?', 'Of course I will.']],
    mistakes: [['I going to visit Paris.', 'I am going to visit Paris.', 'You need “am/is/are” before “going to”.'], ['I will to call you.', 'I will call you.', 'No “to” after “will”.'], ['The phone is ringing. I’m going to answer it.', 'I’ll answer it.', 'A decision at the moment of speaking uses “will”.']],
    exercise: [
      { t: 'mc', q: 'A: “The phone is ringing.” B: “I ___ answer it.”', o: ['’ll', '’m going to'], a: 0, e: 'B decides now, at the moment of speaking, so we use “will”.' },
      { t: 'mc', q: 'We have the tickets. We ___ see the match on Saturday.', o: ['will', 'are going to'], a: 1, e: 'This is a plan made before (they have tickets), so “going to” is best.' },
      { t: 'fill', q: 'Look at the sky! It ___ going to snow.', a: ['is', '\'s'], e: 'Prediction from what we see: it is going to…' },
      { t: 'type', q: 'Make it negative: “I will tell her.”', a: ['I won\'t tell her.', 'I will not tell her.'], e: 'The negative of “will” is “won’t” (will not).' },
      { t: 'tf', q: '“I will to help you.” is correct.', a: false, e: 'After “will”, use the base verb without “to”: I will help you.' },
      { t: 'order', a: 'What are you going to do next weekend?', e: 'Question: What + are + you + going to + verb.' },
      { t: 'match', pairs: [['a plan', 'I’m going to start a course.'], ['a promise', 'I’ll be careful.'], ['an offer', 'I’ll carry that for you.']], e: 'Plans use “going to”; promises and offers use “will”.' }
    ]
  },
  {
    id: 'a2-present-continuous', level: 'A2', title: 'Present continuous', topic: 'Verbs and tenses',
    use: 'We use the present continuous for actions happening now and for temporary situations.',
    explain: [
      'Form: am / is / are + verb-ing. Example: I am reading. She is swimming.',
      'Use it for actions happening at this moment: Look! They are playing on the beach.',
      'Use it for temporary situations: I’m staying in a hotel this week.',
      'You can also use it for fixed future arrangements: We’re flying to Malta on Friday.',
      'Spelling: make → making, swim → swimming, lie → lying.',
      'Some verbs are not usually used in the continuous form: like, love, know, want, need, understand.'
    ],
    sk: 'Priebehový prítomný čas (am/is/are + -ing) používame na deje, ktoré prebiehajú práve teraz, na dočasné situácie a na dohodnuté plány v blízkej budúcnosti. Slovesá ako know, like, want, need zvyčajne v priebehovom tvare nepoužívame.',
    patterns: [['Positive', 'subject + am / is / are + verb-ing'], ['Negative', 'subject + am not / isn’t / aren’t + verb-ing'], ['Question', 'Am / Is / Are + subject + verb-ing?']],
    positive: ['I’m writing a postcard to my grandma.', 'The children are swimming in the pool.', 'We are staying at a small hotel this week.'],
    negative: ['It isn’t raining today.', 'They aren’t working this week.'],
    qa: [['What are you doing?', 'I’m packing my suitcase.'], ['Are you enjoying your holiday?', 'Yes, I am. It’s wonderful.']],
    mistakes: [['I am know the answer.', 'I know the answer.', '“Know” is not used in the continuous form.'], ['She is swim now.', 'She is swimming now.', 'Use verb + -ing.'], ['They playing football.', 'They are playing football.', 'Do not forget “am/is/are”.'], ['I’m wanting a coffee.', 'I want a coffee.', '“Want” is not usually continuous.']],
    exercise: [
      { t: 'fill', q: 'Shh! The baby ___ (sleep).', a: ['is sleeping', '\'s sleeping'], e: 'Action happening now: is + sleeping.' },
      { t: 'fill', q: 'We ___ (lie) on the beach right now.', a: ['are lying', '\'re lying'], e: 'lie → lying (ie changes to y).' },
      { t: 'mc', q: 'I ___ the answer.', o: ['know', 'am knowing'], a: 0, e: '“Know” is a state verb. We do not use it in the continuous form.' },
      { t: 'mc', q: 'Usually I work in Brno, but this month I ___ in Vienna.', o: ['work', 'am working'], a: 1, e: 'A temporary situation uses the present continuous.' },
      { t: 'type', q: 'Write the question: (what / you / do / now?)', a: ['What are you doing now?'], e: 'Question word + are + you + verb-ing.' },
      { t: 'tf', q: '“It is raining” describes something happening now.', a: true, e: 'The present continuous describes actions happening now.' },
      { t: 'order', a: 'Are you enjoying the view?', e: 'Question: Are + subject + verb-ing.' }
    ]
  },
  {
    id: 'a2-should', level: 'A2', title: 'Should, must and have to', topic: 'Modal verbs',
    use: 'We use “should” to give advice, and “must” or “have to” to say something is necessary.',
    explain: [
      'Use “should / shouldn’t + verb” for advice: You should drink more water. You shouldn’t go to work today.',
      'Use “must + verb” for strong necessity or rules, often from the speaker: You must take this medicine twice a day.',
      'Use “have to / has to + verb” for necessity, often because of rules or other people: I have to see a doctor.',
      '“Mustn’t” means it is not allowed: You mustn’t smoke here.',
      '“Don’t have to” means it is not necessary: You don’t have to pay; it’s free.'
    ],
    sk: '„Should“ používame na rady (mal by si). „Must“ a „have to“ vyjadrujú povinnosť (musieť). Pozor na zápor: „mustn’t“ znamená zákaz (nesmieš), ale „don’t have to“ znamená, že niečo nie je nutné (nemusíš).',
    patterns: [['Advice', 'should / shouldn’t + verb'], ['Necessity', 'must + verb / have to, has to + verb'], ['Not allowed', 'mustn’t + verb'], ['Not necessary', 'don’t / doesn’t have to + verb']],
    positive: ['You should rest for a few days.', 'She has to take medicine every morning.', 'Visitors must wash their hands.'],
    negative: ['You shouldn’t eat so much sugar.', 'You mustn’t drive after taking this medicine.', 'You don’t have to come to the office tomorrow.'],
    qa: [['What should I do about my headache?', 'You should take a break and drink some water.'], ['Do I have to make an appointment?', 'Yes, you do. / No, you don’t.']],
    mistakes: [['You should to see a doctor.', 'You should see a doctor.', 'No “to” after “should”.'], ['She have to work.', 'She has to work.', 'Use “has to” with he, she and it.'], ['You mustn’t pay. It’s free.', 'You don’t have to pay. It’s free.', '“Mustn’t” means not allowed. “Don’t have to” means not necessary.']],
    exercise: [
      { t: 'mc', q: 'You look tired. You ___ go to bed early.', o: ['should', 'mustn’t', 'don’t have to'], a: 0, e: 'This is advice, so we use “should”.' },
      { t: 'mc', q: 'It’s a hospital. You ___ use your phone in this room.', o: ['don’t have to', 'mustn’t'], a: 1, e: 'It is not allowed, so we use “mustn’t”.' },
      { t: 'mc', q: 'Tomorrow is Sunday. I ___ get up early.', o: ['mustn’t', 'don’t have to'], a: 1, e: 'It is not necessary, so we use “don’t have to”.' },
      { t: 'fill', q: 'My brother ___ to take his medicine at 8 p.m.', a: ['has'], e: 'He/she/it + has to.' },
      { t: 'type', q: 'Give advice with “should”: (eat / more fruit)', a: ['You should eat more fruit.'], e: 'You + should + base verb.' },
      { t: 'tf', q: '“You don’t have to wear a coat” means wearing a coat is not allowed.', a: false, e: 'It means it is not necessary. You can wear one if you want.' },
      { t: 'order', a: 'You shouldn\'t stay up so late.', e: 'Subject + shouldn’t + base verb.' }
    ]
  }
);
