"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <ParticleBackground />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo size="2xl" className="justify-center" showText={true} />
          </motion.div>
          
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-6 text-slate-900 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Where AI Meets Atoms
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The global community for builders of the physical future
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#join"
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
            >
              Join the Community
            </a>
            <a
              href="#events"
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
            >
              View Events
            </a>
          </motion.div>
          
          {/* Social Proof */}
          <motion.div
            className="mt-20 pt-10 border-t border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs text-slate-500 mb-6 uppercase tracking-wider text-center font-medium">
              Community members from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <span className="text-sm font-medium text-slate-700">Google</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">NVIDIA</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Rokid</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Stanford</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
    </section>
  );
}

