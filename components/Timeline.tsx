"use client";

import { motion } from "framer-motion";

// AI-Generated detailed timeline showing 3 years of growth
const timelineEvents = [
  {
    year: "2023",
    quarter: "Q1",
    title: "Community Founded",
    description: "Next Hardware launched with our first meetup in Palo Alto, bringing together 50 hardware engineers from Silicon Valley companies. Focus on AI hardware, robotics, and embedded systems.",
    milestone: "50 members",
  },
  {
    year: "2023",
    quarter: "Q2",
    title: "First Major Event",
    description: "Hosted our first hardware hackathon with 120 participants. Projects included edge AI devices, robotics controllers, and AR hardware prototypes. Three teams received funding offers.",
    milestone: "120 participants",
  },
  {
    year: "2023",
    quarter: "Q3",
    title: "Community Expansion",
    description: "Reached 300+ members with regular monthly meetups. Launched Discord community and began hosting virtual workshops. Members from Google, NVIDIA, Apple, and Tesla joined.",
    milestone: "300+ members",
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "First Annual Summit",
    description: "Hosted Next Hardware Summit 2023 with 200+ attendees, 15 speakers, and 8 workshops. Topics covered custom silicon, robotics, AR/VR hardware, and AI at the edge.",
    milestone: "200+ attendees",
  },
  {
    year: "2024",
    quarter: "Q1",
    title: "International Growth",
    description: "Expanded to 600+ members globally. Launched virtual events accessible worldwide. First international chapter discussions began in Europe and Asia.",
    milestone: "600+ members",
  },
  {
    year: "2024",
    quarter: "Q2",
    title: "Project Showcase Platform",
    description: "Launched community project showcase with 100+ projects featured. Members shared PCBs, robotics systems, AI hardware, and embedded solutions. Generated significant industry interest.",
    milestone: "100+ projects",
  },
  {
    year: "2024",
    quarter: "Q3",
    title: "Industry Partnerships",
    description: "Formed partnerships with major tech companies for workshops and events. Collaborated with Stanford, MIT, and Berkeley on research projects. Media coverage in TechCrunch and IEEE Spectrum.",
    milestone: "Media coverage",
  },
  {
    year: "2024",
    quarter: "Q4",
    title: "Next Hardware Hack 2024",
    description: "Second annual hackathon with 300+ participants, $25,000 in prizes, and 50+ projects. Winning teams received funding and mentorship. Event featured judges from Google, NVIDIA, and Apple.",
    milestone: "300+ participants",
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "1,200+ Member Milestone",
    description: "Reached 1,200+ active members across 40+ countries. Hosted 85+ events since founding. Community now includes engineers from 180+ companies and researchers from top universities.",
    milestone: "1,200+ members",
  },
  {
    year: "2025",
    quarter: "Q2",
    title: "Current: Next Hardware Hack 2025",
    description: "Our largest event yet - 500+ expected participants, $50,000 in prizes, and expanded mentorship program. Building on two years of community growth and industry recognition.",
    milestone: "500+ expected",
  },
];

export default function Timeline() {
  const groupedByYear = timelineEvents.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {} as Record<string, typeof timelineEvents>);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
            Our Journey
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Building the hardware community since 2023
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />

          <div className="space-y-12">
            {Object.entries(groupedByYear).map(([year, events], yearIndex) => (
              <div key={year}>
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{year}</h3>
                  <div className="h-1 w-20 bg-slate-900"></div>
                </motion.div>

                <div className="space-y-8">
                  {events.map((event, eventIndex) => (
                    <motion.div
                      key={`${year}-${eventIndex}`}
                      className="relative pl-20 md:pl-24"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (yearIndex * 0.1) + (eventIndex * 0.05) }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-2 w-4 h-4 bg-slate-900 rounded-full border-4 border-white hidden md:block" />

                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              {event.quarter}
                            </span>
                            <h4 className="text-lg font-semibold text-slate-900 mt-1">
                              {event.title}
                            </h4>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
                              {event.milestone}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

