/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { motion } from "framer-motion";
import { getServerLocale } from "@/lib/getServerLocale";
import { useTranslations } from "@/lib/useTranslations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ | Next Hardware",
  description: "Frequently asked questions about Next Hardware community. Learn about membership, events, projects, and how to get involved.",
  keywords: ["FAQ", "hardware community", "membership", "events", "hardware projects", "community questions"],
  alternates: {
    canonical: "https://nexthardware.io/faq",
  },
  openGraph: {
    title: "FAQ | Next Hardware",
    description: "Frequently asked questions about Next Hardware community.",
    url: "https://nexthardware.io/faq",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQ | Next Hardware",
    description: "Frequently asked questions about Next Hardware community.",
  },
};

const faqCategories = [
  {
    key: "general",
    questionKeys: ["whatIs", "whoCanJoin", "membershipFee", "whereBased"],
  },
  {
    key: "events",
    questionKeys: ["whatEvents", "howOftenEvents", "needRegister", "eventsInPerson"],
  },
  {
    key: "projects",
    questionKeys: ["shareProject", "findCollaborators", "helpFunding", "projectTypes"],
  },
  {
    key: "community",
    questionKeys: ["connectMembers", "mentorship", "partnerships", "contribute"],
  },
  {
    key: "technical",
    questionKeys: ["technicalTopics", "needExpert", "learningResources", "presentResearch"],
  },
];

export default async function FAQPage() {
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
            {t.faq.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-2">
                {t.faq.categories[category.key]}
              </h2>
              <div className="space-y-6">
                {category.questionKeys.map((questionKey, index) => {
                  const qa = t.faq.questions[questionKey];
                  return (
                    <motion.div
                      key={questionKey}
                      className="border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + index * 0.05 }}
                    >
                      <h3 className="text-lg font-semibold mb-3 text-slate-900">
                        {qa.q}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {qa.a}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Still have questions? */}
        <motion.section
          className="mt-16 pt-12 border-t border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">
              {t.faq.stillHaveQuestions.title}
            </h2>
            <p className="mb-6 text-slate-600">
              {t.faq.stillHaveQuestions.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/d5dTjjVD"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
              >
                {t.faq.stillHaveQuestions.joinDiscord}
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm"
              >
                {t.faq.stillHaveQuestions.contactUs}
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}



