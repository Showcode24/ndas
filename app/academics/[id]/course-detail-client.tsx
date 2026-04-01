"use client";

import {
  Anchor,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getIcon } from "@/lib/icon-map";

export function CourseDetailClient({ course }: { course: any }) {
  return (
    <>
      {/* Cinematic Hero Header */}
      <section className="relative h-[70vh] flex items-end overflow-hidden bg-[#0F172A]">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={course.image}
            fill
            className="object-cover"
            alt={course.title}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 text-[#C5A059] mb-6"
          >
            <Anchor size={20} />
            <span className="text-sm font-bold tracking-[0.3em] uppercase">
              Technical Prospectus 2026
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-8xl font-serif font-bold text-white max-w-5xl leading-[1.1] tracking-tight"
          >
            {course.title}
          </motion.h1>
        </div>
      </section>

      {/* Course Specifications Grid */}
      <section className="max-w-7xl mx-auto px-6 -translate-y-16 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Clock, label: "Duration", val: course.duration },
            {
              icon: ShieldCheck,
              label: "Certification",
              val: course.certification,
            },
            { icon: Anchor, label: "Training Hub", val: course.location },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-6 group hover:border-[#C5A059] transition-colors duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#00234E] group-hover:bg-[#00234E] group-hover:text-white transition-all duration-500">
                <item.icon size={32} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-[#0F172A]">{item.val}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Detail */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8">
          <div className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              The Program
            </h2>
            <h3 className="text-4xl font-serif font-bold mb-8 text-[#0F172A]">
              Technical Overview
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              {course.fullDesc}
            </p>
          </div>

          <div className="space-y-16">
            <h3 className="text-3xl font-serif font-bold text-[#0F172A]">
              Course Curriculum
            </h3>

            {course.courseOutline.map((section: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-slate-100 hover:border-[#C5A059] transition-colors"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#C5A059]" />
                <h4 className="text-xl font-bold text-[#0F172A] mb-6 uppercase tracking-wide">
                  {section.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.topics.map((topic: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 font-medium leading-snug">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8">
            {/* Highlights Card */}
            <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl">
              <h4 className="text-lg font-bold mb-6 text-[#0F172A] flex items-center gap-2">
                <ShieldCheck className="text-[#C5A059]" /> Program Highlights
              </h4>
              <ul className="space-y-4">
                {course.highlights.map((h: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-600 text-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="p-10 bg-[#00234E] rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Anchor size={200} />
              </div>

              <h4 className="text-2xl font-serif font-bold mb-4 relative z-10">
                Start Your Professional Career
              </h4>
              <p className="text-blue-100/70 mb-8 text-sm leading-relaxed relative z-10">
                Enrollment for the 2026 session is now active. Secure your
                position in the next generation of maritime engineers.
              </p>

              <div className="space-y-4 relative z-10">
                <button className="w-full py-5 bg-[#C5A059] hover:bg-[#b08d4a] transition-all rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2">
                  Apply Online <ArrowRight size={16} />
                </button>
                <button className="w-full py-5 border border-white/20 hover:bg-white/10 transition-all rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <FileText size={16} /> Download Prospectus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
