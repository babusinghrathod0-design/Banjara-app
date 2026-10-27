import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Globe,
  ChevronDown,
  Check,
  Newspaper,
  MessageSquare,
  Users,
  Film,
  PlayCircle,
  MapPin,
  BookOpen,
  Smartphone
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';
import { useLanguage, Language } from '../context/LanguageContext';

export type NavTab = 'feed' | 'chat' | 'connect' | 'reels' | 'videos' | 'panIndia' | 'dharohar';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isAudioDroneOn: boolean;
  setIsAudioDroneOn: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenApkModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isAudioDroneOn,
  setIsAudioDroneOn,
  onOpenApkModal,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleAudio = () => {
    soundEngine.playChime(659.25);
    const newState = soundEngine.toggleDevotionalDrone((playing) => {
      setIsAudioDroneOn(playing);
    });
    setIsAudioDroneOn(newState);
  };

  const languagesList: { id: Language; label: string; sub: string }[] = [
    { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { id: 'gor', label: 'गोरमाटी', sub: 'Lambadi' },
    { id: 'mr', label: 'मराठी', sub: 'Marathi' },
    { id: 'te', label: 'తెలుగు', sub: 'Telugu' },
    { id: 'kn', label: 'ಕನ್ನಡ', sub: 'Kannada' },
    { id: 'en', label: 'English', sub: 'EN' },
  ];

  const currentLangObj = languagesList.find((l) => l.id === language) || languagesList[0];

  const handleSelectLanguage = (lang: Language) => {
    soundEngine.playChime(523.25);
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fffdfa]/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs before:content-[''] before:block before:h-1 before:w-full before:bg-gradient-to-r before:from-red-600 before:via-amber-500 before:to-yellow-400">
      {/* Main Header Inner Container (Matches CSS selector 2: header > div:nth-of-type(1)) */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-17 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand wordmark with Banjara App Icon (Matches CSS selector 1: div:nth-of-type(1) > button:nth-of-type(1)) */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => {
              soundEngine.playChime(523.25);
              onTabChange('feed');
            }}
            className="group text-left cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2.5 sm:gap-3 transition-transform active:scale-98"
            title="मुख्य चौपाल (Home)"
          >
            <div className="relative">
              <img
                src="/banjara-app-icon.png"
                alt="Banjara App Icon"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover shadow-xs border border-amber-300/80 bg-[#fdfaf3] p-0.5 group-hover:scale-105 group-hover:border-amber-400 group-hover:shadow-sm transition-all duration-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-white"></span>
              </span>
            </div>
            <div className="flex flex-col text-left justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-['Rozha_One',serif] text-xl sm:text-2xl font-bold tracking-tight text-amber-950 group-hover:text-red-700 transition-colors leading-none">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border border-amber-300/80 uppercase">
                  अखिल भारत
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-700 mt-0.5">
                बंजारा ॲप · तांडा महामंच
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {[
            { id: 'feed' as NavTab, label: t.navFeed, icon: Newspaper },
            { id: 'chat' as NavTab, label: t.navChat, icon: MessageSquare },
            { id: 'connect' as NavTab, label: t.navConnect, icon: Users, badge: true },
            { id: 'reels' as NavTab, label: t.navReels, icon: Film },
            { id: 'videos' as NavTab, label: t.navVideos, icon: PlayCircle },
            { id: 'panIndia' as NavTab, label: t.navPanIndia, icon: MapPin },
            { id: 'dharohar' as NavTab, label: t.navDharohar, icon: BookOpen },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playChime();
                  onTabChange(item.id);
                }}
                className={`px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-semibold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-100/90 text-amber-950 border border-amber-300/80 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-800' : 'text-stone-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions zone (Language, Tanpura, Jai Sevalal) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Pan-India Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundEngine.playChime();
                setIsLangMenuOpen(!isLangMenuOpen);
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-stone-50 hover:bg-white text-stone-800 text-xs font-bold rounded-xl border border-stone-200/90 shadow-2xs hover:border-amber-300 transition-all cursor-pointer"
              title="भाषा चुनें (Select Language)"
            >
              <Globe className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{currentLangObj.label}</span>
              <ChevronDown
                className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
                  isLangMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/80 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold text-amber-900 bg-amber-50/70 uppercase tracking-wider border-b border-amber-100 flex items-center justify-between">
                  <span>अखिल भारतीय भाषाएं</span>
                  <span className="text-[9px] text-amber-600 font-semibold">6 भाषाएं</span>
                </div>
                {languagesList.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleSelectLanguage(lang.id)}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-amber-50/80 transition-colors cursor-pointer ${
                      language === lang.id
                        ? 'bg-amber-50 font-bold text-amber-950'
                        : 'text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{lang.label}</div>
                      <div className="text-[10px] text-stone-400">{lang.sub}</div>
                    </div>
                    {language === lang.id && (
                      <Check className="w-3.5 h-3.5 text-amber-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Devotional Tanpura Drone */}
          <button
            onClick={toggleAudio}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              isAudioDroneOn
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs ring-2 ring-red-400/50'
                : 'bg-amber-50/80 hover:bg-amber-100 text-amber-900 border border-amber-200/80'
            }`}
            title="भक्ति तानपुरा धुन ऑन/ऑफ"
          >
            {isAudioDroneOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline font-bold">{t.tanpuraActive}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">{t.tanpuraInactive}</span>
              </>
            )}
          </button>

          {/* APK / App Install Button */}
          {onOpenApkModal && (
            <button
              onClick={() => {
                soundEngine.playDholBeat();
                onOpenApkModal();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xs border border-emerald-500/80 transition-all cursor-pointer active:scale-95 shrink-0"
              title="Android APK / ॲप इंस्टॉल करें"
            >
              <Smartphone className="w-3.5 h-3.5 animate-bounce" />
              <span className="inline font-bold">APK / ॲप</span>
            </button>
          )}

          {/* Jai Sevalal CTA */}
          <button
            onClick={() => {
              soundEngine.playDholBeat();
              onTabChange('dharohar');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 rounded-xl shadow-xs border border-amber-400 transition-all cursor-pointer active:scale-95"
            title="संत सेवालाल महाराज दर्शन व 22 वचन"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-900" />
            <span>{t.jaiSevalal}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
