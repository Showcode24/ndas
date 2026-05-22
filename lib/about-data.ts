// data/about.data.ts
// All static content for the About page — text, images, nav, footer, etc.

/* ─────────────────────────── nav ─────────────────────────────── */


export const HERO = {
  eyebrow:          "Heritage, Mandate and Leadership",
  heading:          "A Technical School Shaped by the",
  headingHighlight: "Dockyard",
  headingTail:      "Environment.",
  subtext:
    "Learn how NDAS was reactivated, what it exists to do, and why its training setting matters.",
  breadcrumb: [
    { label: "Home",  href: "/" },
    { label: "About", href: "/about" },
  ],
  backgroundImage: "/images/about-hero.jpg",
} as const;

/* ─────────────────────────── heritage ───────────────────────── */

/**
 * Each paragraph is a plain string. The component is responsible for
 * bolding / highlighting `highlightDate` where it appears in the first paragraph.
 */
export const HERITAGE = {
  eyebrow:          "Heritage,",
  heading:          "Re-Commissioned to Rebuild",
  headingHighlight: "Technical Continuity.",
  paragraphs: [
    "The Naval Dockyard Apprentice School was re-commissioned on 31 May 2019 after a prolonged period of dormancy. Its reactivation reflected a practical institutional need: to restore a structured apprenticeship pathway for training artisans and technicians relevant to naval engineering support.",
    "NDAS is the technical training school of Naval Dockyard Limited. That relationship gives the School its distinctive relevance. Training is shaped by workshop culture, maintenance discipline, and the proximity of a real naval engineering environment.",
  ],
  /** Substring the component should render as a bold/highlighted span. */
  highlightDate: "31 May 2019",
  badge: {
    label:    "Established 2019",
    sublabel: "Re-commissioned after dormancy",
  },
} as const;

/* ─────────────────────────── mission / vision ───────────────── */

export const MISSION_VISION = {
  eyebrow: "Mandate",
  heading: "Mission, Vision and Values.",
  mission: {
    label: "Mission",
    text:  "To train skilled artisans and technicians for dockyard, ship repair, maintenance, and related engineering support functions within the Nigerian Navy and the wider maritime sector.",
  },
  vision: {
    label: "Vision",
    text:  "To be a credible centre for practical apprenticeship training in maritime-related engineering trades, producing graduates whose skills are disciplined, useful, and relevant.",
  },
  values: {
    label: "Values",
    intro:
      "The values of NDAS are centred around the Nigerian Navy Core Values — Integrity, Professionalism, and Teamwork. Apprentices are trained to be honest in all their conduct, to build technical competence with professionalism and personal discipline, and to complete projects collaboratively in the tradition of dockyard engineering practice.",
    tags:     ["Integrity", "Professionalism", "Teamwork"] as string[],
    footnote: "Nigerian Navy Core Values. Motto: Onward Together.",
  },
  ndlAdvantage: {
    heading: "The NDL Advantage",
    body:    "NDAS operates inside Naval Dockyard Limited — a live, active shipyard on Victoria Island, Lagos. Technical learning remains in close proximity to real maintenance culture, genuine engineering practice, and operational naval relevance. No off-site training institution can replicate this environment. Apprentices do not simply learn about dockyard work; they learn within it.",
    stats: [
      { value: "9",  label: "BAC Batches"       },
      { value: "7+", label: "Engineering Trades" },
    ],
  },
} as const;

/* ─────────────────────────── objectives ─────────────────────── */

export const OBJECTIVES = {
  eyebrow: "Objectives and Functions",
  heading: "What NDAS Is Designed to Do.",
  prose: [
    "The overall objective of NDAS is to provide skilled technical manpower to Naval Dockyard Limited, Naval Shipyard Limited, Fleet Support Groups, civilian dockyards, and Nigeria's maritime sector. NDAS enables the Nigerian Navy to develop the specialist skills needed to fill capability gaps in its maintenance facilities and aboard its fleet.",
    "Training spans a growing range of engineering fields: welding and fabrication, refrigeration and air conditioning, machining, pipe fitting, electrical wiring and circuit design, motor rewinding, minor ship construction, carpentry, woodwork, and mechatronics — areas that together represent the technical breadth of an active naval dockyard.",
  ],
  cta: { label: "View Engineering Trades →", href: "/academics" },
  functions: [
    "Conduct apprenticeship training to meet middle-skilled manpower requirements of the Nigerian Navy.",
    "Develop appropriate curricula to reflect best practices across each trade programme.",
    "Ascertain and enforce minimum standards for apprentices worthy of certification at NDAS.",
    "Develop daily and weekly training programmes appropriate to each course and specialisation.",
  ],
} as const;

/* ─────────────────────────── leadership ─────────────────────── */

export interface Leader {
  name:  string;
  role:  string;
  image: string;
  bio:   string;
}

