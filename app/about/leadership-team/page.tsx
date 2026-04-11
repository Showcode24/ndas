"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Quote, History, Star, ExternalLink } from "lucide-react";
import Link from "next/link";

// --- Data Configuration ---

const leadershipData = {
  cns: {
    name: "Vice Admiral I Abbas",
    title: "Chief of Naval Staff",
    image: "/cns-nigeria.jpg",
    rank: "vanguard",
  },
  coe: {
    name: "Rear Admiral NF Damtong",
    title: "Chief of Engineering",
    image: "/cone.png",
  },
  asndl: {
    name: "Rear Admiral IE Shehu",
    title: "Admiral Superintendent NDL",
    image: "/asndl.jpg",
  },
  co: {
    name: "Captain SI Shuaibu",
    title: "Commanding Officer, NDL Apprentice School",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&auto=format&fit=crop",
  },
};

const pastCommanders = [
  {
    name: "Cdre. A.O. Ibrahim",
    tenure: "2021 - 2023",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Spearheaded the integration of modern simulation labs and overhauled the mechanical curriculum.",
  },
  {
    name: "Cdre. M.T. Usman",
    tenure: "2018 - 2021",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Expanded the apprentice intake by 40% and initiated the dockyard automation training sequence.",
  },
  {
    name: "Capt. E.N. Okafor",
    tenure: "2015 - 2018",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Established the core electronics warfare modules and strengthened maritime agency relations.",
  },
  {
    name: "Capt. S.B. Dogo",
    tenure: "2012 - 2015",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "Navigated the academy through its first major infrastructural upgrade and engineering workshops.",
  },
  {
    name: "Cdr. K.C. Nnadi",
    tenure: "2009 - 2012",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=300&h=400&auto=format&fit=crop",
    description:
      "The founding commanding officer who laid the academic foundation of the NDL Apprentice School.",
  },
];

// --- Sub-Components ---

const LeaderCard = ({ person, isLarge = false, isAccent = false }) => (
  <div className="flex flex-col items-center group">
    <div
      className={`
      relative p-1 rounded-2xl transition-all duration-700
      ${isAccent ? "bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.3)]" : "bg-slate-800 border border-slate-700"}
    `}
    >
      <div
        className={`
        overflow-hidden rounded-xl bg-slate-900 
        ${isLarge ? "w-48 h-60 md:w-56 md:h-72" : "w-36 h-48 md:w-44 md:h-56"}
      `}
      >
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      </div>
    </div>
    <div className="mt-5 text-center max-w-[200px]">
      <h4
        className={`font-bold tracking-tight ${isAccent ? "text-white text-lg" : "text-slate-200 text-base"}`}
      >
        {person.name}
      </h4>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-500 mt-1.5 font-bold">
        {person.title}
      </p>
    </div>
  </div>
);

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navigation />

      {/* 1. HERO SECTION: The Command */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-slate-100 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-md bg-slate-900/5 border border-slate-900/10">
              <Star className="w-4 h-4 text-slate-700 fill-slate-700" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                Command Structure
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.9]">
              Leadership & <br />
              <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">
                Vision.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed mb-10">
              Guided by decades of naval excellence, our leadership ensures the
              highest standards of engineering discipline, strategic foresight,
              and technical mastery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ORGANOGRAM SECTION */}
      <section className="py-32 px-4 bg-slate-950 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-700 to-transparent" />

        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-24">
            <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-4">
              Command Hierarchy
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Tier 1: Chief of Naval Staff */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <LeaderCard person={leadershipData.cns} isLarge={true} />
          </motion.div>

          {/* Vertical Linkage */}
          <div className="w-px h-16 bg-slate-800" />

          {/* Tier 2: Dual Command */}
          <div className="relative w-full max-w-5xl">
            {/* Horizontal Bridge */}
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-slate-800" />

            <div className="flex flex-col md:flex-row justify-around pt-16 gap-16 md:gap-0">
              {/* COE */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-16 left-1/2 w-px h-16 bg-slate-800" />
                <LeaderCard person={leadershipData.coe} />
              </div>

              {/* ASNDL */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-16 left-1/2 w-px h-16 bg-slate-800" />
                <LeaderCard person={leadershipData.asndl} />
              </div>
            </div>
          </div>

          {/* Vertical Linkage down to CO */}
          <div className="w-px h-16 bg-slate-800 mt-12 md:mt-0" />

          {/* Tier 3: Commanding Officer (Apprentice School Focus) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-4"
          >
            <LeaderCard person={leadershipData.co} isAccent={true} />
          </motion.div>
        </div>
      </section>

      {/* 3. WELCOME ADDRESS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <Quote className="absolute -top-12 -left-12 w-32 h-32 text-slate-50 -z-10" />
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                The Commanding <br /> Officer's{" "}
                <span className="text-blue-600">Address.</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                <p>
                  "Welcome to the Naval Dockyard Limited Apprentice School. Our
                  mission is clear: to transform the brightest technical minds
                  into the backbone of our maritime engineering strength."
                </p>
                <p>
                  "As the Commanding Officer, I oversee a curriculum that blends
                  rigorous physical discipline with cutting-edge technological
                  mastery. We don't just teach engineering; we forge leaders who
                  can maintain and innovate within the world's most complex
                  naval environments."
                </p>
                <p>
                  "Your journey here is the beginning of a legacy. We expect
                  nothing less than absolute dedication to the craft and the
                  service."
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-xl">
                  {leadershipData.co.name}
                </p>
                <p className="text-blue-600 font-mono text-sm tracking-widest uppercase mt-1">
                  Commanding Officer
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-200 relative group">
                <img
                  src={leadershipData.co.image}
                  alt="Commanding Officer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PAST COMMANDING OFFICERS */}
      <section className="py-32 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <History className="w-5 h-5" />
                <span className="font-bold tracking-widest text-xs uppercase">
                  Historical Command
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Past Commanders
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm font-light">
              Honoring those who built and sustained the legacy of the NDL
              Apprentice School over the years.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pastCommanders.map((pco, idx) => (
              <motion.div
                key={pco.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={pco.image}
                    alt={pco.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                    {pco.tenure}
                  </div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight mb-2">
                    {pco.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors">
                    {pco.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
          <h2 className="text-white text-3xl md:text-5xl font-black mb-6 relative z-10">
            Ready to join the ranks?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Apply now to start your journey under the guidance of world-class
            naval engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Button
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-6 h-auto text-base font-bold"
            >
              Start Application <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-slate-700 text-white hover:bg-slate-800 px-8 py-6 h-auto text-base font-bold"
            >
              Contact Admissions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
