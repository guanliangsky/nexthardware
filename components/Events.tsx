"use client";

import { motion } from "framer-motion";

export default function Events() {
  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-10 text-slate-900"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Events
        </motion.h2>

        <motion.div
          className="border border-slate-200 rounded-lg p-8 lg:p-12 bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full">
            <h3 className="text-2xl font-semibold mb-2 text-slate-900 text-center">Upcoming Events</h3>
            <p className="text-slate-600 mb-8 text-center text-base">
              Browse and register for our community events
            </p>
            
            {/* Luma Calendar Embed */}
            <div className="w-full rounded-lg overflow-hidden border border-slate-200">
              <iframe
                src="https://lu.ma/embed/calendar/NextHardware"
                width="100%"
                height="600"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                aria-label="Next Hardware Events Calendar"
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a
                href="https://luma.com/NextHardware"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm text-center"
              >
                View All Events on Luma
              </a>
              <a
                href="https://luma.com/NextHardware"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm text-center"
              >
                Subscribe to Calendar
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

