import React, { useState } from 'react';
import {
  Send,
  Mic,
  Smile,
  Users,
  Search,
  Volume2,
  CheckCheck,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ChatGroup, ChatMessage, INITIAL_GROUPS } from '../data/banjaraData';
import { soundEngine } from '../utils/audioSynth';

export const ChatView: React.FC = () => {
  const [groups, setGroups] = useState<ChatGroup[]>(INITIAL_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('group-pohradevi');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState<boolean>(false);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    soundEngine.playDholBeat();

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'आप (User)',
      senderAvatar: '🌟',
      text,
      time: timeStr,
      isMe: true,
    };

    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === selectedGroupId) {
          return {
            ...g,
            lastMessageTime: timeStr,
            messages: [...g.messages, newMsg],
          };
        }
        return g;
      })
    );

    setInputMessage('');

    // Simulate authentic community auto-reply after 1.2s
    setTimeout(() => {
      const autoReplies = [
        'जय सेवालाल भाया! आपकी बात से तांडा के सभी बंधु पूर्णतः सहमत हैं। 🙏',
        'राम-राम! संत सेवाभाया के 22 उपदेशों को जीवन में उतारना ही हमारा धर्म है।',
        'अति उत्तम विचार! तांडा चौपाल में इस विषय पर अगली पंचायत में चर्चा होगी। 🌾',
        'जय मेरमा यादी! गौरमाटी समाज की एकता ही हमारी सबसे बड़ी शक्ति है। 🚩',
      ];
      const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      soundEngine.playChime(783.99);

      setGroups((prevGroups) =>
        prevGroups.map((g) => {
          if (g.id === selectedGroupId) {
            const replyMsg: ChatMessage = {
              id: `reply-${Date.now()}`,
              sender: 'तांडा सेवक',
              senderRole: 'वरिष्ठ सदस्य',
              senderAvatar: '🚩',
              text: randomReply,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isMe: false,
            };
            return {
              ...g,
              messages: [...g.messages, replyMsg],
            };
          }
          return g;
        })
      );
    }, 1200);
  };

  const handleSendVoiceNote = () => {
    soundEngine.playChime(523.25);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const voiceMsg: ChatMessage = {
      id: `audio-${Date.now()}`,
      sender: 'आप (User)',
      senderAvatar: '🌟',
      text: '🎤 ऑडियो संदेश: "जय सेवालाल! आज हमारे तांडा में सत्संग का आयोजन है।"',
      time: timeStr,
      isMe: true,
      isAudio: true,
      audioDuration: '0:14',
    };

    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === selectedGroupId) {
          return {
            ...g,
            messages: [...g.messages, voiceMsg],
          };
        }
        return g;
      })
    );
  };

  const handlePlayVoice = (msgId: string, text: string) => {
    soundEngine.playChime();
    setPlayingAudioId(msgId);
    soundEngine.speak(text.replace(/🎤.*?:\s*"/, '').replace(/"$/, ''));
    setTimeout(() => setPlayingAudioId(null), 3000);
  };

  const filteredGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header intro */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-['Rozha_One',serif] text-stone-900 flex items-center gap-2">
            <span>तांडा संवाद (GorCharcha)</span>
            <span className="text-xs font-sans font-normal text-stone-500 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              व्हाट्सएप स्टाइल समूह चर्चा
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            देश भर के बंजारा तांडों, पोहरादेवी धाम और युवा संगठनों से लाइव जुड़ें
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px] max-h-[720px]">
        {/* Left List of Groups */}
        <div
          className={`md:col-span-5 lg:col-span-4 border-r border-stone-200 flex flex-col bg-stone-50/70 ${
            isMobileChatOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search Bar */}
          <div className="p-3 border-b border-stone-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="तांडा समूह या विषय खोजें..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          </div>

          {/* Group List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {filteredGroups.map((group) => {
              const isSelected = group.id === selectedGroupId;
              const lastMsg = group.messages[group.messages.length - 1];

              return (
                <button
                  key={group.id}
                  onClick={() => {
                    soundEngine.playChime(523.25);
                    setSelectedGroupId(group.id);
                    setIsMobileChatOpen(true);
                  }}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100/70 border-l-4 border-amber-600'
                      : 'hover:bg-stone-100'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
                    {group.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {group.name}
                      </h4>
                      <span className="text-[10px] text-stone-400 whitespace-nowrap ml-1">
                        {group.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate mb-1">
                      {group.tagline}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-stone-600">
                      <span className="truncate italic">
                        {lastMsg ? lastMsg.text : 'कोई संदेश नहीं'}
                      </span>
                      {group.unreadCount > 0 && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ml-1">
                          {group.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-amber-50/60 border-t border-amber-100 text-[11px] text-amber-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>सदा आदर और मर्यादा के साथ संवाद करें</span>
          </div>
        </div>

        {/* Right Active Chat Window */}
        <div
          className={`md:col-span-7 lg:col-span-8 flex flex-col bg-stone-100/40 ${
            !isMobileChatOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Chat Window Header */}
          <div className="p-3.5 px-4 bg-white border-b border-stone-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileChatOpen(false)}
                className="md:hidden p-1.5 text-stone-600 hover:text-stone-900 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shadow-xs">
                {selectedGroup.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  {selectedGroup.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <Users className="w-3 h-3 text-stone-400" />
                  <span className="font-mono tabular-nums">
                    {selectedGroup.membersCount.toLocaleString('en-IN')} गौर बंधु जुड़े हैं
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEngine.playDholBeat();
                  handleSendMessage('🚩 जय सेवालाल! पोहरादेवी धाम की जय!');
                }}
                className="px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
              >
                जय सेवालाल
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            {selectedGroup.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                {!msg.isMe && (
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-0.5 px-1">
                    <span className="font-bold text-stone-800">{msg.sender}</span>
                    {msg.senderRole && (
                      <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded">
                        {msg.senderRole}
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl shadow-xs text-xs sm:text-sm ${
                    msg.isMe
                      ? 'bg-amber-600 text-white rounded-tr-none'
                      : 'bg-white text-stone-800 rounded-tl-none border border-stone-200'
                  }`}
                >
                  {msg.isAudio ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePlayVoice(msg.id, msg.text)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          msg.isMe
                            ? 'bg-amber-700 text-white hover:bg-amber-800'
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <div className="flex items-center gap-1 font-mono text-xs">
                          <span>{msg.audioDuration || '0:12'}</span>
                          <span>·····|||··|||·····</span>
                        </div>
                        <p className="text-[11px] opacity-90 mt-0.5">{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}

                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      msg.isMe ? 'text-amber-100' : 'text-stone-400'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.isMe && <CheckCheck className="w-3.5 h-3.5 text-amber-200" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Cultural Greeting Shortcuts */}
          <div className="px-4 py-2 bg-stone-50 border-t border-stone-200 overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-max text-xs">
              <span className="text-[11px] text-stone-400 font-medium">त्वरित वाक्य:</span>
              {[
                '🚩 जय सेवालाल',
                '🙏 राम राम भाया',
                '🌺 जय मेरमा यादी',
                '🌾 केन छस भाया?',
                '✨ पोहरादेवी धाम री जय',
              ].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => handleSendMessage(phrase)}
                  className="px-2.5 py-1 bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <button
              onClick={handleSendVoiceNote}
              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors cursor-pointer"
              title="वॉइस संदेश भेजें"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="जय सेवालाल! संदेश लिखें..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-100 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
