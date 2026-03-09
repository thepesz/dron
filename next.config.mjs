import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year (CDN / ISR / browser).
    // Next.js serves images via /_next/image which re-validates
    // based on this TTL. Setting it high is safe because the URL
    // changes whenever the source image changes.
    minimumCacheTTL: 31536000,
  },

  /**
   * HTTP caching headers for static assets.
   * - /images/* — source images served directly (bypass /_next/image)
   * - /videos/* — hero background video
   * - Common static file extensions (fonts, favicons, manifests)
   * - /_next/static/* — Next.js hashed JS/CSS bundles (immutable)
   */
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Fonts, favicons, manifest, webp/avif assets
        source: "/:path*.(ico|svg|png|jpg|jpeg|webp|avif|woff|woff2|webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
