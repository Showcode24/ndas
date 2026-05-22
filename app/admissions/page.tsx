"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─────────────────────────── constants ─────────────────────────── */

const expo = [0.19, 1, 0.22, 1] as const;
const softSpring = { type: "spring" as const, stiffness: 120, damping: 20 };

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

const STEPS = [
  {
    number: "01",
    title: "Nomination",
    description:
      "Eligible personnel are identified through the appropriate institutional process in line with current manpower and training requirements.",
  },
  {
    number: "02",
    title: "Drafting",
    description:
      "Selected trainees receive formal direction to report for training in accordance with approved administrative procedures.",
  },
  {
    number: "03",
    title: "Reporting & Induction",
    description:
      "On arrival, trainees complete documentation, orientation, and other induction requirements before training begins.",
  },
  {
    number: "04",
    title: "Course Commencement",
    description:
      "Apprentices commence structured instruction combining workshop practice, guided teaching, and practical task development.",
  },
];

const REQUIREMENTS = [
  "Must meet the currently approved eligibility conditions for the relevant intake category.",
  "Must possess the required nomination, authorization, or institutional clearance where applicable.",
  "Must satisfy documentation and reporting requirements communicated for the intake.",
];

const FAQS = [
  {
    question: "Can civilians apply directly to NDAS?",
    answer:
      "Civilian or inter-service admission is subject to approved policy and formal authorisation. Where such intake is available, NDAS will publish the relevant eligibilty requirements, application process and reporting instructions through official channels.",
  },
  {
    question: "How do applicants know when intake is active?",
    answer:
      "Intake information should be followed through official NDAS communication channels and published notices.",
  },
  {
    question: "Need clarification on admissions?",
    answer:
      "Contact the School for current intake guidance, joining instructions, and related enquiries.",
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

/* ─────────────────────────── text reveal ───────────────────────── */

function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", rotate: 2 }}
        animate={isInView ? { y: 0, rotate: 0 } : { y: "110%", rotate: 2 }}
        transition={{ duration: 0.9, delay, ease: expo }}
      >
        {children}
      </motion.div>
    </Component>
  );
}

/* ─────────────────────────── spotlight card ────────────────────── */

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(175,143,71,0.15), transparent 40%)`;
  const border = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(175,143,71,0.4), transparent 40%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ background }}
      />
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 p-px"
        style={{ background: border }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
}

/* ─────────────────────────── tilt card ─────────────────────────── */

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), softSpring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), softSpring);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        transition={{ duration: 0.8, ease: expo }}
        viewport={{ once: true }}
        className="h-[2px] bg-[#af8f47] rounded-full flex-shrink-0"
      />
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

function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center text-[12px] font-bold tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-300 whitespace-nowrap text-center relative overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-[#af8f47] text-[#0d2238] hover:bg-[#c8a44c]"
      : "text-white border border-white/30 hover:bg-white/10 hover:border-white/50";

  return (
    <Link
      ref={ref}
      href={href}
      className={`${base} ${styles} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-white/20 skew-x-12"
          initial={{ x: "-150%" }}
          whileHover={{ x: "150%" }}
          transition={{ duration: 0.7, ease: expo }}
        />
      )}
    </Link>
  );
}

/* ─────────────────────────── scroll progress ───────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#af8f47] origin-left z-[60]"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#af8f47]/30 origin-left z-[60] blur-sm"
        style={{ scaleX }}
      />
    </>
  );
}

/* ─────────────────────────── back to top ───────────────────────── */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: expo }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#0b2748] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#af8f47] transition-colors duration-500 group"
          aria-label="Back to top"
        >
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────── topbar ────────────────────────────── */

function Topbar() {
  return (
    <div className="bg-[#4c6c84] text-[#e8eef5]/75 text-[12px] font-medium relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-2.5 gap-4 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: expo }}
          className="font-semibold"
        >
          A Division of Naval Dockyard Limited, Victoria Island, Lagos
        </motion.span>
        <div className="hidden md:flex items-center gap-5">
          {[
            {
              href: "tel:+2349047998706",
              icon: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z",
              text: "+234 904 799 8706",
            },
            {
              href: "mailto:info@ndlapprenticeschool.com",
              icon: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z",
              text: "info@ndlapprenticeschool.com",
            },
          ].map((item, i) => (
            <motion.a
              key={item.text}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: expo }}
              href={item.href}
              className="flex items-center gap-1.5 hover:text-white transition-colors relative group"
            >
              <svg
                className="w-3 h-3 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {item.icon.split(" ").map((d, idx) => (
                  <path key={idx} d={d} />
                ))}
              </svg>
              {item.text}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
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
            ].map((s, i) => (
              <motion.a
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.08,
                  ease: expo,
                }}
                href="#"
                aria-label={s.label}
                className="w-7 h-7 flex items-center justify-center bg-[#e8eef5]/15 hover:bg-[#af8f47] rounded-sm transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={s.d} />
                </svg>
              </motion.a>
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      transition={{ duration: 0.8, ease: expo, delay: 0.2 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(11,39,72,0.12)]"
          : "bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(11,39,72,0.07)]"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-3 gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          >
            <Image src="/ndas-logo.png" width={100} height={100} alt="logo" />
          </motion.div>
          <div className="leading-none">
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Naval Dockyard
            </p>
            <p className="text-[#0b2748] font-black text-[15px] leading-[1.1] tracking-tight uppercase">
              Apprentice School
            </p>
            <p className="text-[#0b2748]/50 text-[10px] font-medium tracking-wide mt-0.5">
              Technology is Development
            </p>
          </div>
        </Link>

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton href="/contact" variant="primary">
            Contact NDAS
          </MagneticButton>
        </motion.div>
      </div>
    </motion.header>
  );
}
/* ─────────────────────────── floating particles ────────────────── */

