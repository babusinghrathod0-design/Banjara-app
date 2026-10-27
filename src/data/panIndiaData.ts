/**
 * Pan-India Banjara (Gormati / Lambadi / Sugali) States, Tandas & National Network Data
 */

export interface StateBanjaraInfo {
  id: string;
  stateNameHindi: string;
  stateNameEnglish: string;
  regionalName: string;
  populationEstimate: string;
  tandasCount: string;
  prominentDistricts: string[];
  keyShrines: string[];
  description: string;
  helplineContact: string;
  color: string;
  badge: string;
}

export interface PanIndiaTanda {
  id: string;
  tandaName: string;
  district: string;
  state: string;
  naikName: string;
  population: string;
  specialty: string;
  contact: string;
}

export interface YouthResource {
  id: string;
  title: string;
  category: 'शिक्षा' | 'प्रतियोगी परीक्षा' | 'छात्रावास' | 'छात्रवृत्ति';
  state: string;
  location: string;
  description: string;
  actionUrlOrPhone: string;
}

export interface MatrimonialProfile {
  id: string;
  name: string;
  age: number;
  gotra: string;
  education: string;
  profession: string;
  city: string;
  state: string;
  verified: boolean;
}

export const PAN_INDIA_STATES: StateBanjaraInfo[] = [
  {
    id: 'maharashtra',
    stateNameHindi: 'महाराष्ट्र',
    stateNameEnglish: 'Maharashtra',
    regionalName: 'गोर बंजारा / लमाण / वंजारी',
    populationEstimate: '1.25 करोड़+',
    tandasCount: '15,000+ तांडे',
    prominentDistricts: ['वाशिम (पोहरादेवी)', 'यवतमाल', 'नांदेड़', 'जालना', 'बीड', 'औरंगाबाद', 'बुलढाणा', 'पुणे'],
    keyShrines: ['पोहरादेवी धाम (बंजारा काशी - संत सेवालाल समाधि पीठ)', 'जगदम्बा मेरमा यादी मंदिर', 'बाबूराव महाराज धाम'],
    description: 'महाराष्ट्र बंजारा समाज की आध्यात्मिक राजधानी है। पोहरादेवी तीर्थ समस्त गौरमाटी समाज का सर्वोच्च श्रद्धा केंद्र है।',
    helplineContact: '1800-202-001 (टोल-फ्री पोहरादेवी)',
    color: 'from-amber-600 to-red-700',
    badge: 'आध्यात्मिक काशी'
  },
  {
    id: 'telangana',
    stateNameHindi: 'तेलंगाना',
    stateNameEnglish: 'Telangana',
    regionalName: 'लंबाडी (Lambada / Banjara)',
    populationEstimate: '38 लाख+',
    tandasCount: '3,200+ ग्राम पंचायत तांडे',
    prominentDistricts: ['महबूबनगर', 'आदिलाबाद', 'वारंगल', 'नलगोंडा', 'खम्मम', 'हैदराबाद', 'रंगारेड्डी'],
    keyShrines: ['संत सेवालाल महाराज गुड़ी (हैदराबाद)', 'कोर्रा तांडा शक्तिपीठ', 'तीज महोत्सव प्रांगण'],
    description: 'तेलंगाना में सभी तांडों को पूर्ण ग्राम पंचायत का संवैधानिक दर्जा प्राप्त है। यहाँ तीज और लेंगी नृत्य का अभूतपूर्व उल्लास रहता है।',
    helplineContact: '040-2345-6789 (हैदराबाद बंजारा भवन)',
    color: 'from-emerald-600 to-teal-800',
    badge: 'पंचायत तांडा मॉडल'
  },
  {
    id: 'karnataka',
    stateNameHindi: 'कर्नाटक',
    stateNameEnglish: 'Karnataka',
    regionalName: 'लंबानी (Lambani / Banjara)',
    populationEstimate: '42 लाख+',
    tandasCount: '4,100+ तांडे',
    prominentDistricts: ['विजयनगर (हम्पी-संदूर)', 'कलबुर्गी (गुलबर्गा)', 'बीदर', 'यादगीर', 'दावणगेरे', 'शिमोगा', 'बेल्लारी'],
    keyShrines: ['शिवगढ़ (संत सेवालाल महाराज जन्मभूमि)', 'सूरगोंडनकोप्पा धाम (होन्नाली)', 'हम्पी लंबानी क्राफ्ट विलेज'],
    description: 'कर्नाटक में संत सेवालाल जी की जन्मस्थली शिवगढ़ है तथा यहाँ की विश्वविख्यात लंबानी कसीदाकारी को भौगोलिक संकेतक (GI Tag) प्राप्त है।',
    helplineContact: '080-2233-4455 (बेंगलुरु बंजारा विकास निगम)',
    color: 'from-rose-600 to-pink-800',
    badge: 'सेवालाल जन्मभूमि'
  },
  {
    id: 'andhra-pradesh',
    stateNameHindi: 'आंध्र प्रदेश',
    stateNameEnglish: 'Andhra Pradesh',
    regionalName: 'सुगाली (Sugali / Lambadi)',
    populationEstimate: '26 लाख+',
    tandasCount: '2,400+ तांडे',
    prominentDistricts: ['अनंतपुर', 'कुरनूल', 'चित्तूर (तिरुपति)', 'गुंटूर', 'कडपा'],
    keyShrines: ['गुट्टी किला बंजारा स्मारक', 'पेनूकोंडा तांडा पीठ', 'तिरुपति सुगाली कल्याण मंडपम'],
    description: 'आंध्र प्रदेश के रायलसीमा क्षेत्र में सुगाली समाज का ऐतिहासिक व्यापारिक और सांस्कृतिक प्रभाव सदियों से विद्यमान है।',
    helplineContact: '0866-245-8899 (अमरावती सेवा केंद्र)',
    color: 'from-blue-600 to-indigo-800',
    badge: 'रायलसीमा सुगाली'
  },
  {
    id: 'rajasthan',
    stateNameHindi: 'राजस्थान',
    stateNameEnglish: 'Rajasthan',
    regionalName: 'बंजारा / गौर / बामनिया',
    populationEstimate: '22 लाख+',
    tandasCount: '1,800+ बस्तियां',
    prominentDistricts: ['चित्तौड़गढ़', 'अजमेर', 'पुष्कर', 'भीलवाड़ा', 'अलवर', 'कोटा', 'उदयपुर'],
    keyShrines: ['चित्तौड़गढ़ बंजारा छतरी', 'पुष्कर गौरमाटी धर्मशाला', 'ख्वाजा मोइनुद्दीन तांडा स्मारक'],
    description: 'राजस्थान बंजारा लादनी कारवां की ऐतिहासिक उद्गम भूमि है, जहां महाराणा प्रताप के समय बंजारा वीरों ने सेना को रसद पहुँचाई थी।',
    helplineContact: '0141-274-1234 (जयपुर बंजारा भवन)',
    color: 'from-orange-600 to-amber-800',
    badge: 'कारवां उद्गम भूमि'
  },
  {
    id: 'madhya-pradesh',
    stateNameHindi: 'मध्य प्रदेश व छत्तीसगढ़',
    stateNameEnglish: 'Madhya Pradesh & CG',
    regionalName: 'बंजारा / नायक',
    populationEstimate: '20 लाख+',
    tandasCount: '1,600+ तांडे',
    prominentDistricts: ['खरगोन (निमाड़)', 'खंडवा', 'बुरहानपुर', 'होशंगाबाद', 'छिंदवाड़ा', 'बिलासपुर'],
    keyShrines: ['मकड़ाई रियासत ऐतिहासिक स्थल', 'नर्मदा तट बंजारा घाट', 'निमाड़ सेवालाल धाम'],
    description: 'मध्य भारत में बंजारा समाज की ऐतिहासिक रियासतें और नर्मदा तट के प्राचीन व्यापारिक पड़ाव स्थित हैं।',
    helplineContact: '0755-255-9988 (भोपाल समन्वय केंद्र)',
    color: 'from-teal-600 to-cyan-800',
    badge: 'नर्मदा घाटी पड़ाव'
  },
  {
    id: 'delhi-north',
    stateNameHindi: 'दिल्ली, हरियाणा व पंजाब',
    stateNameEnglish: 'Delhi, Haryana & Punjab',
    regionalName: 'लखीशाह बंजारा अनुयायी / बाजीगर',
    populationEstimate: '28 लाख+',
    tandasCount: '2,000+ बस्तियां/गांव',
    prominentDistricts: ['नई दिल्ली (रायसीना)', 'करनाल', 'अंबाला', 'कुरुक्षेत्र', 'पटियाला', 'लुधियाना'],
    keyShrines: ['गुरुद्वारा रकाब गंज साहिब (बाबा लखीशाह बंजारा समाधि)', 'लखीशाह बंजारा हॉल (दिल्ली)'],
    description: 'दिल्ली के रायसीना के शासक बाबा लखीशाह बंजारा के त्याग और शहादत की पावन धरा, जहां गुरु तेग बहादुर जी का ससम्मान संस्कार हुआ।',
    helplineContact: '011-2334-5566 (दिल्ली राष्ट्रीय कार्यालय)',
    color: 'from-purple-600 to-violet-900',
    badge: 'बाबा लखीशाह शहादत'
  },
  {
    id: 'gujarat',
    stateNameHindi: 'गुजरात',
    stateNameEnglish: 'Gujarat',
    regionalName: 'बंजारा / लमाणी',
    populationEstimate: '14 लाख+',
    tandasCount: '950+ तांडे',
    prominentDistricts: ['सूरत', 'वडोदरा', 'पंचमहल', 'दाहोद', 'बनासकांठा'],
    keyShrines: ['पावागढ़ तांडा शक्तिपीठ', 'सूरत लमाणी समाज भवन'],
    description: 'व्यापार, बंदरगाह आपूर्ति और वस्त्र हस्तशिल्प में गुजरात के बंजारा बंधुओं का ऐतिहासिक योगदान रहा है।',
    helplineContact: '0261-288-7766 (सूरत सहायता केंद्र)',
    color: 'from-yellow-600 to-amber-700',
    badge: 'व्यापारिक धरोहर'
  }
];

