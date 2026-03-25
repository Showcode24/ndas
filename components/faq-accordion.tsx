'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const faqItems = [
  {
    q: 'What is the eligibility criteria?',
    a: 'Students must have completed high school education with good marks in mathematics and science.',
  },
  {
    q: 'How long are the programs?',
    a: 'Programs range from 3 to 4 years depending on the specialization chosen.',
  },
  {
    q: 'What are the placement opportunities?',
    a: 'We have over 95% placement rate with industry partners offering excellent career opportunities.',
  },
  {
    q: 'Are scholarships available?',
    a: 'Yes, merit-based scholarships are available for eligible students.',
  },
];

export function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <Card
          key={index}
          className="border border-border/50 overflow-hidden cursor-pointer hover:border-accent/50 transition-colors"
          onClick={() => setOpenFaq(openFaq === index ? null : index)}
        >
          <div className="p-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold flex-grow">{item.q}</h3>
            <span className={`text-2xl transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
          {openFaq === index && (
            <div className="px-6 pb-6 text-muted-foreground border-t border-border/30">
              {item.a}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}