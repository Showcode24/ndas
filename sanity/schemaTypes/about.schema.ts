/**
 * about.schema.ts
 *
 * Document type for the About page.
 * Global chrome (nav, topbar, footer) is intentionally absent here —
 * fetch it separately from the `siteSettings` singleton:
 *
 *   *[_type == "siteSettings"][0] {
 *     nav, topbarContacts, topbarSocials, footerColumns
 *   }
 *
 * Object types shared with other schemas (navItem, topbarContact, etc.)
 * live in siteSettings.schema.ts and must be registered first.
 *
 * Singleton pattern — desk structure:
 *   S.listItem()
 *     .title('About Page')
 *     .child(S.document().schemaType('aboutPage').documentId('aboutPage'))
 */

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────

export const breadcrumbItem = {
  name: "breadcrumbItem",
  title: "Breadcrumb Item",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string", validation: (R: any) => R.required() },
    { name: "href",  title: "Href",  type: "string", validation: (R: any) => R.required() },
  ],
};

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

export const heroSection = {
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    { name: "eyebrow",          title: "Eyebrow",           type: "string" },
    { name: "heading",          title: "Heading",           type: "string" },
    { name: "headingHighlight", title: "Heading Highlight", type: "string" },
    { name: "headingTail",      title: "Heading Tail",      type: "string" },
    { name: "subtext",          title: "Subtext",           type: "text"   },
    {
      name:  "breadcrumb",
      title: "Breadcrumb",
      type:  "array",
      of:    [{ type: "breadcrumbItem" }],
    },
    {
      name:    "backgroundImage",
      title:   "Background Image",
      type:    "image",
      options: { hotspot: true },
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Heritage
// ─────────────────────────────────────────────────────────────

export const heritageBadge = {
  name: "heritageBadge",
  title: "Heritage Badge",
  type: "object",
  fields: [
    { name: "label",    title: "Label",    type: "string" },
    { name: "sublabel", title: "Sublabel", type: "string" },
  ],
};

export const heritageSection = {
  name: "heritageSection",
  title: "Heritage Section",
  type: "object",
  fields: [
    { name: "eyebrow",          title: "Eyebrow",           type: "string" },
    { name: "heading",          title: "Heading",           type: "string" },
    { name: "headingHighlight", title: "Heading Highlight", type: "string" },
    {
      name:        "paragraphs",
      title:       "Paragraphs",
      type:        "array",
      of:          [{ type: "text" }],
      description: "Plain text paragraphs. The component will bold highlightDate where it appears.",
    },
    {
      name:        "highlightDate",
      title:       "Highlight Date",
      type:        "string",
      description: "Substring the component renders as bold / highlighted.",
    },
    { name: "badge", title: "Badge", type: "heritageBadge" },
  ],
};

// ─────────────────────────────────────────────────────────────
// Mission / Vision / Values
// ─────────────────────────────────────────────────────────────

export const missionEntry = {
  name: "missionEntry",
  title: "Mission or Vision Entry",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "text",  title: "Text",  type: "text"   },
  ],
};

export const valuesEntry = {
  name: "valuesEntry",
  title: "Values Entry",
  type: "object",
  fields: [
    { name: "label",    title: "Label",    type: "string" },
    { name: "intro",    title: "Intro",    type: "text"   },
    {
      name:  "tags",
      title: "Tags",
      type:  "array",
      of:    [{ type: "string" }],
    },
    { name: "footnote", title: "Footnote", type: "string" },
  ],
};

export const ndlStat = {
  name: "ndlStat",
  title: "NDL Stat",
  type: "object",
  fields: [
    { name: "value", title: "Value", type: "string" },
    { name: "label", title: "Label", type: "string" },
  ],
};

export const ndlAdvantage = {
  name: "ndlAdvantage",
  title: "NDL Advantage",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string" },
    { name: "body",    title: "Body",    type: "text"   },
    {
      name:  "stats",
      title: "Stats",
      type:  "array",
      of:    [{ type: "ndlStat" }],
    },
  ],
};

export const missionVisionSection = {
  name: "missionVisionSection",
  title: "Mission / Vision Section",
  type: "object",
  fields: [
    { name: "eyebrow",      title: "Eyebrow",       type: "string"        },
    { name: "heading",      title: "Heading",       type: "string"        },
    { name: "mission",      title: "Mission",       type: "missionEntry"  },
    { name: "vision",       title: "Vision",        type: "missionEntry"  },
    { name: "values",       title: "Values",        type: "valuesEntry"   },
    { name: "ndlAdvantage", title: "NDL Advantage", type: "ndlAdvantage"  },
  ],
};

// ─────────────────────────────────────────────────────────────
// Objectives
// ─────────────────────────────────────────────────────────────

