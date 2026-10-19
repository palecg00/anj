/* LinguaPath — writing tasks. Checklist checks:
   words (min words), sentences (min sentences), paragraphs (min paragraphs), any (contains at least one item of list),
   count (contains at least n different items of list), manual (learner ticks it). */
window.LP = window.LP || {};

LP.WRITING = [
  {
    id: 'w-a1-about', level: 'A1', title: 'Five Sentences About You', type: 'Personal description',
    prompt: 'Write five sentences about yourself. Say your name, your age, where you are from, what you do and something you like.',
    min: 30, max: 80,
    checklist: [
      { t: 'Write at least 5 sentences.', k: 'sentences', v: 5 },
      { t: 'Say your name (My name is… / I’m…).', k: 'any', v: ['my name is', 'i\'m', 'i am'] },
      { t: 'Say where you are from.', k: 'any', v: ['from'] },
      { t: 'Say something you like (I like…).', k: 'any', v: ['like', 'love', 'enjoy'] },
      { t: 'Start every sentence with a capital letter.', k: 'manual' }
    ],
    vocab: ['My name is…', 'I am … years old.', 'I am from…', 'I live in…', 'I am a student / I work as a…', 'I like…'],
    tips: ['Use “I am” or “I’m” with your age: I’m 20 years old.', 'Use “a” or “an” before a job: I’m a nurse.'],
    model: `My name is Lucia. I am twenty-two years old. I am from Žilina, but I live in Bratislava now. I am a student at the university. I like music, coffee and long walks with my dog.`
  },
  {
    id: 'w-a1-routine', level: 'A1', title: 'My Daily Routine', type: 'Description',
    prompt: 'Describe a normal day in your life. What time do you get up? What do you do in the morning, afternoon and evening?',
    min: 40, max: 100,
    checklist: [
      { t: 'Write at least 40 words.', k: 'words', v: 40 },
      { t: 'Use at least two times (at seven o’clock, at half past six…).', k: 'count', v: ['o\'clock', 'half past', 'quarter', ' at 6', ' at 7', ' at 8', ' at 9', 'at six', 'at seven', 'at eight', 'at nine', 'at ten', 'at eleven', 'at five'], n: 2 },
      { t: 'Use frequency words (always, usually, never…).', k: 'any', v: ['always', 'usually', 'often', 'sometimes', 'never'] },
      { t: 'Use sequence words (then, after that…).', k: 'any', v: ['then', 'after that', 'after', 'later', 'finally'] },
      { t: 'Use the present simple correctly.', k: 'manual' }
    ],
    vocab: ['get up', 'have breakfast', 'go to work / school', 'have lunch', 'come home', 'have dinner', 'go to bed', 'then', 'after that'],
    tips: ['Use the present simple for routines: I get up at seven.', 'Put frequency adverbs before the main verb: I usually walk.'],
    model: `I usually get up at half past six. First, I have a shower and then I have breakfast. I go to work by bus at half past seven. I work from eight to four. After that, I go to the shop or the gym. In the evening, I cook dinner and watch TV. I never go to bed late. I always go to bed at eleven o'clock.`
  },
  {
    id: 'w-a1-town', level: 'A1', title: 'My Town', type: 'Description',
    prompt: 'Describe your town or village. What places are there? Where are they? What do you like there?',
    min: 40, max: 100,
    checklist: [
      { t: 'Write at least 40 words.', k: 'words', v: 40 },
      { t: 'Use “there is” or “there are”.', k: 'any', v: ['there is', 'there are', 'there\'s'] },
      { t: 'Use at least two prepositions of place (near, opposite, next to, between).', k: 'count', v: ['near', 'opposite', 'next to', 'between', 'behind', 'in front of'], n: 2 },
      { t: 'Say what you like in your town.', k: 'any', v: ['like', 'love', 'favourite', 'favorite'] }
    ],
    vocab: ['There is a…', 'There are some…', 'next to', 'opposite', 'between', 'near', 'park', 'library', 'station', 'square'],
    tips: ['Use “there is” for one thing and “there are” for more than one thing.'],
    model: `I live in a small town in the north of Slovakia. There is a beautiful square in the centre. There are two supermarkets, a library and a big park. The library is next to the school, and the station is near the river. There is a nice café opposite the church. I like the park because it is quiet and green.`
  },
  // ------------------------- A2 -------------------------
  {
    id: 'w-a2-postcard', level: 'A2', title: 'A Holiday Postcard', type: 'Informal message',
    prompt: 'You have just come back from a trip. Write a postcard or message to a friend. Say where you went, how you travelled, what you did and how it was.',
    min: 60, max: 120,
    checklist: [
      { t: 'Write at least 60 words.', k: 'words', v: 60 },
      { t: 'Start with a greeting (Dear… / Hi…).', k: 'any', v: ['dear', 'hi ', 'hello'] },
      { t: 'Use at least four past simple verbs (went, visited, saw…).', k: 'count', v: ['went', 'visited', 'saw', 'took', 'ate', 'had', 'was', 'were', 'bought', 'stayed', 'travelled', 'traveled', 'walked', 'swam', 'enjoyed', 'loved', 'liked', 'arrived'], n: 4 },
      { t: 'End with a closing (See you soon / Love / Best wishes).', k: 'any', v: ['see you', 'love', 'best wishes', 'bye', 'take care'] }
    ],
    vocab: ['went', 'took the train', 'stayed in a hotel', 'visited', 'it was amazing', 'the weather was…', 'See you soon!'],
    tips: ['Use the past simple for finished actions: we went, we saw.', 'Use “was/were” to describe things: The food was great.'],
    model: `Hi Tom,

I'm back from Prague! We took the train on Friday morning. The journey was only four hours. We stayed in a small hotel near the old town. On Saturday we visited the castle and walked across Charles Bridge. The weather was sunny and warm. We ate a lot of good food, but it was quite expensive. I bought a present for you!

See you soon,
Eva`
  },
  {
    id: 'w-a2-email', level: 'A2', title: 'An Email About Your Plans', type: 'Informal email',
    prompt: 'Write an email to a friend. Tell them about your plans for next weekend and invite them to join you.',
    min: 60, max: 120,
    checklist: [
      { t: 'Write at least 60 words.', k: 'words', v: 60 },
      { t: 'Use “going to” for your plans.', k: 'any', v: ['going to', 'gonna'] },
      { t: 'Invite your friend (Would you like to…? / Do you want to…?).', k: 'any', v: ['would you like', 'do you want', 'why don\'t you', 'join', 'come with'] },
      { t: 'Use “will” at least once.', k: 'any', v: ['will', '\'ll'] },
      { t: 'Use a greeting and a closing.', k: 'manual' }
    ],
    vocab: ['I’m going to…', 'Would you like to come?', 'It will be fun.', 'Let me know.', 'I hope you can come.', 'I look forward to…'],
    tips: ['“Going to” = plans. “Will” = predictions and offers: It will be fun. I’ll pick you up.'],
    model: `Hi Marek,

How are you? Next weekend I'm going to visit my grandparents in the mountains. On Saturday we're going to go hiking, and in the evening my grandma is going to make her famous soup. Would you like to come with me? There's a free room, and I'm sure you will love the views. I'll pick you up at nine on Saturday morning.

Let me know by Thursday!
Peter`
  },
  {
    id: 'w-a2-advice', level: 'A2', title: 'Advice for a Sick Friend', type: 'Informal message',
    prompt: 'Your friend has a bad cold and an important exam next week. Write a message to them. Say you are sorry and give some advice.',
    min: 50, max: 110,
    checklist: [
      { t: 'Write at least 50 words.', k: 'words', v: 50 },
      { t: 'Say you are sorry (I’m sorry to hear…).', k: 'any', v: ['sorry'] },
      { t: 'Give at least two pieces of advice with “should”.', k: 'occurs', v: ['should'], n: 2 },
      { t: 'Offer help (I can… / I’ll…).', k: 'any', v: ['i can', 'i\'ll', 'i will', 'can i'] }
    ],
    vocab: ['I’m sorry to hear that…', 'You should…', 'You shouldn’t…', 'rest', 'drink a lot of water', 'Get well soon!'],
    tips: ['After “should” use the base verb: You should rest (not “should to rest”).'],
    model: `Hi Anna,

I'm sorry to hear that you are ill. You should stay in bed and rest. You should drink a lot of water and hot tea with honey. You shouldn't study for many hours; short breaks are better. I can bring you my notes from class tomorrow. Get well soon!

Love,
Zuzka`
  },
  // ------------------------- B1 -------------------------
  {
    id: 'w-b1-experience', level: 'B1', title: 'A Memorable Experience', type: 'Story',
    prompt: 'Write a short story about a memorable experience in your life (a trip, an achievement, a surprise or a difficult moment). Explain what happened and how you felt.',
    min: 100, max: 180,
    checklist: [
      { t: 'Write at least 100 words.', k: 'words', v: 100 },
      { t: 'Use at least two paragraphs.', k: 'paragraphs', v: 2 },
      { t: 'Use the past continuous for background (I was walking…).', k: 'any', v: ['was ', 'were '] },
      { t: 'Use sequence words (first, then, suddenly, in the end…).', k: 'count', v: ['first', 'then', 'suddenly', 'after that', 'later', 'in the end', 'finally', 'eventually', 'while'], n: 2 },
      { t: 'Say how you felt.', k: 'any', v: ['felt', 'feel', 'happy', 'scared', 'proud', 'nervous', 'excited', 'surprised', 'sad'] }
    ],
    vocab: ['It happened when…', 'I was … when suddenly…', 'At first…', 'In the end…', 'I felt proud / scared / relieved', 'I’ll never forget…'],
    tips: ['Background: past continuous (It was raining). Main events: past simple (I saw…).', 'Use time expressions to make the story easy to follow.'],
    model: `Last summer, I took part in my first public speaking competition. I had never spoken in front of more than twenty people, so I was extremely nervous.

On the day of the competition, I was waiting backstage when I suddenly realised that I had left my notes on the bus. At first, I wanted to give up. Then my teacher told me, "You know your topic. Just tell the story."

When I walked onto the stage, my hands were shaking. But after the first minute, I started to relax. People were smiling and nodding. In the end, I didn't win, but I came third. I felt incredibly proud, and I learned that I can do more than I think.`
  },
  {
    id: 'w-b1-opinion', level: 'B1', title: 'Your Opinion: Should Students Wear School Uniforms?', type: 'Opinion paragraph',
    prompt: 'Write your opinion: should students wear school uniforms? Give at least two reasons and an example.',
    min: 100, max: 180,
    checklist: [
      { t: 'Write at least 100 words.', k: 'words', v: 100 },
      { t: 'State your opinion clearly (In my opinion… / I believe…).', k: 'any', v: ['in my opinion', 'i believe', 'i think', 'personally', 'in my view'] },
      { t: 'Give at least two reasons (firstly, secondly, also…).', k: 'count', v: ['firstly', 'first of all', 'secondly', 'also', 'another', 'moreover', 'because', 'in addition'], n: 2 },
      { t: 'Give an example (for example / for instance).', k: 'any', v: ['for example', 'for instance', 'such as'] },
      { t: 'Write a conclusion (To sum up / In conclusion).', k: 'any', v: ['to sum up', 'in conclusion', 'overall', 'all in all'] }
    ],
    vocab: ['In my opinion…', 'Firstly… Secondly…', 'For example…', 'On the other hand…', 'That’s why…', 'In conclusion…'],
    tips: ['Use one paragraph for each idea.', 'Mention the opposite view briefly to make your argument stronger.'],
    model: `In my opinion, school uniforms are a good idea, although they are not perfect.

Firstly, uniforms reduce pressure on students. Without them, some teenagers feel they need expensive brands to fit in. For example, at my old school, students often judged each other by their trainers. Secondly, uniforms save time in the morning because you don't need to decide what to wear.

On the other hand, some people say uniforms stop students from expressing their personality. I understand this point, but students can still express themselves through their ideas, hobbies and friendships.

In conclusion, I believe the advantages of school uniforms are greater than the disadvantages.`
  },
  {
    id: 'w-b1-advice', level: 'B1', title: 'An Email Giving Advice', type: 'Informal email',
    prompt: 'A friend from another country wants to learn your language and visit your city. Write an email with advice about learning the language and what to do in your city.',
    min: 100, max: 180,
    checklist: [
      { t: 'Write at least 100 words.', k: 'words', v: 100 },
      { t: 'Use at least two phrasal verbs (find out, look up, set up, pick up…).', k: 'count', v: ['find out', 'look up', 'set up', 'pick up', 'look after', 'put off', 'give up', 'try out', 'check out', 'show around', 'get around', 'look forward'], n: 2 },
      { t: 'Give advice (should, could, why don’t you, I’d recommend).', k: 'any', v: ['should', 'could', 'why don\'t you', 'recommend', 'suggest', 'if i were you'] },
      { t: 'Use a conditional sentence (If…).', k: 'any', v: ['if '] },
      { t: 'Use paragraphs, a greeting and a closing.', k: 'manual' }
    ],
    vocab: ['Why don’t you…?', 'If I were you, I’d…', 'I’d recommend…', 'Don’t give up!', 'You could find out…', 'I’ll show you around.'],
    tips: ['Informal emails can use contractions (I’d, don’t) and phrasal verbs.'],
    model: `Hi Jamie,

Great to hear you want to learn Slovak and visit Bratislava!

First, don't give up when the grammar gets difficult — everybody finds the cases hard at the beginning. I'd recommend downloading a vocabulary app and practising ten minutes every day. You could also find out if there is a language exchange in your city. If I were you, I'd watch Slovak films with subtitles too.

When you come, I'll show you around. We could walk up to the castle and check out the cafés in the old town. If the weather is good, we can take a boat on the Danube.

Let me know when you're coming!
Best,
Tomáš`
  },
  // ------------------------- B2 -------------------------
  {
    id: 'w-b2-complaint', level: 'B2', title: 'A Formal Complaint', type: 'Formal email',
    prompt: 'You ordered a desk online. It arrived two weeks late and damaged. Write a formal email of complaint. Explain the problems, describe how this affected you and say what you want the company to do.',
    min: 150, max: 250,
    checklist: [
      { t: 'Write at least 150 words.', k: 'words', v: 150 },
      { t: 'Use a formal greeting (Dear Sir or Madam / Dear Mr…).', k: 'any', v: ['dear sir', 'dear madam', 'dear mr', 'dear ms', 'dear mrs', 'to whom it may concern'] },
      { t: 'State the reason for writing (I am writing to…).', k: 'any', v: ['i am writing to', 'i\'m writing to', 'i would like to complain', 'i wish to complain'] },
      { t: 'Use formal language (regarding, unfortunately, I would be grateful…).', k: 'count', v: ['regarding', 'unfortunately', 'grateful', 'furthermore', 'moreover', 'however', 'therefore', 'appreciate', 'request', 'inconvenience'], n: 3 },
      { t: 'Avoid contractions (I am, not I’m).', k: 'nocontractions' },
      { t: 'Use a formal closing (Yours faithfully / Yours sincerely / Kind regards).', k: 'any', v: ['yours faithfully', 'yours sincerely', 'kind regards', 'best regards'] }
    ],
    vocab: ['I am writing to complain about…', 'order number…', 'Unfortunately,…', 'Furthermore,…', 'As a result,…', 'I would be grateful if you could…', 'a full refund / a replacement', 'I look forward to hearing from you.'],
    tips: ['Use one paragraph for each point: reason, problems, effects, request.', 'Stay polite and factual. Strong emotions weaken a formal complaint.'],
    model: `Dear Sir or Madam,

I am writing to complain about order number 58231, a white office desk that I purchased from your website on 3 March.

According to your website, the desk was supposed to arrive within five working days. Unfortunately, it was delivered two weeks late, despite several emails to your customer service team, none of which received a reply. Furthermore, when the desk finally arrived, one of the legs was broken and the surface was badly scratched.

As a result, I have had to work at my kitchen table for almost three weeks, which has been extremely inconvenient, as I work from home.

I would therefore be grateful if you could arrange for the damaged desk to be collected and either send a replacement within five working days or provide a full refund. I would also appreciate an explanation for the delay.

I look forward to hearing from you.

Yours faithfully,
Martina Horváthová`
  },
  {
    id: 'w-b2-essay', level: 'B2', title: 'For and Against Essay: Working from Home', type: 'Essay',
    prompt: 'Write an essay discussing the advantages and disadvantages of working from home. Give your own opinion in the conclusion.',
    min: 180, max: 280,
    checklist: [
      { t: 'Write at least 180 words.', k: 'words', v: 180 },
      { t: 'Use at least four paragraphs (introduction, for, against, conclusion).', k: 'paragraphs', v: 4 },
      { t: 'Use contrast linking words (however, although, despite, whereas).', k: 'count', v: ['however', 'although', 'despite', 'whereas', 'nevertheless', 'on the other hand', 'even though', 'in spite of'], n: 2 },
      { t: 'Use addition linking words (furthermore, moreover, in addition).', k: 'any', v: ['furthermore', 'moreover', 'in addition', 'what is more'] },
      { t: 'Give your opinion in the conclusion.', k: 'any', v: ['in conclusion', 'to conclude', 'on balance', 'all things considered', 'to sum up'] }
    ],
    vocab: ['One of the main advantages is…', 'Furthermore,…', 'On the other hand,…', 'A major drawback is…', 'Despite…', 'On balance, I believe…'],
    tips: ['Keep personal opinion for the conclusion in a balanced essay.', 'Start each paragraph with a clear topic sentence.'],
    model: `In recent years, working from home has become common in many professions. While it offers clear benefits, it also has some significant drawbacks.

One of the main advantages is flexibility. Employees can organise their day around their personal lives, and they save the time and money they would spend commuting. Furthermore, many people find that they can concentrate better at home, away from office noise and interruptions.

On the other hand, remote work can lead to isolation. Without everyday contact with colleagues, some employees feel lonely and less connected to their company. In addition, the boundary between work and private life can disappear, and people may end up working longer hours. Despite modern technology, communication is also more difficult, as misunderstandings are common in written messages.

On balance, I believe that a hybrid model offers the best of both worlds. Working from home two or three days a week allows people to enjoy flexibility, whereas time in the office helps maintain relationships and teamwork.`
  },
  {
    id: 'w-b2-review', level: 'B2', title: 'A Review', type: 'Review',
    prompt: 'Write a review of a film, book, restaurant or app you know well for an English-language website. Describe it, say what was good and bad, and recommend it (or not) to a specific type of reader.',
    min: 150, max: 250,
    checklist: [
      { t: 'Write at least 150 words.', k: 'words', v: 150 },
      { t: 'Use at least three paragraphs.', k: 'paragraphs', v: 3 },
      { t: 'Use evaluative adjectives (impressive, disappointing, gripping…).', k: 'count', v: ['impressive', 'disappointing', 'gripping', 'outstanding', 'predictable', 'well-written', 'entertaining', 'boring', 'stunning', 'convincing', 'memorable', 'overrated', 'highly recommended'], n: 2 },
      { t: 'Give a recommendation (I would recommend… / If you like…).', k: 'any', v: ['recommend', 'if you like', 'if you enjoy', 'worth', 'must-see', 'must-read', 'give it a miss'] },
      { t: 'Use a catchy title.', k: 'manual' }
    ],
    vocab: ['It is set in…', 'The plot centres on…', 'What impressed me most was…', 'The only drawback is…', 'It is well worth…', 'I would highly recommend it to…'],
    tips: ['Don’t tell the whole plot. Focus on your opinion.', 'Mix formal and friendly language for a website audience.'],
    model: `A Small Café with a Big Heart

Tucked away in a quiet street near the main square, Café Lumen is easy to miss. That would be a mistake.

The interior is simple but stunning: large windows, old wooden tables and shelves full of second-hand books that you are welcome to read. The menu is short, which I always see as a good sign. What impressed me most was the homemade carrot cake, which was rich without being too sweet. The coffee, roasted by a local company, was equally memorable.

The only drawback is the size. With only eight tables, it can be crowded at weekends, and the service becomes rather slow.

Overall, Café Lumen is well worth a visit. I would highly recommend it to anyone looking for a peaceful place to read or work, although if you need a quick coffee on a Saturday morning, you might want to go elsewhere.`
  },
  // ------------------------- C1 -------------------------
  {
    id: 'w-c1-summary', level: 'C1', title: 'Summarise an Article', type: 'Summary',
    prompt: 'Read the article “The Myth of Multitasking” (in Reading practice, C1) or the short version below. Write a summary of 80–120 words in your own words. Do not add your own opinion.',
    source: 'Research suggests that what we call multitasking is mostly rapid switching between tasks, and each switch has a small cost that accumulates. Some studies claim productivity can fall by up to forty percent, although this figure depends on the tasks. Not all multitasking is harmful: combining an automatic activity, like walking, with a demanding one is usually fine. Problems arise when tasks compete for the same mental resources. The author suggests we multitask partly because switching gives us a sense of busyness and small rewards.',
    min: 80, max: 120,
    checklist: [
      { t: 'Write between 80 and 120 words.', k: 'range', v: [80, 120] },
      { t: 'Use reporting language (the author argues / the article suggests…).', k: 'any', v: ['the author', 'the article', 'the writer', 'according to', 'argues', 'suggests', 'claims'] },
      { t: 'Include the exception (not all multitasking is harmful).', k: 'any', v: ['however', 'although', 'not all', 'exception', 'automatic'] },
      { t: 'Do not include your own opinion (avoid “I think”).', k: 'none', v: ['i think', 'in my opinion', 'i believe', 'personally'] },
      { t: 'Paraphrase: do not copy long phrases from the source.', k: 'manual' }
    ],
    vocab: ['The article argues that…', 'According to the author,…', 'It is suggested that…', 'The author acknowledges that…', 'The article concludes that…'],
    tips: ['Identify the main idea first, then two or three supporting points.', 'Change the structure of sentences, not only individual words.'],
    model: `The article argues that multitasking, in tasks requiring attention, is largely an illusion: the brain does not process two activities at once but switches between them, and the small cost of each switch adds up. Although the size of this effect is disputed, some research suggests productivity may drop considerably. However, the author acknowledges that not all multitasking is problematic; pairing an automatic activity with a demanding one is usually manageable, whereas tasks that compete for the same mental resources cause difficulties. Finally, the article suggests that people multitask partly because constant switching feels rewarding.`
  },
  {
    id: 'w-c1-essay', level: 'C1', title: 'Argumentative Essay: Should Cities Ban Private Cars from Their Centres?', type: 'Essay',
    prompt: 'Write an argumentative essay taking a clear position on whether cities should ban private cars from their centres. Address at least one counterargument.',
    min: 250, max: 380,
    checklist: [
      { t: 'Write at least 250 words.', k: 'words', v: 250 },
      { t: 'Use at least five paragraphs.', k: 'paragraphs', v: 5 },
      { t: 'Address a counterargument (Critics argue… / It could be argued…).', k: 'any', v: ['critics', 'opponents', 'it could be argued', 'some argue', 'some people argue', 'admittedly', 'it is true that', 'counterargument'] },
      { t: 'Use hedging (may, arguably, tend to, to some extent).', k: 'count', v: ['may ', 'might ', 'arguably', 'tend to', 'to some extent', 'likely', 'appears', 'seems', 'suggests'], n: 2 },
      { t: 'Use at least one nominalisation or academic noun (reduction, implementation, impact…).', k: 'count', v: ['reduction', 'implementation', 'impact', 'introduction', 'congestion', 'pollution', 'accessibility', 'consequence'], n: 2 },
      { t: 'Write a clear conclusion.', k: 'any', v: ['in conclusion', 'to conclude', 'on balance', 'ultimately', 'all things considered'] }
    ],
    vocab: ['There is a compelling case for…', 'Admittedly,…', 'Critics argue that…; however,…', 'This is not to say that…', 'It would be an oversimplification to…', 'Ultimately,…'],
    tips: ['State your position in the introduction.', 'A strong essay refutes counterarguments rather than ignoring them.'],
    model: `Across Europe, an increasing number of cities are restricting private cars in their historic centres. Although such measures are often controversial, I would argue that, with careful planning, banning private cars from city centres brings benefits that clearly outweigh the costs.

The most compelling argument concerns public health. Traffic is a major source of air pollution, which has been linked to respiratory and heart disease. A reduction in vehicles would therefore have an immediate impact on air quality, particularly for residents of dense central areas.

Furthermore, car-free centres tend to become more attractive places to spend time. Streets that were once dominated by traffic and parking can be transformed into spaces for walking, cycling and outdoor cafés. Evidence from several cities suggests that, contrary to initial fears, footfall in local shops may actually increase.

Critics argue that such bans disadvantage elderly and disabled people, as well as businesses that rely on deliveries. This concern is legitimate and should not be dismissed. However, it is an argument for thoughtful implementation rather than inaction: exemptions for residents and people with limited mobility, delivery windows and frequent, accessible public transport can address most of these problems.

In conclusion, while the transition may be difficult, the long-term gains for health, the environment and quality of life make a strong case for removing private cars from city centres. The real question is not whether cities should take this step, but how they can do so fairly.`
  },
  {
    id: 'w-c1-proposal', level: 'C1', title: 'A Formal Proposal', type: 'Proposal',
    prompt: 'Your workplace or school wants to improve the wellbeing of its employees or students. Write a proposal to the management describing the current situation, suggesting two or three specific measures and explaining their expected benefits.',
    min: 220, max: 350,
    checklist: [
      { t: 'Write at least 220 words.', k: 'words', v: 220 },
      { t: 'Use headings (e.g. Introduction, Current situation, Recommendations, Conclusion).', k: 'manual' },
      { t: 'Use formal recommending language (I would recommend, it is proposed that, should be…).', k: 'count', v: ['recommend', 'propose', 'it is suggested', 'should be', 'would be advisable', 'it is advisable'], n: 2 },
      { t: 'Use the passive at least twice.', k: 'count', v: ['is proposed', 'be introduced', 'be provided', 'be offered', 'was carried out', 'were asked', 'is recommended', 'be created', 'be organised', 'be organized', 'be implemented', 'are encouraged', 'be allocated', 'be reduced', 'was conducted'], n: 2 },
      { t: 'Explain the expected benefits.', k: 'any', v: ['benefit', 'result in', 'lead to', 'improve', 'reduce', 'increase'] }
    ],
    vocab: ['The aim of this proposal is to…', 'A recent survey indicated that…', 'It is proposed that…', 'This would result in…', 'It would be advisable to…', 'In light of the above,…'],
    tips: ['Proposals are persuasive but formal. Use headings and clear, specific recommendations.', 'Support your suggestions with evidence (a survey, feedback, figures).'],
    model: `Proposal: Improving Staff Wellbeing

Introduction
The aim of this proposal is to outline the current situation regarding staff wellbeing and to recommend three practical measures.

Current situation
A survey carried out last month indicated that 62% of employees feel stressed at least three days a week. The most common causes mentioned were an excessive number of meetings, a lack of quiet working spaces and the expectation to answer emails in the evening.

Recommendations
Firstly, it is proposed that one afternoon per week be kept free of internal meetings, so that staff can focus on demanding tasks without interruption.

Secondly, I would recommend converting the unused meeting room on the second floor into a quiet zone, where phone calls and conversations would not be permitted.

Finally, a clear policy should be introduced stating that employees are not expected to respond to emails after 7 p.m., except in genuine emergencies.

Expected benefits
These measures would require minimal investment. They are likely to reduce stress, improve concentration and, in the long term, lead to lower staff turnover.

Conclusion
In light of the survey results, it would be advisable to implement these measures on a trial basis for three months and to evaluate their impact through a follow-up survey.`
  }
];
