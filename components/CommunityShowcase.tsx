"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function CommunityShowcase() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const showcaseItems = [
    {
      id: 1,
      key: 'robotics',
      category: "projects",
      image: "/images/community/edge-ai-robotics-controller.jpg",
      year: "2024",
    },
    {
      id: 2,
      key: 'arGlasses',
      category: "projects",
      image: "/images/community/ar-glasses-prototype.jpg",
      year: "2024",
    },
    {
      id: 3,
      key: 'hackathon',
      category: "events",
      image: "/images/community/hackathon-2024.jpg",
      year: "2024",
    },
    {
      id: 4,
      key: 'workshop',
      category: "learning",
      image: "/images/community/silicon-workshop.jpg",
      year: "2024",
    },
  ];
  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-10 text-slate-900"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t.communityShowcase.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border border-slate-200 group-hover:border-slate-300 transition-colors rounded-lg">
                  <Image
                    src={item.image}
                    alt={t.communityShowcase.items[item.key].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">
                    {t.communityShowcase.categories[item.category]}
                  </div>
                  {item.year && (
                    <div className="text-xs text-slate-400">
                      {item.year}
                    </div>
                  )}
                </div>
                <h3 className="text-base font-bold mb-2 text-slate-900 group-hover:text-slate-700 transition-colors">
                  {t.communityShowcase.items[item.key].title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.communityShowcase.items[item.key].description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