function FloatingParticles({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── hero ──────────────────────────────── */

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-[#0b2748]">
      <motion.div
        style={{ y: y1, scale }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/admissions-hero.jpg'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
            backgroundBlendMode: "overlay",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748]/60 via-transparent to-transparent" />

      <FloatingParticles count={8} />

      {/* Decorative floating orbs */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-[#af8f47]/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-[10%] w-48 h-48 rounded-full bg-[#4c6c84]/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-10 py-24 md:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: expo }}
          className="max-w-[640px]"
        >
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: expo }}
            className="flex items-center gap-2 text-white/40 text-[12px] font-medium mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-white/80">Admissions</span>
          </motion.nav>

          <Eyebrow light>Admissions and Intake</Eyebrow>

          <TextReveal delay={0.2}>
            <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white mb-6">
              Entry Into a{" "}
              <span className="text-[#af8f47] relative inline-block">
                Structured
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: expo }}
                    d="M2 6C50 2 150 2 198 6"
                    stroke="#af8f47"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Technical Training Environment.
            </h1>
          </TextReveal>

          <TextReveal delay={0.4}>
            <p className="text-white/60 text-[16px] sm:text-[18px] font-light leading-[1.7] mb-10 max-w-[48ch]">
              NDAS admissions should be understood through the School&apos;s
              approved training pathways, nomination processes, and
              institutional requirements.
            </p>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="w-8 h-px bg-white/30"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.8, delay: 1.4, ease: expo }}
            />
            <span className="text-white/40 text-[11px] tracking-[0.3em] uppercase font-medium">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── selection process ─────────────────── */

function SelectionProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const pathLength = useMotionValue(0);
  const pathLengthSpring = useSpring(pathLength, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) pathLength.set(1);
  }, [isInView, pathLength]);

  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 max-w-3xl"
        >
          <Eyebrow>Selection Process</Eyebrow>
          <TextReveal>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
              How Trainees{" "}
              <span className="italic font-medium text-[#af8f47]">
                Enter NDAS
              </span>
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[#0b2748]/40 text-[13px] font-medium tracking-wide"
          >
            Admission into NDAS is conducted in accordance with approved Nigerian Navy and institutional training requirements. Current intake details will be published only through approved official notices.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated connecting line (desktop) */}
          <svg
            className="hidden lg:block absolute top-[80px] left-[10%] right-[10%] w-[80%] h-[2px] overflow-visible"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 1 L100% 1"
              stroke="#0b2748"
              strokeWidth={2}
              strokeOpacity={0.1}
              strokeDasharray="4 4"
              style={{ pathLength: pathLengthSpring }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: expo }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                <TiltCard className="h-full">
                  <SpotlightCard className="h-full bg-white/50 backdrop-blur-sm border border-[#0b2748]/5 p-8 rounded-xl hover:shadow-xl hover:shadow-[#0b2748]/5 transition-shadow duration-500">
                    <div className="relative mb-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 rounded-full bg-[#0b2748] flex items-center justify-center text-white relative z-10 group-hover:bg-[#af8f47] transition-colors duration-500"
                      >
                        <span className="text-[18px] font-bold tracking-tight">
                          {step.number}
                        </span>
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-full border border-[#af8f47]/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    </div>

                    <h3 className="text-[#0b2748] text-lg font-semibold tracking-tight mb-3 group-hover:text-[#af8f47] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[#0b2748]/60 text-[14px] font-medium leading-[1.8]">
                      {step.description}
                    </p>

                    <motion.div
                      className="mt-6 h-[2px] bg-[#af8f47] origin-left"
                      initial={{ width: 32 }}
                      whileHover={{ width: 48 }}
                      transition={{ duration: 0.4, ease: expo }}
                    />
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── requirements & faq ────────────────── */

function RequirementsAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 border-t border-[#0b2748]/8 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left — Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <Eyebrow>Requirements</Eyebrow>
            <TextReveal>
              <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
                Admission Depends on{" "}
                <span className="italic font-medium text-[#af8f47]">
                  Approved Criteria
                </span>
              </h2>
            </TextReveal>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8, ease: expo, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-[2px] bg-[#af8f47] mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-[#0b2748]/70 font-medium leading-[1.8] text-[16px] md:text-[17px] mb-10"
            >
              Eligibility for NDAS training is based on approved criteria, nomination requirements and administrative instructions applicable to each intake. Prosective trainees should rely only on official NDAS or Nigerian NAvy notices.
            </motion.p>

            <div className="space-y-3">
              {REQUIREMENTS.map((req, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.7, ease: expo }}
                  viewport={{ once: true }}
                >
                  <SpotlightCard className="group relative bg-white border border-[#0b2748]/8 p-6 md:p-8 flex items-start gap-5 hover:border-[#af8f47]/30 transition-colors duration-500 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-[#af8f47]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#af8f47]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                          viewport={{ once: true }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <p className="text-[#0b2748]/75 text-[15px] font-medium leading-[1.75]">
                      {req}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <div className="mb-10">
              <Eyebrow>Common Questions</Eyebrow>
              <TextReveal>
                <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748]">
                  Admissions{" "}
                  <span className="italic font-medium text-[#af8f47]">FAQ</span>
                </h2>
              </TextReveal>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: expo }}
                  viewport={{ once: true }}
                >
                  <TiltCard className="border border-[#0b2748]/10 bg-white overflow-hidden rounded-lg">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 group"
                    >
                      <h3
                        className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 ${
                          openFaq === i
                            ? "text-[#af8f47]"
                            : "text-[#0b2748] group-hover:text-[#af8f47]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          openFaq === i
                            ? "border-[#af8f47] bg-[#af8f47]"
                            : "border-[#0b2748]/15 group-hover:border-[#af8f47] group-hover:bg-[#af8f47]"
                        }`}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-colors duration-300 ${
                            openFaq === i
                              ? "text-white"
                              : "text-[#0b2748]/40 group-hover:text-white"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.4, ease: expo },
                            opacity: { duration: 0.3 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: 32 }}
                              transition={{
                                duration: 0.6,
                                ease: expo,
                                delay: 0.1,
                              }}
                              className="h-[2px] bg-[#af8f47] mb-4"
                            />
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15, duration: 0.5 }}
                              className="text-[#0b2748]/60 text-[14px] font-medium leading-[1.8]"
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── cta ───────────────────────────────── */

function CTA() {
  return (
    <section className="bg-[#f5f7f9] py-20 border-t border-[#0b2748]/8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#0b2748] relative overflow-hidden p-12 md:p-16 lg:p-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 rounded-sm"
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <FloatingParticles count={6} />

          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#af8f47]/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#4c6c84]/20 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-2xl">
            <Eyebrow light>Get In Touch</Eyebrow>
            <TextReveal>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tighter leading-[0.95] text-white mb-5">
                Have Questions About Admissions?
              </h2>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white/60 font-medium leading-[1.7] text-[15px] max-w-[52ch]"
            >
              Contact the School directly for current intake guidance,
              eligibility confirmation, and related enquiries.
            </motion.p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <MagneticButton href="/contact" variant="primary">
              Contact NDAS
            </MagneticButton>
            <MagneticButton href="/academics" variant="outline">
              Explore Training
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── footer ────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#0b2748] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expo }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <p className="text-white font-black text-[13px] tracking-tight leading-snug">
              NAVAL DOCKYARD
              <br />
              APPRENTICE SCHOOL
            </p>
          </div>
          <p className="text-white/50 text-[13px] font-medium leading-[1.75]">
            The technical training school of Naval Dockyard Limited, focused on
            apprenticeship, practical engineering trades, and dockyard-relevant
            technical manpower development.
          </p>
        </motion.div>

        {FOOTER_COLS.map((col, i) => (
          <motion.div
            key={col.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 * (i + 1), ease: expo }}
            viewport={{ once: true }}
          >
            <p className="text-white text-[10px] font-extrabold tracking-[0.4em] uppercase mb-5">
              {col.heading}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-white/50 hover:text-white transition-all duration-300 inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#af8f47] group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-[11px] text-white/30 tracking-widest uppercase">
          © 2026 Naval Dockyard Apprentice School. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <motion.div
            className="h-[1px] bg-[#af8f47]/40"
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            transition={{ duration: 0.8, ease: expo }}
            viewport={{ once: true }}
          />
          <span className="text-[10px] text-white/20 tracking-widest">
            EST. 2019
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── page ──────────────────────────────── */

export default function AdmissionsPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`${dmSans.variable} min-h-screen relative`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <ScrollProgress />

      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: expo }}
            className="fixed inset-0 bg-[#0b2748] z-[100] flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-12 h-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 38%, #fff8dd 0%, #ecd18f 55%, #c8a03c 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Topbar />
      <Header />
      <main>
        <Hero />
        <SelectionProcess />
        <RequirementsAndFAQ />
        <CTA />
      </main>
      <Footer />
      <BackToTop />

      {/* Global noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[70] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
