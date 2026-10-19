/* LinguaPath — optional Slovak interface. English is the default; content stays in English.
   Strings are looked up by their English text. Missing strings fall back to English. */
window.LP = window.LP || {};

(function () {
  const SK = {
    // navigation
    'Dashboard': 'Prehľad', 'Learn': 'Učenie', 'Vocabulary': 'Slovná zásoba', 'Grammar': 'Gramatika', 'Practice': 'Precvičovanie', 'Tests': 'Testy',
    'My Goals': 'Moje ciele', 'Progress': 'Pokrok', 'Settings': 'Nastavenia', 'Home': 'Domov', 'Words': 'Slová', 'More': 'Viac', 'Skip to content': 'Preskočiť na obsah',
    'Breadcrumb': 'Navigácia', 'Today': 'Dnes', 'day streak': 'deň v rade', 'days streak': 'dní v rade', 'Saved on this device only.': 'Uložené iba v tomto zariadení.',
    // dashboard
    'Welcome back!': 'Vitaj späť!', 'Welcome to LinguaPath!': 'Vitaj v LinguaPath!', 'Continue Learning': 'Pokračovať v učení', 'Start a Lesson': 'Začať lekciu', 'Start': 'Začať', 'Continue': 'Pokračovať',
    'Daily Goal': 'Denný cieľ', 'Edit': 'Upraviť', 'of': 'z', 'minutes completed': 'minút splnených', 'Goal reached. Great job!': 'Cieľ splnený. Skvelá práca!',
    'Time counts while you actively use the app.': 'Čas sa počíta, keď aktívne používaš aplikáciu.', 'Your Progress': 'Tvoj pokrok', 'Lessons completed': 'Dokončené lekcie',
    'Vocabulary words learned': 'Naučené slová', 'Current learning streak': 'Aktuálna séria', 'Average test score': 'Priemerné skóre testov', 'Total learning time': 'Celkový čas učenia',
    'Quick actions': 'Rýchle akcie', 'Learn 10 new words': 'Nauč sa 10 nových slov', 'Practice grammar': 'Precvič gramatiku', 'Start a conversation': 'Začni rozhovor',
    'Take a short test': 'Urob si krátky test', 'Review difficult words': 'Zopakuj si ťažké slová', 'This week': 'Tento týždeň', 'Recommended for you': 'Odporúčané pre teba',
    'Open': 'Otvoriť', 'daily goal': 'denný cieľ', 'days': 'dní', 'day': 'deň', 'Unit': 'Lekcia', 'Status': 'Stav', 'Not started': 'Nezačaté', 'lessons done in': 'lekcií hotových v',
    'Estimated level progress': 'Odhadovaný pokrok v úrovni', 'You finished all lessons!': 'Dokončil si všetky lekcie!', 'Words to Review': 'Slová na zopakovanie',
    'Complete a few lessons and we will recommend activities for you.': 'Dokonči niekoľko lekcií a odporučíme ti aktivity.', 'You are doing well!': 'Ide ti to dobre!', 'Keep going!': 'Len tak ďalej!',
    'Small steps make progress.': 'Malé kroky vedú k pokroku.', 'You are building a habit.': 'Budujete si návyk.', 'Ready for another lesson?': 'Pripravený na ďalšiu lekciu?',
    'Every word you learn is a step forward.': 'Každé nové slovo je krok vpred.', 'You reached your daily goal. You are doing well!': 'Splnil si denný cieľ. Ide ti to dobre!',
    'Welcome back! It’s great to see you again.': 'Vitaj späť! Rád ťa opäť vidím.',
    'Mon': 'Po', 'Tue': 'Ut', 'Wed': 'St', 'Thu': 'Št', 'Fri': 'Pi', 'Sat': 'So', 'Sun': 'Ne',
    // categories & skills
    'Speaking': 'Hovorenie', 'Listening': 'Počúvanie', 'Reading': 'Čítanie', 'Writing': 'Písanie', 'Everyday English': 'Angličtina pre každý deň', 'Review and assessment': 'Opakovanie a hodnotenie',
    'Mixed skills': 'Zmiešané zručnosti', 'Beginner': 'Začiatočník', 'Elementary': 'Mierne pokročilý', 'Intermediate': 'Stredne pokročilý', 'Upper Intermediate': 'Vyššie stredne pokročilý', 'Advanced': 'Pokročilý',
    // learn
    'Levels': 'Úrovne', 'Lesson': 'Lekcia', 'completed': 'dokončené', 'Completed': 'Dokončené', 'Done': 'Hotovo', 'done': 'hotovo', 'best': 'najlepšie', 'Lesson complete!': 'Lekcia dokončená!',
    'Next lesson': 'Ďalšia lekcia', 'Previous lesson': 'Predchádzajúca lekcia', 'Back to lessons': 'Späť na lekcie', 'Score': 'Skóre', 'Estimated progress': 'Odhadovaný pokrok',
    'Vocabulary learned': 'Naučená slovná zásoba', 'Lessons in this unit': 'Lekcie v tejto jednotke', 'Unit review test': 'Opakovací test', 'Start the test': 'Začať test', 'Time limit': 'Časový limit',
    'Lesson steps': 'Kroky lekcie', '1. Learn the words': '1. Nauč sa slová', '2. Flashcards': '2. Kartičky', '3. Quick check': '3. Rýchla kontrola',
    'Next: Flashcards': 'Ďalej: Kartičky', 'Next: Quick check': 'Ďalej: Rýchla kontrola', 'You are doing well! Keep going.': 'Ide ti to dobre! Pokračuj.',
    'Review the lesson and try again. You can do it!': 'Zopakuj si lekciu a skús to znova. Zvládneš to!',
    // quiz
    'Question': 'Otázka', 'Questions': 'Otázky', 'Check': 'Skontrolovať', 'Next': 'Ďalej', 'Previous': 'Späť', 'Skip': 'Preskočiť', 'Finish test': 'Dokončiť test', 'See results': 'Zobraziť výsledky',
    'Correct!': 'Správne!', 'Not quite.': 'Nie celkom.', 'Partly correct.': 'Čiastočne správne.', 'Correct answer': 'Správna odpoveď', 'Your answer': 'Tvoja odpoveď', 'No answer': 'Bez odpovede',
    'True': 'Pravda', 'False': 'Nepravda', 'Choose…': 'Vyber…', 'Type here…': 'Píš sem…', 'Choose the correct answer.': 'Vyber správnu odpoveď.', 'Is this true or false?': 'Je to pravda alebo nepravda?',
    'Write the missing word or words.': 'Doplň chýbajúce slovo alebo slová.', 'Write your answer.': 'Napíš svoju odpoveď.', 'Put the words in the correct order.': 'Zoraď slová do správneho poradia.',
    'Match each item with the correct answer.': 'Priraď každú položku k správnej odpovedi.', 'Tap the words below to build the sentence.': 'Ťukaj na slová nižšie a vytvor vetu.',
    'Please answer the question first.': 'Najprv odpovedz na otázku.', 'Results': 'Výsledky', 'Excellent': 'Výborne', 'Good': 'Dobre', 'Keep practicing': 'Precvičuj ďalej', 'Review the lesson': 'Zopakuj si lekciu',
    'You answered': 'Správne si odpovedal na', 'questions correctly.': 'otázok.', 'Time': 'Čas', 'Areas to review': 'Oblasti na zopakovanie', 'No weak areas in this activity. Great work!': 'V tejto aktivite nemáš slabé miesta. Skvelá práca!',
    'Recommended next step': 'Odporúčaný ďalší krok', 'Review your answers': 'Skontroluj si odpovede', 'Try again': 'Skúsiť znova', 'Last time': 'Minule', 'Best': 'Najlepšie', 'Time is up!': 'Čas vypršal!',
    'Read the text': 'Prečítaj si text', 'Play the recording': 'Prehrať nahrávku', 'Stop': 'Zastaviť', 'Show transcript': 'Zobraziť prepis', 'Hide transcript': 'Skryť prepis', 'Progress': 'Pokrok',
    'Finish the test?': 'Dokončiť test?', 'Cancel': 'Zrušiť', 'OK': 'OK',
    // vocabulary
    'Word list': 'Zoznam slov', 'Learn new words': 'Nové slová', 'My words': 'Moje slová', 'Listen': 'Vypočuť', 'Favourite': 'Obľúbené', 'Show translation': 'Zobraziť preklad', 'Hide translation': 'Skryť preklad',
    'Add to review': 'Pridať na opakovanie', 'Remove': 'Odstrániť', 'New': 'Nové', 'Learning': 'Učím sa', 'Needs review': 'Treba zopakovať', 'Mastered': 'Zvládnuté',
    'Show answer': 'Zobraziť odpoveď', 'How well did you know it?': 'Ako dobre si to vedel?', 'Again': 'Znova', 'Hard': 'Ťažké', 'Easy': 'Ľahké', 'Cards left': 'Zostávajúce kartičky',
    'Session complete!': 'Hotovo!', 'Words you found difficult will come back sooner.': 'Ťažké slová sa vrátia skôr.', 'Search words': 'Hľadať slová', 'Favourites only': 'Iba obľúbené',
    'words found': 'nájdených slov', 'Show more': 'Zobraziť viac', 'All levels': 'Všetky úrovne', 'All topics': 'Všetky témy', 'Any status': 'Akýkoľvek stav', 'Level': 'Úroveň', 'Topic': 'Téma',
    'Start review': 'Začať opakovanie', 'Words to review now': 'Slová na zopakovanie teraz', 'Difficult words': 'Ťažké slová', 'Next review': 'Ďalšie opakovanie',
    'Practise difficult words': 'Precvič ťažké slová', 'Review more': 'Opakovať ďalej', 'Start flashcards': 'Začať kartičky', 'Learn 10 more': 'Ďalších 10 slov', 'Practise these words': 'Precvič tieto slová',
    'Flashcards': 'Kartičky', 'Multiple choice': 'Výber z možností', 'Match meanings': 'Priraď významy', 'Match translations': 'Priraď preklady', 'Fill in the missing word': 'Doplň chýbajúce slovo',
    'Type the correct word': 'Napíš správne slovo', 'Choose the word for a sentence': 'Vyber slovo do vety', 'Spelling': 'Pravopis', 'Sentence completion': 'Doplnenie vety',
    'Add a word': 'Pridať slovo', 'Word or phrase': 'Slovo alebo fráza', 'Add word': 'Pridať slovo', 'Word saved.': 'Slovo uložené.', 'Added to favourites.': 'Pridané do obľúbených.', 'Removed from favourites.': 'Odstránené z obľúbených.',
    'Added to Words to Review.': 'Pridané do slov na opakovanie.', 'Choose another mode': 'Vybrať iný režim', 'optional': 'nepovinné', 'Save word': 'Uložiť slovo',
    // grammar
    'How we use it': 'Ako to používame', 'Patterns': 'Vzorce', 'Positive examples': 'Kladné príklady', 'Negative examples': 'Záporné príklady', 'Questions and answers': 'Otázky a odpovede',
    'Common mistakes': 'Časté chyby', 'Practice exercise': 'Cvičenie', 'Start the exercise': 'Začať cvičenie', 'Exercise': 'Cvičenie', 'Show Slovak explanation': 'Zobraziť vysvetlenie po slovensky',
    'Hide Slovak explanation': 'Skryť slovenské vysvetlenie', 'Mark as completed': 'Označiť ako dokončené', 'Mark as not completed': 'Označiť ako nedokončené', 'Your level': 'Tvoja úroveň', 'Topics': 'Témy',
    'Grammar index': 'Prehľad gramatiky', 'Back to grammar index': 'Späť na prehľad gramatiky', 'Positive': 'Kladná veta', 'Negative': 'Záporná veta',
    // practice
    'Speak & Communicate': 'Hovor a komunikuj', 'Pronunciation': 'Výslovnosť', 'Guided mode': 'Režim s výberom', 'Free mode': 'Voľný režim', 'Free conversation mode': 'Voľný rozhovor',
    'The situation': 'Situácia', 'Your role': 'Tvoja rola', 'The other person': 'Druhá osoba', 'Useful phrases': 'Užitočné frázy', 'Vocabulary support': 'Pomocná slovná zásoba',
    'Choose your answer': 'Vyber si odpoveď', 'Write your answer': 'Napíš svoju odpoveď', 'Send': 'Odoslať', 'You': 'Ty', 'Model answer': 'Vzorová odpoveď', 'Conversation feedback': 'Hodnotenie rozhovoru',
    'Tips for next time': 'Tipy na nabudúce', 'Show hints and useful phrases': 'Zobraziť nápovedy a frázy', 'Show Slovak translations': 'Zobraziť slovenské preklady',
    'Reading practice': 'Čítanie', 'Listening practice': 'Počúvanie', 'Writing practice': 'Písanie', 'All': 'Všetko', 'Say it': 'Povedz to', 'Listen slowly': 'Vypočuť pomaly', 'Next sentence': 'Ďalšia veta',
    'Play': 'Prehrať', 'Pause': 'Pozastaviť', 'Repeat sentence': 'Zopakovať vetu', 'Speed': 'Rýchlosť', 'Show Slovak translation': 'Zobraziť slovenský preklad', 'Hide Slovak translation': 'Skryť slovenský preklad',
    'Answer the questions': 'Odpovedať na otázky', 'Summary task': 'Zhrnutie', 'Compare with the model': 'Porovnať so vzorom', 'Finish activity': 'Dokončiť aktivitu', 'Activity complete!': 'Aktivita dokončená!',
    'Next: Summary': 'Ďalej: Zhrnutie', 'Read the text again': 'Prečítať text znova', 'Back to the text': 'Späť na text', 'Back to the recording': 'Späť na nahrávku',
    // writing
    'Your task': 'Tvoja úloha', 'Your text': 'Tvoj text', 'Check my writing': 'Skontrolovať text', 'Show model answer': 'Zobraziť vzorovú odpoveď', 'Hide model answer': 'Skryť vzorovú odpoveď',
    'Finish task': 'Dokončiť úlohu', 'Checklist': 'Kontrolný zoznam', 'Suggested vocabulary': 'Odporúčaná slovná zásoba', 'Tips': 'Tipy', 'Feedback': 'Spätná väzba', 'Draft saved': 'Koncept uložený',
    'words': 'slov', 'sentences': 'viet', 'paragraphs': 'odsekov', 'Task complete!': 'Úloha dokončená!', 'Spelling': 'Pravopis', 'Grammar and punctuation': 'Gramatika a interpunkcia', 'Sentence structure and style': 'Stavba viet a štýl',
    // tests
    'Placement test': 'Rozraďovací test', 'Placement Test': 'Rozraďovací test', 'Short test': 'Krátky test', 'Scoring': 'Hodnotenie', 'Skill tests and full review': 'Testy zručností a celkové opakovanie', 'Unit tests': 'Testy jednotiek',
    'Recent results': 'Posledné výsledky', 'Test': 'Test', 'Date': 'Dátum', 'Result': 'Výsledok', 'Retake': 'Zopakovať', 'questions': 'otázok', 'Before you start': 'Skôr než začneš', 'All tests': 'Všetky testy',
    'Your recommended starting level': 'Odporúčaná úroveň', 'Use level': 'Použiť úroveň', 'See the lessons': 'Zobraziť lekcie', 'Correct': 'Správne', 'Last': 'Posledný', 'attempts': 'pokusov', 'attempt': 'pokus',
    // goals
    'Current streak': 'Aktuálna séria', 'Best streak': 'Najdlhšia séria', 'Study days this week': 'Dni učenia tento týždeň', 'Minutes this week': 'Minúty tento týždeň', 'Your targets': 'Tvoje ciele',
    'Daily learning goal': 'Denný cieľ učenia', 'Study days per week': 'Dni učenia za týždeň', 'Weekly study target (minutes)': 'Týždenný cieľ (minúty)', 'Target CEFR level': 'Cieľová úroveň CEFR',
    'Target date': 'Cieľový dátum', 'Skills to improve': 'Zručnosti na zlepšenie', 'Save targets': 'Uložiť ciele', 'Target progress': 'Pokrok k cieľu', 'Personal goals': 'Osobné ciele', 'Add goal': 'Pridať cieľ',
    'In-app reminder': 'Pripomienka v aplikácii', 'Weekly study days': 'Dni učenia za týždeň', 'Weekly minutes': 'Minúty za týždeň', 'Save': 'Uložiť', 'Delete': 'Vymazať', 'minutes': 'minút',
    'Targets saved.': 'Ciele uložené.', 'Goal added.': 'Cieľ pridaný.', 'Well done! Goal completed.': 'Výborne! Cieľ splnený.',
    // progress
    'Weekly summary': 'Týždenné zhrnutie', 'What you studied': 'Čo si sa učil', 'What improved': 'Čo sa zlepšilo', 'What still needs practice': 'Čo treba ešte precvičiť', 'Suggested for next week': 'Návrhy na ďalší týždeň',
    'Study time per week': 'Čas učenia za týždeň', 'Daily activity (last 14 days)': 'Denná aktivita (posledných 14 dní)', 'Vocabulary mastery': 'Zvládnutie slovnej zásoby', 'Skill results': 'Výsledky zručností',
    'Grammar test performance': 'Výsledky v gramatike', 'Reading and listening': 'Čítanie a počúvanie', 'Most difficult topics': 'Najťažšie témy', 'Achievements': 'Úspechy', 'Recent activity': 'Posledná aktivita',
    'Tests taken': 'Absolvované testy', 'Words learned': 'Naučené slová', 'Lessons': 'Lekcie',
    'How Do You Feel About Your English?': 'Ako sa cítiš vo svojej angličtine?', 'Rate your confidence': 'Ohodnoť svoju istotu', 'Reflection': 'Zamyslenie', 'What feels easy?': 'Čo ti ide ľahko?',
    'What is difficult?': 'Čo je ťažké?', 'What do you want to improve next?': 'Čo chceš zlepšiť ďalej?', 'Do you feel more confident than last week?': 'Cítiš sa istejšie ako minulý týždeň?',
    'Yes, more confident': 'Áno, istejšie', 'About the same': 'Približne rovnako', 'Less confident': 'Menej isto', 'Save my answers': 'Uložiť odpovede', 'Your skills': 'Tvoje zručnosti', 'Recommended practice': 'Odporúčané precvičovanie',
    // settings
    'Language and level': 'Jazyk a úroveň', 'Interface language': 'Jazyk rozhrania', 'Appearance and sound': 'Vzhľad a zvuk', 'Theme': 'Téma', 'Light': 'Svetlá', 'Dark': 'Tmavá', 'Same as device': 'Podľa zariadenia',
    'Speech speed': 'Rýchlosť reči', 'Voice': 'Hlas', 'Automatic': 'Automaticky', 'Test the voice': 'Vyskúšať hlas', 'Your data': 'Tvoje údaje', 'Export progress': 'Exportovať pokrok', 'Import progress': 'Importovať pokrok',
    'Reset progress': 'Vymazať pokrok', 'Settings saved.': 'Nastavenia uložené.', 'Your CEFR level': 'Tvoja úroveň CEFR', 'Daily goal': 'Denný cieľ', 'Preferred learning skills': 'Preferované zručnosti',
    'Show Slovak translations automatically': 'Automaticky zobrazovať slovenské preklady', 'Reduce motion (turn off animations)': 'Obmedziť pohyb (vypnúť animácie)', 'Use time limits in tests': 'Používať časový limit v testoch',
    'About LinguaPath': 'O aplikácii LinguaPath', 'Import': 'Importovať', 'Progress imported.': 'Pokrok importovaný.', 'Reset all progress?': 'Vymazať celý pokrok?', 'My learning goals': 'Moje ciele učenia',
    'Lessons and exercises stay in English. Slovak is support only.': 'Lekcie a cvičenia zostávajú v angličtine. Slovenčina slúži len ako pomoc.',
    // onboarding
    'Let’s improve your English!': 'Poďme zlepšiť tvoju angličtinu!', 'Step': 'Krok', 'Back': 'Späť', 'What is your English level now?': 'Akú máš teraz úroveň angličtiny?', 'Not sure': 'Neviem',
    'What are your main goals?': 'Aké sú tvoje hlavné ciele?', 'Choose one or more.': 'Vyber jeden alebo viac.', 'Choose your daily learning goal': 'Vyber si denný cieľ', 'How confident do you feel?': 'Ako isto sa cítiš?',
    'Finish': 'Dokončiť', 'Finish and take the test': 'Dokončiť a urobiť test', '1 = not confident, 5 = very confident.': '1 = vôbec nie isto, 5 = veľmi isto.',
    'Speak English with confidence.': 'Hovoriť po anglicky s istotou.', 'Understand movies and videos.': 'Rozumieť filmom a videám.', 'Improve grammar.': 'Zlepšiť gramatiku.', 'Learn more vocabulary.': 'Naučiť sa viac slovíčok.',
    'Prepare for school exams.': 'Pripraviť sa na školské skúšky.', 'Prepare for work or travel.': 'Pripraviť sa na prácu alebo cestovanie.', 'Improve writing and reading.': 'Zlepšiť písanie a čítanie.',
    'Your profile is saved. Let’s start!': 'Tvoj profil je uložený. Začnime!', 'Please choose at least one goal.': 'Vyber aspoň jeden cieľ.',
    'Something went wrong.': 'Niečo sa pokazilo.', 'Go to Dashboard': 'Prejsť na prehľad', 'Not today': 'Dnes nie', 'Reminder: you have studied': 'Pripomienka: dnes si sa učil', 'minutes today. Ready for another lesson?': 'minút. Pripravený na ďalšiu lekciu?'
  };

  LP.t = function (s) {
    if (s == null) return '';
    const lang = LP.store && LP.store.state ? LP.store.state.settings.lang : 'en';
    if (lang === 'sk' && Object.prototype.hasOwnProperty.call(SK, s)) return SK[s];
    return s;
  };
  LP.SK_DICT = SK;
})();
