"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

// Companies represented in the Next Hardware community
// Using logo.dev CDN for company logos (free, reliable)
const companies = [
  { name: "Google", logoUrl: "https://logo.clearbit.com/google.com", alt: "Google" },
  { name: "NVIDIA", logoUrl: "https://logo.clearbit.com/nvidia.com", alt: "NVIDIA" },
  { name: "Apple", logoUrl: "https://logo.clearbit.com/apple.com", alt: "Apple" },
  { name: "Meta", logoUrl: "https://logo.clearbit.com/meta.com", alt: "Meta" },
  { name: "Microsoft", logoUrl: "https://logo.clearbit.com/microsoft.com", alt: "Microsoft" },
  { name: "Amazon", logoUrl: "https://logo.clearbit.com/amazon.com", alt: "Amazon" },
  { name: "Tesla", logoUrl: "https://logo.clearbit.com/tesla.com", alt: "Tesla" },
  { name: "Rokid", logoUrl: "https://logo.clearbit.com/rokid.com", alt: "Rokid" },
  { name: "Qualcomm", logoUrl: "https://logo.clearbit.com/qualcomm.com", alt: "Qualcomm" },
  { name: "Intel", logoUrl: "https://logo.clearbit.com/intel.com", alt: "Intel" },
  { name: "AMD", logoUrl: "https://logo.clearbit.com/amd.com", alt: "AMD" },
  { name: "Samsung", logoUrl: "https://logo.clearbit.com/samsung.com", alt: "Samsung" },
  { name: "Sony", logoUrl: "https://logo.clearbit.com/sony.com", alt: "Sony" },
  { name: "OpenAI", logoUrl: "https://logo.clearbit.com/openai.com", alt: "OpenAI" },
  { name: "Anthropic", logoUrl: "https://logo.clearbit.com/anthropic.com", alt: "Anthropic" },
  { name: "Boston Dynamics", logoUrl: "https://logo.clearbit.com/bostondynamics.com", alt: "Boston Dynamics" },
  { name: "Waymo", logoUrl: "https://logo.clearbit.com/waymo.com", alt: "Waymo" },
  { name: "Stanford", logoUrl: "https://logo.clearbit.com/stanford.edu", alt: "Stanford University" },
  { name: "MIT", logoUrl: "https://logo.clearbit.com/mit.edu", alt: "MIT" },
  { name: "Berkeley", logoUrl: "https://logo.clearbit.com/berkeley.edu", alt: "UC Berkeley" },
];

function CompanyLogo({ company, index }: { company: typeof companies[0]; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="flex items-center justify-center animate-fade-scale"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="text-center group w-full">
        <div className="relative w-full h-12 md:h-16 flex items-center justify-center mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
          {!imageError ? (
            <Image
              src={company.logoUrl}
              alt={company.alt}
              width={120}
              height={48}
              className="object-contain max-w-full max-h-full filter grayscale group-hover:grayscale-0 transition-all"
              unoptimized
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-sm font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
              {company.name}
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500 hidden lg:block">
          {company.name}
        </p>
      </div>
    </div>
  );
}

export default function CompanyLogos() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
      <div className="container mx-auto max-w-6xl">
        <div
          className="text-center mb-12 animate-fade-in"
        >
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {t.companyLogos.trustedBy}
          </p>
          <p className="text-sm text-slate-600">
            {t.companyLogos.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-8 items-center">
          {companies.map((company, index) => (
            <CompanyLogo key={company.name} company={company} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
