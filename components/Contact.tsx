"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Contact() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Load reCAPTCHA script
  useEffect(() => {
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!recaptchaSiteKey) {
      return;
    }

    if (window.grecaptcha) {
      setRecaptchaLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        setRecaptchaLoaded(true);
      });
    };
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      let recaptchaToken: string | undefined;
      const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      
      if (recaptchaSiteKey && recaptchaLoaded && window.grecaptcha) {
        try {
          recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, {
            action: "contact_form",
          });
        } catch (recaptchaError) {
          console.warn("reCAPTCHA error:", recaptchaError);
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");
      
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setStatus("idle");
      }, 3000);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4 text-slate-900 dark:text-white">
            {t.contact.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
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
                  Palo Alto, California
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
                    href="https://luma.com/nexthardware"
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
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contactForm.name}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contactForm.email}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contactForm.subject}
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                  placeholder={t.contactForm.subjectPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.contactForm.message}
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900 resize-none"
                  required
                />
              </div>

              {status === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                  {t.contactForm.success}
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {errorMessage || t.contactForm.errorGeneric}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t.contactForm.sending : t.contactForm.send}
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-500 text-center">
              {t.contact.messageSaved}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
