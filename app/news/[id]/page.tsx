"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { usePathname } from "next/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─────────────────────────── constants ─────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

const NAV = [
  { label: "Home", href: "/", active: true, dropdown: false },
  { label: "About NDAS", href: "/about", dropdown: true },
  { label: "Academics", href: "/academics", dropdown: true },
  { label: "Admissions", href: "/admissions", dropdown: false },
  { label: "Facilities", href: "/facilities", dropdown: false },
  { label: "Partnerships", href: "/partnerships", dropdown: false },
  { label: "News & Events", href: "/news", dropdown: false },
  { label: "Gallery", href: "/gallery", dropdown: false },
];

const ARTICLES: Record<number, {
  category: string;
  date: string;
  title: string;
  image: string;
  author: string;
  readTime: string;
  content: string[];
  quote?: string;
  relatedIds: number[];
}> = {
  1: {
    category: "Events",
    date: "15 March 2026",
    title: "NDAS Hosts Annual Skills Exhibition and Trade Demonstration",
    image: "/news/skills-exhibition.jpg",
    author: "NDAS Communications",
    readTime: "4 min read",
    content: [
      "The Naval Dockyard Apprentice School hosted its annual Skills Exhibition on 15 March 2026, bringing together apprentices, instructors, naval leadership, and industry partners for a comprehensive demonstration of practical competencies across all four core engineering trades.",
      "The exhibition, held within the Naval Dockyard at Victoria Island, Lagos, provided a platform for apprentices to showcase the technical skills they have developed through the Basic Apprenticeship Course (BAC). Visitors observed live demonstrations in Welding & Fabrication, Electrical Electronics & Motor Rewinding, Plumbing & Pipe Fitting, and Carpentry & Joinery.",
      "Rear Admiral IE Shehu, Admiral Superintendent of Naval Dockyard Limited, attended the opening ceremony and emphasised the critical role of practical training in sustaining naval engineering capability. \"The skills demonstrated here today directly support our fleet maintenance and readiness operations,\" he stated.",
      "Industry partners from maritime engineering firms and technical training institutions were present, with several expressing interest in collaborative training programmes. The event also included a panel discussion on the future of dockyard-based technical education in Nigeria.",
      "The Skills Exhibition has become a cornerstone of the NDAS calendar, reinforcing the school's commitment to transparency in training outcomes and fostering relationships between the naval dockyard and the wider technical education sector.",
    ],
    quote: "The skills demonstrated here today directly support our fleet maintenance and readiness operations.",
    relatedIds: [2, 5, 6],
  },
  2: {
    category: "Training",
    date: "28 February 2026",
    title: "Welding & Fabrication Cohort Completes Phase II Dockyard Assessment",
    image: "/news/welding-assessment.jpg",
    author: "Training Department",
    readTime: "3 min read",
    content: [
      "The latest cohort of Welding & Fabrication apprentices has successfully completed their Phase II practical assessment, marking a significant milestone in their progression through the Basic Apprenticeship Course at NDAS.",
      "The assessment involved live repair support scenarios within the active dockyard environment, requiring apprentices to demonstrate proficiency in shielded metal arc welding (SMAW), gas metal arc welding (GMAW), and basic fabrication techniques under time constraints.",
      "Instructors evaluated each apprentice on weld quality, safety protocol adherence, problem-solving ability, and efficiency. The cohort achieved a 94% pass rate, with three apprentices receiving distinction marks for exceptional workmanship.",
      "The Phase II assessment is designed to simulate real-world dockyard conditions, ensuring that apprentices can apply their training to actual ship repair and maintenance tasks. This practical evaluation model is a defining feature of NDAS training methodology.",
      "Successful completion of Phase II qualifies apprentices for advanced modules in structural fabrication and underwater welding preparation, scheduled to commence in April 2026.",
    ],
    relatedIds: [1, 5, 3],
  },
  3: {
    category: "Announcements",
    date: "10 February 2026",
    title: "Admissions Open for 2026/2027 Basic Apprenticeship Course",
    image: "/news/admissions-open.jpg",
    author: "Admissions Office",
    readTime: "5 min read",
    content: [
      "The Naval Dockyard Apprentice School has officially opened applications for the 2026/2027 intake of the Basic Apprenticeship Course (BAC), offering training across four core engineering trades: Welding & Fabrication, Electrical Electronics & Motor Rewinding, Plumbing & Pipe Fitting, and Carpentry & Joinery.",
      "The BAC programme spans 24 months of intensive practical and theoretical instruction, conducted within the Naval Dockyard environment at Victoria Island, Lagos. Successful candidates will receive certification recognised by the Nigerian Navy and relevant trade test authorities.",
      "Eligibility requirements include a minimum of five O'Level credits including Mathematics and English, physical fitness certification, and successful completion of the NDAS entrance examination. Candidates with prior technical qualifications may be considered for advanced placement.",
      "The application window closes on 30 April 2026. Entrance examinations will be conducted in May 2026, with successful candidates commencing training in July 2026. Limited hostel accommodation is available on a first-come basis.",
      "Interested applicants are encouraged to visit the NDAS admissions portal or contact the school directly for detailed application guidelines and programme information.",
    ],
    relatedIds: [4, 2, 6],
  },
  4: {
    category: "Partnerships",
    date: "22 January 2026",
    title: "NDAS Signs Technical Cooperation Agreement with Maritime Engineering Firm",
    image: "/news/partnership.jpg",
    author: "Partnerships Office",
    readTime: "3 min read",
    content: [
      "The Naval Dockyard Apprentice School has entered into a technical cooperation agreement with a leading maritime engineering firm, marking a significant expansion of NDAS training capabilities and industry connectivity.",
      "The partnership, signed on 22 January 2026, will provide NDAS apprentices with access to advanced tooling, specialised equipment, and guest instruction from experienced maritime engineers. The agreement focuses on enhancing training in electrical systems and mechanical maintenance disciplines.",
      "Under the terms of the cooperation, the partner firm will conduct quarterly workshops at the NDAS facility, covering topics including marine electrical diagnostics, precision machining, and modern fabrication techniques. NDAS instructors will also receive refresher training on emerging technologies.",
      "Commodore OEA Izilein, Commanding Officer of the Naval Dockyard Apprentice School, described the partnership as \"a strategic investment in the quality and relevance of our training output.\" He noted that such collaborations ensure NDAS graduates remain competitive in both naval and civilian technical sectors.",
      "The agreement is initially valid for three years, with provisions for extension based on training outcomes and mutual satisfaction.",
    ],
    quote: "A strategic investment in the quality and relevance of our training output.",
    relatedIds: [1, 3, 5],
  },
  5: {
    category: "Training",
    date: "05 January 2026",
    title: "Electrical Electronics Apprentices Begin Motor Rewinding Specialisation",
    image: "/news/electrical-training.jpg",
    author: "Training Department",
    readTime: "3 min read",
    content: [
      "The Electrical Electronics trade programme at NDAS has introduced an advanced Motor Rewinding specialisation module, supported by new equipment installed in the electrical workshop during the December 2025 break.",
      "The module addresses a critical skill gap in naval engineering maintenance: the ability to rewind and repair electric motors used in shipboard systems, dockyard machinery, and auxiliary equipment. Apprentices will learn single-phase and three-phase motor rewinding techniques, coil winding procedures, and insulation testing protocols.",
      "New equipment includes a programmable coil winding machine, varnish impregnation tank, and precision testing instruments valued at over \u20a612 million. The equipment was procured through the Naval Dockyard Limited capital development programme.",
      "The specialisation module spans eight weeks and is integrated into the second year of the Basic Apprenticeship Course. It complements existing training in electrical installation, basic controls, and fault tracing.",
      "Senior Chief Nwosu, Lead Instructor for Electrical Electronics, noted that motor rewinding capability significantly enhances the employability of NDAS graduates, both within the Nigerian Navy and in civilian maritime and industrial sectors.",
    ],
    relatedIds: [2, 4, 1],
  },
  6: {
    category: "Events",
    date: "12 December 2025",
    title: "End-of-Year Apprentice Showcase Highlights Dockyard Projects",
    image: "/news/showcase.jpg",
    author: "NDAS Communications",
    readTime: "4 min read",
    content: [
      "The Naval Dockyard Apprentice School concluded its 2025 training calendar with the annual End-of-Year Apprentice Showcase, presenting completed projects from all four core trades to naval leadership, families, and invited guests.",
      "The showcase featured over forty individual and group projects, ranging from fabricated steel structures and rewound electric motors to fitted pipe systems and custom woodwork pieces. Each project was evaluated by a panel of senior instructors and dockyard engineers.",
      "Best Project awards were presented across four categories: Welding & Fabrication (a portable welding trolley for dockyard use), Electrical Electronics (an automated motor testing bench), Plumbing & Pipe Fitting (a shipboard freshwater distribution model), and Carpentry & Joinery (a custom navigation chart cabinet).",
      "Families of apprentices attended the ceremony, providing a rare opportunity for them to observe the practical outcomes of the training programme. Several parents expressed appreciation for the discipline and technical growth evident in their children's work.",
      "The event concluded with a commissioning address by Rear Admiral NF Darton, Chief of Naval Engineering, who reaffirmed the Nigerian Navy's commitment to technical manpower development through institutions like NDAS.",
    ],
    relatedIds: [1, 3, 2],
  },
};

