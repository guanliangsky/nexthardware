"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-slate-200" : "bg-transparent"
      }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
          <Logo size="lg" showText={false} />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              About
            </a>
            <a href="/blog" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Blog
            </a>
            <a href="/resources" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Resources
            </a>
            <a href="#events" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Events
            </a>
            <a href="#showcase" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Community
            </a>
            <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Contact
            </a>
            <a href="#join" className="px-4 py-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium">
              Join
            </a>
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
                  href="/about"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  About
                </a>
                <a
                  href="/blog"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  Blog
                </a>
                <a
                  href="/resources"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  Resources
                </a>
                <a
                  href="#events"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  Events
                </a>
                <a
                  href="#showcase"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  Community
                </a>
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-2"
                >
                  Contact
                </a>
                <a
                  href="#join"
                  onClick={handleLinkClick}
                  className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium text-center"
                >
                  Join
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

