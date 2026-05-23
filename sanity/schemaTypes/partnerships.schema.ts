/**
 * partnerships.schema.ts  (Sanity v3)
 *
 * Document type for the Partnerships page.
 * Global chrome (nav, topbar, footer) lives in siteSettings.schema.ts.
 *
 * Singleton pattern — desk structure:
 *   S.listItem()
 *     .title('Partnerships Page')
 *     .child(S.document().schemaType('partnershipsPage').documentId('partnershipsPage'))
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────

export const partnershipsCtaLink = defineType({
  name: "partnershipsCtaLink",
  title: "CTA Link (Partnerships)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href",  title: "Href",  type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

export const partnershipsHeroHeading = defineType({
  name: "partnershipsHeroHeading",
  title: "Hero Heading (Partnerships)",
  type: "object",
  fields: [
    defineField({ name: "main",      title: "Main",      type: "string" }),
    defineField({ name: "highlight", title: "Highlight", type: "string" }),
  ],
});

export const partnershipsHeroSection = defineType({
  name: "partnershipsHeroSection",
  title: "Hero Section (Partnerships)",
  type: "object",
  fields: [
    defineField({ name: "badge",      title: "Badge",      type: "string" }),
    defineField({ name: "heading",    title: "Heading",    type: "partnershipsHeroHeading" }),
    defineField({ name: "subheading", title: "Subheading", type: "text" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Partnership Approach Section
// ─────────────────────────────────────────────────────────────

export const partnershipsApproachSection = defineType({
  name: "partnershipsApproachSection",
  title: "Partnership Approach Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name:  "body",
      title: "Body Paragraphs",
      type:  "array",
      of:    [{ type: "text" }],
      description: "Each item is a separate paragraph.",
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Partner Card
// ─────────────────────────────────────────────────────────────

export const partnerCard = defineType({
  name: "partnerCard",
  title: "Partner Card",
  type: "object",
  fields: [
    defineField({ name: "name",        title: "Name",        type: "string" }),
    defineField({ name: "description", title: "Description", type: "text"   }),
    defineField({ name: "category",    title: "Category",    type: "string" }),
    defineField({
      name:    "logo",
      title:   "Logo",
      type:    "image",
      options: { hotspot: true },
      description: "Optional partner logo. Upload via Studio.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "logo" },
  },
});

// ─────────────────────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────────────────────

export const partnershipsCtaSection = defineType({
  name: "partnershipsCtaSection",
  title: "CTA Section (Partnerships)",
  type: "object",
  fields: [
    defineField({ name: "heading",      title: "Heading",       type: "string" }),
    defineField({ name: "subheading",   title: "Subheading",    type: "text"   }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "partnershipsCtaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "partnershipsCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Singleton document — Partnerships Page
// ─────────────────────────────────────────────────────────────

export const partnershipsPage = defineType({
  name: "partnershipsPage",
  title: "Partnerships Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "hero",                title: "Hero Section",                 type: "partnershipsHeroSection"    }),
    defineField({ name: "partnershipApproach", title: "Partnership Approach Section", type: "partnershipsApproachSection"}),
    defineField({
      name:  "partners",
      title: "Partners",
      type:  "array",
      of:    [defineArrayMember({ type: "partnerCard" })],
      description: "All institutional partners. Order here controls display order.",
    }),
    defineField({ name: "cta", title: "CTA Section", type: "partnershipsCtaSection" }),
  ],
  preview: {
    prepare: () => ({ title: "Partnerships Page" }),
  },
});

// ─────────────────────────────────────────────────────────────
// Exports — add to sanity/schemaTypes/index.ts
// ─────────────────────────────────────────────────────────────

export const partnershipsPageSchemaTypes = [
  // Objects first
  partnershipsCtaLink,
  partnershipsHeroHeading,
  partnershipsHeroSection,
  partnershipsApproachSection,
  partnerCard,
  partnershipsCtaSection,
  // Document last
  partnershipsPage,
];
