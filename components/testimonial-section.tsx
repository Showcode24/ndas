'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Cadet Raj Kumar',
    title: 'Marine Engineering Graduate',
    content: 'NDAS provided me with excellent practical training and facilities. The experienced faculty and modern equipment made learning enjoyable and effective.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Cadet Priya Sharma',
    title: 'Electrical Systems Trainee',
    content: 'The hands-on approach to learning at NDAS is exceptional. I feel well-prepared for my career in the maritime industry.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Cadet Amit Patel',
    title: 'Mechanical Engineering Trainee',
    content: 'Best decision to join NDAS! The quality of education and industry connections have set me up for success.',
    rating: 5,
  },
];

export function TestimonialSection({
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our successful graduates and current cadets
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="p-8 border border-border/50 h-full flex flex-col hover:border-accent/50 transition-colors">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-border/30">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-accent">{testimonial.title}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
