import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'hi' | 'gor' | 'mr' | 'te' | 'kn' | 'en';

export interface TranslationDictionary {
  // Brand & Slogan
  appName: string;
  tagline: string;

  // Header Nav
  navFeed: string;
  navChat: string;
  navReels: string;
  navVideos: string;
  navPanIndia: string;
  navConnect: string;
  navDharohar: string;

  // Header Actions
  tanpuraActive: string;
  tanpuraInactive: string;
  jaiSevalal: string;

  // Mobile Bottom Nav
  tabFeed: string;
  tabChat: string;
  tabReels: string;
  tabPanIndia: string;
  tabConnect: string;
  tabDharohar: string;

  // Daily Teaching
  dailyTeachingTitle: string;
  dailyTeachingSubtitle: string;
  every24Hours: string;
  nextTeachingIn: string;
  simpleMeaning: string;
  listenTeaching: string;
  speaking: string;
  shareTeaching: string;
  copied: string;
  takeDailyVow: string;
  vowAccepted: string;
  vowStreak: string;
  backToToday: string;
  readAll22: string;

  // Feed Section
  createPostTitle: string;
  createPostPlaceholder: string;
  categoryLabel: string;
  postButton: string;
  allPosts: string;
  santTeachings: string;
  history: string;
  cultureAndArt: string;
  festivals: string;
  tandaNews: string;
  like: string;
  comment: string;
  share: string;
  listen: string;
  writeCommentPlaceholder: string;
  sendComment: string;
  culturalCalendarTitle: string;
  quickAccessTitle: string;

  // Pan India Hub
  panIndiaTitle: string;
  panIndiaSubtitle: string;
  allStates: string;
  findTandaPlaceholder: string;
  registerTandaButton: string;
  stateHelpline: string;
  populationLabel: string;
  tandasCountLabel: string;
  prominentDistrictsLabel: string;
  shrinesLabel: string;
  youthAndHostels: string;
  matrimonialSection: string;

  // Footer
  footerMotto: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  hi: {
    appName: 'Banjara App',
    tagline: 'अखिल भारतीय बंजारा समाज महामंच',
    navFeed: 'चौपाल (Feed)',
    navChat: 'तांडा संवाद (Chat)',
    navReels: 'झलक (Reels)',
    navVideos: 'दर्शन (Videos)',
    navPanIndia: 'अखिल भारत (Pan-India)',
    navConnect: 'गौर संगम (Connect)',
    navDharohar: 'धरोहर व उपदेश',
    tanpuraActive: 'धुन सक्रिय',
    tanpuraInactive: 'भक्ति तानपुरा',
    jaiSevalal: 'जय सेवालाल',

    tabFeed: 'चौपाल',
    tabChat: 'संवाद',
    tabReels: 'झलक',
    tabPanIndia: 'भारत नेटवर्क',
    tabConnect: 'गौर संगम',
    tabDharohar: 'धरोहर',

    dailyTeachingTitle: 'दैनिक संत सेवालाल उपदेश',
    dailyTeachingSubtitle: 'संत सेवालाल महाराज के 22 दिव्य वचनों का प्रतिदिन अनुशीलन',
    every24Hours: 'हर 24 घंटे में नया वचन',
    nextTeachingIn: 'अगला वचन:',
    simpleMeaning: 'सरल अर्थ:',
    listenTeaching: 'वचन सुनें',
    speaking: 'बोल रहे हैं...',
    shareTeaching: 'वचन साझा करें',
    copied: 'कॉपी हो गया!',
    takeDailyVow: 'आज का संकल्प लें',
    vowAccepted: 'आज का संकल्प स्वीकृत ✓',
    vowStreak: 'दिन साधना',
    backToToday: 'आज के वचन पर लौटें',
    readAll22: 'सभी 22 वचन पढ़ें →',

    createPostTitle: 'तांडा चौपाल - अपने विचार साझा करें',
    createPostPlaceholder: 'जय सेवालाल! आज अपने तांडा, राज्य या समाज के लिए कुछ लिखें...',
    categoryLabel: 'विषय:',
    postButton: 'पोस्ट करें',
    allPosts: 'सभी पोस्ट',
    santTeachings: 'संत उपदेश',
    history: 'इतिहास',
    cultureAndArt: 'संस्कृति व कला',
    festivals: 'तीज व उत्सव',
    tandaNews: 'तांडा समाचार',
    like: 'पसंद (Like)',
    comment: 'टिप्पणी',
    share: 'साझा करें',
    listen: 'सुनें',
    writeCommentPlaceholder: 'जय सेवालाल! अपनी टिप्पणी लिखें...',
    sendComment: 'भेजें',
    culturalCalendarTitle: 'आगामी बंजारा पर्व एवं तिथियां',
    quickAccessTitle: 'सांस्कृतिक केंद्र त्वरित पहुंच',

    panIndiaTitle: 'अखिल भारतीय बंजारा तांडा व राज्य नेटवर्क',
    panIndiaSubtitle: 'महाराष्ट्र, तेलंगाना, कर्नाटक, आंध्र प्रदेश, राजस्थान, मध्य प्रदेश, गुजरात व उत्तर भारत का एक मंच',
    allStates: 'समस्त राज्य',
    findTandaPlaceholder: 'अपना तांडा, जिला या राज्य खोजें...',
    registerTandaButton: '+ नया तांडा पंजीकृत करें',
    stateHelpline: 'राज्य समाज हेल्पलाइन:',
    populationLabel: 'अनुमानित आबादी:',
    tandasCountLabel: 'कुल तांडे:',
    prominentDistrictsLabel: 'प्रमुख जिले:',
    shrinesLabel: 'पावन तीर्थ व समाधि धाम:',
    youthAndHostels: '📚 शिक्षा, छात्रावास एवं प्रतियोगी परीक्षा सहायता',
    matrimonialSection: '💍 अखिल भारतीय तांडा परिचय व वैवाहिक संबंध',

    footerMotto: '"सत्य री वाट चालो, दया सबसूं मोटो धर्म छ" — संत सेवालाल महाराज',
    footerRights: 'अखिल भारतीय बंजारा एकता · पोहरादेवी धाम · शिवगढ़ · लखीशाह बंजारा धाम',
  },

