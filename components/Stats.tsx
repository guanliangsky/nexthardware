"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 text-slate-900 tabular-nums">
      {isInView ? `${count.toLocaleString()}${suffix}` : `0${suffix}`}
    </div>
  );
}

export default function Stats() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
  const stats = [
    { label: t.stats.members, value: 1200, suffix: "+", icon: "👥" },
    { label: t.stats.events, value: 85, suffix: "+", icon: "📅" },
    { label: t.stats.projects, value: 450, suffix: "+", icon: "🚀" },
    { label: t.stats.companies, value: 180, suffix: "+", icon: "🏢" },
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
              <div className="text-3xl mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                {stat.icon}
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={index * 0.1} />
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

