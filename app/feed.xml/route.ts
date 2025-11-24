import { getAllBlogPosts } from "@/lib/blog-posts";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://nexthardware.io";
  const posts = getAllBlogPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Next Hardware Blog</title>
    <description>News, updates, and insights from the Next Hardware community. Event recaps, technical articles, and member spotlights.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    ${posts
      .map(
        (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.id}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${post.author ? `<author>${post.author}</author>` : ""}
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}