  gor: {
    appName: 'Banjara App',
    tagline: 'सगळा भारत रो गौरमाटी महामंच',
    navFeed: 'तांडो चौपाल',
    navChat: 'तांडो गोठ (Chat)',
    navReels: 'झलक रील्स',
    navVideos: 'दर्शन वीडियो',
    navPanIndia: 'आखो भारत (Pan-India)',
    navConnect: 'गौर संगम (जोड़ावो)',
    navDharohar: 'धरम-धरोहर व वचन',
    tanpuraActive: 'धुन चालू छ',
    tanpuraInactive: 'भक्ति तानपूरो',
    jaiSevalal: 'जय सेवालाल',

    tabFeed: 'चौपाल',
    tabChat: 'गोठ',
    tabReels: 'झलक',
    tabPanIndia: 'भारत तांडो',
    tabConnect: 'जोड़ावो',
    tabDharohar: 'धरोहर',

    dailyTeachingTitle: 'दन रो सेवाभाया वचन',
    dailyTeachingSubtitle: 'संत सेवालाल महाराज रा 22 वचन रो नित्य सिमरन',
    every24Hours: 'हर 24 घंटामा नवो वचन',
    nextTeachingIn: 'आगलो वचन:',
    simpleMeaning: 'सीधो अर्थ:',
    listenTeaching: 'वचन सांभळो',
    speaking: 'बोले छ...',
    shareTeaching: 'वचन भेजो (Share)',
    copied: 'कॉपी वेगी!',
    takeDailyVow: 'आज रो नेम लेओ',
    vowAccepted: 'आज रो नेम पक्को कीधो ✓',
    vowStreak: 'दन रो नेम',
    backToToday: 'आज रा वचन पर आवो',
    readAll22: 'सगळा 22 वचन वाचो →',

    createPostTitle: 'तांडो चौपाल - आपरो विचार लखो',
    createPostPlaceholder: 'जय सेवालाल! आज आपरा तांडा, तीज-त्योहार या समाज सारू लखो...',
    categoryLabel: 'विषय:',
    postButton: 'पोस्ट करो',
    allPosts: 'सगळी पोस्ट',
    santTeachings: 'सेवाभाया वचन',
    history: 'इतिहास',
    cultureAndArt: 'संस्कृति व फेटीया',
    festivals: 'तीज व उत्सव',
    tandaNews: 'तांडो समाचार',
    like: 'पसंद (Like)',
    comment: 'विचार',
    share: 'साझा करो',
    listen: 'सांभळो',
    writeCommentPlaceholder: 'जय सेवालाल! आपरो विचार लखो...',
    sendComment: 'भेजो',
    culturalCalendarTitle: 'आगला तीज-त्योहार व तिथि',
    quickAccessTitle: 'सांस्कृतिक तांडो सीधा जोड़',

    panIndiaTitle: 'आखा भारत रा गौरमाटी तांडा व राज्य',
    panIndiaSubtitle: 'महाराष्ट्र, तेलंगाना, कर्नाटक, आंध्र, राजस्थान, मालवा, गुजरात सगळा भाया एक तांडो',
    allStates: 'सगळा राज्य',
    findTandaPlaceholder: 'आपरो तांडो या जिलो शोधो...',
    registerTandaButton: '+ नवो तांडो जोड़ो',
    stateHelpline: 'राज्य तांडा हेल्पलाइन:',
    populationLabel: 'गौर आबादी:',
    tandasCountLabel: 'सगळा तांडे:',
    prominentDistrictsLabel: 'मुख्य जिला:',
    shrinesLabel: 'तीर्थ व सेवाभाया धाम:',
    youthAndHostels: '📚 तांडा छोरा-छोरी छात्रावास व कोचिंग',
    matrimonialSection: '💍 गौरमाटी गोत्र अनुसार परिचय व लग्न',

    footerMotto: '"सत्य री वाट चालो, दया सबसूं मोटो धर्म छ" — संत सेवालाल महाराज',
    footerRights: 'सगळा देश रा गौरमाटी एक छ · पोहरादेवी धाम · शिवगढ़ · लखीशाह बंजारा',
  },

