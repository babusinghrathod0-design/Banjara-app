/**
 * Authentic Banjara (Gormati) Community Cultural, Historical & Social Data
 */

export interface Post {
  id: string;
  author: string;
  tanda: string;
  role: string;
  avatar: string;
  timeAgo: string;
  title?: string;
  content: string;
  imageUrl?: string;
  category: 'संस्कृति' | 'इतिहास' | 'उत्सव' | 'उपदेश' | 'समाचार';
  likes: number;
  hasLiked?: boolean;
  commentsCount: number;
  comments: Array<{ id: string; author: string; text: string; time: string }>;
  shares: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole?: string;
  senderAvatar: string;
  text: string;
  time: string;
  isMe: boolean;
  isAudio?: boolean;
  audioDuration?: string;
  likes?: number;
}

export interface ChatGroup {
  id: string;
  name: string;
  tagline: string;
  avatar: string;
  unreadCount: number;
  lastMessageTime: string;
  membersCount: number;
  messages: ChatMessage[];
}

export interface ReelItem {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  tanda: string;
  likes: number;
  comments: number;
  shares: number;
  soundName: string;
  caption: string;
  tags: string[];
  bgGradient: string;
  previewEmoji: string;
}

export interface VideoItem {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadDate: string;
  duration: string;
  description: string;
  category: 'सत्संग' | 'इतिहास' | 'लोककला' | 'तीर्थ दर्शन';
  lyrics?: string[];
}

export interface DictionaryWord {
  gorWord: string;
  hindiMeaning: string;
  englishMeaning: string;
  exampleSentence: string;
  category: 'अभिवादन' | 'रिश्ते' | 'दैनिक' | 'संस्कृति';
}

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'बाबूराव राठौड़ (नाईक)',
    tanda: 'पोहरादेवी तांडा, वाशिम',
    role: 'वरिष्ठ समाज सेवक',
    avatar: '🚩',
    timeAgo: '10 मिनट पहले',
    category: 'उपदेश',
    title: 'संत सेवालाल महाराज का 22 वचनों में पहला वचन: सत्य और अहिंसा',
    content: 'संत सेवालाल महाराज ने 18वीं शताब्दी में ही समस्त मानवजाति को संदेश दिया था: "सत्य री वाट चालो, काईं भी हो जाये झूठ मत बोलो।" आज हमारी नई पीढ़ी को चाहिए कि वे अपने जीवन में सेवाभाया के 22 दिव्य उपदेशों को धारण करें। गौ-सेवा, जीव-दया और पर्यावरण संरक्षण ही हमारा सच्चा धर्म है। जय सेवालाल! 🙏',
    likes: 342,
    commentsCount: 28,
    comments: [
      { id: 'c1', author: 'सुनील पंवार', text: 'सत्य वचन बापू! जय सेवाभाया री!', time: '8 मिनट पहले' },
      { id: 'c2', author: 'कविता जाधव', text: 'हर तांडा में सत्संग होना चाहिए।', time: '3 मिनट पहले' }
    ],
    shares: 89
  },
  {
    id: 'post-2',
    author: 'डॉ. रूपसिंह चौहान',
    tanda: 'यवतमाल, महाराष्ट्र',
    role: 'इतिहासकार एवं प्राध्यापक',
    avatar: '📖',
    timeAgo: '1 घंटे पहले',
    category: 'इतिहास',
    title: 'बाबा लखीशाह बंजारा: त्याग और शहादत की अमर गाथा',
    content: '1675 में जब मुग़ल शासक औरंगज़ेब ने चांदनी चौक पर सिखों के नवें गुरु श्री गुरु तेग बहादुर जी का शीश काट दिया, तब कोई भी पार्थिव शरीर उठाने की हिम्मत नहीं कर रहा था। उस समय बंजारा समाज के महादानी व्यापारी बाबा लखीशाह बंजारा और उनके पुत्रों ने अपने बैलों के काफिले के बीच गुरु जी के पावन शरीर को सम्मानपूर्वक निकाला और अपने रायसीना स्थित घर (वर्तमान गुरुद्वारा रकाब गंज साहिब) को ही चिता बनाकर ससम्मान अंतिम संस्कार किया। यह हमारे पूर्वजों की अदम्य निष्ठा और वीरता का प्रमाण है।',
    likes: 512,
    commentsCount: 45,
    comments: [
      { id: 'c3', author: 'रमेश नायक', text: 'गौरमाटी का इतिहास सोने के अक्षरों में लिखा जाने योग्य है।', time: '40 मिनट पहले' }
    ],
    shares: 167
  },
  {
    id: 'post-3',
    author: 'आरती बंजारा (लंबानी आर्टिस्ट)',
    tanda: 'हम्पी-संदूर, कर्नाटक',
    role: 'पारंपरिक कशीदाकारी शिल्पी',
    avatar: '🪡',
    timeAgo: '3 घंटे पहले',
    category: 'संस्कृति',
    title: 'लंबानी कसीदाकारी (Lambani Embroidery): कांच, कौड़ी और धागों का जादू',
    content: 'हमारी बंजारा महिलाओं द्वारा सुई और धागे से तैयार की जाने वाली लंबानी कसीदाकारी को भारत सरकार द्वारा GI Tag प्राप्त है! इसमें 14 प्रकार के विशेष टांके (Stitches), कौड़ी (Cowrie shells), और आईने (Mirrors) का अद्भुत संगम होता है। हमारी वेशभूषा केवल वस्त्र नहीं, बल्कि हमारे 3000 वर्षों के कारवां इतिहास का जीवंत दस्तावेज है।',
    likes: 678,
    commentsCount: 62,
    comments: [
      { id: 'c4', author: 'नीता राठौड़', text: 'अति सुंदर! हमारी विरासत दुनिया में सबसे अनूठी है।', time: '2 घंटे पहले' }
    ],
    shares: 210
  },
  {
    id: 'post-4',
    author: 'अखिल भारतीय गौर बंजारा युवा परिषद',
    tanda: 'हैदराबाद, तेलंगाना',
    role: 'युवा संगठन',
    avatar: '🌾',
    timeAgo: '5 घंटे पहले',
    category: 'उत्सव',
    title: 'आगामी तीज महोत्सव की तैयारियां तांडा-तांडा में प्रारंभ!',
    content: 'श्रावण मास में मनाया जाने वाला "तीज" बंजारा समाज की कुंवारी कन्याओं और भाई-बहन के अटूट स्नेह का महापर्व है। नौ दिनों तक बांस की टोकरियों में गेहूं के ज्वारे सींचे जाते हैं। इस बार तांडा के सभी युवा लेंगी नृत्य और पारंपरिक गीतों के साथ सांस्कृतिक प्रतियोगिताएं आयोजित कर रहे हैं। सभी गौर भाइयों-बहनों को अग्रिम बधाई!',
    likes: 420,
    commentsCount: 39,
    comments: [
      { id: 'c5', author: 'विक्रम भूक्या', text: 'लेंगी की तैयारी जोरों पर है हमारे तांडा में!', time: '4 घंटे पहले' }
    ],
    shares: 95
  }
];

