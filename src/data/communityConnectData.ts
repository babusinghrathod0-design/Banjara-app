export interface CommunityMember {
  id: string;
  name: string;
  tanda: string;
  district: string;
  state: string;
  gotra: string;
  pada?: string;
  profession: string;
  avatarEmoji: string;
  isOnline: boolean;
  isConnected: boolean;
  whatsappNumber: string;
  bio: string;
  connectionsCount: number;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
}

export const INITIAL_MEMBERS: CommunityMember[] = [
  {
    id: 'm1',
    name: 'संतोष जाधव (नायक)',
    tanda: 'पोहरादेवी तांडा',
    district: 'वाशिम (मनोरा)',
    state: 'महाराष्ट्र',
    gotra: 'जादव',
    pada: 'धरमसोत',
    profession: 'तांडा नायक / समाज संघटक',
    avatarEmoji: '🚩',
    isOnline: true,
    isConnected: true,
    whatsappNumber: '+91 98230 11223',
    bio: 'पोहरादेवी तीर्थ क्षेत्र सेवा व बंजारा तांडों के युवाओं को उच्च शिक्षा व रोजगार से जोड़ने में प्रयासरत।',
    connectionsCount: 1420
  },
  {
    id: 'm2',
    name: 'डॉ. रमेश राठौड़',
    tanda: 'केसली तांडा',
    district: 'निज़ामाबाद / हैदराबाद',
    state: 'तेलंगाना',
    gotra: 'राठौड़ (भूक्या)',
    pada: 'मेगावत',
    profession: 'प्रोफ़ेसर एवं गोरबोली शोधकर्ता',
    avatarEmoji: '📚',
    isOnline: true,
    isConnected: false,
    whatsappNumber: '+91 94401 55667',
    bio: 'लंबाडी (गोरबोली) लिपि एवं बंजारा लोकगीतों पर 15 वर्षों से शोध। देश भर के युवाओं का मार्गदर्शन।',
    connectionsCount: 980
  },
  {
    id: 'm3',
    name: 'सुनीता चौहान (पंवार)',
    tanda: 'सूर तांडा',
    district: 'कलबुर्गी (गुलबर्गा)',
    state: 'कर्नाटक',
    gotra: 'चौहान',
    pada: 'कोरावत',
    profession: 'बंजारा कशीदाकारी एवं महिला स्वयंसहायता प्रमुख',
    avatarEmoji: '🪡',
    isOnline: false,
    isConnected: true,
    whatsappNumber: '+91 97412 88990',
    bio: 'पारंपरिक बंजारा कशीदाकारी व कौड़ी कला को वैश्विक स्तर पर पहचान दिलाने का मिशन। 300+ बहनों को रोजगार।',
    connectionsCount: 760
  },
  {
    id: 'm4',
    name: 'विजय सिंह पंवार',
    tanda: 'घाट तांडा',
    district: 'नांदेड',
    state: 'महाराष्ट्र',
    gotra: 'पंवार',
    pada: 'विस्लावत',
    profession: 'सॉफ्टवेयर इंजीनियर / टेक मार्गदर्शक',
    avatarEmoji: '💻',
    isOnline: true,
    isConnected: false,
    whatsappNumber: '+91 99221 44332',
    bio: 'पुणे में कार्यरत। बंजारा समाज के छात्रों के लिए मुफ्त आईटी कोचिंग व मार्गदर्शन सत्र आयोजित करता हूँ।',
    connectionsCount: 1150
  },
  {
    id: 'm5',
    name: 'राजेंद्र सिंह बंजारा',
    tanda: 'रूपाहेली तांडा',
    district: 'भीलवाड़ा / अजमेर',
    state: 'राजस्थान',
    gotra: 'राठौड़ (भूक्या)',
    pada: 'रामवत',
    profession: 'लक्खी बंजारा इतिहास ट्रस्टी',
    avatarEmoji: '🏛️',
    isOnline: true,
    isConnected: true,
    whatsappNumber: '+91 94140 77889',
    bio: 'बाबा लक्खी शाह वंजारा एवं संत सेवालाल महाराज के ऐतिहासिक धरोहरों के संरक्षण का कार्य।',
    connectionsCount: 1890
  },
  {
    id: 'm6',
    name: 'अंजू बंजारा (वकील)',
    tanda: 'रोहिणी तांडा',
    district: 'नई दिल्ली',
    state: 'दिल्ली',
    gotra: 'जादव',
    pada: 'मुड़ावत',
    profession: 'अधिवक्ता, दिल्ली उच्च न्यायालय',
    avatarEmoji: '⚖️',
    isOnline: false,
    isConnected: false,
    whatsappNumber: '+91 98110 33445',
    bio: 'बंजारा समुदाय के संवैधानिक अधिकारों एवं युवाओं के कानूनी सहायता हेतु समर्पित।',
    connectionsCount: 640
  },
  {
    id: 'm7',
    name: 'कैलाश नायक',
    tanda: 'इंदापुर तांडा',
    district: 'खरगोन / इंदौर',
    state: 'मध्य प्रदेश',
    gotra: 'चौहान',
    pada: 'पालावात',
    profession: 'जैविक कृषक एवं बीज बैंक संचालक',
    avatarEmoji: '🌾',
    isOnline: true,
    isConnected: false,
    whatsappNumber: '+91 98930 22114',
    bio: 'पारंपरिक कृषि पद्धति एवं तांडा स्तरीय किसान क्लब का संचालन।',
    connectionsCount: 520
  },
  {
    id: 'm8',
    name: 'प्रकाश राठौड़',
    tanda: 'विजयवाड़ा तांडा',
    district: 'गुंटूर / विजयवाड़ा',
    state: 'आंध्र प्रदेश',
    gotra: 'राठौड़ (भूक्या)',
    pada: 'धरमसोत',
    profession: 'सिविल सेवा प्रतियोगी परीक्षा ट्रेनर',
    avatarEmoji: '🎯',
    isOnline: true,
    isConnected: true,
    whatsappNumber: '+91 98480 66778',
    bio: 'UPSC / APPSC / TSPSC की तैयारी कर रहे गोरमाटी युवाओं को निःशुल्क स्टडी मैटेरियल व मार्गदर्शन।',
    connectionsCount: 1340
  }
];

