"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Timeline() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const timelineEvents = [
    {
      year: "2023",
      quarter: "Q1",
      key: 'q1_2023',
    },
    {
      year: "2023",
      quarter: "Q2",
      key: 'q2_2023',
    },
    {
      year: "2023",
      quarter: "Q3",
      key: 'q3_2023',
    },
    {
      year: "2023",
      quarter: "Q4",
      key: 'q4_2023',
    },
    {
      year: "2024",
      quarter: "Q1",
      key: 'q1_2024',
    },
    {
      year: "2024",
      quarter: "Q2",
      key: 'q2_2024',
    },
    {
      year: "2024",
      quarter: "Q3",
      key: 'q3_2024',
    },
    {
      year: "2024",
      quarter: "Q4",
      key: 'q4_2024',
    },
    {
      year: "2025",
      quarter: "Q1",
      key: 'q1_2025',
    },
    {
      year: "2025",
      quarter: "Q2",
      key: 'q2_2025',
    },
  ];
  const groupedByYear = timelineEvents.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {} as Record<string, typeof timelineEvents>);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
            {t.timeline.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.timeline.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />

          <div className="space-y-12">
            {Object.entries(groupedByYear).map(([year, events], yearIndex) => (
              <div key={year}>
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{year}</h3>
                  <div className="h-1 w-20 bg-slate-900"></div>
                </motion.div>

                <div className="space-y-8">
                  {events.map((event, eventIndex) => (
                    <motion.div
                      key={`${year}-${eventIndex}`}
                      className="relative pl-20 md:pl-24"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (yearIndex * 0.1) + (eventIndex * 0.05) }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-2 w-4 h-4 bg-slate-900 rounded-full border-4 border-white hidden md:block" />

                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              {event.quarter}
                            </span>
                            <h4 className="text-lg font-semibold text-slate-900 mt-1">
                              {t.timeline.events[event.key].title}
                            </h4>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
                              {t.timeline.events[event.key].milestone}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {t.timeline.events[event.key].description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



