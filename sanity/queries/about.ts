// lib/sanity/queries/about.ts
// GROQ query and TypeScript types — field paths match about.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── query ─────────────────────────────── */

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage"][0] {

    // ── hero ──────────────────────────────────────────────────────
    hero {
      eyebrow,
      heading,
      headingHighlight,
      headingTail,
      subtext,
      breadcrumb[] { label, href },
      "backgroundImage": backgroundImage.asset->url,
    },

    // ── heritage ──────────────────────────────────────────────────
    heritage {
      eyebrow,
      heading,
      headingHighlight,
      paragraphs,
      highlightDate,
      badge { label, sublabel },
    },

    // ── missionVision ─────────────────────────────────────────────
    missionVision {
      eyebrow,
      heading,
      mission { label, text },
      vision  { label, text },
      values  { label, intro, tags, footnote },
      ndlAdvantage {
        heading,
        body,
        stats[] { value, label },
      },
    },

    // ── objectives ────────────────────────────────────────────────
    objectives {
      eyebrow,
      heading,
      prose,
      cta { label, href },
      functions,
    },

    // ── leadership (everything lives inside this one object) ──────
    leadership {
      eyebrow,
      heading,
      seniorLeaders[] {
        name,
        role,
        bio,
        "image": image.asset->url,
      },
      currentCO {
        name,
        role,
        bio,
        "image": image.asset->url,
      },
      coMessage {
        eyebrow,
        heading,
        paragraphs,
        name,
        title,
        school,
        signoff,
      },
      previousCOsEyebrow,
      previousCOsHeading,
      previousCOsSubtext,
      previousCOsFootnote,
      previousCOs[] {
        name,
        role,
        bio,
        "image": image.asset->url,
      },
    },

    // ── cta ───────────────────────────────────────────────────────
    cta {
      eyebrow,
      heading,
      subtext,
      primaryCta   { label, href },
      secondaryCta { label, href },
    },
  }
`;

/* ─────────────────────────── types ─────────────────────────────── */

export interface Leader {
  name:  string;
  role:  string;
  image: string;
  bio:   string;
}

export interface AboutPageData {
  hero: {
    eyebrow:          string;
    heading:          string;
    headingHighlight: string;
    headingTail:      string;
    subtext:          string;
    breadcrumb:       { label: string; href: string }[];
    backgroundImage:  string;
  };

  heritage: {
    eyebrow:          string;
    heading:          string;
    headingHighlight: string;
    paragraphs:       string[];
    highlightDate:    string;
    badge: {
      label:    string;
      sublabel: string;
    };
  };

  missionVision: {
    eyebrow:  string;
    heading:  string;
    mission:  { label: string; text: string };
    vision:   { label: string; text: string };
    values: {
      label:    string;
      intro:    string;
      tags:     string[];
      footnote: string;
    };
    ndlAdvantage: {
      heading: string;
      body:    string;
      stats:   { value: string; label: string }[];
    };
  };

  objectives: {
    eyebrow:   string;
    heading:   string;
    prose:     string[];
    cta:       { label: string; href: string };
    functions: string[];
  };

  /** All leadership content — leaders, CO, message, labels — in one object. */
  leadership: {
    eyebrow:             string;
    heading:             string;
    seniorLeaders:       Leader[];
    currentCO:           Leader;
    coMessage: {
      eyebrow:    string;
      heading:    string;
      paragraphs: string[];
      name:       string;
      title:      string;
      school:     string;
      signoff:    string;
    };
    previousCOsEyebrow:  string;
    previousCOsHeading:  string;
    previousCOsSubtext:  string;
    previousCOsFootnote: string;
    previousCOs:         Leader[];
  };

  cta: {
    eyebrow:      string;
    heading:      string;
    subtext:      string;
    primaryCta:   { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}