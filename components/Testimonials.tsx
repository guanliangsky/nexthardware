/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Testimonials() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const testimonials = [
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
      name: "Michael Zhang",
      role: "Principal Engineer",
      company: "NVIDIA",
      image: "/images/profiles/michael-zhang.jpg",
      key: 'michael',
      joined: "2023",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Research Director",
      company: "MIT CSAIL",
      image: "/images/profiles/emily-rodriguez.jpg",
      key: 'emily',
      joined: "2024",
    },
    {
      id: 4,
      name: "Alex Kim",
      role: "Founder & CEO",
      company: "RoboTech Systems",
      image: "/images/profiles/alex-kim.jpg",
      key: 'alex',
      joined: "2023",
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
      name: "Taylor Park",
      role: "Robotics Engineer",
      company: "Boston Dynamics",
      image: "/images/profiles/taylor-park.jpg",
      key: 'taylor',
      joined: "2023",
    },
    {
      id: 7,
      name: "Casey Wong",
      role: "Embedded Systems Architect",
      company: "Tesla",
      image: "/images/profiles/casey-wong.jpg",
      key: 'casey',
      joined: "2024",
    },
    {
      id: 8,
      name: "Dr. Priya Patel",
      role: "AI Hardware Researcher",
      company: "Stanford",
      image: "/images/profiles/priya-patel.jpg",
      key: 'priya',
      joined: "2023",
    },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-200">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                &quot;{t.testimonials.testimonials[testimonial.key as keyof typeof t.testimonials.testimonials].quote}&quot;
              </p>
              <p className="text-xs text-slate-500">
                {t.testimonials.memberSince.replace('{year}', testimonial.joined)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

