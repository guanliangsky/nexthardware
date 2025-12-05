"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function CommunityHighlights() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
  const highlights = [
    {
      title: t.communityHighlights.siliconValley.title,
      description: t.communityHighlights.siliconValley.description,
    },
    {
      title: t.communityHighlights.activeCommunity.title,
      description: t.communityHighlights.activeCommunity.description,
    },
    {
      title: t.communityHighlights.projectSharing.title,
      description: t.communityHighlights.projectSharing.description,
    },
    {
      title: t.communityHighlights.globalNetwork.title,
      description: t.communityHighlights.globalNetwork.description,
    },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold text-center mb-3 text-slate-900"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t.communityHighlights.title}
        </motion.h2>
        
        <motion.p
          className="text-center text-slate-600 mb-12 max-w-2xl mx-auto text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {t.communityHighlights.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="bg-white p-8 border-b border-slate-200 group hover:border-slate-300 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-3 text-slate-900">
                {highlight.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

