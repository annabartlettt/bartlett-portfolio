import { defineQuery } from "next-sanity";

// All projects for the cabinet grid (light projection)
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(order asc, folderNumber asc) {
    _id,
    title,
    "slug": slug.current,
    folderNumber,
    invisibleSystem,
    madeTangible,
    themeTags,
    brand,
    featured,
    priority,
    coverImage,
    "category": category->{ name, "slug": slug.current },
    "methods": methods[]->name
  }
`);

// One full project for a case-study page
export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    folderNumber,
    invisibleSystem,
    madeTangible,
    themeTags,
    brand,
    priority,
    coverImage,
    role,
    timeline,
    team,
    coverHeadline,
    coverSub,
    notes,
    "category": category->{ name, "slug": slug.current },
    "methods": methods[]->name,
    sections[]{
      number, kicker, title, body, rhythm, accent, image,
      stats[]{ value, label },
      drawer{ label, content }
    }
  }
`);

// Slugs for static generation
export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`);

// Categories = the invisible-system filter tabs
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(name asc){ _id, name, "slug": slug.current, description }
`);

// Singleton site settings (about / thinking / contact)
export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{ title, tagline, about, thinking, email, links[]{ label, url } }
`);
