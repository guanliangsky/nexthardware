"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";
import { supabase } from "@/lib/supabaseClient";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function Navbar() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsLoggedIn(true);
          // Get user name from community_members table
          const { data: memberData } = await supabase
            .from("community_members")
            .select("name")
            .eq("email", session.user.email?.toLowerCase() || "")
            .limit(1)
            .single();
          if (memberData) {
            setUserName(memberData.name);
          } else {
            setUserName(session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User");
          }
        } else {
          setIsLoggedIn(false);
          setUserName(null);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUserName(null);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (session) {
        setIsLoggedIn(true);
        checkAuth();
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserName(null);
    router.push("/");
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700" : "bg-transparent"
      }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Logo size="lg" showText={false} variant={scrolled ? "default" : "inverted"} />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
            <a href="#events" className={`text-sm ${scrolled ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" : "text-white hover:text-white"} transition-colors`}>
              {t.nav.events}
            </a>
            <a href="#showcase" className={`text-sm ${scrolled ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" : "text-white hover:text-white"} transition-colors`}>
              {t.nav.community}
            </a>
            <a href="/sponsors" className={`text-sm ${scrolled ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" : "text-white hover:text-white"} transition-colors`}>
              {t.nav.sponsors}
            </a>
            <a href="#contact" className={`text-sm ${scrolled ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" : "text-white hover:text-white"} transition-colors`}>
              {t.nav.contact}
            </a>
            
            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <a
                  href="/membership"
                  className={`text-sm ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-white hover:text-white"} transition-colors`}
                >
                  {userName || t.nav.account}
                </a>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-1.5 text-sm ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-white hover:text-white"} transition-colors`}
                >
                  {t.auth.logout}
                </button>
              </div>
            ) : (
              <a
                href="/auth"
                className={`px-4 py-1.5 ${scrolled ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white/20 text-white hover:bg-white/30"} rounded-md transition-colors text-sm font-medium`}
              >
                {t.nav.joinLogin}
              </a>
            )}
            
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 md:top-24 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                <a
                  href="#events"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  {t.nav.events}
                </a>
                <a
                  href="#showcase"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  {t.nav.community}
                </a>
                <a
                  href="/sponsors"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  {t.nav.sponsors}
                </a>
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  {t.nav.contact}
                </a>
                
                {/* Mobile Auth Buttons */}
                {isLoggedIn ? (
                  <>
                    <a
                      href="/membership"
                      onClick={handleLinkClick}
                      className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors text-center border border-slate-200 rounded-md"
                    >
                      {userName || t.nav.account}
                    </a>
                    <button
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                      className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors text-center"
                    >
                      {t.auth.logout}
                    </button>
                  </>
                ) : (
                  <a
                    href="/auth"
                    onClick={handleLinkClick}
                    className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium text-center"
                  >
                    {t.nav.joinLogin}
                  </a>
                )}
                
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
