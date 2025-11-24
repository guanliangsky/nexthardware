"use client";

import { motion } from "framer-motion";

// Companies represented in the Next Hardware community
const companies = [
  { name: "Google", logo: "Google" },
  { name: "NVIDIA", logo: "NVIDIA" },
  { name: "Apple", logo: "Apple" },
  { name: "Meta", logo: "Meta" },
  { name: "Microsoft", logo: "Microsoft" },
  { name: "Amazon", logo: "Amazon" },
  { name: "Tesla", logo: "Tesla" },
  { name: "Rokid", logo: "Rokid" },
  { name: "Qualcomm", logo: "Qualcomm" },
  { name: "Intel", logo: "Intel" },
  { name: "AMD", logo: "AMD" },
  { name: "Samsung", logo: "Samsung" },
  { name: "Sony", logo: "Sony" },
  { name: "OpenAI", logo: "OpenAI" },
  { name: "Anthropic", logo: "Anthropic" },
  { name: "Boston Dynamics", logo: "Boston Dynamics" },
  { name: "Waymo", logo: "Waymo" },
  { name: "Stanford", logo: "Stanford" },
  { name: "MIT", logo: "MIT" },
  { name: "Berkeley", logo: "UC Berkeley" },
];

export default function CompanyLogos() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Trusted By
          </p>
          <p className="text-sm text-slate-600">
            Engineers from 180+ leading companies and universities
          </p>
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-8 items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-slate-400 group-hover:text-slate-600 transition-colors mb-1">
                  {company.logo}
                </div>
                <p className="text-xs text-slate-500 hidden lg:block">
                  {company.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

