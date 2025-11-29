import type { Service } from "@/components/ServicesGrid";
import type { Project } from "@/components/ProjectCard";
import type { Laptop } from "@/components/LaptopCard";
import type { Testimonial } from "@/components/Testimonials";

// Sample Services Data
export const sampleServices: Service[] = [
  {
    id: "os-downgrade",
    title: "OS Downgrades & Legacy Support",
    description:
      "Safe, compliant downgrades for legacy apps—zero data loss guaranteed. Perfect for businesses with specific software requirements.",
    icon: "monitor",
    priceTier: "Enterprise",
    features: [
      "Windows 10/11 to Windows 7/8 downgrades",
      "Linux distribution migrations",
      "Data preservation guarantee",
      "Compliance documentation",
      "24/7 technical support",
    ],
  },
  {
    id: "custom-builds",
    title: "Custom PC Builds",
    description:
      "Tailored hardware configurations optimized for your specific workloads. From workstations to server clusters.",
    icon: "cpu",
    priceTier: "Pro",
    features: [
      "Component selection & sourcing",
      "Performance optimization",
      "Thermal management",
      "Cable management",
      "1-year hardware warranty",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    description:
      "Scalable IT infrastructure designed for growing businesses. Reduce TCO while improving reliability.",
    icon: "database",
    priceTier: "Enterprise",
    features: [
      "Infrastructure assessment",
      "Migration planning",
      "Implementation & deployment",
      "Staff training",
      "Ongoing support",
    ],
  },
  {
    id: "security",
    title: "Security & Compliance",
    description:
      "Protect your business with enterprise-grade security solutions and compliance frameworks.",
    icon: "shield",
    priceTier: "Pro",
    features: [
      "Security audits",
      "Compliance assessments",
      "Data encryption",
      "Access control",
      "Incident response",
    ],
  },
  {
    id: "support",
    title: "Tech Support & Maintenance",
    description:
      "Round-the-clock technical support to keep your systems running smoothly. Minimize downtime, maximize productivity.",
    icon: "headphones",
    priceTier: "Starter",
    features: [
      "24/7 helpdesk",
      "Remote troubleshooting",
      "On-site support",
      "Preventive maintenance",
      "Performance monitoring",
    ],
  },
  {
    id: "consulting",
    title: "IT Consulting",
    description:
      "Strategic technology consulting to align your IT investments with business goals.",
    icon: "settings",
    priceTier: "Pro",
    features: [
      "Technology roadmapping",
      "Vendor evaluation",
      "Budget optimization",
      "Digital transformation",
      "Process automation",
    ],
  },
];

// Sample Projects Data
export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Enterprise Desktop Migration",
    slug: "enterprise-migration",
    client: "FinCo",
    date: "2024",
    coverImage: "",
    stack: ["Windows 10", "SCCM", "PowerShell", "Azure AD"],
    outcome: "Reduced incidents by 42%",
    excerpt:
      "Migrated 2000 desktops to a stable custom image, implementing zero-touch deployment and reducing support incidents by 42%.",
  },
  {
    id: "2",
    title: "Data Center Modernization",
    slug: "data-center-modernization",
    client: "TechStart Inc",
    date: "2024",
    coverImage: "",
    stack: ["VMware", "Kubernetes", "Terraform", "AWS"],
    outcome: "60% cost reduction",
    excerpt:
      "Modernized legacy data center infrastructure with cloud-native solutions, achieving 60% reduction in operational costs.",
  },
  {
    id: "3",
    title: "Security Compliance Overhaul",
    slug: "security-compliance",
    client: "HealthNet",
    date: "2023",
    coverImage: "",
    stack: ["ISO 27001", "HIPAA", "SOC 2", "Encryption"],
    outcome: "100% compliance achieved",
    excerpt:
      "Implemented comprehensive security framework to achieve HIPAA and SOC 2 compliance for healthcare provider.",
  },
  {
    id: "4",
    title: "Custom Workstation Fleet",
    slug: "workstation-fleet",
    client: "CreativeStudio",
    date: "2023",
    coverImage: "",
    stack: ["AMD Threadripper", "RTX 4090", "Linux", "Custom Cooling"],
    outcome: "3x render performance",
    excerpt:
      "Designed and deployed 50 custom workstations for 3D rendering, achieving 3x performance improvement over previous hardware.",
  },
];