  mr: {
    appName: 'Banjara App',
    tagline: 'अखिल भारतीय बंजारा समाज महामंच',
    navFeed: 'चौपाल (Feed)',
    navChat: 'तांडा संवाद (Chat)',
    navReels: 'झलक (Reels)',
    navVideos: 'दर्शन (Videos)',
    navPanIndia: 'अखिल भारत (Pan-India)',
    navConnect: 'गौर संगम (Connect)',
    navDharohar: 'वारसा व उपदेश',
    tanpuraActive: 'धुन सुरू आहे',
    tanpuraInactive: 'भक्ती तानपुरा',
    jaiSevalal: 'जय सेवालाल',

    tabFeed: 'चौपाल',
    tabChat: 'संवाद',
    tabReels: 'झलक',
    tabPanIndia: 'भारत नेटवर्क',
    tabConnect: 'गौर संगम',
    tabDharohar: 'वारसा',

    dailyTeachingTitle: 'दैनिक संत सेवालाल उपदेश',
    dailyTeachingSubtitle: 'संत सेवालाल महाराजांच्या २२ दिव्य वचनांचे नित्य स्मरण',
    every24Hours: 'दर २४ तासांत नवीन वचन',
    nextTeachingIn: 'पुढील वचन:',
    simpleMeaning: 'सोपा अर्थ:',
    listenTeaching: 'वचन ऐका',
    speaking: 'बोलत आहे...',
    shareTeaching: 'वचन शेअर करा',
    copied: 'कॉपी झाले!',
    takeDailyVow: 'आजचा संकल्प घ्या',
    vowAccepted: 'आजचा संकल्प स्वीकारला ✓',
    vowStreak: 'दिवस साधना',
    backToToday: 'आजच्या वचनावर या',
    readAll22: 'सर्व २२ वचने वाचा →',

    createPostTitle: 'तांडा चौपाल - आपले विचार मांडा',
    createPostPlaceholder: 'जय सेवालाल! आज आपल्या तांड्यासाठी, उत्सवासाठी किंवा समाजासाठी लिहा...',
    categoryLabel: 'विषय:',
    postButton: 'पोस्ट करा',
    allPosts: 'सर्व पोस्ट्स',
    santTeachings: 'संत उपदेश',
    history: 'इतिहास',
    cultureAndArt: 'संस्कृती व कला',
    festivals: 'तीज व सण',
    tandaNews: 'तांडा बातम्या',
    like: 'आवडले (Like)',
    comment: 'प्रतिक्रिया',
    share: 'शेअर करा',
    listen: 'ऐका',
    writeCommentPlaceholder: 'जय सेवालाल! आपली प्रतिक्रिया लिहा...',
    sendComment: 'पाठवा',
    culturalCalendarTitle: 'आगामी बंजारा सण व तिथी',
    quickAccessTitle: 'सांस्कृतिक केंद्रांशी त्वरित जोडणी',

    panIndiaTitle: 'अखिल भारतीय बंजारा तांडा व राज्य नेटवर्क',
    panIndiaSubtitle: 'महाराष्ट्र, तेलंगणा, कर्नाटक, आंध्र प्रदेश, राजस्थान व देशातील सर्व बांधवांचा मंच',
    allStates: 'सर्व राज्ये',
    findTandaPlaceholder: 'आपला तांडा, जिल्हा किंवा राज्य शोधा...',
    registerTandaButton: '+ नवीन तांडा नोंदणी करा',
    stateHelpline: 'राज्य समाज हेल्पलाइन:',
    populationLabel: 'अंदाजे लोकसंख्या:',
    tandasCountLabel: 'एकूण तांडे:',
    prominentDistrictsLabel: 'प्रमुख जिल्हे:',
    shrinesLabel: 'पवित्र तीर्थ व समाधी धाम:',
    youthAndHostels: '📚 शिक्षण, वसतिगृह व स्पर्धा परीक्षा साहाय्य',
    matrimonialSection: '💍 अखिल भारतीय तांडा परिचय व विवाह मंच',

    footerMotto: '"सत्य री वाट चालो, दया सबसूं मोटो धर्म छ" — संत सेवालाल महाराज',
    footerRights: 'पोहरादेवी तीर्थ · शिवगड · लखीशाह बंजारा गाथा · लंबानी कला संवर्धन',
  },

