// lib/home-data.ts
// All static content for the Home page.
// Sourced from client-supplied institution data — edit here to update copy.

// ─── Institution ─────────────────────────────────────────────────────────────
export const institution = {
  name: "Naval Dockyard Apprentice School",
  abbreviation: "NDAS",
  parentOrganization: "Naval Dockyard Limited",
  recommissioned: "31 May 2019",
  tagline: "Technology is Development",
  description:
    "The technical training school of Naval Dockyard Limited, focused on apprenticeship, practical engineering trades, and dockyard-relevant technical manpower development.",
  location: {
    address:
      "Naval Dockyard Apprentice School 28, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
    area: "Naval Dockyard Limited Compound",
    city: "Victoria Island",
    state: "Lagos",
    country: "Nigeria",
  },
} as const;

// ─── Snapshot Stats ───────────────────────────────────────────────────────────
export const snapshot = {
  recommissioned: "31 May 2019",
  coreTrades: 4,
  trainingPathway: ["BAC", "IAC", "AAC"],
  learningModel: "Practical + IT",
} as const;

// ─── Trades ───────────────────────────────────────────────────────────────────
export const trades = [
  {
    name: "Welding & Fabrication",
    description:
      "Training in metal joining, fabrication processes, and practical repair support relevant to shipyard and engineering environments.",
    category: "Mechanical",
    pathway: ["BAC"],
  },
  {
    name: "Electrical Electronics & Motor Rewinding",
    description:
      "Training in electrical installation, basic controls, fault tracing, and motor rewinding for technical support and maintenance roles.",
    category: "Electrical",
    pathway: ["BAC"],
  },
  {
    name: "Plumbing & Pipe Fitting",
    description:
      "Training in pipe systems, fittings, installation practice, and maintenance tasks applicable to workshop and utility environments.",
    category: "Mechanical",
    pathway: ["BAC"],
  },
  {
    name: "Carpentry & Joinery",
    description:
      "Training in woodwork, joinery, structural fittings, and practical workshop tasks relevant to support and maintenance functions.",
    category: "Construction",
    pathway: ["BAC"],
  },
] as const;

// ─── Key Features ─────────────────────────────────────────────────────────────
export const keyFeatures = [
  {
    title: "Dockyard Proximity",
    description:
      "NDAS sits within the Naval Dockyard environment, giving training a practical context that ordinary classroom-based institutions cannot reproduce.",
  },
  {
    title: "Trade-Based Instruction",
    description:
      "Training is organized around core engineering trades directly relevant to maintenance, repair, fabrication, and technical support.",
  },
  {
    title: "Knowledge Preservation",
    description:
      "The School helps preserve and transfer practical dockyard skills required to sustain naval engineering capability over time.",
  },
] as const;

// ─── Admissions ───────────────────────────────────────────────────────────────
export const admissions = {
  pathways: ["BAC", "IAC", "AAC"],
  additionalServices: ["Trade Test", "HSE Support"],
  enquiryPage: "/admissions",
} as const;

// ─── Page-level copy ─────────────────────────────────────────────────────────
export const homeData = {
  // About Section
  about: {
    eyebrow: "About NDAS",
    heading: "Apprenticeship Built Around a Real Dockyard",
    body: institution.description,
    primaryCta: { label: "Learn More About NDAS", href: "/about" },
    secondaryCta: { label: "Explore Programmes", href: "/academics" },
  },

  // Snapshot / Stats Section
  stats: {
    badge: "Institutional Snapshot",
    heading: {
      prefix: "Technical Training With",
      highlight: "Operational",
      suffix: "Purpose.",
    },
    subheading:
      "A concise view of the School's structure, trade focus, and applied learning direction — inside the Naval Dockyard Limited compound at Victoria Island, Lagos.",
    items: [
      { value: snapshot.recommissioned, label: "Re-Commissioned" },
      { value: String(snapshot.coreTrades), label: "Core Trades" },
      {
        value: snapshot.trainingPathway.join(" · "),
        label: "Training Pathway",
      },
      { value: snapshot.learningModel, label: "Applied Learning Model" },
    ],
  },

  // Trades / Programs Section
  programs: {
    eyebrow: "Training Areas",
    heading: "Four Trades. One Dockyard Context.",
    viewAllCta: { label: "View Academics", href: "/academics" },
    displayCount: 4,
  },

  // Key Features Section
  features: {
    eyebrow: "Why NDAS",
    heading: "Technical Training That Starts Closer to the Work.",
  },

  // Events Section
  events: {
    heading: "The Dockyard Calendar",
    body: "Stay updated with our latest workshops, trade assessments, and school events happening on campus.",
    primaryCta: { label: "View Full Calendar", href: "/events" },
    displayCount: 3,
  },

  // CTA Section
  cta: {
    badge: "Admissions Open",
    heading: "Developing Technical Manpower for Naval and Maritime Support.",
    subheading:
      "NDAS exists to train personnel whose practical skill can support maintenance, repair, and engineering readiness inside the Naval Dockyard Limited environment.",
    primaryCta: { label: "View Admissions", href: "/admissions" },
    secondaryCta: { label: "Contact the School", href: "/contact" },
  },
} as const;
