"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Anchor,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  FileText,
  UserCheck,
  ClipboardList,
  Trophy,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const requirements = [
  {
    text: "High school diploma or equivalent",
    detail: "Minimum 5 credits including English & Math",
  },
  {
    text: "Mathematics & Science proficiency",
    detail: "Physics and Chemistry required",
  },
  {
    text: "Physical fitness & medical clearance",
    detail: "Standard Naval health examination",
  },
  {
    text: "Written entrance examination",
    detail: "Covers STEM and Logical Reasoning",
  },
  {
    text: "Personal interview",
    detail: "Aptitude and professional motivation assessment",
  },
];

const admissionSteps = [
  {
    title: "Application",
    desc: "Submit application online with digital credentials and identity verification.",
    icon: FileText,
  },
  {
    title: "Entrance Test",
    desc: "Comprehensive evaluation at the Naval Dockyard Testing Center.",
    icon: Cpu,
  },
  {
    title: "The Interview",
    desc: "Face-to-face evaluation by the Admissions Board and Technical Officers.",
    icon: UserCheck,
  },
  {
    title: "Commissioning",
    desc: "Final merit list publication and issuance of Admission Letters.",
    icon: Trophy,
  },
];

// Added the missing FAQs data array
const faqs = [
  {
    question: "When is the application deadline?",
    answer:
      "We accept applications on a rolling basis, but recommend applying at least 4 weeks before your intended start date.",
  },
  {
    question: "Do you offer financial aid or scholarships?",
    answer:
      "Yes. We evaluate all admitted students for merit-based scholarships automatically during the review process.",
  },
  {
    question: "What are the technical prerequisites?",
    answer:
      "Basic computer literacy is required. For advanced programs, a brief technical assessment will be provided.",
  },
];

export default function AdmissionsPage() {
  // Added the missing state for the accordion
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-blue-900 selection:text-white">
      <Navigation />

      {/* 1. HERO SECTION: "The Invitation" */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-50/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-md bg-blue-600/5 border border-blue-600/10">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                Recruitment Protocol 2026
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.9]">
              Forge Your <br />
              <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">
                Career.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed mb-10">
              Join the elite vanguard of naval engineering. Our selection
              process identifies the sharpest minds for the world's most
              demanding environments.
            </p>

            <Button
              size="lg"
              className="rounded-none bg-slate-900 hover:bg-blue-600 text-white px-8 h-14 transition-all group"
            >
              Start Application{" "}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PIPELINE: The Strategic Path */}
      <section className="py-32 px-4 md:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
        {/* Background glow for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                THE <span className="text-blue-500">SELECTION</span> <br />
                SEQUENCE.
              </h2>
              <p className="mt-6 text-slate-400 text-lg font-light">
                A four-stage protocol designed to identify the next generation
                of technical leaders at Naval Dockyard Limited.
              </p>
            </div>
            <div className="hidden md:block pb-2">
              <div className="text-right">
                <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">
                  Status: Active
                </span>
                <p className="text-slate-500 text-xs mt-1">
                  Recruitment Cycle 2026/27
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Connecting Arrow/Line for Desktop */}
                {index !== admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-20 translate-y-[-50%]">
                    <ChevronRight className="w-8 h-8 text-slate-800 group-hover:text-blue-500 transition-colors duration-500" />
                  </div>
                )}

                <div className="h-full p-8 lg:p-10 rounded-4xl bg-slate-900/40 border border-white/5 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all duration-500 group">
                  <div className="flex items-start justify-between mb-12">
                    <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                      <step.icon className="w-6 h-6 text-blue-500 group-hover:text-white" />
                    </div>
                    <span className="font-mono text-4xl font-black text-slate-800 group-hover:text-blue-500/20 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                    {step.desc}
                  </p>

                  {/* Minimalist Progress Indicator */}
                  <div className="mt-8 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-1000 delay-500"
                      style={{ width: `${(index + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ELIGIBILITY: The "Spec Sheet" */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
                Eligibility <br />
                <span className="text-blue-600">Requirements.</span>
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
                Candidates must meet the following technical and physical
                benchmarks to be considered for the apprentice program.
              </p>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Download Prospectus (PDF)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {requirements.map((req, i) => (
                <motion.div
                  key={req.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-blue-600 transition-all duration-300"
                >
                  <div className="mr-6">
                    <CheckCircle2 className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-white transition-colors">
                      {req.text}
                    </h4>
                    <p className="text-sm text-slate-500 group-hover:text-blue-100 transition-colors">
                      {req.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ: "Support Terminal" */}
      <section className="py-20 px-6 lg:px-12 bg-white selection:bg-blue-100">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Side: Tighter, Punchier Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-blue-600 font-semibold tracking-wider text-xs uppercase letter-spacing-2">
                Admissions Support
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Got questions? <br />
              <span className="text-slate-400 font-medium">
                We've got answers.
              </span>
            </h2>
            <p className="mt-6 text-base text-slate-500 max-w-sm leading-relaxed">
              Everything you need to know about joining. If you can't find your
              answer here, our team is one click away.
            </p>
            <button className="mt-8 group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all duration-300">
              Chat with Admissions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Sleek, Border-Only Accordion */}
          <div className="lg:col-span-7 w-full pt-4">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={index} className="group">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full py-6 flex items-center justify-between text-left transition-colors hover:text-blue-600 focus:outline-none"
                    >
                      <span
                        className={`text-lg font-medium pr-8 transition-colors ${isOpen ? "text-blue-600" : "text-slate-900"}`}
                      >
                        {faq.question}
                      </span>
                      {/* Fixed Tailwind flex-shrink syntax */}
                      <span className="shrink-0 ml-4">
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"}`}
                        />
                      </span>
                    </button>

                    {/* CSS-only smooth expand/collapse */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 pb-6"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-slate-600 text-base leading-relaxed pr-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] bg-blue-600 p-12 md:p-24 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[url('/blueprint-pattern.png')] bg-repeat" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                Begin Your Commissioning.
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
                Applications for the 2026/27 academic year close in 45 days.
                Don't miss your chance to join the Naval Dockyard Apprentice
                School.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-blue-600 hover:bg-blue-50 font-bold px-12 py-8 text-xl shadow-2xl transition-all hover:scale-105"
                >
                  Launch Online Application
                </Button>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/30 text-white hover:bg-white/10 px-12 py-8 text-xl backdrop-blur-sm"
                  >
                    Inquire for Help
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
