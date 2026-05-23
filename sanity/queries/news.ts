// lib/sanity/queries/news.ts
// GROQ queries and TypeScript types — field paths match news.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── news page (singleton) ─────────────── */

export const NEWS_PAGE_QUERY = groq`
  *[_type == "newsPage"][0] {
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

/* ─────────────────────────── all posts (listing) ───────────────── */

export const ALL_NEWS_POSTS_QUERY = groq`
  *[_type == "newsPost"] | order(featured desc, date desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    postType,
    date,
    excerpt,
    location,
    featured,
    "image": image.asset->url,
  }
`;

/* ─────────────────────────── single post (detail) ──────────────── */

export const NEWS_POST_BY_SLUG_QUERY = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    postType,
    date,
    excerpt,
    body,
    location,
    featured,
    "image": image.asset->url,
  }
`;

/* ─────────────────────────── types ─────────────────────────────── */

export type PostType = "news" | "event";

export type NewsCategory =
  | "Achievement"
  | "Facility"
  | "Partnership"
  | "Academic"
  | "Sports"
  | "Cultural"
  | "Technical"
  | "Announcement";

export interface NewsPostSummary {
  _id:      string;
  title:    string;
  slug:     string;
  category: NewsCategory;
  postType: PostType;
  date:     string;        // ISO date string from Sanity
  excerpt:  string;
  location: string | null; // events only
  featured: boolean;
  image:    string | null;
}

export interface NewsPostDetail extends NewsPostSummary {
  body: string;
}

export interface NewsPageData {
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
