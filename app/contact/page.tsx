"use client";

import React, { useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Anchor,
  Globe,
} from "lucide-react";
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
    transition: { staggerChildren: 0.1 },
  },
};

export default function ContactPage() {
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
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-4 md:px-6 lg:px-8 bg-[#0F172A] overflow-hidden">
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
                Get In Touch
              </span>
              <span className="h-px w-8 bg-blue-500" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-white leading-[1.05]"
            >
              Chart a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Course
              </span>{" "}
              to Us.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light"
            >
              Whether you're an aspiring apprentice or a maritime partner, our
              doors (and lines) are always open.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT MAIN SECTION */}
      <section className="relative px-4 md:px-6 lg:px-8 -mt-16 z-20 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Contact Bento Grid */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {/* Location Card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Our Anchorage
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Naval Dockyard, Tiger Gate,
                    <br />
                    Mumbai, Maharashtra 400001
                  </p>
                </motion.div>

                {/* Direct Reach Card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Direct Lines
                  </h3>
                  <p className="text-slate-600">+91 (22) 2275-XXXX</p>
                  <p className="text-slate-600">helpdesk@ndas.edu.in</p>
                </motion.div>
              </div>

              {/* Working Hours / Info Card (Bento Style Wide) */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-blue-600 text-white shadow-blue-900/10 shadow-2xl relative overflow-hidden group"
              >
                <Clock className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Watch Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/20 pb-2">
                      <span>Mon — Friday</span>
                      <span className="font-bold">08:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-2">
                      <span>Saturday</span>
                      <span className="font-bold">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Sunday</span>
                      <span className="text-white/60">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Premium Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100"
            >
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  Send a Signal
                </h2>
                <p className="text-slate-500">
                  Complete the form below and our command center will route your
                  request to the right department.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Subject of Inquiry
                  </label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none">
                    <option>Admissions & Recruitment</option>
                    <option>Facility Tours</option>
                    <option>Corporate Partnership</option>
                    <option>General Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  ></textarea>
                </div>

                <button className="w-full md:w-auto px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group">
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CINEMATIC MAP PLACEHOLDER */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full rounded-[3rem] overflow-hidden bg-slate-100 border border-slate-200 group"
          >
            {/* You would integrate Google Maps or Leaflet here. For now, a cinematic placeholder. */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <MapPin className="w-10 h-10 text-blue-600" />
              </div>
              <div className="mt-6 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/20">
                <span className="text-slate-900 font-bold tracking-tight">
                  Find us at Tiger Gate
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
