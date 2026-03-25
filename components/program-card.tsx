'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Anchor, Zap, Wrench, Building, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Program } from '@/lib/data';

interface ProgramCardProps {
  program: Program;
  index?: number;
}

const iconMap = {
  Anchor: Anchor,
  Zap: Zap,
  Wrench: Wrench,
  Building: Building,
};

export function ProgramCard({ program, index = 0 }: ProgramCardProps) {
  const Icon = iconMap[program.icon as keyof typeof iconMap] || Anchor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
            <Icon className="w-6 h-6 text-secondary" />
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {program.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          {program.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-secondary">
            {program.duration}
          </span>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
            {program.category}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
