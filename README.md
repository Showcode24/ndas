# Naval Dockyard Apprenticeship School (NDAS) Portal

A comprehensive, modern web portal for the Naval Dockyard Apprenticeship School featuring maritime-themed design, sophisticated animations, and a professional user experience.

## Project Overview

This Next.js 16+ application showcases NDAS's academic programs, facilities, events, and admissions information. Built with React 19, Tailwind CSS, and Framer Motion, it delivers a polished, engaging experience for prospective students, parents, and industry partners.

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Animations**: Framer Motion 11
- **UI Components**: shadcn/ui (50+ pre-built components)
- **State Management**: React Context API
- **Images**: Next.js Image optimization

### Key Features
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Smooth Animations**: Scroll-triggered animations via Framer Motion
- **Glassmorphism**: Modern frosted glass effect design
- **Maritime Theme**: Navy, teal, and gold color palette
- **Data Context**: Centralized data management for easy backend integration
- **Professional Layout**: 8 main pages with consistent styling

## Project Structure

```
app/
├── page.tsx                 # Home page with hero, programs, events
├── about/page.tsx          # About NDAS, history, leadership
├── academics/page.tsx      # Academic programs with filtering
├── admissions/page.tsx     # Admission process and FAQ
├── contact/page.tsx        # Contact form and information
├── events/page.tsx         # Events calendar with filtering
├── facilities/page.tsx     # Training facilities showcase
├── gallery/page.tsx        # Photo gallery with categories
├── layout.tsx              # Root layout with providers
├── providers.tsx           # Data context provider
└── globals.css             # Global styles and theme

components/
├── navigation.tsx          # Fixed navigation with mobile menu
├── footer.tsx              # Footer with links and info
├── hero-slider.tsx         # Image carousel hero section
├── program-card.tsx        # Program showcase card
├── event-card.tsx          # Event information card
├── gallery-image.tsx       # Gallery image component
├── stats-counter.tsx       # Animated statistics counter
├── testimonial-section.tsx # Student testimonials
└── section-wrapper.tsx     # Scroll animation wrapper

lib/
├── data.ts                 # Mock data and types
└── utils.ts                # Utility functions

public/
└── placeholder-*.jpg       # AI-generated images (20+ assets)
```

## Data Structure

### Context Provider (`app/providers.tsx`)
Manages centralized data accessible throughout the app via `useData()` hook:

```typescript
interface DataContextType {
  programs: Program[];
  events: Event[];
  facilities: Facility[];
  gallery: GalleryImage[];
  news: NewsItem[];
  statistics: Stat[];
  teamMembers: TeamMember[];
  // Helper methods
  filterProgramsByCategory(category: string): Program[];
  filterEventsByCategory(category: string): Event[];
  filterGalleryByCategory(category: string): GalleryImage[];
  getUpcomingEvents(): Event[];
}
```

## Key Components

### Navigation (`components/navigation.tsx`)
- Fixed header with responsive mobile menu
- Animated logo with rotating anchor icon
- Navigation links with hover effects
- Call-to-action "Apply Now" button

### Hero Slider (`components/hero-slider.tsx`)
- Auto-rotating image carousel
- Smooth fade transitions
- Manual navigation with arrows
- Dot indicators for slide position

### Program Card (`components/program-card.tsx`)
- Category-based program display
- Icon support with lucide-react
- Hover animations and transitions
- Duration and CTA information

### Stats Counter (`components/stats-counter.tsx`)
- Animated number counting
- Intersection Observer for performance
- Grid layout with responsive design
- Glassmorphic card styling

## Design System

### Color Palette (Maritime Theme)
- **Primary (Navy)**: oklch(0.35 0.15 265) - Deep maritime blue
- **Secondary (Teal)**: oklch(0.50 0.12 200) - Ocean teal
- **Accent (Gold)**: oklch(0.72 0.20 75) - Maritime gold
- **Neutrals**: Off-whites and grays for backgrounds and text

### Typography
- **Sans Font**: Geist (Google Fonts)
- **Mono Font**: Geist Mono (Google Fonts)
- **Headings**: Bold weights with text-balance
- **Body Text**: Leading-relaxed (1.5-1.6) for readability

### Spacing & Sizing
- **Radius**: 0.625rem (10px) for consistent border-radius
- **Gaps**: Tailwind spacing scale (4px base unit)
- **Container**: max-w-7xl (1280px) for optimal content width

## Pages Overview

### Home (`/`)
- Hero slider showcasing institution
- About section overview
- Statistics counter
- Featured programs grid (4 programs)
- Upcoming events (3 nearest events)
- Student testimonials
- Call-to-action section

### About (`/about`)
- Institution history and background
- Mission and core values (4 pillars)
- Leadership team profiles with images
- Established legacy information

### Academics (`/academics`)
- All academic programs
- Category filtering (All, Marine, Electrical, Mechanical, Civil)
- Program features section
- Call-to-action to applications

### Facilities (`/facilities`)
- Complete facility listings with images
- Facility categories and descriptions
- Facility highlights section
- Infrastructure showcase

### Events (`/events`)
- Full event calendar
- Category filtering (Academic, Sports, Cultural, Technical)
- Sorted by upcoming dates
- Event details with location

### Gallery (`/gallery`)
- Photo gallery with 6+ images
- Category filtering (Events, Facilities, Training, etc.)
- Hover overlay effects
- Responsive grid layout

### Admissions (`/admissions`)
- 4-step application process
- Eligibility requirements
- Frequently asked questions (expandable)
- Contact CTA

### Contact (`/contact`)
- Contact form with validation
- Contact information cards
- Business hours and location
- Email and phone details

## Animations & Interactions

### Framer Motion Features
- **Scroll Triggers**: Components animate on scroll with `whileInView`
- **Staggered Lists**: Cards animate in sequence with staggerChildren
- **Hover Effects**: Scale and color transitions on hover
- **Page Transitions**: Fade and slide animations on mount

### CSS Enhancements
- Smooth scrolling behavior
- Glassmorphism effects with backdrop blur
- Gradient text support
- Animated gradient backgrounds

## Getting Started

### Installation
```bash
# Clone and install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### Customization

#### Adding New Programs
Edit `lib/data.ts` and add to `mockPrograms` array:
```typescript
{
  id: 'new-id',
  name: 'Program Name',
  description: 'Description',
  duration: '3 Years',
  category: 'Marine', // Mechanical, Electrical, Civil
  icon: 'Anchor', // Icon name from lucide-react
}
```

#### Updating Colors
Edit the CSS variables in `app/globals.css`:
```css
--primary: oklch(0.35 0.15 265); /* Navy */
--secondary: oklch(0.50 0.12 200); /* Teal */
--accent: oklch(0.72 0.20 75); /* Gold */
```

#### Adding Images
1. Generate or upload images to `public/` folder
2. Update image paths in `lib/data.ts`
3. Ensure images are optimized for web

## Future Enhancements

- Backend integration with database for dynamic content
- Student login portal with dashboard
- Online application system
- News blog with CMS integration
- Event registration system
- Testimonial submission form
- Search functionality
- Newsletter subscription

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Intersection Observer for animation triggers
- CSS variables for theming
- Optimized font loading
- Component-based architecture for reusability

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## License

Educational institution portal - All rights reserved by NDAS

---

**Built with v0.app** - AI-powered web development platform
