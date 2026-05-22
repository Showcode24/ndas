/**
 * academics.schema.ts  (Sanity v3)
 *
 * Document type for the Academics page.
 * Global chrome (nav, topbar, footer) lives in siteSettings.schema.ts.
 *
 * Singleton pattern — desk structure:
 *   S.listItem()
 *     .title('Academics Page')
 *     .child(S.document().schemaType('academicsPage').documentId('academicsPage'))
 *
 * Note on trade images: the SVG illustrations in the component are
 * generated purely in code and carry no CMS-editable content, so they
 * are intentionally absent from this schema. If you later want editors
 * to swap in real photographs, add an `image` field to the `trade` type.
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared primitives (page-local — not in siteSettings)
// ─────────────────────────────────────────────────────────────

export const academicsBreadcrumbItem = defineType({
  name: "academicsBreadcrumbItem",
  title: "Breadcrumb Item (Academics)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
    defineField({ name: "href",  title: "Href",  type: "string", validation: (R) => R.required() }),
  ],
});

export const academicsCtaLink = defineType({
  name: "academicsCtaLink",
  title: "CTA Link (Academics)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href",  title: "Href",  type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

export const academicsHeroSection = defineType({
  name: "academicsHeroSection",
  title: "Hero Section (Academics)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",          title: "Eyebrow",           type: "string" }),
    defineField({ name: "heading",          title: "Heading",           type: "string" }),
    defineField({ name: "headingHighlight", title: "Heading Highlight", type: "string" }),
    defineField({ name: "headingTail",      title: "Heading Tail",      type: "string" }),
    defineField({ name: "subtext",          title: "Subtext",           type: "text"   }),
    defineField({
      name:  "breadcrumb",
      title: "Breadcrumb",
      type:  "array",
      of:    [defineArrayMember({ type: "academicsBreadcrumbItem" })],
    }),
    defineField({
      name:    "backgroundImage",
      title:   "Background Image",
      type:    "image",
      options: { hotspot: true },
    }),
    defineField({ name: "scrollLabel", title: "Scroll Label", type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Training Structure intro
// ─────────────────────────────────────────────────────────────

export const trainingStructureSection = defineType({
  name: "trainingStructureSection",
  title: "Training Structure Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",          title: "Eyebrow",           type: "string" }),
    defineField({ name: "heading",          title: "Heading",           type: "string" }),
    defineField({ name: "headingHighlight", title: "Heading Highlight", type: "string" }),
    defineField({ name: "body",             title: "Body",              type: "text"   }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Trade
// ─────────────────────────────────────────────────────────────

export const trade = defineType({
  name: "trade",
  title: "Trade",
  type: "object",
  fields: [
    defineField({ name: "code",        title: "Code (e.g. WF-101)", type: "string", validation: (R) => R.required() }),
    defineField({ name: "title",       title: "Title",              type: "string", validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description",        type: "text"   }),
    defineField({ name: "category",    title: "Category",           type: "string" }),
    defineField({
      name:  "badges",
      title: "Badges",
      type:  "array",
      of:    [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name:        "image",
      title:       "Trade Image",
      type:        "image",
      options:     { hotspot: true },
      description: "Optional photo to replace the generated SVG illustration.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "code" },
  },
});

// ─────────────────────────────────────────────────────────────
// Feature
// ─────────────────────────────────────────────────────────────

export const academicsFeature = defineType({
  name: "academicsFeature",
  title: "Feature (Academics)",
  type: "object",
  fields: [
    defineField({ name: "title",       title: "Title",       type: "string" }),
    defineField({ name: "description", title: "Description", type: "text"   }),
    defineField({
      name:        "iconKey",
      title:       "Icon Key",
      type:        "string",
      options: {
        list: [
          { title: "Dockyard",      value: "dockyard"     },
          { title: "Practical",     value: "practical"    },
          { title: "Certification", value: "certification"},
        ],
      },
      description: "Maps to the hard-coded SVG icon in the component.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "iconKey" },
  },
});

// ─────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────

export const academicsCtaSection = defineType({
  name: "academicsCtaSection",
  title: "CTA Section (Academics)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",      title: "Eyebrow",       type: "string"          }),
    defineField({ name: "heading",      title: "Heading",       type: "string"          }),
    defineField({ name: "subtext",      title: "Subtext",       type: "text"            }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "academicsCtaLink"}),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "academicsCtaLink"}),
  ],
});

// ─────────────────────────────────────────────────────────────
// Singleton document — Academics Page
// ─────────────────────────────────────────────────────────────

export const academicsPage = defineType({
  name: "academicsPage",
  title: "Academics Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "hero",             title: "Hero Section",             type: "academicsHeroSection"    }),
    defineField({ name: "trainingStructure",title: "Training Structure Section",type: "trainingStructureSection"}),
    defineField({
      name:  "trades",
      title: "Trades",
      type:  "array",
      of:    [defineArrayMember({ type: "trade" })],
      description: "The four engineering trade programmes. Order here controls display order.",
    }),
    defineField({
      name:  "features",
      title: "Features",
      type:  "array",
      of:    [defineArrayMember({ type: "academicsFeature" })],
    }),
    defineField({ name: "cta", title: "CTA Section", type: "academicsCtaSection" }),
  ],
  preview: {
    prepare: () => ({ title: "Academics Page" }),
  },
});

// ─────────────────────────────────────────────────────────────
// Named export — add to sanity/schemaTypes/index.ts
// ─────────────────────────────────────────────────────────────

export const academicsPageSchemaTypes = [
  // Objects first
  academicsBreadcrumbItem,
  academicsCtaLink,
  academicsHeroSection,
  trainingStructureSection,
  trade,
  academicsFeature,
  academicsCtaSection,
  // Document last
  academicsPage,
];