export const PAN_INDIA_TANDAS: PanIndiaTanda[] = [
  {
    id: 't-1',
    tandaName: 'पोहरादेवी मुख्य तांडा',
    district: 'वाशिम',
    state: 'महाराष्ट्र',
    naikName: 'बाबूराव नाईक',
    population: '12,500',
    specialty: 'संत सेवालाल महाराज मुख्य समाधि धाम',
    contact: '+91 98221 00001'
  },
  {
    id: 't-2',
    tandaName: 'शिवगढ़ पावन तांडा',
    district: 'गुट्टी / बेल्लारी सीमा',
    state: 'कर्नाटक',
    naikName: 'रामजी नायक वंशज',
    population: '8,400',
    specialty: 'संत सेवालाल महाराज जन्मभूमि',
    contact: '+91 98450 00002'
  },
  {
    id: 't-3',
    tandaName: 'कोर्रा तांडा',
    district: 'महबूबनगर',
    state: 'तेलंगाना',
    naikName: 'के. लक्ष्मण नाईक (सरपंच)',
    population: '6,200',
    specialty: 'आदर्श ग्राम पंचायत तांडा व भव्य तीज महोत्सव',
    contact: '+91 94401 00003'
  },
  {
    id: 't-4',
    tandaName: 'संदूर लंबानी आर्ट तांडा',
    district: 'विजयनगर',
    state: 'कर्नाटक',
    naikName: 'पार्वतीबाई (शिल्प प्रमुख)',
    population: '5,100',
    specialty: 'जीआई टैग लंबानी मिरर एम्ब्रॉयडरी केंद्र',
    contact: '+91 94802 00004'
  },
  {
    id: 't-5',
    tandaName: 'नेर तांडा',
    district: 'यवतमाल',
    state: 'महाराष्ट्र',
    naikName: 'देवराव राठौड़',
    population: '9,800',
    specialty: 'लेंगी लोककला एवं सांस्कृतिक दल',
    contact: '+91 97633 00005'
  },
  {
    id: 't-6',
    tandaName: 'रायसीना बंजारा हेरिटेज नगर',
    district: 'नई दिल्ली',
    state: 'दिल्ली',
    naikName: 'हरपाल सिंह बंजारा',
    population: '15,000+',
    specialty: 'बाबा लखीशाह बंजारा राष्ट्रीय स्मारक केंद्र',
    contact: '+91 98110 00006'
  }
];