export const objectivesCta = {
  name: "objectivesCta",
  title: "Objectives CTA",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href",  title: "Href",  type: "string" },
  ],
};

export const objectivesSection = {
  name: "objectivesSection",
  title: "Objectives Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    {
      name:  "prose",
      title: "Prose Paragraphs",
      type:  "array",
      of:    [{ type: "text" }],
    },
    { name: "cta", title: "CTA", type: "objectivesCta" },
    {
      name:  "functions",
      title: "Functions",
      type:  "array",
      of:    [{ type: "string" }],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Leadership
// ─────────────────────────────────────────────────────────────

export const leader = {
  name: "leader",
  title: "Leader",
  type: "object",
  fields: [
    { name: "name",  title: "Name",  type: "string" },
    { name: "role",  title: "Role",  type: "string" },
    {
      name:    "image",
      title:   "Image",
      type:    "image",
      options: { hotspot: true },
    },
    { name: "bio", title: "Bio", type: "text" },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
};

export const coMessage = {
  name: "coMessage",
  title: "CO Message",
  type: "object",
  fields: [
    { name: "eyebrow",    title: "Eyebrow",    type: "string" },
    { name: "heading",    title: "Heading",    type: "string" },
    {
      name:  "paragraphs",
      title: "Paragraphs",
      type:  "array",
      of:    [{ type: "text" }],
    },
    { name: "name",    title: "Name",    type: "string" },
    { name: "title",   title: "Title",   type: "string" },
    { name: "school",  title: "School",  type: "string" },
    { name: "signoff", title: "Signoff", type: "string" },
  ],
};

export const leadershipSection = {
  name: "leadershipSection",
  title: "Leadership Section",
  type: "object",
  fields: [
    { name: "eyebrow",             title: "Eyebrow",               type: "string"    },
    { name: "heading",             title: "Heading",               type: "string"    },
    {
      name:  "seniorLeaders",
      title: "Senior Leaders",
      type:  "array",
      of:    [{ type: "leader" }],
    },
    { name: "currentCO",           title: "Current CO",            type: "leader"    },
    { name: "coMessage",           title: "CO Message",            type: "coMessage" },
    { name: "previousCOsEyebrow",  title: "Previous COs Eyebrow",  type: "string"    },
    { name: "previousCOsHeading",  title: "Previous COs Heading",  type: "string"    },
    { name: "previousCOsSubtext",  title: "Previous COs Subtext",  type: "string"    },
    { name: "previousCOsFootnote", title: "Previous COs Footnote", type: "string"    },
    {
      name:  "previousCOs",
      title: "Previous COs",
      type:  "array",
      of:    [{ type: "leader" }],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────

export const ctaLink = {
  name: "ctaLink",
  title: "CTA Link",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href",  title: "Href",  type: "string" },
  ],
};

export const ctaSection = {
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    { name: "eyebrow",      title: "Eyebrow",       type: "string"  },
    { name: "heading",      title: "Heading",       type: "string"  },
    { name: "subtext",      title: "Subtext",       type: "text"    },
    { name: "primaryCta",   title: "Primary CTA",   type: "ctaLink" },
    { name: "secondaryCta", title: "Secondary CTA", type: "ctaLink" },
  ],
};

// ─────────────────────────────────────────────────────────────
// Singleton document — About Page
// ─────────────────────────────────────────────────────────────

export const aboutPage = {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    // ── Page sections ──────────────────────────────────────
    { name: "hero",          title: "Hero Section",             type: "heroSection"          },
    { name: "heritage",      title: "Heritage Section",         type: "heritageSection"      },
    { name: "missionVision", title: "Mission / Vision Section", type: "missionVisionSection" },
    { name: "objectives",    title: "Objectives Section",       type: "objectivesSection"    },
    { name: "leadership",    title: "Leadership Section",       type: "leadershipSection"    },
    { name: "cta",           title: "CTA Section",              type: "ctaSection"           },
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
};

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────

/**
 * Register in sanity.config.ts alongside siteSettingsSchemaTypes.
 * siteSettingsSchemaTypes must be spread first so shared object types
 * (navItem, footerLink, etc.) are registered before any document type.
 *
 * import { siteSettingsSchemaTypes } from './siteSettings.schema'
 * import { aboutPageSchemaTypes }    from './about.schema'
 *
 * schema: { types: [...siteSettingsSchemaTypes, ...aboutPageSchemaTypes] }
 */
export const aboutPageSchemaTypes = [
  // Objects
  breadcrumbItem,
  heroSection,
  heritageBadge,
  heritageSection,
  missionEntry,
  valuesEntry,
  ndlStat,
  ndlAdvantage,
  missionVisionSection,
  objectivesCta,
  objectivesSection,
  leader,
  coMessage,
  leadershipSection,
  ctaLink,
  ctaSection,

  // Document
  aboutPage,
];