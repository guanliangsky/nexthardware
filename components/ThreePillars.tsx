"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Spatial Computing",
    description: "AR/VR, Vision Pro, Glasses",
    details: "Building immersive experiences through advanced optics, spatial tracking, and mixed reality interfaces. Exploring the future of human-computer interaction beyond screens.",
    icon: "🥽",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1,
    tech: ["AR/VR", "Vision Pro", "Spatial Tracking", "Optics"],
  },
  {
    title: "Embodied AI",
    description: "Robotics, Sensors, Physical Intelligence",
    details: "Creating intelligent systems that interact with the physical world. From autonomous robots to sensor fusion and real-time decision making at the edge.",
    icon: "🤖",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2,
    tech: ["Robotics", "Sensor Fusion", "Edge AI", "Autonomous Systems"],
  },
  {
    title: "Edge Hardware",
    description: "IoT, custom silicon, manufacturing",
    details: "Designing efficient, powerful hardware for edge computing. Custom ASICs, embedded systems, and scalable manufacturing for the next generation of devices.",
    icon: "⚡",
    gradient: "from-cyan-500 to-blue-500",
    delay: 0.3,
    tech: ["Custom Silicon", "IoT", "Embedded Systems", "Manufacturing"],
  },
];

export default function ThreePillars() {
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
          Focus Areas
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

