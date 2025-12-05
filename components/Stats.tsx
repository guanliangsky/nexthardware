"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Stats() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
  const stats = [
    { label: t.stats.members, value: "500+", suffix: "" },
    { label: t.stats.events, value: "50+", suffix: "" },
    { label: t.stats.projects, value: "200+", suffix: "" },
    { label: t.stats.companies, value: "100+", suffix: "" },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-8 border-b border-slate-200 hover:border-slate-300 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 text-slate-900 tabular-nums">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

