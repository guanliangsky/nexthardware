"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Volunteering() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const volunteerRoles = [
    {
      title: t.volunteering.positions.eventOrganizer.title,
      department: t.volunteering.positions.eventOrganizer.department,
      location: t.volunteering.positions.eventOrganizer.location,
      type: t.volunteering.positions.eventOrganizer.type,
    },
    {
      title: t.volunteering.positions.communityManager.title,
      department: t.volunteering.positions.communityManager.department,
      location: t.volunteering.positions.communityManager.location,
      type: t.volunteering.positions.communityManager.type,
    },
    {
      title: t.volunteering.positions.contentCreator.title,
      department: t.volunteering.positions.contentCreator.department,
      location: t.volunteering.positions.contentCreator.location,
      type: t.volunteering.positions.contentCreator.type,
    },
  ];

  return (
    <section id="volunteering" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-slate-900 text-white rounded-full mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.volunteering.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900">
            {t.volunteering.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.volunteering.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {volunteerRoles.map((role, index) => (
            <motion.div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                {role.title}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{role.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{role.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{role.type}</span>
                </div>
              </div>
              <a
                href={`mailto:${t.volunteering.applyEmail}?subject=${encodeURIComponent(t.volunteering.applySubject)} ${role.title}`}
                className="inline-block w-full text-center px-4 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
              >
                {t.volunteering.applyNow}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-600 mb-4">
            {t.volunteering.noMatch}
          </p>
          <a
            href={`mailto:${t.volunteering.applyEmail}?subject=${encodeURIComponent(t.volunteering.generalInquiry)}`}
            className="inline-block px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
          >
            {t.volunteering.sendResume}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

