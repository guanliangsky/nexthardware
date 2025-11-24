/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { motion } from "framer-motion";
import { getServerLocale } from "@/lib/getServerLocale";
import { getTranslations } from "@/lib/useTranslations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | Next Hardware",
  description: "Learn about Next Hardware - the global community for builders of the physical future. Established 2023. Join 1,200+ hardware engineers, founders, and makers.",
  keywords: ["hardware community", "hardware engineering", "AI hardware", "robotics community", "embedded systems", "Silicon Valley"],
  alternates: {
    canonical: "https://nexthardware.io/about",
  },
  openGraph: {
    title: "About | Next Hardware",
    description: "Learn about Next Hardware - the global community for builders of the physical future. Established 2023. Join 1,200+ hardware engineers, founders, and makers.",
    url: "https://nexthardware.io/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About | Next Hardware",
    description: "Learn about Next Hardware - the global community for builders of the physical future.",
  },
};

export default async function AboutPage() {
  const locale = await getServerLocale();
  const t = getTranslations(locale);
  
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            {t.about.title}
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {t.about.subtitle}
          </p>
        </motion.div>

        <div className="border border-slate-200 rounded-lg p-8 lg:p-12 space-y-8 text-slate-600 bg-white">
          {/* Origin Story */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.about.ourStory.title}</h2>
            <p className="mb-4 leading-relaxed">
              {t.about.ourStory.p1}
            </p>
            <p className="mb-4 leading-relaxed">
              {t.about.ourStory.p2}
            </p>
            <p className="mb-4 leading-relaxed">
              {t.about.ourStory.p3}
            </p>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.about.ourMission.title}</h2>
            <p className="mb-4 leading-relaxed">
              {t.about.ourMission.p1}
            </p>
            <p className="mb-4 leading-relaxed">
              {t.about.ourMission.p2}
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              {t.about.ourMission.list.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.about.ourValues.title}</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.ourValues.buildingInPublic.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.about.ourValues.buildingInPublic.description}
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.ourValues.technicalExcellence.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.about.ourValues.technicalExcellence.description}
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.ourValues.inclusiveCommunity.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.about.ourValues.inclusiveCommunity.description}
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.ourValues.practicalImpact.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.about.ourValues.practicalImpact.description}
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.about.whatWeDo.title}</h2>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.whatWeDo.communityEvents.title}</h3>
                <p className="leading-relaxed">
                  {t.about.whatWeDo.communityEvents.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.whatWeDo.projectShowcases.title}</h3>
                <p className="leading-relaxed">
                  {t.about.whatWeDo.projectShowcases.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.whatWeDo.knowledgeSharing.title}</h3>
                <p className="leading-relaxed">
                  {t.about.whatWeDo.knowledgeSharing.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.about.whatWeDo.networking.title}</h3>
                <p className="leading-relaxed">
                  {t.about.whatWeDo.networking.description}
                </p>
              </div>
            </div>
          </section>

          {/* Milestones */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.about.milestones.title}</h2>
            <div className="space-y-4 mb-4">
              <div className="border-l-4 border-slate-900 pl-4">
                <div className="text-sm font-semibold text-slate-500 mb-1">{t.about.milestones.m2023.year}</div>
                <div className="font-semibold text-slate-900 mb-1">{t.about.milestones.m2023.title}</div>
                <p className="text-sm leading-relaxed">{t.about.milestones.m2023.description}</p>
              </div>
              <div className="border-l-4 border-slate-900 pl-4">
                <div className="text-sm font-semibold text-slate-500 mb-1">{t.about.milestones.m2024.year}</div>
                <div className="font-semibold text-slate-900 mb-1">{t.about.milestones.m2024.title}</div>
                <p className="text-sm leading-relaxed">{t.about.milestones.m2024.description}</p>
              </div>
              <div className="border-l-4 border-slate-900 pl-4">
                <div className="text-sm font-semibold text-slate-500 mb-1">{t.about.milestones.m2025.year}</div>
                <div className="font-semibold text-slate-900 mb-1">{t.about.milestones.m2025.title}</div>
                <p className="text-sm leading-relaxed">{t.about.milestones.m2025.description}</p>
              </div>
            </div>
          </section>

          {/* Join CTA */}
          <section className="mt-12 pt-8 border-t border-slate-200">
            <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.about.joinCta.title}</h2>
              <p className="mb-6 text-slate-600">
                {t.about.joinCta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://luma.com/NextHardware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
                >
                  {t.about.joinCta.joinLuma}
                </a>
                <a
                  href="https://discord.gg/d5dTjjVD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
                >
                  {t.about.joinCta.joinDiscord}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

