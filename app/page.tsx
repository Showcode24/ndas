"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { Anchor, Wrench, Building2, Handshake } from "lucide-react";
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

const STATS = [
  { value: "31 May 2019", label: "Re-Commissioned" },
  { value: "4", label: "Core Trades" },
  { value: "BAC · IAC · AAC", label: "Training Pathway" },
  { value: "Practical + IT", label: "Applied Learning Model" },
];

const ABOUT_ROWS = [
  {
    label: "FOUNDATION",
    text: "The Naval Dockyard Apprentice School is the technical training school of Naval Dockyard Limited. Re-commissioned on 31 May 2019, it trains Nigerian Navy technical personnel across four core engineering trades.",
  },
  {
    label: "ADVANTAGE",
    text: "Its defining advantage is proximity to a live dockyard — where maintenance culture, technical discipline, and practical engineering knowledge form the actual learning environment.",
  },
  {
    label: "LOCATION",
    text: "Naval Dockyard Apprentice School 28, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria — operating within a working dockyard unique among Nigerian technical training institutions.",
  },
];

const TRADES = [
  {
    index: "01",
    title: "Welding & Fabrication",
    tag: "Mechanical",
    badge: "BAC",
    description:
      "Training in metal joining, fabrication processes, and practical repair support relevant to shipyard and engineering environments.",
  },
  {
    index: "02",
    title: "Electrical Electronics & Motor Rewinding",
    tag: "Electrical",
    badge: "BAC",
    description:
      "Training in electrical installation, basic controls, fault tracing, and motor rewinding for technical support and maintenance roles.",
  },
  {
    index: "03",
    title: "Plumbing & Pipe Fitting",
    tag: "Mechanical",
    badge: "BAC",
    description:
      "Training in pipe systems, fittings, installation practice, and maintenance tasks applicable to workshop and utility environments.",
  },
  {
    index: "04",
    title: "Carpentry & Joinery",
    tag: "Construction",
    badge: "BAC",
    description:
      "Training in woodwork, joinery, structural fittings, and practical workshop tasks relevant to support and maintenance functions.",
  },
];

const WHY = [
  {
    title: "Dockyard Proximity",
    description:
      "NDAS sits within the Naval Dockyard environment, giving training a practical context that ordinary classroom-based institutions cannot reproduce.",
  },
  {
    title: "Trade-Based Instruction",
    description:
      "Training is organised around core engineering trades directly relevant to maintenance, repair, fabrication, and technical support.",
  },
  {
    title: "Knowledge Preservation",
    description:
      "The School preserves and transfers practical dockyard skills required to sustain naval engineering capability over time.",
  },
];

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
        label:
          "Naval Dockyard Apprentice School 28, Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
        href: "#",
      },
      { label: "Email: info@ndlapprenticeschool.com", href: "#" },
      { label: "Phone: +234 904 799 8706", href: "/contact" },
      { label: "Send an enquiry", href: "/contact" },
    ],
  },
];
const ROUTES = [
  {
    icon: Anchor,
    badge: "Nigerian Navy",
    title: "Nigerian Navy Technical Personnel",
    description:
      "NN technical ratings are nominated for BAC training by CND. Personnel can indicate their interest in being nominated by contacting NDAS. Nominations for BAC X close 29 May 2026.",
    cta: "View Entry Route →",
    href: "/admissions#routes",
  },
  {
    icon: Wrench,
    badge: "Civilian",
    title: "Prospective Civilian Apprentice",
    description:
      "Civilian nominations are now being accepted for BAC X. Deadline: 30 June 2026. Four trade specialisations available.",
    cta: "Check Requirements →",
    href: "/admissions#routes",
  },
  {
    icon: Building2,
    badge: "Sponsored",
    title: "MDAs, NGOs & Sponsored Organisations",
    description:
      "Ministries, departments, agencies, and NGOs may sponsor candidates for training at NDAS. Contact us to discuss arrangements.",
    cta: "Send Training Enquiry →",
    href: "/contact",
  },
  {
    icon: Handshake,
    badge: "Partnership",
    title: "Institutional Partner",
    description:
      "Government agencies, certification bodies, research institutions, and industry organisations could partner with NDAS.",
    cta: "Discuss Partnership →",
    href: "/partnerships",
  },
];

