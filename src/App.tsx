import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FeedView } from './components/FeedView';
import { ChatView } from './components/ChatView';
import { ReelsView } from './components/ReelsView';
import { VideoHubView } from './components/VideoHubView';
import { PanIndiaStateHub } from './components/PanIndiaStateHub';
import { DharoharView } from './components/DharoharView';
import { ConnectMembersHub } from './components/ConnectMembersHub';
import { ApkInstallModal } from './components/ApkInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePwaInstall } from './hooks/usePwaInstall';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Smartphone } from 'lucide-react';
import { soundEngine } from './utils/audioSynth';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('feed');
  const [isAudioDroneOn, setIsAudioDroneOn] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePwaInstall();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-950 pb-20 md:pb-8">
      {/* Offline Status Connectivity Banner */}
      <OfflineIndicator />

      {/* Top Bar Navigation (Strict 3-zone contract with Pan-India 6-Language Switcher) */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isAudioDroneOn={isAudioDroneOn}
        setIsAudioDroneOn={setIsAudioDroneOn}
        onOpenApkModal={() => setIsApkModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'feed' && (
          <FeedView
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenApkModal={() => setIsApkModalOpen(true)}
          />
        )}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'connect' && <ConnectMembersHub />}
        {activeTab === 'reels' && <ReelsView />}
        {activeTab === 'videos' && <VideoHubView />}
        {activeTab === 'panIndia' && <PanIndiaStateHub onNavigateToConnect={() => setActiveTab('connect')} />}
        {activeTab === 'dharohar' && <DharoharView />}
      </main>

      {/* Floating APK Install Pill for Mobile Quick Access */}
      {!isInstalled && (
        <div className="fixed bottom-20 right-4 z-40 sm:hidden">
          <button
            onClick={() => {
              soundEngine.playDholBeat();
              setIsApkModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-600 via-amber-600 to-amber-700 text-white rounded-full shadow-lg border border-amber-300/80 font-bold text-xs animate-bounce cursor-pointer active:scale-95"
            aria-label="Install Banjara APK"
          >
            <Smartphone className="w-4 h-4" />
            <span>APK इंस्टॉल</span>
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation (Ergonomic thumb zone) */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        unreadChatCount={4}
      />

      {/* Quiet, Human Editorial Footer */}
      <footer className="mt-12 border-t border-stone-200 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/banjara-app-icon.png"
              alt="Banjara App"
              className="w-6 h-6 rounded-md object-contain border border-amber-300/80 bg-[#fdf9f2] p-0.5"
            />
            <span className="font-['Rozha_One',serif] text-sm font-bold text-amber-950">
              {t.appName}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.tagline}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playChime(659.25);
                setIsApkModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-200 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span>📱 Android APK / ॲप डाउनलोड</span>
            </button>
            <div className="text-center sm:text-right">
              <p className="text-stone-600 font-medium">
                {t.footerMotto}
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {t.footerRights}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* APK & Mobile Installation Modal */}
      <ApkInstallModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        onPromptInstall={promptInstall}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
