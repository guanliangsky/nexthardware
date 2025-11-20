"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  // const backgroundVideo = "/videos/hero-background.mp4"; // Add your video here when ready

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Optional: Video Background (uncomment when you have a video) */}
      {/* 
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      */}

      {/* Optional: Video Background (uncomment to use instead of image) */}
      {/* 
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      */}

      {/* Particle Background - optional, can be removed if too busy */}
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Centered Text Content */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
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
            className="pt-8 border-t border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs text-slate-500 mb-6 uppercase tracking-wider text-center font-medium">
              Community members from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <span className="text-sm font-medium text-slate-700">Google</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">NVIDIA</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Apple</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Meta</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Microsoft</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Amazon</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Tesla</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Rokid</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Qualcomm</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Intel</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">AMD</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Samsung</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Sony</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Stanford</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">MIT</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Berkeley</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">OpenAI</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Anthropic</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Boston Dynamics</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-medium text-slate-700">Waymo</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

