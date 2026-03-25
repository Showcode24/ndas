"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Anchor, ArrowRight, Ship, Settings, Zap, Library } from "lucide-react";
import { mockFacilities } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";

// Animation variants
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

const highlightIcons = {
  "Ship Simulator Lab": Ship,
  "Machine Shop": Settings,
  "Electrical Lab": Zap,
  "Library & Resources": Library,
};

export default function FacilitiesPage() {
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

      {/* 1. CINEMATIC HERO SECTION (Adapted from About Page) */}
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

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl flex flex-col items-center"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-blue-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                NDAS Infrastructure
              </span>
              <span className="h-px w-8 bg-blue-500" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-white leading-[1.05]"
            >
              World-Class{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Facilities.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light"
            >
              Immerse yourself in state-of-the-art maritime environments
              designed to bridge the gap between classroom theory and open-water
              reality.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. FACILITIES GRID (Pinterest/Bento Style) */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white relative -mt-8 rounded-t-[3rem] z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
            {mockFacilities.map((facility, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={facility.id}
                className={`group relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 ${
                  index % 3 === 0 ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md mb-4 border border-white/30">
                      {facility.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {facility.name}
                    </h3>
                    <p className="text-slate-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION (Bento Grid Highlights) */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-blue-600" />
                <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  The NDAS Edge
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Campus Highlights
              </h2>
            </div>
            <button className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Explore Campus Map
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Ship Simulator Lab",
                desc: "Advanced bridge simulation for navigation and vessel operations",
              },
              {
                title: "Machine Shop",
                desc: "CNC machines and precision engineering equipment",
              },
              {
                title: "Electrical Lab",
                desc: "Comprehensive electrical systems testing and training",
              },
              {
                title: "Library & Resources",
                desc: "Extensive maritime and engineering reference materials",
              },
            ].map((item, index) => {
              const Icon = highlightIcons[item.title] || Anchor;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={item.title}
                  className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
