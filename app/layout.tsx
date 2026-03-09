import type { ReactNode } from "react";

/**
 * Root layout. Intentionally minimal - the [locale] layout handles
 * html lang, fonts, metadata, and all provider wrappers.
 * This exists as the required top-level layout for Next.js App Router.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