export const PAN_INDIA_YOUTH_RESOURCES: YouthResource[] = [
  {
    id: 'res-1',
    title: 'अखिल भारतीय UPSC/MPSC/TSPSC बंजारा प्रशासनिक कोचिंग सहायता',
    category: 'प्रतियोगी परीक्षा',
    state: 'अखिल भारतीय (दिल्ली/हैदराबाद/पुणे)',
    location: 'नई दिल्ली व हैदराबाद केंद्र',
    description: 'सिविल सेवा और राज्य सेवा की तैयारी कर रहे बंजारा छात्र-छात्राओं को वरिष्ठ समाज अधिकारियों (IAS/IPS/IRS) द्वारा मार्गदर्शन एवं छात्रवृत्ति।',
    actionUrlOrPhone: 'हेल्पलाइन: 1800-889-2026'
  },
  {
    id: 'res-2',
    title: 'संत सेवालाल निःशुल्क समाज छात्रावास (Hostel) नेटवर्क',
    category: 'छात्रावास',
    state: 'महाराष्ट्र, तेलंगाना, कर्नाटक, राजस्थान',
    location: 'पुणे, हैदराबाद, बेंगलुरु, औरंगाबाद, जयपुर',
    description: 'उच्च शिक्षा हेतु शहरों में आने वाले जरूरतमंद तांडा छात्र-छात्राओं के लिए निःशुल्क आवास व भोजन व्यवस्था।',
    actionUrlOrPhone: 'आवेदन लिंक / संपर्क: hostel@gorbstatus.org'
  },
  {
    id: 'res-3',
    title: 'लंबानी महिला कारीगर स्वावलंबन एवं वैश्विक ई-कॉमर्स प्रोजेक्ट',
    category: 'शिक्षा',
    state: 'कर्नाटक, तेलंगाना, आंध्र प्रदेश',
    location: 'हम्पी-संदूर व हैदराबाद',
    description: 'पारंपरिक कशीदाकारी, फेटीया और शिल्पकला को सीधे अंतरराष्ट्रीय बाजारों और ई-कॉमर्स से जोड़कर महिलाओं को आत्मनिर्भर बनाना।',
    actionUrlOrPhone: 'संपर्क: crafts@gormati.org'
  },
  {
    id: 'res-4',
    title: 'डॉ. रूपसिंह बंजारा उच्च शिक्षा शोध छात्रवृत्ति',
    category: 'छात्रवृत्ति',
    state: 'अखिल भारतीय',
    location: 'राष्ट्रीय स्तर',
    description: 'इंजीनियरिंग, मेडिकल, पीएचडी और तकनीकी शिक्षा में अध्ययनरत मेधावी विद्यार्थियों के लिए ₹50,000 वार्षिक सहायता।',
    actionUrlOrPhone: 'हेल्पलाइन: +91 99000 12345'
  }
];

