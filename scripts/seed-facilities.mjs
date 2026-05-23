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
// _key is required on arrays of OBJECTS, not primitives.
const keyedObjects = (items) =>
  items.map((item, i) => ({
    _key: `k${i}_${Math.random().toString(36).slice(2, 7)}`,
    ...item,
  }));

// ─── DOCUMENT ──────────────────────────────────────
const facilitiesPageDocument = {
  _id:   "facilitiesPage",
  _type: "facilitiesPage",

  // ── Hero ───────────────────────────────────────────────────────
  hero: {
    eyebrow:     "Workshops and Infrastructure",
    title:       "Facilities That Support Applied Learning.",
    description: "NDAS combines dedicated training spaces with the wider practical value of the Naval Dockyard environment.",
    breadcrumbs: "Home / Facilities",
  },

  // ── Training Environment ───────────────────────────────────────
  trainingEnvironment: {
    title:
      "Practical Space Matters in Technical Training.",
    description:
      "The School's facilities should be presented honestly and specifically. Their value lies in how they support workshop learning, trade practice, safety, and skill development across departments.",
  },

  // ── Facility Cards ─────────────────────────────────────────────
  // Images omitted — upload via Studio; set the `image` field per card.
  facilities: keyedObjects([
    {
      id:          "welding",
      name:        "Welding & Fabrication Workshop",
      category:    "Workshop",
      description:
        "A practical training space for metal joining, fabrication work, cutting operations, and related workshop tasks.",
    },
    {
      id:          "electrical",
      name:        "Electrical Electronics Workshop",
      category:    "Laboratory",
      description:
        "A dedicated environment for electrical installation practice, motor rewinding, fault tracing, and related exercises.",
    },
    {
      id:          "plumbing",
      name:        "Plumbing Training Bay",
      category:    "Workshop",
      description:
        "A purpose-built area for practical plumbing and pipe fitting exercises, including installation and maintenance tasks.",
    },
    {
      id:          "carpentry",
      name:        "Carpentry & Joinery Workshop",
      category:    "Workshop",
      description:
        "A workshop space for woodwork, joinery practice, fitting tasks, and related practical training activities.",
    },
  ]),

  // ── Highlights ────────────────────────────────────────────────
  highlights: keyedObjects([
    {
      title:   "Ship Simulator Lab",
      desc:    "Advanced bridge simulation for navigation and vessel operations",
      iconKey: "Ship",
    },
    {
      title:   "Machine Shop",
      desc:    "CNC machines and precision engineering equipment",
      iconKey: "Settings",
    },
    {
      title:   "Electrical Lab",
      desc:    "Comprehensive electrical systems testing and training",
      iconKey: "Zap",
    },
    {
      title:   "Library & Resources",
      desc:    "Extensive maritime and engineering reference materials",
      iconKey: "Library",
    },
  ]),

  // ── Extended Context ───────────────────────────────────────────
  extendedContext: {
    eyebrow: "Extended Practical Context",
    title:   "The Dockyard Is Part of the Learning Environment.",
    description:
      "NDAS should not present its facilities as if they are a closed campus disconnected from industry. Its real advantage is that the School's workshops exist within the broader environment of Naval Dockyard Limited, where technical work, maintenance culture, and engineering practice remain visible and relevant.",
    cta: {
      text: "View Location on Map",
      link: "/contact",
    },
  },
};

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding facilitiesPage...");
  try {
    const result = await client.createOrReplace(facilitiesPageDocument);
    console.log("✅ Success! ID:", result._id);
  } catch (err) {
    console.error("❌ Seed failed:");
    console.error(err);
    process.exit(1);
  }
}

seed();
