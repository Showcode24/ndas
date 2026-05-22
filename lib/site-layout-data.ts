export const NAV = [
  { label: "Home",         href: "/",             active: true,  dropdown: false },
  { label: "About NDAS",  href: "/about",         active: false, dropdown: true  },
  { label: "Academics",   href: "/academics",     active: false, dropdown: true  },
  { label: "Admissions",  href: "/admissions",    active: false, dropdown: false },
  { label: "Facilities",  href: "/facilities",    active: false, dropdown: false },
  { label: "Partnerships",href: "/partnerships",  active: false, dropdown: false },
  { label: "News & Events",href: "/news",         active: false, dropdown: false },
  { label: "Gallery",     href: "/gallery",       active: false, dropdown: false },
] as const;

export const TOPBAR_CONTACT = [
  {
    href: "tel:+2349047998706",
    icon: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z",
    text: "+234 904 799 8706",
  },
  {
    href: "mailto:info@ndlapprenticeschool.com",
    icon: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z",
    text: "info@ndlapprenticeschool.com",
  },
] as const;

export const TOPBAR_SOCIALS = [
  {
    label: "Facebook",
    d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    label: "Twitter",
    d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "YouTube",
    d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
] as const;

/* ─────────────────────────── footer ─────────────────────────── */

export const FOOTER_COLS = [
  {
    heading: "Explore",
    links: [
      { label: "About NDAS",  href: "/about"     },
      { label: "Academics",   href: "/academics"  },
      { label: "Facilities",  href: "/facilities" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Entry Information",          href: "/admissions" },
      { label: "BAC · IAC · AAC",            href: "/admissions" },
      { label: "Trade Test & HSE Support",   href: "/admissions" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Naval Dockyard Apprentice School, 28 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria", href: "#"        },
      { label: "Email: info@ndlapprenticeschool.com",  href: "#"        },
      { label: "Phone: +234 904 799 8706",             href: "/contact" },
      { label: "Send an enquiry",                      href: "/contact" },
    ],
  },
] as const;