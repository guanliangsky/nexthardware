"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4 text-slate-900">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-900">Contact Information</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Email</h4>
                <a
                  href="mailto:hello@nexthardware.io"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  hello@nexthardware.io
                </a>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Location</h4>
                <p className="text-slate-600">
                  Palo Alto, California
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Community</h4>
                <div className="space-y-2">
                  <a
                    href="https://discord.gg/d5dTjjVD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Discord Community
                  </a>
                  <a
                    href="https://luma.com/NextHardware"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Luma Events
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Social Media</h4>
                <div className="flex gap-4">
                  <a
                    href="https://x.com/nexthardware"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    X
                  </a>
                  <a
                    href="https://github.com/nexthardware"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://youtube.com/@nexthardware"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form - FoxyForm */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-900">Send a Message</h3>
            
            {/* Contact Form - Using API Route (No CAPTCHA issues!) */}
            <ContactForm />

            <p className="mt-4 text-xs text-slate-500 text-center">
              Your message will be saved and we&apos;ll receive an email notification
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

