/* LinguaPath — reading and listening texts, B1–B2. */
window.LP = window.LP || {};
LP.TEXTS = LP.TEXTS || [];

LP.TEXTS.push(
  {
    id: 'r-b1-1', kind: 'reading', level: 'B1', title: 'Finding the Right Career', topic: 'Work and education',
    text: `When I was at school, everyone asked me the same question: "What do you want to be?" I had no idea. My parents wanted me to become a lawyer because lawyers usually have a good salary. I tried, but after one year of studying law I realised it wasn't for me.

I left university and got a part-time job in a bike shop. I didn't have much experience, but my manager was patient and taught me a lot. I discovered that I loved fixing things and talking to customers.

Two years later, I decided to apply for a course in mechanical engineering. Now I have a degree, and I design bikes for a small company. I don't earn as much as a lawyer, but I enjoy every day at work.

My advice? You don't have to know everything at eighteen. Try different things, learn new skills and listen to yourself, not only to other people.`,
    sk: `Keď som chodil do školy, všetci sa ma pýtali tú istú otázku: „Čím chceš byť?“ Nemal som ani potuchy. Moji rodičia chceli, aby som sa stal právnikom, pretože právnici majú zvyčajne dobrý plat. Skúsil som to, ale po roku štúdia práva som si uvedomil, že to nie je pre mňa.

Odišiel som z univerzity a našiel si brigádu v obchode s bicyklami. Nemal som veľa skúseností, ale môj vedúci bol trpezlivý a veľa ma naučil. Zistil som, že ma veľmi baví opravovať veci a rozprávať sa so zákazníkmi.

O dva roky neskôr som sa rozhodol prihlásiť na štúdium strojárstva. Teraz mám titul a navrhujem bicykle pre malú firmu. Nezarábam toľko ako právnik, ale každý deň v práci ma baví.

Moja rada? V osemnástich nemusíte vedieť všetko. Skúšajte rôzne veci, učte sa nové zručnosti a počúvajte samých seba, nielen ostatných.`,
    words: [['salary', 'money you get for your job every month'], ['part-time', 'working only some hours'], ['patient', 'calm, not angry when waiting'], ['degree', 'a university qualification'], ['earn', 'get money for work']],
    questions: [
      { t: 'tf', q: 'The writer enjoyed studying law.', a: false, e: '“After one year of studying law I realised it wasn’t for me.”' },
      { t: 'mc', q: 'Why did the writer’s parents want them to be a lawyer?', o: ['Lawyers usually have a good salary.', 'The writer was good at law.', 'The parents were lawyers.'], a: 0, e: '“…because lawyers usually have a good salary.”' },
      { t: 'mc', q: 'What did the writer discover in the bike shop?', o: ['They wanted to be a manager.', 'They loved fixing things and talking to customers.', 'They didn’t like customers.'], a: 1, e: '“I discovered that I loved fixing things and talking to customers.”' },
      { t: 'tf', q: 'The writer earns more than a lawyer now.', a: false, e: '“I don’t earn as much as a lawyer.”' },
      { t: 'mc', q: 'What is the writer’s main advice?', o: ['Always follow your parents’ advice.', 'Choose the job with the best salary.', 'Try different things and listen to yourself.'], a: 2, e: 'The last paragraph says: try different things, learn skills, listen to yourself.' }
    ],
    summary: { prompt: 'Summarise the writer’s career path in 2–3 sentences.', model: 'The writer started studying law because of their parents, but left after one year. A part-time job in a bike shop showed them that they loved fixing things, so they studied engineering. Now they design bikes and are happy, even though they earn less than a lawyer.', keywords: ['law', 'bike shop', 'engineering', 'happy'] }
  },
  {
    id: 'l-b1-1', kind: 'listening', level: 'B1', title: 'My First Marathon', topic: 'Experiences and achievements',
    text: `Host: Welcome back to Everyday Heroes. My guest today is Daniel, who has just finished his first marathon. Daniel, congratulations!
Daniel: Thanks! I'm still a bit tired, to be honest.
Host: Have you always been a runner?
Daniel: Not at all. Two years ago, I couldn't run for five minutes. I've never been very sporty.
Host: So what changed?
Daniel: My doctor told me I needed more exercise. I started with short runs, three times a week. Since then, I've run more than two thousand kilometres.
Host: Wow. Was it difficult?
Daniel: Very. I've had two injuries, and I nearly gave up last winter. But my running group helped me a lot.
Host: How do you feel now?
Daniel: Proud. It's the hardest thing I've ever done. My next goal? I haven't decided yet. Maybe a mountain race!`,
    sk: `Moderátorka: Vitajte späť v relácii Hrdinovia všedných dní. Mojím dnešným hosťom je Daniel, ktorý práve dokončil svoj prvý maratón. Daniel, gratulujem!
Daniel: Ďakujem! Úprimne, ešte som trochu unavený.
Moderátorka: Bol si vždy bežec?
Daniel: Vôbec nie. Pred dvoma rokmi som nevydržal bežať ani päť minút. Nikdy som nebol veľmi športový typ.
Moderátorka: Tak čo sa zmenilo?
Daniel: Lekár mi povedal, že potrebujem viac pohybu. Začal som krátkymi behmi trikrát do týždňa. Odvtedy som nabehal viac ako dvetisíc kilometrov.
Moderátorka: Páni. Bolo to ťažké?
Daniel: Veľmi. Mal som dve zranenia a minulú zimu som to takmer vzdal. Ale moja bežecká skupina mi veľmi pomohla.
Moderátorka: Ako sa cítiš teraz?
Daniel: Hrdo. Je to tá najťažšia vec, akú som kedy urobil. Môj ďalší cieľ? Ešte som sa nerozhodol. Možno horský beh!`,
    words: [['marathon', 'a running race of about 42 kilometres'], ['injury', 'damage to your body'], ['give up', 'stop trying'], ['proud', 'pleased with what you did']],
    questions: [
      { t: 'tf', q: 'Daniel has always been very sporty.', a: false, e: '“I’ve never been very sporty.”' },
      { t: 'mc', q: 'Why did Daniel start running?', o: ['His friend asked him.', 'His doctor said he needed more exercise.', 'He wanted to win a race.'], a: 1, e: '“My doctor told me I needed more exercise.”' },
      { t: 'mc', q: 'How far has he run since he started?', o: ['More than 200 km', 'More than 2,000 km', 'Exactly 42 km'], a: 1, e: '“I’ve run more than two thousand kilometres.”' },
      { t: 'mc', q: 'What helped him when he nearly gave up?', o: ['His running group', 'His doctor', 'A new pair of shoes'], a: 0, e: '“My running group helped me a lot.”' },
      { t: 'tf', q: 'Daniel has already decided on his next goal.', a: false, e: '“I haven’t decided yet.”' }
    ],
    summary: { prompt: 'Summarise Daniel’s story in 2–3 sentences. Use the present perfect at least once.', model: 'Daniel has just finished his first marathon, although two years ago he couldn’t run for five minutes. He started running because of his doctor and has had two injuries. His running group helped him not to give up.', keywords: ['marathon', 'doctor', 'injuries', 'group'] }
  },
  {
    id: 'r-b1-2', kind: 'reading', level: 'B1', title: 'The Lost Wallet', topic: 'Telling stories',
    text: `It was a cold Friday evening in November. I was waiting for the last bus home after a long day at work. It was raining, and I was thinking about dinner.

Suddenly, I noticed a brown wallet on the bench next to me. I opened it. Inside, there was some money, a bank card and an ID card with the name Helena Kováčová. There was also an old photo of a baby.

While I was deciding what to do, my bus arrived. I got on and took the wallet with me. At home, I looked for Helena online and sent her a message, but she didn't answer.

The next morning, I took the wallet to the police station. A week later, I found a card in my letterbox. Helena had asked the police for my address. The card said: "Thank you for being honest. The baby in the photo is my daughter. It is the only photo I have of her at that age." In the end, I realised that small actions can mean a lot.`,
    sk: `Bol studený piatkový večer v novembri. Po dlhom dni v práci som čakal na posledný autobus domov. Pršalo a myslel som na večeru.

Zrazu som si všimol hnedú peňaženku na lavičke vedľa mňa. Otvoril som ju. Vnútri boli nejaké peniaze, platobná karta a občiansky preukaz na meno Helena Kováčová. Bola tam aj stará fotka bábätka.

Kým som sa rozhodoval, čo urobiť, prišiel môj autobus. Nastúpil som a peňaženku som zobral so sebou. Doma som Helenu hľadal na internete a poslal jej správu, ale neodpovedala.

Na druhý deň ráno som peňaženku odniesol na políciu. O týždeň neskôr som našiel v schránke pohľadnicu. Helena požiadala políciu o moju adresu. Na pohľadnici stálo: „Ďakujem, že ste boli čestný. Bábätko na fotke je moja dcéra. Je to jediná fotka, ktorú z toho obdobia mám.“ Nakoniec som si uvedomil, že aj malé skutky môžu veľa znamenať.`,
    words: [['bench', 'a long seat for several people'], ['wallet', 'a small case for money and cards'], ['honest', 'telling the truth; not stealing'], ['letterbox', 'a box or hole where letters are delivered']],
    questions: [
      { t: 'mc', q: 'What was the writer doing when they noticed the wallet?', o: ['Walking home', 'Waiting for a bus', 'Eating dinner'], a: 1, e: '“I was waiting for the last bus home.”' },
      { t: 'tf', q: 'The wallet had no money in it.', a: false, e: '“Inside, there was some money…”' },
      { t: 'mc', q: 'What happened while the writer was deciding what to do?', o: ['Helena arrived.', 'The bus arrived.', 'It stopped raining.'], a: 1, e: '“While I was deciding what to do, my bus arrived.”' },
      { t: 'mc', q: 'How did Helena find the writer’s address?', o: ['On social media', 'From the police', 'From the bus driver'], a: 1, e: '“Helena had asked the police for my address.”' },
      { t: 'mc', q: 'Why was the photo so important to Helena?', o: ['It was expensive.', 'It was her only photo of her daughter as a baby.', 'It was a photo of the writer.'], a: 1, e: '“It is the only photo I have of her at that age.”' }
    ],
    summary: { prompt: 'Retell the story in 3 sentences. Use the past simple and the past continuous.', model: 'While the writer was waiting for a bus, they noticed a wallet on a bench. They took it home, and the next morning they gave it to the police. Later, the owner sent a thank-you card because the wallet contained her only baby photo of her daughter.', keywords: ['waiting', 'wallet', 'police', 'photo'] }
  },
  {
    id: 'l-b1-2', kind: 'listening', level: 'B1', title: 'An Extra Day Off', topic: 'Choices and possibilities',
    text: `Presenter: Today we're asking people in the street: what would you do if you had an extra day off every week?
Woman: Oh, that's easy. If I had an extra day, I'd spend it with my kids. At the moment, I only see them in the evenings.
Man: I'd learn to cook properly. If I could cook, I wouldn't spend so much money on takeaways!
Young woman: Honestly? I'd probably sleep. But if I weren't so tired, I'd volunteer at the animal shelter near my house.
Young man: I think I'd find a part-time job. I'm saving money for a flat, and I can't afford one at the moment.
Presenter: Interesting answers! If you want to share your idea, send us a message. If we read your message on air, you'll win two cinema tickets.`,
    sk: `Moderátor: Dnes sa pýtame ľudí na ulici: čo by ste robili, keby ste mali každý týždeň jeden voľný deň navyše?
Žena: Ó, to je jednoduché. Keby som mala deň navyše, strávila by som ho s deťmi. Momentálne ich vidím len večer.
Muž: Naučil by som sa poriadne variť. Keby som vedel variť, neminul by som toľko peňazí za jedlo so sebou!
Mladá žena: Úprimne? Asi by som spala. Ale keby som nebola taká unavená, robila by som dobrovoľníčku v útulku pre zvieratá blízko môjho domu.
Mladý muž: Myslím, že by som si našiel brigádu. Šetrím na byt a momentálne si ho nemôžem dovoliť.
Moderátor: Zaujímavé odpovede! Ak sa chcete podeliť o svoj nápad, pošlite nám správu. Ak vašu správu prečítame vo vysielaní, vyhráte dva lístky do kina.`,
    words: [['takeaway', 'food you buy from a restaurant to eat at home'], ['volunteer', 'work without pay'], ['shelter', 'a place that looks after animals or people'], ['afford', 'have enough money for']],
    questions: [
      { t: 'mc', q: 'What would the first woman do with an extra day?', o: ['Sleep', 'Spend it with her kids', 'Cook'], a: 1, e: '“I’d spend it with my kids.”' },
      { t: 'mc', q: 'Why does the man want to learn to cook?', o: ['To save money on takeaways', 'To open a restaurant', 'To lose weight'], a: 0, e: '“If I could cook, I wouldn’t spend so much money on takeaways!”' },
      { t: 'tf', q: 'The young woman would definitely volunteer at the animal shelter.', a: false, e: 'She would probably sleep. She would volunteer only if she weren’t so tired.' },
      { t: 'mc', q: 'Why would the young man find a part-time job?', o: ['He is bored.', 'He is saving for a flat.', 'He wants to meet people.'], a: 1, e: '“I’m saving money for a flat.”' },
      { t: 'tf', q: 'Listeners can win cinema tickets.', a: true, e: '“…you’ll win two cinema tickets.”' }
    ],
    summary: { prompt: 'What would YOU do with an extra day off? Answer in 2 sentences with the second conditional.', model: 'If I had an extra day off every week, I would take a cooking course. I would also visit my grandparents more often.', keywords: ['If I had', 'would'] }
  },
  {
    id: 'r-b1-3', kind: 'reading', level: 'B1', title: 'The Library in a Train Carriage', topic: 'People, places and hobbies',
    text: `In a small village in the north of Slovakia, there is a library which is different from all the others. It is in an old railway carriage that stood empty for twenty years.

The library was the idea of Mária Hrušková, a retired teacher who has lived in the village all her life. "There was no place where children could read or do their homework together," she says. "The nearest library was fifteen kilometres away."

Mária asked her neighbours for help. A local carpenter, whose son had moved abroad, repaired the carriage for free. Families gave books which they no longer needed, and teenagers painted the walls.

Today the library has over 3,000 books and is open four afternoons a week. The volunteers who run it are mostly retired people. "It isn't only about books," Mária explains. "It's a place where people meet, talk and feel part of a community."`,
    sk: `V malej dedine na severe Slovenska je knižnica, ktorá sa líši od všetkých ostatných. Nachádza sa v starom železničnom vagóne, ktorý dvadsať rokov stál prázdny.

Knižnica bola nápadom Márie Hruškovej, učiteľky na dôchodku, ktorá celý život žije v tejto dedine. „Nebolo tu miesto, kde by si deti mohli spolu čítať alebo robiť domáce úlohy,“ hovorí. „Najbližšia knižnica bola pätnásť kilometrov ďaleko.“

Mária požiadala susedov o pomoc. Miestny stolár, ktorého syn sa odsťahoval do zahraničia, opravil vagón zadarmo. Rodiny darovali knihy, ktoré už nepotrebovali, a tínedžeri vymaľovali steny.

Dnes má knižnica viac ako 3 000 kníh a je otvorená štyri popoludnia do týždňa. Dobrovoľníci, ktorí ju vedú, sú väčšinou dôchodcovia. „Nie je to len o knihách,“ vysvetľuje Mária. „Je to miesto, kde sa ľudia stretávajú, rozprávajú a cítia sa súčasťou komunity.“`,
    words: [['carriage', 'one part of a train'], ['retired', 'no longer working because of age'], ['carpenter', 'a person who makes things from wood'], ['community', 'the people who live in one area']],
    questions: [
      { t: 'mc', q: 'Where is the library?', o: ['In a school', 'In an old train carriage', 'In Mária’s house'], a: 1, e: '“It is in an old railway carriage.”' },
      { t: 'mc', q: 'Why did Mária start the library?', o: ['Children had no place to read together.', 'She wanted to sell books.', 'The old library closed.'], a: 0, e: '“There was no place where children could read or do their homework together.”' },
      { t: 'tf', q: 'The carpenter was paid for his work.', a: false, e: 'He “repaired the carriage for free”.' },
      { t: 'tf', q: 'Teenagers helped by painting the walls.', a: true, e: '“…and teenagers painted the walls.”' },
      { t: 'mc', q: 'According to Mária, the library is also…', o: ['a café', 'a place where people feel part of a community', 'a museum about trains'], a: 1, e: '“It’s a place where people meet, talk and feel part of a community.”' }
    ],
    summary: { prompt: 'Summarise the text in 2–3 sentences. Try to use “who”, “which” or “where”.', model: 'Mária, a retired teacher who lives in a small village, turned an old train carriage into a library. Neighbours, who helped for free, repaired it and gave books. It is now a place where the community meets.', keywords: ['Mária', 'carriage', 'neighbours', 'community'] }
  },
  {
    id: 'l-b1-3', kind: 'listening', level: 'B1', title: 'The Flat Meeting', topic: 'Everyday phrasal verbs and opinions',
    text: `Jack: OK, can we sort out the cleaning problem? In my opinion, the kitchen is a mess.
Mia: I agree. And we always run out of things like washing-up liquid.
Jack: Exactly. I think we should set up a cleaning rota.
Ollie: Hmm, I'm not sure. Rotas never work. People just put off their jobs.
Mia: I see your point, but we need to try something. What about a shared shopping list on our phones?
Ollie: That's a good idea. I can set it up tonight.
Jack: Great. And the rota?
Ollie: OK, let's try it for one month. If it doesn't work, we'll find out what else we can do.
Mia: Deal. Oh, and can someone look after my plants next week? I'm going away.
Jack: Sure, I'll do it.`,
    sk: `Jack: Dobre, môžeme vyriešiť problém s upratovaním? Podľa mňa je v kuchyni neporiadok.
Mia: Súhlasím. A stále nám dochádzajú veci ako prostriedok na riad.
Jack: Presne. Myslím, že by sme si mali zaviesť rozpis upratovania.
Ollie: Hmm, nie som si istý. Rozpisy nikdy nefungujú. Ľudia si povinnosti len odkladajú.
Mia: Chápem, čo myslíš, ale musíme niečo skúsiť. Čo tak spoločný nákupný zoznam v mobiloch?
Ollie: To je dobrý nápad. Dnes večer ho môžem nastaviť.
Jack: Super. A rozpis?
Ollie: Dobre, skúsme ho na mesiac. Ak to nebude fungovať, zistíme, čo iné môžeme urobiť.
Mia: Platí. Ach, a môže sa niekto budúci týždeň postarať o moje rastliny? Odchádzam preč.
Jack: Jasné, urobím to.`,
    words: [['sort out', 'solve a problem'], ['rota', 'a list of who does a job and when'], ['put off', 'delay, do later'], ['look after', 'take care of']],
    questions: [
      { t: 'mc', q: 'What is the main problem?', o: ['The rent', 'The cleaning', 'The noise'], a: 1, e: '“Can we sort out the cleaning problem?”' },
      { t: 'tf', q: 'Ollie likes the idea of a rota at first.', a: false, e: 'He says, “I’m not sure. Rotas never work.”' },
      { t: 'mc', q: 'Who will set up the shared shopping list?', o: ['Jack', 'Mia', 'Ollie'], a: 2, e: 'Ollie: “I can set it up tonight.”' },
      { t: 'mc', q: 'How long will they try the rota?', o: ['One week', 'One month', 'One year'], a: 1, e: '“Let’s try it for one month.”' },
      { t: 'mc', q: 'What will Jack do next week?', o: ['Look after Mia’s plants', 'Go away', 'Buy washing-up liquid'], a: 0, e: '“Can someone look after my plants?” — “Sure, I’ll do it.”' }
    ],
    summary: { prompt: 'Summarise what the flatmates decide. Use at least one phrasal verb.', model: 'The flatmates decide to set up a cleaning rota for one month and a shared shopping list, so they don’t run out of things. Jack will look after Mia’s plants while she is away.', keywords: ['rota', 'shopping list', 'set up', 'plants'] }
  },
  // ------------------------- B2 -------------------------
  {
    id: 'r-b2-1', kind: 'reading', level: 'B2', title: 'Communicating in Remote Teams', topic: 'Professional communication',
    text: `Over the last few years, remote work has been adopted by thousands of companies. For many teams, communication is now carried out almost entirely online. This has clear benefits, but it also creates new challenges.

One common problem is that messages are easily misunderstood. In an office, a short comment is softened by tone of voice and body language. In a chat message, the same comment can come across as rude. Experienced remote managers therefore encourage their teams to be slightly more explicit and friendly in writing than they would be face to face.

Another challenge is meeting overload. When every question is turned into a video call, people lose hours each week. Many companies now follow a simple rule: if an issue can be solved in writing, a meeting should not be scheduled. Every meeting must have an agenda, and notes are shared afterwards with everyone who could not attend.

Finally, trust is essential. Employees who are judged by results rather than by the number of hours they are online tend to be more motivated. As one team leader put it, "I don't need to see people working. I need to see the work."`,
    sk: `Za posledných niekoľko rokov prijali prácu na diaľku tisíce firiem. V mnohých tímoch dnes komunikácia prebieha takmer výlučne online. Má to jasné výhody, ale prináša to aj nové výzvy.

Jedným z častých problémov je, že správy sa ľahko nesprávne pochopia. V kancelárii krátku poznámku zmierni tón hlasu a reč tela. V chatovej správe môže tá istá poznámka pôsobiť hrubo. Skúsení manažéri vzdialených tímov preto povzbudzujú svoje tímy, aby boli v písomnej komunikácii o niečo explicitnejší a priateľskejší, než by boli zoči-voči.

Ďalšou výzvou je preťaženie stretnutiami. Keď sa z každej otázky stane videohovor, ľudia každý týždeň prídu o niekoľko hodín. Mnohé firmy sa dnes riadia jednoduchým pravidlom: ak sa dá problém vyriešiť písomne, stretnutie by sa nemalo plánovať. Každé stretnutie musí mať program a poznámky sa potom zdieľajú so všetkými, ktorí sa nemohli zúčastniť.

Napokon, dôvera je nevyhnutná. Zamestnanci, ktorých hodnotia podľa výsledkov, a nie podľa počtu hodín strávených online, bývajú motivovanejší. Ako to vyjadril jeden vedúci tímu: „Nepotrebujem vidieť ľudí pracovať. Potrebujem vidieť prácu.“`,
    words: [['adopted', 'started to use'], ['come across as', 'seem to be'], ['explicit', 'clear and direct'], ['overload', 'too much of something'], ['agenda', 'a list of topics for a meeting']],
    questions: [
      { t: 'mc', q: 'Why are chat messages easily misunderstood?', o: ['People write too much.', 'There is no tone of voice or body language.', 'Managers do not read them.'], a: 1, e: 'In an office, comments are softened by tone of voice and body language; in chat they are not.' },
      { t: 'mc', q: 'What do experienced remote managers encourage?', o: ['Using only video calls', 'Being more explicit and friendly in writing', 'Writing shorter messages'], a: 1, e: '“…to be slightly more explicit and friendly in writing.”' },
      { t: 'tf', q: 'Many companies schedule a meeting for every question.', a: false, e: 'The rule is: if an issue can be solved in writing, a meeting should not be scheduled.' },
      { t: 'mc', q: 'What happens after meetings?', o: ['Notes are shared.', 'Everyone sends feedback.', 'A new meeting is scheduled.'], a: 0, e: '“Notes are shared afterwards with everyone who could not attend.”' },
      { t: 'mc', q: 'What does the team leader’s quote mean?', o: ['Results matter more than visible activity.', 'People should use their cameras.', 'Managers should check online hours.'], a: 0, e: '“I don’t need to see people working. I need to see the work.”' }
    ],
    summary: { prompt: 'Summarise the three challenges of remote communication in 2–3 sentences.', model: 'Remote teams face three main challenges. Written messages are easily misunderstood, too many meetings waste time, and managers need to trust employees and judge them by results rather than online hours.', keywords: ['misunderstood', 'meetings', 'trust', 'results'] }
  },
  {
    id: 'l-b2-1', kind: 'listening', level: 'B2', title: 'City Centre to Go Car-Free', topic: 'News and reporting',
    text: `Good evening. The city council has announced that the historic centre will become car-free from next spring. Speaking at a press conference this morning, the mayor said that the decision had not been easy, but that air pollution in the centre had reached dangerous levels.

According to the council, the new rules will apply seven days a week. Residents will still be allowed to drive to their homes, and delivery vans will be able to enter before ten in the morning.

The plan is controversial. A spokesperson for local shop owners told reporters that many businesses were worried about losing customers. She asked how elderly people would reach the shops if they could no longer park nearby. The council replied that it would introduce free electric buses.

Meanwhile, a group of cyclists said they were delighted, and claimed that similar projects in other cities had increased the number of visitors. A final decision on the exact date will be made next month.`,
    sk: `Dobrý večer. Mestské zastupiteľstvo oznámilo, že historické centrum bude od budúcej jari bez áut. Primátor na dnešnej rannej tlačovej konferencii povedal, že rozhodnutie nebolo ľahké, ale že znečistenie ovzdušia v centre dosiahlo nebezpečnú úroveň.

Podľa mesta budú nové pravidlá platiť sedem dní v týždni. Obyvatelia budú môcť naďalej dôjsť autom k svojim domom a dodávky budú môcť vjazdiť pred desiatou ráno.

Plán je kontroverzný. Hovorkyňa miestnych obchodníkov novinárom povedala, že mnohé podniky sa obávajú straty zákazníkov. Pýtala sa, ako sa starší ľudia dostanú do obchodov, ak už nebudú môcť parkovať v blízkosti. Mesto odpovedalo, že zavedie bezplatné elektrické autobusy.

Medzitým skupina cyklistov uviedla, že je nadšená, a tvrdila, že podobné projekty v iných mestách zvýšili počet návštevníkov. Konečné rozhodnutie o presnom dátume padne budúci mesiac.`,
    words: [['council', 'the group of people who govern a city'], ['residents', 'people who live in a place'], ['controversial', 'causing disagreement'], ['spokesperson', 'a person who speaks for a group'], ['delighted', 'very happy']],
    questions: [
      { t: 'mc', q: 'Why did the council make this decision?', o: ['Traffic accidents', 'Dangerous air pollution', 'Too many tourists'], a: 1, e: 'The mayor said air pollution had reached dangerous levels.' },
      { t: 'tf', q: 'Residents will not be allowed to drive to their homes.', a: false, e: '“Residents will still be allowed to drive to their homes.”' },
      { t: 'mc', q: 'What were the shop owners worried about?', o: ['Losing customers', 'Higher taxes', 'Noise from buses'], a: 0, e: 'The spokesperson said many businesses were worried about losing customers.' },
      { t: 'mc', q: 'What did the council promise?', o: ['Free parking', 'Free electric buses', 'Lower rents for shops'], a: 1, e: '“The council replied that it would introduce free electric buses.”' },
      { t: 'tf', q: 'The exact starting date has already been decided.', a: false, e: 'A final decision on the exact date will be made next month.' }
    ],
    summary: { prompt: 'Report the news in 2–3 sentences using reported speech (said that, claimed that, asked…).', model: 'The mayor said that the historic centre would become car-free because pollution had reached dangerous levels. Shop owners said they were worried about losing customers, but the council said it would introduce free electric buses. Cyclists claimed that similar projects had attracted more visitors.', keywords: ['said that', 'pollution', 'customers', 'buses'] }
  },
  {
    id: 'r-b2-2', kind: 'reading', level: 'B2', title: 'Starting Again at Forty', topic: 'Decisions and regrets',
    text: `At 38, Tomáš had a well-paid job as a bank manager. On paper, his life was perfect. In reality, he dreaded Monday mornings. "If someone had told me at 25 that I would feel this way, I wouldn't have believed them," he says.

The turning point came when his father became ill. Tomáš spent several weeks at the hospital with him and was impressed by the nurses. "They were exhausted, but they made a real difference every single day. I realised I wanted my work to matter in the same way."

At 40, he decided to retrain as a nurse. The decision had consequences: his income fell by half, and he had to sell his car. Some friends thought he was making a terrible mistake.

Does he regret it? "Not for a second. In hindsight, I should have done it earlier. If I had stayed at the bank, I would be richer now, but I would definitely be less happy." His advice to anyone considering a change is simple: calculate the risks carefully, but don't let fear make the decision for you.`,
    sk: `V 38 rokoch mal Tomáš dobre platenú prácu manažéra v banke. Na papieri bol jeho život dokonalý. V skutočnosti sa desil pondelňajších rán. „Keby mi niekto v 25 povedal, že sa budem takto cítiť, neveril by som mu,“ hovorí.

Zlom prišiel, keď jeho otec ochorel. Tomáš s ním strávil niekoľko týždňov v nemocnici a zdravotné sestry naňho urobili dojem. „Boli vyčerpané, ale každý jeden deň robili skutočný rozdiel. Uvedomil som si, že chcem, aby moja práca mala rovnaký zmysel.“

V 40 rokoch sa rozhodol rekvalifikovať na zdravotníka. Rozhodnutie malo následky: jeho príjem klesol na polovicu a musel predať auto. Niektorí priatelia si mysleli, že robí hroznú chybu.

Ľutuje to? „Ani na sekundu. Spätne si myslím, že som to mal urobiť skôr. Keby som zostal v banke, bol by som dnes bohatší, ale určite by som bol menej šťastný.“ Jeho rada pre každého, kto zvažuje zmenu, je jednoduchá: starostlivo zvážte riziká, ale nedovoľte, aby za vás rozhodol strach.`,
    words: [['dreaded', 'felt very worried about something in the future'], ['turning point', 'a moment of important change'], ['exhausted', 'extremely tired'], ['retrain', 'learn skills for a new job'], ['in hindsight', 'looking back at the past']],
    questions: [
      { t: 'mc', q: 'How did Tomáš feel about his bank job?', o: ['He loved it.', 'He dreaded Mondays.', 'He found it too easy.'], a: 1, e: '“In reality, he dreaded Monday mornings.”' },
      { t: 'mc', q: 'What was the turning point?', o: ['Losing his job', 'His father’s illness', 'A conversation with a friend'], a: 1, e: '“The turning point came when his father became ill.”' },
      { t: 'tf', q: 'Tomáš’s income increased after the change.', a: false, e: '“His income fell by half.”' },
      { t: 'mc', q: '“I should have done it earlier” means…', o: ['He regrets changing his job.', 'He regrets not changing sooner.', 'He changed his job too early.'], a: 1, e: '“Should have done” expresses regret about the past: he wishes he had changed earlier.' },
      { t: 'mc', q: 'What is Tomáš’s advice?', o: ['Never take risks.', 'Calculate risks, but don’t let fear decide.', 'Always choose the best-paid job.'], a: 1, e: '“…calculate the risks carefully, but don’t let fear make the decision for you.”' }
    ],
    summary: { prompt: 'Summarise Tomáš’s story in 2–3 sentences, using at least one conditional.', model: 'Tomáš left a well-paid bank job at 40 to retrain as a nurse after seeing nurses care for his father. He earns much less now but does not regret it. If he had stayed at the bank, he would be richer but less happy.', keywords: ['bank', 'nurse', 'father', 'If he had'] }
  },
  {
    id: 'l-b2-2', kind: 'listening', level: 'B2', title: 'Should Homework Be Banned?', topic: 'Debates and arguments',
    text: `Moderator: Tonight's question: should homework be banned in primary schools? Ms Green, you're in favour.
Ms Green: Yes. Although homework is meant to help children, the evidence that it improves results for young children is surprisingly weak. Furthermore, it creates stress for families and takes time away from play, sport and sleep, which are just as important for development.
Moderator: Mr Patel, you disagree.
Mr Patel: I do. Despite what Ms Green says, homework teaches children responsibility and good study habits. In addition, it shows parents what their children are learning. Without homework, many parents would have no idea what happens in the classroom.
Ms Green: But that could be achieved with a short weekly newsletter, whereas homework takes hours every week.
Mr Patel: Fair point. Nevertheless, I believe a small amount, say twenty minutes of reading, is beneficial. The problem isn't homework itself. It's too much homework.
Moderator: So perhaps you agree more than you think!`,
    sk: `Moderátor: Dnešná otázka znie: mali by sa na prvom stupni základných škôl zakázať domáce úlohy? Pani Greenová, vy ste za.
Pani Greenová: Áno. Hoci domáce úlohy majú deťom pomáhať, dôkazy, že zlepšujú výsledky malých detí, sú prekvapivo slabé. Navyše spôsobujú rodinám stres a berú čas na hru, šport a spánok, ktoré sú pre vývoj rovnako dôležité.
Moderátor: Pán Patel, vy nesúhlasíte.
Pán Patel: Nesúhlasím. Napriek tomu, čo hovorí pani Greenová, domáce úlohy učia deti zodpovednosti a dobrým študijným návykom. Okrem toho ukazujú rodičom, čo sa ich deti učia. Bez domácich úloh by mnohí rodičia netušili, čo sa deje v triede.
Pani Greenová: To by sa však dalo dosiahnuť krátkym týždenným informačným listom, zatiaľ čo domáce úlohy zaberú každý týždeň hodiny.
Pán Patel: To je pravda. Napriek tomu si myslím, že malé množstvo, povedzme dvadsať minút čítania, je prospešné. Problémom nie sú domáce úlohy samy osebe. Problémom je príliš veľa domácich úloh.
Moderátor: Takže možno sa zhodnete viac, než si myslíte!`,
    words: [['in favour', 'supporting an idea'], ['evidence', 'facts that show something is true'], ['responsibility', 'a duty to do something'], ['newsletter', 'a short regular report'], ['beneficial', 'good, helpful']],
    questions: [
      { t: 'mc', q: 'What is Ms Green’s position?', o: ['Homework should be banned in primary schools.', 'Children need more homework.', 'Only reading homework should be banned.'], a: 0, e: 'She is “in favour” of banning homework in primary schools.' },
      { t: 'mc', q: 'Which argument does Ms Green use?', o: ['Homework teaches responsibility.', 'The evidence that it helps young children is weak.', 'Parents like homework.'], a: 1, e: '“…the evidence that it improves results for young children is surprisingly weak.”' },
      { t: 'mc', q: 'According to Mr Patel, homework shows…', o: ['teachers how good they are', 'parents what children are learning', 'children how to play'], a: 1, e: '“…it shows parents what their children are learning.”' },
      { t: 'tf', q: 'Ms Green suggests a weekly newsletter as an alternative.', a: true, e: '“…that could be achieved with a short weekly newsletter.”' },
      { t: 'mc', q: 'What does Mr Patel finally say the real problem is?', o: ['Reading', 'Too much homework', 'Newsletters'], a: 1, e: '“The problem isn’t homework itself. It’s too much homework.”' }
    ],
    summary: { prompt: 'Summarise both sides of the debate in 2–3 sentences, using linking words (although, whereas, however…).', model: 'Ms Green argues that homework should be banned because there is little evidence it helps young children and it causes stress. Mr Patel, however, believes it teaches responsibility and informs parents. In the end, both seem to agree that a small amount is acceptable, whereas too much is harmful.', keywords: ['evidence', 'stress', 'responsibility', 'too much'] }
  },
  {
    id: 'r-b2-3', kind: 'reading', level: 'B2', title: 'How to Make a Habit Stick', topic: 'Collocations and habits',
    text: `Most of us have tried to break a bad habit or build a good one, and most of us have failed at least once. According to behavioural researchers, the problem is rarely a lack of willpower. Instead, it is usually a matter of design.

First, experts suggest starting small. Rather than promising to run five kilometres every day, commit to putting on your running shoes. Making the first step easy reduces the chance of giving up.

Second, pay attention to your environment. If you want to stop checking your phone in bed, avoid charging it in the bedroom. If you want to eat more fruit, keep a bowl of it on the table where you can see it.

Third, link the new habit to an existing one. For example: "After I make my morning coffee, I will practise English for ten minutes." This technique, often called habit stacking, takes advantage of routines that are already automatic.

Finally, take responsibility for your progress, but don't expect perfection. Missing one day is not a disaster; missing two days in a row is the real danger. As one researcher puts it, "Never miss twice."`,
    sk: `Väčšina z nás sa už pokúsila zbaviť zlozvyku alebo si vybudovať dobrý návyk a väčšina z nás aspoň raz zlyhala. Podľa výskumníkov správania problémom zriedka býva nedostatok vôle. Zvyčajne je to skôr otázka nastavenia.

Po prvé, odborníci odporúčajú začať v malom. Namiesto sľubu, že budete každý deň behať päť kilometrov, sa zaviažte, že si obujete bežecké topánky. Keď je prvý krok jednoduchý, znižuje sa šanca, že to vzdáte.

Po druhé, venujte pozornosť svojmu prostrediu. Ak si chcete prestať kontrolovať mobil v posteli, nenabíjajte ho v spálni. Ak chcete jesť viac ovocia, majte misku s ním na stole, kde ju uvidíte.

Po tretie, prepojte nový návyk s existujúcim. Napríklad: „Keď si ráno urobím kávu, budem desať minút cvičiť angličtinu.“ Táto technika, často nazývaná „vrstvenie návykov“, využíva rutiny, ktoré sú už automatické.

Nakoniec, prevezmite zodpovednosť za svoj pokrok, ale neočakávajte dokonalosť. Vynechať jeden deň nie je katastrofa; skutočným nebezpečenstvom je vynechať dva dni za sebou. Ako hovorí jeden výskumník: „Nikdy nevynechaj dvakrát.“`,
    words: [['willpower', 'the ability to control yourself'], ['commit to', 'promise to do'], ['environment', 'the place and things around you'], ['take advantage of', 'use something to help you'], ['in a row', 'one after another']],
    questions: [
      { t: 'mc', q: 'According to researchers, why do people often fail to build habits?', o: ['They lack willpower.', 'The habit is badly designed.', 'They are too busy.'], a: 1, e: '“…the problem is rarely a lack of willpower… it is usually a matter of design.”' },
      { t: 'mc', q: 'What is an example of “starting small”?', o: ['Running 5 km every day', 'Putting on your running shoes', 'Buying expensive equipment'], a: 1, e: '“…commit to putting on your running shoes.”' },
      { t: 'tf', q: 'To stop checking your phone in bed, the text suggests charging it in another room.', a: true, e: '“…avoid charging it in the bedroom.”' },
      { t: 'mc', q: 'What is “habit stacking”?', o: ['Doing many habits at once', 'Linking a new habit to an existing one', 'Writing a list of habits'], a: 1, e: 'It means linking the new habit to an existing routine.' },
      { t: 'mc', q: 'What does “Never miss twice” mean?', o: ['Never miss a single day.', 'Missing one day is OK, but don’t miss two in a row.', 'Practise twice a day.'], a: 1, e: '“Missing one day is not a disaster; missing two days in a row is the real danger.”' }
    ],
    summary: { prompt: 'List the four tips from the text in 2–3 sentences.', model: 'To make a habit stick, start with a very small step and design your environment to help you. Link the new habit to an existing routine, and accept that you may miss a day, but never miss two days in a row.', keywords: ['small', 'environment', 'existing', 'twice'] }
  },
  {
    id: 'l-b2-3', kind: 'listening', level: 'B2', title: 'Two Voicemails', topic: 'Formal and informal English',
    text: `Laura: Good morning, this is Laura Smith from Brightline Furniture. I'm calling regarding your order number 4417. Unfortunately, the delivery that was scheduled for today has been postponed due to a problem with our supplier. We apologise for any inconvenience. A new delivery date will be confirmed by email within 48 hours. If you have any questions, please do not hesitate to contact our customer service team. Thank you, and have a good day.
Sam: Hey, it's Sam! Just wondering, did you get my package? The tracking says it was delivered yesterday, but you haven't said anything, so I guess it must have gone to the wrong flat. Maybe your neighbour's got it? Anyway, give me a ring when you can. Oh, and we should catch up soon. It's been ages! Bye!`,
    sk: `Laura: Dobré ráno, tu Laura Smithová zo spoločnosti Brightline Furniture. Volám ohľadom vašej objednávky číslo 4417. Žiaľ, doručenie naplánované na dnes bolo odložené pre problém u nášho dodávateľa. Ospravedlňujeme sa za prípadné nepríjemnosti. Nový termín doručenia vám potvrdíme e-mailom do 48 hodín. Ak máte akékoľvek otázky, neváhajte kontaktovať náš zákaznícky servis. Ďakujem a prajem pekný deň.
Sam: Ahoj, tu Sam! Len sa chcem spýtať, dostal si môj balík? Podľa sledovania bol doručený včera, ale nič si nepovedal, tak predpokladám, že musel ísť do nesprávneho bytu. Možno ho má tvoj sused? Každopádne mi zavolaj, keď budeš môcť. Jo, a mali by sme sa čoskoro stretnúť a pokecať. Nevideli sme sa celú večnosť! Čau!`,
    words: [['regarding', 'about (formal)'], ['postponed', 'moved to a later time'], ['supplier', 'a company that provides goods'], ['give me a ring', 'call me (informal)'], ['it’s been ages', 'it has been a long time (informal)']],
    questions: [
      { t: 'mc', q: 'Why is Laura calling?', o: ['To sell new furniture', 'To say the delivery has been postponed', 'To ask for payment'], a: 1, e: '“…the delivery that was scheduled for today has been postponed.”' },
      { t: 'mc', q: 'How will the customer get the new delivery date?', o: ['By phone', 'By email within 48 hours', 'By post'], a: 1, e: '“A new delivery date will be confirmed by email within 48 hours.”' },
      { t: 'mc', q: 'What does Sam think happened to the package?', o: ['It was lost by the post office.', 'It must have gone to the wrong flat.', 'It hasn’t been sent yet.'], a: 1, e: '“I guess it must have gone to the wrong flat.”' },
      { t: 'tf', q: 'Laura’s message is informal.', a: false, e: 'Laura uses formal language: “regarding”, “we apologise for any inconvenience”, “do not hesitate to contact”.' },
      { t: 'match', pairs: [['regarding', 'about'], ['give me a ring', 'call me'], ['catch up', 'talk about recent news'], ['do not hesitate to', 'please feel free to']], e: 'Formal and informal expressions from the two messages.' }
    ],
    summary: { prompt: 'In 2 sentences, explain how the two messages are different in tone.', model: 'Laura’s message is formal and polite, with passive forms and fixed phrases such as “we apologise for any inconvenience”. Sam’s message is informal and friendly, with phrasal verbs, short sentences and expressions like “give me a ring”.', keywords: ['formal', 'informal', 'polite', 'friendly'] }
  }
);