export const PAN_INDIA_MATRIMONIAL_SAMPLE: MatrimonialProfile[] = [
  {
    id: 'mat-1',
    name: 'सतीश राठौड़ (रामवत)',
    age: 27,
    gotra: 'राठौड़ (27 पाड़ा)',
    education: 'B.Tech (Computer Science)',
    profession: 'Software Engineer',
    city: 'पुणे / यवतमाल',
    state: 'महाराष्ट्र',
    verified: true
  },
  {
    id: 'mat-2',
    name: 'डॉ. अंजलि पंवार (झरपला)',
    age: 25,
    gotra: 'पंवार (12 पाड़ा)',
    education: 'MBBS, MD',
    profession: 'डॉक्टर (Physician)',
    city: 'हैदराबाद',
    state: 'तेलंगाना',
    verified: true
  },
  {
    id: 'mat-3',
    name: 'विक्रम जाधव (बदावत)',
    age: 28,
    gotra: 'जाधव (52 पाड़ा)',
    education: 'M.Sc, B.Ed',
    profession: 'राजकीय शिक्षक (Govt Teacher)',
    city: 'कलबुर्गी (गुलबर्गा)',
    state: 'कर्नाटक',
    verified: true
  },
  {
    id: 'mat-4',
    name: 'पूजा चौहान (पालत्या)',
    age: 24,
    gotra: 'चौहान (6 पाड़ा)',
    education: 'MBA (Finance)',
    profession: 'बैंकिंग अधिकारी (Bank Officer)',
    city: 'जयपुर / अजमेर',
    state: 'राजस्थान',
    verified: true
  }
];
