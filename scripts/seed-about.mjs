import { createClient } from "@sanity/client";
import { config } from "dotenv";

config();

// ─── VALIDATE ENV VARS ─────────────────────────────
const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!PROJECT_ID) throw new Error("Missing SANITY_PROJECT_ID");
if (!TOKEN) throw new Error("Missing SANITY_API_WRITE_TOKEN");

// ─── CLIENT ────────────────────────────────────────
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── HELPER ────────────────────────────────────────
// Stamps every item in an array with a unique _key (required by Sanity)
const keyed = (items) =>
  items.map((item, i) => ({
    _key: `k${i}_${Math.random().toString(36).slice(2, 7)}`,
    ...(typeof item === "object" ? item : { _type: "string", value: item }),
  }));

// For plain string arrays (tags, paragraphs, functions, prose)
const keyedStrings = (strings) =>
  strings.map((s, i) => ({
    _key: `k${i}_${Math.random().toString(36).slice(2, 7)}`,
    _type: "block",
    value: s,
  }));

// ─── DOCUMENT ──────────────────────────────────────
const aboutPageDocument = {
  _id: "aboutPage",
  _type: "aboutPage",

  // ── Hero ───────────────────────────────────────────────────────
  hero: {
    eyebrow: "Heritage, Mandate and Leadership",
    heading: "A Technical School Shaped by the",
    headingHighlight: "Dockyard",
    headingTail: "Environment.",
    subtext:
      "Learn how NDAS was reactivated, what it exists to do, and why its training setting matters.",
    breadcrumb: keyed([
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ]),
    // backgroundImage omitted — upload via Studio
  },

  // ── Heritage ───────────────────────────────────────────────────
  heritage: {
    eyebrow: "Heritage,",
    heading: "Re-Commissioned to Rebuild",
    headingHighlight: "Technical Continuity.",
    paragraphs: keyed([
      "The Naval Dockyard Apprentice School was re-commissioned on 31 May 2019 after a prolonged period of dormancy. Its reactivation reflected a practical institutional need: to restore a structured apprenticeship pathway for training artisans and technicians relevant to naval engineering support.",
      "NDAS is the technical training school of Naval Dockyard Limited. That relationship gives the School its distinctive relevance. Training is shaped by workshop culture, maintenance discipline, and the proximity of a real naval engineering environment.",
    ]),
    highlightDate: "31 May 2019",
    badge: {
      label: "Established 2019",
      sublabel: "Re-commissioned after dormancy",
    },
  },

  // ── Mission / Vision ───────────────────────────────────────────
  missionVision: {
    eyebrow: "Mandate",
    heading: "Mission, Vision and Values.",
    mission: {
      label: "Mission",
      text: "To train skilled artisans and technicians for dockyard, ship repair, maintenance, and related engineering support functions within the Nigerian Navy and the wider maritime sector.",
    },
    vision: {
      label: "Vision",
      text: "To be a credible centre for practical apprenticeship training in maritime-related engineering trades, producing graduates whose skills are disciplined, useful, and relevant.",
    },
    values: {
      label: "Values",
      intro:
        "The values of NDAS are centred around the Nigerian Navy Core Values — Integrity, Professionalism, and Teamwork. Apprentices are trained to be honest in all their conduct, to build technical competence with professionalism and personal discipline, and to complete projects collaboratively in the tradition of dockyard engineering practice.",
      tags: keyed(["Integrity", "Professionalism", "Teamwork"]),
      footnote: "Nigerian Navy Core Values. Motto: Onward Together.",
    },
    ndlAdvantage: {
      heading: "The NDL Advantage",
      body: "NDAS operates inside Naval Dockyard Limited — a live, active shipyard on Victoria Island, Lagos. Technical learning remains in close proximity to real maintenance culture, genuine engineering practice, and operational naval relevance. No off-site training institution can replicate this environment. Apprentices do not simply learn about dockyard work; they learn within it.",
      stats: keyed([
        { value: "9", label: "BAC Batches" },
        { value: "7+", label: "Engineering Trades" },
      ]),
    },
  },

  // ── Objectives ─────────────────────────────────────────────────
  objectives: {
    eyebrow: "Objectives and Functions",
    heading: "What NDAS Is Designed to Do.",
    prose: keyed([
      "The overall objective of NDAS is to provide skilled technical manpower to Naval Dockyard Limited, Naval Shipyard Limited, Fleet Support Groups, civilian dockyards, and Nigeria's maritime sector. NDAS enables the Nigerian Navy to develop the specialist skills needed to fill capability gaps in its maintenance facilities and aboard its fleet.",
      "Training spans a growing range of engineering fields: welding and fabrication, refrigeration and air conditioning, machining, pipe fitting, electrical wiring and circuit design, motor rewinding, minor ship construction, carpentry, woodwork, and mechatronics — areas that together represent the technical breadth of an active naval dockyard.",
    ]),
    cta: { label: "View Engineering Trades →", href: "/academics" },
    functions: keyed([
      "Conduct apprenticeship training to meet middle-skilled manpower requirements of the Nigerian Navy.",
      "Develop appropriate curricula to reflect best practices across each trade programme.",
      "Ascertain and enforce minimum standards for apprentices worthy of certification at NDAS.",
      "Develop daily and weekly training programmes appropriate to each course and specialisation.",
    ]),
  },

  // ── Leadership ─────────────────────────────────────────────────
  leadership: {
    eyebrow: "Leadership",
    heading: "Leadership Guiding NDAS Technical Training.",

    // image omitted from all leaders — upload via Studio
    seniorLeaders: keyed([
      {
        name: "Vice Admiral I Abbas",
        role: "Chief of the Naval Staff",
        bio: "Provides strategic direction for Nigerian Navy capability development and the renewal of technical manpower for fleet support, dockyard work, and maritime operations.",
      },
      {
        name: "Rear Admiral NF Damtong",
        role: "Chief of Naval Engineering",
        bio: "Guides engineering policy, standards, and technical capability priorities that shape NDAS training relevance across naval maintenance and repair needs.",
      },
      {
        name: "Rear Admiral IE Shehu",
        role: "Admiral Superintendent NDL",
        bio: "Provides dockyard-level supervision and ensures NDAS remains aligned with the production, maintenance, safety, and manpower needs of Naval Dockyard Limited.",
      },
      {
        name: "Captain SI Shuaibu",
        role: "Commanding Officer, NDAS",
        bio: "Leads NDAS day-to-day command, training delivery, discipline, welfare, safety standards, digital improvement, and professional certification efforts.",
      },
    ]),

    currentCO: {
      name: "Captain SI Shuaibu",
      role: "Commanding Officer, NDAS",
      bio: "Leads NDAS day-to-day command, training delivery, discipline, welfare, safety standards, digital improvement, and professional certification efforts.",
    },

    coMessage: {
      eyebrow: "From the Commanding Officer's Desk",
      heading: "Commanding Officer's Message.",
      paragraphs: keyed([
        "Welcome to the Naval Dockyard Apprentice School (NDAS), Victoria Island, Lagos. Re-commissioned in May 2019, NDAS stands as a hub for technical skill acquisition within the Nigerian Navy. Our mandate is clear: to train and equip personnel with hands-on expertise in welding and fabrication, electrical/electronics and motor rewinding, plumbing and pipefitting, as well as woodwork and joinery.",
        "Guided by the vision of the Chief of the Naval Staff, the School plays a vital role in producing skilled artisanal manpower for Naval Dockyard Limited (NDL), Naval Shipyard Limited (NSL), and the Fleet Support Groups (FSGs).",
        "Our curriculum is structured across three progressive levels: the 6-month Basic Apprentice Course (BAC), the 9-month Intermediate Apprentice Course (IAC), and the one-year Advanced Apprentice Course (AAC). Since 2019, we have successfully graduated multiple cohorts and continue to expand the School's contribution to naval technical manpower development.",
        "As the sixth Commanding Officer since recommissioning, my focus is to strengthen the School's digital footprint, improve welfare and safety standards, and enhance professional certification for both staff and Under Training Ratings (UTRs). At NDAS, we are committed to ensuring that every trainee receives world-class technical training that aligns with the operational needs of the Nigerian Navy.",
        "With professionalism, teamwork, and integrity — the core values of the Nigerian Navy — as our compass, NDAS is proud to contribute to the growth of the Navy's technical manpower. We believe that technology is development, and we remain dedicated to contributing our quota to shaping the future of naval engineering through excellence in training.",
      ]),
      name: "Captain SI Shuaibu",
      title: "Sixth Commanding Officer",
      school: "Naval Dockyard Apprentice School",
      signoff: "Onward Together!",
    },

    // Flat sibling fields — NOT a nested object
    previousCOsEyebrow: "Previous Commanding Officers",
    previousCOsHeading: "The Officers Who Led NDAS.",
    previousCOsSubtext:
      "Hover over each card to see the officer's contribution and tenure.",
    previousCOsFootnote:
      "Individual tenure dates and achievement records will be updated as confirmed.",

    previousCOs: keyed([
      {
        name: "Capt E Chinaka",
        role: "1st Commanding Officer",
        bio: "First Commanding Officer of the re-commissioned NDAS from 2019, Captain Chinaka laid the institutional foundation for the School's reactivation and established its initial training framework.",
      },
      {
        name: "Capt CA Obika",
        role: "2nd Commanding Officer",
        bio: "Second Commanding Officer, Captain Obika oversaw the commencement of BAC training in January 2022, marking the resumption of active technical apprenticeship at NDAS after three decades.",
      },
      {
        name: "Capt SSK Mailabari",
        role: "3rd Commanding Officer",
        bio: "Third Commanding Officer, Captain Mailabari continued the consolidation of the BAC programme and supported early efforts to broaden NDAS's certification pathways and institutional partnerships.",
      },
      {
        name: "Capt KO Olanrewaju",
        role: "4th Commanding Officer",
        bio: "Fourth Commanding Officer, Captain Olanrewaju oversaw the introduction of the Industrial Training programme from BAC V onward, a direct response to the post-BAC IV assessment of graduate proficiency.",
      },
      {
        name: "Capt OEA Izilein",
        role: "5th Commanding Officer",
        bio: "Fifth Commanding Officer, Captain Izilein led NDAS through BAC VI to BAC VIII, initiated Trade Test and HSE certification arrangements, and advanced partnerships with ASYTC Egypt and other institutions.",
      },
    ]),
  },

  // ── CTA ────────────────────────────────────────────────────────
  cta: {
    eyebrow: "Admissions & Enquiries",
    heading: "Developing Technical Manpower for Naval and Maritime Support.",
    subtext:
      "NDAS exists to train personnel whose practical skill can support maintenance, repair, and engineering readiness.",
    primaryCta: { label: "View Admissions", href: "/admissions" },
    secondaryCta: { label: "Contact the School", href: "/contact" },
  },
};

// ─── SEED ──────────────────────────────────────────
async function seed() {
  console.log("Seeding aboutPage...");
  try {
    const result = await client.createOrReplace(aboutPageDocument);
    console.log("✅ Success! ID:", result._id);
  } catch (err) {
    console.error("❌ Seed failed:");
    console.error(err);
    process.exit(1);
  }
}

seed();
