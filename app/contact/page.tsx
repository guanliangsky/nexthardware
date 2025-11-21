"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Contact() {
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
      // reCAPTCHA not configured, form will work without it
      return;
    }

    // Check if script is already loaded
    if (window.grecaptcha) {
      setRecaptchaLoaded(true);
      return;
    }

    // Load reCAPTCHA script
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
      // Cleanup: remove script if component unmounts
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
      // Get reCAPTCHA token if configured
      let recaptchaToken: string | undefined;
      const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      
      if (recaptchaSiteKey && recaptchaLoaded && window.grecaptcha) {
        try {
          recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, {
            action: "contact_form",
          });
        } catch (recaptchaError) {
          console.warn("reCAPTCHA error:", recaptchaError);
          // Continue without reCAPTCHA if it fails
        }
      }

      // Send to API
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
      
      // Reset form after a delay
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
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4 text-slate-900">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have a question, suggestion, or want to collaborate? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Email</h3>
                  <a
                    href="mailto:hello@nexthardware.io"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    hello@nexthardware.io
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Location</h3>
                  <p className="text-slate-600">
                    Palo Alto, California
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Community</h3>
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
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Social Media</h3>
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900 resize-none"
                    required
                  />
                </div>

                {status === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                    ✓ Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                    {errorMessage || "Something went wrong. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>

              <p className="mt-4 text-xs text-slate-500 text-center">
                Your message will be saved and we'll receive an email notification
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

