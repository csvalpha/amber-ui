const CoverPhotoFallback = '/images/fallback/coverphoto_default.jpg';
const AvatarFallback = '/images/fallback/avatar_default.png';
const AvatarThumbFallback = '/images/fallback/avatar_thumb_default.png';

const GroupKinds = [
  'bestuur',
  'commissie',
  'dispuut',
  'genootschap',
  'groep',
  'huis',
  'jaargroep',
  'lichting',
  'kring',
  'werkgroep'
];

const StaticPageCategories = [
  'vereniging',
  'documenten',
  'ict'
];

const ActivityCategories = [
  'Algemeen',
  'Sociëteit',
  'Vorming',
  'Dinsdagkring',
  'Woensdagkring',
  'ChOOSE',
  'IFES',
  'OZON',
  'Disputen',
  'Jaargroepen',
  'Huizen',
  'Extern',
  'Eerstejaars'
];

const OpenQuestionTypes = [
  'text',
  'textarea',
  'number'
];

const ClosedQuestionTypes = [
  'radio',
  'checkbox'
];

const MailAliasModerationTypes = [
  'open',
  'semi_moderated',
  'moderated'
];

/* eslint camelcase: "off" */
const PicturePublicationPreferenceTypes = {
  always_publish: 'Publiceren altijd toegestaan',
  always_ask: 'Altijd toestemming vragen voor publiceren',
  never_publish: 'Publiceren nooit toegestaan'
};

const UserDetailsPreferenceTypes = {
  hidden: 'Verbergen voor iedereen',
  members_only: 'Alleen delen met leden',
  all_users: 'Delen met leden en oudleden'
};

const DigtusSubscriptionPreferenceTypes = {
  no_subscription: 'Geen Digtus',
  digital: 'Digitale uitgave van de Digtus',
  physical: 'Papieren uitgave van de Digtus'
};

const AlmanakSubscriptionPreferenceTypes = {
  no_subscription: 'Geen Almanak',
  digital: 'Digitale uitgave van de Almanak',
  physical: 'Papieren uitgave van de Almanak'
};

