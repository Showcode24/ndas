/**
 * course.schema.ts  (Sanity v3)
 *
 * Standalone `course` document type.
 * Each course is its own document (not embedded inside academicsPage)
 * so it can be linked by slug and rendered on /academics/[slug].
 *
 * Register courseSchemaTypes AFTER academicsPageSchemaTypes in index.ts
 * since `courseOutlineSection` and `courseTopic` are new object types.
 *
 * Desk structure — add inside structure.ts:
 *   S.listItem()
 *     .title('Courses')
 *     .child(S.documentTypeList('course').title('Courses'))
 */

import { defineType, defineField, defineArrayMember } from "sanity";

// ─────────────────────────────────────────────────────────────
// Nested object — a single topic string within an outline section
// ─────────────────────────────────────────────────────────────

export const courseTopic = defineType({
  name: "courseTopic",
  title: "Course Topic",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Topic", type: "string", validation: (R) => R.required() }),
  ],
  preview: {
    select: { title: "text" },
  },
});

// ─────────────────────────────────────────────────────────────
// Nested object — one category block in the course outline
// ─────────────────────────────────────────────────────────────

export const courseOutlineSection = defineType({
  name: "courseOutlineSection",
  title: "Course Outline Section",
  type: "object",
  fields: [
    defineField({ name: "category", title: "Category", type: "string", validation: (R) => R.required() }),
    defineField({
      name:  "topics",
      title: "Topics",
      type:  "array",
      of:    [defineArrayMember({ type: "courseTopic" })],
    }),
  ],
  preview: {
    select: { title: "category" },
  },
});

// ─────────────────────────────────────────────────────────────
// Course document
// ─────────────────────────────────────────────────────────────

export const course = defineType({
  name: "course",
  title: "Course",
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
      name:    "iconKey",
      title:   "Icon Key",
      type:    "string",
      options: {
        list: [
          { title: "Wrench",  value: "wrench"  },
          { title: "Zap",     value: "zap"     },
          { title: "Waves",   value: "waves"   },
          { title: "Hammer",  value: "hammer"  },
          { title: "CPU",     value: "cpu"     },
          { title: "Settings",value: "settings"},
        ],
      },
      description: "Maps to Lucide icon via icon-map.ts in the front-end.",
    }),
    defineField({ name: "shortDesc",     title: "Short Description",  type: "text"   }),
    defineField({ name: "fullDesc",      title: "Full Description",   type: "text"   }),
    defineField({ name: "duration",      title: "Duration",           type: "string" }),
    defineField({ name: "certification", title: "Certification",      type: "string" }),
    defineField({ name: "location",      title: "Training Location",  type: "string" }),
    defineField({
      name:    "image",
      title:   "Hero Image",
      type:    "image",
      options: { hotspot: true },
    }),
    defineField({
      name:  "highlights",
      title: "Programme Highlights",
      type:  "array",
      of:    [defineArrayMember({ type: "string" })],
      description: "Short bullet-point highlights shown in the sidebar.",
    }),
    defineField({
      name:  "courseOutline",
      title: "Course Outline",
      type:  "array",
      of:    [defineArrayMember({ type: "courseOutlineSection" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "duration" },
  },
});

// ─────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────

export const courseSchemaTypes = [
  // Objects first
  courseTopic,
  courseOutlineSection,
  // Document last
  course,
];
