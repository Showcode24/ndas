'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Event } from '@/lib/data';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const formattedDate = event.date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="h-full overflow-hidden border border-border/50 hover:border-secondary/50 transition-colors group cursor-pointer">
        {/* Glassmorphic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/5 opacity-50" />

        <div className="relative p-6 h-full flex flex-col">
          {/* Category Badge */}
          <motion.div
            className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {event.category}
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 flex-grow">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-3 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-secondary font-medium text-sm group-hover:gap-3 transition-all"
            whileHover={{ x: 4 }}
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
