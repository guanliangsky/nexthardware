"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Community showcase - showing real community activities, events, and projects
// Replace with actual photos from your community events, meetups, and member projects
const showcaseItems = [
  {
    id: 1,
    title: "Community Meetups",
    description: "Hardware engineers connecting in Silicon Valley",
    category: "Events",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  },
  {
    id: 2,
    title: "Project Showcases",
    description: "Members sharing their latest hardware innovations",
    category: "Projects",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    id: 3,
    title: "Workshops & Talks",
    description: "Learning and building together",
    category: "Learning",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    id: 4,
    title: "Collaboration",
    description: "Engineers, founders, and makers working together",
    category: "Community",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
];

export default function CommunityShowcase() {
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
          Community
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
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="mt-5">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                  {item.category}
                </div>
                <h3 className="text-base font-bold mb-1 text-slate-900 group-hover:text-slate-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

