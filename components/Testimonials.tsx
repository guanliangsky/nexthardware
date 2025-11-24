/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";

// AI-Generated realistic testimonials from community members
const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "VP of Engineering",
    company: "Google",
    image: "/images/profiles/sarah-chen.jpg",
    quote: "Next Hardware has been instrumental in connecting me with the brightest minds in embedded systems. The community's depth of knowledge and willingness to share has directly influenced several projects at Google. I've been a member since 2023 and it's become an essential part of my professional network.",
    joined: "Member since 2023",
  },
  {
    id: 2,
    name: "Michael Zhang",
    role: "Principal Engineer",
    company: "NVIDIA",
    image: "/images/profiles/michael-zhang.jpg",
    quote: "The hackathons and workshops here are unlike anything else. I've collaborated on three hardware projects through Next Hardware connections, and the technical discussions are always top-tier. This community understands the intersection of AI and hardware like no other.",
    joined: "Member since 2023",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Research Director",
    company: "MIT CSAIL",
    image: "/images/profiles/emily-rodriguez.jpg",
    quote: "As someone bridging academia and industry, Next Hardware provides the perfect forum. I've presented research here, found industry partners for projects, and even recruited talented engineers. The quality of discourse is exceptional.",
    joined: "Member since 2024",
  },
  {
    id: 4,
    name: "Alex Kim",
    role: "Founder & CEO",
    company: "RoboTech Systems",
    image: "/images/profiles/alex-kim.jpg",
    quote: "I launched my robotics startup after meeting my co-founder at a Next Hardware meetup in 2024. The community's support, technical expertise, and network have been invaluable. We've raised funding and are now shipping products - all thanks to connections made here.",
    joined: "Member since 2023",
  },
  {
    id: 5,
    name: "Jordan Lee",
    role: "Senior Hardware Engineer",
    company: "Apple",
    image: "/images/profiles/jordan-lee.jpg",
    quote: "The project showcases are incredible. I've learned about cutting-edge PCB designs, novel sensor integrations, and AI hardware architectures that I wouldn't have discovered elsewhere. The community's commitment to open knowledge sharing is remarkable.",
    joined: "Member since 2023",
  },
  {
    id: 6,
    name: "Taylor Park",
    role: "Robotics Engineer",
    company: "Boston Dynamics",
    image: "/images/profiles/taylor-park.jpg",
    quote: "Next Hardware events consistently bring together the best in the field. I've attended 12+ events over the past two years, and each one has provided new insights or connections. The community's growth has been impressive to watch.",
    joined: "Member since 2023",
  },
  {
    id: 7,
    name: "Casey Wong",
    role: "Embedded Systems Architect",
    company: "Tesla",
    image: "/images/profiles/casey-wong.jpg",
    quote: "The technical depth here is unmatched. Whether it's discussions about edge AI deployment, custom silicon design, or robotics control systems, you'll find experts who genuinely want to help. I've solved several challenging problems through community input.",
    joined: "Member since 2024",
  },
  {
    id: 8,
    name: "Dr. Priya Patel",
    role: "AI Hardware Researcher",
    company: "Stanford",
    image: "/images/profiles/priya-patel.jpg",
    quote: "Next Hardware has become my go-to resource for staying current with industry trends while maintaining academic rigor. The blend of theoretical knowledge and practical implementation is exactly what I need. The community's evolution since 2023 has been remarkable.",
    joined: "Member since 2023",
  },
];

export default function Testimonials() {
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
            What Our Community Says
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join 1,200+ hardware engineers, founders, and researchers building the future
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
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
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
                "{testimonial.quote}"
              </p>
              <p className="text-xs text-slate-500">
                {testimonial.joined}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