const WelcomeTextLines = [
  'Hoe was je dag?',
  'Zou er koffie in de BK zijn?',
  'Wat heb je gedaan vandaag?',
  'Welke kleur voel je je vandaag?',
  'Is de koe aan?',
  'Alpha voor jou!',
  'Welk nummer luister je het vaakst?',
  'Van welk geluid houd je?',
  'Wat is je favoriete quote?',
  'Wat was je favoriete eten toen je klein was?',
  'Wat is je minst favoriete vervoersmiddel?',
  'Welke vorm van lichaamsbeweging is je favoriet?',
  'Welk klusje vind je echt vreselijk om te doen?',
  'Wat is je favoriete binnen/buiten activiteit?',
  'Wat is het beste moment van de dag?',
  'Als je een plaatje of schildering kon tekenen van een willekeurige omgeving waar je ooit in geweest bent, wat zou je dan tekenen/schilderen?',
  'Als je wist dat de Aarde zou vergaan volgend jaar, wat zou je dan nu anders doen?',
  'Als je getuige zou kunnen zijn van elke gebeurtenis in het verleden, heden of toekomst, welke zou het dan zijn?',
  'Als je maar aan één project zou mogen werken voor het komende jaar, wat voor project zou dat zijn?',
  'Als je je voornaam zou veranderen, waarnaar zou je het dan veranderen?',
  'Als je de loterij zou winnen, wat zou je dan als eerste doen?',
  'Als je het antwoordt op elke vraag zou weten, welke zou het dan zijn, naast “Wat is de zin van het leven”?',
  'Als je een feestje zou geven, wat voor een dan ook, wat voor feestje zou het dan zijn, en ter gelegenheid waarvan?',
  'Als je ervoor kon kiezen om voor altijd één bepaalde leeftijd te hebben, welke zou dat dan zijn?',
  'Als je iedereen zou kunnen kiezen, wie zou je dan kiezen als je mentor?',
  'Als je zou kunnen leren om alles te doen, wat zou je dan kiezen?',
  'Als je onsterfelijk zou zijn voor 1 dag, wat zou je dan doen?',
  'Als je iedereen zou kunnen ontmoeten, levend of overleden, wie zou je dan ontmoeten?',
  'Als je zou reïncarneren als een dier/drankje/bepaalde smaak ijs, welke zou het dan zijn?',
  'Als je elke willekeurige fictieve persoon zou kunnen zijn, wie zou je dan kiezen?',
  'Welke liedjes zitten er in de soundtrack van jouw leven?',
  'Hoe zou je de autobiografie van jouw leven noemen?',
  'Als je een half uur vrije tijd hebt, hoe besteed je die vrije tijd dan?',
  'Wat wil je worden als je groot bent?',
  'Met welke bekende persoon halen ze jouw vaak door de war?',
  'Heb je ooit iets meegemaakt waarvan je eerst dacht dat het slecht zou zijn, maar waarvan het achteraf in je toch goed afliep?',
  'Wat is één van de beste feestjes waar je ooit geweest bent?',
  'Wat was de laatste film, tv-programma of boek waarbij je moest huilen?',
  'Wat was het moeilijkste wat je ooit gedaan hebt?',
  'Wat is je laatste ervaring waardoor je een sterker persoon bent geworden?',
  'Wat deed je vroeger toen je nog klein was waardoor je  in de problemen kwam?',
  'Wanneer heb je voor het laatst werkelijk geweldig gegeten?',
  'Wat is het beste/slechtste cadeau dat je ooit gegeven/gekregen hebt?',
  'Wat mis je het meeste aan het kind-zijn?',
  'Wat was het eerste dat je kocht van je eigen geld?',
  'Wanneer was je voor het laatst nerveus?',
  'Wat heb je in de afgelopen week geleerd?',
  'Welk verhaal vertelt jouw familie altijd over jou?',
  'Hoe oud was je toen je volwassen werd?',
  'Is een plaatje meer waard dan duizend woorden? Verklaar je nader.',
  'Het beste aan wakker worden is…?',
  'Waar is Willem?',
  'En nu paraplu?',
  'Heb je jezelf een keer op een domme/grappige manier verwond?',
  'Als je wilt trouwen, welke leeftijd zou dan ideaal zijn?',
  'Hoe heet je moeder?',
  'Heb je het idee dat iemand nu een oogje op je heeft?',
  'Wat is het meest beschamende dat je ooit in een winkel hebt gedaan?',
  'Zou je je haar afscheren om te schenken aan een goed doel?',
  'Heb je wel eens iets stuk laten vallen in een winkel?',
  'Waar was je voordat je achter de computer ging zitten?',
  'Wie heeft je als laatste gebeld?',
  'Wat heb je gegeten als ontbijt vanochtend?',
  'Wanneer ben je voor het laatst uit eten geweest en waar?',
  'Slaap je met je slaapkamerdeur open of dicht?',
  'Word je snel boos als je in de auto zit en een mede weggebruiker doet iets verkeerd?',
  'Neem jij de shampoo’s en zeepjes die in je hotelkamer liggen altijd mee naar huis?',
  'Wanneer was je voor het laatst jaloers?',
  'Waarvan krijg je kwaadaardige neigingen?',
  'Vind je die ICT-ers ook niet super sexy?',
  'Sta jij op voor oude mensen?',
  'Welke gebeurtenissen zijn bepalend geweest voor je karakter?',
  'Waar word je verdrietig van?',
  'Waar word je blij van?',
  'Wat zijn je slechtste eigenschappen?',
  'Welke rituelen heb je?',
  'Wantrouw jij snel mensen?',
  'Wanneer heb je voor het laatst iemand geholpen?',
  'Waar erger je bij andere mensen het meest aan?',
  'Heb je ooit een verkeersbord gestolen?',
  'Word je liever aangevallen door een beer of door een zwerm bijen?',
  'Heb je sproeten?',
  'Lach je als je door hebt dat iemand een foto van je maakt?',
  'Kauw je op je pen?',
  'Heb je een één- of tweepersoonsbed?',
  'Wat drink je bij het avondeten?',
  'Geeft de dichtstbijzijnde persoon eens een handzoen. Ja, dit is een uitdaging.',
  'Heb je bij de padvinders gezeten toen je klein was?',
  'Weet je hoe je het oliepeil van je auto moet controleren?',
  'Wanneer heb je voor het laatst een brief met de hand geschreven?',
  'Ooit zonder benzine gestaan?',
  'Ben je lui?',
  'Hoe laat ga je meestal naar bed?',
  'Ben je aan het soggen nu?',
  'Hoeveel afwas staat er nog? Had je dat niet moeten opruimen?',
  'Bier, wijn of water?',
  'Hoeveel mensen die Ruben heten ken je?',
  'Wanneer heb je je voor het laatst ingenodigd?',
  'Op welk Alpha-huis heb je nog nooit gegeten?',
  'Wanneer heb je voor het laatst Flux uitgespeeld?',
  'Wat is je mooiste Alpha-herinnering?',
  'Hoe zou je Alpha in 5 woorden beschrijven?',
  'Hoeveel fietsen heb je al versleten in je studententijd?',
  'Hoeveel huisgenoten is het perfecte aantal huisgenoten?',
  'Wat is je favoriete liedje uit de Alpha-liedbundel?',
  'Vertel eens een Alpha-legende.',
  'Welke commissie zou je nog willen doen?',
  'Heb je stiekem een oogje op iemand?',
  'Wat is het beste broodbeleg?'
];

const SuggestedEmojis = [
  '😀', '😁', '😂', '😊', '😋', '😎', '😘', '😍', '🤔', '🙄', '😏', '🤓', '😲', '😭', '😡', '😇', '👍', '👎',
  '🙈', '☕', '🍻', '⛪', '⛵', '☀', '🎈', '🎉', '🏆', '⚽', '🎮', '✅', '❌', '🐨', '🍭', '🍌', '💩'
];

export {
  CoverPhotoFallback,
  AvatarFallback,
  AvatarThumbFallback,
  GroupKinds,
  StaticPageCategories,
  ActivityCategories,
  OpenQuestionTypes,
  ClosedQuestionTypes,
  MailAliasModerationTypes,
  PicturePublicationPreferenceTypes,
  UserDetailsPreferenceTypes,
  DigtusSubscriptionPreferenceTypes,
  AlmanakSubscriptionPreferenceTypes,
  WelcomeTextLines,
  SuggestedEmojis
};
