"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

const socialLinks = [
  { name: "Twitter/X", url: "https://x.com/nexthardware", label: "X" },
  { name: "GitHub", url: "https://github.com/nexthardware", label: "GitHub" },
  { name: "YouTube", url: "https://youtube.com/@nexthardware", label: "YouTube" },
  { name: "Luma", url: "https://luma.com/NextHardware", label: "Luma" },
  { name: "Discord", url: "https://discord.gg/d5dTjjVD", label: "Discord" },
];

export default function Footer() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
  return (
    <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Logo size="sm" showText={false} />
            <p className="text-xs text-slate-600">
              {t.footer.copyright}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {t.footer.tagline}
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label={link.name}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-3 text-xs justify-center">
                <a href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.nav.about}
                </a>
                <span className="text-slate-400">•</span>
                <a href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.nav.blog}
                </a>
                <span className="text-slate-400">•</span>
                <a href="/resources" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.nav.resources}
                </a>
                <span className="text-slate-400">•</span>
                <a href="/getting-started" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.nav.gettingStarted}
                </a>
                <span className="text-slate-400">•</span>
                <a href="/faq" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.nav.faq}
                </a>
                <span className="text-slate-400">•</span>
                <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.nav.contact}
                </a>
                <span className="text-slate-400">•</span>
                <a href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.common.privacy}
                </a>
                <span className="text-slate-400">•</span>
                <a href="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.common.terms}
                </a>
                <span className="text-slate-400">•</span>
                <a href="/cookies" className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.common.cookies}
                </a>
              </div>
              <div className="flex flex-col items-center gap-1">
                <a
                  href="/privacy#ccpa"
                  className="text-xs text-slate-500 hover:text-slate-700 transition-colors underline"
                >
                  {t.footer.doNotSell}
                </a>
                <p className="text-xs text-slate-500 text-center md:text-left">
                  {t.footer.noSell}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

