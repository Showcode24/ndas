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

const FACILITIES = [
  {
    id: "welding",
    number: "01",
    title: "Welding & Fabrication",
    subtitle: "Workshop",
    description:
      "Metal joining, fabrication work, cutting operations, and structural repair. Equipped for SMAW, GMAW, and oxy-fuel processes.",
    details: [
      "SMAW / GMAW stations",
      "Oxy-fuel cutting",
      "Structural repair bay",
      "PPE-compliant ventilation",
    ],
    color: "#af8f47",
    span: "large",
  },
  {
    id: "electrical",
    number: "02",
    title: "Electrical",
    subtitle: "Electronics Lab",
    description:
      "Electrical installation practice, motor rewinding, fault tracing, and control circuit diagnostics.",
    details: [
      "Motor rewinding stations",
      "Fault tracing simulators",
      "Control circuit trainers",
      "Industrial wiring rigs",
    ],
    color: "#4c6c84",
    span: "medium",
  },
  {
    id: "plumbing",
    number: "03",
    title: "Plumbing",
    subtitle: "Training Bay",
    description:
      "Pipe fitting, installation sequences, maintenance protocols, and drainage system practice.",
    details: [
      "Threading & grooving tools",
      "Pressure testing rigs",
      "Drainage mockups",
      "Blueprint reading station",
    ],
    color: "#0b2748",
    span: "medium",
  },
  {
    id: "carpentry",
    number: "04",
    title: "Carpentry",
    subtitle: "Joinery Workshop",
    description:
      "Woodwork, joinery practice, fitting tasks, and furniture construction with hand and power tools.",
    details: [
      "Bench & machine tools",
      "Timber seasoning rack",
      "Joint-making stations",
      "Finishing & coating bay",
    ],
    color: "#6b8fa3",
    span: "large",
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
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-[#0b2748]">
      <motion.div
        style={{ y: y1, scale }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/facilities-hero.jpg'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
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
            <span className="text-white/80">Facilities</span>
          </motion.nav>

          <Eyebrow light>Workshops and Infrastructure</Eyebrow>

          <TextReveal delay={0.2}>
            <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white mb-6">
              Facilities That Support{" "}
              <span className="text-[#af8f47] relative inline-block">
                Applied
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
              Learning.
            </h1>
          </TextReveal>

          <TextReveal delay={0.4}>
            <p className="text-white/60 text-[16px] sm:text-[18px] font-light leading-[1.7] mb-10 max-w-[48ch]">
              NDAS combines dedicated training spaces with the wider practical
              value of the Naval Dockyard environment.
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

/* ─────────────────────────── facility card ─────────────────────── */

function FacilityCard({
  facility,
  index,
}: {
  facility: (typeof FACILITIES)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const isLarge = facility.span === "large";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: expo }}
      viewport={{ once: true, margin: "-80px" }}
      className={`relative group ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SpotlightCard className="h-full">
        <div
          className={`relative h-full bg-[#0b2748] rounded-xl overflow-hidden ${
            isLarge
              ? "min-h-[420px] md:min-h-[480px]"
              : "min-h-[380px] md:min-h-[420px]"
          }`}
        >
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY, scale: imageScale }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage: `url('/images/facility-${facility.id}.jpg'), linear-gradient(135deg, ${facility.color}22 0%, ${facility.color}44 100%)`,
                backgroundBlendMode: "overlay",
              }}
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2748] via-[#0b2748]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2748]/80 to-transparent" />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10 lg:p-12">
            {/* Number */}
            <motion.div
              className="absolute top-6 right-6 md:top-8 md:right-8"
              animate={{
                opacity: isHovered ? 0.3 : 0.15,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="text-[80px] md:text-[100px] font-black leading-none"
                style={{ color: facility.color }}
              >
                {facility.number}
              </span>
            </motion.div>

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                style={{
                  backgroundColor: `${facility.color}20`,
                  color: facility.color,
                  border: `1px solid ${facility.color}40`,
                }}
              >
                {facility.subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <TextReveal delay={0.1 + index * 0.05}>
              <h3 className="text-white text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-tight leading-[1.1] mb-3">
                {facility.title}
              </h3>
            </TextReveal>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-white/50 text-[14px] font-medium leading-[1.7] max-w-[45ch] mb-6"
            >
              {facility.description}
            </motion.p>

            {/* Expandable details */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: expo }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 mb-6">
                    {facility.details.map((detail, i) => (
                      <motion.span
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="text-[11px] font-semibold text-white/70 bg-white/10 px-3 py-1.5 rounded-md border border-white/10"
                      >
                        {detail}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom accent line */}
            <motion.div
              className="h-[2px] rounded-full origin-left"
              style={{ backgroundColor: facility.color }}
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{
                delay: 0.4 + index * 0.1,
                duration: 0.8,
                ease: expo,
              }}
              viewport={{ once: true }}
            />

            {/* Hover indicator */}
            <motion.div
              className="absolute bottom-8 right-8 md:bottom-10 md:right-10"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: facility.color }}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ─────────────────────────── facilities bento ──────────────────── */

function FacilitiesBento() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <Eyebrow>Training Environment</Eyebrow>
          <TextReveal>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
              Practical Space Matters in{" "}
              <span className="italic font-medium text-[#af8f47]">
                Technical Training.
              </span>
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[#0b2748]/60 text-[15px] font-medium leading-[1.8]"
          >
            TNDAS facilities support practical training in welding and fabrication, electrical electronics and motor rewinding, plumbing and pipe fitting, and carpentry and joinery. These facilities are designed to strengthen workshop discipline and trade competence.
          </motion.p>
        </motion.div>

        {/* Desktop: Bento grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 auto-rows-fr">
          {FACILITIES.map((facility, i) => (
            <FacilityCard key={facility.id} facility={facility} index={i} />
          ))}
        </div>

        {/* Mobile: Horizontal scroll snap */}
        <div
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FACILITIES.map((facility, i) => (
            <div
              key={facility.id}
              className="snap-center flex-shrink-0 w-[85vw] max-w-[360px]"
            >
              <FacilityCard facility={facility} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <motion.div
          className="md:hidden flex items-center justify-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-8 h-px bg-[#0b2748]/20" />
          <span className="text-[10px] text-[#0b2748]/40 tracking-widest uppercase font-medium">
            Swipe to explore
          </span>
          <div className="w-8 h-px bg-[#0b2748]/20" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── extended context ──────────────────── */

function ExtendedContext() {
  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 border-t border-[#0b2748]/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <SpotlightCard className="h-full bg-white border border-[#0b2748]/5 p-10 md:p-14 rounded-xl">
              <Eyebrow>Extended Practical Context</Eyebrow>
              <TextReveal>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
                  The Dockyard Is Part of the{" "}
                  <span className="italic font-medium text-[#af8f47]">
                    Learning Environment.
                  </span>
                </h2>
              </TextReveal>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-[#0b2748]/60 text-[15px] font-medium leading-[1.8] mb-8"
              >
             NDAS is located within the Naval Dockyard Limited environment. This gives trainees exposure to the culture of ship repair, maintenance and support, farication, safety practice and applied dockyard engineering
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <MagneticButton href="/contact" variant="primary">
                  View Location on Map
                </MagneticButton>
              </motion.div>
            </SpotlightCard>
          </motion.div>

          {/* Right — Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
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
                  Naval Dockyard Apprentice School 28, Ahmadu Bello Way,
                  Victoria Island, Lagos, Nigeria, Lagos
                </p>
              </div>
            </div>
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

export default function FacilitiesPage() {
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
        <FacilitiesBento />
        <ExtendedContext />
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