  te: {
    appName: 'Banjara App',
    tagline: 'అఖిల భారత బంజారా సమాజ్ వేదిక',
    navFeed: 'చౌపాల్ (Feed)',
    navChat: 'తాండా సంవాదం (Chat)',
    navReels: 'ఝలక్ (Reels)',
    navVideos: 'దర్శనం (Videos)',
    navPanIndia: 'అఖిల భారత్ (Pan-India)',
    navConnect: 'గోర్ సంగమం (కనెక్ట్)',
    navDharohar: 'వారసత్వం & ఉపదేశాలు',
    tanpuraActive: 'ధ్వని ప్రారంభం',
    tanpuraInactive: 'భక్తి తాన్పుర',
    jaiSevalal: 'జై సేవలాల్',

    tabFeed: 'చౌపాల్',
    tabChat: 'సంవాదం',
    tabReels: 'రీల్స్',
    tabPanIndia: 'తాండా నెట్వర్క్',
    tabConnect: 'సంగమం',
    tabDharohar: 'వారసత్వం',

    dailyTeachingTitle: 'రోజువారీ సంత్ సేవలాల్ ఉపదేశం',
    dailyTeachingSubtitle: 'సంత్ సేవలాల్ మహారాజ్ 22 దివ్య వచనాల నిత్య మననం',
    every24Hours: 'ప్రతి 24 గంటలకు నూతన వచనం',
    nextTeachingIn: 'తదుపరి వచనం:',
    simpleMeaning: 'తాత్పర్యం:',
    listenTeaching: 'వచనం వినండి',
    speaking: 'వినబడుతోంది...',
    shareTeaching: 'షేర్ చేయండి',
    copied: 'కాపీ చేయబడింది!',
    takeDailyVow: 'నేటి సంకల్పం తీసుకోండి',
    vowAccepted: 'సంకల్పం ఆమోదించబడింది ✓',
    vowStreak: 'రోజుల దీక్ష',
    backToToday: 'నేటి వచనానికి రండి',
    readAll22: 'అన్ని 22 వచనాలు చదవండి →',

    createPostTitle: 'తాండా చౌపాల్ - మీ ఆలోచనలు పంచుకోండి',
    createPostPlaceholder: 'జై సేవలాల్! మీ తాండా, పండుగలు లేదా సమాజం కోసం రాయండి...',
    categoryLabel: 'విషయం:',
    postButton: 'పోస్ట్ చేయండి',
    allPosts: 'అన్ని పోస్టులు',
    santTeachings: 'సేవలాల్ ఉపదేశాలు',
    history: 'చరిత్ర',
    cultureAndArt: 'సంస్కృతి & లంబాడీ కళ',
    festivals: 'తీజ్ & పండుగలు',
    tandaNews: 'తాండా వార్తలు',
    like: 'ఇష్టం (Like)',
    comment: 'కామెంట్',
    share: 'షేర్',
    listen: 'వినండి',
    writeCommentPlaceholder: 'జై సేవలాల్! మీ కామెంట్ రాయండి...',
    sendComment: 'పంపండి',
    culturalCalendarTitle: 'రాబోయే బంజారా పండుగలు',
    quickAccessTitle: 'ముఖ్యమైన లింకులు',

    panIndiaTitle: 'అఖిల భారత బంజారా తాండాలు & రాష్ట్రాల నెట్వర్క్',
    panIndiaSubtitle: 'తెలంగాణ, ఆంధ్రప్రదేశ్, మహారాష్ట్ర, కర్ణాటక దేశవ్యాప్త తాండాల సమాచారం',
    allStates: 'అన్ని రాష్ట్రాలు',
    findTandaPlaceholder: 'మీ తాండా, జిల్లా లేదా రాష్ట్రాన్ని శోధించండి...',
    registerTandaButton: '+ కొత్త తాండాను నమోదు చేయండి',
    stateHelpline: 'రాష్ట్ర సమాజ హెల్ప్‌లైన్:',
    populationLabel: 'అంచనా జనాభా:',
    tandasCountLabel: 'మొత్తం తాండాలు:',
    prominentDistrictsLabel: 'ముఖ్య జిల్లాలు:',
    shrinesLabel: 'పుణ్యక్షేత్రాలు & సమాధి పీఠాలు:',
    youthAndHostels: '📚 విద్య, వసతి గృహాలు (హాస్టల్స్) & పోటీ పరీక్షల సహాయం',
    matrimonialSection: '💍 అఖిల భారత తాండా వివాహ వేదిక',

    footerMotto: '"సత్య రీ వాట్ చాల్లో, దయ సబ్సూం మోటో ధర్మ ఛ" — సంత్ సేవలాల్ మహారాజ్',
    footerRights: 'పోహ్రాదేవి ధామం · శివగఢ్ · లఖీషా బంజారా చరిత్ర · లంబాడీ సంస్కృతి',
  },

