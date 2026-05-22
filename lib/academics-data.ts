// data/academics.data.ts
// All static content for the Academics page

/* ─────────────────────────── hero ───────────────────────────── */

export const HERO = {
  eyebrow:          "Training Programmes",
  heading:          "A Practical Curriculum Built Around",
  headingHighlight: "Trade",
  headingTail:      "Competence.",
  subtext:
    "NDAS training is organized around progressive apprenticeship development, hands-on learning, and four core technical trades.",
  breadcrumb: [
    { label: "Home",      href: "/"          },
    { label: "Academics", href: "/academics" },
  ],
  backgroundImage: "/images/academics-hero.jpg",
  scrollLabel:     "Scroll to explore",
} as const;

/* ─────────────────────────── training structure ─────────────── */

export const TRAINING_STRUCTURE = {
  eyebrow: "Training Structure",
  heading: "From Foundational Exposure to",
  headingHighlight: "Higher Technical Proficiency.",
  body:
    "The Basic Apprentice Course introduces trainees to trade practice, workshop culture, and practical task execution. The Intermediate and Advanced Apprentice Courses are intended to deepen technical competence and broaden specialization.",
} as const;

/* ─────────────────────────── trades ─────────────────────────── */

export interface Trade {
  code:        string;
  title:       string;
  description: string;
  category:    string;
  badges:      string[];
}

export const TRADES: Trade[] = [
  {
    code:        "WF-101",
    title:       "Welding & Fabrication",
    description:
      "Training in metal joining processes, fabrication techniques, cutting methods, and practical repair support.",
    category: "Mechanical",
    badges:   ["BAC", "Industrial Training"],
  },
  {
    code:        "EE-201",
    title:       "Electrical Electronics",
    description:
      "Training in electrical installation, basic controls, fault diagnosis, and motor rewinding.",
    category: "Electrical",
    badges:   ["BAC", "Electrical"],
  },
  {
    code:        "PP-301",
    title:       "Plumbing & Pipe Fitting",
    description:
      "Training in pipe systems, fittings, installation methods, and maintenance procedures.",
    category: "Mechanical",
    badges:   ["BAC", "Mechanical"],
  },
  {
    code:        "CJ-401",
    title:       "Carpentry & Joinery",
    description:
      "Training in woodwork, joinery, fitting, structural tasks, and practical workshop operations.",
    category: "Construction",
    badges:   ["BAC", "Construction"],
  },
];

/* ─────────────────────────── features ───────────────────────── */

export interface Feature {
  title:       string;
  description: string;
  iconKey:     "dockyard" | "practical" | "certification";
}

export const FEATURES: Feature[] = [
  {
    title:       "Real Dockyard Context",
    description:
      "The School's biggest advantage is that training takes place within the operational environment of Naval Dockyard Limited, not in isolation from it.",
    iconKey: "dockyard",
  },
  {
    title:       "Practical Emphasis",
    description:
      "The training model places strong weight on practical work, workshop exposure, and applied learning rather than theory alone.",
    iconKey: "practical",
  },
  {
    title:       "Certification Support",
    description:
      "NDAS is strengthening the formal value of its training through Trade Test, HSE, and other curriculum-linked certification pathways.",
    iconKey: "certification",
  },
];

/* ─────────────────────────── CTA ────────────────────────────── */

export const CTA_SECTION = {
  eyebrow:      "Admissions & Enquiries",
  heading:      "Start Your Apprenticeship Journey at NDAS.",
  subtext:
    "Discover how to apply, what pathways are available, and how NDAS can shape your technical career.",
  primaryCta:   { label: "View Admissions",    href: "/admissions" },
  secondaryCta: { label: "Contact the School", href: "/contact"    },
} as const;