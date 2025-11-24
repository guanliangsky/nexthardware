import Link from "next/link";
import { BlogPost } from "@/lib/blog-posts";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: number;
}

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <h2 className="text-2xl font-semibold mb-6 text-slate-900">Related Posts</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">{post.readTime}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 group-hover:text-slate-700 transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {post.excerpt}
            </p>
            <span className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}



