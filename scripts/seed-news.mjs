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

// ─── NEWS PAGE SINGLETON ───────────────────────────
const newsPageDocument = {
  _id:   "newsPage",
  _type: "newsPage",

  hero: {
    eyebrow:     "News & Events",
    heading:     "Updates from the Dockyard.",
    subheading:
      "Stay informed about NDAS training milestones, institutional events, partnerships, and announcements relevant to the School and its community.",
    breadcrumbs: "Home / News & Events",
  },

  filters: {
    // "All" is prepended in the front-end — list only the named categories here
    categories: [
      "Achievement",
      "Facility",
      "Partnership",
      "Academic",
      "Sports",
      "Cultural",
      "Technical",
      "Announcement",
    ],
  },

  cta: {
    heading:    "Have a Story to Share?",
    subheading:
      "Contact the School to submit news, event notices, or announcements relevant to NDAS training and the wider naval engineering community.",
    primaryCta:   { label: "Contact the School", href: "/contact" },
    secondaryCta: { label: "",                   href: ""         },
  },
};

// ─── NEWS POSTS ────────────────────────────────────
const newsPosts = [
  {
    _id:      "news-graduates-achieve-excellence",
    _type:    "newsPost",
    title:    "NDAS Graduates Achieve Excellence",
    slug:     { _type: "slug", current: "ndas-graduates-achieve-excellence" },
    category: "Achievement",
    postType: "news",
    date:     "2024-03-10",
    excerpt:
      "Recent batch of NDAS graduates recognised in national maritime competition, reflecting the School's commitment to practical technical excellence.",
    body:
      "A recent cohort of NDAS graduates demonstrated outstanding performance in a national maritime technical competition, drawing recognition from institutional partners and senior naval officers. Their performance affirmed the value of the School's hands-on, dockyard-embedded training model.",
    featured: true,
    // image omitted — upload via Studio
  },
  {
    _id:      "news-new-research-lab-inaugurated",
    _type:    "newsPost",
    title:    "New Training Lab Space Inaugurated",
    slug:     { _type: "slug", current: "new-training-lab-inaugurated" },
    category: "Facility",
    postType: "news",
    date:     "2024-03-05",
    excerpt:
      "An expanded training facility has been commissioned at NDAS to support growing intake and broader trade coverage.",
    body:
      "The new facility provides additional workshop capacity for apprentices across the Electrical Electronics and Welding & Fabrication trades. The commissioning was attended by senior officers from Naval Dockyard Limited and NDAS staff.",
    featured: false,
  },
  {
    _id:      "news-industry-partnership-announcement",
    _type:    "newsPost",
    title:    "NDAS Advances Certification Partnership",
    slug:     { _type: "slug", current: "ndas-advances-certification-partnership" },
    category: "Partnership",
    postType: "news",
    date:     "2024-02-28",
    excerpt:
      "NDAS has strengthened its Trade Test and HSE certification pathways through formalised institutional arrangements.",
    body:
      "Engagement with SUVTC Yaba and Novelle Training Center has progressed to the point of active certification support for NDAS trainees. These partnerships directly address the need for externally recognised credentials alongside the School's internal award of completion.",
    featured: false,
  },
  // ── Events ─────────────────────────────────────────
  {
    _id:      "event-annual-sports-day",
    _type:    "newsPost",
    title:    "Annual Sports Day",
    slug:     { _type: "slug", current: "annual-sports-day-2024" },
    category: "Sports",
    postType: "event",
    date:     "2024-04-15",
    excerpt:  "Inter-class sports competitions across the NDAS campus.",
    body:
      "The Annual Sports Day brings together all BAC cohorts for a full day of competitive athletics and team events within the NDAS compound. The event supports welfare, physical readiness, and camaraderie among under-training ratings.",
    location: "NDAS Grounds",
    featured: false,
  },
  {
    _id:      "event-technical-symposium-2024",
    _type:    "newsPost",
    title:    "Technical Symposium 2024",
    slug:     { _type: "slug", current: "technical-symposium-2024" },
    category: "Technical",
    postType: "event",
    date:     "2024-05-10",
    excerpt:  "Industry experts discuss developments in naval engineering and technical training.",
    body:
      "The Technical Symposium convenes practitioners from NDL, NSL, and partner institutions to share knowledge relevant to naval engineering, maintenance practices, and apprenticeship training. Presentations are open to NDAS staff and senior cohort trainees.",
    location: "Main Auditorium",
    featured: true,
  },
  {
    _id:      "event-foundation-day",
    _type:    "newsPost",
    title:    "Foundation Day Celebration",
    slug:     { _type: "slug", current: "foundation-day-2024" },
    category: "Cultural",
    postType: "event",
    date:     "2024-05-31",
    excerpt:  "Celebrating the re-commissioning of NDAS and recognising institutional milestones.",
    body:
      "Foundation Day marks the anniversary of the School's re-commissioning on 31 May 2019. The event recognises staff, graduates, and institutional stakeholders who have contributed to NDAS's growth since its reactivation.",
    location: "Campus",
    featured: false,
  },
  {
    _id:      "event-advanced-engineering-workshop",
    _type:    "newsPost",
    title:    "Advanced Engineering Workshop",
    slug:     { _type: "slug", current: "advanced-engineering-workshop-2024" },
    category: "Academic",
    postType: "event",
    date:     "2024-06-01",
    excerpt:  "Hands-on training session in current engineering practices for IAC and AAC trainees.",
    body:
      "A focused practical workshop for Intermediate and Advanced Apprentice Course trainees, covering current engineering practices relevant to NDL maintenance and shipyard operations. External facilitators from partner institutions will support delivery.",
    location: "Workshop Complex",
    featured: false,
  },
];

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding newsPage singleton...");
  try {
    const result = await client.createOrReplace(newsPageDocument);
    console.log("✅ newsPage seeded! ID:", result._id);
  } catch (err) {
    console.error("❌ newsPage seed failed:", err);
    process.exit(1);
  }

  console.log(`\nSeeding ${newsPosts.length} news/event posts...`);
  for (const post of newsPosts) {
    try {
      const result = await client.createOrReplace(post);
      console.log(`✅ newsPost seeded: ${result._id}`);
    } catch (err) {
      console.error(`❌ Failed to seed post: ${post._id}`, err);
      process.exit(1);
    }
  }

  console.log("\n✅ All news & events data seeded successfully.");
}

seed();
