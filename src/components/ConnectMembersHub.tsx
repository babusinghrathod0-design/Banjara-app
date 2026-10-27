import React, { useState } from 'react';
import {
  Users,
  Search,
  MessageCircle,
  UserPlus,
  UserCheck,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Send,
  X,
  Share2,
  CheckCircle2,
  Edit3,
  BadgeCheck,
  IdCard
} from 'lucide-react';
import {
  CommunityMember,
  DirectMessage,
  INITIAL_MEMBERS,
  INITIAL_DIRECT_MESSAGES
} from '../data/communityConnectData';
import { soundEngine } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';

export const ConnectMembersHub: React.FC = () => {
  const { t } = useLanguage();
  const [members, setMembers] = useState<CommunityMember[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGotra, setSelectedGotra] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  // Direct 1-on-1 Chat Modal State
  const [activeChatMember, setActiveChatMember] = useState<CommunityMember | null>(null);
  const [directMessages, setDirectMessages] = useState<Record<string, DirectMessage[]>>(
    INITIAL_DIRECT_MESSAGES
  );
  const [directInput, setDirectInput] = useState('');

  // My Digital Samaj ID / Profile State
  const [myProfile, setMyProfile] = useState<CommunityMember>({
    id: 'my-profile',
    name: 'बाबू सिंह राठौड़',
    tanda: 'मेरा आदर्श तांडा',
    district: 'वाशिम / पुणे',
    state: 'महाराष्ट्र',
    gotra: 'राठौड़ (भूक्या)',
    pada: 'रामवत',
    profession: 'समाज बंधु / प्रशासक',
    avatarEmoji: '🌟',
    isOnline: true,
    isConnected: true,
    whatsappNumber: '+91 98000 00000',
    bio: 'अखिल भारतीय बंजारा समाज एकता एवं संत सेवालाल महाराज के विचारों का अनुयायी।',
    connectionsCount: 850
  });
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...myProfile });
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Toggle Connect / Follow
  const handleToggleConnect = (memberId: string) => {
    soundEngine.playDholBeat();
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextConnected = !m.isConnected;
          return {
            ...m,
            isConnected: nextConnected,
            connectionsCount: nextConnected ? m.connectionsCount + 1 : m.connectionsCount - 1
          };
        }
        return m;
      })
    );
  };

  // Open 1-on-1 Direct Chat
  const handleOpenDirectChat = (member: CommunityMember) => {
    soundEngine.playChime(587.33);
    setActiveChatMember(member);
    if (!directMessages[member.id]) {
      // Initialize with welcome greeting
      setDirectMessages((prev) => ({
        ...prev,
        [member.id]: [
          {
            id: `init-${Date.now()}`,
            senderId: member.id,
            text: `जय सेवालाल भाया! मैं ${member.name} (${member.tanda}, ${member.state})। आपसे जुड़कर अत्यंत प्रसन्नता हुई।`,
            time: 'अभी',
            isMe: false
          }
        ]
      }));
    }
  };

  // Send Direct Message
  const handleSendDirectMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!activeChatMember || !directInput.trim()) return;

    soundEngine.playDholBeat();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const memberId = activeChatMember.id;
    const userText = directInput.trim();

    const newMsg: DirectMessage = {
      id: `dm-${Date.now()}`,
      senderId: 'me',
      text: userText,
      time: timeStr,
      isMe: true
    };

    setDirectMessages((prev) => ({
      ...prev,
      [memberId]: [...(prev[memberId] || []), newMsg]
    }));
    setDirectInput('');

    // Realistic auto-reply from that specific member
    setTimeout(() => {
      soundEngine.playChime(783.99);
      const responses = [
        `जय सेवालाल भाया! आपकी बात पढ़कर बहुत अच्छा लगा। हम सब मिलकर तांडा के विकास के लिए कार्य करेंगे। 🙏`,
        `राम-राम! संत सेवाभाया के आशीर्वाद से हमारा बंजारा समाज दिन-प्रतिदिन प्रगति कर रहा है।`,
        `बहुत खूब भाया! जब भी आप हमारे ${activeChatMember.state} या ${activeChatMember.tanda} पधारें, अवश्य मिलें।`,
        `सत्य वचन! गौरमाटी एकता ही हमारी सबसे बड़ी ताकत है। 🚩`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const replyMsg: DirectMessage = {
        id: `reply-${Date.now()}`,
        senderId: memberId,
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };

      setDirectMessages((prev) => ({
        ...prev,
        [memberId]: [...(prev[memberId] || []), replyMsg]
      }));
    }, 1200);
  };

  // Save My Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playDholBeat();
    setMyProfile({ ...profileForm });
    setIsEditProfileOpen(false);
  };

  // Share App with Tanda brothers
  const handleShareApp = () => {
    soundEngine.playChime();
    const shareText = `🚩 जय सेवालाल! पूरे देश के 12 करोड़ बंजारा (गौरमाटी) बंधुओं को आपस में सीधे जोड़ने वाले "Banjara App" पर अपनी डिजिटल समाज आईडी बनाएं और मुझसे कनेक्ट करें: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: 'Banjara App - बंजारा समाज महामंच',
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareText);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2500);
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tanda.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(m.pada && m.pada.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGotra = selectedGotra === 'all' || m.gotra.includes(selectedGotra);
    const matchesState = selectedState === 'all' || m.state === selectedState;

    return matchesSearch && matchesGotra && matchesState;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner: All Members Connect */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-red-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-700/50 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>अखिल भारतीय गौर बंधु संगम · डायरेक्ट कनेक्शन</span>
          </div>
          <h1 className="font-['Rozha_One',serif] text-2xl sm:text-4xl font-bold text-amber-100 mb-2 leading-tight">
            देश भर के बंजारा बंधुओं से सीधे जुड़ें
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-5">
            महाराष्ट्र, तेलंगाना, कर्नाटक, आंध्र, राजस्थान, मध्य प्रदेश और उत्तर भारत के लाखों गौर बंधुओं को खोजें, 1-to-1 चैट करें, व्हाट्सऐप पर कनेक्ट हों और अपनी डिजिटल समाज आईडी बनाएं।
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playChime();
                setIsEditProfileOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <IdCard className="w-4 h-4" />
              <span>मेरी डिजिटल समाज आईडी बनाएं / बदलें</span>
            </button>

            <button
              onClick={handleShareApp}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              {copiedInvite ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">लिंक कॉपी हुआ!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-300" />
                  <span>व्हाट्सएप पर बंधुओं को आमंत्रित करें</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* My Digital Samaj Card */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-2xl border-2 border-amber-300 p-5 shadow-xs relative overflow-hidden">
        {/* Official Banjara App Watermark */}
        <div className="absolute top-2 right-3 hidden sm:flex items-center gap-1.5 opacity-80 bg-white/70 px-2 py-0.5 rounded-md border border-amber-200">
          <img src="/banjara-app-icon.png" alt="Banjara App" className="w-4 h-4 rounded-xs object-contain" />
          <span className="text-[10px] font-bold text-amber-900 tracking-wider">BANJARA APP DIGITAL ID</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-sm border-2 border-white">
              {myProfile.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {myProfile.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                  सत्यापित गौर बंधु
                </span>
              </div>
              <p className="text-xs text-amber-900 font-medium">
                गोत्र: <strong>{myProfile.gotra} ({myProfile.pada})</strong> · {myProfile.profession}
              </p>
              <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-600" />
                <span>{myProfile.tanda}, {myProfile.district} ({myProfile.state})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => {
                soundEngine.playChime();
                setIsEditProfileOpen(true);
              }}
              className="px-3.5 py-1.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>प्रोफ़ाइल बदलें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नाम, तांडा, जिला, गोत्र (राठौड़, पंवार, चौहान, जाधव) या पेशा खोजें..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Gotra Filter */}
          <div className="flex items-center gap-1 text-xs overflow-x-auto">
            <span className="text-stone-500 font-medium shrink-0">गोत्र:</span>
            {[
              { id: 'all', label: 'सभी गोत्र' },
              { id: 'राठौड़', label: 'राठौड़ (27 पाड़ा)' },
              { id: 'पंवार', label: 'पंवार (12 पाड़ा)' },
              { id: 'चौहान', label: 'चौहान (6 पाड़ा)' },
              { id: 'जाधव', label: 'जाधव (52 पाड़ा)' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  soundEngine.playChime();
                  setSelectedGotra(g.id);
                }}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedGotra === g.id
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* State Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1">
          <span className="text-stone-500 font-medium shrink-0">राज्य:</span>
          {[
            { id: 'all', label: 'पूरा देश (All India)' },
            { id: 'महाराष्ट्र', label: 'महाराष्ट्र' },
            { id: 'तेलंगाना', label: 'तेलंगाना' },
            { id: 'कर्नाटक', label: 'कर्नाटक' },
            { id: 'आंध्र प्रदेश', label: 'आंध्र प्रदेश' },
            { id: 'राजस्थान', label: 'राजस्थान' },
            { id: 'मध्य प्रदेश', label: 'मध्य प्रदेश' },
            { id: 'दिल्ली', label: 'दिल्ली/उत्तर भारत' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => {
                soundEngine.playChime();
                setSelectedState(st.id);
              }}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedState === st.id
                  ? 'bg-stone-900 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Members Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Member Top Bar */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 text-2xl flex items-center justify-center shadow-xs shrink-0 relative">
                    {member.avatarEmoji}
                    {member.isOnline && (
                      <span
                        className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"
                        title="ऑनलाइन सक्रिय"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-950 flex items-center gap-1.5">
                      <span>{member.name}</span>
                    </h4>
                    <p className="text-[11px] text-amber-800 font-semibold">
                      {member.gotra} · {member.pada}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{member.tanda}, {member.district} ({member.state})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profession & Bio */}
              <div className="mt-3 space-y-1.5 text-xs">
                <span className="inline-block bg-stone-100 text-stone-800 font-medium px-2 py-0.5 rounded text-[11px]">
                  💼 {member.profession}
                </span>
                <p className="text-stone-600 line-clamp-2 leading-relaxed text-[11px]">
                  "{member.bio}"
                </p>
              </div>
            </div>

            {/* Bottom Actions: Connect, Direct Chat, WhatsApp */}
            <div className="pt-3 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                <span>🤝 {member.connectionsCount} गौर बंधु जुड़े हैं</span>
                {member.isOnline ? (
                  <span className="text-emerald-700 font-medium">● ऑनलाइन</span>
                ) : (
                  <span className="text-stone-400">पूर्व सक्रिय</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Connect Toggle Button */}
                <button
                  onClick={() => handleToggleConnect(member.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    member.isConnected
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'
                  }`}
                >
                  {member.isConnected ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>जुड़े हैं ✓</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                      <span>कनेक्ट करें</span>
                    </>
                  )}
                </button>

                {/* Direct 1-on-1 Chat Button */}
                <button
                  onClick={() => handleOpenDirectChat(member)}
                  className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-amber-800" />
                  <span>सीधा संदेश</span>
                </button>
              </div>

              {/* WhatsApp direct chat link */}
              {member.whatsappNumber && (
                <a
                  href={`https://wa.me/${member.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('जय सेवालाल भाया! Banjara App से आपसे संपर्क कर रहा हूँ।')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>व्हाट्सएप पर बात करें</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 1-on-1 Direct Chat Modal Window */}
      {activeChatMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full h-[580px] shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Direct Chat Header */}
            <div className="p-4 bg-gradient-to-r from-amber-900 to-red-950 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-xl shadow-inner font-bold">
                  {activeChatMember.avatarEmoji}
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5">
                    {activeChatMember.name}
                    {activeChatMember.isOnline && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                  </h4>
                  <p className="text-[11px] text-amber-200">
                    {activeChatMember.gotra} · {activeChatMember.tanda} ({activeChatMember.state})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveChatMember(null)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Direct Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              {(directMessages[activeChatMember.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-xs text-xs sm:text-sm ${
                      msg.isMe
                        ? 'bg-amber-600 text-white rounded-tr-none'
                        : 'bg-white text-stone-800 rounded-tl-none border border-stone-200'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 text-right ${
                        msg.isMe ? 'text-amber-100' : 'text-stone-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Greeting Shortcuts */}
            <div className="px-3 py-1.5 bg-stone-50 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-stone-400 font-medium shrink-0">त्वरित बोल:</span>
              {[
                '🚩 जय सेवालाल भाया!',
                '🙏 राम-राम, केन छस तूं?',
                '🌾 हमारे तांडा में पधारें',
                '🤝 मिलकर समाज सेवा करेंगे'
              ].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    setDirectInput(phrase);
                  }}
                  className="px-2 py-0.5 bg-white border border-stone-200 rounded text-stone-700 hover:text-amber-900 whitespace-nowrap cursor-pointer"
                >
                  {phrase}
                </button>
              ))}
            </div>

            {/* Direct Message Input */}
            <form onSubmit={handleSendDirectMessage} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
              <input
                type="text"
                value={directInput}
                onChange={(e) => setDirectInput(e.target.value)}
                placeholder={`जय सेवालाल! ${activeChatMember.name.split(' ')[0]} को संदेश लिखें...`}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-100 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
              <button
                type="submit"
                disabled={!directInput.trim()}
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit My Profile / Samaj ID Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-['Rozha_One',serif] text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>🪪 मेरी डिजिटल गौरमाटी पहचान पत्र (Samaj ID)</span>
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  पूरा नाम *
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    गोत्र (Gotra) *
                  </label>
                  <select
                    value={profileForm.gotra}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        gotra: e.target.value as CommunityMember['gotra']
                      })
                    }
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="राठौड़ (भूक्या)">राठौड़ (भूक्या - 27 पाड़ा)</option>
                    <option value="पंवार">पंवार (12 पाड़ा)</option>
                    <option value="चौहान">चौहान (6 पाड़ा)</option>
                    <option value="जाधव (वड़तिया)">जाधव (वड़तिया - 52 पाड़ा)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    पाड़ा / उपशाखा *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.pada}
                    onChange={(e) => setProfileForm({ ...profileForm, pada: e.target.value })}
                    placeholder="उदा: रामवत, झरपला, बदावत..."
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    मूल तांडा (Tanda) *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.tanda}
                    onChange={(e) => setProfileForm({ ...profileForm, tanda: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    राज्य (State) *
                  </label>
                  <select
                    value={profileForm.state}
                    onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="महाराष्ट्र">महाराष्ट्र</option>
                    <option value="तेलंगाना">तेलंगाना</option>
                    <option value="कर्नाटक">कर्नाटक</option>
                    <option value="आंध्र प्रदेश">आंध्र प्रदेश</option>
                    <option value="राजस्थान">राजस्थान</option>
                    <option value="मध्य प्रदेश">मध्य प्रदेश</option>
                    <option value="गुजरात">गुजरात</option>
                    <option value="दिल्ली">दिल्ली / उत्तर भारत</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    व्यवसाय / पेशा
                  </label>
                  <input
                    type="text"
                    value={profileForm.profession}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, profession: e.target.value })
                    }
                    placeholder="उदा: इंजीनियर, शिक्षक, किसान..."
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    व्हाट्सएप नंबर
                  </label>
                  <input
                    type="text"
                    value={profileForm.whatsappNumber || ''}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, whatsappNumber: e.target.value })
                    }
                    placeholder="+91..."
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  समाज संदेश / बायो (Bio)
                </label>
                <textarea
                  rows={2}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  placeholder="अपने विचार लिखें..."
                  className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  आईडी सुरक्षित करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
