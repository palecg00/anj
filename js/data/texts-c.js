/* LinguaPath — reading and listening texts, C1. */
window.LP = window.LP || {};
LP.TEXTS = LP.TEXTS || [];

LP.TEXTS.push(
  {
    id: 'r-c1-1', kind: 'reading', level: 'C1', title: 'The Myth of Multitasking', topic: 'Nuanced opinions and arguments',
    text: `Many of us take pride in our ability to multitask: answering emails during meetings, listening to podcasts while studying, or switching between a dozen browser tabs. Yet research in cognitive psychology suggests that what we call multitasking is, by and large, an illusion.

For most tasks that require attention, the brain does not process two streams of information simultaneously. Instead, it switches rapidly between them. Each switch carries a small cost, a fraction of a second spent reorienting, and these costs accumulate. Some studies indicate that frequent task-switching can reduce productivity by as much as forty percent, although the exact figure is debatable and depends heavily on the tasks involved.

It would, however, be an oversimplification to claim that all multitasking is harmful. Combining an automatic activity, such as walking, with a demanding one, such as a phone conversation, is generally unproblematic. Difficulties arise when two tasks compete for the same mental resources, such as reading a text while listening to someone speak.

Arguably, the more interesting question is not whether we can multitask, but why we feel compelled to. Constant switching may provide a sense of busyness and small rewards, such as a new message or a notification, that make focused work feel dull by comparison. Recognising this may be the first step towards reclaiming our attention.`,
    sk: `Mnohí z nás sú hrdí na to, že zvládajú robiť viac vecí naraz: odpovedajú na e-maily počas porád, počúvajú podcasty pri učení alebo prepínajú medzi tuctom kariet v prehliadači. Výskum v kognitívnej psychológii však naznačuje, že to, čo nazývame multitasking, je vo všeobecnosti ilúzia.

Pri väčšine úloh, ktoré si vyžadujú pozornosť, mozog nespracúva dva prúdy informácií súčasne. Namiesto toho medzi nimi rýchlo prepína. Každé prepnutie má malú cenu, zlomok sekundy potrebný na preorientovanie, a tieto náklady sa sčítavajú. Niektoré štúdie naznačujú, že časté prepínanie medzi úlohami môže znížiť produktivitu až o štyridsať percent, hoci presné číslo je diskutabilné a vo veľkej miere závisí od konkrétnych úloh.

Bolo by však prílišným zjednodušením tvrdiť, že každý multitasking škodí. Kombinácia automatickej činnosti, napríklad chôdze, s náročnou činnosťou, napríklad telefonovaním, je spravidla bezproblémová. Ťažkosti vznikajú, keď dve úlohy súperia o rovnaké mentálne zdroje, napríklad keď čítame text a zároveň počúvame, ako niekto hovorí.

Zaujímavejšou otázkou je pravdepodobne nie to, či dokážeme robiť viac vecí naraz, ale prečo cítime nutkanie to robiť. Neustále prepínanie nám môže dávať pocit zaneprázdnenosti a malé odmeny, napríklad novú správu či upozornenie, vďaka ktorým sa sústredená práca v porovnaní zdá nudná. Uvedomiť si to môže byť prvým krokom k tomu, aby sme si znovu získali svoju pozornosť.`,
    words: [['simultaneously', 'at exactly the same time'], ['accumulate', 'gradually increase'], ['debatable', 'not certain; open to discussion'], ['oversimplification', 'describing something as simpler than it is'], ['compelled', 'feeling that you must do something'], ['reclaiming', 'getting back']],
    questions: [
      { t: 'mc', q: 'What is the writer’s main point about multitasking?', o: ['It is a useful skill everyone should develop.', 'For attention-heavy tasks, it is mostly rapid switching, which has costs.', 'It has no effect on productivity.'], a: 1, e: 'The brain “switches rapidly between them. Each switch carries a small cost.”' },
      { t: 'mc', q: 'Why does the writer call the forty percent figure “debatable”?', o: ['It comes from an unreliable website.', 'It depends heavily on the tasks involved.', 'Most studies show a much higher figure.'], a: 1, e: '“…the exact figure is debatable and depends heavily on the tasks involved.”' },
      { t: 'tf', q: 'The writer claims that all multitasking is harmful.', a: false, e: 'The writer says this would be “an oversimplification”.' },
      { t: 'mc', q: 'Which combination is described as generally unproblematic?', o: ['Reading and listening to speech', 'Walking and talking on the phone', 'Writing emails in a meeting'], a: 1, e: 'An automatic activity (walking) plus a demanding one (a phone conversation).' },
      { t: 'mc', q: 'What does the final paragraph imply?', o: ['We multitask partly because switching feels rewarding.', 'Notifications improve concentration.', 'Focused work is naturally boring.'], a: 0, e: 'Switching provides “a sense of busyness and small rewards” that make focused work feel dull “by comparison”.' }
    ],
    summary: { prompt: 'Summarise the article in 3 sentences, keeping its nuance (avoid absolute claims).', model: 'The article argues that, for tasks requiring attention, multitasking is largely rapid switching, which can significantly reduce productivity. However, it acknowledges that combining an automatic activity with a demanding one is usually fine. It suggests that we may multitask because switching feels rewarding, and recognising this could help us focus.', keywords: ['switching', 'productivity', 'automatic', 'rewarding'] }
  },
  {
    id: 'l-c1-1', kind: 'listening', level: 'C1', title: 'Idioms at Work', topic: 'Idiomatic expressions',
    text: `Good afternoon, everyone. Let me get the ball rolling with a confession: when I started working for an international company, idioms nearly drove me mad. In my very first meeting, my manager said that the new software was a steep learning curve and that we shouldn't cut corners. I nodded politely and understood almost nothing.

Here's the thing. Native speakers use idioms constantly, often without realising it. For non-native colleagues, this can create a real barrier. So my first piece of advice for native speakers is simple: if your team is international, keep idioms to a minimum, or explain them.

My advice for learners is different. Don't try to memorise hundreds of idioms from a list. Instead, notice the ones that come up repeatedly in your field. In business, you'll hear "on the same page", "back to square one" and "go the extra mile" far more often than anything about cats and dogs.

And finally, don't be afraid to ask. When a colleague says something like "Let's not bite off more than we can chew", simply ask, "Sorry, what do you mean by that?" Most people are happy to explain. And quite often, it turns out that the elephant in the room is that nobody else understood it either.`,
    sk: `Dobrý deň všetkým. Dovoľte mi začať priznaním: keď som začal pracovať pre medzinárodnú firmu, idiómy ma takmer priviedli do šialenstva. Na úplne prvej porade môj manažér povedal, že nový softvér je „strmá krivka učenia“ a že by sme nemali „rezať zákruty“. Zdvorilo som prikyvoval a nerozumel som takmer ničomu.

Ide o toto. Rodení hovoriaci používajú idiómy neustále, často si to ani neuvedomujú. Pre kolegov, ktorí nie sú rodení hovoriaci, to môže vytvoriť skutočnú bariéru. Moja prvá rada pre rodených hovoriacich je teda jednoduchá: ak je váš tím medzinárodný, obmedzte idiómy na minimum alebo ich vysvetlite.

Moja rada pre študentov je iná. Nesnažte sa naučiť stovky idiómov zo zoznamu. Namiesto toho si všímajte tie, ktoré sa vo vašom odbore opakovane objavujú. V biznise budete počuť „on the same page“, „back to square one“ a „go the extra mile“ oveľa častejšie než čokoľvek o mačkách a psoch.

A nakoniec, nebojte sa opýtať. Keď kolega povie niečo ako „Let’s not bite off more than we can chew“, jednoducho sa opýtajte: „Prepáčte, čo tým myslíte?“ Väčšina ľudí to rada vysvetlí. A pomerne často sa ukáže, že problémom, o ktorom nikto nehovorí, je to, že tomu nerozumel ani nikto iný.`,
    words: [['confession', 'admitting something'], ['barrier', 'something that stops communication or progress'], ['field', 'an area of work or study'], ['steep learning curve', 'a lot to learn quickly']],
    questions: [
      { t: 'mc', q: 'How did the speaker feel in their first international meeting?', o: ['Confident and relaxed', 'Confused by the idioms', 'Bored by the software'], a: 1, e: '“I nodded politely and understood almost nothing.”' },
      { t: 'mc', q: 'What does the speaker advise native speakers in international teams to do?', o: ['Use more idioms to sound natural', 'Keep idioms to a minimum or explain them', 'Speak more slowly'], a: 1, e: '“…keep idioms to a minimum, or explain them.”' },
      { t: 'tf', q: 'The speaker recommends learning idioms from long lists.', a: false, e: '“Don’t try to memorise hundreds of idioms from a list.”' },
      { t: 'mc', q: 'Why does the speaker mention “cats and dogs”?', o: ['To show that some famous idioms are rarely used at work', 'Because it is a common business idiom', 'To tell a joke about pets'], a: 0, e: 'Idioms common in business are heard “far more often than anything about cats and dogs” (e.g. “raining cats and dogs”).' },
      { t: 'mc', q: 'What is implied in the last sentence?', o: ['Other people often don’t understand idioms either, but don’t say so.', 'Elephants are a common topic in meetings.', 'Asking questions is impolite.'], a: 0, e: '“The elephant in the room” is the obvious problem nobody mentions: nobody else understood either.' }
    ],
    summary: { prompt: 'Summarise the speaker’s three pieces of advice in 2–3 sentences.', model: 'The speaker advises native speakers in international teams to limit idioms or explain them. Learners should focus on idioms that come up repeatedly in their own field rather than memorising lists. Finally, everyone should feel free to ask what an idiom means, as others may not understand it either.', keywords: ['minimum', 'field', 'ask', 'explain'] }
  },
  {
    id: 'r-c1-2', kind: 'reading', level: 'C1', title: 'Why Tone Matters in Email', topic: 'Register and tone',
    text: `Consider two emails sent by a manager to a colleague who has missed a deadline. The first reads: "The report was due yesterday. Send it today." The second: "I noticed the report didn't arrive yesterday. Is everything OK? It would be great if you could send it over today." Both convey the same basic request, yet they are likely to produce very different reactions.

The first message is not technically rude; it is simply blunt. In face-to-face conversation, a warm tone of voice or a smile might soften it. In writing, however, these cues disappear, and readers tend to fill the gap with negative interpretations. Research on digital communication suggests that recipients systematically perceive emails as more hostile than their senders intended.

This does not mean that every message should be wrapped in elaborate politeness. Excessively indirect language can come across as insincere or even passive-aggressive, and it may obscure what is actually being asked. The skill lies in choosing a register that fits the relationship and the situation: courteous but clear, warm but professional.

A useful test is to reread an important message as if you were the recipient on a bad day. If any sentence could be read as an accusation, it probably will be.`,
    sk: `Predstavte si dva e-maily, ktoré manažér poslal kolegovi, ktorý nestihol termín. Prvý znie: „Správa mala byť včera. Pošli ju dnes.“ Druhý: „Všimol som si, že správa včera neprišla. Je všetko v poriadku? Bolo by super, keby si ju mohol poslať dnes.“ Oba vyjadrujú tú istú základnú požiadavku, no pravdepodobne vyvolajú veľmi odlišné reakcie.

Prvá správa nie je technicky nezdvorilá, je jednoducho strohá. V rozhovore zoči-voči by ju mohol zmierniť vľúdny tón hlasu alebo úsmev. V písanej podobe však tieto signály miznú a čitatelia majú tendenciu vyplniť medzeru negatívnymi interpretáciami. Výskum digitálnej komunikácie naznačuje, že príjemcovia systematicky vnímajú e-maily ako nepriateľskejšie, než ich odosielatelia zamýšľali.

To neznamená, že každá správa by mala byť zabalená do prepracovanej zdvorilosti. Prehnane nepriamy jazyk môže pôsobiť neúprimne alebo dokonca pasívne agresívne a môže zastrieť, o čo sa vlastne žiada. Umenie spočíva vo voľbe štýlu, ktorý zodpovedá vzťahu a situácii: zdvorilý, ale jasný, vľúdny, ale profesionálny.

Užitočným testom je prečítať si dôležitú správu znova, akoby ste boli príjemca, ktorý má zlý deň. Ak sa dá niektorá veta prečítať ako obvinenie, pravdepodobne sa tak aj prečíta.`,
    words: [['convey', 'communicate'], ['blunt', 'very direct, without softening'], ['cues', 'signals that help you understand'], ['hostile', 'unfriendly, aggressive'], ['obscure', 'make unclear'], ['register', 'level of formality']],
    questions: [
      { t: 'mc', q: 'According to the writer, the first email is…', o: ['rude and unprofessional', 'blunt but not technically rude', 'too indirect'], a: 1, e: '“The first message is not technically rude; it is simply blunt.”' },
      { t: 'mc', q: 'Why do emails often seem more negative than intended?', o: ['People write them too quickly.', 'Cues like tone of voice disappear, and readers fill the gap negatively.', 'Emails are usually too long.'], a: 1, e: '“…these cues disappear, and readers tend to fill the gap with negative interpretations.”' },
      { t: 'tf', q: 'The writer recommends using as much politeness as possible in every email.', a: false, e: 'Excessively indirect language can seem insincere or passive-aggressive.' },
      { t: 'mc', q: 'What is the “useful test” in the last paragraph?', o: ['Ask a colleague to check your email.', 'Reread the message as if you were the recipient on a bad day.', 'Count the polite phrases.'], a: 1, e: '“…reread an important message as if you were the recipient on a bad day.”' },
      { t: 'mc', q: 'Which phrase best describes the ideal register, according to the text?', o: ['Formal and distant', 'Courteous but clear', 'Casual and funny'], a: 1, e: '“…courteous but clear, warm but professional.”' }
    ],
    summary: { prompt: 'Summarise the writer’s argument in 3 sentences.', model: 'Written messages lose the tone and facial expressions that soften spoken requests, so readers often interpret them more negatively than intended. However, excessive politeness can sound insincere and make the request unclear. Writers should therefore choose a register that is courteous but clear, and reread important messages from the recipient’s point of view.', keywords: ['tone', 'negatively', 'insincere', 'courteous'] }
  },
  {
    id: 'l-c1-2', kind: 'listening', level: 'C1', title: 'Lecture: Urban Heat Islands', topic: 'Academic writing',
    text: `Today I'd like to look at a phenomenon that affects almost every large city: the urban heat island effect. Put simply, urban areas tend to be significantly warmer than the surrounding countryside, in some cases by as much as seven degrees at night.

So what causes it? There are three main factors. First, materials such as asphalt and concrete absorb heat during the day and release it slowly at night. Second, the lack of vegetation means there is less evaporation, which would otherwise cool the air. And third, heat generated by traffic, air conditioning and industry adds to the problem.

Why does this matter? Higher temperatures are not merely uncomfortable. Data from several European heatwaves indicates a strong correlation between night-time temperatures and hospital admissions, particularly among elderly residents. Consequently, the heat island effect is increasingly seen as a public health issue rather than simply an environmental one.

The good news is that its effects can be mitigated. Planting trees, installing green roofs and using lighter, more reflective materials have all been shown to reduce local temperatures. In the next session, we'll examine the methodology of a study that measured the impact of these interventions in three cities.`,
    sk: `Dnes by som sa chcel pozrieť na jav, ktorý postihuje takmer každé veľké mesto: efekt mestského tepelného ostrova. Zjednodušene povedané, mestské oblasti bývajú výrazne teplejšie ako okolitá krajina, v niektorých prípadoch v noci až o sedem stupňov.

Čo ho teda spôsobuje? Existujú tri hlavné faktory. Po prvé, materiály ako asfalt a betón cez deň pohlcujú teplo a v noci ho pomaly uvoľňujú. Po druhé, nedostatok vegetácie znamená menšie vyparovanie, ktoré by inak ochladzovalo vzduch. A po tretie, k problému prispieva teplo vytvárané dopravou, klimatizáciou a priemyslom.

Prečo je to dôležité? Vyššie teploty nie sú len nepríjemné. Údaje z viacerých európskych vĺn horúčav naznačujú silnú koreláciu medzi nočnými teplotami a počtom prijatí do nemocníc, najmä u starších obyvateľov. V dôsledku toho sa efekt tepelného ostrova čoraz viac vníma ako problém verejného zdravia, a nie iba ako environmentálny problém.

Dobrou správou je, že jeho účinky sa dajú zmierniť. Výsadba stromov, zelené strechy a používanie svetlejších, viac odrážajúcich materiálov preukázateľne znižujú lokálne teploty. Na budúcej hodine preskúmame metodológiu štúdie, ktorá merala vplyv týchto opatrení v troch mestách.`,
    words: [['phenomenon', 'something that happens and can be observed'], ['vegetation', 'plants and trees'], ['evaporation', 'water changing into gas'], ['correlation', 'a connection between two things'], ['mitigated', 'made less serious']],
    questions: [
      { t: 'mc', q: 'How much warmer can cities be at night, according to the lecture?', o: ['Up to two degrees', 'Up to seven degrees', 'Up to seventeen degrees'], a: 1, e: '“…in some cases by as much as seven degrees at night.”' },
      { t: 'mc', q: 'Which is NOT mentioned as a cause?', o: ['Asphalt and concrete', 'Lack of vegetation', 'Higher humidity near rivers'], a: 2, e: 'The three causes are materials, lack of vegetation and heat from human activity.' },
      { t: 'tf', q: 'The lecturer says the effect is now seen as a public health issue.', a: true, e: '“…increasingly seen as a public health issue rather than simply an environmental one.”' },
      { t: 'mc', q: 'Which group is particularly affected?', o: ['Children', 'Elderly residents', 'Office workers'], a: 1, e: '“…particularly among elderly residents.”' },
      { t: 'mc', q: 'What will the next session cover?', o: ['The history of cities', 'The methodology of a study on interventions', 'Air conditioning technology'], a: 1, e: '“…we’ll examine the methodology of a study that measured the impact of these interventions.”' }
    ],
    summary: { prompt: 'Write a 3-sentence academic summary. Try to use nominalisation (e.g. “the absorption of heat”).', model: 'The lecture explains the urban heat island effect, in which cities are significantly warmer than surrounding areas. Its main causes are the absorption of heat by artificial materials, the lack of vegetation and heat from human activity. Because of its correlation with hospital admissions, it is increasingly treated as a public health issue, although tree planting and green roofs can mitigate it.', keywords: ['warmer', 'materials', 'vegetation', 'health', 'mitigate'] }
  },
  {
    id: 'r-c1-3', kind: 'reading', level: 'C1', title: 'Less Is More: Presentations People Remember', topic: 'Professional presentations',
    text: `Most presentations are forgotten within days, not because the speakers lack expertise, but because they try to say too much. Having spent weeks on a project, presenters are understandably reluctant to leave anything out. The result is a dense sequence of slides that overwhelms the audience rather than engaging it.

Effective speakers start from the opposite direction. Before opening any software, they ask a single question: what is the one takeaway I want the audience to remember? Everything that does not support that message is either cut or moved to an appendix.

Structure matters as much as content. A classic approach is to open with a problem the audience recognises, outline a possible solution, and then provide evidence. Opening with a rhetorical question or a brief story can be persuasive, provided it is relevant; anecdotes inserted merely for entertainment tend to feel like a digression.

Visual aids should support the speaker rather than replace them. A slide filled with text invites the audience to read instead of listen. A single striking chart or image, by contrast, can emphasise a point far more powerfully than a list of bullet points.

To sum up: less is usually more. Audiences rarely complain that a talk was too clear or too short.`,
    sk: `Väčšina prezentácií sa zabudne v priebehu niekoľkých dní, nie preto, že by rečníkom chýbali odborné znalosti, ale preto, že sa snažia povedať priveľa. Po týždňoch strávených na projekte sa prezentujúci pochopiteľne zdráhajú čokoľvek vynechať. Výsledkom je hustý sled snímok, ktorý publikum skôr zahltí, než zaujme.

Efektívni rečníci začínajú z opačnej strany. Skôr než otvoria akýkoľvek softvér, položia si jedinú otázku: aké je to jedno posolstvo, ktoré si má publikum zapamätať? Všetko, čo toto posolstvo nepodporuje, buď vyškrtnú, alebo presunú do prílohy.

Štruktúra je rovnako dôležitá ako obsah. Klasickým prístupom je začať problémom, ktorý publikum pozná, načrtnúť možné riešenie a potom predložiť dôkazy. Začať rečníckou otázkou alebo krátkym príbehom môže byť presvedčivé, ak je to relevantné; anekdoty vložené len pre zábavu zvyčajne pôsobia ako odbočka.

Vizuálne pomôcky by mali rečníka podporovať, nie nahrádzať. Snímka plná textu vedie publikum k tomu, aby čítalo namiesto počúvania. Jediný výrazný graf alebo obrázok naopak dokáže zdôrazniť myšlienku oveľa silnejšie než zoznam odrážok.

Zhrnuté: menej je zvyčajne viac. Publikum sa len zriedka sťažuje, že prednáška bola príliš jasná alebo príliš krátka.`,
    words: [['expertise', 'special knowledge or skill'], ['reluctant', 'not wanting to do something'], ['overwhelms', 'is too much for someone'], ['appendix', 'extra material at the end'], ['digression', 'moving away from the main topic'], ['striking', 'very noticeable']],
    questions: [
      { t: 'mc', q: 'According to the text, why are most presentations forgotten?', o: ['Speakers lack expertise.', 'Speakers try to say too much.', 'Slides are too simple.'], a: 1, e: '“…not because the speakers lack expertise, but because they try to say too much.”' },
      { t: 'mc', q: 'What question do effective speakers ask first?', o: ['How many slides do I need?', 'What is the one takeaway?', 'Which software is best?'], a: 1, e: '“…what is the one takeaway I want the audience to remember?”' },
      { t: 'tf', q: 'The writer says that stories should never be used in presentations.', a: false, e: 'A brief story can be persuasive “provided it is relevant”.' },
      { t: 'mc', q: 'What is the problem with slides full of text?', o: ['They are hard to design.', 'The audience reads instead of listening.', 'They take too long to print.'], a: 1, e: '“A slide filled with text invites the audience to read instead of listen.”' },
      { t: 'mc', q: 'The phrase “provided it is relevant” means…', o: ['only if it is relevant', 'because it is relevant', 'even if it is not relevant'], a: 0, e: '“Provided (that)” means “only if / on condition that”.' }
    ],
    summary: { prompt: 'Summarise the advice in 3 sentences, using at least one participle clause.', model: 'Focusing on a single key message, effective presenters cut everything that does not support it. They structure their talk around a recognisable problem, a solution and evidence, using stories only when relevant. Supported by simple visuals rather than text-heavy slides, they keep their talks clear and short.', keywords: ['one', 'message', 'structure', 'visuals'] }
  },
  {
    id: 'l-c1-3', kind: 'listening', level: 'C1', title: 'Feedback on a Proposal', topic: 'Understanding implied meaning',
    text: `Anna: So, what did you think of my proposal?
Mark: Well, it's certainly ambitious.
Anna: Ambitious in a good way?
Mark: There are some interesting ideas. I wonder if the timeline might be a little optimistic, though. And the budget. I'm sure finance will have a few questions.
Anna: You think it's unrealistic.
Mark: I didn't say that. I just think it might be worth getting a second opinion before you send it to the director. Perhaps Laura could have a look? She's very good with numbers.
Anna: Right. Anything else?
Mark: No, no. It's a great start. Honestly. It's about time we had some fresh ideas in this department.
Anna: Thanks. I think.`,
    sk: `Anna: Tak čo si myslíš o mojom návrhu?
Mark: Nuž, je určite ambiciózny.
Anna: Ambiciózny v dobrom zmysle?
Mark: Sú tam niektoré zaujímavé nápady. Hoci si nie som istý, či nie je harmonogram trochu optimistický. A rozpočet. Som si istý, že finančné oddelenie bude mať zopár otázok.
Anna: Myslíš si, že je nereálny.
Mark: To som nepovedal. Len si myslím, že by stálo za to získať aj iný názor, než ho pošleš riaditeľovi. Možno by sa naň mohla pozrieť Laura? Je veľmi dobrá v číslach.
Anna: Jasné. Ešte niečo?
Mark: Nie, nie. Je to skvelý začiatok. Naozaj. Už bol čas, aby sme mali na tomto oddelení nejaké nové nápady.
Anna: Ďakujem. Asi.`,
    words: [['ambitious', 'wanting to achieve a lot; sometimes too much'], ['optimistic', 'expecting good results, sometimes unrealistically'], ['second opinion', 'advice from another person'], ['fresh', 'new and different']],
    questions: [
      { t: 'mc', q: 'What does Mark most likely really think about the proposal?', o: ['It is perfect.', 'It has serious problems with time and money.', 'It is boring.'], a: 1, e: 'He hints that the timeline is “optimistic” and finance “will have a few questions” — polite ways to signal problems.' },
      { t: 'mc', q: 'When Mark says “it’s certainly ambitious”, he is probably…', o: ['giving strong praise', 'politely hinting that it may be too ambitious', 'saying he is jealous'], a: 1, e: 'The pause and the word “certainly” suggest a reservation rather than pure praise.' },
      { t: 'tf', q: 'Mark directly says the proposal is unrealistic.', a: false, e: 'He says, “I didn’t say that.” He only implies it.' },
      { t: 'mc', q: 'Why does Mark suggest Laura?', o: ['She is the director.', 'He thinks the numbers need checking.', 'She wrote the proposal.'], a: 1, e: '“She’s very good with numbers.” This implies the budget needs work.' },
      { t: 'mc', q: 'What does Anna’s final line “Thanks. I think.” suggest?', o: ['She is sure it was a compliment.', 'She is unsure whether Mark’s comments were positive.', 'She is angry with Laura.'], a: 1, e: '“I think” shows she is not sure whether to feel complimented.' }
    ],
    summary: { prompt: 'Explain in 2–3 sentences what Mark really means, and how he says it indirectly.', model: 'Mark believes the proposal has weaknesses, especially an unrealistic timeline and budget. Instead of saying this directly, he uses hedges such as “a little optimistic” and suggests a second opinion from a colleague who is good with numbers. He ends with praise to soften the criticism, which leaves Anna unsure how to feel.', keywords: ['timeline', 'budget', 'indirect', 'soften'] }
  }
);
