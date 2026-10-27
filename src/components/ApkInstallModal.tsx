import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  CheckCircle2,
  Copy,
  Terminal,
  ExternalLink,
  X,
  Sparkles,
  ShieldCheck,
  Check,
  FileCode2,
  Package
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

interface ApkInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS?: boolean;
  onPromptInstall: () => Promise<boolean>;
}

export const ApkInstallModal: React.FC<ApkInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  onPromptInstall,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTwaCmd, setCopiedTwaCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'apkGuide'>('quick');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-kvgng7w42wkrvuwdwod33x-454190299902.asia-northeast1.run.app';
  const sharedUrl = 'https://ais-pre-kvgng7w42wkrvuwdwod33x-454190299902.asia-northeast1.run.app';
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(sharedUrl)}`;

  const handleCopyLink = () => {
    soundEngine.playChime(659.25);
    navigator.clipboard.writeText(sharedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyTwa = () => {
    soundEngine.playChime(659.25);
    const twaScript = `npm i -g @bubblewrap/cli\nbubblewrap init --manifest="${sharedUrl}/manifest.json"\nbubblewrap build`;
    navigator.clipboard.writeText(twaScript);
    setCopiedTwaCmd(true);
    setTimeout(() => setCopiedTwaCmd(false), 2500);
  };

  const handleDownloadTwaManifest = () => {
    soundEngine.playChime(523.25);
    window.open('/twa-manifest.json', '_blank');
  };

  const handleInstallClick = async () => {
    soundEngine.playDholBeat();
    if (isInstallable) {
      await onPromptInstall();
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fffdf9] w-full max-w-lg rounded-3xl shadow-2xl border border-amber-300/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Ornate Header Bar */}
        <div className="bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 p-4 text-white relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20">
              <img
                src="/banjara-app-icon.png"
                alt="Banjara App"
                className="w-10 h-10 rounded-xl object-contain bg-amber-50"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Rozha_One',serif] text-lg sm:text-xl font-bold tracking-wide">
                  app-release-signed.apk
                </h3>
                <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Android APK
                </span>
              </div>
              <p className="text-amber-100 text-xs font-medium">
                बंजारा ॲप (Banjara App) · पैकेज व डाउनलोड केंद्र
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playChime(440);
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-amber-50 border-b border-amber-200/70 text-xs font-bold text-stone-700">
          <button
            onClick={() => {
              soundEngine.playChime(523.25);
              setActiveTab('quick');
            }}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'quick'
                ? 'bg-white text-amber-950 shadow-xs border border-amber-300 font-extrabold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-600" />
            <span>1-क्लिक APK इंस्टॉलेशन</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playChime(523.25);
              setActiveTab('apkGuide');
            }}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'apkGuide'
                ? 'bg-white text-amber-950 shadow-xs border border-amber-300 font-extrabold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4 text-amber-600" />
            <span>APK पैकेज व बिल्ड (.apk)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeTab === 'quick' && (
            <>
              {/* Primary WebAPK Direct Action */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/40 border border-amber-300/80 text-center">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-700 mb-2">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-stone-900 text-base sm:text-lg mb-1">
                  {isInstalled
                    ? 'बंजारा ॲप आपके फोन में सफलतापूर्वक इंस्टॉल है!'
                    : 'सीधे अपने Android फोन में APK इंस्टॉल करें'}
                </h4>
                <p className="text-stone-600 text-xs mb-4 max-w-sm mx-auto">
                  Android OS और Chrome ऑटोमैटिकली इस ॲप का <strong>ऑफिशियल WebAPK</strong> तैयार करके आपके फ़ोन की होम स्क्रीन पर जोड़ देता है।
                </p>

                {isInstalled ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>इंस्टॉलेशन सफल (Installed on this device)</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 max-w-sm mx-auto">
                    <button
                      onClick={handleInstallClick}
                      className="w-full px-6 py-3 bg-gradient-to-r from-red-600 via-amber-600 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isInstallable ? '📱 अभी ॲप इंस्टॉल करें (Install APK)' : '📋 लिंक कॉपी करके Chrome में खोलें'}</span>
                    </button>

                    <a
                      href={pwaBuilderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2.5 bg-white hover:bg-stone-50 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Package className="w-4 h-4 text-amber-700" />
                      <span>⚡ PWABuilder से 1-क्लिक में APK जनरेट करें</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                )}
              </div>

              {/* 3 Step Instruction for Chrome / Android */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Android फोन में 3 आसान स्टेप्स:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-700">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center mb-1 text-[11px]">
                      1
                    </div>
                    <div className="font-semibold text-stone-900">Chrome में खोलें</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      यह लिंक अपने Android फ़ोन के Chrome में खोलें।
                    </div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center mb-1 text-[11px]">
                      2
                    </div>
                    <div className="font-semibold text-stone-900">3 डॉट्स (⋮) दबाएं</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      ऊपर दाईं तरफ 3 डॉट्स दबाकर <strong>&apos;Install App&apos;</strong> चुनें।
                    </div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center mb-1 text-[11px]">
                      3
                    </div>
                    <div className="font-semibold text-stone-900">APK तैयार!</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Android स्वतः ही WebAPK बनाकर होम स्क्रीन पर आइकॉन दे देगा।
                    </div>
                  </div>
                </div>
              </div>

              {/* iOS Safari Guide (if on iPhone/iPad or as a helpful note) */}
              {isIOS && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-950 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sky-900">
                    <span>🍎 iPhone / iPad (iOS Safari) में इंस्टॉल करें:</span>
                  </div>
                  <p className="text-[11px] text-sky-800">
                    1. Safari ब्राउज़र में नीचे दिए गए <strong>Share (📤)</strong> बटन पर टैप करें।<br />
                    2. नीचे स्क्रॉल करके <strong>&quot;Add to Home Screen&quot; (+ होम स्क्रीन में जोड़ें)</strong> चुनें।
                  </p>
                </div>
              )}

              {/* Quick Share Link */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
                <div className="truncate text-xs font-mono text-stone-600">
                  {sharedUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'कॉपी हो गया' : 'लिंक कॉपी करें'}</span>
                </button>
              </div>
            </>
          )}

          {activeTab === 'apkGuide' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                <div className="font-bold flex items-center gap-1.5 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>app-release-signed.apk पैकेज जानकारी</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  इस बंजारा ॲप में Google का आधिकारिक <strong>Web App Manifest</strong> और <strong>TWA (Trusted Web Activity)</strong> कॉन्फ़िगरेशन तैयार है। इसे आप <strong>PWABuilder</strong> या <strong>Bubblewrap CLI</strong> से सीधे 100% साइन्ड <code>app-release-signed.apk</code> और <code>.aab</code> में कंपाइल कर सकते हैं।
                </p>
              </div>

              {/* Online 1-Click Builder */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-emerald-950 text-xs">क्लाउड से डायरेक्ट APK डाउनलोड:</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Microsoft & Google PWABuilder पर 1-क्लिक में APK जनरेट करें
                  </div>
                </div>
                <a
                  href={pwaBuilderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>बिल्ड करें</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* CLI Command */}
              <div className="p-3 bg-stone-900 text-stone-200 rounded-xl font-mono text-[11px] space-y-1.5">
                <div className="text-amber-400 font-bold flex items-center justify-between">
                  <span>लोकल सिस्टम में APK कंपाइल करने के कमांड:</span>
                  <button
                    onClick={handleCopyTwa}
                    className="text-[10px] bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    {copiedTwaCmd ? '✓ Copied' : 'Copy Commands'}
                  </button>
                </div>
                <p className="text-stone-400"># 1. Bubblewrap CLI इंस्टॉल करें</p>
                <p className="text-emerald-400">npm install -g @bubblewrap/cli</p>
                <p className="text-stone-400 mt-2"># 2. बंजारा ॲप मैनिफेस्ट से प्रोजेक्ट बनाएं</p>
                <p className="text-emerald-400">bubblewrap init --manifest=&quot;{sharedUrl}/manifest.json&quot;</p>
                <p className="text-stone-400 mt-2"># 3. APK फाइल कंपाइल करें</p>
                <p className="text-emerald-400">bubblewrap build</p>
              </div>

              {/* Metadata & Config download */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-[11px]">
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>पैकेज विवरण (Package Metadata):</span>
                  <button
                    onClick={handleDownloadTwaManifest}
                    className="text-[10px] text-amber-700 hover:text-amber-900 font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileCode2 className="w-3 h-3" />
                    <span>twa-manifest.json देखें</span>
                  </button>
                </div>
                <div className="flex justify-between border-b border-stone-200 py-1">
                  <span className="text-stone-500">App Name:</span>
                  <span className="font-semibold text-stone-900">Banjara App (बंजारा ॲप)</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 py-1">
                  <span className="text-stone-500">Package ID:</span>
                  <span className="font-semibold text-stone-900 font-mono">org.banjara.app</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 py-1">
                  <span className="text-stone-500">Target File:</span>
                  <span className="font-semibold text-emerald-700 font-mono">app-release-signed.apk</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Version:</span>
                  <span className="font-semibold text-stone-800">1.0.0 (Code 1)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1 font-medium text-stone-600">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            जय सेवालाल महाराज
          </span>
          <button
            onClick={() => {
              soundEngine.playChime(440);
              onClose();
            }}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-lg transition-colors cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
