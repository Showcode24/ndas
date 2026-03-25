"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Anchor,
  Award,
  Users,
  Target,
  ChevronRight,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { teamMembers } from "@/lib/data";

const missionValues = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To develop skilled, professional maritime engineers and technicians who meet international standards and contribute to naval excellence.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards of education and training through state-of-the-art facilities and expert faculty.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We foster a collaborative environment where students learn, grow, and develop into industry-ready professionals.",
  },
  {
    icon: Anchor,
    title: "Maritime Heritage",
    description:
      "We preserve and advance naval traditions while embracing modern maritime technologies and innovations.",
  },
];

// Animation variants for reusability
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main
      className="min-h-screen bg-[#F8FAFC] selection:bg-blue-900 selection:text-white"
      ref={containerRef}
    >
      <Navigation />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 bg-[#0F172A] overflow-hidden">
        {/* Abstract Deep Water Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: yParallax }}
            className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"
          />
          <div className="absolute bottom-[0%] -left-[20%] w-[60%] h-[60%] bg-cyan-500/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-12 bg-blue-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                Est. 1949
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-white leading-[1.05]"
            >
              Forged by the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Sea.
              </span>
              <br />
              Driven by Excellence.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light"
            >
              Discover the history, mission, and the people behind India's
              premier Naval Dockyard Apprenticeship School.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. EDITORIAL HISTORY SECTION (Sticky Layout) */}
      <section className="py-24 md:py-40 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column: Sticky Header */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
                >
                  Our <br className="hidden lg:block" /> Heritage.
                </motion.h2>

                {/* Visual Anchor Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative h-64 w-full md:w-4/5 rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 mt-12 hidden md:block group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5" />
                  <Anchor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-blue-900/10 group-hover:scale-110 group-hover:text-blue-900/20 transition-all duration-700" />
                </motion.div>
              </div>
            </div>

            {/* Right Column: Flowing Text */}
            <div className="lg:col-span-7 prose prose-lg prose-slate md:prose-xl max-w-none">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p
                  variants={fadeUp}
                  className="text-2xl md:text-3xl font-medium text-slate-900 leading-snug mb-10"
                >
                  Founded in 1949, NDAS has been at the absolute forefront of
                  maritime education, charting the course for future naval
                  engineers and technicians.
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="text-slate-600 leading-relaxed mb-8"
                >
                  What started as a highly specialized, small-scale
                  apprenticeship program has evolved into a comprehensive,
                  world-class institution. We blend rigorous academic theory
                  with unparalleled hands-on dockyard experience.
                </motion.p>

                <motion.blockquote
                  variants={fadeUp}
                  className="border-l-4 border-blue-600 pl-6 my-12 italic text-slate-800 text-xl md:text-2xl"
                >
                  "Our commitment to excellence isn't just a statement; it's a
                  measurable standard upheld by every graduating class since the
                  mid-20th century."
                </motion.blockquote>

                <motion.p
                  variants={fadeUp}
                  className="text-slate-600 leading-relaxed mb-12"
                >
                  Over the decades, NDAS has trained thousands of professionals
                  who have gone on to serve in the Navy, maritime industry, and
                  international shipping conglomerates. Our legacy is written in
                  the global waters they navigate.
                </motion.p>

                <motion.div variants={fadeUp}>
                  <Link
                    href="/admissions"
                    className="group inline-flex items-center gap-4 text-blue-600 font-bold text-lg hover:text-blue-800 transition-colors"
                  >
                    <span>Begin Your Maritime Journey</span>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VALUES (Interactive Grid) */}
      <section className="py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-slate-50 relative overflow-hidden border-y border-slate-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              The Compass We Steer By
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              The core tenets that guide our curriculum, our faculty, and our
              cadets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {missionValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative p-10 lg:p-12 bg-white rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)] transition-all duration-500 hover:-translate-y-2 border border-slate-100"
                >
                  {/* Watermark Number */}
                  <div className="absolute -right-6 -bottom-10 text-[12rem] font-black text-slate-50/80 group-hover:text-blue-50/50 transition-colors duration-500 select-none z-0">
                    0{i + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                      <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP TEAM (Premium Portrait Cards) */}
      <section className="py-24 md:py-40 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-blue-600" />
                <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  Command
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Leadership Team
              </h2>
            </div>
            <p className="text-lg text-slate-500 max-w-md text-balance">
              Guided by veterans of the sea and masters of engineering, our
              leadership ensures NDAS remains a beacon of excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-[400px] md:h-[450px] w-full rounded-3xl overflow-hidden mb-6 bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  {/* Subtle gradient overlay at bottom for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="px-2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4 tracking-wide text-sm uppercase">
                    {member.title}
                  </p>
                  <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
