"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare } from "lucide-react";

export function DownloadBadges() {
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAndroidInstall = async () => {
    if (deferredPrompt && "prompt" in deferredPrompt) {
      (deferredPrompt as { prompt: () => void }).prompt();
      setDeferredPrompt(null);
    } else {
      // Fallback: open in Chrome if not already there
      setShowIOSModal(true);
    }
  };

  if (installed) return null;

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Apple badge */}
        <button
          onClick={() => setShowIOSModal(true)}
          className="group flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:bg-neutral-800 transition-colors min-w-[200px]"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current flex-shrink-0">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-tight opacity-80">Download on the</div>
            <div className="text-lg font-semibold leading-tight -mt-0.5">App Store</div>
          </div>
        </button>

        {/* Google Play badge */}
        <button
          onClick={handleAndroidInstall}
          className="group flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:bg-neutral-800 transition-colors min-w-[200px]"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current flex-shrink-0">
            <path d="M3.18 23.48C2.85 23.26 2.65 22.87 2.65 22.35V1.65C2.65 1.12 2.86 0.73 3.2 0.51L13.54 11.99L3.18 23.48ZM14.66 13.12L4.5 24L18.7 15.03L14.66 13.12ZM21.48 10.64C22.03 10.99 22.35 11.46 22.35 12C22.35 12.54 22.03 13.01 21.48 13.36L19.5 14.5L15.18 12L19.5 9.5L21.48 10.64ZM4.5 0L14.66 10.88L18.7 8.97L4.5 0Z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-tight opacity-80">GET IT ON</div>
            <div className="text-lg font-semibold leading-tight -mt-0.5">Google Play</div>
          </div>
        </button>
      </div>

      {/* iOS install instructions modal */}
      {showIOSModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative animate-fade-in-up">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 text-uphold-neutral-400 hover:text-uphold-neutral-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-uphold-neutral-800 mb-2">
              Install Upheld
            </h3>
            <p className="text-sm text-uphold-neutral-600 mb-6">
              Add Upheld to your home screen for the full app experience.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-uphold-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-uphold-green-500">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-uphold-neutral-800">
                    Tap the Share button
                  </p>
                  <p className="text-xs text-uphold-neutral-500 flex items-center gap-1 mt-0.5">
                    The <Share className="w-3 h-3 inline" /> icon at the bottom of Safari
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-uphold-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-uphold-green-500">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-uphold-neutral-800">
                    Tap &quot;Add to Home Screen&quot;
                  </p>
                  <p className="text-xs text-uphold-neutral-500 flex items-center gap-1 mt-0.5">
                    The <PlusSquare className="w-3 h-3 inline" /> option in the share menu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-uphold-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-uphold-green-500">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-uphold-neutral-800">
                    Tap &quot;Add&quot;
                  </p>
                  <p className="text-xs text-uphold-neutral-500 mt-0.5">
                    Upheld will appear on your home screen like any other app
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full mt-6 bg-uphold-green-500 text-white font-semibold py-3 rounded-xl hover:bg-uphold-green-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
