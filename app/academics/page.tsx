"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Anchor,
  ChevronRight,
  Cpu,
  Ship,
  BookOpen,
  Zap,
  Settings,
  Layers,
  ArrowRight, // Added missing import
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// 1. DATA STRUCTURES & MOCKS
interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
}

const mockPrograms: Program[] = [
  {
    id: "ME-101",
    title: "Marine Engineering",
    description: "Advanced study of ship machinery, propulsion systems, and onboard mechanical operations.",
    category: "Engineering",
  },
  {
    id: "EE-202",
    title: "Electrical Systems",
    description: "Specialized training in naval electrical grids, automation, and power distribution.",
    category: "Electrical",
  },
  {
    id: "MT-303",
    title: "Marine Technology",
    description: "Focus on modern maritime tech, including digital twins and satellite navigation.",
    category: "Marine",
  },
];

const features = [
  {
    icon: Ship,
    title: "Practical Training",
    description: "Immersive hands-on experience in the actual Naval Dockyard, working on live naval vessels.",
    color: "bg-blue-500",
  },
  {
    icon: Cpu,
    title: "Modern Pedagogy",
    description: "Blending traditional naval architecture with cutting-edge digital twins and AI.",
    color: "bg-cyan-500",
  },
  {
    icon: Zap,
    title: "Industry Ready",
    description: "Curriculum designed in direct synergy with global maritime standards.",
    color: "bg-indigo-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AcademicsPage() {
  // 2. LOGIC STATE (Fixed missing variables)
  const [activeTab, setActiveTab] = useState<string>("All");
  const categories = ["All", "Engineering", "Electrical", "Marine"];

  const filteredPrograms = activeTab === "All" 
    ? mockPrograms 
    : mockPrograms.filter((p) => p.category === activeTab);

  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-900 selection:text-white">
      <Navigation />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 border border-blue-100 rounded-full"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                    Academic Pedagogy
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-slate-900 leading-[0.95]">
                  Shaping the <span className="text-blue-600">Technical</span> Vanguard.
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed font-light">
                  A rigorous curriculum designed at the intersection of heritage naval engineering and future-tech maritime operations.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full aspect-square">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 rotate-3 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
                  <Settings className="absolute bottom-8 right-8 w-32 h-32 text-slate-200 animate-spin-slow" />
                </div>
                <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-white rounded-3xl overflow-hidden border border-slate-200 -rotate-6 shadow-2xl p-8 flex flex-col justify-end">
                  <Layers className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900">Practical Excellence</h3>
                  <p className="text-slate-500">Over 5,000+ hours of dockyard-integrated learning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE COMMAND CENTER */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Tabs for Filtering */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  activeTab === cat 
                  ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* THE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program: Program, i: number) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="relative z-10 h-full p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] flex flex-col">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/5 group-hover:border-blue-500 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/5 group-hover:border-blue-500 transition-colors" />

                    <div className="flex justify-between items-start mb-8">
                      <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                        <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
                          Module: {program.id}
                        </span>
                      </div>
                      <Ship className="w-6 h-6 text-slate-500 group-hover:text-blue-400 group-hover:rotate-12 transition-all duration-500" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-8 line-clamp-3">
                      {program.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-tighter text-slate-500">Duration</span>
                        <span className="text-sm font-semibold text-slate-200">2 Years</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] uppercase tracking-tighter text-slate-500">Department</span>
                        <span className="text-sm font-semibold text-slate-200">{program.category}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                       <span className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest cursor-pointer">
                         View Syllabus <ArrowRight className="w-4 h-4" />
                       </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-32 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              The NDAS Learning Edge
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our training infrastructure is built to bridge the gap between classroom theory and real-world maritime environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
                <div className="h-1 w-12 bg-slate-200 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="pb-32 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] bg-[#0F172A] p-12 md:p-24 overflow-hidden shadow-3xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('/blueprint-pattern.png')] bg-repeat opacity-10" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
              >
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold tracking-wider text-blue-300 uppercase">
                  Admissions Open for 2026/27
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                Ready to Command Your <br className="hidden md:block" /> Future?
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/admissions">
                  <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-8 text-xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
                    Start Your Application
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10 px-10 py-8 text-xl backdrop-blur-sm">
                    Talk to an Advisor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}