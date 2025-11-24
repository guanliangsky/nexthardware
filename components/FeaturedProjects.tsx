"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// AI-Enhanced: Detailed featured projects with technical depth
const projects = [
  {
    id: 1,
    title: "Autonomous Drone AI Controller",
    description: "Custom edge AI system for real-time drone control using TensorFlow Lite. Features ARM Cortex-M7, 6-axis IMU, GPS, and computer vision processing. Successfully deployed in 3 commercial applications.",
    tech: ["TensorFlow Lite", "ARM Cortex-M7", "Computer Vision", "Embedded C++"],
    outcome: "3 commercial deployments, $500K in funding raised",
    image: "/images/projects/autonomous-drone-controller.jpg",
    year: "2024",
    member: "Alex Kim, RoboTech Systems",
  },
  {
    id: 2,
    title: "Spatial Computing AR Glasses",
    description: "Next-gen AR glasses with micro-OLED displays, SLAM tracking, and custom optics. Features eye-tracking, hand gesture recognition, and spatial audio. Partnership with Rokid for production.",
    tech: ["SLAM", "Micro-OLED", "Eye Tracking", "Spatial Audio"],
    outcome: "Production partnership, featured at 2024 Summit",
    image: "/images/projects/ar-glasses-spatial.jpg",
    year: "2024",
    member: "Community Collaboration",
  },
  {
    id: 3,
    title: "Neuromorphic Computing Chip",
    description: "Custom ASIC for neuromorphic AI processing, inspired by biological neural networks. 10x more energy efficient than traditional AI chips. Research collaboration between MIT and industry partners.",
    tech: ["ASIC Design", "Neuromorphic Computing", "RTL Synthesis", "AI Hardware"],
    outcome: "Research paper published, industry partnerships formed",
    image: "/images/projects/neuromorphic-chip.jpg",
    year: "2024",
    member: "Dr. Emily Rodriguez, MIT CSAIL",
  },
];

export default function FeaturedProjects() {
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
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Innovative hardware projects from our community
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex-1 w-full">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {project.year}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sm text-slate-600">
                    {project.member}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-900">
                  {project.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-900 mb-1">
                    Outcome
                  </p>
                  <p className="text-sm text-slate-600">
                    {project.outcome}
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

