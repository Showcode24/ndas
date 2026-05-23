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

// ─── GALLERY PAGE SINGLETON ────────────────────────
const galleryPageDocument = {
  _id:   "galleryPage",
  _type: "galleryPage",

  hero: {
    eyebrow:     "Photo Gallery",
    heading:     "Life Inside the Dockyard School.",
    subheading:
      "A visual record of training activities, graduation milestones, events, and daily life at the Naval Dockyard Apprentice School.",
    breadcrumbs: "Home / Gallery",
  },

  filters: {
    // "All" is prepended in the front-end
    categories: ["Events", "Facilities", "Training", "Graduation", "Sports"],
  },

  cta: {
    heading:    "Submit a Photo.",
    subheading:
      "Have images from an NDAS event or training activity? Contact the School to have them considered for the official gallery.",
    primaryCta:   { label: "Contact the School", href: "/contact" },
    secondaryCta: { label: "",                   href: ""         },
  },
};

// ─── GALLERY IMAGE DOCUMENTS ───────────────────────
// Images are not uploaded via seed — set `image` per document in Studio.
// The seed creates the metadata documents; editors upload photos in Studio.

const galleryImages = [
  {
    _id:      "gallery-training-exercise",
    _type:    "galleryImage",
    title:    "Training Exercise",
    category: "Training",
    date:     "2024-02-15",
    alt:      "Apprentices during a hands-on training exercise in the workshop.",
    featured: true,
  },
  {
    _id:      "gallery-dockyard-environment",
    _type:    "galleryImage",
    title:    "Dockyard Environment",
    category: "Facilities",
    date:     "2024-02-20",
    alt:      "A view of the Naval Dockyard Limited compound adjacent to NDAS.",
    featured: false,
  },
  {
    _id:      "gallery-graduation-ceremony",
    _type:    "galleryImage",
    title:    "Graduation Ceremony",
    category: "Graduation",
    date:     "2024-01-10",
    alt:      "BAC graduates during the passing-out parade at NDAS.",
    featured: true,
  },
  {
    _id:      "gallery-sports-championship",
    _type:    "galleryImage",
    title:    "Sports Championship",
    category: "Sports",
    date:     "2024-02-28",
    alt:      "NDAS trainees competing during the Annual Sports Day.",
    featured: false,
  },
  {
    _id:      "gallery-engineering-workshop",
    _type:    "galleryImage",
    title:    "Engineering Workshop",
    category: "Training",
    date:     "2024-03-05",
    alt:      "Welding and fabrication practical session in the NDAS workshop.",
    featured: false,
  },
  {
    _id:      "gallery-foundation-day",
    _type:    "galleryImage",
    title:    "Foundation Day 2024",
    category: "Events",
    date:     "2024-05-31",
    alt:      "Officers and trainees assembled for the NDAS Foundation Day celebration.",
    featured: false,
  },
  {
    _id:      "gallery-electrical-lab",
    _type:    "galleryImage",
    title:    "Electrical Electronics Lab",
    category: "Facilities",
    date:     "2024-03-12",
    alt:      "Interior view of the NDAS Electrical Electronics Workshop.",
    featured: false,
  },
  {
    _id:      "gallery-bac-passout",
    _type:    "galleryImage",
    title:    "BAC Passing-Out Parade",
    category: "Graduation",
    date:     "2023-12-15",
    alt:      "Under-training ratings during the Basic Apprentice Course passing-out parade.",
    featured: false,
  },
];

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding galleryPage singleton...");
  try {
    const result = await client.createOrReplace(galleryPageDocument);
    console.log("✅ galleryPage seeded! ID:", result._id);
  } catch (err) {
    console.error("❌ galleryPage seed failed:", err);
    process.exit(1);
  }

  console.log(`\nSeeding ${galleryImages.length} gallery image documents...`);
  for (const img of galleryImages) {
    try {
      const result = await client.createOrReplace(img);
      console.log(`✅ galleryImage seeded: ${result._id}`);
    } catch (err) {
      console.error(`❌ Failed to seed image: ${img._id}`, err);
      process.exit(1);
    }
  }

  console.log("\n✅ All gallery data seeded. Upload images in Studio per document.");
}

seed();
