'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Anchor, Mail, MapPin, Phone } from 'lucide-react';

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Academics', href: '/academics' },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Facilities', href: '/facilities' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Connect With Us',
    links: [
      { label: 'Email', icon: Mail, href: 'mailto:info@ndas.edu' },
      { label: 'Phone', icon: Phone, href: 'tel:+912345678900' },
      { label: 'Location', icon: MapPin, href: '#' },
    ],
  },
];

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Anchor className="w-6 h-6" />
              <div>
                <div className="text-lg font-bold">NDAS</div>
                <div className="text-xs opacity-75">Maritime Excellence</div>
              </div>
            </Link>
            <p className="text-sm opacity-75">
              Preparing leaders in maritime engineering and naval sciences since 1949.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => {
                  const Icon = 'icon' in link ? link.icon : null;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm opacity-75 hover:opacity-100 transition-opacity flex items-center gap-2"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/20 mb-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-75"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>&copy; 2024 Naval Dockyard Apprenticeship School. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
