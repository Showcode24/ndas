/**
 * gallery.schema.ts  (Sanity v3)
 *
 * Two document types:
 *   1. `galleryPage`  — singleton, controls the listing page hero + CTA copy.
 *   2. `galleryImage` — one document per image entry.
 *
 * Desk structure additions needed in structure.ts:
 *   S.listItem().title('Gallery Page').child(S.document()…)
 *   S.listItem().title('Gallery Images').child(S.documentTypeList('galleryImage')…)
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────

export const galleryCtaLink = defineType({
  name: "galleryCtaLink",
  title: "CTA Link (Gallery)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href",  title: "Href",  type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────────

export const galleryHeroSection = defineType({
  name: "galleryHeroSection",
  title: "Hero Section (Gallery)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",     title: "Eyebrow",     type: "string" }),
    defineField({ name: "heading",     title: "Heading",     type: "string" }),
    defineField({ name: "subheading",  title: "Subheading",  type: "text"   }),
    defineField({ name: "breadcrumbs", title: "Breadcrumbs", type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Filter configuration
// ─────────────────────────────────────────────────────────────

export const galleryFilterSection = defineType({
  name: "galleryFilterSection",
  title: "Filter Section (Gallery)",
  type: "object",
  fields: [
    defineField({
      name:  "categories",
      title: "Filter Categories",
      type:  "array",
      of:    [defineArrayMember({ type: "string" })],
      description: "'All' is prepended automatically in the front-end.",
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────────────────────

export const galleryCtaSection = defineType({
  name: "galleryCtaSection",
  title: "CTA Section (Gallery)",
  type: "object",
  fields: [
    defineField({ name: "heading",      title: "Heading",       type: "string" }),
    defineField({ name: "subheading",   title: "Subheading",    type: "text"   }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "galleryCtaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "galleryCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Singleton document — Gallery Page
// ─────────────────────────────────────────────────────────────

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "hero",    title: "Hero Section",   type: "galleryHeroSection"   }),
    defineField({ name: "filters", title: "Filter Section", type: "galleryFilterSection" }),
    defineField({ name: "cta",     title: "CTA Section",    type: "galleryCtaSection"    }),
  ],
  preview: {
    prepare: () => ({ title: "Gallery Page" }),
  },
});

// ─────────────────────────────────────────────────────────────
// galleryImage — one per photo
// ─────────────────────────────────────────────────────────────

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name:       "title",
      title:      "Title / Caption",
      type:       "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name:    "image",
      title:   "Image",
      type:    "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name:    "category",
      title:   "Category",
      type:    "string",
      options: {
        list: [
          { title: "Events",     value: "Events"     },
          { title: "Facilities", value: "Facilities" },
          { title: "Training",   value: "Training"   },
          { title: "Graduation", value: "Graduation" },
          { title: "Sports",     value: "Sports"     },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name:  "date",
      title: "Date",
      type:  "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name:    "alt",
      title:   "Alt Text",
      type:    "string",
      description: "Descriptive text for accessibility. Defaults to title if left blank.",
    }),
    defineField({
      name:         "featured",
      title:        "Featured",
      type:         "boolean",
      description:  "Pin to the top of the gallery.",
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

export const galleryPageSchemaTypes = [
  // Objects first
  galleryCtaLink,
  galleryHeroSection,
  galleryFilterSection,
  galleryCtaSection,
  // Documents last
  galleryPage,
  galleryImage,
];
