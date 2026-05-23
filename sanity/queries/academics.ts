// lib/sanity/queries/academics.ts
// GROQ queries and TypeScript types — field paths match academics.schema.ts exactly.

import { groq } from "next-sanity";

/* ─────────────────────────── academics page query ──────────────── */

export const ACADEMICS_PAGE_QUERY = groq`
  *[_type == "academicsPage"][0] {

    // ── hero ──────────────────────────────────────────────────────
    hero {
      eyebrow,
      heading,
      headingHighlight,
      headingTail,
      subtext,
      breadcrumb[] { label, href },
      "backgroundImage": backgroundImage.asset->url,
      scrollLabel,
    },

    // ── trainingStructure ─────────────────────────────────────────
    trainingStructure {
      eyebrow,
      heading,
      headingHighlight,
      body,
    },

    // ── trades ────────────────────────────────────────────────────
    trades[] {
      code,
      title,
      description,
      category,
      badges,
      "image": image.asset->url,
    },

    // ── features ──────────────────────────────────────────────────
    features[] {
      title,
      description,
      iconKey,
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

/* ─────────────────────────── all courses (listing) ─────────────── */

export const ALL_COURSES_QUERY = groq`
  *[_type == "course"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    iconKey,
    shortDesc,
    duration,
    certification,
    location,
    "image": image.asset->url,
    highlights,
  }
`;

/* ─────────────────────────── single course (detail) ────────────── */

export const COURSE_BY_SLUG_QUERY = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    iconKey,
    shortDesc,
    fullDesc,
    duration,
    certification,
    location,
    "image": image.asset->url,
    highlights,
    courseOutline[] {
      category,
      topics[] { text },
    },
  }
`;

/* ─────────────────────────── types ─────────────────────────────── */

export interface AcademicsTrade {
  code:        string;
  title:       string;
  description: string;
  category:    string;
  badges:      string[];
  image:       string | null;
}

export interface AcademicsFeature {
  title:       string;
  description: string;
  iconKey:     "dockyard" | "practical" | "certification";
}

export interface AcademicsPageData {
  hero: {
    eyebrow:          string;
    heading:          string;
    headingHighlight: string;
    headingTail:      string;
    subtext:          string;
    breadcrumb:       { label: string; href: string }[];
    backgroundImage:  string | null;
    scrollLabel:      string;
  };

  trainingStructure: {
    eyebrow:          string;
    heading:          string;
    headingHighlight: string;
    body:             string;
  };

  trades:   AcademicsTrade[];
  features: AcademicsFeature[];

  cta: {
    eyebrow:      string;
    heading:      string;
    subtext:      string;
    primaryCta:   { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}

/* ─────────────────────────── course types ──────────────────────── */

export interface CourseOutlineSection {
  category: string;
  topics:   { text: string }[];
}

export interface CourseSummary {
  _id:           string;
  title:         string;
  slug:          string;
  iconKey:       string;
  shortDesc:     string;
  duration:      string;
  certification: string;
  location:      string;
  image:         string | null;
  highlights:    string[];
}

export interface CourseDetail extends CourseSummary {
  fullDesc:      string;
  courseOutline: CourseOutlineSection[];
}
