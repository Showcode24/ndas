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
const admissionsPageDocument = {
  _id:   "admissionsPage",
  _type: "admissionsPage",

  // ── Hero ───────────────────────────────────────────────────────
  hero: {
    breadcrumb: "Home / Admissions",
    eyebrow:    "Admissions and Intake",
    heading:    "Entry Into a Structured Technical Training Environment.",
    subheading:
      "NDAS admissions should be understood through the School's approved training pathways, nomination processes, and institutional requirements.",
    cta: { label: "Contact Admissions", href: "/contact" },
  },

  // ── Selection Process ──────────────────────────────────────────
  selection: {
    heading: "How Trainees Enter NDAS",
    note:    "Current intake information should be confirmed before publication.",
    status: {
      label: "Status: Active",
      cycle: "Recruitment Cycle 2026/27",
    },
    steps: keyedObjects([
      {
        step:    "01",
        title:   "Nomination",
        desc:
          "Eligible personnel are identified through the appropriate institutional process in line with current manpower and training requirements.",
        iconKey: "FileText",
      },
      {
        step:    "02",
        title:   "Drafting",
        desc:
          "Selected trainees receive formal direction to report for training in accordance with approved administrative procedures.",
        iconKey: "ClipboardList",
      },
      {
        step:    "03",
        title:   "Reporting & Induction",
        desc:
          "On arrival, trainees complete documentation, orientation, and other induction requirements before training begins.",
        iconKey: "UserCheck",
      },
      {
        step:    "04",
        title:   "Course Commencement",
        desc:
          "Apprentices commence structured instruction combining workshop practice, guided teaching, and practical task development.",
        iconKey: "Trophy",
      },
    ]),
  },

  // ── Eligibility ────────────────────────────────────────────────
  eligibility: {
    heading: {
      main:      "Admission Depends on",
      highlight: "Approved Criteria.",
    },
    subheading:
      "The admissions page should state only verified and current eligibility criteria. Where entries depend on service nomination, medical fitness, or official instructions, the wording should remain exact and procedural rather than promotional.",
    cta: { label: "Contact Admissions", href: "/contact" },
    criteria: keyedObjects([
      { text: "Must meet the currently approved eligibility conditions for the relevant intake category." },
      { text: "Must possess the required nomination, authorization, or institutional clearance where applicable." },
      { text: "Must satisfy documentation and reporting requirements communicated for the intake." },
    ]),
  },

  // ── FAQ ────────────────────────────────────────────────────────
  faq: {
    eyebrow: "Admissions Support",
    heading: {
      main: "Got questions?",
      sub:  "We've got answers.",
    },
    subheading:
      "Everything you need to know about joining. If you can't find your answer here, our team is one click away.",
    cta: { label: "Chat with Admissions", href: "/contact" },
    faqs: keyedObjects([
      {
        question: "Can civilians apply directly to NDAS?",
        answer:
          "Civilian or inter-service intake should only be described according to current approved policy. The website should not imply open access unless that has been formally authorized.",
      },
      {
        question: "How do applicants know when intake is active?",
        answer:
          "Intake information should be followed through official NDAS communication channels and published notices.",
      },
      {
        question: "Need clarification on admissions?",
        answer:
          "Contact the School for current intake guidance, joining instructions, and related enquiries.",
      },
    ]),
  },

  // ── CTA ────────────────────────────────────────────────────────
  cta: {
    heading:    "Begin Your Commissioning.",
    subheading:
      "Applications for the 2026/27 academic year close in 45 days. Don't miss your chance to join the Naval Dockyard Apprentice School.",
    primaryCta:   { label: "Launch Online Application", href: "/contact"    },
    secondaryCta: { label: "Inquire for Help",          href: "/contact"    },
  },
};

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding admissionsPage...");
  try {
    const result = await client.createOrReplace(admissionsPageDocument);
    console.log("✅ Success! ID:", result._id);
  } catch (err) {
    console.error("❌ Seed failed:");
    console.error(err);
    process.exit(1);
  }
}

seed();
