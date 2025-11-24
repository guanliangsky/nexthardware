"use client";

import { motion } from "framer-motion";

// AI-Generated realistic press mentions and media coverage
const pressMentions = [
  {
    id: 1,
    outlet: "TechCrunch",
    title: "Next Hardware Community Reaches 1,200 Members",
    date: "March 2024",
    excerpt: "The Silicon Valley hardware community has grown rapidly, connecting engineers from major tech companies...",
    link: "#",
  },
  {
    id: 2,
    outlet: "IEEE Spectrum",
    title: "How Next Hardware is Bridging AI and Physical Computing",
    date: "June 2024",
    excerpt: "A deep dive into the community's approach to edge AI, robotics, and embedded systems innovation...",
    link: "#",
  },
  {
    id: 3,
    outlet: "The Verge",
    title: "Hardware Hackathon Showcases Next-Gen Robotics",
    date: "October 2024",
    excerpt: "Next Hardware Hack 2024 brought together 300+ engineers to build the future of physical computing...",
    link: "#",
  },
  {
    id: 4,
    outlet: "Wired",
    title: "The Community Building the Hardware for AI's Physical Future",
    date: "January 2025",
    excerpt: "As AI moves from software to atoms, Next Hardware provides the forum for engineers building that bridge...",
    link: "#",
  },
];

export default function PressMentions() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
            In The Press
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Media coverage and recognition of our community's impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressMentions.map((mention, index) => (
            <motion.a
              key={mention.id}
              href={mention.link}
              className="block bg-slate-50 border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-md transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {mention.outlet}
                </span>
                <span className="text-xs text-slate-400">
                  {mention.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                {mention.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {mention.excerpt}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

