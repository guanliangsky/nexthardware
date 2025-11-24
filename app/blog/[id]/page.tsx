import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts, getRelatedPosts } from "@/lib/blog-posts";
import Script from "next/script";
import SocialShare from "@/components/SocialShare";
import RelatedPosts from "@/components/RelatedPosts";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(Number(id));

  if (!post) {
    return {
      title: "Post Not Found | Next Hardware",
    };
  }

  const baseUrl = "https://nexthardware.io";
  const postUrl = `${baseUrl}/blog/${post.id}`;
  const publishedDate = new Date(post.date).toISOString();

  return {
    title: `${post.title} | Next Hardware Blog`,
    description: post.excerpt,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: [post.category, "hardware", "AI", "robotics", "embedded systems", "hardware engineering"],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: publishedDate,
      authors: post.author ? [post.author] : undefined,
      tags: [post.category, "hardware", "AI", "robotics"],
      siteName: "Next Hardware",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${baseUrl}/og-image.png`],
      creator: "@nexthardware",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = getBlogPost(Number(id));

  if (!post) {
    notFound();
  }

  const baseUrl = "https://nexthardware.io";
  const postUrl = `${baseUrl}/blog/${post.id}`;
  const publishedDate = new Date(post.date).toISOString();

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}/og-image.png`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Person",
      name: post.author || "Next Hardware Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Next Hardware",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: post.category,
    keywords: [post.category, "hardware", "AI", "robotics", "embedded systems"],
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          {/* Back Link */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-slate-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-900 font-medium" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-500">{post.date}</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-500">{post.readTime}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
              {post.title}
            </h1>
            {post.author && (
              <p className="text-sm text-slate-600">
                By {post.author}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div
            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Social Share */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <SocialShare
              url={postUrl}
              title={post.title}
              description={post.excerpt}
            />
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">
                  Published on {post.date}
                </p>
                {post.author && (
                  <p className="text-sm text-slate-500">
                    Written by {post.author}
                  </p>
                )}
              </div>
              <Link
                href="/blog"
                className="px-4 py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
              >
                View All Posts
              </Link>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        <RelatedPosts posts={getRelatedPosts(post.id)} currentPostId={post.id} />
      </div>
    </div>
    </>
  );
}

