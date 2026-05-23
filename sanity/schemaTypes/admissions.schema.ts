/**
 * admissions.schema.ts  (Sanity v3)
 *
 * Document type for the Admissions page.
 * Global chrome (nav, topbar, footer) lives in siteSettings.schema.ts.
 *
 * Singleton pattern — desk structure:
 *   S.listItem()
 *     .title('Admissions Page')
 *     .child(S.document().schemaType('admissionsPage').documentId('admissionsPage'))
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────

export const admissionsCtaLink = defineType({
  name: "admissionsCtaLink",
  title: "CTA Link (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href",  title: "Href",  type: "string" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

export const admissionsHeroSection = defineType({
  name: "admissionsHeroSection",
  title: "Hero Section (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "breadcrumb",  title: "Breadcrumb Text", type: "string" }),
    defineField({ name: "eyebrow",     title: "Eyebrow",         type: "string" }),
    defineField({ name: "heading",     title: "Heading",         type: "string" }),
    defineField({ name: "subheading",  title: "Subheading",      type: "text"   }),
    defineField({ name: "cta",         title: "CTA",             type: "admissionsCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Selection / Process
// ─────────────────────────────────────────────────────────────

export const admissionsStatusBadge = defineType({
  name: "admissionsStatusBadge",
  title: "Status Badge (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "cycle", title: "Cycle", type: "string" }),
  ],
});

export const admissionsStep = defineType({
  name: "admissionsStep",
  title: "Admission Step",
  type: "object",
  fields: [
    defineField({ name: "step",    title: "Step Number", type: "string" }),
    defineField({ name: "title",   title: "Title",       type: "string" }),
    defineField({ name: "desc",    title: "Description", type: "text"   }),
    defineField({
      name:    "iconKey",
      title:   "Icon Key",
      type:    "string",
      options: {
        list: [
          { title: "File / Nomination",    value: "FileText"      },
          { title: "Clipboard / Drafting", value: "ClipboardList" },
          { title: "User / Induction",     value: "UserCheck"     },
          { title: "Trophy / Course",      value: "Trophy"        },
        ],
      },
      description: "Maps to a Lucide icon in the front-end component.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "step" },
  },
});

export const admissionsSelectionSection = defineType({
  name: "admissionsSelectionSection",
  title: "Selection Section (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "note",    title: "Note",    type: "text"   }),
    defineField({ name: "status",  title: "Status Badge", type: "admissionsStatusBadge" }),
    defineField({
      name:  "steps",
      title: "Admission Steps",
      type:  "array",
      of:    [defineArrayMember({ type: "admissionsStep" })],
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Eligibility
// ─────────────────────────────────────────────────────────────

export const admissionsEligibilityHeading = defineType({
  name: "admissionsEligibilityHeading",
  title: "Eligibility Heading (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "main",      title: "Main",      type: "string" }),
    defineField({ name: "highlight", title: "Highlight", type: "string" }),
  ],
});

export const admissionsCriterion = defineType({
  name: "admissionsCriterion",
  title: "Criterion (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Text", type: "text" }),
  ],
  preview: {
    select: { title: "text" },
  },
});

export const admissionsEligibilitySection = defineType({
  name: "admissionsEligibilitySection",
  title: "Eligibility Section (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "heading",    title: "Heading",    type: "admissionsEligibilityHeading" }),
    defineField({ name: "subheading", title: "Subheading", type: "text" }),
    defineField({ name: "cta",        title: "CTA",        type: "admissionsCtaLink" }),
    defineField({
      name:  "criteria",
      title: "Criteria",
      type:  "array",
      of:    [defineArrayMember({ type: "admissionsCriterion" })],
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────

export const admissionsFaq = defineType({
  name: "admissionsFaq",
  title: "FAQ (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer",   title: "Answer",   type: "text"   }),
  ],
  preview: {
    select: { title: "question" },
  },
});

export const admissionsFaqHeading = defineType({
  name: "admissionsFaqHeading",
  title: "FAQ Heading (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "main", title: "Main", type: "string" }),
    defineField({ name: "sub",  title: "Sub",  type: "string" }),
  ],
});

export const admissionsFaqSection = defineType({
  name: "admissionsFaqSection",
  title: "FAQ Section (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow",    title: "Eyebrow",    type: "string" }),
    defineField({ name: "heading",    title: "Heading",    type: "admissionsFaqHeading" }),
    defineField({ name: "subheading", title: "Subheading", type: "text"   }),
    defineField({ name: "cta",        title: "CTA",        type: "admissionsCtaLink" }),
    defineField({
      name:  "faqs",
      title: "FAQs",
      type:  "array",
      of:    [defineArrayMember({ type: "admissionsFaq" })],
    }),
  ],
});

// ─────────────────────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────────────────────

export const admissionsCtaSection = defineType({
  name: "admissionsCtaSection",
  title: "CTA Section (Admissions)",
  type: "object",
  fields: [
    defineField({ name: "heading",      title: "Heading",       type: "string" }),
    defineField({ name: "subheading",   title: "Subheading",    type: "text"   }),
    defineField({ name: "primaryCta",   title: "Primary CTA",   type: "admissionsCtaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "admissionsCtaLink" }),
  ],
});

// ─────────────────────────────────────────────────────────────
// Singleton document — Admissions Page
// ─────────────────────────────────────────────────────────────

export const admissionsPage = defineType({
  name: "admissionsPage",
  title: "Admissions Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "hero",        title: "Hero Section",        type: "admissionsHeroSection"        }),
    defineField({ name: "selection",   title: "Selection Section",   type: "admissionsSelectionSection"   }),
    defineField({ name: "eligibility", title: "Eligibility Section", type: "admissionsEligibilitySection" }),
    defineField({ name: "faq",         title: "FAQ Section",         type: "admissionsFaqSection"         }),
    defineField({ name: "cta",         title: "CTA Section",         type: "admissionsCtaSection"         }),
  ],
  preview: {
    prepare: () => ({ title: "Admissions Page" }),
  },
});

// ─────────────────────────────────────────────────────────────
// Exports — add to sanity/schemaTypes/index.ts
// ─────────────────────────────────────────────────────────────

export const admissionsPageSchemaTypes = [
  // Objects first
  admissionsCtaLink,
  admissionsStatusBadge,
  admissionsStep,
  admissionsSelectionSection,
  admissionsEligibilityHeading,
  admissionsCriterion,
  admissionsEligibilitySection,
  admissionsFaq,
  admissionsFaqHeading,
  admissionsFaqSection,
  admissionsCtaSection,
  admissionsHeroSection,
  // Document last
  admissionsPage,
];
