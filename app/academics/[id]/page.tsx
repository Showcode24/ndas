"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  ChevronDown,
  MapPin,
  Award,
  Zap,
  Cpu,
  Hammer,
  Waves,
  Wrench,
} from "lucide-react";
import { mockPrograms } from "@/lib/courses";
import Image from "next/image";

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
  // { label: "Student Life", href: "/student-life", dropdown: true },
  // { label: "Projects & Gallery", href: "/facilities", dropdown: false },
  // { label: "News & Events", href: "/news", dropdown: false },
  // { label: "Portal", href: "/portal", dropdown: false },
  { label: "Facilities", href: "/facilities", dropdown: false },
  { label: "Partnerships", href: "/partnerships", dropdown: false },
  { label: "Contact", href: "/contact", dropdown: false },
];

const ICON_MAP: Record<string, React.ElementType> = {
  zap: Zap,
  cpu: Cpu,
  hammer: Hammer,
  waves: Waves,
  wrench: Wrench,
};

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
      <span className="text-[10px] font-extrabold tracking-[0.5em] uppercase text-[#af8f47]">
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

  if (href) {
    return (
      <Link
        ref={ref as any}
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

  return (
    <button
      ref={ref as any}
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

function Hero({ course }: { course: any }) {
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
            backgroundImage: `url('${course.image}'), linear-gradient(135deg, #0b2748 0%, #1d4e81 100%)`,
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
            <Link
              href="/academics"
              className="hover:text-white transition-colors"
            >
              Academics
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
            <span className="text-white/80">{course.title}</span>
          </motion.nav>

          <Eyebrow light>Course Detail</Eyebrow>

          <TextReveal delay={0.2}>
            <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white mb-6">
              {course.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#af8f47] relative inline-block">
                {course.title.split(" ").slice(-1)[0]}
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
              </span>
            </h1>
          </TextReveal>

          <TextReveal delay={0.4}>
            <p className="text-white/60 text-[16px] sm:text-[18px] font-light leading-[1.7] mb-10 max-w-[48ch]">
              {course.shortDesc}
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

/* ─────────────────────────── course content ────────────────────── */

function CourseContent({ course }: { course: any }) {
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <section className="bg-[#f5f7f9] py-28 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left — Main Content */}
          <div className="lg:w-[65%]">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: expo }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <Eyebrow>Course Overview</Eyebrow>
              <TextReveal>
                <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tighter leading-[0.95] text-[#0b2748] mb-6">
                  Program{" "}
                  <span className="italic font-medium text-[#af8f47]">
                    Overview
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
                {course.fullDesc}
              </motion.p>
            </motion.div>

            {/* Highlights */}
            {course.highlights && course.highlights.length > 0 && (
              <div className="mb-16">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-[#0b2748] text-lg font-semibold tracking-tight mb-6"
                >
                  Program Highlights
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.highlights.map((highlight: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 bg-white border border-[#0b2748]/5 rounded-lg p-4"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#af8f47] flex-shrink-0 mt-0.5" />
                      <span className="text-[#0b2748]/70 text-[13px] font-medium leading-[1.6]">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Outline / Curriculum */}
            {course.courseOutline && course.courseOutline.length > 0 && (
              <div className="mb-16">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-[#0b2748] text-lg font-semibold tracking-tight mb-6"
                >
                  Curriculum Outline
                </motion.h3>
                <div className="space-y-3">
                  {course.courseOutline.map((outline: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.7, ease: expo }}
                      viewport={{ once: true }}
                      className="bg-white border border-[#0b2748]/5 rounded-xl overflow-hidden group hover:border-[#af8f47]/20 transition-colors duration-500"
                    >
                      <button
                        onClick={() =>
                          setOpenModule(openModule === i ? null : i)
                        }
                        className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#af8f47]/10 flex items-center justify-center flex-shrink-0 text-[#af8f47] group-hover:bg-[#af8f47] group-hover:text-white transition-all duration-500">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-[#0b2748] text-[15px] font-semibold tracking-tight">
                              {outline.category}
                            </h4>
                            <p className="text-[#0b2748]/40 text-[12px] font-medium mt-1">
                              {outline.topics.length} topics
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: openModule === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-[#0b2748]/30" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openModule === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: expo }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                              <div className="border-t border-[#0b2748]/5 pt-6 space-y-3">
                                {outline.topics.map(
                                  (topic: string, j: number) => (
                                    <motion.div
                                      key={j}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: j * 0.05,
                                        duration: 0.4,
                                      }}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="w-5 h-5 rounded-full bg-[#af8f47]/10 text-[#af8f47] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                                        {j + 1}
                                      </span>
                                      <span className="text-[#0b2748]/70 text-[13px] font-medium leading-[1.6]">
                                        {topic}
                                      </span>
                                    </motion.div>
                                  ),
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: expo, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-[35%]"
          >
            <div className="lg:sticky lg:top-32 space-y-4">
              {/* Info Card */}
              <div className="bg-white border border-[#0b2748]/5 rounded-xl p-8">
                <h3 className="text-[#0b2748] text-[15px] font-semibold tracking-tight mb-6">
                  Program Details
                </h3>
                <div className="space-y-5">
                  {course.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#af8f47]" />
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0b2748]/40">
                          Duration
                        </p>
                        <p className="text-[#0b2748] text-[13px] font-semibold">
                          {course.duration}
                        </p>
                      </div>
                    </div>
                  )}
                  {course.certification && (
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-[#af8f47]" />
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0b2748]/40">
                          Certification
                        </p>
                        <p className="text-[#0b2748] text-[13px] font-semibold">
                          {course.certification}
                        </p>
                      </div>
                    </div>
                  )}
                  {course.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#af8f47]" />
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0b2748]/40">
                          Location
                        </p>
                        <p className="text-[#0b2748] text-[13px] font-semibold">
                          {course.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-[#0b2748]/8">
                  <MagneticButton
                    href="/admissions"
                    variant="primary"
                    className="w-full justify-center"
                  >
                    <span className="flex items-center gap-2">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </MagneticButton>
                </div>
              </div>

              {/* Related Courses */}
              <div className="bg-white border border-[#0b2748]/5 rounded-xl p-8">
                <h3 className="text-[#0b2748] text-[15px] font-semibold tracking-tight mb-4">
                  Other Programs
                </h3>
                <div className="space-y-3">
                  {mockPrograms
                    .filter((p) => p.id !== course.id)
                    .slice(0, 3)
                    .map((related: any) => (
                      <Link
                        key={related.id}
                        href={`/academics/${related.id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f5f7f9] transition-colors duration-300 group"
                      >
                        <span className="text-[#0b2748]/70 text-[13px] font-medium group-hover:text-[#0b2748] transition-colors">
                          {related.title}
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#0b2748]/30 group-hover:text-[#af8f47] transition-colors" />
                      </Link>
                    ))}
                </div>
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

export default function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    params.then(({ id }) => {
      const found = mockPrograms.find((p) => p.id === id);
      if (!found) return notFound();
      setCourse(found);
    });
  }, [params]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0b2748] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 38%, #fff8dd 0%, #ecd18f 55%, #c8a03c 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${dmSans.variable} min-h-screen relative bg-[#f5f7f9]`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <ScrollProgress />
      <Topbar />
      <Header />
      <main>
        <Hero course={course} />
        <CourseContent course={course} />
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
