import React, { useState } from 'react';
import { Download, WifiOff, Share } from 'lucide-react';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWA';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-2 rounded-full border border-[#9B111E]/30 bg-white px-4 py-2 text-xs font-semibold text-[#9B111E] hover:bg-[#9B111E]/5 dark:border-[#E0115F]/40 dark:bg-[#1B1B1F] dark:text-[#FF6B93] whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
      >
        <Download className="h-4 w-4" />
        Install Offline App
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-[#1B1B1F] dark:text-neutral-200 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
        >
          <Share className="h-3.5 w-3.5 text-[#9B111E]" />
          Install on iPhone
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
            <div className="w-full max-w-sm rounded-[20px] bg-white p-6 shadow-xl dark:bg-[#1B1B1F]">
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                Save GramFin Offline on iPhone
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                1. Tap the <strong>Share</strong> icon at the bottom of Safari.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong> for offline 1930 access.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-full bg-[#9B111E] py-2.5 text-sm font-semibold text-white cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-16 left-4 z-40 flex items-center gap-2 rounded-full bg-[#9B111E] px-4 py-2 text-xs font-semibold text-white shadow-lg md:bottom-4"
    >
      <WifiOff className="h-4 w-4" />
      <span>Offline Mode — Cached 1930 &amp; Guides Active</span>
    </div>
  );
};