  kn: {
    appName: 'Banjara App',
    tagline: 'ಅಖಿಲ ಭಾರತ ಬಂಜಾರ ಸಮಾಜ ಮಹಾಮಂಚ',
    navFeed: 'ಚೌಪಾಲ್ (Feed)',
    navChat: 'ತಾಂಡಾ ಸಂವಾದ (Chat)',
    navReels: 'ಝಲಕ್ (Reels)',
    navVideos: 'ದರ್ಶನ (Videos)',
    navPanIndia: 'ಅಖಿಲ ಭಾರತ (Pan-India)',
    navConnect: 'ಗೋರ್ ಸಂಗಮ (ಕನೆಕ್ಟ್)',
    navDharohar: 'ಪರಂಪರೆ & ಉಪದೇಶ',
    tanpuraActive: 'ಧ್ವನಿ ಸಕ್ರಿಯ',
    tanpuraInactive: 'ಭಕ್ತಿ ತಾನ್ಪುರ',
    jaiSevalal: 'ಜೈ ಸೇವಾಲಾಲ್',

    tabFeed: 'ಚೌಪಾಲ್',
    tabChat: 'ಸಂವಾದ',
    tabReels: 'ರೀಲ್ಸ್',
    tabPanIndia: 'ತಾಂಡಾ ಜಾಲ',
    tabConnect: 'ಸಂಗಮ',
    tabDharohar: 'ಪರಂಪರೆ',

    dailyTeachingTitle: 'ದೈನಂದಿನ ಸಂತ ಸೇವಾಲಾಲ್ ಉಪದೇಶ',
    dailyTeachingSubtitle: 'ಸಂತ ಸೇವಾಲಾಲ್ ಮಹಾರಾಜರ ೨೨ ದಿವ್ಯ ವಚನಗಳ ನಿತ್ಯ ಸ್ಮರಣೆ',
    every24Hours: 'ಪ್ರತಿ ೨೪ ಗಂಟೆಗೆ ಹೊಸ ವಚನ',
    nextTeachingIn: 'ಮುಂದಿನ ವಚನ:',
    simpleMeaning: 'ಸರಳ ಅರ್ಥ:',
    listenTeaching: 'ವಚನ ಕೇಳಿ',
    speaking: 'ಹೇಳಲಾಗುತ್ತಿದೆ...',
    shareTeaching: 'ಹಂಚಿಕೊಳ್ಳಿ (Share)',
    copied: 'ಕಾಪಿಯಾಗಿದೆ!',
    takeDailyVow: 'ಇಂದಿನ ಸಂಕಲ್ಪ ಸ್ವೀಕರಿಸಿ',
    vowAccepted: 'ಇಂದಿನ ಸಂಕಲ್ಪ ಸ್ವೀಕರಿಸಲಾಗಿದೆ ✓',
    vowStreak: 'ದಿನಗಳ ಸಾಧನೆ',
    backToToday: 'ಇಂದಿನ ವಚನಕ್ಕೆ ಮರಳಿ',
    readAll22: 'ಎಲ್ಲಾ ೨೨ ವಚನಗಳನ್ನು ಓದಿ →',

    createPostTitle: 'ತಾಂಡಾ ಚೌಪಾಲ್ - ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಹಂಚಿಕೊಳ್ಳಿ',
    createPostPlaceholder: 'ಜೈ ಸೇವಾಲಾಲ್! ನಿಮ್ಮ ತಾಂಡಾ, ಹಬ್ಬ ಅಥವಾ ಸಮಾಜದ ಬಗ್ಗೆ ಬರೆಯಿರಿ...',
    categoryLabel: 'ವಿಷಯ:',
    postButton: 'ಪೋಸ್ಟ್ ಮಾಡಿ',
    allPosts: 'ಎಲ್ಲಾ ಪೋಸ್ಟ್‌ಗಳು',
    santTeachings: 'ಸಂತ ಉಪದೇಶ',
    history: 'ಇತಿಹಾಸ',
    cultureAndArt: 'ಲಂಬಾಣಿ ಕಲೆ & ಸಂಸ್ಕೃತಿ',
    festivals: 'ತೀಜ್ & ಹಬ್ಬಗಳು',
    tandaNews: 'ತಾಂಡಾ ಸುದ್ದಿ',
    like: 'ಇಷ್ಟ (Like)',
    comment: 'ಅಭಿಪ್ರಾಯ',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    listen: 'ಕೇಳಿ',
    writeCommentPlaceholder: 'ಜೈ ಸೇವಾಲಾಲ್! ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಬರೆಯಿರಿ...',
    sendComment: 'ಕಳುಹಿಸಿ',
    culturalCalendarTitle: 'ಮುಂಬರುವ ಬಂಜಾರ ಹಬ್ಬಗಳು',
    quickAccessTitle: 'ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರಗಳು',

    panIndiaTitle: 'ಅಖಿಲ ಭಾರತ ಬಂಜಾರ ತಾಂಡಾ ಮತ್ತು ರಾಜ್ಯ ನೆಟ್‌ವರ್ಕ್',
    panIndiaSubtitle: 'ಕರ್ನಾಟಕ (ಶಿವಗಢ), ಮಹಾರಾಷ್ಟ್ರ, ತೆಲಂಗಾಣ, ಆಂಧ್ರ ಹಾಗೂ ಸಮಸ್ತ ಭಾರತದ ಬಂಜಾರ ಸಮಾಜ',
    allStates: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು',
    findTandaPlaceholder: 'ನಿಮ್ಮ ತಾಂಡಾ, ಜಿಲ್ಲೆ ಅಥವಾ ರಾಜ್ಯ ಹುಡುಕಿ...',
    registerTandaButton: '+ ಹೊಸ ತಾಂಡಾ ನೋಂದಾಯಿಸಿ',
    stateHelpline: 'ರಾಜ್ಯ ಸಮಾಜ ಸಹಾಯವಾಣಿ:',
    populationLabel: 'ಅಂದಾಜು ಜನಸಂಖ್ಯೆ:',
    tandasCountLabel: 'ಒಟ್ಟು ತಾಂಡಾಗಳು:',
    prominentDistrictsLabel: 'ಪ್ರಮುಖ ಜಿಲ್ಲೆಗಳು:',
    shrinesLabel: 'ಪವಿತ್ರ ತೀರ್ಥಕ್ಷೇತ್ರಗಳು:',
    youthAndHostels: '📚 ಶಿಕ್ಷಣ, ವಸತಿ ನಿಲಯ (ಹಾಸ್ಟೆಲ್) & ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ನೆರವು',
    matrimonialSection: '💍 ಅಖಿಲ ಭಾರತ ತಾಂಡಾ ವೈವಾಹಿಕ ಪರಿಚಯ ವೇದಿಕೆ',

    footerMotto: '"ಸತ್ಯ ರೀ ವಾಟ್ ಚಾಲೋ, ದಯಾ ಸಬ್ಸೂಂ ಮೋಟೋ ಧರ್ಮ ಛ" — ಸಂತ ಸೇವಾಲಾಲ್ ಮಹಾರಾಜ್',
    footerRights: 'ಪೋಹ್ರಾದೇವಿ ಕ್ಷೇತ್ರ · ಶಿವಗಢ ಜನ್ಮಭೂಮಿ · ಲಖೀಶಾ ಬಂಜಾರ · ಲಂಬಾಣಿ ಕಸೂತಿ',
  },

