/**
 * facilities.schema.ts  (Sanity v3)
 *
 * Document type for the Facilities page.
 * Global chrome (nav, topbar, footer) lives in siteSettings.schema.ts.
 *
 * Singleton pattern — desk structure:
 *   S.listItem()
 *     .title('Facilities Page')
 *     .child(S.document().schemaType('facilitiesPage').documentId('facilitiesPage'))
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────

export const facilitiesCtaLink = defineType({
  name: "facilitiesCtaLink",
  title: "CTA Link (Facilities)",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Text", type: "string" }),
    defineField({ name: "link", title: "Link", type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

export const facilitiesHeroSection = defineType({
  name: "facilitiesHeroSection",
  title: "Hero Section (Facilities)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",     title: "Eyebrow",          type: "string" }),
    defineField({ name: "title",       title: "Title",            type: "string" }),
    defineField({ name: "description", title: "Description",      type: "text"   }),
    defineField({ name: "breadcrumbs", title: "Breadcrumb Label", type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Training Environment intro
// ─────────────────────────────────────────────────────────────

export const facilitiesTrainingEnvironment = defineType({
  name: "facilitiesTrainingEnvironment",
  title: "Training Environment (Facilities)",
  type: "object",
  fields: [
    defineField({ name: "title",       title: "Title",       type: "string" }),
    defineField({ name: "description", title: "Description", type: "text"   }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Individual Facility Card
// ─────────────────────────────────────────────────────────────

export const facilityCard = defineType({
  name: "facilityCard",
  title: "Facility Card",
  type: "object",
  fields: [
    defineField({ name: "id",          title: "ID (slug)",   type: "string" }),
    defineField({ name: "name",        title: "Name",        type: "string" }),
    defineField({ name: "category",    title: "Category",    type: "string",
      options: {
        list: [
          { title: "Workshop",   value: "Workshop"   },
          { title: "Laboratory", value: "Laboratory" },
          { title: "Simulation", value: "Simulation" },
          { title: "Support",    value: "Support"    },
        ],
      },
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name:    "image",
      title:   "Image",
      type:    "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});

// ─────────────────────────────────────────────────────────────
// Highlight Item
// ─────────────────────────────────────────────────────────────

export const facilityHighlight = defineType({
  name: "facilityHighlight",
  title: "Facility Highlight",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "desc",  title: "Description", type: "text" }),
    defineField({
      name:    "iconKey",
      title:   "Icon Key",
      type:    "string",
      options: {
        list: [
          { title: "Ship",     value: "Ship"    },
          { title: "Settings", value: "Settings"},
          { title: "Zap",      value: "Zap"     },
          { title: "Library",  value: "Library" },
          { title: "Wrench",   value: "Wrench"  },
          { title: "Shield",   value: "Shield"  },
        ],
      },
      description: "Maps to a Lucide icon in the front-end icon-map.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "iconKey" },
  },
});

// ─────────────────────────────────────────────────────────────
// Extended Context Section
// ─────────────────────────────────────────────────────────────

export const facilitiesExtendedContext = defineType({
  name: "facilitiesExtendedContext",
  title: "Extended Context (Facilities)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",     title: "Eyebrow",     type: "string" }),
    defineField({ name: "title",       title: "Title",       type: "string" }),
    defineField({ name: "description", title: "Description", type: "text"   }),
    defineField({ name: "cta",         title: "CTA",         type: "facilitiesCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Singleton document — Facilities Page
// ─────────────────────────────────────────────────────────────

export const facilitiesPage = defineType({
  name: "facilitiesPage",
  title: "Facilities Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "hero",                title: "Hero Section",               type: "facilitiesHeroSection"        }),
    defineField({ name: "trainingEnvironment", title: "Training Environment Section",type: "facilitiesTrainingEnvironment"}),
    defineField({
      name:  "facilities",
      title: "Facilities",
      type:  "array",
      of:    [defineArrayMember({ type: "facilityCard" })],
      description: "Workshop and laboratory cards displayed on the page.",
    }),
    defineField({
      name:  "highlights",
      title: "Highlights",
      type:  "array",
      of:    [defineArrayMember({ type: "facilityHighlight" })],
      description: "Quick-glance highlights shown below the facility cards.",
    }),
    defineField({ name: "extendedContext", title: "Extended Context Section", type: "facilitiesExtendedContext" }),
  ],
  preview: {
    prepare: () => ({ title: "Facilities Page" }),
  },
});

// ─────────────────────────────────────────────────────────────
// Exports — add to sanity/schemaTypes/index.ts
// ─────────────────────────────────────────────────────────────

export const facilitiesPageSchemaTypes = [
  // Objects first
  facilitiesCtaLink,
  facilitiesHeroSection,
  facilitiesTrainingEnvironment,
  facilityCard,
  facilityHighlight,
  facilitiesExtendedContext,
  // Document last
  facilitiesPage,
];
