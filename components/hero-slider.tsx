"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  interval?: number;
}

export function HeroSlider({
  slides,
  autoplay = true,
  interval = 8000,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, slides.length]);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 h-[600px] md:h-[800px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Ken Burns Image Animation */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: interval / 1000, ease: "linear" }}
          >
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00234E]/90 via-[#00234E]/40 to-transparent" />

          {/* Content Wrapper */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 max-w-4xl"
              >
                {slides[currentIndex].title}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl font-light tracking-wide mb-10"
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button className="px-8 py-4 bg-[#C5A059] hover:bg-[#b08d4a] text-white transition-all duration-300 font-semibold tracking-wider uppercase text-sm shadow-xl">
                Explore Programs
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-12 flex items-center justify-between px-8 md:px-16 z-20">
        <div className="flex gap-4">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full text-white backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full text-white backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group relative h-10 w-2"
            >
              <div
                className={`absolute bottom-0 left-0 w-full transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? "h-full bg-[#C5A059]"
                    : "h-2 bg-white/30 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
  