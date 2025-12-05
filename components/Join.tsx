"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Join() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  return (
    <section id="join" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-3">
              {t.join.limitedTimeFree}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-slate-900">
            {t.join.title}
          </h2>
          <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto">
            {t.join.description}
          </p>
          
          {/* CTA Button to Auth Page */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/auth?tab=register"
              className="inline-block px-8 py-4 bg-slate-900 text-white font-semibold rounded-md hover:bg-slate-800 transition-colors text-base"
            >
              {t.join.joinMembershipButton}
            </Link>
          </motion.div>
          
          <p className="text-sm text-slate-500 mt-6 max-w-md mx-auto">
            {t.join.joinNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

