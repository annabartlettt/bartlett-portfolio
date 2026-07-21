import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { PROJECT_SLUGS_QUERY } from "@/sanity/queries";

const BASE = "https://bartlettanna.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);

  const staticRoutes = ["", "/thinking", "/about", "/contact"].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
  }));

  const work = (slugs ?? []).map((s) => ({
    url: `${BASE}/work/${s.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...work];
}
