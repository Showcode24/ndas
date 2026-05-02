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
  // { label: "Student Life", href: "/student-life", dropdown: true },
  // { label: "Projects & Gallery", href: "/facilities", dropdown: false },
  // { label: "News & Events", href: "/news", dropdown: false },
  // { label: "Portal", href: "/portal", dropdown: false },
  { label: "Facilities", href: "/facilities", dropdown: false },
  { label: "Partnerships", href: "/partnerships", dropdown: false },
  { label: "Contact", href: "/contact", dropdown: false },
];

const CONTACT_INFO = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    title: "Find Us",
    lines: [
      "Naval Dockyard Apprentice School",
      "Naval Dockyard Limited Compound",
      "Victoria Island, Lagos",
      "Nigeria",
    ],
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    title: "Direct Lines",
    lines: ["Official numbers and email to be confirmed before publication."],
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Office Hours",
    lines: [
      "Monday – Friday: official hours to be confirmed.",
      "Saturday: Closed",
      "Sunday: Closed",
    ],
  },
];

const SUBJECTS = [
  "Admissions & Joining Instructions",
  "Partnership & Collaboration",
  "Training Enquiry",
  "General Enquiry",
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
      { label: "Tiger Gate, Victoria Island", href: "#" },
      { label: "Official contacts TBC", href: "#" },
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

  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(175,143,71,0.12), transparent 40%)`;
  const border = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(175,143,71,0.3), transparent 40%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ background }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 p-px"
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
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), softSpring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), softSpring);

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
  type = "link",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  type?: "link" | "button";
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
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
      : variant === "secondary"
        ? "bg-[#0b2748] text-white hover:bg-[#0b2748]/90"
        : "text-white border border-white/30 hover:bg-white/10 hover:border-white/50";

  if (type === "button") {
    return (
      <button
        ref={ref}
        className={`${base} ${styles} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        onClick={onClick}
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
      </button>
    );
  }

  return (
    <Link
      ref={ref}
      href={href || "#"}
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
          Naval Dockyard Limited Compound, Victoria Island, Lagos
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: expo }}
          className="hidden md:block"
        >
          Dockyard-Based Technical Training
        </motion.span>
      </div>
    </div>
  );
}

/* ─────────────────────────── header ────────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
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
              Practical skills · Technical discipline
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
          {NAV.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: expo }}
            >
              <Link
                href={item.href}
                className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 rounded-sm relative group ${
                  item.active
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
                {item.active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#af8f47] rounded-full"
                  />
                )}
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#af8f47] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </motion.div>
          ))}
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
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-[#0b2748]">
      <motion.div
        style={{ y: y1, scale }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/contact-hero.jpg'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
            backgroundBlendMode: "overlay",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748] via-[#0b2748]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748]/60 via-transparent to-transparent" />

      <FloatingParticles count={8} />

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
            <span className="text-white/80">Contact</span>
          </motion.nav>

          <Eyebrow light>Contact NDAS</Eyebrow>

          <TextReveal delay={0.2}>
            <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white mb-6">
              Reach the{" "}
              <span className="text-[#af8f47] relative inline-block">
                Naval
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
              Dockyard Apprentice School.
            </h1>
          </TextReveal>

          <TextReveal delay={0.4}>
            <p className="text-white/60 text-[16px] sm:text-[18px] font-light leading-[1.7] mb-10 max-w-[48ch]">
              For admissions, partnership enquiries, or general institutional
              correspondence, contact NDAS through the official channels listed
              below.
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

/* ─────────────────────────── contact section ───────────────────── */

