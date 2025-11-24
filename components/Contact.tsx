"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Contact() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
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
            {t.contact.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.contact.description}
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
            <h3 className="text-2xl font-semibold mb-6 text-slate-900">{t.contact.contactInfo}</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">{t.contact.email}</h4>
                <a
                  href="mailto:hello@nexthardware.io"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  hello@nexthardware.io
                </a>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">{t.contact.location}</h4>
                <p className="text-slate-600">
                  Palo Alto, CA
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">{t.contact.community}</h4>
                <div className="space-y-2">
                  <a
                    href="https://discord.gg/d5dTjjVD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {t.contact.discordCommunity}
                  </a>
                  <a
                    href="https://luma.com/NextHardware"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {t.contact.lumaEvents}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">{t.contact.socialMedia}</h4>
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-900">{t.contact.sendMessage}</h3>
            
            {/* Contact Form - Uses Formspree for email notifications and saves to database */}
            <ContactForm />

            <p className="mt-4 text-xs text-slate-500 text-center">
              {t.contact.messageSaved}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

