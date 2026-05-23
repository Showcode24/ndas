// lib/sanity/queries/gallery.ts
// GROQ queries and TypeScript types — field paths match gallery.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── gallery page (singleton) ──────────── */

export const GALLERY_PAGE_QUERY = groq`
  *[_type == "galleryPage"][0] {
    hero {
      eyebrow,
      heading,
      subheading,
      breadcrumbs,
    },
    filters {
      categories,
    },
    cta {
      heading,
      subheading,
      primaryCta   { label, href },
      secondaryCta { label, href },
    },
  }
`;

/* ─────────────────────────── all images (listing) ──────────────── */

export const ALL_GALLERY_IMAGES_QUERY = groq`
  *[_type == "galleryImage"] | order(featured desc, date desc) {
    _id,
    title,
    "image": image.asset->url,
    "imageWidth":  image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    category,
    date,
    alt,
    featured,
  }
`;

/* ─────────────────────────── by category ───────────────────────── */

export const GALLERY_BY_CATEGORY_QUERY = groq`
  *[_type == "galleryImage" && category == $category] | order(featured desc, date desc) {
    _id,
    title,
    "image": image.asset->url,
    "imageWidth":  image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    category,
    date,
    alt,
    featured,
  }
`;

/* ─────────────────────────── types ─────────────────────────────── */

export type GalleryCategory =
  | "Events"
  | "Facilities"
  | "Training"
  | "Graduation"
  | "Sports";

export interface GalleryImageItem {
  _id:         string;
  title:       string;
  image:       string | null;
  imageWidth:  number | null;
  imageHeight: number | null;
  category:    GalleryCategory;
  date:        string;        // ISO date string from Sanity
  alt:         string | null;
  featured:    boolean;
}

export interface GalleryPageData {
  hero: {
    eyebrow:     string;
    heading:     string;
    subheading:  string;
    breadcrumbs: string;
  };

  filters: {
    categories: string[];
  };

  cta: {
    heading:      string;
    subheading:   string;
    primaryCta:   { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}
