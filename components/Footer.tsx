"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

// TODO: Replace with your actual social media URLs
const socialLinks = [
  { name: "Twitter/X", url: "#", label: "X" }, // Replace with: https://twitter.com/nexthardware
  { name: "GitHub", url: "#", label: "GitHub" }, // Replace with: https://github.com/nexthardware
  { name: "Luma", url: "https://luma.com/NextHardware", label: "Luma" },
  { name: "Discord", url: "https://discord.gg/d5dTjjVD", label: "Discord" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Logo size="sm" showText={false} />
            <p className="text-xs text-slate-600">
              © 2025 Next Hardware. Building in Public.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label={link.name}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex gap-3 text-xs">
                <a href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Privacy
                </a>
                <span className="text-slate-400">•</span>
                <a href="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Terms
                </a>
                <span className="text-slate-400">•</span>
                <a href="/cookies" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Cookies
                </a>
              </div>
              <p className="text-xs text-slate-500 text-center md:text-left">
                We do not sell personal information
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

