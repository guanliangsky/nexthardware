import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { getServerLocale } from "@/lib/getServerLocale";
import { useTranslations } from "@/lib/useTranslations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Next Hardware",
  description: "News, updates, and insights from the Next Hardware community. Event recaps, technical articles, and member spotlights.",
  keywords: ["hardware blog", "hardware news", "AI hardware", "robotics", "embedded systems", "hardware engineering"],
  alternates: {
    canonical: "https://nexthardware.io/blog",
  },
  openGraph: {
    title: "Blog | Next Hardware",
    description: "News, updates, and insights from the Next Hardware community. Event recaps, technical articles, and member spotlights.",
    url: "https://nexthardware.io/blog",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog | Next Hardware",
    description: "News, updates, and insights from the Next Hardware community.",
  },
};

export default async function BlogPage() {
  const locale = await getServerLocale();
  const t = useTranslations(locale);
  const blogPosts = getAllBlogPosts();

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
            {t.blog.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
            {t.blog.subtitle}
          </p>
          <Link
            href="/feed.xml"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            aria-label={t.accessibility.subscribeToRssFeed}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.429 2.571c0 1.893 1.536 3.429 3.429 3.429v1.714C4.536 7.714 2 5.178 2 2.571h1.429zM7.714 2.571c0 .947.768 1.714 1.714 1.714v1.714c-1.893 0-3.429-1.536-3.429-3.429h1.714zM11.143 2.571c0 .395.32.714.714.714v1.714c-1.893 0-3.429-1.536-3.429-3.429h2.714z" />
              <path d="M2 10.286c0 4.411 3.575 8 8 8s8-3.589 8-8-3.575-8-8-8-8 3.589-8 8zm8 5.714c-3.161 0-5.714-2.553-5.714-5.714S6.839 4.571 10 4.571 15.714 7.125 15.714 10.286 13.161 16 10 16z" />
              <circle cx="10" cy="10.286" r="1.143" />
            </svg>
            {t.blog.subscribeRss}
          </Link>
        </motion.div>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="border-b border-slate-200 pb-8 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`} className="block group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sm text-slate-500">
                    {post.date}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sm text-slate-500">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-slate-900 group-hover:text-slate-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
                  {t.blog.readMore} →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

