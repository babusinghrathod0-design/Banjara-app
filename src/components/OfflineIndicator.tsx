import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-amber-600/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg border border-amber-400 animate-in slide-in-from-top-2">
      <WifiOff className="w-3.5 h-3.5 animate-pulse" />
      <span>ऑफलाइन मोड सक्रिय — सहेजा गया डेटा इस्तेमाल हो रहा है (Offline Mode)</span>
    </div>
  );
};
