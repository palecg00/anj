/* LinguaPath — reading and listening texts, A1–A2.
   kind: 'reading' | 'listening'. Listening scripts may use "Name: line" for speakers.
   words: highlighted vocabulary [word, definition]. summary: short summary task with a model answer and key ideas. */
window.LP = window.LP || {};
LP.TEXTS = LP.TEXTS || [];

LP.TEXTS.push(
  {
    id: 'r-a1-1', kind: 'reading', level: 'A1', title: 'Meet Anna', topic: 'Greetings and introductions',
    text: `Hello! My name is Anna Novak. I am twenty years old and I am from Slovakia. I live in Bratislava with my friend Lucia. I am a student at the university. My subject is English.

Lucia is from Poland. She is a student too. She is very friendly and funny. We are in the same English class.

Our teacher is Mr Brown. He is from Canada. He is very nice. In class, we say, "Good morning, Mr Brown!" and he says, "Good morning, everyone! How are you today?"`,
    sk: `Ahoj! Volám sa Anna Nováková. Mám dvadsať rokov a som zo Slovenska. Bývam v Bratislave s mojou kamarátkou Luciou. Som študentka na univerzite. Môj predmet je angličtina.

Lucia je z Poľska. Aj ona je študentka. Je veľmi priateľská a vtipná. Sme v tej istej triede angličtiny.

Náš učiteľ je pán Brown. Je z Kanady. Je veľmi milý. Na hodine hovoríme: „Dobré ráno, pán Brown!“ a on hovorí: „Dobré ráno všetkým! Ako sa dnes máte?“`,
    words: [['student', 'a person who studies'], ['friendly', 'kind and nice to other people'], ['funny', 'makes you laugh'], ['same', 'not different']],
    questions: [
      { t: 'tf', q: 'Anna is from Poland.', a: false, e: 'Anna is from Slovakia. Lucia is from Poland.' },
      { t: 'mc', q: 'Where does Anna live?', o: ['In Poland', 'In Bratislava', 'In Canada'], a: 1, e: '“I live in Bratislava with my friend Lucia.”' },
      { t: 'tf', q: 'Lucia is a student.', a: true, e: '“She is a student too.”' },
      { t: 'mc', q: 'Where is Mr Brown from?', o: ['Canada', 'Slovakia', 'England'], a: 0, e: '“He is from Canada.”' },
      { t: 'fill', q: 'Anna is ___ years old. (write the number as a word or digits)', a: ['twenty', '20'], e: '“I am twenty years old.”' }
    ],
    summary: { prompt: 'Write one or two sentences about Anna.', model: 'Anna is a twenty-year-old student from Slovakia. She lives in Bratislava and studies English.', keywords: ['Anna', 'student', 'Slovakia', 'Bratislava', 'English'] }
  },
  {
    id: 'l-a1-1', kind: 'listening', level: 'A1', title: 'At the Train Station', topic: 'Numbers, dates and time',
    text: `Woman: Excuse me, what time is the next train to Oxford?
Man: The next train is at half past ten.
Woman: And what time is it now?
Man: It's ten o'clock. You have thirty minutes.
Woman: Great. How much is a ticket?
Man: A single ticket is twelve pounds.
Woman: And which platform is it?
Man: Platform three.
Woman: Thank you very much!
Man: You're welcome. Have a good journey!`,
    sk: `Žena: Prepáčte, o koľkej ide ďalší vlak do Oxfordu?
Muž: Ďalší vlak ide o pol jedenástej.
Žena: A koľko je teraz hodín?
Muž: Je desať hodín. Máte tridsať minút.
Žena: Výborne. Koľko stojí lístok?
Muž: Jednosmerný lístok stojí dvanásť libier.
Žena: A z ktorého nástupišťa?
Muž: Z nástupišťa tri.
Žena: Ďakujem pekne!
Muž: Nie je za čo. Šťastnú cestu!`,
    words: [['half past ten', '10:30'], ['single ticket', 'a ticket for one journey, not return'], ['platform', 'where you get on the train']],
    questions: [
      { t: 'mc', q: 'What time is the next train?', o: ['10:00', '10:30', '10:15'], a: 1, e: '“The next train is at half past ten.” = 10:30.' },
      { t: 'tf', q: 'It is ten o’clock now.', a: true, e: '“It’s ten o’clock.”' },
      { t: 'mc', q: 'How much is a single ticket?', o: ['£10', '£20', '£12'], a: 2, e: '“A single ticket is twelve pounds.”' },
      { t: 'fill', q: 'The train leaves from platform ___.', a: ['three', '3'], e: '“Platform three.”' },
      { t: 'tf', q: 'The woman has one hour before the train.', a: false, e: 'She has thirty minutes.' }
    ],
    summary: { prompt: 'Write one sentence: When and where does the woman’s train leave?', model: 'Her train to Oxford leaves at half past ten from platform three.', keywords: ['half past ten', 'platform', 'three', 'Oxford'] }
  },
  {
    id: 'r-a1-2', kind: 'reading', level: 'A1', title: 'My Family', topic: 'Family and friends',
    text: `My name is Peter. I am thirty-five years old and I am married. My wife's name is Jana. She is a nurse. We have got two children, a son and a daughter. Our son, Adam, is eight, and our daughter, Ema, is five.

My parents live in a small village near Nitra. My father is sixty and my mother is fifty-eight. They have got a big garden and two cats.

I have got one sister. Her name is Katka. She isn't married, but she has got a boyfriend. On Sundays, we all have lunch at my parents' house. My mother's soup is the best!`,
    sk: `Volám sa Peter. Mám tridsaťpäť rokov a som ženatý. Moja manželka sa volá Jana. Je zdravotná sestra. Máme dve deti, syna a dcéru. Náš syn Adam má osem rokov a naša dcéra Ema má päť.

Moji rodičia bývajú v malej dedine pri Nitre. Môj otec má šesťdesiat a moja mama päťdesiatosem rokov. Majú veľkú záhradu a dve mačky.

Mám jednu sestru. Volá sa Katka. Nie je vydatá, ale má priateľa. V nedeľu všetci obedujeme u mojich rodičov. Mamina polievka je najlepšia!`,
    words: [['married', 'having a husband or wife'], ['nurse', 'a person who looks after sick people'], ['village', 'a very small town'], ['boyfriend', 'a man or boy in a romantic relationship with someone']],
    questions: [
      { t: 'mc', q: 'What is Peter’s wife’s job?', o: ['Teacher', 'Nurse', 'Doctor'], a: 1, e: '“She is a nurse.”' },
      { t: 'mc', q: 'How many children has Peter got?', o: ['One', 'Two', 'Three'], a: 1, e: '“We have got two children.”' },
      { t: 'tf', q: 'Peter’s parents live in a big city.', a: false, e: 'They live in a small village near Nitra.' },
      { t: 'tf', q: 'Katka is Peter’s sister.', a: true, e: '“I have got one sister. Her name is Katka.”' },
      { t: 'mc', q: 'When does the family have lunch together?', o: ['On Saturdays', 'On Sundays', 'Every day'], a: 1, e: '“On Sundays, we all have lunch at my parents’ house.”' }
    ],
    summary: { prompt: 'Write two sentences about Peter’s family.', model: 'Peter is married to Jana and they have two children, Adam and Ema. On Sundays, the family has lunch at his parents’ house.', keywords: ['Jana', 'two children', 'Sundays', 'parents'] }
  },
  {
    id: 'l-a1-2', kind: 'listening', level: 'A1', title: 'What’s in the Fridge?', topic: 'Food and drinks',
    text: `Tom: I'm hungry. Is there any food in the fridge?
Sara: There's some cheese and there are two eggs.
Tom: Is there any bread?
Sara: No, there isn't. And there isn't any milk.
Tom: OK, let's go to the supermarket. We need bread, milk and some apples.
Sara: And water! There isn't any water.
Tom: Good idea. Let's make a list: bread, milk, apples and water.
Sara: And chocolate, please!
Tom: OK, and chocolate.`,
    sk: `Tom: Som hladný. Je v chladničke nejaké jedlo?
Sara: Je tam trochu syra a sú tam dve vajcia.
Tom: Je tam nejaký chlieb?
Sara: Nie, nie je. A nie je tam ani mlieko.
Tom: Dobre, poďme do supermarketu. Potrebujeme chlieb, mlieko a nejaké jablká.
Sara: A vodu! Nemáme žiadnu vodu.
Tom: Dobrý nápad. Spravme si zoznam: chlieb, mlieko, jablká a voda.
Sara: A čokoládu, prosím!
Tom: Dobre, aj čokoládu.`,
    words: [['fridge', 'a cold box in the kitchen for food'], ['list', 'words written one under another'], ['hungry', 'wanting to eat']],
    questions: [
      { t: 'tf', q: 'There is some cheese in the fridge.', a: true, e: '“There’s some cheese.”' },
      { t: 'mc', q: 'How many eggs are there?', o: ['One', 'Two', 'Six'], a: 1, e: '“There are two eggs.”' },
      { t: 'tf', q: 'There is some bread in the fridge.', a: false, e: '“No, there isn’t.”' },
      { t: 'mc', q: 'Where do they go?', o: ['To a restaurant', 'To the supermarket', 'To a café'], a: 1, e: '“Let’s go to the supermarket.”' },
      { t: 'mc', q: 'What does Sara want at the end?', o: ['Chocolate', 'Cheese', 'Coffee'], a: 0, e: '“And chocolate, please!”' }
    ],
    summary: { prompt: 'Write the shopping list from the conversation.', model: 'Bread, milk, apples, water and chocolate.', keywords: ['bread', 'milk', 'apples', 'water', 'chocolate'] }
  },
  {
    id: 'r-a1-3', kind: 'reading', level: 'A1', title: 'Tom’s Day', topic: 'Daily routines',
    text: `Tom is a bus driver in Manchester. He gets up at five o'clock every morning. He has a shower and drinks a cup of tea. He doesn't eat breakfast at home. He starts work at six.

Tom drives the number 42 bus. He works from six in the morning until two in the afternoon. He has lunch at half past two. He usually eats a sandwich.

In the afternoon, he goes to the park with his dog, Max. In the evening, he cooks dinner and watches TV. He never goes to bed late. He always goes to bed at half past nine.`,
    sk: `Tom je vodič autobusu v Manchestri. Každé ráno vstáva o piatej. Osprchuje sa a vypije šálku čaju. Doma neraňajkuje. Do práce nastupuje o šiestej.

Tom jazdí na autobuse číslo 42. Pracuje od šiestej ráno do druhej popoludní. Obeduje o pol tretej. Zvyčajne si dá sendvič.

Popoludní chodí do parku so svojím psom Maxom. Večer varí večeru a pozerá televíziu. Nikdy nechodí spať neskoro. Vždy ide spať o pol desiatej.`,
    words: [['driver', 'a person who drives a car, bus or train'], ['until', 'up to a time'], ['sandwich', 'two pieces of bread with food between them'], ['late', 'after the usual time']],
    questions: [
      { t: 'mc', q: 'What is Tom’s job?', o: ['Taxi driver', 'Bus driver', 'Cook'], a: 1, e: '“Tom is a bus driver in Manchester.”' },
      { t: 'mc', q: 'What time does Tom get up?', o: ['At 5:00', 'At 6:00', 'At 9:30'], a: 0, e: '“He gets up at five o’clock every morning.”' },
      { t: 'tf', q: 'Tom eats breakfast at home.', a: false, e: '“He doesn’t eat breakfast at home.”' },
      { t: 'fill', q: 'Tom’s dog is called ___.', a: ['Max'], e: '“…with his dog, Max.”' },
      { t: 'tf', q: 'Tom always goes to bed at half past nine.', a: true, e: '“He always goes to bed at half past nine.”' }
    ],
    summary: { prompt: 'Write two or three sentences about Tom’s day.', model: 'Tom is a bus driver. He gets up at five and works from six to two. In the afternoon he walks his dog, and he goes to bed at half past nine.', keywords: ['bus driver', 'five', 'dog', 'half past nine'] }
  },
  {
    id: 'l-a1-3', kind: 'listening', level: 'A1', title: 'New in Town', topic: 'Places in town',
    text: `Kate: Hi, I'm Kate. I'm new in town. Can you help me?
Ben: Of course!
Kate: Where is the supermarket?
Ben: It's on Green Street, opposite the park.
Kate: And is there a bank near here?
Ben: Yes, there is. The bank is between the café and the library.
Kate: Great. Can I walk to the station?
Ben: Yes, you can. It's near the hospital. It's about ten minutes on foot.
Kate: Thank you!
Ben: You're welcome. Welcome to our town!`,
    sk: `Kate: Ahoj, som Kate. Som v meste nová. Môžeš mi pomôcť?
Ben: Samozrejme!
Kate: Kde je supermarket?
Ben: Na Green Street, oproti parku.
Kate: A je tu niekde blízko banka?
Ben: Áno, je. Banka je medzi kaviarňou a knižnicou.
Kate: Výborne. Môžem ísť na stanicu pešo?
Ben: Áno, môžeš. Je blízko nemocnice. Je to asi desať minút pešo.
Kate: Ďakujem!
Ben: Nie je za čo. Vitaj v našom meste!`,
    words: [['opposite', 'on the other side, facing'], ['between', 'in the middle of two things'], ['on foot', 'walking']],
    questions: [
      { t: 'mc', q: 'Where is the supermarket?', o: ['Next to the bank', 'Opposite the park', 'Near the hospital'], a: 1, e: '“It’s on Green Street, opposite the park.”' },
      { t: 'mc', q: 'The bank is between…', o: ['the café and the library', 'the park and the station', 'the hospital and the café'], a: 0, e: '“The bank is between the café and the library.”' },
      { t: 'tf', q: 'Kate can walk to the station.', a: true, e: '“Yes, you can.”' },
      { t: 'mc', q: 'How long does it take to walk to the station?', o: ['Five minutes', 'Ten minutes', 'Thirty minutes'], a: 1, e: '“It’s about ten minutes on foot.”' },
      { t: 'tf', q: 'Kate lives in this town for a long time.', a: false, e: 'Kate is new in town.' }
    ],
    summary: { prompt: 'Write two places from the conversation and where they are.', model: 'The supermarket is opposite the park. The station is near the hospital.', keywords: ['supermarket', 'opposite', 'station', 'near'] }
  },
  // ------------------------- A2 -------------------------
  {
    id: 'r-a2-1', kind: 'reading', level: 'A2', title: 'The Saturday Market', topic: 'Shopping and prices',
    text: `Every Saturday morning, there is a market in the main square of our town. You can buy fresh fruit, vegetables, cheese, bread and flowers. Many things are cheaper than in the supermarket, and the food comes from local farms.

I usually go with my grandmother. She always buys a lot of vegetables and a little cheese. She knows all the sellers, and they often give her a discount. Last week, she bought a kilo of tomatoes for only one euro. What a bargain!

There is one problem: many sellers only take cash, so you should bring some coins and notes. Also, go early. After eleven o'clock, there isn't much bread left.`,
    sk: `Každú sobotu ráno je na hlavnom námestí nášho mesta trh. Môžete si kúpiť čerstvé ovocie, zeleninu, syr, chlieb a kvety. Veľa vecí je lacnejších ako v supermarkete a jedlo pochádza z miestnych fariem.

Zvyčajne chodím so starou mamou. Vždy kupuje veľa zeleniny a trochu syra. Pozná všetkých predajcov a často jej dajú zľavu. Minulý týždeň kúpila kilo paradajok len za jedno euro. Aká výhodná kúpa!

Je tu jeden problém: mnohí predajcovia berú iba hotovosť, takže by ste si mali priniesť nejaké mince a bankovky. A choďte skoro. Po jedenástej už veľa chleba nezostáva.`,
    words: [['square', 'an open area in a town'], ['seller', 'a person who sells things'], ['discount', 'a lower price'], ['bargain', 'something cheap and good'], ['cash', 'coins and notes']],
    questions: [
      { t: 'tf', q: 'The market is on Sundays.', a: false, e: 'The market is every Saturday morning.' },
      { t: 'mc', q: 'Why do the sellers often give the grandmother a discount?', o: ['She buys a lot of bread.', 'She knows them.', 'She pays by card.'], a: 1, e: '“She knows all the sellers, and they often give her a discount.”' },
      { t: 'mc', q: 'How much did a kilo of tomatoes cost last week?', o: ['One euro', 'Two euros', 'Eleven euros'], a: 0, e: '“…a kilo of tomatoes for only one euro.”' },
      { t: 'tf', q: 'You can pay by card everywhere at the market.', a: false, e: '“Many sellers only take cash.”' },
      { t: 'mc', q: 'Why should you go early?', o: ['It is less crowded.', 'There isn’t much bread later.', 'The prices are lower.'], a: 1, e: '“After eleven o’clock, there isn’t much bread left.”' }
    ],
    summary: { prompt: 'In two sentences, give advice to a visitor to the market.', model: 'Go to the Saturday market early because the bread sells out after eleven. Bring cash, because many sellers do not take cards.', keywords: ['early', 'cash', 'Saturday', 'cheaper'] }
  },
  {
    id: 'l-a2-1', kind: 'listening', level: 'A2', title: 'A Weekend in Vienna', topic: 'Travel and transport',
    text: `Last month I went to Vienna with my best friend, Marta. We took the train from Bratislava. The journey was very short, only one hour! We bought return tickets because they were cheaper.

On the first day, we visited the old town and saw St Stephen's Cathedral. In the afternoon, we had coffee and cake in a famous café. The cake was delicious, but it was quite expensive.

On the second day, there was a problem. We missed the morning train back because we woke up late! Luckily, there was another train two hours later. We didn't mind. We walked by the river and took a lot of photos. It was a great trip.`,
    sk: `Minulý mesiac som išla do Viedne s mojou najlepšou kamarátkou Martou. Išli sme vlakom z Bratislavy. Cesta bola veľmi krátka, iba hodinu! Kúpili sme si spiatočné lístky, pretože boli lacnejšie.

Prvý deň sme navštívili staré mesto a videli Dóm svätého Štefana. Popoludní sme si dali kávu a koláč v známej kaviarni. Koláč bol vynikajúci, ale dosť drahý.

Druhý deň nastal problém. Zmeškali sme ranný vlak späť, pretože sme zaspali! Našťastie o dve hodiny išiel ďalší vlak. Nevadilo nám to. Prechádzali sme sa pri rieke a urobili veľa fotiek. Bol to skvelý výlet.`,
    words: [['journey', 'travelling from one place to another'], ['return tickets', 'tickets to go and come back'], ['missed', 'were too late for'], ['luckily', 'by good luck']],
    questions: [
      { t: 'mc', q: 'How did they travel to Vienna?', o: ['By bus', 'By train', 'By car'], a: 1, e: '“We took the train from Bratislava.”' },
      { t: 'mc', q: 'How long was the journey?', o: ['One hour', 'Two hours', 'Three hours'], a: 0, e: '“The journey was very short, only one hour!”' },
      { t: 'tf', q: 'The cake was cheap.', a: false, e: '“The cake was delicious, but it was quite expensive.”' },
      { t: 'mc', q: 'Why did they miss the morning train?', o: ['The train was early.', 'They woke up late.', 'They lost their tickets.'], a: 1, e: '“We missed the morning train back because we woke up late!”' },
      { t: 'tf', q: 'They were angry about the later train.', a: false, e: '“We didn’t mind.” They walked by the river and took photos.' }
    ],
    summary: { prompt: 'Write three sentences about the trip. Use the past simple.', model: 'The speaker and her friend went to Vienna by train. They visited the old town and had cake in a café. On the second day, they missed their train, but they caught another one later.', keywords: ['went', 'train', 'visited', 'missed'] }
  },
  {
    id: 'r-a2-2', kind: 'reading', level: 'A2', title: 'Small Town or Big City?', topic: 'Towns, cities and directions',
    text: `Martin grew up in a small town in the east of Slovakia. Now he lives in the capital, Bratislava. Here he compares the two places.

"My hometown is much quieter than Bratislava. The population is only about 30,000, so everybody knows everybody. The historic square is the most beautiful place in the town, and the air is cleaner.

Bratislava is bigger, busier and more modern. There are more jobs, and the cinemas and restaurants are better. But the traffic is worse, especially in the morning, and flats are much more expensive.

Which place is better? It's a difficult question. For work, Bratislava is the best choice. But for a relaxing weekend, I always go home."`,
    sk: `Martin vyrastal v malom meste na východe Slovenska. Teraz žije v hlavnom meste, v Bratislave. Tu porovnáva tieto dve miesta.

„Moje rodné mesto je oveľa tichšie ako Bratislava. Má iba asi 30 000 obyvateľov, takže každý pozná každého. Historické námestie je najkrajšie miesto v meste a vzduch je čistejší.

Bratislava je väčšia, rušnejšia a modernejšia. Je tu viac pracovných miest a kiná a reštaurácie sú lepšie. Ale doprava je horšia, hlavne ráno, a byty sú oveľa drahšie.

Ktoré miesto je lepšie? To je ťažká otázka. Pre prácu je Bratislava najlepšia voľba. Ale na oddychový víkend chodím vždy domov.“`,
    words: [['hometown', 'the town where you grew up'], ['population', 'the number of people who live in a place'], ['historic', 'old and important in history'], ['traffic', 'cars on the road']],
    questions: [
      { t: 'tf', q: 'Martin’s hometown is noisier than Bratislava.', a: false, e: '“My hometown is much quieter than Bratislava.”' },
      { t: 'mc', q: 'What is the most beautiful place in Martin’s hometown?', o: ['The river', 'The historic square', 'The cinema'], a: 1, e: '“The historic square is the most beautiful place in the town.”' },
      { t: 'mc', q: 'Which is NOT better in Bratislava, according to Martin?', o: ['Jobs', 'Restaurants', 'Traffic'], a: 2, e: '“The traffic is worse.”' },
      { t: 'tf', q: 'Flats in Bratislava are more expensive.', a: true, e: '“…flats are much more expensive.”' },
      { t: 'mc', q: 'Where does Martin go for a relaxing weekend?', o: ['To his hometown', 'To Vienna', 'He stays in Bratislava'], a: 0, e: '“For a relaxing weekend, I always go home.”' }
    ],
    summary: { prompt: 'Compare the two places in two sentences. Use comparatives.', model: 'Martin’s hometown is quieter and cleaner than Bratislava. Bratislava is bigger and more modern, but the traffic is worse and flats are more expensive.', keywords: ['quieter', 'bigger', 'more', 'expensive'] }
  },
  {
    id: 'l-a2-2', kind: 'listening', level: 'A2', title: 'Plans for Saturday', topic: 'Future plans',
    text: `Lucy: Hi, Dan! Are you free this weekend?
Dan: Hmm, on Saturday morning I'm going to play football, but I'm free in the afternoon. Why?
Lucy: It's my birthday on Saturday! I'm going to have a small party at my flat. I want to invite you.
Dan: Oh, happy birthday! Thanks, I'd love to come. What time?
Lucy: At seven o'clock. I think about ten people will come.
Dan: Great. Shall I bring something?
Lucy: Maybe some drinks? I'm going to make a big pizza.
Dan: No problem. I'll bring some juice and lemonade.
Lucy: Perfect. See you on Saturday!
Dan: See you! I'm looking forward to it.`,
    sk: `Lucy: Ahoj, Dan! Máš tento víkend voľno?
Dan: Hmm, v sobotu ráno idem hrať futbal, ale poobede mám voľno. Prečo?
Lucy: V sobotu mám narodeniny! Budem mať malú oslavu u seba v byte. Chcem ťa pozvať.
Dan: Ó, všetko najlepšie! Ďakujem, rád prídem. O koľkej?
Lucy: O siedmej. Myslím, že príde asi desať ľudí.
Dan: Super. Mám niečo priniesť?
Lucy: Možno nejaké nápoje? Urobím veľkú pizzu.
Dan: Žiadny problém. Prinesiem džús a limonádu.
Lucy: Výborne. Uvidíme sa v sobotu!
Dan: Maj sa! Teším sa.`,
    words: [['free', 'not busy'], ['invite', 'ask someone to come'], ['look forward to', 'feel happy about something in the future']],
    questions: [
      { t: 'mc', q: 'What is Dan going to do on Saturday morning?', o: ['Go to a party', 'Play football', 'Make pizza'], a: 1, e: '“On Saturday morning I’m going to play football.”' },
      { t: 'tf', q: 'The party is at Lucy’s flat.', a: true, e: '“I’m going to have a small party at my flat.”' },
      { t: 'mc', q: 'What time does the party start?', o: ['At 5', 'At 7', 'At 10'], a: 1, e: '“At seven o’clock.”' },
      { t: 'mc', q: 'What will Dan bring?', o: ['Pizza', 'A cake', 'Juice and lemonade'], a: 2, e: '“I’ll bring some juice and lemonade.”' },
      { t: 'tf', q: 'About twenty people will come to the party.', a: false, e: 'Lucy thinks about ten people will come.' }
    ],
    summary: { prompt: 'Write two sentences about Saturday. Use “going to” or “will”.', model: 'Dan is going to play football in the morning. In the evening, he will go to Lucy’s birthday party and bring some drinks.', keywords: ['going to', 'party', 'birthday', 'drinks'] }
  },
  {
    id: 'r-a2-3', kind: 'reading', level: 'A2', title: 'Greetings from Crete', topic: 'Holidays and hotels',
    text: `Hi everyone! I'm writing this blog post from the balcony of our hotel in Crete. It's eight o'clock in the morning, the sun is shining, and I'm drinking a coffee. The view of the sea is amazing.

We're staying at a small family hotel near the beach. Our double room is simple but clean, and the people at reception are really friendly. Breakfast is included, and it's delicious: fresh bread, yoghurt, honey and fruit.

Right now, my husband is still sleeping and the kids are playing in the pool. Today we're going sightseeing in the old town of Chania. Tomorrow we're taking a boat trip.

The only problem? The Wi-Fi is very slow, so I'm uploading only one photo. More news soon!`,
    sk: `Ahojte všetci! Tento príspevok na blog píšem z balkóna nášho hotela na Kréte. Je osem hodín ráno, svieti slnko a pijem kávu. Výhľad na more je úžasný.

Bývame v malom rodinnom hoteli blízko pláže. Naša dvojlôžková izba je jednoduchá, ale čistá, a ľudia na recepcii sú naozaj milí. Raňajky sú v cene a sú vynikajúce: čerstvý chlieb, jogurt, med a ovocie.

Práve teraz môj manžel ešte spí a deti sa hrajú v bazéne. Dnes ideme na prehliadku starého mesta Chania. Zajtra ideme na výlet loďou.

Jediný problém? Wi-Fi je veľmi pomalá, takže nahrávam iba jednu fotku. Čoskoro ďalšie novinky!`,
    words: [['balcony', 'a small area outside a window, above the ground'], ['included', 'part of the price'], ['sightseeing', 'visiting interesting places'], ['uploading', 'putting a file on the internet']],
    questions: [
      { t: 'mc', q: 'What is the writer doing right now?', o: ['Swimming', 'Drinking coffee and writing', 'Sleeping'], a: 1, e: '“I’m writing this blog post… and I’m drinking a coffee.”' },
      { t: 'tf', q: 'The hotel is far from the beach.', a: false, e: '“…a small family hotel near the beach.”' },
      { t: 'tf', q: 'Breakfast costs extra.', a: false, e: '“Breakfast is included.”' },
      { t: 'mc', q: 'What are the kids doing?', o: ['Playing in the pool', 'Sleeping', 'Eating breakfast'], a: 0, e: '“The kids are playing in the pool.”' },
      { t: 'mc', q: 'What is the only problem?', o: ['The room is dirty.', 'The Wi-Fi is slow.', 'The staff are unfriendly.'], a: 1, e: '“The Wi-Fi is very slow.”' }
    ],
    summary: { prompt: 'Write two sentences about the family’s holiday. Use the present continuous.', model: 'The family is staying at a small hotel near the beach in Crete. Today they are going sightseeing, and tomorrow they are taking a boat trip.', keywords: ['staying', 'hotel', 'going', 'Crete'] }
  },
  {
    id: 'l-a2-3', kind: 'listening', level: 'A2', title: 'At the Doctor’s', topic: 'Health and everyday problems',
    text: `Doctor: Good morning. Please sit down. What's the problem?
Patient: I don't feel well. I have a sore throat and a headache.
Doctor: When did it start?
Patient: Three days ago.
Doctor: Do you have a fever?
Patient: Yes, a little. Last night it was thirty-eight degrees.
Doctor: Let me look at your throat. Yes, it's red. I think you have a bad cold. It isn't serious.
Patient: Should I stay at home?
Doctor: Yes. You should rest for two or three days and drink a lot of water. Take this medicine three times a day after meals. You can buy it at the pharmacy.
Patient: Do I have to come back?
Doctor: Only if you don't feel better in five days.
Patient: Thank you, doctor.`,
    sk: `Lekárka: Dobré ráno. Posaďte sa, prosím. Čo vás trápi?
Pacient: Necítim sa dobre. Bolí ma hrdlo a hlava.
Lekárka: Kedy to začalo?
Pacient: Pred tromi dňami.
Lekárka: Máte horúčku?
Pacient: Áno, trochu. Včera večer som mal tridsaťosem stupňov.
Lekárka: Pozriem sa vám do hrdla. Áno, je červené. Myslím, že máte silné prechladnutie. Nie je to vážne.
Pacient: Mám zostať doma?
Lekárka: Áno. Mali by ste dva-tri dni oddychovať a piť veľa vody. Užívajte tento liek trikrát denne po jedle. Kúpite ho v lekárni.
Pacient: Musím prísť znova?
Lekárka: Iba ak sa do piatich dní nebudete cítiť lepšie.
Pacient: Ďakujem, pani doktorka.`,
    words: [['sore throat', 'a pain in your throat'], ['fever', 'a high body temperature'], ['pharmacy', 'a shop for medicine'], ['serious', 'very bad or dangerous']],
    questions: [
      { t: 'mc', q: 'What are the patient’s problems?', o: ['A sore throat and a headache', 'A broken leg', 'A stomach ache'], a: 0, e: '“I have a sore throat and a headache.”' },
      { t: 'mc', q: 'When did the problem start?', o: ['Yesterday', 'Three days ago', 'A week ago'], a: 1, e: '“Three days ago.”' },
      { t: 'tf', q: 'The doctor thinks it is serious.', a: false, e: '“It isn’t serious.”' },
      { t: 'mc', q: 'How often should the patient take the medicine?', o: ['Once a day', 'Twice a day', 'Three times a day'], a: 2, e: '“Take this medicine three times a day after meals.”' },
      { t: 'tf', q: 'The patient must come back in five days in every case.', a: false, e: 'Only if he doesn’t feel better in five days.' }
    ],
    summary: { prompt: 'Write the doctor’s advice in two sentences. Use “should”.', model: 'The patient should rest at home for two or three days and drink a lot of water. He should take the medicine three times a day after meals.', keywords: ['should', 'rest', 'water', 'medicine'] }
  }
);