export const SENIOR_LEADERS: Leader[] = [
  {
    name:  "Vice Admiral I Abbas",
    role:  "Chief of the Naval Staff",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnWFX8lUt2XWHUZj1eunLetC4DB68ZyTgKw&s",
    bio:   "Provides strategic direction for Nigerian Navy capability development and the renewal of technical manpower for fleet support, dockyard work, and maritime operations.",
  },
  {
    name:  "Rear Admiral NF Damtong",
    role:  "Chief of Naval Engineering",
    image: "https://navalshipyardlimited.com/naval_shipyard/uploads/2024/08/Real-Admiral-Damtong.png",
    bio:   "Guides engineering policy, standards, and technical capability priorities that shape NDAS training relevance across naval maintenance and repair needs.",
  },
  {
    name:  "Rear Admiral IE Shehu",
    role:  "Admiral Superintendent NDL",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVuKtANHeovdhjw_tk-aZs4gEbuAPJ2iQvA&s",
    bio:   "Provides dockyard-level supervision and ensures NDAS remains aligned with the production, maintenance, safety, and manpower needs of Naval Dockyard Limited.",
  },
  {
    name:  "Captain SI Shuaibu",
    role:  "Commanding Officer, NDAS",
    image: "/images/co-shuaibu.jpg",
    bio:   "Leads NDAS day-to-day command, training delivery, discipline, welfare, safety standards, digital improvement, and professional certification efforts.",
  },
];

export const PREVIOUS_COS: Leader[] = [
  {
    name:  "Capt E Chinaka",
    role:  "1st Commanding Officer",
    image: "/images/co-chinaka.jpg",
    bio:   "First Commanding Officer of the re-commissioned NDAS from 2019, Captain Chinaka laid the institutional foundation for the School's reactivation and established its initial training framework.",
  },
  {
    name:  "Capt CA Obika",
    role:  "2nd Commanding Officer",
    image: "/images/co-obika.jpg",
    bio:   "Second Commanding Officer, Captain Obika oversaw the commencement of BAC training in January 2022, marking the resumption of active technical apprenticeship at NDAS after three decades.",
  },
  {
    name:  "Capt SSK Mailabari",
    role:  "3rd Commanding Officer",
    image: "/images/co-mailabari.jpg",
    bio:   "Third Commanding Officer, Captain Mailabari continued the consolidation of the BAC programme and supported early efforts to broaden NDAS's certification pathways and institutional partnerships.",
  },
  {
    name:  "Capt KO Olanrewaju",
    role:  "4th Commanding Officer",
    image: "/images/co-olanrewaju.jpg",
    bio:   "Fourth Commanding Officer, Captain Olanrewaju oversaw the introduction of the Industrial Training programme from BAC V onward, a direct response to the post-BAC IV assessment of graduate proficiency.",
  },
  {
    name:  "Capt OEA Izilein",
    role:  "5th Commanding Officer",
    image: "/images/co-izilein.jpg",
    bio:   "Fifth Commanding Officer, Captain Izilein led NDAS through BAC VI to BAC VIII, initiated Trade Test and HSE certification arrangements, and advanced partnerships with ASYTC Egypt and other institutions.",
  },
];

export const CURRENT_CO: Leader = SENIOR_LEADERS[3];

export const CO_MESSAGE = {
  eyebrow: "From the Commanding Officer's Desk",
  heading: "Commanding Officer's Message.",
  paragraphs: [
    "Welcome to the Naval Dockyard Apprentice School (NDAS), Victoria Island, Lagos. Re-commissioned in May 2019, NDAS stands as a hub for technical skill acquisition within the Nigerian Navy. Our mandate is clear: to train and equip personnel with hands-on expertise in welding and fabrication, electrical/electronics and motor rewinding, plumbing and pipefitting, as well as woodwork and joinery.",
    "Guided by the vision of the Chief of the Naval Staff, the School plays a vital role in producing skilled artisanal manpower for Naval Dockyard Limited (NDL), Naval Shipyard Limited (NSL), and the Fleet Support Groups (FSGs).",
    "Our curriculum is structured across three progressive levels: the 6-month Basic Apprentice Course (BAC), the 9-month Intermediate Apprentice Course (IAC), and the one-year Advanced Apprentice Course (AAC). Since 2019, we have successfully graduated multiple cohorts and continue to expand the School's contribution to naval technical manpower development.",
    "As the sixth Commanding Officer since recommissioning, my focus is to strengthen the School's digital footprint, improve welfare and safety standards, and enhance professional certification for both staff and Under Training Ratings (UTRs). At NDAS, we are committed to ensuring that every trainee receives world-class technical training that aligns with the operational needs of the Nigerian Navy.",
    "With professionalism, teamwork, and integrity — the core values of the Nigerian Navy — as our compass, NDAS is proud to contribute to the growth of the Navy's technical manpower. We believe that technology is development, and we remain dedicated to contributing our quota to shaping the future of naval engineering through excellence in training.",
  ],
  name:    "Captain SI Shuaibu",
  title:   "Sixth Commanding Officer",
  school:  "Naval Dockyard Apprentice School",
  signoff: "Onward Together!",
} as const;

export const LEADERSHIP_SECTION = {
  eyebrow:              "Leadership",
  heading:              "Leadership Guiding NDAS Technical Training.",
  previousCOsEyebrow:   "Previous Commanding Officers",
  previousCOsHeading:   "The Officers Who Led NDAS.",
  previousCOsSubtext:   "Hover over each card to see the officer's contribution and tenure.",
  previousCOsFootnote:  "Individual tenure dates and achievement records will be updated as confirmed.",
} as const;

/* ─────────────────────────── CTA ────────────────────────────── */

export const CTA_SECTION = {
  eyebrow:      "Admissions & Enquiries",
  heading:      "Developing Technical Manpower for Naval and Maritime Support.",
  subtext:      "NDAS exists to train personnel whose practical skill can support maintenance, repair, and engineering readiness.",
  primaryCta:   { label: "View Admissions",    href: "/admissions" },
  secondaryCta: { label: "Contact the School", href: "/contact"    },
} as const;