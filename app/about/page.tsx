import type { Metadata } from "next";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "About | Next Hardware",
  description: "Learn about Next Hardware - the global community for builders of the physical future. Established 2023. Join 1,200+ hardware engineers, founders, and makers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            About Next Hardware
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            The global community for builders of the physical future
          </p>
        </motion.div>

        <div className="border border-slate-200 rounded-lg p-8 lg:p-12 space-y-8 text-slate-600 bg-white">
          {/* Origin Story */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Story</h2>
            <p className="mb-4 leading-relaxed">
              Next Hardware was founded in 2023 with a simple mission: to bring together the builders, engineers, founders, and makers who are creating the physical future. We recognized that the intersection of AI, AR, robotics, and embedded systems was creating unprecedented opportunities—and challenges.
            </p>
            <p className="mb-4 leading-relaxed">
              What started as a small meetup in Silicon Valley has grown into a global community of over 1,200 members from leading companies like Google, NVIDIA, Apple, Meta, Microsoft, Tesla, and top universities including Stanford, MIT, and Berkeley.
            </p>
            <p className="mb-4 leading-relaxed">
              We believe that the future of technology isn't just in software—it's where AI meets atoms. It's in the robots that work alongside us, the AR devices that augment our reality, and the embedded systems that power everything from smart cities to autonomous vehicles.
            </p>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h2>
            <p className="mb-4 leading-relaxed">
              To accelerate innovation at the intersection of hardware, AI, and robotics by connecting builders, sharing knowledge, and fostering collaboration.
            </p>
            <p className="mb-4 leading-relaxed">
              We're building a community where:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Hardware engineers can share projects, learn from peers, and find collaborators</li>
              <li>Founders can connect with technical talent and get feedback on their ideas</li>
              <li>Researchers can bridge the gap between academia and industry</li>
              <li>Makers can showcase their innovations and inspire others</li>
            </ul>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Building in Public</h3>
                <p className="text-sm leading-relaxed">
                  We believe in transparency, sharing our learnings, and documenting our journey. Success and failure both teach valuable lessons.
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Technical Excellence</h3>
                <p className="text-sm leading-relaxed">
                  We value deep technical knowledge, attention to detail, and a commitment to building things that work reliably in the real world.
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Inclusive Community</h3>
                <p className="text-sm leading-relaxed">
                  We welcome builders from all backgrounds, experience levels, and perspectives. Diversity makes us stronger.
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Practical Impact</h3>
                <p className="text-sm leading-relaxed">
                  We focus on real-world applications and solving actual problems. Theory is important, but shipping matters.
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">What We Do</h2>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Community Events</h3>
                <p className="leading-relaxed">
                  We host regular meetups, workshops, and hackathons where members can learn, network, and collaborate. Our flagship event, the Next Hardware Hack, brings together hundreds of builders for an intensive weekend of innovation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Project Showcases</h3>
                <p className="leading-relaxed">
                  Members share their latest hardware projects, from prototype PCBs to full robotics systems. These showcases inspire others and create opportunities for collaboration.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Knowledge Sharing</h3>
                <p className="leading-relaxed">
                  Through talks, workshops, and online discussions, we share knowledge about embedded systems, AI hardware, robotics, AR/VR, and more. Learning never stops.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Networking</h3>
                <p className="leading-relaxed">
                  We connect hardware engineers with founders, researchers with industry practitioners, and makers with resources. Great things happen when the right people meet.
                </p>
              </div>
            </div>
          </section>

          {/* Milestones */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Milestones</h2>
            <div className="space-y-4 mb-4">
              <div className="border-l-4 border-slate-900 pl-4">
                <div className="text-sm font-semibold text-slate-500 mb-1">2023</div>
                <div className="font-semibold text-slate-900 mb-1">Community Founded</div>
                <p className="text-sm leading-relaxed">Next Hardware launched with our first meetup in Silicon Valley</p>
              </div>
              <div className="border-l-4 border-slate-900 pl-4">
                <div className="text-sm font-semibold text-slate-500 mb-1">2024</div>
                <div className="font-semibold text-slate-900 mb-1">Rapid Growth</div>
                <p className="text-sm leading-relaxed">Reached 1,000+ members, hosted 50+ events, and launched our first hackathon</p>
              </div>
              <div className="border-l-4 border-slate-900 pl-4">
                <div className="text-sm font-semibold text-slate-500 mb-1">2025</div>
                <div className="font-semibold text-slate-900 mb-1">Global Expansion</div>
                <p className="text-sm leading-relaxed">1,200+ members, 85+ events, 450+ projects shared, representing 180+ companies</p>
              </div>
            </div>
          </section>

          {/* Join CTA */}
          <section className="mt-12 pt-8 border-t border-slate-200">
            <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Join Us</h2>
              <p className="mb-6 text-slate-600">
                Whether you're building your first PCB or shipping hardware at scale, there's a place for you in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://luma.com/NextHardware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
                >
                  Join on Luma
                </a>
                <a
                  href="https://discord.gg/d5dTjjVD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

