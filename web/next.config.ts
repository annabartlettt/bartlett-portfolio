import type { NextConfig } from "next";

// Deployed on Vercel · Root Directory = web · Framework Preset = Next.js
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old bartlettanna.com /projects/* → new /work/* (301, preserve SEO)
      {
        source: "/projects/global-mode-cross-cultural-music-discovery-for-spotify",
        destination: "/work/spotify-global-mode",
        permanent: true,
      },
      {
        source: "/projects/financial-blueprint-on-demand-financial-education-for-gen-z",
        destination: "/work/financial-blueprint",
        permanent: true,
      },
      {
        source: "/projects/anoxity-reframing-anxiety-through-curiosity-driven-design",
        destination: "/work/anosity",
        permanent: true,
      },
      {
        source: "/projects/central-co-op-brand-development",
        destination: "/work/central-co-op",
        permanent: true,
      },
      {
        source: "/projects/central-co-op-social-media-growth",
        destination: "/work/central-co-op",
        permanent: true,
      },
      {
        source: "/projects/central-co-op-student-focus-group-research",
        destination: "/work/central-co-op",
        permanent: true,
      },
      { source: "/projects/about-me", destination: "/about", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      // Fallback for any un-migrated project (e.g. Vetted) — soft redirect home
      { source: "/projects/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
