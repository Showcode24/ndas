"use client";

import { useState, useEffect, useRef } from "react";
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

const CATEGORIES = ["All", "Events", "Training", "Announcements", "Partnerships"];

const NEWS_ITEMS = [
  {
    id: 1,
    category: "Events",
    date: "15 March 2026",
    title: "NDAS Hosts Annual Skills Exhibition and Trade Demonstration",
    excerpt:
      "Apprentices across all four core trades demonstrated practical competencies before naval engineering leadership and invited industry partners at the Naval Dockyard.",
    image: "/news/skills-exhibition.jpg",
    featured: true,
  },
  {
    id: 2,
    category: "Training",
    date: "28 February 2026",
    title: "Welding & Fabrication Cohort Completes Phase II Dockyard Assessment",
    excerpt:
      "The latest cohort of welding apprentices has completed their second-phase practical assessment, involving live repair support scenarios within the dockyard environment.",
    image: "/news/welding-assessment.jpg",
    featured: false,
  },
  {
    id: 3,
    category: "Announcements",
    date: "10 February 2026",
    title: "Admissions Open for 2026/2027 Basic Apprenticeship Course",
    excerpt:
      "Applications are now being accepted for the next intake of the Basic Apprenticeship Course across all four engineering trades at NDAS.",
    image: "/news/admissions-open.jpg",
    featured: false,
  },
  {
    id: 4,
    category: "Partnerships",
    date: "22 January 2026",
    title: "NDAS Signs Technical Cooperation Agreement with Maritime Engineering Firm",
    excerpt:
      "A new partnership will provide advanced tooling access and guest instruction for electrical and mechanical trade apprentices.",
    image: "/news/partnership.jpg",
    featured: false,
  },
  {
    id: 5,
    category: "Training",
    date: "05 January 2026",
    title: "Electrical Electronics Apprentices Begin Motor Rewinding Specialisation",
    excerpt:
      "The electrical trade programme has introduced an advanced motor rewinding module, supported by new equipment installed in the electrical workshop.",
    image: "/news/electrical-training.jpg",
    featured: false,
  },
  {
    id: 6,
    category: "Events",
    date: "12 December 2025",
    title: "End-of-Year Apprentice Showcase Highlights Dockyard Projects",
    excerpt:
      "The annual showcase presented completed projects from plumbing, carpentry, welding, and electrical trades to naval leadership and families.",
    image: "/news/showcase.jpg",
    featured: false,
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
          src="/news-hero.png"
          alt="NDAS news and events"
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
          <Eyebrow light>Updates & Announcements</Eyebrow>
          <h1 className="text-[clamp(1.75rem,5vw,3.4rem)] font-bold leading-[1.12] tracking-tight text-white mb-4 sm:mb-5">
            News &{" "}
            <span className="text-[#af8f47] underline decoration-[#af8f47]/40 underline-offset-4">
              Events
            </span>
          </h1>
          <p className="text-white/70 text-[14px] sm:text-[15px] md:text-[17px] font-light leading-[1.7] mb-8 sm:mb-10 max-w-[52ch]">
            Stay informed about training developments, admissions cycles, partnership announcements, and events at the Naval Dockyard Apprentice School.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-[12px] sm:text-[13px] font-bold tracking-wide bg-[#af8f47] text-[#0d2238] px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-[#c8a44c] transition-colors duration-300 w-full xs:w-auto"
            >
              Subscribe to Updates
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center text-[12px] sm:text-[13px] font-bold tracking-wide text-white border border-white/40 px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-white/10 transition-colors duration-300 w-full xs:w-auto"
            >
              View Gallery
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── featured article ──────────────────── */

function FeaturedArticle({ item }: { item: typeof NEWS_ITEMS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: expo }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/news/${item.id}`} className="block">
        <div className="flex flex-col lg:flex-row bg-[#0b2748] overflow-hidden">
          {/* Image */}
          <div className="relative lg:w-[55%] h-[300px] sm:h-[400px] lg:h-[520px] flex-shrink-0 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748]/40 to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* Content */}
          <div className="lg:w-[45%] p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-3 py-1.5 bg-[#af8f47]/20 text-[#af8f47]">
                {item.category}
              </span>
              <span className="text-[11px] font-medium text-white/50 tracking-wide">
                {item.date}
              </span>
            </div>

            <h2 className="text-[clamp(1.5rem,3vw,2.4rem)] font-semibold tracking-tight text-white mb-5 leading-[1.15]">
              {item.title}
            </h2>

            <div className="w-12 h-[2px] bg-[#af8f47] mb-6" />

            <p className="text-white/70 text-[15px] font-medium leading-[1.75] mb-8 max-w-lg">
              {item.excerpt}
            </p>

            <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.15em] uppercase text-[#af8f47] hover:text-[#c8a44c] transition-colors group/link">
              Read Full Story
              <svg
                className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────── news list ─────────────────────────── */

function NewsList({ items }: { items: typeof NEWS_ITEMS }) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: expo, delay: i * 0.06 }}
          viewport={{ once: true }}
          className="group"
        >
          <Link href={`/news/${item.id}`} className="block">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 py-8 border-b border-[#0b2748]/10 hover:bg-[#eff2f7] transition-colors duration-300 px-4 sm:px-6 -mx-4 sm:-mx-6">
              {/* Date column */}
              <div className="sm:w-28 flex-shrink-0">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#af8f47]">
                  {item.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase px-2.5 py-1 bg-[#0b2748]/[0.08] text-[#0b2748]/70">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-[17px] sm:text-[19px] font-semibold tracking-tight text-[#0b2748] mb-2 leading-[1.3] group-hover:text-[#af8f47] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[14px] font-medium text-[#0b2748]/60 leading-[1.7] line-clamp-2">
                  {item.excerpt}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-[#af8f47]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}

/* ─────────────────────────── filter tabs ───────────────────────── */

function FilterTabs({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 border ${
            active === cat
              ? "bg-[#0b2748] text-white border-[#0b2748]"
              : "bg-transparent text-[#0b2748]/70 border-[#0b2748]/20 hover:border-[#0b2748]/40 hover:text-[#0b2748]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────── newsletter ────────────────────────── */

function Newsletter() {
  return (
    <section className="bg-[#f5f7f9] py-24 md:py-32 border-t border-[#0b2748]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true }}
          className="bg-[#0b2748] relative overflow-hidden p-12 md:p-16 lg:p-20"
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#af8f47] rounded-full" />
                <span className="text-[#af8f47] text-[10px] font-extrabold tracking-[0.5em] uppercase">
                  Stay Updated
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tighter leading-[0.95] text-white mb-5">
                Receive NDAS News Directly.
              </h2>
              <p className="text-white/70 font-medium leading-[1.7] text-[15px] max-w-[52ch]">
                Get admissions alerts, training updates, and event announcements delivered to your inbox.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-5 py-4 text-[13px] font-medium tracking-wide w-full sm:w-[280px] focus:outline-none focus:border-[#af8f47]/50 transition-colors"
              />
              <button
                type="submit"
                className="text-[12px] font-bold tracking-[0.15em] uppercase bg-[#af8f47] text-[#0d2238] px-8 py-4 hover:bg-[#c8a44c] transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
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

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? NEWS_ITEMS.filter((i) => !i.featured)
      : NEWS_ITEMS.filter((i) => i.category === activeCategory && !i.featured);

  const featured = NEWS_ITEMS.find((i) => i.featured);

  return (
    <div
      className={`${dmSans.variable} min-h-screen bg-[#f5f7f9]`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <Topbar />
      <Header />
      <main>
        <Hero />

        {/* Featured Article */}
        {featured && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 sm:px-10 py-16 md:py-24">
            <FeaturedArticle item={featured} />
          </section>
        )}

        {/* News Archive */}
        <section className="bg-white border-t border-[#0b2748]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:px-10 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
              {/* Left sticky */}
              <div className="lg:w-1/3 lg:sticky lg:top-36 h-fit">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: expo }}
                  viewport={{ once: true }}
                >
                  <Eyebrow>Archive</Eyebrow>
                  <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
                    All{" "}
                    <span className="italic font-medium">Updates.</span>
                  </h2>
                  <div className="w-8 h-[1px] bg-[#af8f47] mb-8" />
                  <p className="text-[#0b2748]/70 text-[15px] font-medium leading-[1.75] mb-10">
                    Browse the complete archive of NDAS activities, training milestones, and institutional announcements.
                  </p>
                  <FilterTabs active={activeCategory} onChange={setActiveCategory} />
                </motion.div>
              </div>

              {/* Right content */}
              <div className="lg:w-2/3">
                <NewsList items={filtered} />

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
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}