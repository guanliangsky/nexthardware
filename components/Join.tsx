"use client";

import { motion } from "framer-motion";

export default function Join() {
  return (
    <section id="join" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-slate-900">
            Join the Community
          </h2>
          <p className="text-base text-slate-600 mb-10 max-w-xl mx-auto">
            Connect with hardware engineers, founders, and makers building the future
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
            {/* TODO: Replace with your Discord server invite URL */}
            <a
              href="#" // Replace with: https://discord.gg/your-server
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
            >
              Join Discord
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

