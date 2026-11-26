import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// The site is fully prerendered, so it uses a CSP without nonces (see the Next.js CSP guide).
// 'unsafe-eval' is only needed by React's dev tooling.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // browsers ignore HSTS over plain http, so this is safe locally and enforced on the live site
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Shining Jackets became Bomber Jackets; keep old links working for visitors and search engines.
  async redirects() {
    return [
      { source: "/products/shining-jackets", destination: "/products/bomber-jackets", permanent: true },
      { source: "/products/shining-jackets/was-2301", destination: "/products/bomber-jackets/was-2701", permanent: true },
      { source: "/products/shining-jackets/was-2302", destination: "/products/bomber-jackets/was-2702", permanent: true },
      { source: "/products/shining-jackets/:slug", destination: "/products/bomber-jackets", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
