"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function MemberSpotlights() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const members = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "VP of Engineering",
      company: "Google",
      image: "/images/profiles/sarah-chen.jpg",
      key: 'sarah',
      joined: "2023",
    },
    {
      id: 2,
      name: "Alex Kim",
      role: "Founder & CEO",
      company: "RoboTech Systems",
      image: "/images/profiles/alex-kim.jpg",
      key: 'alex',
      joined: "2023",
    },
    {
      id: 3,
      name: "Michael Zhang",
      role: "Principal Engineer",
      company: "NVIDIA",
      image: "/images/profiles/michael-zhang.jpg",
      key: 'michael',
      joined: "2023",
    },
    {
      id: 4,
      name: "Dr. Emily Rodriguez",
      role: "Research Director",
      company: "MIT CSAIL",
      image: "/images/profiles/emily-rodriguez.jpg",
      key: 'emily',
      joined: "2024",
    },
    {
      id: 5,
      name: "Jordan Lee",
      role: "Senior Hardware Engineer",
      company: "Apple",
      image: "/images/profiles/jordan-lee.jpg",
      key: 'jordan',
      joined: "2023",
    },
    {
      id: 6,
      name: "Casey Wong",
      role: "Embedded Systems Architect",
      company: "Tesla",
      image: "/images/profiles/casey-wong.jpg",
      key: 'casey',
      joined: "2024",
    },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
            {t.memberSpotlights.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.memberSpotlights.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-500">
                    {member.company}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {t.memberSpotlights.project}
                  </p>
                  <p className="text-sm text-slate-700">
                    {t.memberSpotlights.members[member.key as keyof typeof t.memberSpotlights.members].project}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {t.memberSpotlights.contribution}
                  </p>
                  <p className="text-sm text-slate-700">
                    {t.memberSpotlights.members[member.key as keyof typeof t.memberSpotlights.members].contribution}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    {t.memberSpotlights.memberSince.replace('{year}', member.joined)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

