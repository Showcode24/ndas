// lib/sanity/queries/facilities.ts
// GROQ query and TypeScript types — field paths match facilities.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── query ─────────────────────────────── */

export const FACILITIES_PAGE_QUERY = groq`
  *[_type == "facilitiesPage"][0] {

    // ── hero ──────────────────────────────────────────────────────
    hero {
      eyebrow,
      title,
      description,
      breadcrumbs,
    },

    // ── trainingEnvironment ───────────────────────────────────────
    trainingEnvironment {
      title,
      description,
    },

    // ── facilities ────────────────────────────────────────────────
    facilities[] {
      id,
      name,
      category,
      description,
      "image": image.asset->url,
    },

    // ── highlights ────────────────────────────────────────────────
    highlights[] {
      title,
      desc,
      iconKey,
    },

    // ── extendedContext ───────────────────────────────────────────
    extendedContext {
      eyebrow,
      title,
      description,
      cta { text, link },
    },
  }
`;

/* ─────────────────────────── types ─────────────────────────────── */

export interface FacilityCard {
  id:          string;
  name:        string;
  category:    "Workshop" | "Laboratory" | "Simulation" | "Support";
  description: string;
  image:       string | null;
}

export interface FacilityHighlight {
  title:   string;
  desc:    string;
  iconKey: "Ship" | "Settings" | "Zap" | "Library" | "Wrench" | "Shield";
}

export interface FacilitiesPageData {
  hero: {
    eyebrow:     string;
    title:       string;
    description: string;
    breadcrumbs: string;
  };

  trainingEnvironment: {
    title:       string;
    description: string;
  };

  facilities: FacilityCard[];

  highlights: FacilityHighlight[];

  extendedContext: {
    eyebrow:     string;
    title:       string;
    description: string;
    cta:         { text: string; link: string };
  };
}
