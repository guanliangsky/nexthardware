"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  const backgroundVideo = "/api/hero-video";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
      </div>

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

      
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Centered Text Content */}
        <motion.div
          className="text-center max-w-4xl mx-auto bg-black/30 backdrop-blur-sm rounded-xl ring-1 ring-white/10 px-6 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-6 text-white tracking-tight leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.hero.title}
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#join"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('join');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm shadow-lg"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#events"
              className="px-6 py-3 bg-white border border-white/20 text-slate-900 font-medium rounded-md hover:border-white/30 transition-colors text-sm"
            >
              {t.hero.cta2}
            </a>
          </motion.div>
          
          {/* Social Proof */}
          <motion.div
            className="pt-8 border-t border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs text-white/70 mb-6 uppercase tracking-wider text-center font-medium">
              {t.hero.socialProof}
            </p>
            <CompanyLogos />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

// Company Logos Component with Image support and text fallback
function CompanyLogos() {
  const companies = [
    "Google", "NVIDIA", "Apple", "Meta", "Microsoft", "Amazon", 
    "Tesla", "Rokid", "Qualcomm", "Intel", "AMD", "Samsung", 
    "Sony", "Stanford", "MIT", "Berkeley", "OpenAI", "Anthropic", 
    "Boston Dynamics", "Waymo"
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 bg-black/10 rounded-md px-4 py-3 ring-1 ring-white/5">
      {companies.map((company) => (
        <CompanyLogo key={company} name={company} />
      ))}
    </div>
  );
}

function CompanyLogo({ name }: { name: string }) {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Map company names to Simple Icons slug names and Clearbit domains
  const companyMap: Record<string, { simpleIcon?: string; clearbitDomain: string }> = {
    // Prefer Clearbit wordmarks for major brands for accuracy
    "Google": { clearbitDomain: "google.com" },
    "NVIDIA": { clearbitDomain: "nvidia.com" },
    "Apple": { clearbitDomain: "apple.com" },
    "Meta": { clearbitDomain: "meta.com" },
    "Tesla": { clearbitDomain: "tesla.com" },
    "Qualcomm": { clearbitDomain: "qualcomm.com" },
    "Intel": { clearbitDomain: "intel.com" },
    "AMD": { clearbitDomain: "amd.com" },
    "Samsung": { clearbitDomain: "samsung.com" },
    "Sony": { clearbitDomain: "sony.com" },
    "Anthropic": { clearbitDomain: "anthropic.com" },
    // Others
    "Microsoft": { simpleIcon: "microsoft", clearbitDomain: "microsoft.com" },
    "Amazon": { simpleIcon: "amazon", clearbitDomain: "amazon.com" },
    "Rokid": { clearbitDomain: "rokid.com" },
    "Stanford": { clearbitDomain: "stanford.edu" },
    "MIT": { clearbitDomain: "mit.edu" },
    "Berkeley": { clearbitDomain: "berkeley.edu" },
    "OpenAI": { simpleIcon: "openai", clearbitDomain: "openai.com" },
    "Boston Dynamics": { clearbitDomain: "bostondynamics.com" },
    "Waymo": { clearbitDomain: "waymo.com" },
  };

  const company = companyMap[name];

  // Try Simple Icons first (if available), then Clearbit, then text
  useEffect(() => {
    if (!company) {
      setImageError(true);
      return;
    }

    if (company.simpleIcon) {
      const iconUrl = `https://cdn.simpleicons.org/${company.simpleIcon}`;
      const img = new window.Image();
      img.onload = () => {
        setCurrentSrc(iconUrl);
        setHoveredSrc(iconUrl);
      };
      img.onerror = () => {
        const clearbitUrl = `https://logo.clearbit.com/${company.clearbitDomain}`;
        const img2 = new window.Image();
        img2.onload = () => {
          setCurrentSrc(clearbitUrl);
          setHoveredSrc(clearbitUrl);
        };
        img2.onerror = () => setImageError(true);
        img2.src = clearbitUrl;
      };
      img.src = iconUrl;
    } else {
      const clearbitUrl = `https://logo.clearbit.com/${company.clearbitDomain}`;
      const img = new window.Image();
      img.onload = () => {
        setCurrentSrc(clearbitUrl);
        setHoveredSrc(clearbitUrl);
      };
      img.onerror = () => setImageError(true);
      img.src = clearbitUrl;
    }
  }, [company]);

  // Show logo if available
  if (currentSrc && !imageError) {
    return (
      <div 
        className="h-8 w-auto flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered && hoveredSrc ? hoveredSrc : currentSrc}
          alt={name}
          width={120}
          height={32}
          className="h-8 w-auto object-contain transition-all duration-300 opacity-100 brightness-110 contrast-115 saturate-125"
          onError={() => setImageError(true)}
          priority={false}
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback to text
  return (
    <span className="text-sm font-semibold text-white/80 hover:text-white hover:scale-110 hover:brightness-110 transition-all duration-300 cursor-pointer inline-block">
      {name}
    </span>
  );
}