const CERT_ROWS = [
  {
    label: "NDAS Organic Certificates",
    nodes: ["BAC Certificate", "IAC Certificate", "AAC Certificate"],
  },
  {
    label: "Federal Ministry of Labour & Employment",
    nodes: ["Trade Test III", "Trade Test II", "Trade Test I"],
  },
  {
    label: "IIRSM UK Certificates",
    nodes: ["HSE 1", "HSE 2", "HSE 3"],
  },
];

const TRADES_LIST = [
  { label: "Welding & Fabrication", href: "/academics/5" },
  { label: "Electrical/Electronics & Motor Rewinding", href: "/academics/2" },
  { label: "Plumbing & Pipe Fitting", href: "/academics/4" },
  { label: "Carpentry & Joinery", href: "/academics/1" },
  { label: "Air Conditioning & Refrigeration", href: "/academics/5" },
];

const PATHWAY_COURSES = [
  {
    code: "BAC",
    label: "Active",
    name: "Basic Apprentice Course",
    duration: "6 months",
    active: true,
    pending: false,
  },
  {
    code: "IAC",
    label: "Pending",
    name: "Intermediate Apprentice Course",
    duration: "9 months",
    active: false,
    pending: true,
  },
  {
    code: "AAC",
    label: "Pending",
    name: "Advanced Apprentice Course",
    duration: "12 months",
    active: false,
    pending: true,
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
        className={`text-[10px] font-extrabold tracking-[0.5em] uppercase ${light ? "text-[#af8f47]" : "text-[#af8f47]"}`}
      >
        {children}
      </span>
    </div>
  );
}

function HoverLine() {
  return (
    <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#af8f47]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
  );
}

