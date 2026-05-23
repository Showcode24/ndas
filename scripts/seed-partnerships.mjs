import { createClient } from "@sanity/client";
import { config } from "dotenv";

config();

// ─── VALIDATE ENV VARS ─────────────────────────────
const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET    = process.env.SANITY_DATASET || "production";
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;

if (!PROJECT_ID) throw new Error("Missing SANITY_PROJECT_ID");
if (!TOKEN)      throw new Error("Missing SANITY_API_WRITE_TOKEN");

// ─── CLIENT ────────────────────────────────────────
const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  token:      TOKEN,
  apiVersion: "2024-01-01",
  useCdn:     false,
});

// ─── HELPER ────────────────────────────────────────
const keyedObjects = (items) =>
  items.map((item, i) => ({
    _key: `k${i}_${Math.random().toString(36).slice(2, 7)}`,
    ...item,
  }));

// ─── DOCUMENT ──────────────────────────────────────
const partnershipsPageDocument = {
  _id:   "partnershipsPage",
  _type: "partnershipsPage",

  // ── Hero ───────────────────────────────────────────────────────
  hero: {
    badge: "Institutional Collaboration",
    heading: {
      main:      "Partnerships That Strengthen",
      highlight: "Training Quality.",
    },
    subheading:
      "NDAS pursues collaboration that improves capacity development, practical exposure, certification support, and technical relevance.",
  },

  // ── Partnership Approach ───────────────────────────────────────
  partnershipApproach: {
    eyebrow: "Partnership Approach",
    heading: "Collaboration Must Be Practical, Structured, and Relevant.",
    // array of text (primitives) → plain array, no _key
    body: [
      "Partnership content should distinguish clearly between active arrangements, developing engagements, and exploratory discussions.",
      "The objective is not to inflate prestige, but to show how collaboration can improve training value and technical capability.",
    ],
  },

  // ── Partners ───────────────────────────────────────────────────
  // logo images omitted — upload via Studio
  partners: keyedObjects([
    {
      name:        "Dearsan Shipyard",
      description:
        "Relevant to technology exposure, shipyard best practices, and possible curriculum-linked technical collaboration.",
      category: "Technology Transfer",
    },
    {
      name:        "NIMASA",
      description:
        "Relevant to maritime standards, possible certification pathways, and wider alignment of technical training with national maritime requirements.",
      category: "Standards & Certification",
    },
    {
      name:        "NASENI",
      description:
        "Relevant to engineering technology exposure, innovation, and longer-term technical development opportunities.",
      category: "Technology & Capacity Development",
    },
    {
      name:        "SUVTC Yaba",
      description:
        "NDAS has moved toward Trade Test certification support through engagement with the Skills Upgrading and Vocational Training Centre at Yaba.",
      category: "Trade Test",
    },
    {
      name:        "Novelle Training Center",
      description:
        "NDAS has introduced certified HSE-related safety training support through engagement with Novelle Training Center.",
      category: "Safety Certification",
    },
  ]),

  // ── CTA ────────────────────────────────────────────────────────
  cta: {
    heading:    "Interested in Supporting Technical Training at NDAS?",
    subheading:
      "Institutions, agencies, and technical stakeholders may contact the School to discuss collaboration relevant to training quality and practical development.",
    primaryCta:   { label: "Contact the School", href: "/contact" },
    secondaryCta: { label: "",                   href: ""         },
  },
};

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding partnershipsPage...");
  try {
    const result = await client.createOrReplace(partnershipsPageDocument);
    console.log("✅ Success! ID:", result._id);
  } catch (err) {
    console.error("❌ Seed failed:");
    console.error(err);
    process.exit(1);
  }
}

seed();
