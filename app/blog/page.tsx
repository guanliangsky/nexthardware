import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Blog | Next Hardware",
  description: "News, updates, and insights from the Next Hardware community. Event recaps, technical articles, and member spotlights.",
};

// AI-Generated blog posts spanning 2023-2025
const blogPosts = [
  {
    id: 1,
    title: "Next Hardware Hack 2024: Building the Future in 48 Hours",
    excerpt: "Recap of our largest hackathon yet - 300+ participants, 50+ projects, and $25,000 in prizes. Winning teams showcased innovative edge AI devices, robotics controllers, and AR hardware prototypes.",
    date: "October 15, 2024",
    category: "Events",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Rise of Edge AI: Community Insights from 2024",
    excerpt: "Our community's perspective on the shift toward edge computing. Engineers from Google, NVIDIA, and Apple share their experiences deploying AI models on custom hardware and embedded systems.",
    date: "August 22, 2024",
    category: "Technical",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Member Spotlight: How a Next Hardware Connection Led to a $2M Seed Round",
    excerpt: "Alex Kim, founder of RoboTech Systems, shares how meeting his co-founder at a Next Hardware meetup led to launching a robotics startup that just closed its seed funding round.",
    date: "June 10, 2024",
    category: "Community",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Custom Silicon Workshop: What We Learned",
    excerpt: "Deep dive into our ASIC design workshop with 80+ engineers. Industry experts from Google and NVIDIA taught chip design fundamentals, RTL synthesis, and the tape-out process.",
    date: "April 5, 2024",
    category: "Learning",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Reaching 1,000 Members: A Community Milestone",
    excerpt: "Reflecting on our growth from 50 members in 2023 to over 1,000 in early 2024. What we've learned about building a hardware community and the projects that have emerged.",
    date: "February 18, 2024",
    category: "Community",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Next Hardware Summit 2023: Highlights and Takeaways",
    excerpt: "Our first annual summit brought together 200+ hardware engineers, researchers, and founders. Keynotes on spatial computing, embodied AI, and the future of edge hardware.",
    date: "December 8, 2023",
    category: "Events",
    readTime: "6 min read",
  },
  {
    id: 7,
    title: "Building Hardware Communities: Lessons from Year One",
    excerpt: "What we've learned in our first year about fostering collaboration, sharing knowledge, and connecting hardware engineers across companies and universities.",
    date: "September 20, 2023",
    category: "Community",
    readTime: "7 min read",
  },
  {
    id: 8,
    title: "First Hackathon Success: 120 Engineers, 30 Projects",
    excerpt: "Recap of our inaugural hardware hackathon. Teams built everything from AI-powered sensors to robotics controllers. Three projects received funding offers from VCs in attendance.",
    date: "May 12, 2023",
    category: "Events",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
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
            Blog
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            News, updates, and insights from the Next Hardware community
          </p>
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
                  Read more →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

