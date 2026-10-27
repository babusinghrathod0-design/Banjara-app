import React from "react";
import { Newspaper, MessageCircle, Users, MapPin, Film, BookOpen } from "lucide-react";
import { NavTab } from "./Header";
import { soundEngine } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";

interface MobileBottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadChatCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadChatCount,
}) => {
  const { t } = useLanguage();

  const tabs = [
    { id: "feed" as NavTab, label: t.tabFeed, icon: Newspaper },
    { id: "chat" as NavTab, label: t.tabChat, icon: MessageCircle, badge: unreadChatCount },
    { id: "connect" as NavTab, label: t.tabConnect, icon: Users, isHighlight: true },
    { id: "panIndia" as NavTab, label: t.tabPanIndia, icon: MapPin },
    { id: "reels" as NavTab, label: t.tabReels, icon: Film },
    { id: "dharohar" as NavTab, label: t.tabDharohar, icon: BookOpen },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-amber-200/80 shadow-lg pb-safe">
      <div className="grid grid-cols-6 items-center h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playChime();
                onTabChange(tab.id);
              }}
              className={`flex flex-col items-center justify-center h-full relative transition-colors ${
                isActive ? "text-red-700" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <div className="relative">
                <Icon className={`w-4.5 h-4.5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[9px] font-bold px-1 py-0.1 rounded-full ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
                {tab.isHighlight && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className={`text-[9px] tracking-tight mt-1 truncate max-w-[50px] text-center ${isActive ? "font-bold" : "font-medium"}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-4 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
