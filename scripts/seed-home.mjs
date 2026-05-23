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
const homePageDocument = {
  _id:   "homePage",
  _type: "homePage",

  // ── Hero Slides ────────────────────────────────────────────────
  // backgroundImage omitted — upload via Studio
  heroSlides: keyedObjects([
    {
      heading:    "Developing Technical Manpower for Naval and Maritime Support.",
      subheading: "NDAS trains skilled artisans and technicians within the Naval Dockyard Limited environment at Victoria Island, Lagos.",
      primaryCta:   { label: "Explore Programmes", href: "/academics"  },
      secondaryCta: { label: "View Admissions",    href: "/admissions" },
    },
    {
      heading:    "Technology is Development.",
      subheading: "Re-commissioned on 31 May 2019, the Naval Dockyard Apprentice School continues to build technical capacity for the Nigerian Navy.",
      primaryCta:   { label: "About NDAS",       href: "/about"   },
      secondaryCta: { label: "Our Facilities",   href: "/facilities" },
    },
  ]),

  // ── About Section ──────────────────────────────────────────────
  about: {
    eyebrow: "About NDAS",
    heading: "Apprenticeship Built Around a Real Dockyard",
    body:
      "The technical training school of Naval Dockyard Limited, focused on apprenticeship, practical engineering trades, and dockyard-relevant technical manpower development.",
    primaryCta:   { label: "Learn More About NDAS", href: "/about"     },
    secondaryCta: { label: "Explore Programmes",    href: "/academics" },
  },

  // ── Stats / Snapshot Section ───────────────────────────────────
  stats: {
    badge: "Institutional Snapshot",
    heading: {
      prefix:    "Technical Training With",
      highlight: "Operational",
      suffix:    "Purpose.",
    },
    subheading:
      "A concise view of the School's structure, trade focus, and applied learning direction — inside the Naval Dockyard Limited compound at Victoria Island, Lagos.",
    items: keyedObjects([
      { value: "31 May 2019",      label: "Re-Commissioned"      },
      { value: "4",                label: "Core Trades"          },
      { value: "BAC · IAC · AAC",  label: "Training Pathway"     },
      { value: "Practical + IT",   label: "Applied Learning Model"},
    ]),
  },

  // ── Programs Section ────────────────────────────────────────────
  programs: {
    eyebrow:      "Training Areas",
    heading:      "Four Trades. One Dockyard Context.",
    viewAllCta:   { label: "View Academics", href: "/academics" },
    displayCount: 4,
  },

  // ── Features Section ────────────────────────────────────────────
  features: {
    eyebrow: "Why NDAS",
    heading: "Technical Training That Starts Closer to the Work.",
    items: keyedObjects([
      {
        title:       "Dockyard Proximity",
        description:
          "NDAS sits within the Naval Dockyard environment, giving training a practical context that ordinary classroom-based institutions cannot reproduce.",
      },
      {
        title:       "Trade-Based Instruction",
        description:
          "Training is organized around core engineering trades directly relevant to maintenance, repair, fabrication, and technical support.",
      },
      {
        title:       "Knowledge Preservation",
        description:
          "The School helps preserve and transfer practical dockyard skills required to sustain naval engineering capability over time.",
      },
    ]),
  },

  // ── Events Section ──────────────────────────────────────────────
  events: {
    heading:    "The Dockyard Calendar",
    body:       "Stay updated with our latest workshops, trade assessments, and school events happening on campus.",
    primaryCta: { label: "View Full Calendar", href: "/events" },
    displayCount: 3,
  },

  // ── CTA Section ─────────────────────────────────────────────────
  cta: {
    badge:      "Admissions Open",
    heading:    "Developing Technical Manpower for Naval and Maritime Support.",
    subheading:
      "NDAS exists to train personnel whose practical skill can support maintenance, repair, and engineering readiness inside the Naval Dockyard Limited environment.",
    primaryCta:   { label: "View Admissions",    href: "/admissions" },
    secondaryCta: { label: "Contact the School", href: "/contact"    },
  },
};

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding homePage...");
  try {
    const result = await client.createOrReplace(homePageDocument);
    console.log("✅ Success! ID:", result._id);
  } catch (err) {
    console.error("❌ Seed failed:");
    console.error(err);
    process.exit(1);
  }
}

seed();
