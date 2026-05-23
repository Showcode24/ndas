/**
 * news.schema.ts  (Sanity v3)
 *
 * Two document types:
 *   1. `newsPage`  — singleton, controls the listing page hero + CTA copy.
 *   2. `newsPost`  — one document per news article / event entry.
 *
 * Desk structure additions needed in structure.ts:
 *   S.listItem().title('News & Events Page').child(S.document()…)
 *   S.listItem().title('News Posts').child(S.documentTypeList('newsPost')…)
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────

export const newsCtaLink = defineType({
  name: "newsCtaLink",
  title: "CTA Link (News)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href",  title: "Href",  type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────────

export const newsHeroSection = defineType({
  name: "newsHeroSection",
  title: "Hero Section (News)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",     title: "Eyebrow",     type: "string" }),
    defineField({ name: "heading",     title: "Heading",     type: "string" }),
    defineField({ name: "subheading",  title: "Subheading",  type: "text"   }),
    defineField({ name: "breadcrumbs", title: "Breadcrumbs", type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Filter labels (for the category filter bar)
// ─────────────────────────────────────────────────────────────

export const newsFilterSection = defineType({
  name: "newsFilterSection",
  title: "Filter Section (News)",
  type: "object",
  fields: [
    defineField({
      name:  "categories",
      title: "Filter Categories",
      type:  "array",
      of:    [defineArrayMember({ type: "string" })],
      description: "Category labels shown in the filter bar. 'All' is prepended automatically.",
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────────────────────

export const newsCtaSection = defineType({
  name: "newsCtaSection",
  title: "CTA Section (News)",
  type: "object",
  fields: [
    defineField({ name: "heading",      title: "Heading",       type: "string" }),
    defineField({ name: "subheading",   title: "Subheading",    type: "text"   }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "newsCtaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "newsCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Singleton document — News Page
// ─────────────────────────────────────────────────────────────

export const newsPage = defineType({
  name: "newsPage",
  title: "News & Events Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "hero",    title: "Hero Section",   type: "newsHeroSection"   }),
    defineField({ name: "filters", title: "Filter Section", type: "newsFilterSection" }),
    defineField({ name: "cta",     title: "CTA Section",    type: "newsCtaSection"    }),
  ],
  preview: {
    prepare: () => ({ title: "News & Events Page" }),
  },
});

// ─────────────────────────────────────────────────────────────
// newsPost — one per article / event
// ─────────────────────────────────────────────────────────────

export const newsPost = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({
      name:       "title",
      title:      "Title",
      type:       "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name:    "slug",
      title:   "Slug",
      type:    "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name:    "category",
      title:   "Category",
      type:    "string",
      options: {
        list: [
          { title: "Achievement",  value: "Achievement"  },
          { title: "Facility",     value: "Facility"     },
          { title: "Partnership",  value: "Partnership"  },
          { title: "Academic",     value: "Academic"     },
          { title: "Sports",       value: "Sports"       },
          { title: "Cultural",     value: "Cultural"     },
          { title: "Technical",    value: "Technical"    },
          { title: "Announcement", value: "Announcement" },
        ],
      },
    }),
    defineField({
      name:    "postType",
      title:   "Post Type",
      type:    "string",
      options: {
        list: [
          { title: "News",  value: "news"  },
          { title: "Event", value: "event" },
        ],
      },
      description: "Determines whether this entry appears in the News or Events tab.",
    }),
    defineField({
      name:  "date",
      title: "Date",
      type:  "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({ name: "excerpt", title: "Excerpt",  type: "text"   }),
    defineField({ name: "body",    title: "Full Body", type: "text",
      description: "Full article or event description. Use rich text / portable text if needed later.",
    }),
    defineField({
      name:    "image",
      title:   "Cover Image",
      type:    "image",
      options: { hotspot: true },
    }),
    defineField({
      name:  "location",
      title: "Location (Events)",
      type:  "string",
      description: "Shown only for event-type entries.",
    }),
    defineField({
      name:  "featured",
      title: "Featured",
      type:  "boolean",
      description: "Pin this post to the top of the listing.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Date, Newest First",
      name:  "dateDesc",
      by:    [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────

export const newsPageSchemaTypes = [
  // Objects first
  newsCtaLink,
  newsHeroSection,
  newsFilterSection,
  newsCtaSection,
  // Documents last
  newsPage,
  newsPost,
];
