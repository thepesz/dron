"use client";

/**
 * Renders an email address as a clickable mailto link,
 * assembled via JavaScript to prevent scraper harvesting.
 * Bots scanning static HTML see only data attributes — not a plain email string.
 */
interface ObfuscatedEmailProps {
  user: string;   // part before @
  domain: string; // part after @
  className?: string;
}

export function ObfuscatedEmail({ user, domain, className }: ObfuscatedEmailProps) {
  const email = `${user}@${domain}`;
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