  en: {
    appName: 'Banjara App',
    tagline: 'Pan-India Banjara (Gormati) Super Platform',
    navFeed: 'Feed',
    navChat: 'Tanda Chat',
    navReels: 'Reels',
    navVideos: 'Darshan',
    navPanIndia: 'Pan-India Network',
    navConnect: 'Connect Members',
    navDharohar: 'Heritage & Teachings',
    tanpuraActive: 'Drone Active',
    tanpuraInactive: 'Devotional Tanpura',
    jaiSevalal: 'Jai Sevalal',

    tabFeed: 'Feed',
    tabChat: 'Chat',
    tabReels: 'Reels',
    tabPanIndia: 'Pan-India',
    tabConnect: 'Connect',
    tabDharohar: 'Heritage',

    dailyTeachingTitle: 'Daily Sant Sevalal Teaching',
    dailyTeachingSubtitle: 'Daily spiritual guidance from 22 divine teachings of Sant Sevalal Maharaj',
    every24Hours: 'New teaching every 24 hours',
    nextTeachingIn: 'Next teaching in:',
    simpleMeaning: 'Meaning:',
    listenTeaching: 'Listen Teaching',
    speaking: 'Speaking...',
    shareTeaching: 'Share Teaching',
    copied: 'Copied to clipboard!',
    takeDailyVow: 'Take Daily Vow',
    vowAccepted: 'Vow Accepted for Today ✓',
    vowStreak: 'Day Streak',
    backToToday: "Return to Today's Teaching",
    readAll22: 'Read all 22 Teachings →',

    createPostTitle: 'Tanda Choupal - Share your thoughts',
    createPostPlaceholder: 'Jai Sevalal! Share news, festivals or thoughts with the community...',
    categoryLabel: 'Topic:',
    postButton: 'Post',
    allPosts: 'All Posts',
    santTeachings: 'Teachings',
    history: 'History',
    cultureAndArt: 'Culture & Art',
    festivals: 'Festivals',
    tandaNews: 'Tanda News',
    like: 'Like',
    comment: 'Comment',
    share: 'Share',
    listen: 'Listen',
    writeCommentPlaceholder: 'Jai Sevalal! Write your comment...',
    sendComment: 'Send',
    culturalCalendarTitle: 'Upcoming Banjara Festivals',
    quickAccessTitle: 'Quick Cultural Links',

    panIndiaTitle: 'Pan-India Banjara Tanda & State Network',
    panIndiaSubtitle: 'Connecting 120 Million Banjara brothers across Maharashtra, Telangana, Karnataka, AP, Rajasthan, MP & North India',
    allStates: 'All States',
    findTandaPlaceholder: 'Search your Tanda, district, or state...',
    registerTandaButton: '+ Register New Tanda',
    stateHelpline: 'State Community Helpline:',
    populationLabel: 'Estimated Population:',
    tandasCountLabel: 'Total Tandas:',
    prominentDistrictsLabel: 'Major Districts:',
    shrinesLabel: 'Sacred Shrines & Shikhara:',
    youthAndHostels: '📚 Education, Hostels & Competitive Exam Guidance',
    matrimonialSection: '💍 Pan-India Tanda Matrimonial & Youth Connect',

    footerMotto: '"Walk on the path of truth, compassion is the highest virtue" — Sant Sevalal Maharaj',
    footerRights: 'Pan-India Banjara Unity · Pohradevi Shrine · Shivgarh · Lakhi Shah Memorial',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'hi',
  setLanguage: () => {},
  t: TRANSLATIONS.hi,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('gorb_language') as Language;
      if (saved && (saved === 'hi' || saved === 'gor' || saved === 'mr' || saved === 'te' || saved === 'kn' || saved === 'en')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'hi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gorb_language', lang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
