// NDAS Data Types and Hooks
export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  category: "Mechanical" | "Electrical" | "Marine" | "Civil";
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  location: string;
  category: "Academic" | "Sports" | "Cultural" | "Technical";
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: Date;
  image: string;
  category: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category: "Events" | "Facilities" | "Training" | "Graduation" | "Sports";
  date: Date;
}

// Mock Data
export const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Carpentry & Joinery",
    description:
      "Training in woodwork, furniture making, and structural carpentry techniques",
    duration: "3 Years",
    category: "Construction",
    icon: "Hammer",
  },
  {
    id: "2",
    name: "EF & Motor Rewinding",
    description:
      "Electrical fitting, installation, and rewinding of electric motors and coils",
    duration: "3 Years",
    category: "Electrical",
    icon: "Zap",
  },
  {
    id: "3",
    name: "Motor Drives",
    description:
      "Installation, maintenance, and control of motor drive systems and automation",
    duration: "3 Years",
    category: "Electrical",
    icon: "Settings",
  },
  {
    id: "4",
    name: "Plumbing & Pipe Fittings",
    description:
      "Water systems installation, maintenance, and industrial pipe fitting techniques",
    duration: "3 Years",
    category: "Mechanical",
    icon: "Droplet",
  },
  {
    id: "5",
    name: "Welding & Fabrication",
    description:
      "Metal welding, cutting, and fabrication for industrial and structural applications",
    duration: "3 Years",
    category: "Mechanical",
    icon: "Tool",
  },
];
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Sports Day",
    date: new Date("2024-04-15"),
    description: "Exciting inter-class sports competitions",
    location: "NDAS Grounds",
    category: "Sports",
  },
  {
    id: "2",
    title: "Technical Symposium 2024",
    date: new Date("2024-05-10"),
    description: "Industry experts discuss cutting-edge naval technologies",
    location: "Main Auditorium",
    category: "Technical",
  },
  {
    id: "3",
    title: "Foundation Day Celebration",
    date: new Date("2024-03-20"),
    description: "Celebrating NDAS heritage and achievements",
    location: "Campus",
    category: "Cultural",
  },
  {
    id: "4",
    title: "Advanced Engineering Workshop",
    date: new Date("2024-06-01"),
    description: "Hands-on training in latest engineering practices",
    location: "Workshop Complex",
    category: "Academic",
  },
];

export const mockFacilities: Facility[] = [
  {
    id: "1",
    name: "Ship Simulator Lab",
    description: "State-of-the-art ship bridge simulation facility",
    image: "/placeholder-facility-1.jpg",
    category: "Training",
  },
  {
    id: "2",
    name: "Machine Shop",
    description: "Fully equipped with modern CNC machines",
    image: "/placeholder-facility-2.jpg",
    category: "Equipment",
  },
  {
    id: "3",
    name: "Electrical Lab",
    description: "Advanced electrical systems testing facility",
    image: "/placeholder-facility-3.jpg",
    category: "Training",
  },
  {
    id: "4",
    name: "Library & Resource Center",
    description: "Comprehensive maritime engineering library",
    image: "/placeholder-facility-4.jpg",
    category: "Academic",
  },
];

export const mockGallery: GalleryImage[] = [
  {
    id: "1",
    title: "Training Exercise",
    image: "/placeholder-gallery-1.jpg",
    category: "Training",
    date: new Date("2024-02-15"),
  },
  {
    id: "2",
    title: "Ship Docking",
    image: "/placeholder-gallery-2.jpg",
    category: "Facilities",
    date: new Date("2024-02-20"),
  },
  {
    id: "3",
    title: "Graduation Ceremony",
    image: "/placeholder-gallery-3.jpg",
    category: "Graduation",
    date: new Date("2024-01-10"),
  },
  {
    id: "4",
    title: "Sports Championship",
    image: "/placeholder-gallery-4.jpg",
    category: "Sports",
    date: new Date("2024-02-28"),
  },
  {
    id: "5",
    title: "Engineering Workshop",
    image: "/placeholder-gallery-5.jpg",
    category: "Training",
    date: new Date("2024-03-05"),
  },
  {
    id: "6",
    title: "Marine Operations",
    image: "/placeholder-gallery-6.jpg",
    category: "Training",
    date: new Date("2024-03-12"),
  },
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "NDAS Graduates Achieve Excellence",
    excerpt:
      "Recent batch of NDAS graduates recognized in national maritime competition",
    date: new Date("2024-03-10"),
    image: "/placeholder-news-1.jpg",
    category: "Achievement",
  },
  {
    id: "2",
    title: "New Research Lab Inaugurated",
    excerpt: "State-of-the-art research facility opens for advanced studies",
    date: new Date("2024-03-05"),
    image: "/placeholder-news-2.jpg",
    category: "Facility",
  },
  {
    id: "3",
    title: "Industry Partnership Announcement",
    excerpt:
      "NDAS partners with leading maritime companies for student placements",
    date: new Date("2024-02-28"),
    image: "/placeholder-news-3.jpg",
    category: "Partnership",
  },
];

export const heroSlides = [
  {
    id: "1",
    title: "Excellence in Maritime Education",
    subtitle: "Training Leaders of Tomorrow",
    image: "/placeholder-hero-1.jpg",
  },
  {
    id: "2",
    title: "State-of-the-Art Facilities",
    subtitle: "World-Class Training Infrastructure",
    image: "/placeholder-hero-2.jpg",
  },
  {
    id: "3",
    title: "Industry-Ready Professionals",
    subtitle: "Bridging Education and Innovation",
    image: "/placeholder-hero-3.jpg",
  },
];

export const statistics = [
  { label: "Years of Excellence", value: "75+" },
  { label: "Students Trained", value: "10000+" },
  { label: "Placement Rate", value: "95%" },
  { label: "Industry Partners", value: "50+" },
];

export const teamMembers = [
  {
    name: "Commodore A.K. Singh",
    title: "Commanding Officer",
    image: "/placeholder-co.jpg",
    bio: "Visionary leader with 35 years of naval service",
  },
  {
    name: "Captain R. Sharma",
    title: "Academic Director",
    image: "/placeholder-team-1.jpg",
    bio: "Expert in maritime engineering education",
  },
  {
    name: "Dr. M. Patel",
    title: "Training Commander",
    image: "/placeholder-team-2.jpg",
    bio: "Specializes in advanced technical training",
  },
];
