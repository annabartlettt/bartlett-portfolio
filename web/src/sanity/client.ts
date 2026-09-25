import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Local draft preview: run with SANITY_PREVIEW_DRAFTS=1 to read unpublished
// Studio edits. The token is a server-only variable, so it never reaches the
// browser, and production builds leave the flag unset and read published content.
const previewDrafts =
  process.env.SANITY_PREVIEW_DRAFTS === "1" && !!process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // fresh reads for SSR / static generation
  ...(previewDrafts
    ? { token: process.env.SANITY_API_READ_TOKEN, perspective: "drafts" as const }
    : {}),
});
