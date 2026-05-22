"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

const FILTERS = ["All", "Workshops", "Training", "Events", "Facilities", "Graduation"];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Workshops",
    title: "Welding Workshop — Practical Session",
    description: "Apprentices performing shielded metal arc welding under instructor supervision.",
    image: "/gallery/welding-workshop.jpg",
  },
  {
    id: 2,
    category: "Training",
    title: "Electrical Motor Rewinding Lab",
    description: "Hands-on training in motor rewinding techniques for naval equipment maintenance.",
    image: "/gallery/electrical-lab.jpg",
  },
  {
    id: 3,
    category: "Facilities",
    title: "Naval Dockyard — Aerial View",
    description: "The dockyard environment that forms the practical training context for all NDAS apprentices.",
    image: "/gallery/dockyard-aerial.jpg",
  },
  {
    id: 4,
    category: "Events",
    title: "Annual Skills Exhibition 2026",
    description: "Apprentices presenting completed projects to naval engineering leadership.",
    image: "/gallery/skills-exhibition.jpg",
  },
  {
    id: 5,
    category: "Workshops",
    title: "Plumbing & Pipe Fitting Bay",
    description: "Practical pipe threading and fitting exercises in the mechanical workshop.",
    image: "/gallery/plumbing-workshop.jpg",
  },
  {
    id: 6,
    category: "Training",
    title: "Carpentry & Joinery Studio",
    description: "Apprentices working on structural woodwork and joinery projects.",
    image: "/gallery/carpentry-studio.jpg",
  },
  {
    id: 7,
    category: "Graduation",
    title: "BAC Graduation Ceremony",
    description: "Basic Apprenticeship Course graduates receiving their certificates.",
    image: "/gallery/graduation.jpg",
  },
  {
    id: 8,
    category: "Facilities",
    title: "Machine Shop — Lathe Operations",
    description: "Precision machining training on industrial lathe equipment.",
    image: "/gallery/machine-shop.jpg",
  },
  {
    id: 9,
    category: "Events",
    title: "Trade Test Assessment Day",
    description: "External assessors evaluating apprentice competencies across all four trades.",
    image: "/gallery/trade-test.jpg",
  },
  {
    id: 10,
    category: "Training",
    title: "HSE Safety Induction",
    description: "Mandatory health and safety training for all new intakes.",
    image: "/gallery/hse-training.jpg",
  },
  {
    id: 11,
    category: "Workshops",
    title: "Fabrication Project — Ship Repair Support",
    description: "Advanced fabrication work supporting active dockyard maintenance operations.",
    image: "/gallery/fabrication-project.jpg",
  },
  {
    id: 12,
    category: "Facilities",
    title: "Classroom — Technical Drawing",
    description: "Theory instruction in technical drawing and engineering documentation.",
    image: "/gallery/classroom.jpg",
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

/* ─────────────────────────── topbar ────────────────────────────── */
function Topbar() {
  return (
    <div className="bg-[#4c6c84] text-[#e8eef5]/75 text-[12px] font-medium">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 sm:px-10 flex items-center justify-between py-2 gap-4">
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
    return () => { document.body.style.overflow = ""; };
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
                  <svg className="w-4 h-4 text-[#0b2748]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
                          <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
                  <a href="tel:+2349047998706" className="text-[11px] text-[#0b2748]/60 hover:text-[#0b2748] transition-colors flex items-center gap-1">
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

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-[420px] md:min-h-[480px] flex items-center overflow-hidden bg-[#0b2748]">
      <div className="absolute inset-0">
        <Image
          src="/gallery-hero.png"
          alt="NDAS gallery"
          fill
          className="object-cover object-center opacity-10"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/95 to-[#0b2748]/80" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 sm:px-10 py-16 sm:py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: expo }}
          className="max-w-[640px]"
        >
          <Eyebrow light>Visual Archive</Eyebrow>
          <h1 className="text-[clamp(1.75rem,5vw,3.4rem)] font-bold leading-[1.12] tracking-tight text-white mb-4 sm:mb-5">
            Gallery &{" "}
            <span className="text-[#af8f47] underline decoration-[#af8f47]/40 underline-offset-4">
              Media
            </span>
          </h1>
          <p className="text-white/70 text-[14px] sm:text-[15px] md:text-[17px] font-light leading-[1.7] mb-8 sm:mb-10 max-w-[52ch]">
            A visual record of training, workshops, facilities, and events at the Naval Dockyard Apprentice School.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3">
            <Link
              href="/news"
              className="inline-flex items-center justify-center text-[12px] sm:text-[13px] font-bold tracking-wide bg-[#af8f47] text-[#0d2238] px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-[#c8a44c] transition-colors duration-300 w-full xs:w-auto"
            >
              Read News
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-[12px] sm:text-[13px] font-bold tracking-wide text-white border border-white/40 px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-white/10 transition-colors duration-300 w-full xs:w-auto"
            >
              Request Media Access
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── stats bar ─────────────────────────── */

function StatsBar() {
  const stats = [
    { value: "120+", label: "Gallery Items" },
    { value: "4", label: "Core Trades" },
    { value: "6", label: "Categories" },
    { value: "2019", label: "Since Re-Commissioning" },
  ];

  return (
    <section className="bg-[#f5f7f9] border-t border-b border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#0b2748]/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="py-8 px-6 sm:px-8 text-center"
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

/* ─────────────────────────── filter bar ────────────────────────── */

function FilterBar({ active, onChange, counts }: { active: string; onChange: (f: string) => void; counts: Record<string, number> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`group relative text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 border ${
            active === filter
              ? "bg-[#0b2748] text-white border-[#0b2748]"
              : "bg-transparent text-[#0b2748]/70 border-[#0b2748]/20 hover:border-[#0b2748]/40 hover:text-[#0b2748]"
          }`}
        >
          {filter}
          <span
            className={`ml-2 text-[10px] font-mono ${active === filter ? "text-[#af8f47]" : "text-[#0b2748]/40"}`}
          >
            {String(counts[filter] || 0).padStart(2, "0")}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────── masonry grid ──────────────────────── */

function MasonryGrid({
  items,
  onSelect,
}: {
  items: typeof GALLERY_ITEMS;
  onSelect: (item: typeof GALLERY_ITEMS[0]) => void;
}) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: expo, delay: i * 0.04 }}
            className="break-inside-avoid group relative overflow-hidden bg-[#0b2748] cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748] via-[#0b2748]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#af8f47]/20 text-[#af8f47] mb-3 inline-block">
                  {item.category}
                </span>
                <h3 className="text-white font-semibold tracking-tight text-[15px] leading-[1.3] mb-1">
                  {item.title}
                </h3>
                <p className="text-white/70 text-[12px] font-medium leading-[1.6] line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── lightbox ──────────────────────────── */

function Lightbox({
  item,
  onClose,
  onNext,
  onPrev,
}: {
  item: typeof GALLERY_ITEMS[0];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#0b2748]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: expo }}
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row bg-[#0b2748] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative md:w-2/3 h-[40vh] md:h-[80vh]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
        </div>
        <div className="md:w-1/3 p-8 md:p-10 flex flex-col justify-center">
          <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#af8f47]/20 text-[#af8f47] mb-6 inline-block w-fit">
            {item.category}
          </span>
          <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight mb-4 leading-[1.2]">
            {item.title}
          </h3>
          <div className="w-8 h-[1px] bg-[#af8f47] mb-6" />
          <p className="text-white/70 text-[14px] font-medium leading-[1.75]">
            {item.description}
          </p>
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-[10px] tracking-[0.8em] uppercase font-bold text-white/40">
              NDAS Gallery
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── footer ────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#0b2748]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeFilter);

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === f).length;
    return acc;
  }, {} as Record<string, number>);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % filtered.length);
  }, [selectedIndex, filtered.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + filtered.length) % filtered.length);
  }, [selectedIndex, filtered.length]);

  return (
    <div
      className={`${dmSans.variable} min-h-screen bg-[#f5f7f9]`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <Topbar />
      <Header />
      <main>
        <Hero />
        <StatsBar />

        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: expo }}
                viewport={{ once: true }}
              >
                <Eyebrow>Visual Collection</Eyebrow>
                <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
                  Training in{" "}
                  <span className="italic font-medium">Pictures.</span>
                </h2>
                <div className="w-8 h-[1px] bg-[#af8f47] mb-8" />
                <p className="text-[#0b2748]/70 text-[15px] font-medium leading-[1.75] mb-10">
                  Browse photographs from workshops, training sessions, graduation ceremonies, and daily life at the Naval Dockyard Apprentice School.
                </p>
                <FilterBar active={activeFilter} onChange={setActiveFilter} counts={counts} />
              </motion.div>
            </div>

            <div className="lg:w-2/3">
              <MasonryGrid
                items={filtered}
                onSelect={(item) => {
                  const idx = filtered.findIndex((i) => i.id === item.id);
                  setSelectedIndex(idx);
                }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-10 flex justify-between items-center"
              >
                <span className="text-[10px] tracking-[0.8em] uppercase font-bold text-[#0b2748]/40">
                  Naval Dockyard Apprentice School
                </span>
                <div className="w-16 h-px bg-[#0b2748]/20" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedIndex !== null && filtered[selectedIndex] && (
          <Lightbox
            item={filtered[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
}