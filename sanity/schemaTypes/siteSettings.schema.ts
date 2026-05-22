/**
 * siteSettings.schema.ts
 *
 * Singleton document for all global / shared chrome:
 *   - Top navigation bar
 *   - Topbar contact rows
 *   - Topbar social links
 *   - Footer columns
 *
 * Every page document references this via a Sanity reference field
 * (or fetched once globally via a groq query like:
 *   *[_type == "siteSettings"][0]
 * )
 *
 * Enforce singleton in desk structure:
 *   S.listItem()
 *     .title('Site Settings')
 *     .child(S.document().schemaType('siteSettings').documentId('siteSettings'))
 */

// ─────────────────────────────────────────────────────────────
// Object types
// ─────────────────────────────────────────────────────────────

export const navItem = {
  name: "navItem",
  title: "Nav Item",
  type: "object",
  fields: [
    { name: "label",    title: "Label",    type: "string",  validation: (R: any) => R.required() },
    { name: "href",     title: "Href",     type: "string",  validation: (R: any) => R.required() },
    { name: "active",   title: "Active",   type: "boolean", initialValue: false },
    { name: "dropdown", title: "Dropdown", type: "boolean", initialValue: false },
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
};

export const topbarContact = {
  name: "topbarContact",
  title: "Topbar Contact",
  type: "object",
  fields: [
    { name: "href", title: "Href (tel: or mailto:)", type: "string", validation: (R: any) => R.required() },
    { name: "icon", title: "SVG Path Data",          type: "string" },
    { name: "text", title: "Display Text",           type: "string", validation: (R: any) => R.required() },
  ],
  preview: {
    select: { title: "text", subtitle: "href" },
  },
};

export const topbarSocial = {
  name: "topbarSocial",
  title: "Topbar Social",
  type: "object",
  fields: [
    { name: "label", title: "Label",         type: "string", validation: (R: any) => R.required() },
    { name: "d",     title: "SVG Path Data", type: "string" },
    { name: "href",  title: "URL",           type: "string" },
  ],
  preview: {
    select: { title: "label" },
  },
};

export const footerLink = {
  name: "footerLink",
  title: "Footer Link",
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string", validation: (R: any) => R.required() },
    { name: "href",  title: "Href",  type: "string", validation: (R: any) => R.required() },
  ],
};

export const footerColumn = {
  name: "footerColumn",
  title: "Footer Column",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string", validation: (R: any) => R.required() },
    {
      name:  "links",
      title: "Links",
      type:  "array",
      of:    [{ type: "footerLink" }],
    },
  ],
  preview: {
    select: { title: "heading" },
  },
};

// ─────────────────────────────────────────────────────────────
// Singleton document
// ─────────────────────────────────────────────────────────────

export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name:  "nav",
      title: "Navigation",
      type:  "array",
      of:    [{ type: "navItem" }],
      description: "Global top navigation bar — shared across all pages.",
    },
    {
      name:  "topbarContacts",
      title: "Topbar Contacts",
      type:  "array",
      of:    [{ type: "topbarContact" }],
      description: "Phone and email entries shown in the topbar.",
    },
    {
      name:  "topbarSocials",
      title: "Topbar Socials",
      type:  "array",
      of:    [{ type: "topbarSocial" }],
      description: "Social icon links shown in the topbar.",
    },
    {
      name:  "footerColumns",
      title: "Footer Columns",
      type:  "array",
      of:    [{ type: "footerColumn" }],
      description: "Link columns rendered in the site footer.",
    },
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
};

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────

/** Register these in your sanity.config.ts schema.types array. */
export const siteSettingsSchemaTypes = [
  navItem,
  topbarContact,
  topbarSocial,
  footerLink,
  footerColumn,
  siteSettings,
];