export type Brand = {
  primary?: string;
  secondary?: string;
  tint?: string;
  onDark?: string;
};

export type SanityImage = {
  _type?: string;
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type Stat = { value?: string; label?: string };

export type Drawer = { label?: string; content?: unknown[] };

export type Section = {
  _key?: string;
  number?: string;
  kicker?: string;
  title?: string;
  body?: unknown[];
  rhythm?: string;
  accent?: string;
  image?: SanityImage;
  stats?: Stat[];
  drawer?: Drawer;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  folderNumber?: string;
  invisibleSystem?: string;
  madeTangible?: string;
  themeTags?: string[];
  brand?: Brand;
  featured?: boolean;
  priority?: "flagship" | "support" | "archive";
  coverImage?: SanityImage;
  role?: string;
  timeline?: string;
  team?: string;
  coverHeadline?: string;
  coverSub?: string;
  notes?: unknown[];
  category?: { name?: string; slug?: string };
  methods?: string[];
  sections?: Section[];
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};
