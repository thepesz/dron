import Link from "next/link";

/**
 * Locale-aware 404 page. Provides a minimal, on-brand not-found screen
 * with a link back to the homepage.
 */
export default function NotFound() {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans text-zinc-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-brand-500">404</h1>
          <p className="mt-4 text-xl text-zinc-400">
            Page not found / Strona nie znaleziona / Seite nicht gefunden
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-500"
          >
            &larr; Home
          </Link>
        </div>
      </body>
    </html>
  );
}