// Sample Laptops Data
export const sampleLaptops: Laptop[] = [
  {
    id: "1",
    name: "Dell XPS 15 (Custom)",
    slug: "dell-xps-15-custom",
    price: 1699,
    currency: "USD",
    specs: {
      cpu: "Intel i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB NVMe",
      gpu: "RTX 4060",
      os: "Windows 11 Pro / Custom Linux",
    },
    images: [],
    stockStatus: "In Stock",
    notes: "Optimized for development and creative work",
  },
  {
    id: "2",
    name: "ThinkPad X1 Carbon Gen 11",
    slug: "thinkpad-x1-carbon-gen11",
    price: 1549,
    currency: "USD",
    specs: {
      cpu: "Intel i7-1365U",
      ram: "16GB DDR5",
      storage: "512GB NVMe",
      gpu: "Intel Iris Xe",
      os: "Windows 11 Pro",
    },
    images: [],
    stockStatus: "In Stock",
    notes: "Enterprise-ready with enhanced security features",
  },
  {
    id: "3",
    name: "MacBook Pro 14\" M3 Pro",
    slug: "macbook-pro-14-m3-pro",
    price: 2499,
    currency: "USD",
    specs: {
      cpu: "Apple M3 Pro",
      ram: "18GB Unified",
      storage: "512GB SSD",
      gpu: "14-core GPU",
      os: "macOS Sonoma",
    },
    images: [],
    stockStatus: "Limited",
    notes: "Best-in-class performance for creative professionals",
  },
  {
    id: "4",
    name: "HP ZBook Studio G10",
    slug: "hp-zbook-studio-g10",
    price: 2199,
    currency: "USD",
    specs: {
      cpu: "Intel i9-13900H",
      ram: "64GB DDR5",
      storage: "2TB NVMe",
      gpu: "RTX 4070",
      os: "Windows 11 Pro for Workstations",
    },
    images: [],
    stockStatus: "In Stock",
    notes: "Professional mobile workstation for demanding tasks",
  },
  {
    id: "5",
    name: "Framework Laptop 16",
    slug: "framework-laptop-16",
    price: 1399,
    currency: "USD",
    specs: {
      cpu: "AMD Ryzen 7 7840HS",
      ram: "32GB DDR5",
      storage: "1TB NVMe",
      gpu: "AMD Radeon 780M",
      os: "Windows 11 / Linux",
    },
    images: [],
    stockStatus: "Limited",
    notes: "Fully upgradeable and repairable",
  },
  {
    id: "6",
    name: "ASUS ROG Zephyrus G14",
    slug: "asus-rog-zephyrus-g14",
    price: 1799,
    currency: "USD",
    specs: {
      cpu: "AMD Ryzen 9 7940HS",
      ram: "16GB DDR5",
      storage: "1TB NVMe",
      gpu: "RTX 4060",
      os: "Windows 11 Home",
    },
    images: [],
    stockStatus: "Out of Stock",
    notes: "Gaming laptop with premium build quality",
  },
];

// Sample Testimonials Data
export const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Ditronics transformed our IT infrastructure. The OS migration was seamless, and our legacy applications run better than ever.",
    author: "Sarah Chen",
    title: "CTO, FinCo",
    metrics: "42% fewer incidents",
  },
  {
    id: "2",
    quote:
      "Their custom workstations have revolutionized our rendering pipeline. What used to take hours now takes minutes.",
    author: "Michael Rodriguez",
    title: "Creative Director, CreativeStudio",
    metrics: "3x faster renders",
  },
  {
    id: "3",
    quote:
      "The team's expertise in compliance helped us pass our HIPAA audit with flying colors. Highly recommend their security services.",
    author: "Dr. Emily Watson",
    title: "CEO, HealthNet",
    metrics: "100% compliance",
  },
];
