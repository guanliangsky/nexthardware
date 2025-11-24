"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function FeaturedProjects() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const projects = [
    {
      id: 1,
      key: 'drone',
      tech: ["TensorFlow Lite", "ARM Cortex-M7", "Computer Vision", "Embedded C++", "Sensor Fusion"],
      image: "/images/projects/autonomous-drone-controller.jpg",
      year: "2024",
    },
    {
      id: 2,
      key: 'arGlasses',
      tech: ["SLAM", "Micro-OLED", "Eye Tracking", "Spatial Audio", "6DOF Tracking"],
      image: "/images/projects/ar-glasses-spatial.jpg",
      year: "2024",
    },
    {
      id: 3,
      key: 'neuromorphic',
      tech: ["ASIC Design", "Neuromorphic Computing", "RTL Synthesis", "AI Hardware", "Spiking Neural Networks"],
      image: "/images/projects/neuromorphic-chip.jpg",
      year: "2024",
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
            {t.featuredProjects.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.featuredProjects.subtitle}
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
                    {t.featuredProjects.projects[project.key].member}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-900">
                  {t.featuredProjects.projects[project.key].title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t.featuredProjects.projects[project.key].description}
                </p>
                
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {t.featuredProjects.technologies}
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
                    {t.featuredProjects.outcome}
                  </p>
                  <p className="text-sm text-slate-600">
                    {t.featuredProjects.projects[project.key].outcome}
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

