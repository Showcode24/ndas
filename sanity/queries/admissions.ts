// lib/sanity/queries/admissions.ts
// GROQ query and TypeScript types — field paths match admissions.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── query ─────────────────────────────── */

export const ADMISSIONS_PAGE_QUERY = groq`
  *[_type == "admissionsPage"][0] {

    // ── hero ──────────────────────────────────────────────────────
    hero {
      breadcrumb,
      eyebrow,
      heading,
      subheading,
      cta { label, href },
    },

    // ── selection ─────────────────────────────────────────────────
    selection {
      heading,
      note,
      status { label, cycle },
      steps[] { step, title, desc, iconKey },
    },

    // ── eligibility ───────────────────────────────────────────────
    eligibility {
      heading { main, highlight },
      subheading,
      cta     { label, href },
      criteria[] { text },
    },

    // ── faq ───────────────────────────────────────────────────────
    faq {
      eyebrow,
      heading { main, sub },
      subheading,
      cta  { label, href },
      faqs[] { question, answer },
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

export interface AdmissionsStep {
  step:    string;
  title:   string;
  desc:    string;
  iconKey: "FileText" | "ClipboardList" | "UserCheck" | "Trophy";
}

export interface AdmissionsFaq {
  question: string;
  answer:   string;
}

export interface AdmissionsPageData {
  hero: {
    breadcrumb: string;
    eyebrow:    string;
    heading:    string;
    subheading: string;
    cta:        { label: string; href: string };
  };

  selection: {
    heading: string;
    note:    string;
    status:  { label: string; cycle: string };
    steps:   AdmissionsStep[];
  };

  eligibility: {
    heading:    { main: string; highlight: string };
    subheading: string;
    cta:        { label: string; href: string };
    criteria:   { text: string }[];
  };

  faq: {
    eyebrow:    string;
    heading:    { main: string; sub: string };
    subheading: string;
    cta:        { label: string; href: string };
    faqs:       AdmissionsFaq[];
  };

  cta: {
    heading:      string;
    subheading:   string;
    primaryCta:   { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}