const FOOTER_COLS = [
  {
    heading: "Explore",
    links: [
      { label: "About NDAS", href: "/about" },
      { label: "Academics", href: "/academics" },
      { label: "Facilities", href: "/facilities" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Entry Information", href: "/admissions" },
      { label: "BAC · IAC · AAC", href: "/admissions" },
      { label: "Trade Test & HSE Support", href: "/admissions" },
    ],
  },
  {
    heading: "Contact",
    links: [
      {
        label: "Naval Dockyard Apprentice School 28, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
        href: "#",
      },
      { label: "Email: info@ndlapprenticeschool.com", href: "#" },
      { label: "Phone: +234 904 799 8706", href: "/contact" },
      { label: "Send an enquiry", href: "/contact" },
    ],
  },
];

/* ─────────────────────────── primitives ────────────────────────── */

function Eyebrow({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-[2px] bg-[#af8f47] rounded-full flex-shrink-0" />
      <span
        className={`text-[10px] font-extrabold tracking-[0.5em] uppercase ${
          light ? "text-[#af8f47]" : "text-[#af8f47]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────── topbar ────────────────────────────── */

function Topbar() {
  return (
    <div className="bg-[#4c6c84] text-[#e8eef5]/75 text-[12px] font-medium">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-2 gap-4">
        <span className="font-semibold hidden sm:block truncate max-w-[200px] md:max-w-none">
          A Division of Naval Dockyard Limited, Victoria Island, Lagos
        </span>
        <a
          href="tel:+2349047998706"
          className="flex sm:hidden items-center gap-1.5 hover:text-white transition-colors shrink-0"
        >
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          +234 904 799 8706
        </a>
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <a
            href="tel:+2349047998706"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +234 904 799 8706
          </a>
          <a
            href="mailto:info@ndlapprenticeschool.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="hidden lg:inline">info@ndlapprenticeschool.com</span>
            <span className="lg:hidden">Email Us</span>
          </a>
          <div className="flex items-center gap-1.5 border-l border-[#e8eef5]/30 pl-4">
            {[
              {
                label: "Facebook",
                d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              },
              {
                label: "Twitter",
                d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              },
              {
                label: "YouTube",
                d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
              },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-6 h-6 flex items-center justify-center bg-[#e8eef5]/15 hover:bg-[#af8f47] rounded-sm transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── header ────────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        transition={{ duration: 0.8, ease: expo, delay: 0.2 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(11,39,72,0.12)]"
            : "bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(11,39,72,0.07)]"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
            >
              <Image src="/ndas-logo.png" width={100} height={100} alt="logo" />
            </motion.div>
            <div className="leading-none">
              <p className="text-[#0b2748] font-black text-[13px] sm:text-[15px] leading-[1.1] tracking-tight uppercase">
                Naval Dockyard
              </p>
              <p className="text-[#0b2748] font-black text-[13px] sm:text-[15px] leading-[1.1] tracking-tight uppercase">
                Apprentice School
              </p>
              <p className="text-[#0b2748]/50 text-[9px] sm:text-[10px] font-medium tracking-wide mt-0.5 hidden xs:block">
                Technology is Development
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {NAV.map((item, i) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i, ease: expo }}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 rounded-sm relative group ${
                      isActive
                        ? "text-[#0b2748]"
                        : "text-[#0b2748]/65 hover:text-[#0b2748] hover:bg-[#f0f3f7]"
                    }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#af8f47] rounded-full"
                      />
                    )}
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#af8f47] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden sm:block"
            >
              <MagneticButton href="/contact" variant="primary">
                Contact NDAS
              </MagneticButton>
            </motion.div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="xl:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] shrink-0 rounded-sm hover:bg-[#f0f3f7] transition-colors"
            >
              <span
                className={`block w-5 h-[2px] bg-[#0b2748] rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-[#0b2748] rounded-full transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-[#0b2748] rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 xl:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: expo }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-white shadow-2xl xl:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8eef5]">
                <span className="text-[#0b2748] font-black text-[14px] tracking-tight uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-[#f0f3f7] transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-[#0b2748]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {NAV.map((item, i) => {
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 * i, ease: expo }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-3.5 text-[14px] font-semibold rounded-sm transition-all duration-200 border-b border-[#f0f3f7] last:border-0 ${
                          isActive
                            ? "text-[#0b2748] bg-[#f0f3f7]"
                            : "text-[#0b2748]/70 hover:text-[#0b2748] hover:bg-[#f8f9fb]"
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#af8f47] shrink-0" />
                        )}
                        {item.dropdown && !isActive && (
                          <svg
                            className="w-3.5 h-3.5 opacity-40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-4 py-5 border-t border-[#e8eef5] space-y-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center text-[12px] font-bold tracking-[0.15em] uppercase bg-[#af8f47] text-[#0d2238] px-6 py-3.5 w-full hover:bg-[#c8a44c] transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact NDAS
                </Link>
                <div className="flex items-center justify-center gap-4 pt-1">
                  <a
                    href="tel:+2349047998706"
                    className="text-[11px] text-[#0b2748]/60 hover:text-[#0b2748] transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +234 904 799 8706
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────── magnetic button ───────────────────── */

function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.4);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center text-[12px] font-bold tracking-[0.15em] uppercase px-5 sm:px-8 py-3 sm:py-4 transition-colors duration-300 whitespace-nowrap text-center relative overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-[#af8f47] text-[#0d2238] hover:bg-[#c8a44c]"
      : variant === "secondary"
        ? "bg-[#0b2748] text-white hover:bg-[#0b2748]/90"
        : "text-white border border-white/30 hover:bg-white/10 hover:border-white/50";

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: springX, y: springY },
  };

  const shimmer = variant === "primary" && (
    <motion.div
      className="absolute inset-0 bg-white/20 skew-x-12"
      initial={{ x: "-150%" }}
      whileHover={{ x: "150%" }}
      transition={{ duration: 0.7, ease: expo }}
    />
  );

  if (href) {
    return (
      <Link
        ref={ref as any}
        href={href}
        className={`${base} ${styles} ${className}`}
        {...sharedProps}
      >
        <span className="relative z-10">{children}</span>
        {shimmer}
      </Link>
    );
  }

  return (
    <button
      ref={ref as any}
      className={`${base} ${styles} ${className}`}
      {...sharedProps}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {shimmer}
    </button>
  );
}

/* ─────────────────────────── article header ────────────────────── */

function ArticleHeader({ article }: { article: typeof ARTICLES[1] }) {
  return (
    <section className="bg-[#0b2748] relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover object-center opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2748]/60 via-[#0b2748]/80 to-[#0b2748]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/news"
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-[#af8f47] transition-colors"
            >
              News & Events
            </Link>
            <svg
              className="w-3 h-3 text-white/30"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#af8f47]">
              {article.category}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#af8f47]/20 text-[#af8f47]">
              {article.category}
            </span>
            <span className="text-[12px] text-white/50 font-medium">{article.date}</span>
            <span className="text-[12px] text-white/50 font-medium">{article.readTime}</span>
          </div>

          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.12] tracking-tight text-white mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-[#af8f47]" />
            <span className="text-[12px] font-medium text-white/60">By {article.author}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── article body ──────────────────────── */

function ArticleBody({ article }: { article: typeof ARTICLES[1] }) {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
        >
          {/* Lead paragraph */}
          <p className="text-[17px] sm:text-[19px] font-medium text-[#0b2748] leading-[1.75] mb-10">
            {article.content[0]}
          </p>

          {/* Featured image */}
          <div className="relative h-[260px] sm:h-[380px] md:h-[480px] mb-12 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* Remaining paragraphs */}
          <div className="space-y-6">
            {article.content.slice(1).map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: expo, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-[15px] sm:text-[16px] font-medium text-[#0b2748]/80 leading-[1.85]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Pull quote */}
          {article.quote && (
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: expo }}
              viewport={{ once: true }}
              className="my-12 pl-6 sm:pl-8 border-l-2 border-[#af8f47]"
            >
              <p className="text-[18px] sm:text-[20px] font-semibold text-[#0b2748] leading-[1.6] italic">
                &ldquo;{article.quote}&rdquo;
              </p>
            </motion.blockquote>
          )}
        </motion.div>

        {/* Share bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-[#0b2748]/10"
        >
          <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-[#0b2748]/40 mb-4">
            Share this article
          </p>
          <div className="flex flex-wrap gap-2">
            {["Twitter", "Facebook", "LinkedIn", "Email"].map((platform) => (
              <button
                key={platform}
                className="text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 border border-[#0b2748]/20 text-[#0b2748]/70 hover:bg-[#0b2748] hover:text-white hover:border-[#0b2748] transition-all duration-300"
              >
                {platform}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── related articles ──────────────────── */

function RelatedArticles({ relatedIds }: { relatedIds: number[] }) {
  const related = relatedIds.map((id) => {
    const article = ARTICLES[id];
    return {
      id,
      category: article.category,
      date: article.date,
      title: article.title,
      image: article.image,
    };
  });

  return (
    <section className="bg-[#f5f7f9] border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Eyebrow>Continue Reading</Eyebrow>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748]">
            Related <span className="italic font-medium">Stories.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0b2748]/5 border border-[#0b2748]/10">
          {related.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: expo, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#f5f7f9] hover:bg-[#eff2f7] transition-colors duration-500"
            >
              <Link href={`/news/${item.id}`} className="block">
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-2.5 py-1 bg-[#0b2748]/[0.08] text-[#0b2748]/70">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-[#0b2748]/50 font-medium">{item.date}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-[#0b2748] leading-[1.4] group-hover:text-[#af8f47] transition-colors duration-500">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── footer ────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#0b2748]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <p className="text-white font-black text-[13px] tracking-tight leading-snug mb-4">
            NAVAL DOCKYARD
            <br />
            APPRENTICE SCHOOL
          </p>
          <p className="text-white/60 text-[13px] font-medium leading-[1.75]">
            The technical training school of Naval Dockyard Limited, focused on
            apprenticeship, practical engineering trades, and dockyard-relevant
            technical manpower development.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
            <p className="text-white text-[10px] font-extrabold tracking-[0.4em] uppercase mb-5">
              {col.heading}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-white/40 tracking-widest uppercase text-center sm:text-left">
          © 2026 Naval Dockyard Apprentice School. All rights reserved.
        </p>
        <div className="w-8 h-[1px] bg-[#af8f47]/50 hidden sm:block" />
      </div>
    </footer>
  );
}

/* ─────────────────────────── page ──────────────────────────────── */

// ── THE FIX: params is a Promise in Next.js 15.
// Use React's `use()` hook to unwrap it inside a Client Component.
export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);           // ← unwrap the Promise
  const articleId = parseInt(id, 10);   // ← always pass radix 10
  const article = ARTICLES[articleId];

  if (!article) {
    return (
      <div
        className={`${dmSans.variable} min-h-screen`}
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <Topbar />
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#af8f47] mb-4">
              404
            </p>
            <h1 className="text-2xl font-bold text-[#0b2748] mb-4">Article Not Found</h1>
            <p className="text-[#0b2748]/60 text-[14px] mb-8">
              The article you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.15em] uppercase bg-[#af8f47] text-[#0d2238] px-6 py-3 hover:bg-[#c8a44c] transition-colors"
            >
              ← Return to News & Events
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`${dmSans.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <Topbar />
      <Header />
      <main>
        <ArticleHeader article={article} />
        <ArticleBody article={article} />
        <RelatedArticles relatedIds={article.relatedIds} />
      </main>
      <Footer />
    </div>
  );
}