function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-[40%]"
          >
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Get in Touch</Eyebrow>
              <TextReveal>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
                  Contact{" "}
                  <span className="italic font-medium text-[#af8f47]">
                    Information
                  </span>
                </h2>
              </TextReveal>

              <div className="space-y-4">
                {CONTACT_INFO.map((info, i) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.7, ease: expo }}
                    viewport={{ once: true }}
                  >
                    <SpotlightCard>
                      <div className="bg-white border border-[#0b2748]/5 p-6 md:p-8 rounded-xl group hover:border-[#af8f47]/20 transition-colors duration-500">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#af8f47]/10 flex items-center justify-center flex-shrink-0 text-[#af8f47] group-hover:bg-[#af8f47] group-hover:text-white transition-all duration-500">
                            {info.icon}
                          </div>
                          <div>
                            <h3 className="text-[#0b2748] text-[15px] font-semibold tracking-tight mb-2">
                              {info.title}
                            </h3>
                            {info.lines.map((line, j) => (
                              <p
                                key={j}
                                className="text-[#0b2748]/55 text-[13px] font-medium leading-[1.7]"
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-[60%]"
          >
            <TiltCard className="h-full">
              <SpotlightCard className="h-full">
                <div className="bg-white border border-[#0b2748]/5 p-8 md:p-12 rounded-xl">
                  <Eyebrow>Send an Enquiry</Eyebrow>
                  <TextReveal>
                    <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-8">
                      Contact{" "}
                      <span className="italic font-medium text-[#af8f47]">
                        Form
                      </span>
                    </h2>
                  </TextReveal>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#0b2748]/50 mb-2.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full bg-[#f5f7f9] border border-[#0b2748]/8 rounded-lg px-4 py-3.5 text-[14px] font-medium text-[#0b2748] placeholder:text-[#0b2748]/30 focus:outline-none focus:border-[#af8f47]/50 focus:ring-2 focus:ring-[#af8f47]/10 transition-all duration-300"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#0b2748]/50 mb-2.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="Your email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          className="w-full bg-[#f5f7f9] border border-[#0b2748]/8 rounded-lg px-4 py-3.5 text-[14px] font-medium text-[#0b2748] placeholder:text-[#0b2748]/30 focus:outline-none focus:border-[#af8f47]/50 focus:ring-2 focus:ring-[#af8f47]/10 transition-all duration-300"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#0b2748]/50 mb-2.5">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          value={formState.subject}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              subject: e.target.value,
                            })
                          }
                          className="w-full bg-[#f5f7f9] border border-[#0b2748]/8 rounded-lg px-4 py-3.5 text-[14px] font-medium text-[#0b2748] focus:outline-none focus:border-[#af8f47]/50 focus:ring-2 focus:ring-[#af8f47]/10 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0b2748]/40 pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#0b2748]/50 mb-2.5">
                        Message
                      </label>
                      <textarea
                        placeholder="How can NDAS help?"
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="w-full bg-[#f5f7f9] border border-[#0b2748]/8 rounded-lg px-4 py-3.5 text-[14px] font-medium text-[#0b2748] placeholder:text-[#0b2748]/30 focus:outline-none focus:border-[#af8f47]/50 focus:ring-2 focus:ring-[#af8f47]/10 transition-all duration-300 resize-none"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <MagneticButton
                        type="button"
                        variant="primary"
                        onClick={handleSubmit}
                        className="w-full sm:w-auto justify-center"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitted ? (
                            <motion.span
                              key="submitted"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                              Message Sent
                            </motion.span>
                          ) : isSubmitting ? (
                            <motion.span
                              key="submitting"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <motion.svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth={4}
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </motion.svg>
                              Sending...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              Send Enquiry
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </MagneticButton>
                    </motion.div>
                  </form>
                </div>
              </SpotlightCard>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── location section ──────────────────── */

function LocationSection() {
  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 border-t border-[#0b2748]/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-stretch">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <SpotlightCard className="h-full bg-white border border-[#0b2748]/5 p-10 md:p-14 rounded-xl">
              <Eyebrow>Location</Eyebrow>
              <TextReveal>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
                  Find us at{" "}
                  <span className="italic font-medium text-[#af8f47]">
                    Tiger Gate,
                  </span>{" "}
                  Victoria Island.
                </h2>
              </TextReveal>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-[#0b2748]/60 text-[15px] font-medium leading-[1.8] mb-8"
              >
                Use the official route guidance and published contact details
                for visits, admissions enquiries, and administrative
                correspondence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <MagneticButton href="#" variant="secondary">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    Open in Google Maps
                  </span>
                </MagneticButton>
              </motion.div>
            </SpotlightCard>
          </motion.div>

          {/* Right — Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <TiltCard className="h-full">
              <div className="h-full min-h-[400px] bg-[#0b2748] rounded-xl relative overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#f5f7f9 1px,transparent 1px),linear-gradient(90deg,#f5f7f9 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <FloatingParticles count={10} />
                <motion.div
                  className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-[#af8f47]/20 blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.3,
                    }}
                    viewport={{ once: true }}
                    className="w-16 h-16 rounded-full bg-[#af8f47] flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      className="w-7 h-7 text-[#0b2748]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </motion.div>
                  <p className="text-white/60 text-[13px] font-medium tracking-wide uppercase">
                    Map Integration
                  </p>
                  <p className="text-white/40 text-[12px] font-medium mt-1">
                    Tiger Gate, Victoria Island, Lagos
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
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

export default function ContactPage() {
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
        <ContactSection />
        <LocationSection />
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
