"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function ThreePillars() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
  const pillars = [
    {
      title: t.threePillars.spatialComputing.title,
      description: t.threePillars.spatialComputing.description,
      details: t.threePillars.spatialComputing.details,
      icon: "🥽",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1,
      tech: ["AR/VR", "Vision Pro", "Spatial Tracking", "Optics"],
    },
    {
      title: t.threePillars.embodiedAI.title,
      description: t.threePillars.embodiedAI.description,
      details: t.threePillars.embodiedAI.details,
      icon: "🤖",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2,
      tech: ["Robotics", "Sensor Fusion", "Edge AI", "Autonomous Systems"],
    },
    {
      title: t.threePillars.edgeHardware.title,
      description: t.threePillars.edgeHardware.description,
      details: t.threePillars.edgeHardware.details,
      icon: "⚡",
      gradient: "from-cyan-500 to-blue-500",
      delay: 0.3,
      tech: ["Custom Silicon", "IoT", "Embedded Systems", "Manufacturing"],
    },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-12 text-slate-900"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t.threePillars.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: pillar.delay }}
            >
              <div className="border-t border-slate-200 pt-8 group-hover:border-slate-300 transition-colors p-6">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{pillar.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 font-medium">
                  {pillar.description}
                </p>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {pillar.details}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {pillar.tech.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium hover:bg-slate-100 hover:border-slate-300 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

