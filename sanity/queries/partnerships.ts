// lib/sanity/queries/partnerships.ts
// GROQ query and TypeScript types — field paths match partnerships.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── query ─────────────────────────────── */

export const PARTNERSHIPS_PAGE_QUERY = groq`
  *[_type == "partnershipsPage"][0] {

    // ── hero ──────────────────────────────────────────────────────
    hero {
      badge,
      heading { main, highlight },
      subheading,
    },

    // ── partnershipApproach ───────────────────────────────────────
    partnershipApproach {
      eyebrow,
      heading,
      body,
    },

    // ── partners ──────────────────────────────────────────────────
    partners[] {
      name,
      description,
      category,
      "logo": logo.asset->url,
    },

    // ── cta ───────────────────────────────────────────────────────
    cta {
      heading,
      subheading,
      primaryCta   { label, href },
      secondaryCta { label, href },
    },
  }
`;

/* ─────────────────────────── types ─────────────────────────────── */

export interface PartnerCard {
  name:        string;
  description: string;
  category:    string;
  logo:        string | null;
}

export interface PartnershipsPageData {
  hero: {
    badge:      string;
    heading:    { main: string; highlight: string };
    subheading: string;
  };

  partnershipApproach: {
    eyebrow: string;
    heading: string;
    body:    string[];
  };

  partners: PartnerCard[];

  cta: {
    heading:      string;
    subheading:   string;
    primaryCta:   { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}
