/* LinguaPath — conversation scenarios for "Speak & Communicate".
   nodes: { id: { say, sk, o: [[learnerText, quality, feedback, nextId], ...] } }  quality: good | ok | bad
   End nodes have end: true. The conversation branches depending on the learner's choices. */
window.LP = window.LP || {};

LP.SCENARIOS = [
  {
    id: 'sc-introduce', level: 'A1', title: 'Introducing Yourself', category: 'speaking',
    situation: 'It is your first day at an English course. The teacher asks you some questions.',
    you: 'Alex, a new student', them: 'Ms Clark, the teacher', themName: 'Ms Clark',
    phrases: [['My name is…', 'Volám sa…'], ['I’m from…', 'Som z…'], ['I’m a student.', 'Som študent.'], ['Nice to meet you.', 'Teší ma.'], ['Because I want to…', 'Pretože chcem…']],
    vocab: [['name', 'what people call you'], ['from', 'where you come from'], ['learn', 'get new knowledge']],
    start: 'n1',
    nodes: {
      n1: { say: 'Hello! Welcome to the class. What’s your name?', sk: 'Ahoj! Vitaj v triede. Ako sa voláš?', o: [
        ['Hello! My name is Alex.', 'good', 'Perfect. “My name is…” is the most common way to say your name.', 'n2'],
        ['Alex.', 'ok', 'This is OK, but a full sentence is friendlier: “My name is Alex.”', 'n2'],
        ['I name Alex.', 'bad', '“I name” is not correct. Say “My name is Alex” or “I’m Alex”.', 'n1b']] },
      n1b: { say: 'Sorry? Is your name Alex?', sk: 'Prepáč? Voláš sa Alex?', o: [
        ['Yes, my name is Alex.', 'good', 'Great correction! Now it is clear.', 'n2'],
        ['Yes, I am.', 'good', 'Correct short answer: “Yes, I am.”', 'n2'],
        ['Yes, name Alex.', 'bad', 'You need a verb. Say “Yes, my name is Alex.”', 'n2']] },
      n2: { say: 'Nice to meet you, Alex. Where are you from?', sk: 'Teší ma, Alex. Odkiaľ si?', o: [
        ['I’m from Slovakia.', 'good', 'Correct. “I’m from” + country.', 'n3'],
        ['I from Slovakia.', 'bad', 'You need the verb “am”: “I am (I’m) from Slovakia.”', 'n3'],
        ['From Slovakia.', 'ok', 'People say this in fast conversation, but a full sentence is better for practice: “I’m from Slovakia.”', 'n3']] },
      n3: { say: 'Oh, great! And what do you do?', sk: 'Ó, super! A čo robíš?', o: [
        ['I’m a student.', 'good', 'Correct. Use “a” before a job: “I’m a student.”', 'n4'],
        ['I am student.', 'ok', 'Almost! Add “a”: “I am a student.”', 'n4'],
        ['I do student.', 'bad', '“What do you do?” asks about your job. Answer with “I’m a…”.', 'n4']] },
      n4: { say: 'Why are you learning English?', sk: 'Prečo sa učíš angličtinu?', o: [
        ['Because I want to travel.', 'good', 'Good! Answer “Why…?” questions with “Because…”.', 'n5'],
        ['For my job. I work in a hotel.', 'good', 'Great answer with extra information.', 'n5'],
        ['Yes, I am.', 'bad', 'This does not answer “Why…?”. Start with “Because…”.', 'n5']] },
      n5: { say: 'Wonderful. It’s nice to have you here!', sk: 'Výborne. Som rada, že si tu!', o: [
        ['Thank you! Nice to meet you too.', 'good', 'Polite and natural.', 'end'],
        ['Thanks. You too.', 'ok', 'Fine in conversation. “Nice to meet you too” is a little more complete.', 'end'],
        ['Me too nice.', 'bad', 'Word order problem. Say “Nice to meet you too.”', 'end']] },
      end: { say: 'Please sit down. Let’s start the lesson!', sk: 'Posaď sa, prosím. Začnime hodinu!', end: true }
    }
  },
  {
    id: 'sc-friend', level: 'A1', title: 'Meeting a New Friend', category: 'speaking',
    situation: 'You are at a friend’s birthday party. Someone you don’t know starts talking to you.',
    you: 'A guest at the party', them: 'Sam, another guest', themName: 'Sam',
    phrases: [['How are you?', 'Ako sa máš?'], ['I’m fine, thanks.', 'Mám sa dobre, ďakujem.'], ['How do you know…?', 'Odkiaľ poznáš…?'], ['Do you like…?', 'Máš rád…?'], ['See you later!', 'Uvidíme sa!']],
    vocab: [['party', 'an event where people meet to have fun'], ['hobby', 'something you do in your free time'], ['music', 'songs and sounds you listen to']],
    start: 'n1',
    nodes: {
      n1: { say: 'Hi! I’m Sam. How are you?', sk: 'Ahoj! Som Sam. Ako sa máš?', o: [
        ['Hi, Sam! I’m fine, thanks. And you?', 'good', 'Excellent. Asking “And you?” is friendly.', 'n2'],
        ['I’m fine.', 'ok', 'Correct, but add “thanks” and ask “And you?” to be friendly.', 'n2'],
        ['I have fine.', 'bad', 'We use “be”, not “have”: “I’m fine.”', 'n2']] },
      n2: { say: 'I’m great, thanks! How do you know Eva?', sk: 'Mám sa super, vďaka! Odkiaľ poznáš Evu?', o: [
        ['We work together.', 'good', 'Perfect present simple sentence.', 'n3a'],
        ['She is my neighbour.', 'good', 'Great answer.', 'n3b'],
        ['I know Eva yes.', 'bad', 'This doesn’t answer “How?”. Say where you know her from: “We work together.”', 'n3a']] },
      n3a: { say: 'Oh, cool. So what do you do in your free time?', sk: 'Aha, super. A čo robíš vo voľnom čase?', o: [
        ['I play tennis and I read books.', 'good', 'Great — two activities with the present simple.', 'n4'],
        ['I like play tennis.', 'ok', 'Say “I like playing tennis” or “I like to play tennis.”', 'n4'],
        ['Free time is tennis.', 'bad', 'Use a verb: “I play tennis.”', 'n4']] },
      n3b: { say: 'Oh, nice! Do you live near here, then?', sk: 'Ó, pekné! Takže bývaš tu niekde blízko?', o: [
        ['Yes, I live on the next street.', 'good', 'Clear and correct.', 'n3a'],
        ['Yes, I do. It’s very close.', 'good', 'Natural short answer plus extra information.', 'n3a'],
        ['Yes, I am live here.', 'bad', 'Don’t use “am” with “live”. Say “Yes, I live here.”', 'n3a']] },
      n4: { say: 'Me too! Do you like music?', sk: 'Ja tiež! Máš rád hudbu?', o: [
        ['Yes, I do. I love pop music.', 'good', 'Correct short answer “Yes, I do” plus detail.', 'n5'],
        ['Yes, I like.', 'ok', '“Like” needs an object: “Yes, I like it” or “Yes, I do.”', 'n5'],
        ['Yes, I am.', 'bad', 'The question uses “do”, so answer “Yes, I do.”', 'n5']] },
      n5: { say: 'Cool! Let’s get a drink. Can I have your number?', sk: 'Super! Poďme si dať niečo na pitie. Môžem dostať tvoje číslo?', o: [
        ['Sure! It’s 0905 123 456.', 'good', 'Friendly and clear.', 'end'],
        ['Yes, of course.', 'ok', 'Fine — but give the number too!', 'end'],
        ['No number.', 'bad', 'This sounds rude. If you don’t want to, say politely: “Maybe later, OK?”', 'end']] },
      end: { say: 'Great! It was nice to meet you.', sk: 'Super! Rád som ťa spoznal.', end: true }
    }
  },
  {
    id: 'sc-cafe', level: 'A1', title: 'Ordering at a Café', category: 'everyday',
    situation: 'You are in a café in London. You want a drink and something to eat.',
    you: 'A customer', them: 'The barista', themName: 'Barista',
    phrases: [['I’d like…, please.', 'Prosím si…'], ['Can I have…?', 'Môžem dostať…?'], ['How much is it?', 'Koľko to stojí?'], ['To take away / to eat in', 'so sebou / tu'], ['Can I pay by card?', 'Môžem platiť kartou?']],
    vocab: [['cappuccino', 'coffee with hot milk and foam'], ['take away', 'take food or drink outside to eat'], ['card', 'a bank card for paying']],
    start: 'n1',
    nodes: {
      n1: { say: 'Hi! What would you like?', sk: 'Dobrý deň! Čo si dáte?', o: [
        ['I’d like a cappuccino, please.', 'good', 'Perfect! “I’d like…, please” is polite and natural.', 'n2'],
        ['Give coffee me.', 'bad', 'The word order is wrong and it sounds rude. Say “Can I have a coffee, please?”', 'n1b'],
        ['I am like cappuccino.', 'bad', '“I am like” means “I am similar to”. Say “I’d like a cappuccino.”', 'n1b']] },
      n1b: { say: 'Sorry, would you like a coffee?', sk: 'Prepáčte, dáte si kávu?', o: [
        ['Yes, please. A cappuccino.', 'good', 'Good recovery!', 'n2'],
        ['Yes, can I have a cappuccino, please?', 'good', 'Very polite.', 'n2'],
        ['Yes. Coffee. Now.', 'bad', 'This sounds rude. Add “please”.', 'n2']] },
      n2: { say: 'Sure. Small or large?', sk: 'Jasné. Malé alebo veľké?', o: [
        ['Large, please.', 'good', 'Short and polite.', 'n3'],
        ['A small one, please.', 'good', 'Correct. “One” replaces “cappuccino”.', 'n3'],
        ['Big size coffee.', 'ok', 'People will understand, but say “Large, please.”', 'n3']] },
      n3: { say: 'Anything to eat?', sk: 'Niečo na jedenie?', o: [
        ['Yes, can I have a croissant, please?', 'good', 'Excellent polite question.', 'n4'],
        ['No, thank you.', 'good', 'Polite and correct.', 'n4'],
        ['I want eat croissant.', 'ok', 'Add “to” and “a”: “I want to eat a croissant.” But “Can I have…?” is more polite.', 'n4']] },
      n4: { say: 'Is that to eat in or to take away?', sk: 'Bude to tu alebo so sebou?', o: [
        ['To take away, please.', 'good', 'Correct.', 'n5'],
        ['To eat in, please.', 'good', 'Correct.', 'n5'],
        ['Yes.', 'bad', 'This is an “or” question. Choose one: “To take away, please.”', 'n4b']] },
      n4b: { say: 'Sorry, here or to take away?', sk: 'Prepáčte, tu alebo so sebou?', o: [
        ['Here, please.', 'good', 'Clear answer.', 'n5'],
        ['To take away, please.', 'good', 'Clear answer.', 'n5'],
        ['Yes, please.', 'bad', 'Choose one option: “Here” or “To take away”.', 'n5']] },
      n5: { say: 'That’s £5.40, please.', sk: 'To bude 5,40 libry, prosím.', o: [
        ['Can I pay by card?', 'good', 'Perfect question.', 'end'],
        ['Here you are.', 'good', 'Natural when you give money.', 'end'],
        ['How many is it?', 'bad', 'For money, use “How much”. But the barista already told you the price!', 'end']] },
      end: { say: 'Thank you! Your drink will be ready in a minute.', sk: 'Ďakujem! Váš nápoj bude hotový o minútku.', end: true }
    }
  },
  // ------------------------- A2 -------------------------
  {
    id: 'sc-shopping', level: 'A2', title: 'Buying Clothes', category: 'everyday',
    situation: 'You are in a clothes shop. You want to buy a jacket.',
    you: 'A customer', them: 'A shop assistant', themName: 'Assistant',
    phrases: [['I’m looking for…', 'Hľadám…'], ['Can I try it on?', 'Môžem si to vyskúšať?'], ['Do you have it in a smaller size?', 'Máte to v menšej veľkosti?'], ['It’s a bit too…', 'Je to trochu príliš…'], ['I’ll take it.', 'Vezmem si to.']],
    vocab: [['fitting room', 'a small room in a shop to try on clothes'], ['size', 'how big clothes are'], ['receipt', 'paper that shows what you paid']],
    start: 'n1',
    nodes: {
      n1: { say: 'Hello! Can I help you?', sk: 'Dobrý deň! Môžem vám pomôcť?', o: [
        ['Yes, please. I’m looking for a winter jacket.', 'good', 'Perfect. “I’m looking for…” is very useful in shops.', 'n2'],
        ['No, thanks. I’m just looking.', 'ok', 'Polite and correct! But in this practice, you need help, so let’s continue.', 'n1b'],
        ['I search jacket.', 'bad', 'Say “I’m looking for a jacket.”', 'n2']] },
      n1b: { say: 'No problem. Let me know if you need anything.', sk: 'Žiadny problém. Dajte vedieť, ak niečo budete potrebovať.', o: [
        ['Actually, do you have any winter jackets?', 'good', '“Actually” is a natural way to change your mind.', 'n2'],
        ['Excuse me, where are the jackets?', 'good', 'Clear and polite.', 'n2'],
        ['Jackets where?', 'bad', 'Make a full question: “Where are the jackets?”', 'n2']] },
      n2: { say: 'Of course. They’re over here. What size are you?', sk: 'Samozrejme. Sú tu. Akú máte veľkosť?', o: [
        ['I’m a medium, I think.', 'good', 'Natural answer.', 'n3'],
        ['Medium, please.', 'good', 'Short and polite.', 'n3'],
        ['I have medium years.', 'bad', 'Size is not age. Say “I’m a medium.”', 'n3']] },
      n3: { say: 'How about this one? It’s on sale this week.', sk: 'Čo tak táto? Tento týždeň je v zľave.', o: [
        ['It looks nice. Can I try it on?', 'good', 'Great — “try on” is the correct phrasal verb.', 'n4'],
        ['How much is it?', 'good', 'Useful question.', 'n3b'],
        ['Can I test it?', 'ok', 'People understand, but for clothes we say “try it on”.', 'n4']] },
      n3b: { say: 'It was 90 euros, but now it’s 60. That’s a 30-euro discount.', sk: 'Stála 90 eur, ale teraz je za 60. To je zľava 30 eur.', o: [
        ['That’s a good price. Can I try it on?', 'good', 'Excellent.', 'n4'],
        ['Great. Where is the fitting room?', 'good', 'Correct question.', 'n4'],
        ['It is more cheap.', 'bad', 'Say “It’s cheaper” (comparative).', 'n4']] },
      n4: { say: 'The fitting room is over there. How is it?', sk: 'Kabínka je tamto. Ako vám sedí?', o: [
        ['It’s a bit too big. Do you have it in a smaller size?', 'good', 'Perfect — clear problem and polite question.', 'n5a'],
        ['It’s perfect. I’ll take it.', 'good', 'Natural decision.', 'n6'],
        ['It is too much big.', 'bad', 'Say “It’s too big” — not “too much big”.', 'n5a']] },
      n5a: { say: 'Let me check. Yes, here’s a small. Try this one.', sk: 'Pozriem sa. Áno, tu je S-ko. Skúste túto.', o: [
        ['Thanks. Yes, this one fits. I’ll take it.', 'good', 'Great!', 'n6'],
        ['This fits well. I take it.', 'ok', 'Say “I’ll take it” — use “will” for a decision made now.', 'n6'],
        ['Good. Is fit.', 'bad', 'You need a subject: “It fits.”', 'n6']] },
      n6: { say: 'Great choice. How would you like to pay?', sk: 'Dobrá voľba. Ako chcete platiť?', o: [
        ['By card, please.', 'good', 'Correct preposition: “by card”.', 'end'],
        ['In cash.', 'good', 'Correct: “in cash”.', 'end'],
        ['With money of card.', 'bad', 'Say “by card” or “in cash”.', 'end']] },
      end: { say: 'Here’s your receipt. Have a nice day!', sk: 'Tu je váš blok. Pekný deň!', end: true }
    }
  },
  {
    id: 'sc-directions', level: 'A2', title: 'Asking for Directions', category: 'everyday',
    situation: 'You are a tourist in a town. You want to find the museum.',
    you: 'A tourist', them: 'A local person', themName: 'Local',
    phrases: [['Excuse me, how do I get to…?', 'Prepáčte, ako sa dostanem k…?'], ['Is it far?', 'Je to ďaleko?'], ['Could you repeat that, please?', 'Mohli by ste to zopakovať?'], ['Turn left / right', 'Odbočte doľava / doprava'], ['Go straight on', 'Choďte rovno']],
    vocab: [['traffic lights', 'red, yellow and green lights for cars'], ['crossroads', 'where two roads meet'], ['on foot', 'walking']],
    start: 'n1',
    nodes: {
      n1: { say: 'Hi there. You look lost. Can I help?', sk: 'Dobrý deň. Vyzeráte, že ste sa stratili. Môžem pomôcť?', o: [
        ['Yes, please. How do I get to the museum?', 'good', 'Perfect question for directions.', 'n2'],
        ['Excuse me, where is the museum?', 'good', 'Simple and correct.', 'n2'],
        ['Where museum is?', 'bad', 'Question word order: “Where is the museum?”', 'n2']] },
      n2: { say: 'The museum? Go straight on to the traffic lights, then turn left. It’s next to the bank.', sk: 'Múzeum? Choďte rovno k semaforu, potom odbočte doľava. Je vedľa banky.', o: [
        ['Sorry, could you repeat that, please?', 'good', 'Very useful! It is always OK to ask someone to repeat.', 'n2b'],
        ['Straight on, then left at the traffic lights. Thanks!', 'good', 'Excellent — repeating directions helps you remember.', 'n3'],
        ['I not understand.', 'bad', 'Say “I don’t understand” or “Could you repeat that, please?”', 'n2b']] },
      n2b: { say: 'Sure. Go straight on. At the traffic lights, turn left. The museum is next to the bank.', sk: 'Jasné. Choďte rovno. Na semafore odbočte doľava. Múzeum je vedľa banky.', o: [
        ['Thank you. Is it far?', 'good', 'Good follow-up question.', 'n3'],
        ['OK, now I understand. Thanks!', 'good', 'Natural.', 'n3'],
        ['Is far?', 'bad', 'You need “it”: “Is it far?”', 'n3']] },
      n3: { say: 'No, not really. It’s about five minutes on foot.', sk: 'Nie, nie veľmi. Asi päť minút pešo.', o: [
        ['Great. And is it open today?', 'good', 'Good question.', 'n4'],
        ['Can I take a bus?', 'ok', 'Correct, but for five minutes you can walk!', 'n4b'],
        ['It is on foot five minutes?', 'bad', 'The local already told you. Say “Thanks” or ask another question.', 'n4']] },
      n4: { say: 'Yes, it’s open until six. But it’s closed on Mondays.', sk: 'Áno, je otvorené do šiestej. Ale v pondelok je zatvorené.', o: [
        ['Perfect. Thank you very much for your help!', 'good', 'Polite thank-you.', 'end'],
        ['Thanks a lot!', 'good', 'Friendly and natural.', 'end'],
        ['OK. Bye.', 'ok', 'Correct, but add “thank you” — the person helped you.', 'end']] },
      n4b: { say: 'You can, but walking is faster. The bus goes the long way round.', sk: 'Môžete, ale pešo je to rýchlejšie. Autobus ide okľukou.', o: [
        ['OK, I’ll walk then. Thank you!', 'good', '“I’ll” for a decision made now — perfect.', 'end'],
        ['Then I walk. Thanks.', 'ok', 'Say “Then I’ll walk.”', 'end'],
        ['Bus is more fast.', 'bad', 'Say “faster”. And the local said walking is faster!', 'end']] },
      end: { say: 'You’re welcome. Enjoy the museum!', sk: 'Nie je za čo. Užite si múzeum!', end: true }
    }
  },
  {
    id: 'sc-hotel', level: 'A2', title: 'Booking a Hotel Room', category: 'everyday',
    situation: 'You call a hotel to book a room for your holiday.',
    you: 'A guest', them: 'The hotel receptionist', themName: 'Receptionist',
    phrases: [['I’d like to book a room.', 'Chcel by som si rezervovať izbu.'], ['For two nights', 'Na dve noci'], ['Is breakfast included?', 'Sú raňajky v cene?'], ['What time is check-in?', 'O koľkej je ubytovanie?'], ['Could you spell that?', 'Mohli by ste to hláskovať?']],
    vocab: [['double room', 'a room for two people'], ['included', 'part of the price'], ['check-in', 'when you arrive at a hotel']],
    start: 'n1',
    nodes: {
      n1: { say: 'Good afternoon, Hotel Panorama. How can I help you?', sk: 'Dobrý deň, hotel Panorama. Ako vám môžem pomôcť?', o: [
        ['Hello. I’d like to book a room, please.', 'good', 'Perfect opening.', 'n2'],
        ['I want room.', 'ok', 'Add “a” and “please”: “I’d like a room, please.”', 'n2'],
        ['I book hotel yesterday.', 'bad', 'This is confusing. Say “I’d like to book a room.”', 'n2']] },
      n2: { say: 'Of course. For which dates?', sk: 'Samozrejme. Na aké dátumy?', o: [
        ['From the 12th to the 14th of July.', 'good', 'Correct way to say dates.', 'n3'],
        ['For two nights, from Friday to Sunday.', 'good', 'Clear and helpful.', 'n3'],
        ['July is good.', 'ok', 'The receptionist needs exact dates: “From the 12th to the 14th of July.”', 'n3']] },
      n3: { say: 'Would you like a single or a double room?', sk: 'Chcete jednolôžkovú alebo dvojlôžkovú izbu?', o: [
        ['A double room, please.', 'good', 'Correct.', 'n4'],
        ['A single room, please. It’s just me.', 'good', 'Correct with extra information.', 'n4'],
        ['Yes, please.', 'bad', 'This is an “or” question. Choose: “A double room, please.”', 'n3']] },
      n4: { say: 'We have a room available. It’s 85 euros per night.', sk: 'Máme voľnú izbu. Stojí 85 eur za noc.', o: [
        ['Is breakfast included?', 'good', 'Very useful question.', 'n5'],
        ['That’s fine. I’ll take it.', 'good', 'Clear decision.', 'n5b'],
        ['Is breakfast include?', 'ok', 'Say “included” (past participle).', 'n5']] },
      n5: { say: 'Yes, breakfast is included. It’s from seven to ten.', sk: 'Áno, raňajky sú v cene. Sú od siedmej do desiatej.', o: [
        ['Great. I’ll take it, then.', 'good', 'Natural decision.', 'n5b'],
        ['Perfect. And what time is check-in?', 'good', 'Another useful question.', 'n5c'],
        ['Good, I take.', 'bad', 'Say “I’ll take it.”', 'n5b']] },
      n5c: { say: 'Check-in is from two p.m., and check-out is at eleven.', sk: 'Ubytovanie je od druhej popoludní a odchod do jedenástej.', o: [
        ['Thank you. I’d like to book it, please.', 'good', 'Polite.', 'n5b'],
        ['OK, book it for me, please.', 'ok', 'Understandable, but “I’d like to book it” is more polite.', 'n5b'],
        ['Is check-in at two?', 'ok', 'The receptionist just told you. Listen carefully!', 'n5b']] },
      n5b: { say: 'Lovely. Can I have your name, please?', sk: 'Výborne. Môžem poprosiť vaše meno?', o: [
        ['Yes, it’s Maria Kováčová. Shall I spell it?', 'good', 'Very helpful — names are often difficult on the phone.', 'end'],
        ['My name is Maria Kováčová.', 'good', 'Correct.', 'end'],
        ['I am calling Maria.', 'bad', '“I am calling” means “telephoning”. Say “My name is Maria.”', 'end']] },
      end: { say: 'Thank you. Your room is booked. We look forward to seeing you!', sk: 'Ďakujem. Vaša izba je rezervovaná. Tešíme sa na vás!', end: true }
    }
  },
  // ------------------------- B1 -------------------------
  {
    id: 'sc-school-work', level: 'B1', title: 'Talking About Work and Study', category: 'speaking',
    situation: 'At a networking event, you meet someone who asks about your studies and work.',
    you: 'A young professional', them: 'Chris, a manager from another company', themName: 'Chris',
    phrases: [['I’m currently studying…', 'Momentálne študujem…'], ['I work as a…', 'Pracujem ako…'], ['What I enjoy most is…', 'Najviac ma baví…'], ['In the future, I’d like to…', 'V budúcnosti by som chcel…'], ['What about you?', 'A čo ty?']],
    vocab: [['networking', 'meeting people who can help your career'], ['internship', 'a short period of work to get experience'], ['field', 'an area of work or study']],
    start: 'n1',
    nodes: {
      n1: { say: 'Hi, I’m Chris. So, what brings you here tonight?', sk: 'Ahoj, som Chris. Čo ťa sem dnes privádza?', o: [
        ['I’m studying marketing, and I’m looking for an internship.', 'good', 'Clear and relevant — a great first answer.', 'n2'],
        ['My friend invited me.', 'ok', 'Correct, but you could add something about yourself.', 'n1b'],
        ['I am here since one hour.', 'bad', 'Use the present perfect: “I’ve been here for an hour.” And it doesn’t answer “why”.', 'n1b']] },
      n1b: { say: 'Ah, OK. And what do you do?', sk: 'Aha, dobre. A čo robíš?', o: [
        ['I’m a marketing student, and I work part-time in a café.', 'good', 'Great — two pieces of information.', 'n2'],
        ['I study marketing at university.', 'good', 'Clear.', 'n2'],
        ['I am doing marketing studies person.', 'bad', 'Too complicated. Say “I study marketing.”', 'n2']] },
      n2: { say: 'Interesting! What do you enjoy most about it?', sk: 'Zaujímavé! Čo ťa na tom najviac baví?', o: [
        ['What I enjoy most is understanding why people buy things.', 'good', 'Excellent — a natural, specific answer.', 'n3'],
        ['I like it because it’s creative.', 'good', 'Good reason.', 'n3'],
        ['I enjoy to work with people.', 'ok', '“Enjoy” is followed by -ing: “I enjoy working with people.”', 'n3']] },
      n3: { say: 'Have you had any work experience in marketing yet?', sk: 'Mal si už nejakú pracovnú skúsenosť v marketingu?', o: [
        ['Yes, I’ve managed the social media for a local café for a year.', 'good', 'Great use of the present perfect for experience.', 'n4'],
        ['Not yet, but I’ve done several projects at university.', 'good', 'Honest and positive.', 'n4'],
        ['Yes, I have worked there last summer.', 'bad', 'With “last summer” use the past simple: “I worked there last summer.”', 'n4']] },
      n4: { say: 'And where do you see yourself in five years?', sk: 'A kde sa vidíš o päť rokov?', o: [
        ['I’d like to work for an international company, maybe abroad.', 'good', 'Clear future goal.', 'n5'],
        ['I might start my own business, but I’m not sure yet.', 'good', 'Nice use of “might” for possibility.', 'n5'],
        ['I will be rich, sure.', 'ok', 'Confident! But in a professional context, it may sound a bit unserious.', 'n5']] },
      n5: { say: 'Sounds great. Actually, our company has internships in spring. Would you be interested?', sk: 'To znie skvele. Vlastne, naša firma ponúka stáže na jar. Mal by si záujem?', o: [
        ['Definitely! Could you tell me how to apply?', 'good', 'Enthusiastic and polite.', 'end'],
        ['Yes, I would. Can I have your business card?', 'good', 'Professional follow-up.', 'end'],
        ['Maybe. How much you pay?', 'bad', 'Word order: “How much do you pay?” Also, asking about money first may sound impolite.', 'end']] },
      end: { say: 'Here’s my card. Send me your CV next week. It was great to meet you!', sk: 'Tu je moja vizitka. Pošli mi budúci týždeň životopis. Rád som ťa spoznal!', end: true }
    }
  },
  {
    id: 'sc-airport', level: 'B1', title: 'At the Airport', category: 'everyday',
    situation: 'You are checking in for a flight to Dublin, but there is a problem.',
    you: 'A passenger', them: 'An airline check-in agent', themName: 'Agent',
    phrases: [['I’d like to check in for…', 'Chcel by som sa odbaviť na…'], ['Is the flight on time?', 'Je let načas?'], ['What are my options?', 'Aké mám možnosti?'], ['Could I have a window seat?', 'Mohol by som dostať miesto pri okne?'], ['Will I get a meal voucher?', 'Dostanem poukážku na jedlo?']],
    vocab: [['boarding pass', 'a document you need to get on a plane'], ['delayed', 'later than planned'], ['hand luggage', 'a small bag you take on the plane']],
    start: 'n1',
    nodes: {
      n1: { say: 'Good morning. Where are you flying to today?', sk: 'Dobré ráno. Kam dnes letíte?', o: [
        ['Good morning. I’m flying to Dublin. Here’s my passport.', 'good', 'Polite and efficient.', 'n2'],
        ['To Dublin.', 'ok', 'Correct, but a greeting and full sentence are more polite.', 'n2'],
        ['I fly to Dublin yesterday.', 'bad', 'Use the present continuous for now: “I’m flying to Dublin.”', 'n2']] },
      n2: { say: 'Thank you. Do you have any bags to check in?', sk: 'Ďakujem. Máte nejakú batožinu na odbavenie?', o: [
        ['Just this suitcase. I’ll keep the backpack as hand luggage.', 'good', 'Clear and detailed.', 'n3'],
        ['Yes, one suitcase.', 'good', 'Clear.', 'n3'],
        ['I have two luggages.', 'bad', '“Luggage” is uncountable. Say “two bags” or “two pieces of luggage”.', 'n3']] },
      n3: { say: 'I’m afraid your flight has been delayed by three hours due to bad weather.', sk: 'Obávam sa, že váš let mešká tri hodiny kvôli zlému počasiu.', o: [
        ['Oh no. I have a connecting flight. What are my options?', 'good', 'Calm and practical — excellent.', 'n4a'],
        ['That’s a shame. Will I get a meal voucher?', 'good', 'Useful question.', 'n4b'],
        ['This is terrible! You must fix it now!', 'bad', 'Understandable feeling, but rude. Staff help more when you stay polite.', 'n4b']] },
      n4a: { say: 'Let me check. I can put you on a later connection at no extra cost.', sk: 'Pozriem sa. Môžem vás bez príplatku presunúť na neskorší prípoj.', o: [
        ['That would be great, thank you.', 'good', '“That would be great” is a polite way to accept.', 'n5'],
        ['OK. When does it leave?', 'good', 'Practical question.', 'n5'],
        ['Fine, give.', 'bad', 'Too short and rude. Say “Yes, please. Thank you.”', 'n5']] },
      n4b: { say: 'Yes, here’s a voucher for 15 euros. You can use it at any café.', sk: 'Áno, tu je poukážka na 15 eur. Môžete ju použiť v ktorejkoľvek kaviarni.', o: [
        ['Thank you. Could I have a window seat, please?', 'good', 'Polite request.', 'n5'],
        ['Thanks. Is there anywhere quiet to work?', 'good', 'Good question.', 'n5'],
        ['Only 15? It’s nothing.', 'bad', 'This sounds rude. You can ask politely if more help is possible.', 'n5']] },
      n5: { say: 'Here’s your boarding pass. Boarding starts at gate B12 at 2:15.', sk: 'Tu je váš palubný lístok. Nástup začína pri bráne B12 o 14:15.', o: [
        ['Gate B12 at 2:15. Thanks for your help!', 'good', 'Repeating information helps you avoid mistakes.', 'end'],
        ['Thank you. Have a nice day.', 'good', 'Polite.', 'end'],
        ['Where is gate?', 'ok', 'Add “the”: “Where is the gate?” — and say thank you!', 'end']] },
      end: { say: 'You’re welcome. Have a safe flight!', sk: 'Nie je za čo. Šťastný let!', end: true }
    }
  },
  {
    id: 'sc-hobbies', level: 'B1', title: 'Talking About Hobbies', category: 'speaking',
    situation: 'A new colleague asks you about your free time during a lunch break.',
    you: 'An employee', them: 'Jo, a new colleague', themName: 'Jo',
    phrases: [['I’m really into…', 'Veľmi ma baví…'], ['I’ve been doing it for…', 'Robím to už…'], ['Have you ever tried…?', 'Skúsil si niekedy…?'], ['If you like, you could…', 'Ak chceš, mohol by si…'], ['That sounds fun!', 'To znie zábavne!']],
    vocab: [['be into', 'like very much'], ['climbing', 'going up rocks or walls'], ['beginner', 'a person who is starting to learn']],
    start: 'n1',
    nodes: {
      n1: { say: 'So, what do you like doing when you’re not at work?', sk: 'Tak, čo rád robíš, keď nie si v práci?', o: [
        ['I’m really into climbing. I go to a climbing centre twice a week.', 'good', 'Great — natural phrase plus detail.', 'n2'],
        ['I like reading and cooking.', 'good', 'Clear and correct.', 'n2b'],
        ['I like to watching films.', 'bad', 'Say “I like watching films” or “I like to watch films.”', 'n2b']] },
      n2: { say: 'Climbing? Wow! How long have you been doing that?', sk: 'Lezenie? Páni! Ako dlho to už robíš?', o: [
        ['I’ve been climbing for about three years.', 'good', 'Perfect present perfect continuous with “for”.', 'n3'],
        ['Since three years.', 'bad', 'Use “for” with a period: “for three years”.', 'n3'],
        ['I started three years ago.', 'good', 'Correct past simple with “ago”.', 'n3']] },
      n2b: { say: 'Nice! What kind of things do you cook?', sk: 'Pekné! Čo varíš?', o: [
        ['Mostly Italian food. I make really good pasta.', 'good', 'Specific and friendly.', 'n3'],
        ['Everything, but especially soups.', 'good', 'Natural answer.', 'n3'],
        ['I cook food.', 'ok', 'True! But give more detail to keep the conversation going.', 'n3']] },
      n3: { say: 'That sounds great. I’ve always wanted to try something new.', sk: 'To znie super. Vždy som chcel skúsiť niečo nové.', o: [
        ['Have you ever tried it? If you like, you could come with me one day.', 'good', 'Inviting someone is a great way to build a relationship.', 'n4'],
        ['You should try it! It’s not as difficult as it looks.', 'good', 'Encouraging and correct comparative structure.', 'n4'],
        ['Yes, new things good.', 'bad', 'You need a verb: “New things are good.”', 'n4']] },
      n4: { say: 'Really? But I’m a total beginner.', sk: 'Naozaj? Ale som úplný začiatočník.', o: [
        ['Don’t worry. Everyone starts as a beginner.', 'good', 'Kind and encouraging.', 'n5'],
        ['No problem. The instructors are very patient.', 'good', 'Reassuring.', 'n5'],
        ['Then is not possible.', 'bad', 'This is unkind and grammatically wrong (it is not possible).', 'n5']] },
      n5: { say: 'OK, why not? When do you usually go?', sk: 'Dobre, prečo nie? Kedy zvyčajne chodíš?', o: [
        ['On Tuesdays and Thursdays after work. Shall we go this Thursday?', 'good', 'Clear plan with a suggestion.', 'end'],
        ['Usually on weekends. I’ll send you the details.', 'good', '“I’ll” for an offer — perfect.', 'end'],
        ['I am going usually Tuesday.', 'ok', 'For habits, use the present simple: “I usually go on Tuesdays.”', 'end']] },
      end: { say: 'Perfect, it’s a plan! Thanks for inviting me.', sk: 'Výborne, platí! Ďakujem za pozvanie.', end: true }
    }
  },
  // ------------------------- B2 -------------------------
  {
    id: 'sc-interview', level: 'B2', title: 'A Job Interview', category: 'speaking',
    situation: 'You are interviewing for a project coordinator position at an international company.',
    you: 'The candidate', them: 'Ms Hayes, HR manager', themName: 'Ms Hayes',
    phrases: [['I have experience in…', 'Mám skúsenosti s…'], ['One of my strengths is…', 'Jednou z mojich silných stránok je…'], ['For example, in my last job…', 'Napríklad v mojej poslednej práci…'], ['I’m working on improving…', 'Pracujem na zlepšení…'], ['Could you tell me more about…?', 'Mohli by ste mi povedať viac o…?']],
    vocab: [['candidate', 'a person applying for a job'], ['strength', 'a good quality'], ['deadline', 'the time when work must be finished']],
    start: 'n1',
    nodes: {
      n1: { say: 'Thank you for coming. Could you start by telling me a little about yourself?', sk: 'Ďakujem, že ste prišli. Mohli by ste na úvod povedať niečo o sebe?', o: [
        ['Certainly. I’ve worked in project coordination for three years, mainly in logistics, and I enjoy organising complex tasks.', 'good', 'Professional, relevant and concise.', 'n2'],
        ['I was born in 1998 and I like football and music.', 'ok', 'Personal details are less relevant. Focus on your professional experience.', 'n2'],
        ['Everything is in my CV.', 'bad', 'This sounds unhelpful. Interviewers want to hear you summarise it.', 'n1b']] },
      n1b: { say: 'Yes, I’ve read it. But I’d like to hear it in your own words.', sk: 'Áno, čítala som ho. Ale chcela by som to počuť vašimi slovami.', o: [
        ['Of course. I’ve coordinated international projects for three years, mostly in logistics.', 'good', 'Good recovery.', 'n2'],
        ['Sorry. I have three years’ experience as a project assistant and coordinator.', 'good', 'Polite and relevant.', 'n2'],
        ['OK. I am working since 2021 in logistics.', 'bad', 'Use the present perfect: “I have worked in logistics since 2021.”', 'n2']] },
      n2: { say: 'What would you say is your greatest strength?', sk: 'Čo by ste označili za svoju najväčšiu silnú stránku?', o: [
        ['I’d say it’s communication. For example, I recently helped two teams agree on a schedule that both had rejected.', 'good', 'A strength with a concrete example — ideal.', 'n3'],
        ['I’m very hard-working and organised.', 'ok', 'Fine, but add a specific example to make it convincing.', 'n3'],
        ['I have no weaknesses.', 'bad', 'This doesn’t answer the question and sounds arrogant.', 'n3']] },
      n3: { say: 'And what about a weakness?', sk: 'A čo nejaká slabá stránka?', o: [
        ['I sometimes find it hard to delegate, but I’m working on it by sharing tasks earlier in each project.', 'good', 'Honest weakness plus a plan to improve — excellent.', 'n4'],
        ['I’m a perfectionist.', 'ok', 'Very common answer. Interviewers prefer something more honest with an improvement plan.', 'n4'],
        ['I’m always late for work.', 'bad', 'Too honest! Choose a weakness that won’t disqualify you.', 'n4']] },
      n4: { say: 'Tell me about a time you had to deal with a difficult deadline.', sk: 'Povedzte mi o situácii, keď ste museli zvládnuť náročný termín.', o: [
        ['Last year, a client moved a deadline forward by a week. I reorganised the schedule, prioritised the key tasks, and we delivered on time.', 'good', 'Clear situation, action and result.', 'n5'],
        ['I always meet deadlines. It’s never a problem.', 'ok', 'Give a specific example — interviewers want evidence.', 'n5'],
        ['When the deadline was too short, I have told my boss it is impossible.', 'bad', 'Tense mistake (use “I told”), and the answer shows no problem-solving.', 'n5']] },
      n5: { say: 'Thank you. Do you have any questions for us?', sk: 'Ďakujem. Máte na nás nejaké otázky?', o: [
        ['Yes. Could you tell me more about how the team measures success in this role?', 'good', 'An excellent, thoughtful question.', 'end'],
        ['What are the next steps in the process?', 'good', 'Useful and professional.', 'end'],
        ['No.', 'bad', 'Always ask at least one question. It shows interest.', 'end']] },
      end: { say: 'Great. We’ll be in touch by the end of next week. Thank you for your time.', sk: 'Výborne. Ozveme sa do konca budúceho týždňa. Ďakujem za váš čas.', end: true }
    }
  },
  {
    id: 'sc-problem', level: 'B2', title: 'Solving a Problem', category: 'speaking',
    situation: 'Your new laptop stopped working after one week. You return to the shop to solve the problem.',
    you: 'A customer', them: 'A customer service assistant', themName: 'Assistant',
    phrases: [['I’m afraid there’s a problem with…', 'Obávam sa, že je problém s…'], ['I’d like a replacement or a refund.', 'Chcel by som výmenu alebo vrátenie peňazí.'], ['Would it be possible to…?', 'Bolo by možné…?'], ['I understand, but…', 'Rozumiem, ale…'], ['Could I speak to the manager?', 'Mohol by som hovoriť s vedúcim?']],
    vocab: [['refund', 'money given back'], ['replacement', 'a new item instead of the broken one'], ['warranty', 'a promise to repair a product']],
    start: 'n1',
    nodes: {
      n1: { say: 'Hello, how can I help you today?', sk: 'Dobrý deň, ako vám dnes môžem pomôcť?', o: [
        ['Hi. I’m afraid there’s a problem with a laptop I bought here last week. It won’t turn on.', 'good', 'Polite, clear, with all key details.', 'n2'],
        ['Your laptop is broken.', 'ok', 'Clear, but sounds a bit aggressive. “I’m afraid there’s a problem with…” is softer.', 'n2'],
        ['I bought this rubbish here and I want my money now!', 'bad', 'Anger rarely helps. Describe the problem calmly first.', 'n1b']] },
      n1b: { say: 'I understand you’re upset. Could you tell me what exactly happened?', sk: 'Chápem, že ste rozrušený. Môžete mi povedať, čo presne sa stalo?', o: [
        ['Sorry, I’m just frustrated. It stopped working after a week. It won’t turn on at all.', 'good', 'Apologising and explaining calmly — a great recovery.', 'n2'],
        ['It just doesn’t work. That’s all.', 'ok', 'More detail would help the assistant.', 'n2'],
        ['It is broken since Monday.', 'bad', 'Use the present perfect: “It has been broken since Monday.”', 'n2']] },
      n2: { say: 'I’m sorry to hear that. Do you have the receipt?', sk: 'To ma mrzí. Máte pokladničný doklad?', o: [
        ['Yes, here it is. I’d prefer a replacement, if possible.', 'good', 'Helpful, and you state what you want politely.', 'n3a'],
        ['Yes. I’d like a refund, please.', 'good', 'Clear and polite.', 'n3b'],
        ['No, but you must believe me.', 'ok', 'Possible, but harder. You can offer other proof, such as a bank statement.', 'n3c']] },
      n3a: { say: 'Unfortunately, that model is out of stock. We could send it for repair, which takes about two weeks.', sk: 'Žiaľ, ten model nemáme na sklade. Mohli by sme ho poslať do opravy, čo trvá asi dva týždne.', o: [
        ['I understand, but I need it for work. Would it be possible to get a similar model instead?', 'good', 'Acknowledging the situation and proposing an alternative — excellent negotiation.', 'n4'],
        ['Two weeks is too long. I’d rather have a refund, then.', 'good', 'Clear preference.', 'n3b'],
        ['That is not acceptable for me, I not wait.', 'bad', 'Grammar: “I won’t wait” / “I can’t wait”. Try proposing a solution.', 'n4']] },
      n3b: { say: 'Let me check our policy. Yes, since it’s within 14 days, we can give you a full refund.', sk: 'Pozriem sa na naše pravidlá. Áno, keďže je to do 14 dní, môžeme vám vrátiť celú sumu.', o: [
        ['That’s great. Thank you for your help.', 'good', 'Polite close.', 'end'],
        ['Perfect. Will the money go back to my card?', 'good', 'Useful clarification.', 'end'],
        ['Finally.', 'bad', 'This sounds rude. A simple “thank you” is better.', 'end']] },
      n3c: { say: 'Without a receipt, I’m afraid I can only offer a repair under warranty.', sk: 'Bez dokladu vám, žiaľ, môžem ponúknuť iba záručnú opravu.', o: [
        ['I paid by card. Could you find the purchase if I show you my bank statement?', 'good', 'Creative, polite problem-solving.', 'n3b'],
        ['OK, a repair is fine.', 'ok', 'Acceptable, though you could have tried another solution.', 'end'],
        ['Could I speak to the manager, please?', 'good', 'A polite way to escalate the problem.', 'n3b']] },
      n4: { say: 'Let me see… Yes, we have a slightly better model. I can offer it at the same price.', sk: 'Pozriem sa… Áno, máme o niečo lepší model. Môžem vám ho ponúknuť za rovnakú cenu.', o: [
        ['That would be perfect. Thank you for finding a solution.', 'good', 'Polite and appreciative.', 'end'],
        ['Great, I’ll take it.', 'good', 'Clear decision.', 'end'],
        ['Is it really better or you say this only?', 'bad', 'Word order: “…or are you just saying that?” Also, it sounds distrustful.', 'end']] },
      end: { say: 'You’re welcome. I’m sorry again for the trouble.', sk: 'Nie je za čo. Ešte raz sa ospravedlňujem za problémy.', end: true }
    }
  },
  {
    id: 'sc-meeting', level: 'B2', title: 'Participating in a Meeting', category: 'speaking',
    situation: 'Your team is discussing how to reduce the number of internal meetings.',
    you: 'A team member', them: 'Daniel, the team leader', themName: 'Daniel',
    phrases: [['Can I just add something?', 'Môžem niečo doplniť?'], ['I see your point, but…', 'Chápem, ale…'], ['What if we…?', 'Čo keby sme…?'], ['To sum up, we’ve agreed that…', 'Zhrnuté, dohodli sme sa, že…'], ['Could you clarify…?', 'Mohli by ste objasniť…?']],
    vocab: [['agenda', 'the list of topics for a meeting'], ['action point', 'a task agreed in a meeting'], ['trial', 'a test period']],
    start: 'n1',
    nodes: {
      n1: { say: 'OK, everyone. The first item on the agenda: we spend too much time in meetings. Any ideas?', sk: 'Dobre, všetci. Prvý bod programu: trávime priveľa času na poradách. Nejaké nápady?', o: [
        ['What if we had a rule that every meeting needs an agenda in advance?', 'good', '“What if we + past simple” is a polite way to make a suggestion.', 'n2'],
        ['We should cancel all meetings.', 'ok', 'A strong idea; you might soften it: “Maybe we could cancel some regular meetings.”', 'n1b'],
        ['Meetings are boring, everybody knows.', 'bad', 'This is not constructive. Offer a solution.', 'n1b']] },
      n1b: { say: 'Hmm, that might be a bit extreme. Can you suggest something more specific?', sk: 'Hmm, to je možno trochu extrémne. Môžeš navrhnúť niečo konkrétnejšie?', o: [
        ['Fair point. Maybe we could replace the daily stand-up with a written update.', 'good', 'Accepting feedback and making a concrete proposal.', 'n2'],
        ['For example, we could limit meetings to 30 minutes.', 'good', 'Specific.', 'n2'],
        ['I don’t know. You are the boss.', 'bad', 'This avoids participating.', 'n2']] },
      n2: { say: 'Interesting. But some people say written updates are often ignored.', sk: 'Zaujímavé. Ale niektorí hovoria, že písomné aktualizácie sa často ignorujú.', o: [
        ['I see your point, but if we keep them short and use a fixed template, people are more likely to read them.', 'good', 'Acknowledge + counterargument + conditional. Excellent.', 'n3'],
        ['That’s true. Maybe we could try it for a month and see.', 'good', 'Suggesting a trial is a constructive compromise.', 'n3'],
        ['No, that’s wrong.', 'bad', 'Too direct for a meeting. Soften disagreement: “I’m not sure that’s always the case.”', 'n3']] },
      n3: { say: 'Sorry, can I just ask what you mean by “a fixed template”?', sk: 'Prepáč, môžem sa spýtať, čo myslíš „pevnou šablónou“?', o: [
        ['Sure. Three questions: what I did yesterday, what I’ll do today, and any problems.', 'good', 'Clear clarification.', 'n4'],
        ['I mean the same format every day, so it only takes two minutes to read.', 'good', 'Clear and explains the benefit.', 'n4'],
        ['A template is a template.', 'bad', 'This doesn’t clarify anything.', 'n4']] },
      n4: { say: 'OK, I like that. Shall we try it?', sk: 'Dobre, to sa mi páči. Skúsime to?', o: [
        ['Yes. To sum up, we’ve agreed to replace the daily meeting with written updates for a one-month trial.', 'good', 'Summarising decisions is a valuable meeting skill.', 'n5'],
        ['Sounds good. Who will prepare the template?', 'good', 'Asking about action points shows responsibility.', 'n5'],
        ['Yes, OK, whatever.', 'bad', 'Sounds uninterested. Show commitment.', 'n5']] },
      n5: { say: 'Great. Could you prepare the template and send it round by Friday?', sk: 'Výborne. Mohol by si pripraviť šablónu a rozposlať ju do piatku?', o: [
        ['Sure, I’ll have it ready by Thursday.', 'good', 'Commitment with “will”.', 'end'],
        ['No problem. I’ll share it in the team channel.', 'good', 'Clear.', 'end'],
        ['I have no time for this.', 'bad', 'If you are busy, explain politely: “I’m quite busy this week. Could someone help me?”', 'end']] },
      end: { say: 'Perfect. Let’s move on to the next item.', sk: 'Výborne. Prejdime na ďalší bod.', end: true }
    }
  },
  // ------------------------- C1 -------------------------
  {
    id: 'sc-debate', level: 'C1', title: 'Expressing Nuanced Opinions', category: 'speaking',
    situation: 'At a dinner party, a guest claims that social media has completely destroyed real friendship.',
    you: 'A guest', them: 'Robert, another guest', themName: 'Robert',
    phrases: [['I see where you’re coming from, but…', 'Chápem, odkiaľ to berieš, ale…'], ['To some extent, I agree.', 'Do istej miery súhlasím.'], ['It depends on…', 'Záleží na…'], ['Isn’t it also true that…?', 'Nie je pravda aj to, že…?'], ['I’d go as far as to say…', 'Dokonca by som povedal…']],
    vocab: [['nuanced', 'showing small differences'], ['concede', 'admit something is true'], ['sweeping statement', 'a claim that is too general']],
    start: 'n1',
    nodes: {
      n1: { say: 'Honestly, social media has completely destroyed real friendship. Nobody talks face to face anymore.', sk: 'Úprimne, sociálne siete úplne zničili skutočné priateľstvo. Nikto sa už nerozpráva zoči-voči.', o: [
        ['I see where you’re coming from, but isn’t that a bit of a sweeping statement?', 'good', 'You acknowledge his view and politely challenge the generalisation.', 'n2'],
        ['To some extent, I agree. People do seem more distracted.', 'good', 'Partial agreement — a nuanced start.', 'n2b'],
        ['That’s completely wrong.', 'bad', 'Too blunt for a social debate. Acknowledge first, then disagree.', 'n1b']] },
      n1b: { say: 'Wrong? Come on, look around any restaurant. Everyone’s on their phone.', sk: 'Zle? No tak, pozri sa v hocijakej reštaurácii. Všetci sú na mobile.', o: [
        ['Fair enough, I put that too strongly. What I meant is that it’s more complicated.', 'good', 'Backing down gracefully keeps the discussion friendly.', 'n2'],
        ['Sure, but that doesn’t necessarily mean their friendships are worse.', 'good', 'A precise counterargument.', 'n2'],
        ['You are just old.', 'bad', 'A personal attack ends a real debate.', 'n2']] },
      n2: { say: 'More complicated how? People have hundreds of “friends” but nobody to call.', sk: 'Komplikovanejšie ako? Ľudia majú stovky „priateľov“, ale nikoho, komu by zavolali.', o: [
        ['For some people, yes. But for others, especially those who live far from family, it’s arguably a lifeline.', 'good', 'Distinguishing between groups is the essence of a nuanced argument.', 'n3'],
        ['It depends on how you use it. Passive scrolling and active messaging have very different effects.', 'good', 'Excellent distinction.', 'n3'],
        ['Everybody has friends to call.', 'bad', 'Another sweeping statement — the same problem you criticised.', 'n3']] },
      n2b: { say: 'Exactly! So you agree it’s a disaster.', sk: 'Presne! Takže súhlasíš, že je to katastrofa.', o: [
        ['Not quite. I’d concede it has costs, but “disaster” seems too strong.', 'good', 'Precise partial agreement.', 'n3'],
        ['I wouldn’t go that far. It depends a lot on how people use it.', 'good', 'Natural hedging.', 'n3'],
        ['Yes, totally.', 'ok', 'You can agree, of course — but it contradicts your nuanced first point.', 'n3']] },
      n3: { say: 'Hmm. But surely the research shows that loneliness has increased?', sk: 'Hmm. Ale výskum predsa ukazuje, že osamelosť sa zvýšila?', o: [
        ['Some studies suggest that, but correlation isn’t causation. Other factors, like longer working hours, may play a role.', 'good', 'Sophisticated, evidence-based reasoning.', 'n4'],
        ['I’m not an expert, but I’ve read that the evidence is quite mixed.', 'good', 'Honest hedging.', 'n4'],
        ['Research is always wrong.', 'bad', 'This dismisses evidence without reason.', 'n4']] },
      n4: { say: 'Well, I suppose you have a point. So what’s your conclusion?', sk: 'No, asi máš pravdu. Aký je teda tvoj záver?', o: [
        ['On balance, I’d say social media changes friendship rather than destroys it. The real question is how we use it.', 'good', 'A balanced, well-formulated conclusion.', 'end'],
        ['By and large, I think it’s neutral. It amplifies whatever habits we already have.', 'good', 'Interesting and nuanced.', 'end'],
        ['I win.', 'bad', 'A debate isn’t a competition. Summarise your view instead.', 'end']] },
      end: { say: 'Fair enough. I might have to rethink my position. More wine?', sk: 'Dobre teda. Asi budem musieť prehodnotiť svoj postoj. Ešte víno?', end: true }
    }
  },
  {
    id: 'sc-negotiation', level: 'C1', title: 'Negotiating a Deadline', category: 'speaking',
    situation: 'A client wants a project delivered two weeks early. You need to protect quality while keeping a good relationship.',
    you: 'The project lead', them: 'Ms Novak, the client', themName: 'Ms Novak',
    phrases: [['I completely understand the pressure you’re under.', 'Úplne chápem tlak, pod ktorým ste.'], ['What we could do is…', 'Čo by sme mohli urobiť, je…'], ['Would you be open to…?', 'Boli by ste otvorená…?'], ['The risk there would be…', 'Riziko by bolo…'], ['Let me see what I can do.', 'Uvidím, čo sa dá robiť.']],
    vocab: [['phased delivery', 'delivering a project in parts'], ['scope', 'the amount of work included'], ['compromise', 'an agreement where both sides give something']],
    start: 'n1',
    nodes: {
      n1: { say: 'I’ll be direct: our board meeting has moved, so we need the full platform two weeks earlier.', sk: 'Budem priama: naše zasadnutie predstavenstva sa presunulo, takže potrebujeme celú platformu o dva týždne skôr.', o: [
        ['I completely understand the pressure you’re under. Could you tell me which features are essential for the board meeting?', 'good', 'Empathy plus a question that opens room for negotiation.', 'n2'],
        ['That’s impossible.', 'bad', 'Too blunt, and it closes the discussion immediately.', 'n1b'],
        ['We’ll try our best.', 'ok', 'Polite, but vague promises can create problems later.', 'n1b']] },
      n1b: { say: 'I’m afraid I need more than that. This is critical for us.', sk: 'Obávam sa, že potrebujem viac. Je to pre nás kľúčové.', o: [
        ['Of course. Let me be more specific. What exactly will the board need to see?', 'good', 'Moving the conversation towards concrete needs.', 'n2'],
        ['I hear you. What we could do is look at which parts are needed first.', 'good', 'Constructive reframing.', 'n2'],
        ['Then you should have planned better.', 'bad', 'Blaming the client damages the relationship.', 'n2']] },
      n2: { say: 'Mainly the dashboard and the reporting tools. The rest is less urgent.', sk: 'Hlavne dashboard a nástroje na reporting. Zvyšok nie je taký naliehavý.', o: [
        ['In that case, would you be open to a phased delivery? We could deliver those two modules early and the rest on the original date.', 'good', 'A precise, creative compromise.', 'n3'],
        ['Great, so we could focus on those first.', 'good', 'Good direction; the details can follow.', 'n3'],
        ['So the rest isn’t important at all?', 'ok', 'Clarifying is fine, but it may sound slightly sarcastic.', 'n3']] },
      n3: { say: 'That could work. But couldn’t your team just work faster on everything?', sk: 'To by mohlo fungovať. Ale nemohol by váš tím jednoducho pracovať rýchlejšie na všetkom?', o: [
        ['We could add people, but the risk there would be more bugs. Rushing the testing phase is rarely a saving in the end.', 'good', 'Explaining the risk diplomatically.', 'n4'],
        ['I’d rather not promise something we can’t deliver to the standard you expect.', 'good', 'Tactful and honest.', 'n4'],
        ['No, my team is already exhausted because of you.', 'bad', 'Emotional and accusatory.', 'n4']] },
      n4: { say: 'All right. A phased delivery, then. But I’ll need the dashboard to be flawless.', sk: 'Dobre. Teda postupné dodanie. Ale budem potrebovať, aby bol dashboard bezchybný.', o: [
        ['Absolutely. I’ll send you a revised timeline by tomorrow so that we’re on the same page.', 'good', 'A clear next step with an idiom used naturally.', 'end'],
        ['Understood. Let me confirm everything in writing today.', 'good', 'Professional follow-up.', 'end'],
        ['Nothing is flawless.', 'bad', 'True, perhaps, but unhelpful. Reassure and commit to quality.', 'end']] },
      end: { say: 'Thank you. I appreciate your flexibility.', sk: 'Ďakujem. Oceňujem vašu flexibilitu.', end: true }
    }
  },
  {
    id: 'sc-panel', level: 'C1', title: 'Panel Discussion: AI in Education', category: 'speaking',
    situation: 'You are a speaker on a panel about artificial intelligence in schools. The moderator asks you questions in front of an audience.',
    you: 'A panel speaker (teacher)', them: 'The moderator', themName: 'Moderator',
    phrases: [['That’s a really important question.', 'To je naozaj dôležitá otázka.'], ['I’d like to build on what … said.', 'Rád by som nadviazal na to, čo povedal…'], ['The evidence so far suggests…', 'Doterajšie dôkazy naznačujú…'], ['There’s a real risk that…', 'Existuje skutočné riziko, že…'], ['If I could just add one thing…', 'Ak môžem dodať ešte jednu vec…']],
    vocab: [['assessment', 'testing and grading students'], ['critical thinking', 'analysing ideas carefully'], ['equity', 'fairness for everyone']],
    start: 'n1',
    nodes: {
      n1: { say: 'Let’s begin. Should schools allow students to use AI tools for homework?', sk: 'Začnime. Mali by školy povoliť študentom používať nástroje AI na domáce úlohy?', o: [
        ['That’s a really important question. I’d argue yes, but only if we rethink what homework is for.', 'good', 'A clear position with an important condition.', 'n2'],
        ['Yes, of course. It’s the future.', 'ok', 'Clear, but a panel audience expects reasons and nuance.', 'n2'],
        ['No. AI makes students lazy. Next question.', 'bad', 'Dismissive and unsupported.', 'n1b']] },
      n1b: { say: 'That’s quite a strong position. Could you explain your reasoning?', sk: 'To je dosť silný postoj. Mohli by ste vysvetliť svoje dôvody?', o: [
        ['Certainly. My concern is that if AI does the thinking, students may skip the struggle that actually produces learning.', 'good', 'A reasoned version of your concern.', 'n2'],
        ['Fair enough, I was oversimplifying. My worry is about over-reliance, not AI itself.', 'good', 'Graceful nuance.', 'n2'],
        ['It’s obvious.', 'bad', 'Nothing is obvious to an audience. Explain.', 'n2']] },
      n2: { say: 'Some argue that AI will make traditional essays meaningless. What’s your view?', sk: 'Niektorí tvrdia, že AI urobí tradičné eseje bezvýznamnými. Aký je váš názor?', o: [
        ['To some extent, that’s true for take-home essays. What we could do is assess the process: drafts, discussion and oral defence.', 'good', 'Partial agreement plus a concrete alternative.', 'n3'],
        ['I wouldn’t say meaningless. Writing is still how we learn to think clearly; what changes is how we assess it.', 'good', 'Precise disagreement.', 'n3'],
        ['Essays were always boring anyway.', 'bad', 'Off topic and unhelpful.', 'n3']] },
      n3: { say: 'What about equity? Not every student has access to the same tools.', sk: 'A čo spravodlivosť? Nie každý študent má prístup k rovnakým nástrojom.', o: [
        ['There’s a real risk that AI widens existing gaps. Schools would need to provide access for everyone, otherwise we reward the students who already have most.', 'good', 'Recognising a serious risk and proposing a condition.', 'n4'],
        ['That’s a fair point, and I don’t think we have a complete answer yet.', 'good', 'Honest — acknowledging limits is credible.', 'n4'],
        ['Everyone has a phone nowadays.', 'bad', 'A sweeping assumption that ignores the question.', 'n4']] },
      n4: { say: 'We’re almost out of time. Could you sum up your position in one sentence?', sk: 'Takmer nám vypršal čas. Mohli by ste zhrnúť svoj postoj jednou vetou?', o: [
        ['In short, AI should be treated as a tool that supports thinking, not a shortcut that replaces it, and our assessment needs to reflect that.', 'good', 'A memorable, balanced summary.', 'end'],
        ['To sum up: use it, teach it, but assess thinking rather than output.', 'good', 'Concise and rhetorical.', 'end'],
        ['It’s complicated.', 'ok', 'True, but it doesn’t summarise anything.', 'end']] },
      end: { say: 'Thank you. Let’s open the floor to questions from the audience.', sk: 'Ďakujem. Otvorme priestor na otázky z publika.', end: true }
    }
  }
];
