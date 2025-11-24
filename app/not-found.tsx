import Link from "next/link";
import { getServerLocale } from "@/lib/getServerLocale";
import { useTranslations } from "@/lib/useTranslations";

export default async function NotFound() {
  const locale = await getServerLocale();
  const t = useTranslations(locale);
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4 text-slate-900">{t.notFound.title}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">{t.notFound.heading}</h2>
        <p className="text-slate-600 mb-8">
          {t.notFound.message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors"
          >
            {t.notFound.goHome}
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors"
          >
            {t.notFound.viewBlog}
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">{t.notFound.popularPages}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t.nav.about}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/resources" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t.nav.resources}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/#events" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t.nav.events}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/#contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

