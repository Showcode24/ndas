// lib/sanity/queries/home.ts
// GROQ query and TypeScript types — field paths match home.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── query ─────────────────────────────── */

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {

    // ── heroSlides ────────────────────────────────────────────────
    heroSlides[] {
      heading,
      subheading,
      "image": image.asset->url,
      primaryCta   { label, href },
      secondaryCta { label, href },
    },

    // ── about ─────────────────────────────────────────────────────
    about {
      eyebrow,
      heading,
      body,
      primaryCta   { label, href },
      secondaryCta { label, href },
    },

    // ── stats ─────────────────────────────────────────────────────
    stats {
      badge,
      heading { prefix, highlight, suffix },
      subheading,
      items[] { value, label },
    },

    // ── programs ──────────────────────────────────────────────────
    programs {
      eyebrow,
      heading,
      viewAllCta   { label, href },
      displayCount,
    },

    // ── features ──────────────────────────────────────────────────
    features {
      eyebrow,
      heading,
      items[] { title, description },
    },

    // ── events ────────────────────────────────────────────────────
    events {
      heading,
      body,
      primaryCta   { label, href },
      displayCount,
    },

    // ── cta ───────────────────────────────────────────────────────
    cta {
      badge,
      heading,
      subheading,
      primaryCta   { label, href },
      secondaryCta { label, href },
    },
  }
`;

/* ─────────────────────────── types ─────────────────────────────── */

export interface HomeHeroSlide {
  heading:      string;
  subheading:   string;
  image:        string | null;
  primaryCta:   { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface HomeStatItem {
  value: string;
  label: string;
}

export interface HomeFeatureItem {
  title:       string;
  description: string;
}

export interface HomePageData {
  heroSlides: HomeHeroSlide[];

  about: {
    eyebrow:      string;
    heading:      string;
    body:         string;
    primaryCta:   { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };

  stats: {
    badge:      string;
    heading:    { prefix: string; highlight: string; suffix: string };
    subheading: string;
    items:      HomeStatItem[];
  };

  programs: {
    eyebrow:      string;
    heading:      string;
    viewAllCta:   { label: string; href: string };
    displayCount: number;
  };

  features: {
    eyebrow: string;
    heading: string;
    items:   HomeFeatureItem[];
  };

  events: {
    heading:      string;
    body:         string;
    primaryCta:   { label: string; href: string };
    displayCount: number;
  };

  cta: {
    badge:        string;
    heading:      string;
    subheading:   string;
    primaryCta:   { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}