/* ─────────────────────────── topbar ────────────────────────────── */
function Topbar() {
  return (
    <div className="bg-[#4c6c84] text-[#e8eef5]/75 text-[12px] font-medium">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 sm:px-10 flex items-center justify-between py-2 gap-4">
        {/* Hide tagline on very small screens, show condensed version on sm */}
        <span className="font-semibold hidden sm:block truncate max-w-[200px] md:max-w-none">
          A Division of Naval Dockyard Limited, Victoria Island, Lagos
        </span>
        {/* Compact phone-only visible on xs */}
        <a
          href="tel:+2349047998706"
          className="flex sm:hidden items-center gap-1.5 hover:text-white transition-colors shrink-0"
        >
          <svg
            className="w-3 h-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          +234 904 799 8706
        </a>

        <div className="hidden md:flex items-center gap-5 shrink-0">
          {/* Phone */}
          <a
            href="tel:+2349047998706"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg
              className="w-3 h-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +234 904 799 8706
          </a>
          {/* Email */}
          <a
            href="mailto:info@ndlapprenticeschool.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg
              className="w-3 h-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="hidden lg:inline">
              info@ndlapprenticeschool.com
            </span>
            <span className="lg:hidden">Email Us</span>
          </a>
          {/* Social icons */}
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
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
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
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 sm:px-10 flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group"
          >
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
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
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

          {/* Right side: CTA + hamburger */}
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

            {/* Hamburger — visible below xl */}
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

      {/* ── Mobile menu drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 xl:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: expo }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-white shadow-2xl xl:hidden flex flex-col"
            >
              {/* Drawer header */}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {NAV.map((item, i) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.05 * i,
                        ease: expo,
                      }}
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
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer — CTA + contact */}
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
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
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

  // Only enable magnetic effect on non-touch devices
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

/* ─────────────────────────── hero ──────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#0b2748]">
      {/* Mobile / tablet background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/hero-image.png"
          alt="NDAS apprentice operating industrial machinery"
          fill
          className="object-cover object-center opacity-15"
          priority
          sizes="100vw"
        />
      </div>

      {/* Desktop right-side image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: expo, delay: 0.15 }}
        className="hidden lg:block absolute top-0 right-0 h-full w-[48%] xl:w-[50%]"
      >
        <Image
          src="/hero-image.png"
          alt="NDAS apprentice operating industrial machinery"
          fill
          className="object-cover object-center"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b2748] to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 sm:px-10 py-16 sm:py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: expo }}
          className="max-w-[580px]"
        >
          <Eyebrow light>Dockyard Based Technical Training</Eyebrow>

          <h1 className="text-[clamp(1.75rem,5vw,3.4rem)] font-bold leading-[1.12] tracking-tight text-white mb-4 sm:mb-5">
            Training the Hands
            <br />
            that Build and{" "}
            <span className="text-[#af8f47] underline decoration-[#af8f47]/40 underline-offset-4">
              Maintain Ships&rsquo;s
            </span>{" "}
            Future.
          </h1>

          <p className="text-white/70 text-[14px] sm:text-[15px] md:text-[17px] font-light leading-[1.7] mb-8 sm:mb-10 max-w-[46ch]">
            NDAS is the technical training arm of Naval Dockyard Limited,
            located within the Naval Dockyard on Victoria Island, Lagos. Our
            mandate is to produce skilled, disciplined artisans and technicians
            capable of supporting Nigerian Navy ship repair, maintenance,
            dockyard operations and the wider maritime sector.
          </p>

          {/* Buttons — wrap naturally, full-width on xs */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3">
            <Link
              href="/about"
              className="inline-flex items-center justify-center text-[12px] sm:text-[13px] font-bold tracking-wide bg-[#af8f47] text-[#0d2238] px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-[#c8a44c] transition-colors duration-300 w-full xs:w-auto"
            >
              Learn More About NDAS
            </Link>
            <Link
              href="/academics"
              className="inline-flex items-center justify-center text-[12px] sm:text-[13px] font-bold tracking-wide text-white border border-white/40 px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-white/10 transition-colors duration-300 w-full xs:w-auto"
            >
              Explore Our Trades
            </Link>
            <Link
              href="/partnerships"
              className="inline-flex items-center justify-center text-[12px] sm:text-[13px] font-bold tracking-wide bg-[#af8f47] text-[#0d2238] px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-[#c8a44c] transition-colors duration-300 w-full xs:w-auto"
            >
              Partner with NDAS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── who we serve ─────────────────────────────── */
function WhoWeServe() {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
        >
          <Eyebrow>Who We Serve</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
            Find Your Route into NDAS.
          </h2>
          <div className="w-8 h-[1px] bg-[#af8f47] mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#0b2748]/5 border border-[#0b2748]/10">
          {ROUTES.map((route, i) => {
            const Icon = route.icon;
            return (
              <motion.div
                key={route.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                viewport={{ once: true }}
                className="group relative bg-[#f5f7f9] p-10 md:p-11 flex flex-col gap-4 hover:bg-[#eff2f7] transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[#0b2748]/20 rounded-full group-hover:border-[#af8f47]/50 transition-colors duration-500">
                  <Icon
                    size={18}
                    className="text-[#af8f47]"
                    strokeWidth={1.75}
                  />
                </div>
                <span className="text-[9px] font-extrabold tracking-[0.3em] uppercase px-2.5 py-1.5 bg-[#0b2748]/[0.07] text-[#0b2748]/65 w-fit">
                  {route.badge}
                </span>
                <h3 className="text-[17px] font-semibold tracking-tight leading-snug text-[#0b2748]">
                  {route.title}
                </h3>
                <p className="text-[14px] font-medium leading-[1.75] text-[#0b2748]/70 flex-1">
                  {route.description}
                </p>
                <Link
                  href={route.href}
                  className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-[#0b2748]/60 hover:text-[#0b2748] transition-colors mt-1"
                >
                  {route.cta}
                </Link>
                <HoverLine />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── stats ─────────────────────────────── */

function Stats() {
  return (
    <section className="bg-[#f5f7f9] border-t border-b border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#0b2748]/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="py-8 px-6 sm:px-8"
            >
              <p className="text-[#0b2748] text-xl md:text-2xl font-semibold tracking-tight mb-1.5">
                {s.value}
              </p>
              <p className="text-[#0b2748]/65 text-[11px] font-bold tracking-[0.35em] uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── about ─────────────────────────────── */

function About() {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left sticky */}
          <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: expo }}
              viewport={{ once: true }}
            >
              <Eyebrow>About NDAS</Eyebrow>
              <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
                Apprenticeship Built Around a Real Dockyard.
              </h2>
              <div className="w-8 h-[1px] bg-[#af8f47] mb-8" />
              <div className="flex flex-col gap-3">
                <Link
                  href="/about"
                  className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#0b2748] border border-[#0b2748]/30 px-5 py-3 text-center hover:bg-[#0b2748] hover:text-white transition-all duration-300"
                >
                  Learn More About NDAS
                </Link>
                <Link
                  href="/academics"
                  className="text-[12px] font-bold tracking-[0.15em] uppercase text-center text-[#0b2748]/60 hover:text-[#0b2748] transition-colors"
                >
                  View Training Pathway →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true }}
            className="lg:w-2/3 space-y-px bg-[#0b2748]/5 border border-[#0b2748]/10"
          >
            {ABOUT_ROWS.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                viewport={{ once: true }}
                className="group relative bg-[#f5f7f9] p-10 md:p-14 hover:bg-[#0b2748]/[0.04] transition-colors"
              >
                <p className="text-[#af8f47] text-[10px] font-extrabold tracking-[0.5em] uppercase mb-4">
                  {row.label}
                </p>
                <p className="text-[#0b2748]/75 font-medium leading-[1.75] text-base md:text-[17px] max-w-2xl">
                  {row.text}
                </p>
                <HoverLine />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── trades ────────────────────────────── */

function Trades() {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Eyebrow>Training Pathway</Eyebrow>
          <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
            Four Trades.
            <br />
            <span className="italic font-medium">One Dockyard Context.</span>
          </h2>
          <div className="w-8 h-[1px] bg-[#af8f47]" />
        </motion.div>

        {/* BAC → IAC → AAC horizontal pathway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: expo }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_36px_1fr_36px_1fr] items-stretch mb-5"
        >
          {PATHWAY_COURSES.map((course, i) => (
            <div key={course.code} className="contents">
              {/* Arrow between cards */}
              {i > 0 && (
                <div className="hidden lg:flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#af8f47] opacity-60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={{
                  y: -3,
                  boxShadow: "0 12px 40px rgba(11,39,72,0.10)",
                }}
                transition={{ duration: 0.3 }}
                className={`relative border flex flex-col overflow-hidden transition-shadow ${
                  course.active
                    ? "bg-white border-[#0b2748]/12"
                    : "bg-[#f5f7f9] border-[#0b2748]/10"
                }`}
              >
                {/* Gold top bar on active */}
                {course.active && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#af8f47]" />
                )}

                <div className="p-8 md:p-9 flex flex-col gap-0 h-full">
                  {/* Status */}
                  <div
                    className={`flex items-center gap-2 text-[9px] font-extrabold tracking-[0.4em] uppercase mb-4 ${course.active ? "text-[#af8f47]" : "text-[#0b2748]/35"}`}
                  >
                    {course.active && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#af8f47] opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#af8f47]" />
                      </span>
                    )}
                    {course.code}&nbsp;·&nbsp;{course.label}
                  </div>

                  {/* Name + duration */}
                  <p
                    className={`text-[16px] font-bold tracking-tight leading-snug mb-1 ${course.active ? "text-[#0b2748]" : "text-[#0b2748]/40"}`}
                  >
                    {course.name}
                  </p>
                  <p
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-5 ${course.active ? "text-[#0b2748]/40" : "text-[#0b2748]/25"}`}
                  >
                    {course.duration}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-[#0b2748]/8 mb-4" />

                  {/* Trade chips */}
                  {/* Trade chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {TRADES_LIST.map((trade) => (
                      <Link
                        key={trade.label}
                        href={trade.href}
                        className={`text-[9px] font-extrabold tracking-[0.1em] uppercase px-2.5 py-[5px] border transition-colors ${
                          course.active
                            ? "bg-[#af8f47]/10 text-[#6b4e11] border-[#af8f47]/25 hover:bg-[#af8f47]/20"
                            : "bg-[#0b2748]/[0.04] text-[#0b2748]/25 border-[#0b2748]/8 hover:bg-[#0b2748]/[0.08] hover:text-[#0b2748]/40 pointer-events-none"
                        }`}
                      >
                        {trade.label}
                      </Link>
                    ))}
                  </div>

                  {/* Pending badge pushed to bottom */}
                  {course.pending && (
                    <div className="mt-auto">
                      <span className="text-[9px] font-extrabold tracking-[0.3em] uppercase border border-[#0b2748]/12 text-[#0b2748]/35 px-2.5 py-[5px]">
                        Pending NHQ Approval
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Pathway note */}
        <p className="text-[12px] font-medium text-[#0b2748]/45 leading-[1.75] pl-3.5 border-l-2 border-[#af8f47]/20 max-w-[68ch] mb-14">
          BAC is currently active. IAC and AAC are pending NHQ approval.
          Training remains practical, workshop-based, and aligned to dockyard
          technical manpower requirements.
        </p>

        {/* Certification pathways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: expo, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Heading with extending line */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-[#0b2748] whitespace-nowrap">
              Certification Pathways
            </span>
            <div className="flex-1 h-px bg-[#0b2748]/8" />
          </div>

          <div className="border border-[#0b2748]/12 overflow-hidden">
            {CERT_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row items-stretch ${
                  i < CERT_ROWS.length - 1 ? "border-b border-[#0b2748]/8" : ""
                }`}
              >
                {/* Dark label column */}
                <div className="bg-[#0b2748] sm:w-52 lg:w-56 flex-shrink-0 px-6 py-5 flex items-center">
                  <span className="text-[10px] font-bold tracking-[0.08em] text-white/55 uppercase leading-snug">
                    {row.label}
                  </span>
                </div>

                {/* Cert nodes */}
                <div className="flex flex-1 items-stretch">
                  {row.nodes.map((node, j) => (
                    <div key={node} className="flex items-stretch flex-1">
                      <div
                        className={`relative flex-1 px-5 py-5 flex items-center text-[12px] font-semibold bg-[#f5f7f9] transition-colors hover:bg-white ${
                          j === 0 ? "text-[#0b2748]" : "text-[#0b2748]/30"
                        } ${j < row.nodes.length - 1 ? "border-r border-[#0b2748]/8" : ""}`}
                      >
                        {/* Active left accent */}
                        {j === 0 && (
                          <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#af8f47]" />
                        )}
                        {node}
                      </div>
                      {j < row.nodes.length - 1 && (
                        <div className="flex items-center justify-center w-7 flex-shrink-0 bg-[#0b2748]/[0.03]">
                          <svg
                            className="w-3 h-3 text-[#af8f47] opacity-50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-between gap-6"
        >
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#0b2748] border border-[#0b2748]/25 px-6 py-3.5 hover:bg-[#0b2748] hover:text-white hover:border-[#0b2748] transition-all duration-300"
          >
            View Full Programmes →
          </Link>
          <span className="text-[10px] tracking-[0.7em] uppercase font-bold text-[#0b2748]/25 hidden sm:block">
            BAC · IAC · AAC
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── why ndas ──────────────────────────── */

function WhyNDAS() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left sticky nav */}
          <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: expo }}
              viewport={{ once: true }}
            >
              <Eyebrow>Why NDAS</Eyebrow>
              <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-12">
                Technical Training That Starts Closer to the Work.
              </h2>

              <nav className="flex flex-col gap-6">
                {WHY.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => setSelected(i)}
                    className="group flex items-center gap-4 text-left"
                  >
                    <div className="relative w-8 h-[1px] bg-[#0b2748]/25 overflow-hidden flex-shrink-0">
                      <motion.div
                        animate={{ x: selected === i ? 0 : "-100%" }}
                        transition={{ duration: 0.4, ease: expo }}
                        className="absolute inset-0 bg-[#af8f47]"
                      />
                    </div>
                    <span
                      className={`text-[13px] font-semibold tracking-[0.15em] uppercase transition-all duration-500 ${
                        selected === i
                          ? "text-[#af8f47] translate-x-2"
                          : "text-[#0b2748]/60 group-hover:text-[#0b2748]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Right panel */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: expo }}
                className="space-y-px bg-[#0b2748]/5 border border-[#0b2748]/10"
              >
                {/* Active — expanded */}
                <div className="bg-[#f5f7f9] p-12 md:p-16">
                  <p className="text-[#af8f47] text-[10px] font-extrabold tracking-[0.5em] uppercase mb-6">
                    0{selected + 1}&nbsp;/&nbsp;0{WHY.length}
                  </p>
                  <h3 className="text-[clamp(1.6rem,3vw,2.5rem)] font-semibold tracking-tight text-[#0b2748] mb-6 leading-[1.1]">
                    {WHY[selected].title}
                  </h3>
                  <div className="w-8 h-[1px] bg-[#af8f47] mb-6" />
                  <p className="text-[#0b2748]/75 text-[17px] font-medium leading-[1.75] max-w-xl">
                    {WHY[selected].description}
                  </p>
                </div>

                {/* Others — collapsed */}
                {WHY.filter((_, i) => i !== selected).map((item) => (
                  <button
                    key={item.title}
                    onClick={() =>
                      setSelected(WHY.findIndex((x) => x.title === item.title))
                    }
                    className="group relative w-full text-left bg-[#f5f7f9] px-12 py-8 flex items-center justify-between hover:bg-[#eff2f7] transition-colors"
                  >
                    <span className="text-[#0b2748]/70 font-medium tracking-tight group-hover:text-[#0b2748] transition-colors text-[15px]">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#0b2748]/35 group-hover:text-[#af8f47]/60 transition-colors">
                      View
                    </span>
                    <HoverLine />
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 flex justify-between items-center"
            >
              <span className="text-[10px] tracking-[0.8em] uppercase font-bold text-[#0b2748]/45">
                Naval Dockyard Apprentice School
              </span>
              <div className="w-16 h-px bg-[#0b2748]/25" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── cta ───────────────────────────────── */

function CTA() {
  return (
    <section className="bg-[#f5f7f9] py-16 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="bg-[#0b2748] relative overflow-hidden p-12 md:p-16 lg:p-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#af8f47] rounded-full" />
              <span className="text-[#af8f47] text-[10px] font-extrabold tracking-[0.5em] uppercase">
                Admissions &amp; Enquiries
              </span>
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tighter leading-[0.95] text-white mb-5">
              Developing Technical Manpower for Naval and Maritime Support.
            </h2>
            <p className="text-white/70 font-medium leading-[1.7] text-[15px] max-w-[52ch]">
              NDAS exists to train personnel whose practical skill can support
              maintenance, repair, and engineering readiness.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/admissions"
              className="text-[12px] font-bold tracking-[0.15em] uppercase bg-[#af8f47] text-[#0d2238] px-8 py-4 hover:bg-[#c8a44c] transition-colors duration-300 whitespace-nowrap text-center"
            >
              View Admissions
            </Link>
            <Link
              href="/contact"
              className="text-[12px] font-bold tracking-[0.15em] uppercase text-white border border-white/30 px-8 py-4 hover:bg-white/10 transition-colors duration-300 whitespace-nowrap text-center"
            >
              Contact the School
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── footer ────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#0b2748]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
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

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 border-t border-white/15 flex items-center justify-between">
        <p className="text-[11px] text-white/40 tracking-widest uppercase">
          © 2026 Naval Dockyard Apprentice School. All rights reserved.
        </p>
        <div className="w-8 h-[1px] bg-[#af8f47]/50" />
      </div>
    </footer>
  );
}

/* ─────────────────────────── page ──────────────────────────────── */

export default function HomePage() {
  return (
    <div
      className={`${dmSans.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <Topbar />
      <Header />
      <main>
        <Hero />
        <WhoWeServe />
        <Stats />
        <About />
        <Trades />
        <WhyNDAS />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
