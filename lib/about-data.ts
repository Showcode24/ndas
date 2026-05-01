// lib/about-data.ts
// All static content for the About / Leadership page.

// ─── Current Leadership ───────────────────────────────────────────────────────
export const leadershipData = {
  cns: {
    name: "Vice Admiral I Abbas",
    title: "Chief of Naval Staff",
    image: "/cns-nigeria.jpg",
    rank: "vanguard",
  },
  coe: {
    name: "Rear Admiral NF Damtong",
    title: "Chief of Engineering",
    image: "/cone.png",
  },
  asndl: {
    name: "Rear Admiral IE Shehu",
    title: "Admiral Superintendent NDL",
    image: "/asndl.jpg",
  },
  co: {
    name: "Captain SI Shuaibu",
    title: "Commanding Officer, NDL Apprentice School",
    image: "/co-ndas.jpeg",
  },
} as const;

// ─── Past Commanding Officers ─────────────────────────────────────────────────
export const pastCommanders = [
  {
    name: "Cdre. A.O. Ibrahim",
    tenure: "2021 - 2023",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Spearheaded the integration of modern simulation labs and overhauled the mechanical curriculum.",
  },
  {
    name: "Cdre. M.T. Usman",
    tenure: "2018 - 2021",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Expanded the apprentice intake by 40% and initiated the dockyard automation training sequence.",
  },
  {
    name: "Capt. E.N. Okafor",
    tenure: "2015 - 2018",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Established the core electronics warfare modules and strengthened maritime agency relations.",
  },
  {
    name: "Capt. S.B. Dogo",
    tenure: "2012 - 2015",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Navigated the academy through its first major infrastructural upgrade and engineering workshops.",
  },
  {
    name: "Cdr. K.C. Nnadi",
    tenure: "2009 - 2012",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "The founding commanding officer who laid the academic foundation of the NDL Apprentice School.",
  },
] as const;

// ─── Page-level copy ──────────────────────────────────────────────────────────
export const aboutPageData = {
  // Meta
  meta: {
    title: "NDAS | About",
    breadcrumb: "Home / About",
  },

  // Hero — corrected per client
  hero: {
    badge: "History, Mandate and Leadership",
    heading: {
      main: "A Technical School Shaped by",
      highlight: "the Dockyard Environment.",
    },
    subheading:
      "Learn how NDAS was reactivated, what it exists to do, and why its training setting matters.",
  },

  // Heritage — added from client
  heritage: {
    eyebrow: "Heritage",
    heading: "Re-Commissioned to Rebuild Technical Continuity.",
    body: [
      "The Naval Dockyard Apprentice School was re-commissioned on 31 May 2019 after a prolonged period of dormancy. Its reactivation reflected a practical institutional need: to restore a structured apprenticeship pathway for training artisans and technicians relevant to naval engineering support.",
      "NDAS is the technical training school of Naval Dockyard Limited. That relationship gives the School its distinctive relevance. Training is shaped by workshop culture, maintenance discipline, and the proximity of a real naval engineering environment.",
    ],
  },

  // Mission, Vision and Values — added from client
  missionVision: {
    eyebrow: "Institutional Direction",
    heading: "Mission, Vision and Values",
    cards: [
      {
        title: "Mission",
        body: "To train skilled artisans and technicians for dockyard, ship repair, maintenance, and related engineering support functions.",
      },
      {
        title: "Vision",
        body: "To be a credible centre for practical apprenticeship training in maritime-related engineering trades.",
      },
      {
        title: "Discipline & Safety",
        body: "Technical competence at NDAS is built alongside workshop discipline, safety consciousness, and responsible conduct.",
      },
      {
        title: "The NDL Advantage",
        body: "Technical learning remains close to real maintenance culture and engineering practice.",
      },
    ],
  },

  // Organogram — unchanged
  organogram: {
    heading: "Command Hierarchy",
  },

  // CO Address — corrected per client
  address: {
    eyebrow: "Commanding Officer's Message",
    heading: {
      main: "Disciplined, Useful,",
      highlight: "and Relevant.",
      sub: "",
    },
    paragraphs: [
      "On behalf of the officers, instructors, and staff of NDAS, I welcome you to the School's website. NDAS was re-commissioned to rebuild a practical apprenticeship pathway for the Nigerian Navy and to preserve the technical knowledge that sustains dockyard work.",
      "Our responsibility is simple: to produce trainees whose skills are disciplined, useful, and relevant. That work continues through structured instruction, workshop practice, and constant effort to improve training quality.",
    ],
    signatoryRole: "Commanding Officer",
  },

  // Timeline — added from client (sits alongside CO address)
  timeline: [
    {
      marker: "2019",
      body: "NDAS re-commissioned on 31 May 2019.",
    },
    {
      marker: "Training Mandate",
      body: "Technical apprenticeship in four core trades for practical engineering support.",
    },
    {
      marker: "Development",
      body: "Strengthened workshop support, certification pathways, and curriculum progression.",
    },
  ],

  // Past Commanders — unchanged
  history: {
    eyebrow: "Historical Command",
    heading: "Past Commanders",
    subheading:
      "Honoring those who built and sustained the legacy of the NDL Apprentice School over the years.",
  },

  // CTA — unchanged
  cta: {
    heading: "Ready to join the ranks?",
    subheading:
      "Apply now to start your journey under the guidance of world-class naval engineers.",
    primaryCta: { label: "Start Application", href: "/admissions" },
    secondaryCta: { label: "Contact Admissions", href: "/contact" },
  },
} as const;
