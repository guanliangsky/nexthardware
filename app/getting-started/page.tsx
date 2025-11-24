/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { getServerLocale } from "@/lib/getServerLocale";
import { useTranslations } from "@/lib/useTranslations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Getting Started | Next Hardware",
  description: "New to Next Hardware? Learn how to join, participate in events, share projects, and get the most out of our hardware community.",
  keywords: ["getting started", "how to join", "hardware community", "new member", "community guide"],
  alternates: {
    canonical: "https://nexthardware.io/getting-started",
  },
  openGraph: {
    title: "Getting Started | Next Hardware",
    description: "New to Next Hardware? Learn how to join and get involved.",
    url: "https://nexthardware.io/getting-started",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Getting Started | Next Hardware",
    description: "New to Next Hardware? Learn how to join and get involved.",
  },
};

const stepKeys = ["step1", "step2", "step3", "step4"];
const resourceKeys = ["communityGuidelines", "faq", "resources", "blog"];

export default async function GettingStartedPage() {
  const locale = await getServerLocale();
  const t = useTranslations(locale);
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            {t.gettingStarted.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.gettingStarted.subtitle}
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">{t.gettingStarted.quickStart.title}</h2>
            <p className="text-slate-600 mb-6">
              {t.gettingStarted.quickStart.description}
            </p>
            <ol className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <div>
                  <strong>{t.gettingStarted.quickStart.step1.label}</strong> {t.gettingStarted.quickStart.step1.text}
                  <a href="https://discord.gg/d5dTjjVD" target="_blank" rel="noopener noreferrer" className="ml-2 text-slate-900 underline">{t.gettingStarted.quickStart.step1.link}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <div>
                  <strong>{t.gettingStarted.quickStart.step2.label}</strong> {t.gettingStarted.quickStart.step2.text}
                  <a href="https://luma.com/NextHardware" target="_blank" rel="noopener noreferrer" className="ml-2 text-slate-900 underline">{t.gettingStarted.quickStart.step2.link}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <div>
                  <strong>{t.gettingStarted.quickStart.step3.label}</strong> {t.gettingStarted.quickStart.step3.text}
                  <a href="#newsletter" className="ml-2 text-slate-900 underline">{t.gettingStarted.quickStart.step3.link}</a>
                </div>
              </li>
            </ol>
          </div>
        </motion.section>

        {/* Steps */}
        <div className="space-y-12 mb-16">
          {stepKeys.map((stepKey, index) => {
            const step = t.gettingStarted.steps[stepKey];
            return (
              <motion.section
                key={stepKey}
                className="border border-slate-200 rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">
                      {step.title}
                    </h2>
                    <p className="text-slate-600 mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {step.details.map((detail: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                          <span className="text-slate-400 mt-1.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(step.links).map(([key, text]: [string, string]) => {
                        const hrefMap: Record<string, string> = {
                          joinDiscord: "https://discord.gg/d5dTjjVD",
                          viewEvents: "https://luma.com/NextHardware",
                          subscribe: "#newsletter",
                          eventGuidelines: "/resources",
                          viewProjects: "#showcase",
                          resources: "/resources",
                          contactUs: "/contact",
                        };
                        const external = !hrefMap[key]?.startsWith('/') && !hrefMap[key]?.startsWith('#');
                        return (
                          <a
                            key={key}
                            href={hrefMap[key]}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                          >
                            {text}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Resources */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-900">{t.gettingStarted.helpfulResources.title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resourceKeys.map((key) => {
              const resource = t.gettingStarted.helpfulResources[key];
              const hrefMap: Record<string, string> = {
                communityGuidelines: "/resources",
                faq: "/faq",
                resources: "/resources",
                blog: "/blog",
              };
              return (
                <Link
                  key={key}
                  href={hrefMap[key]}
                  className="block border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {resource.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-900">
            {t.gettingStarted.readyToStart.title}
          </h2>
          <p className="mb-6 text-slate-600">
            {t.gettingStarted.readyToStart.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/d5dTjjVD"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
            >
              {t.gettingStarted.readyToStart.joinDiscord}
            </a>
            <a
              href="https://luma.com/NextHardware"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
            >
              {t.gettingStarted.readyToStart.viewEvents}
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
            >
              {t.gettingStarted.readyToStart.contactUs}
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}