export const INITIAL_GROUPS: ChatGroup[] = [
  {
    id: 'group-pohradevi',
    name: '🚩 पोहरादेवी धाम सत्संग परिवार',
    tagline: 'संत सेवालाल महाराज एवं मेरमा यादी के पावन विचार',
    avatar: '🛕',
    unreadCount: 3,
    lastMessageTime: '10:45 AM',
    membersCount: 14200,
    messages: [
      {
        id: 'm1',
        sender: 'महंत कबीरदास जी',
        senderRole: 'पोहरादेवी पीठ',
        senderAvatar: '🙏',
        text: 'जय सेवालाल! आज सुबह की पावन आरती पोहरादेवी धाम में संपन्न हुई। सभी भक्तजनों को संत सेवालाल महाराज का आशीर्वाद प्राप्त हो।',
        time: '08:30 AM',
        isMe: false
      },
      {
        id: 'm2',
        sender: 'राजेश नायक',
        senderAvatar: '👨',
        text: 'जय सेवालाल महंत जी! 15 फरवरी को सेवालाल जयंती पर हमारे तांडे से 200 लोगों का जत्था पोहरादेवी आ रहा है।',
        time: '09:15 AM',
        isMe: false
      },
      {
        id: 'm3',
        sender: 'आप (User)',
        senderAvatar: '🌟',
        text: 'जय सेवालाल! सेवाभाया री आरती सुनकर मन में असीम शांति मिलती है।',
        time: '10:12 AM',
        isMe: true
      },
      {
        id: 'm4',
        sender: 'श्रीमती शांतिबाई राठौड़',
        senderRole: 'कीर्तन प्रमुख',
        senderAvatar: '🪕',
        text: 'आरती सेवाभाया री, जगदम्बा मेरमा यादी री... सभी परिवार सुबह-शाम 22 वचनों का पाठ अवश्य करें।',
        time: '10:45 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'group-choupal',
    name: '🌾 तांडा चौपाल - पंचायत एवं विकास',
    tagline: 'नाईक, कारभारी और तांडा भाइयों का विचार मंच',
    avatar: '🛖',
    unreadCount: 1,
    lastMessageTime: '11:20 AM',
    membersCount: 8900,
    messages: [
      {
        id: 'tc1',
        sender: 'नाईक देवेन्द्र सिंह',
        senderRole: 'तांडा प्रमुख',
        senderAvatar: '👑',
        text: 'राम-राम भाइयों! आज शाम 6 बजे तांडा चौपाल पर बच्चों की उच्च शिक्षा और प्रतियोगी परीक्षाओं की कोचिंग सहायता पर बैठक है।',
        time: '10:00 AM',
        isMe: false
      },
      {
        id: 'tc2',
        sender: 'अशोक पंवार',
        senderAvatar: '💼',
        text: 'बहुत सराहनीय पहल नाईक जी! हमारे समाज के युवाओं को UPSC, MPSC और तकनीकी शिक्षा में आगे आना होगा।',
        time: '10:40 AM',
        isMe: false
      },
      {
        id: 'tc3',
        sender: 'प्रियंका चौहान',
        senderRole: 'शिक्षिका',
        senderAvatar: '👩‍🏫',
        text: 'बालिकाओं की शिक्षा के लिए विशेष छात्रवृत्ति कार्यक्रम भी शुरू किया जाना चाहिए।',
        time: '11:20 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'group-yuva',
    name: '⚡ अखिल भारतीय गौरमाटी युवा शक्ति',
    tagline: 'शिक्षा, रोजगार एवं सांस्कृतिक स्वाभिमान',
    avatar: '🏹',
    unreadCount: 5,
    lastMessageTime: '11:50 AM',
    membersCount: 22400,
    messages: [
      {
        id: 'y1',
        sender: 'सचिन राठौड़',
        senderAvatar: '🚀',
        text: 'साथियों! डिजिटल युग में हमारी गौर बोली (Gor Boli) को सुरक्षित रखना हम युवाओं की जिम्मेदारी है।',
        time: '09:00 AM',
        isMe: false
      },
      {
        id: 'y2',
        sender: 'रोहित जाधव',
        senderAvatar: '📱',
        text: 'इस ऐप के माध्यम से दुनिया भर के बंजारा भाई-बहन एक साथ जुड़ रहे हैं, यह बहुत गर्व का क्षण है!',
        time: '10:20 AM',
        isMe: false
      },
      {
        id: 'y3',
        sender: 'सोनम नायक',
        senderAvatar: '✨',
        text: 'जय सेवालाल! हम सब मिलकर लंबानी कला को ई-कॉमर्स प्लेटफॉर्म्स पर लेकर जाएंगे।',
        time: '11:50 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'group-culture',
    name: '🪕 बंजारा लोककला एवं लेंगी ग्रुप',
    tagline: 'लेंगी, तीज, ढमोली और पारंपरिक लोकगीत',
    avatar: '🥁',
    unreadCount: 0,
    lastMessageTime: 'कल',
    membersCount: 6500,
    messages: [
      {
        id: 'k1',
        sender: 'मास्टर किशनलाल',
        senderRole: 'लोक गायक',
        senderAvatar: '🎵',
        text: 'पारंपरिक लेंगी के 12 मुख्य ताल होते हैं। डफ और नगाड़े की थाप पर जो ऊर्जा होती है, वो अद्भुत है।',
        time: 'कल 04:30 PM',
        isMe: false
      }
    ]
  }
];

export const INITIAL_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'पारंपरिक लेंगी नृत्य - वाशिम तांडा',
    creator: 'गौरमाटी कल्चरल ट्रूप',
    creatorAvatar: '🥁',
    tanda: 'वाशिम, महाराष्ट्र',
    likes: 12400,
    comments: 489,
    shares: 1980,
    soundName: 'लेंगी ताल - पारंपरिक नगाड़ा व ढोल',
    caption: 'हमारी संस्कृति, हमारी पहचान! लेंगी नृत्य की अद्भुत ऊर्जा और सामूहिक लय। जय सेवालाल! 🚩 #Lengi #BanjaraCulture #Gormati',
    tags: ['लेंगी', 'संस्कृति', 'बंजारा', 'नृत्य'],
    bgGradient: 'from-amber-700 via-red-900 to-slate-950',
    previewEmoji: '🥁'
  },
  {
    id: 'reel-2',
    title: 'तीज महोत्सव - गेहूं के ज्वारे पूजन',
    creator: 'पूजा राठौड़',
    creatorAvatar: '🌸',
    tanda: 'आदिलाबाद, तेलंगाना',
    likes: 18900,
    comments: 672,
    shares: 3410,
    soundName: 'तीजां रमो रमो रे गोरमाटी - तीज गीत',
    caption: 'तीज का 9वां दिन! कुंवारी कन्याओं द्वारा सिर पर टोकरियां सजाकर नदी तट पर विसर्जन और लोकगीत। 🌾✨ #TeejFestival #Lambani',
    tags: ['तीज', 'त्योहार', 'कन्यापूजन', 'लोकगीत'],
    bgGradient: 'from-emerald-900 via-teal-950 to-slate-950',
    previewEmoji: '🌾'
  },
  {
    id: 'reel-3',
    title: 'लंबानी कसीदाकारी - हाथ का जादुई हुनर',
    creator: 'हम्पी क्राफ्ट्स',
    creatorAvatar: '🪡',
    tanda: 'विजयनगर, कर्नाटक',
    likes: 24500,
    comments: 890,
    shares: 5120,
    soundName: 'बंजारा सितार एवं लोक धुन',
    caption: 'सुई, धागा, कौड़ियां और कांच! एक फेटीया तैयार करने में 3 महीने का समय लगता है। विश्व प्रसिद्ध हस्तकला। 🪡❤️ #GI_Tag #LambaniEmbroidery',
    tags: ['कशीदाकारी', 'हस्तशिल्प', 'फैशन', 'विरासत'],
    bgGradient: 'from-rose-900 via-purple-950 to-slate-950',
    previewEmoji: '🪡'
  },
  {
    id: 'reel-4',
    title: 'पोहरादेवी धाम दर्शन - बंजारा काशी',
    creator: 'भक्ति दर्शन',
    creatorAvatar: '🛕',
    tanda: 'पोहरादेवी, महाराष्ट्र',
    likes: 31200,
    comments: 1420,
    shares: 8900,
    soundName: 'आरती सेवाभाया री - ओरिजिनल साउंड',
    caption: 'संत सेवालाल महाराज और जगदम्बा मेरमा यादी के दर्शन। जहां आकर हर मनोकामना पूर्ण होती है। बोलो संत सेवालाल महाराज की जय! 🙏✨',
    tags: ['पोहरादेवी', 'संतसेवालाल', 'दर्शन', 'भक्ति'],
    bgGradient: 'from-orange-800 via-amber-950 to-slate-950',
    previewEmoji: '🛕'
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'संत सेवालाल महाराज की संपूर्ण जीवन गाथा एवं 22 दिव्य वचन',
    channel: 'गौर दर्शन ऑफिशियल',
    channelAvatar: '🚩',
    views: '2.4M बार देखा गया',
    uploadDate: '3 महीने पहले',
    duration: '28:45',
    category: 'सत्संग',
    description: 'संत सेवालाल महाराज (1739 - 1806) बंजारा समाज के आराध्य सद्गुरु थे। उन्होंने अहिंसा, जीवदया, मद्यपान निषेध, कन्या सम्मान और समाज सुधार के जो 22 दिव्य वचन दिए, वे आज भी हमारा मार्गदर्शन करते हैं। जानिए उनकी बाल्यकाल लीलाएं, मेरमा यादी से साक्षात्कार और पोहरादेवी में समाधि का इतिहास।',
    lyrics: [
      '1. केन भी जीव रो जीव मत लेओ (किसी भी जीव की हत्या मत करो - अहिंसा परमो धर्म:)',
      '2. चोरी, जुआ, मद्यपान और व्यसन रो त्याग करो (सभी दुर्गुणों से दूर रहो)',
      '3. सत्य री वाट चालो (सदा सत्य के मार्ग पर चलो)',
      '4. पानी री रक्षा करो, झाड़-पान मत काटो (पर्यावरण और जलस्रोतों का संरक्षण करो)',
      '5. तांडो में प्रेम रखो, नाईक री आज्ञा मानो (समाज और संगठन में एकता रखो)',
      '6. पराई स्त्री ने माँ-बहन समझो (मातृशक्ति का सर्वोच्च सम्मान)',
      '7. मेहनत री कमाई खाओ, आलस छोड़ो (स्वावलंबन और परिश्रम)'
    ]
  },
  {
    id: 'vid-2',
    title: 'बाबा लखीशाह बंजारा: गुरु तेग बहादुर जी के पावन शरीर का अंतिम संस्कार',
    channel: 'बंजारा इतिहास शोध संस्थान',
    channelAvatar: '📖',
    views: '1.1M बार देखा गया',
    uploadDate: '6 महीने पहले',
    duration: '18:12',
    category: 'इतिहास',
    description: 'दिल्ली के रायसीना के शासक एवं महासार्थवाह बाबा लखीशाह बंजारा की अद्भुत वीरता और धर्मपरायणता। किस प्रकार मुग़ल पहरेदारों को चकमा देकर गुरु जी के पार्थिव शरीर को अपने घर लाकर संपूर्ण हवेली को ही अग्नि समर्पित कर दिया गया।'
  },
  {
    id: 'vid-3',
    title: 'श्री सेवाभाया री आरती (संपूर्ण बोल एवं अर्थ सहित)',
    channel: 'पोहरादेवी भक्ति संगीत',
    channelAvatar: '🪕',
    views: '3.8M बार देखा गया',
    uploadDate: '1 वर्ष पहले',
    duration: '09:20',
    category: 'तीर्थ दर्शन',
    description: 'आरती कीजे श्री सेवाभाया री, जगदम्बा मेरमा यादी री। सुनिए मनमोहक स्वर में सेवाभाया की पावन आरती और अपने घर-परिवार में सुख-समृद्धि लाएं।'
  },
  {
    id: 'vid-4',
    title: 'बंजारा समाज का चार गोत्र विधान (राठौड़, पंवार, चौहान, जाधव) एवं उपगोत्र',
    channel: 'संस्कृति संगम',
    channelAvatar: '🏛️',
    views: '840K बार देखा गया',
    uploadDate: '8 महीने पहले',
    duration: '22:15',
    category: 'लोककला',
    description: 'बंजारा (गौरमाटी) समाज की वंश परंपरा, गोत्र व्यवस्था और विवाह नियम। जानिए 27 पाड़ा राठौड़, 12 पाड़ा पंवार, 6 पाड़ा चौहान और 52 पाड़ा जाधव का संपूर्ण विवरण।'
  }
];

export const GOR_DICTIONARY: DictionaryWord[] = [
  {
    gorWord: 'केन छस? (Ken chhas?)',
    hindiMeaning: 'कैसे हो? / क्या हाल है?',
    englishMeaning: 'How are you?',
    exampleSentence: 'राम-राम भाई! केन छस तूं?',
    category: 'अभिवादन'
  },
  {
    gorWord: 'हू मजोमा छूं (Hoo majoma chhoon)',
    hindiMeaning: 'मैं ठीक/मजे में हूँ',
    englishMeaning: 'I am doing well',
    exampleSentence: 'सेवाभाया री दया से हू मजोमा छूं।',
    category: 'अभिवादन'
  },
  {
    gorWord: 'तमारो नाम कांई छ? (Tamaro naam kaan-ee chha?)',
    hindiMeaning: 'आपका नाम क्या है?',
    englishMeaning: 'What is your name?',
    exampleSentence: 'भाया, तमारो नाम कांई छ?',
    category: 'दैनिक'
  },
  {
    gorWord: 'तांडो (Taando)',
    hindiMeaning: 'बंजारा बस्ती या गांव',
    englishMeaning: 'Banjara settlement / village',
    exampleSentence: 'म्हारो तांडो पोहरादेवी कने छ।',
    category: 'संस्कृति'
  },
  {
    gorWord: 'यादी (Yaadi)',
    hindiMeaning: 'माँ / माताजी',
    englishMeaning: 'Mother',
    exampleSentence: 'मेरमा यादी म्हारी रक्षा करे।',
    category: 'रिश्ते'
  },
  {
    gorWord: 'बापू (Baapu)',
    hindiMeaning: 'पिताजी',
    englishMeaning: 'Father',
    exampleSentence: 'बापू तांडा चौपाल पर गया छ।',
    category: 'रिश्ते'
  },
  {
    gorWord: 'भाया (Bhaaya)',
    hindiMeaning: 'भाई / बंधु',
    englishMeaning: 'Brother / friend',
    exampleSentence: 'आओ सेवाभाया रा भक्तो! एक साथ रमो।',
    category: 'रिश्ते'
  },
  {
    gorWord: 'लाडकी / बेन (Laadki / Ben)',
    hindiMeaning: 'बहन / बेटी',
    englishMeaning: 'Sister / daughter',
    exampleSentence: 'तीज रा दन लाडकी तीज रो पूजन करे।',
    category: 'रिश्ते'
  },
  {
    gorWord: 'रोटी खाधो के? (Roti khaadho ke?)',
    hindiMeaning: 'खाना खा लिया क्या?',
    englishMeaning: 'Did you have food?',
    exampleSentence: 'आओ घरमा, रोटी खाधो के?',
    category: 'दैनिक'
  },
  {
    gorWord: 'फेटीया (Phetiya)',
    hindiMeaning: 'बंजारा महिलाओं का पारंपरिक कशीदाकारी घाघरा',
    englishMeaning: 'Traditional embroidered Banjara skirt',
    exampleSentence: 'फेटीया पर कौड़ी और आईने रो काम छ।',
    category: 'संस्कृति'
  },
  {
    gorWord: 'काचोळी (Kaacholi)',
    hindiMeaning: 'पारंपरिक कशीदाकारी वाली चोली',
    englishMeaning: 'Traditional embroidered bodice/blouse',
    exampleSentence: 'काचोळी लंबानी हस्तकला रो प्रतीक छ।',
    category: 'संस्कृति'
  },
  {
    gorWord: 'नाईक (Naik)',
    hindiMeaning: 'तांडा प्रमुख / मुखिया',
    englishMeaning: 'Chief / village elder',
    exampleSentence: 'नाईक तांडा रो न्याय करे।',
    category: 'संस्कृति'
  },
  {
    gorWord: 'ढमोली (Dhamoli)',
    hindiMeaning: 'तीज उत्सव की पूर्व संध्या का सामूहिक प्रीतिभोज',
    englishMeaning: 'Community feast on eve of Teej festival',
    exampleSentence: 'आज रात तांडोमा ढमोली छ।',
    category: 'संस्कृति'
  },
  {
    gorWord: 'लेंगी (Lengi)',
    hindiMeaning: 'पारंपरिक समूह लोकनृत्य एवं वीरता गीत',
    englishMeaning: 'Traditional folk group dance with sticks & songs',
    exampleSentence: 'होली और त्योहार पर लेंगी रमो।',
    category: 'संस्कृति'
  }
];

export const SEVALAL_UPDESH = [
  {
    number: '01',
    title: 'सत्य वचन (Truthfulness)',
    devanagari: 'सत्य री वाट चालो, काईं भी हो जाये झूठ मत बोलो।',
    meaning: 'जीवन में कैसी भी कठिन परिस्थिति क्यों न आए, सदैव सत्य के मार्ग पर चलो। झूठ बोलने से आत्मा का पतन होता है।'
  },
  {
    number: '02',
    title: 'अहिंसा एवं जीव दया (Non-Violence)',
    devanagari: 'केन भी मुका जीव रो जीव मत लेओ, दया सबसूं मोटो धर्म छ।',
    meaning: 'किसी भी मूक प्राणी की हत्या मत करो। समस्त जीव-जंतुओं पर दया करना ही ईश्वर की सच्ची पूजा है।'
  },
  {
    number: '03',
    title: 'व्यसन व मद्यपान निषेध (Temperance)',
    devanagari: 'दारू, जुआ और नशा रो त्याग करो, ईंसूं घर-कुटुंब नाश होवे छ।',
    meaning: 'शराब, जुआ और हर प्रकार के नशे से दूर रहो। नशा घर, परिवार, बुद्धि और समाज का सर्वनाश कर देता है।'
  },
  {
    number: '04',
    title: 'गौ-रक्षा एवं पशु प्रेम (Cow Protection)',
    devanagari: 'गाय-बैल म्हारा सखा छ, इनकी सेवा करो और रक्षा करो।',
    meaning: 'गाय और बैल बंजारा समाज के व्यापार और जीवन के आधार हैं। उनकी सेवा और रक्षा करना प्रत्येक गौरमाटी का कर्तव्य है।'
  },
  {
    number: '05',
    title: 'पर्यावरण व जल संरक्षण (Nature Preservation)',
    devanagari: 'पानी री रक्षा करो, कुआं-बावड़ी स्वच्छ रखो, झाड़ मत काटो।',
    meaning: 'प्रकृति ईश्वर का रूप है। जलस्रोतों को दूषित मत करो और हरे-भरे वृक्षों को मत काटो, नए पौधे लगाओ।'
  },
  {
    number: '06',
    title: 'मातृशक्ति का सर्वोच्च सम्मान (Respect for Women)',
    devanagari: 'पराई स्त्री ने यादी-बेन समझो, कन्या रो अपमान मत करो।',
    meaning: 'स्त्री शक्ति की प्रतीक है। समाज में कन्याओं और माताओं का सर्वोच्च आदर करो। चरित्र की शुचिता ही सबसे बड़ा आभूषण है।'
  },
  {
    number: '07',
    title: 'तांडा संगठन एवं एकता (Community Unity)',
    devanagari: 'तांडो में एको रखो, नाईक और कारभारी री आज्ञा शिरोधार्य करो।',
    meaning: 'आपसी विवादों को तांडा पंचायत में प्रेमपूर्वक सुलझाओ। संगठन और एकता में ही समाज की शक्ति निहित है।'
  },
  {
    number: '08',
    title: 'परिश्रम एवं स्वावलंबन (Honest Labor)',
    devanagari: 'मेहनत री कमायी खाओ, चोरी-डकैती और छल सूं दूर रहो।',
    meaning: 'पसीने की कमाई में ही बरकत होती है। किसी का हक मत छीनो और पराधीनता के बजाय स्वावलंबी बनो।'
  },
  {
    number: '09',
    title: 'शिक्षा एवं विद्या अर्जन (Education for Youth)',
    devanagari: 'छोरा-छोरी ने विद्या शिखाओ, ज्ञान बिना जीवन अंधारो छ।',
    meaning: 'पुत्र और पुत्री दोनों को उच्च शिक्षा दिलाओ। विद्या ही मनुष्य को अज्ञान और शोषण के अंधकार से मुक्त करती है।'
  },
  {
    number: '10',
    title: 'अतिथि सत्कार (Hospitality)',
    devanagari: 'घर आये परोणा ने भगवान समझो, आदर सूं पानी-रोटी देवो।',
    meaning: 'द्वार पर आए अतिथि का सप्रेम स्वागत करो। बंजारा समाज की परंपरा में अतिथि सत्कार साक्षात प्रभु सेवा है।'
  },
  {
    number: '11',
    title: 'अंधविश्वास एवं पाखंड त्याग (Reject Superstition)',
    devanagari: 'जादू-टोणा और ढोंग मत मानो, केवल सत्य सनातन शक्ति ने पूजो।',
    meaning: 'अंधविश्वास, तांत्रिक छल और पाखंड से बचो। एकमात्र परमात्मा और जगदम्बा मेरमा यादी की सच्ची भक्ति करो।'
  },
  {
    number: '12',
    title: 'अन्न एवं जल का आदर (Respect for Grain & Water)',
    devanagari: 'अन्न रो अपमान मत करो, थाली में जूठन मत छोड़ो।',
    meaning: 'अन्न ब्रह्म है। भोजन को कभी व्यर्थ मत फेंको और जरूरतमंदों को पहले भोजन कराओ।'
  },
  {
    number: '13',
    title: 'क्रोध पर विजय (Anger Control)',
    devanagari: 'क्रोध मन रो वैरी छ, धीरज और शांति सूं काम लियो।',
    meaning: 'क्रोध विवेक को नष्ट कर देता है। विपरीत परिस्थितियों में भी शांति और धैर्य से निर्णय लो।'
  },
  {
    number: '14',
    title: 'वचन की मर्यादा (Keeping Promises)',
    devanagari: 'गौरमाटी रो बोल पत्थर री लकीर छ, वचन देके मुकरो मत।',
    meaning: 'बंजारा का दिया वचन प्राणों से भी बढ़कर होना चाहिए। अपनी जुबान और व्यापारिक ईमानदारी पर अडिग रहो।'
  },
  {
    number: '15',
    title: 'आपसी क्षमाभाव (Forgiveness)',
    devanagari: 'भूल करने वाले ने क्षमा करो, मन में वैर-भाव मत पालो।',
    meaning: 'क्षमा वीरों का आभूषण है। भाइयों के बीच की कड़वाहट को भूलकर गले मिलो।'
  },
  {
    number: '16',
    title: 'कन्या विवाह में सादगी (Simple Marriages)',
    devanagari: 'विवाह में कर्ज मत काढ़ो, दहेज और दिखावे रो त्याग करो।',
    meaning: 'विवाह को पवित्र संस्कार समझो। भारी कर्ज और फिजूलखर्ची से बचकर सादगीपूर्ण जीवन जियो।'
  },
  {
    number: '17',
    title: 'वृद्धजनों की सेवा (Care for Elders)',
    devanagari: 'माता-पिता और बूढा-बुजुर्ग री सेवा करो, ईंसूं ही स्वर्ग मिले छ।',
    meaning: 'माता-पिता और बुजुर्गों का आशीर्वाद ही जीवन की सबसे बड़ी पूंजी है। कभी उनका दिल मत दुखाओ।'
  },
  {
    number: '18',
    title: 'सदाचारी संगति (Good Company)',
    devanagari: 'कुसंगी सूं दूर रहो, सज्जन और साधु पुरुषों री संगत करो।',
    meaning: 'जैसी संगति होगी, वैसी ही मति बनेगी। दुष्टों की सोहबत छोड़कर सत्संगी बनो।'
  },
  {
    number: '19',
    title: 'ईश्वर स्मरण एवं नाम जप (Devotion)',
    devanagari: 'प्रात:काल उठके जगदम्बा मेरमा यादी ने नमन करो, नाम सिमरन करो।',
    meaning: 'दिन की शुरुआत परमशक्ति के ध्यान से करो। आंतरिक शांति के लिए नित्य स्मरण आवश्यक है।'
  },
  {
    number: '20',
    title: 'रोग निवारण एवं स्वच्छता (Hygiene & Health)',
    devanagari: 'शरीर और तांडा ने स्वच्छ रखो, रोग सूं बचो।',
    meaning: 'स्वच्छता में ईश्वर का वास होता है। अपने घर, आंगन, वस्त्र और जल को सदैव पवित्र और निर्मल रखो।'
  },
  {
    number: '21',
    title: 'व्यापार में धर्म व न्याय (Ethical Trade)',
    devanagari: 'नाप-तौल में बेईमानी मत करो, न्याय री कमाई फले छ।',
    meaning: 'कारवां और व्यापार में कभी किसी के साथ कपट मत करो। ईमानदारी की कमाई पीढ़ियों को तारती है।'
  },
  {
    number: '22',
    title: 'समस्त मानव एकता (Universal Brotherhood)',
    devanagari: 'सब मानव एक ईश्वर री संतान छ, जात-पात रो भेद छोड़ो।',
    meaning: 'समस्त सृष्टि में एक ही परमात्मा की ज्योति है। घृणा और संकीर्णता त्याग कर विश्व बंधुत्व की भावना रखो।'
  }
];

export const GOTRA_INFO = [
  {
    name: 'राठौड़ (भूक्या)',
    branches: '27 पाड़ा (शाखाएं)',
    symbol: 'सूर्यवंशी ध्वज',
    desc: 'राठौड़ वंश को भूक्या भी कहा जाता है। इसमें 27 मुख्य उप-गोत्र हैं जैसे: रामवत, मूणवत, देपावत, मेघवत, धरमसोत आदि।',
    color: 'from-amber-500/20 to-orange-500/10'
  },
  {
    name: 'पंवार',
    branches: '12 पाड़ा (शाखाएं)',
    symbol: 'अग्निवंशी ध्वज',
    desc: 'पंवार गोत्र में 12 उप-शाखाएं आती हैं जैसे: झरपला, आमोत, वंकलोत, विसरोत, चोरोत आदि।',
    color: 'from-red-500/20 to-rose-500/10'
  },
  {
    name: 'चौहान',
    branches: '6 पाड़ा (शाखाएं)',
    symbol: 'चंद्रवंशी ध्वज',
    desc: 'चौहान गोत्र में 6 मुख्य शाखाएं हैं जैसे: कोरा, मुड़, सावत, पालत्या आदि।',
    color: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    name: 'जाधव (वड़तिया)',
    branches: '52 पाड़ा (शाखाएं)',
    symbol: 'यदुवंशी ध्वज',
    desc: 'जाधव वंश को वड़तिया कहा जाता है जिसमें 52 शाखाएं हैं जैसे: बदावत, गुगललोत, माललोत, केलोत आदि।',
    color: 'from-emerald-500/20 to-teal-500/10'
  }
];

export const BANJARA_QUIZ = [
  {
    question: 'संत सेवालाल महाराज का जन्म कब हुआ था?',
    options: ['15 फरवरी 1739', '26 जनवरी 1857', '2 अक्टूबर 1869', '15 अगस्त 1947'],
    correctIndex: 0,
    explanation: 'संत सेवालाल महाराज का जन्म 15 फरवरी 1739 को शिवगढ़ (कर्नाटक) में रामजी नायक एवं धर्मिणी माता के घर हुआ था।'
  },
  {
    question: 'बंजारा समाज का सबसे पावन तीर्थ स्थल (बंजारा काशी) किसे कहा जाता है?',
    options: ['पोहरादेवी (वाशिम, महाराष्ट्र)', 'हरिद्वार', 'काशी (वाराणसी)', 'पुष्कर'],
    correctIndex: 0,
    explanation: 'पोहरादेवी (वाशिम, महाराष्ट्र) संत सेवालाल महाराज और माता जगदम्बा मेरमा यादी का मुख्य समाधि व शक्तिपीठ धाम है।'
  },
  {
    question: 'किस महान बंजारा व्यक्तित्व ने गुरु तेग बहादुर जी के पावन शरीर का अंतिम संस्कार किया था?',
    options: ['बाबा लखीशाह बंजारा', 'राजा भोज', 'मानसिंह नायक', 'वीर हम्मीर'],
    correctIndex: 0,
    explanation: 'बाबा लखीशाह बंजारा ने 1675 में चांदनी चौक से गुरु तेग बहादुर जी के पवित्र शरीर को लाकर अपने निवास (रकाबगंज) में अंतिम संस्कार किया।'
  },
  {
    question: 'बंजारा समाज की कन्याओं का गेहूं के ज्वारे सींचने वाला 9 दिवसीय पावन पर्व कौन सा है?',
    options: ['तीज (Teej)', 'दशहरा', 'दीपावली', 'मकर संक्रांति'],
    correctIndex: 0,
    explanation: 'तीज बंजारा समाज का अत्यंत पवित्र पर्व है जिसमें कुंवारी कन्याएं बांस की टोकरियों में ज्वारे उगाती हैं और लेंगी गीतों पर नृत्य करती हैं।'
  },
  {
    question: 'विश्व प्रसिद्ध लंबानी हस्तकला (कशीदाकारी) में मुख्य रूप से किसका प्रयोग होता है?',
    options: ['कांच (Mirrors) एवं कौड़ियां (Cowries)', 'प्लास्टिक मोती', 'कांच की चूड़ियां', 'कागज के फूल'],
    correctIndex: 0,
    explanation: 'लंबानी कसीदाकारी अपने वास्तविक कांच के काम, कौड़ियों, सिक्कों और 14 विशेष हस्तनिर्मित टांकों के लिए जीआई टैग प्राप्त है।'
  }
];
