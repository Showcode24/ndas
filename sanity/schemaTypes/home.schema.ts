/**
 * home.schema.ts  (Sanity v3)
 *
 * Document type for the Home page.
 * Global chrome (nav, topbar, footer) lives in siteSettings.schema.ts.
 *
 * Singleton pattern — desk structure:
 *   S.listItem()
 *     .title('Home Page')
 *     .child(S.document().schemaType('homePage').documentId('homePage'))
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────

export const homeCtaLink = defineType({
  name: "homeCtaLink",
  title: "CTA Link (Home)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href",  title: "Href",  type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// About Section
// ─────────────────────────────────────────────────────────────

export const homeAboutSection = defineType({
  name: "homeAboutSection",
  title: "About Section (Home)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",      title: "Eyebrow",       type: "string" }),
    defineField({ name: "heading",      title: "Heading",       type: "string" }),
    defineField({ name: "body",         title: "Body",          type: "text"   }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "homeCtaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "homeCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Stats / Snapshot Section
// ─────────────────────────────────────────────────────────────

export const homeStatItem = defineType({
  name: "homeStatItem",
  title: "Stat Item (Home)",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});

export const homeStatsHeading = defineType({
  name: "homeStatsHeading",
  title: "Stats Heading (Home)",
  type: "object",
  fields: [
    defineField({ name: "prefix",    title: "Prefix",    type: "string" }),
    defineField({ name: "highlight", title: "Highlight", type: "string" }),
    defineField({ name: "suffix",    title: "Suffix",    type: "string" }),
  ],
});

export const homeStatsSection = defineType({
  name: "homeStatsSection",
  title: "Stats Section (Home)",
  type: "object",
  fields: [
    defineField({ name: "badge",       title: "Badge",      type: "string" }),
    defineField({ name: "heading",     title: "Heading",    type: "homeStatsHeading" }),
    defineField({ name: "subheading",  title: "Subheading", type: "text" }),
    defineField({
      name:  "items",
      title: "Stat Items",
      type:  "array",
      of:    [defineArrayMember({ type: "homeStatItem" })],
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Programs Section
// ─────────────────────────────────────────────────────────────

export const homeProgramsSection = defineType({
  name: "homeProgramsSection",
  title: "Programs Section (Home)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",      title: "Eyebrow",              type: "string" }),
    defineField({ name: "heading",      title: "Heading",              type: "string" }),
    defineField({ name: "viewAllCta",   title: "View All CTA",         type: "homeCtaLink" }),
    defineField({ name: "displayCount", title: "Number to Display",    type: "number" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Features Section
// ─────────────────────────────────────────────────────────────

export const homeFeatureItem = defineType({
  name: "homeFeatureItem",
  title: "Feature Item (Home)",
  type: "object",
  fields: [
    defineField({ name: "title",       title: "Title",       type: "string" }),
    defineField({ name: "description", title: "Description", type: "text"   }),
  ],
  preview: {
    select: { title: "title" },
  },
});

export const homeFeaturesSection = defineType({
  name: "homeFeaturesSection",
  title: "Features Section (Home)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name:  "items",
      title: "Feature Items",
      type:  "array",
      of:    [defineArrayMember({ type: "homeFeatureItem" })],
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Events Section
// ─────────────────────────────────────────────────────────────

export const homeEventsSection = defineType({
  name: "homeEventsSection",
  title: "Events Section (Home)",
  type: "object",
  fields: [
    defineField({ name: "heading",      title: "Heading",           type: "string" }),
    defineField({ name: "body",         title: "Body",              type: "text"   }),
    defineField({ name: "primaryCta",   title: "Primary CTA",       type: "homeCtaLink" }),
    defineField({ name: "displayCount", title: "Number to Display", type: "number" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────────────────────

export const homeCtaSection = defineType({
  name: "homeCtaSection",
  title: "CTA Section (Home)",
  type: "object",
  fields: [
    defineField({ name: "badge",        title: "Badge",         type: "string" }),
    defineField({ name: "heading",      title: "Heading",       type: "string" }),
    defineField({ name: "subheading",   title: "Subheading",    type: "text"   }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "homeCtaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "homeCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Hero Slide (for hero slider)
// ─────────────────────────────────────────────────────────────

export const homeHeroSlide = defineType({
  name: "homeHeroSlide",
  title: "Hero Slide (Home)",
  type: "object",
  fields: [
    defineField({ name: "heading",    title: "Heading",    type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text"   }),
    defineField({
      name:    "image",
      title:   "Background Image",
      type:    "image",
      options: { hotspot: true },
    }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "homeCtaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "homeCtaLink" }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
  },
});

// ─────────────────────────────────────────────────────────────
// Singleton document — Home Page
// ─────────────────────────────────────────────────────────────

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name:  "heroSlides",
      title: "Hero Slides",
      type:  "array",
      of:    [defineArrayMember({ type: "homeHeroSlide" })],
      description: "Slides shown in the homepage hero carousel.",
    }),
    defineField({ name: "about",    title: "About Section",    type: "homeAboutSection"   }),
    defineField({ name: "stats",    title: "Stats Section",    type: "homeStatsSection"   }),
    defineField({ name: "programs", title: "Programs Section", type: "homeProgramsSection"}),
    defineField({ name: "features", title: "Features Section", type: "homeFeaturesSection"}),
    defineField({ name: "events",   title: "Events Section",   type: "homeEventsSection"  }),
    defineField({ name: "cta",      title: "CTA Section",      type: "homeCtaSection"     }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});

// ─────────────────────────────────────────────────────────────
// Exports — add to sanity/schemaTypes/index.ts
// ─────────────────────────────────────────────────────────────

export const homePageSchemaTypes = [
  // Objects first
  homeCtaLink,
  homeStatItem,
  homeStatsHeading,
  homeStatsSection,
  homeAboutSection,
  homeProgramsSection,
  homeFeatureItem,
  homeFeaturesSection,
  homeEventsSection,
  homeCtaSection,
  homeHeroSlide,
  // Document last
  homePage,
];
