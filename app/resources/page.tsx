/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { motion } from "framer-motion";
import { getServerLocale } from "@/lib/getServerLocale";
import { useTranslations } from "@/lib/useTranslations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources | Next Hardware",
  description: "Resources for hardware builders: getting started guides, tools, documentation, and community guidelines for Next Hardware community.",
  keywords: ["hardware resources", "PCB design", "embedded systems", "hardware tools", "hardware documentation", "hardware community"],
  alternates: {
    canonical: "https://nexthardware.io/resources",
  },
  openGraph: {
    title: "Resources | Next Hardware",
    description: "Resources for hardware builders: getting started guides, tools, documentation, and community guidelines.",
    url: "https://nexthardware.io/resources",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Resources | Next Hardware",
    description: "Resources for hardware builders: getting started guides, tools, and documentation.",
  },
};

export default async function ResourcesPage() {
  const locale = await getServerLocale();
  const t = useTranslations(locale);
  
  const resources = [
    {
      category: "gettingStarted",
      items: [
        {
          key: "newToHardware",
          link: "#",
        },
        {
          key: "communityGuidelines",
          link: "#",
        },
        {
          key: "howToJoinEvents",
          link: "https://luma.com/NextHardware",
        },
      ],
    },
    {
      category: "toolsPlatforms",
      items: [
        {
          key: "pcbDesign",
          link: "#",
        },
        {
          key: "embeddedDev",
          link: "#",
        },
        {
          key: "threeDPrinting",
          link: "#",
        },
        {
          key: "simulation",
          link: "#",
        },
      ],
    },
    {
      category: "learningResources",
      items: [
        {
          key: "hardwareBasics",
          link: "#",
        },
        {
          key: "aiHardware",
          link: "#",
        },
        {
          key: "robotics",
          link: "#",
        },
        {
          key: "arvr",
          link: "#",
        },
      ],
    },
    {
      category: "community",
      items: [
        {
          key: "discord",
          link: "https://discord.gg/d5dTjjVD",
        },
        {
          key: "eventCalendar",
          link: "https://luma.com/NextHardware",
        },
        {
          key: "projectShowcases",
          link: "#showcase",
        },
        {
          key: "newsletter",
          link: "#newsletter",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            {t.resources.title}
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {t.resources.subtitle}
          </p>
        </motion.div>

        <div className="space-y-12">
          {resources.map((section, sectionIndex) => (
            <motion.section
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-2">
                {t.resources.categories[section.category]}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => {
                  const resourceData = t.resources[section.category][item.key];
                  return (
                    <motion.a
                      key={item.key}
                      href={item.link}
                      className="block border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-sm transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                    >
                      <h3 className="text-lg font-semibold mb-2 text-slate-900">
                        {resourceData.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {resourceData.description}
                      </p>
                    </motion.a>
                  );
                })}
              </div>
            </motion.section>
          ))}

          {/* Community Guidelines */}
          <motion.section
            className="border border-slate-200 rounded-lg p-8 lg:p-12 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900">{t.resources.communityGuidelines.title}</h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.resources.communityGuidelines.beRespectful.title}</h3>
                <p className="leading-relaxed">
                  {t.resources.communityGuidelines.beRespectful.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.resources.communityGuidelines.shareKnowledge.title}</h3>
                <p className="leading-relaxed">
                  {t.resources.communityGuidelines.shareKnowledge.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.resources.communityGuidelines.keepItTechnical.title}</h3>
                <p className="leading-relaxed">
                  {t.resources.communityGuidelines.keepItTechnical.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.resources.communityGuidelines.noSpam.title}</h3>
                <p className="leading-relaxed">
                  {t.resources.communityGuidelines.noSpam.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{t.resources.communityGuidelines.respectIP.title}</h3>
                <p className="leading-relaxed">
                  {t.resources.communityGuidelines.respectIP.description}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact for Resources */}
          <motion.section
            className="mt-12 pt-8 border-t border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.resources.shareResource.title}</h2>
              <p className="mb-6 text-slate-600">
                {t.resources.shareResource.description}
              </p>
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
              >
                {t.resources.shareResource.contactUs}
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

