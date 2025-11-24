"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Join() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
  return (
    <section id="join" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-slate-900">
            {t.join.title}
          </h2>
          <p className="text-base text-slate-600 mb-10 max-w-xl mx-auto">
            {t.join.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/d5dTjjVD"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
            >
              {t.join.joinDiscord}
            </a>
            <a
              href="#newsletter"
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
            >
              {t.join.joinEmailGroup}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

