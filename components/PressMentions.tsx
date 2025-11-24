/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function PressMentions() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const pressMentions = [
    {
      id: 1,
      outlet: "TechCrunch",
      key: 'techcrunch',
      link: "#",
    },
    {
      id: 2,
      outlet: "IEEE Spectrum",
      key: 'ieee',
      link: "#",
    },
    {
      id: 3,
      outlet: "The Verge",
      key: 'verge',
      link: "#",
    },
    {
      id: 4,
      outlet: "Wired",
      key: 'wired',
      link: "#",
    },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
            {t.pressMentions.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.pressMentions.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressMentions.map((mention, index) => (
            <motion.a
              key={mention.id}
              href={mention.link}
              className="block bg-slate-50 border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-md transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {mention.outlet}
                </span>
                <span className="text-xs text-slate-400">
                  {t.pressMentions.mentions[mention.key as keyof typeof t.pressMentions.mentions].date}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                {t.pressMentions.mentions[mention.key as keyof typeof t.pressMentions.mentions].title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.pressMentions.mentions[mention.key as keyof typeof t.pressMentions.mentions].excerpt}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