export const INITIAL_DIRECT_MESSAGES: Record<string, DirectMessage[]> = {
  m1: [
    {
      id: 'dm-1-1',
      senderId: 'm1',
      text: 'राम राम भाई! पोहरादेवी दर्शन के लिए जब भी पधारें, अवश्य सूचित करें। व्यवस्था करा दी जाएगी।',
      time: '10:15 AM',
      isMe: false
    },
    {
      id: 'dm-1-2',
      senderId: 'me',
      text: 'जय सेवालाल नायक साहेब! आगामी सेवालाल जयंती पर हम सपरिवार पोहरादेवी आ रहे हैं।',
      time: '10:20 AM',
      isMe: true
    },
    {
      id: 'dm-1-3',
      senderId: 'm1',
      text: 'बहुत सुंदर! सेवालाल महाराज सब पर कृपा बनाए रखें। जय सेवालाल!',
      time: '10:22 AM',
      isMe: false
    }
  ],
  m2: [
    {
      id: 'dm-2-1',
      senderId: 'm2',
      text: 'जय सेवालाल! लंबाडी भाषा शब्दकोश और लोकगीतों के डिजिटल संग्रह पर नया शोध पत्र तैयार हुआ है।',
      time: 'कल',
      isMe: false
    }
  ],
  m3: [
    {
      id: 'dm-3-1',
      senderId: 'm3',
      text: 'नमस्ते! हमारे कलबुर्गी तांडे की कशीदाकारी प्रदर्शनी इस माह आयोजित हो रही है।',
      time: '2 दिन पहले',
      isMe: false
    }
  ]
};
