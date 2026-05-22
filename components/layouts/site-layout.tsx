"use client";

// components/layout/SiteLayout.tsx
// Reusable shell: Topbar + Header + Footer.
// Wrap any page with <SiteLayout> to get consistent chrome.

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Anchor } from "lucide-react";
import { DM_Sans } from "next/font/google";

import {
  NAV,
  TOPBAR_CONTACT,
  TOPBAR_SOCIALS,
  FOOTER_COLS,
} from "@/lib/site-layout-data";

/* ─────────────── font ─────────────── */

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─────────────── shared easing ─────────────── */

const expo = [0.19, 1, 0.22, 1] as const;

/* ─────────────── MagneticButton (shared primitive) ─────────────── */

export function MagneticButton({
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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const base =
    "inline-flex items-center text-[12px] font-bold tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-300 whitespace-nowrap text-center relative overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-[#af8f47] text-[#0d2238] hover:bg-[#c8a44c]"
      : "text-white border border-white/30 hover:bg-white/10";

  return (
    <Link
      ref={ref}
      href={href}
      className={`${base} ${styles} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </Link>
  );
}

/* ─────────────── Topbar ─────────────── */

export function Topbar() {
  return (
    <div className="bg-[#4c6c84] text-[#e8eef5]/75 text-[12px] font-medium">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 flex items-center justify-between py-2.5 gap-4">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: expo }}
          className="font-semibold"
        >
          A Division of Naval Dockyard Limited, Victoria Island, Lagos
        </motion.span>

        <div className="hidden md:flex items-center gap-5">
          {TOPBAR_CONTACT.map((item, i) => (
            <motion.a
              key={item.text}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: expo }}
              href={item.href}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
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
            </motion.a>
          ))}

          <div className="flex items-center gap-1.5 border-l border-[#e8eef5]/30 pl-4">
            {TOPBAR_SOCIALS.map((s, i) => (
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
                className="w-6 h-6 flex items-center justify-center bg-[#e8eef5]/15 hover:bg-[#af8f47] rounded-sm transition-colors"
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

/* ─────────────── Header ─────────────── */

export function Header() {
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
        {/* Logo */}
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

        {/* Nav */}
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
                  {"dropdown" in item && item.dropdown && (
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

        {/* CTA */}
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

/* ─────────────── Footer ─────────────── */

export function Footer() {
  return (
    <footer className="bg-[#0b2748]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
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

        {/* Link columns */}
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
                    className="text-[13px] font-medium text-white/50 hover:text-white hover:pl-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-white/30 tracking-widest uppercase">
          © 2026 Naval Dockyard Apprentice School. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-[1px] bg-[#af8f47]/40" />
          <span className="text-[10px] text-white/20 tracking-widest">
            EST. 2019
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── SiteLayout wrapper ─────────────── */

/**
 * Drop-in shell for any page.
 *
 * Usage:
 *   <SiteLayout>
 *     <main>...</main>
 *   </SiteLayout>
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSans.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <Topbar />
      <Header />
      {children}
      <Footer />
    </div>
  );
}