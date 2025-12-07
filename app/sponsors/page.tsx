"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function SponsorsPage() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);

  const stats = [
    { value: t.sponsors.heroStats.members, label: t.sponsors.heroStats.membersLabel },
    { value: t.sponsors.heroStats.companies, label: t.sponsors.heroStats.companiesLabel },
    { value: t.sponsors.heroStats.events, label: t.sponsors.heroStats.eventsLabel },
    { value: t.sponsors.heroStats.projects, label: t.sponsors.heroStats.projectsLabel },
  ];

  const audience = [
    {
      title: t.sponsors.audience.engineers.title,
      description: t.sponsors.audience.engineers.description,
      icon: "⚙️",
    },
    {
      title: t.sponsors.audience.founders.title,
      description: t.sponsors.audience.founders.description,
      icon: "🚀",
    },
    {
      title: t.sponsors.audience.researchers.title,
      description: t.sponsors.audience.researchers.description,
      icon: "🔬",
    },
    {
      title: t.sponsors.audience.investors.title,
      description: t.sponsors.audience.investors.description,
      icon: "💰",
    },
  ];

  const benefits = [
    {
      title: t.sponsors.benefits.community.title,
      description: t.sponsors.benefits.community.description,
      icon: "👥",
    },
    {
      title: t.sponsors.benefits.visibility.title,
      description: t.sponsors.benefits.visibility.description,
      icon: "📢",
    },
    {
      title: t.sponsors.benefits.events.title,
      description: t.sponsors.benefits.events.description,
      icon: "🎉",
    },
    {
      title: t.sponsors.benefits.network.title,
      description: t.sponsors.benefits.network.description,
      icon: "🌐",
    },
    {
      title: t.sponsors.benefits.roi.title,
      description: t.sponsors.benefits.roi.description,
      icon: "📈",
    },
    {
      title: t.sponsors.benefits.brand.title,
      description: t.sponsors.benefits.brand.description,
      icon: "⭐",
    },
  ];

  const packages = [
    {
      name: t.sponsors.packages.tiers.startup.name,
      price: t.sponsors.packages.tiers.startup.price,
      features: t.sponsors.packages.tiers.startup.features,
      highlight: false,
    },
    {
      name: t.sponsors.packages.tiers.growth.name,
      price: t.sponsors.packages.tiers.growth.price,
      features: t.sponsors.packages.tiers.growth.features,
      highlight: true,
    },
    {
      name: t.sponsors.packages.tiers.enterprise.name,
      price: t.sponsors.packages.tiers.enterprise.price,
      features: t.sponsors.packages.tiers.enterprise.features,
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
              {t.sponsors.title}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-4">
              {t.sponsors.subtitle}
            </p>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
              {t.sponsors.description}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white rounded-lg border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
              {t.sponsors.audience.title}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t.sponsors.audience.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audience.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-3xl sm:text-4xl font-semibold text-center mb-12 text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.sponsors.benefits.title}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-slate-900">
              {t.sponsors.packages.title}
            </h2>
            <p className="text-lg text-slate-600 mb-2">
              {t.sponsors.packages.description}
            </p>
            <p className="text-sm text-slate-500">
              {t.sponsors.packages.contact}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`p-8 rounded-lg border-2 ${
                  pkg.highlight
                    ? "border-slate-900 bg-slate-900 text-white shadow-xl scale-105"
                    : "border-slate-200 bg-white"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className={`text-2xl font-bold mb-2 ${pkg.highlight ? "text-white" : "text-slate-900"}`}>
                  {pkg.name}
                </h3>
                <div className={`text-xl font-semibold mb-6 ${pkg.highlight ? "text-slate-300" : "text-slate-600"}`}>
                  {pkg.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start text-sm ${pkg.highlight ? "text-slate-200" : "text-slate-600"}`}>
                      <span className="mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-slate-900">
              {t.sponsors.testimonials.title}
            </h2>
            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">
                &ldquo;{t.sponsors.testimonials.quote}&rdquo;
              </p>
              <p className="text-sm text-slate-600 font-medium">
                — {t.sponsors.testimonials.author}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              {t.sponsors.cta.title}
            </h2>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              {t.sponsors.cta.description}
            </p>
            <p className="text-sm text-slate-400 mb-8 font-medium">
              {t.sponsors.cta.urgency}
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-slate-900 font-semibold rounded-md hover:bg-slate-100 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t.sponsors.cta.button}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

