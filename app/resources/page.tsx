import type { Metadata } from "next";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Resources | Next Hardware",
  description: "Resources for hardware builders: getting started guides, tools, documentation, and community guidelines for Next Hardware community.",
};

export default function ResourcesPage() {
  const resources = [
    {
      category: "Getting Started",
      items: [
        {
          title: "New to Hardware?",
          description: "A beginner's guide to embedded systems, PCBs, and hardware development",
          link: "#",
        },
        {
          title: "Community Guidelines",
          description: "Our code of conduct and community standards for respectful collaboration",
          link: "#",
        },
        {
          title: "How to Join Events",
          description: "Step-by-step guide to registering for and participating in our events",
          link: "https://luma.com/NextHardware",
        },
      ],
    },
    {
      category: "Tools & Platforms",
      items: [
        {
          title: "PCB Design Tools",
          description: "Recommended tools for PCB design: KiCad, Altium, Eagle, and more",
          link: "#",
        },
        {
          title: "Embedded Development",
          description: "Resources for embedded systems: Arduino, ESP32, Raspberry Pi, and microcontrollers",
          link: "#",
        },
        {
          title: "3D Printing & Prototyping",
          description: "Guide to 3D printing, CNC machining, and rapid prototyping services",
          link: "#",
        },
        {
          title: "Simulation & Testing",
          description: "Tools for circuit simulation, thermal analysis, and hardware testing",
          link: "#",
        },
      ],
    },
    {
      category: "Learning Resources",
      items: [
        {
          title: "Hardware Engineering Basics",
          description: "Fundamentals of electronics, circuit design, and hardware architecture",
          link: "#",
        },
        {
          title: "AI Hardware",
          description: "Resources on AI chips, neural processing units, and edge AI",
          link: "#",
        },
        {
          title: "Robotics",
          description: "Getting started with robotics: sensors, actuators, control systems",
          link: "#",
        },
        {
          title: "AR/VR Hardware",
          description: "Resources on AR/VR devices, displays, tracking, and spatial computing",
          link: "#",
        },
      ],
    },
    {
      category: "Community",
      items: [
        {
          title: "Discord Server",
          description: "Join our Discord for real-time discussions, Q&A, and project sharing",
          link: "https://discord.gg/d5dTjjVD",
        },
        {
          title: "Event Calendar",
          description: "View all upcoming events, workshops, and meetups",
          link: "https://luma.com/NextHardware",
        },
        {
          title: "Project Showcases",
          description: "See what community members are building and get inspired",
          link: "#showcase",
        },
        {
          title: "Newsletter",
          description: "Stay updated with community news, event announcements, and resources",
          link: "#newsletter",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Resources
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Tools, guides, and resources for hardware builders
          </p>
        </motion.div>

        <div className="space-y-12">
          {resources.map((section, sectionIndex) => (
            <motion.section
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-2">
                {section.category}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    className="block border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-sm transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          ))}

          {/* Community Guidelines */}
          <motion.section
            className="border border-slate-200 rounded-lg p-8 lg:p-12 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Community Guidelines</h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Be Respectful</h3>
                <p className="leading-relaxed">
                  Treat all community members with respect, regardless of their background, experience level, or perspective. Constructive criticism is welcome; personal attacks are not.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Share Knowledge</h3>
                <p className="leading-relaxed">
                  We're here to learn from each other. Share your projects, ask questions, and help others. No question is too basic.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Keep It Technical</h3>
                <p className="leading-relaxed">
                  While we welcome discussions about the business and social aspects of hardware, our focus is on the technical: building, designing, and innovating.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">No Spam or Self-Promotion</h3>
                <p className="leading-relaxed">
                  Share your projects and companies, but don't spam. Genuine contributions to discussions are always welcome.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Respect Intellectual Property</h3>
                <p className="leading-relaxed">
                  Don't share proprietary information or violate others' intellectual property. When sharing, give credit where it's due.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact for Resources */}
          <motion.section
            className="mt-12 pt-8 border-t border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Have a Resource to Share?</h2>
              <p className="mb-6 text-slate-600">
                Know of a great tool, tutorial, or resource that should be on this page? We'd love to hear about it.
              </p>
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
              >
                Contact Us
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

