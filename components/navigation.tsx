"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [{ label: "Leadership Team", href: "/about/leadership-team" }],
  },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Facilities", href: "/facilities" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/ndas-logo.png"
                width={100}
                height={100}
                alt="ndas-logo"
              />
            </motion.div>
            <div className="hidden md:block">
              <div className="text-sm font-bold text-foreground">NDAS</div>
              <div className="text-xs text-muted-foreground">
                Maritime Excellence
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {" "}
            {/* Wider gap, entirely transparent container */}
            {navLinks.map((link) => {
              const isHovered = openDropdown === link.label;
              const active = isActive(link.href);

              return (
                <div
                  key={link.label}
                  className="relative py-4" // Padding added here creates a larger, invisible hover target
                  onMouseEnter={() =>
                    link.children && setOpenDropdown(link.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors flex items-center gap-1.5
            ${active || isHovered ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {link.label}

                    {link.children && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 opacity-60 ${
                          isHovered ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Animated Underline (Replaces the background pill) */}
                  {(active || isHovered) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-foreground rounded-t-full"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}

                  {/* Minimalist Glass Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 w-56 z-50"
                        >
                          <div className="bg-background/70 backdrop-blur-xl border border-border/40 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-1.5">
                            <div className="flex flex-col gap-0.5">
                              {link.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link href="/admissions" className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Apply Now
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-border/50"
            >
              <div className="flex flex-col gap-1 py-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Mobile parent link */}
                    <Link
                      href={link.href}
                      className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${
                          isActive(link.href)
                            ? "bg-accent/10 text-accent"
                            : "text-foreground hover:bg-muted"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>

                    {/* Mobile children */}
                    {link.children && (
                      <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l-2 border-border/50 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-3 py-1.5 text-sm rounded-lg transition-colors
                              ${
                                isActive(child.href)
                                  ? "text-accent font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                <div className="pt-2 px-4">
                  <Link href="/admissions" className="w-full block">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
