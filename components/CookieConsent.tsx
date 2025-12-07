"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay - REQUIRES EXPLICIT USER CONSENT (CCPA/GDPR compliant)
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      essential: true,
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      essential: true, // Essential cookies are always on
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowSettings(true);
  };

  const handleSavePreferences = (preferences: {
    essential: boolean;
    analytics: boolean;
    functional: boolean;
  }) => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...preferences,
      essential: true, // Always true
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Cookie Banner */}
          {!showSettings && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 pointer-events-auto"
            >
              <div className="container mx-auto max-w-4xl">
                <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-6 md:p-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-slate-900">
                        Cookie Preferences
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        We use cookies to enhance your experience. Currently, we do not use cookies, but if we implement them in the future, you can manage your preferences here.
                      </p>
                      <p className="text-xs text-slate-500">
                        Learn more in our{" "}
                        <Link href="/cookies" className="text-slate-700 hover:text-slate-900 underline font-medium">
                          Cookie Policy
                        </Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="text-slate-700 hover:text-slate-900 underline font-medium">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={handleCustomize}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        Customize
                      </button>
                      <button
                        onClick={handleRejectAll}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={handleAcceptAll}
                        className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-md hover:from-slate-700 hover:to-slate-600 transition-all shadow-lg text-sm font-medium whitespace-nowrap"
                      >
                        Accept All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cookie Settings Modal */}
          {showSettings && (
            <CookieSettingsModal
              onSave={handleSavePreferences}
              onClose={() => setShowSettings(false)}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function CookieSettingsModal({
  onSave,
  onClose,
}: {
  onSave: (prefs: { essential: boolean; analytics: boolean; functional: boolean }) => void;
  onClose: () => void;
}) {
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    functional: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-transparent">Cookie Preferences</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 mb-6">
          {/* Essential Cookies */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1">Essential Cookies</h3>
                <p className="text-sm text-slate-600">
                  These cookies are necessary for the website to function and cannot be disabled.
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={preferences.essential}
                  disabled
                  className="w-5 h-5 rounded border-slate-300 bg-white text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1">Analytics Cookies</h3>
                <p className="text-sm text-slate-600 mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <p className="text-xs text-slate-500">
                  Currently not in use. Will be enabled if we implement analytics cookies in the future.
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-slate-300 bg-white text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Functional Cookies */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1">Functional Cookies</h3>
                <p className="text-sm text-slate-600 mb-2">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                </p>
                <p className="text-xs text-slate-500">
                  Currently not in use. Will be enabled if we implement functional cookies in the future.
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) =>
                    setPreferences({ ...preferences, functional: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-slate-300 bg-white text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(preferences)}
            className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-md hover:from-slate-700 hover:to-slate-600 transition-all shadow-lg text-sm font-medium"
          >
            Save Preferences
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

