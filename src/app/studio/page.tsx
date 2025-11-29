import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Video, Palette, Monitor } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ditronics Studios — Video, Film and Digital Contents Production",
  description:
    "Professional video production, film production, graphics design, motion graphics, live streaming, and digital content creation services.",
};

const videoProductionServices = [
  "Wedding Ceremony (Engagement, Pre-wedding, Kitchen party, Send-off, Wedding documentary)",
  "Film Production",
  "Business/Brand Documentary",
  "Commercial Advertisements",
  "Family Documentary",
  "Documentary Films",
  "Corporate Events",
  "Drone Footages",
  "Interview",
];

const graphicsDesignServices = [
  "Business Cards & ID Cards",
  "Calendars & Stickers",
  "Pull-ups & Brochures",
  "Logo Design",
  "Flyers & Banners",
];

const digitalBrandingServices = [
  "Social Media Management",
  "Website Development",
  "Applications",
  "Digital Contents",
  "Live Streaming Services",
  "Motion Graphics Production",
  "Animation Production",
  "Photoshooting",
];

export default function StudioPage() {
  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative py-20 bg-gradient-to-b from-[var(--off-white)] to-white overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="mb-6">Ditronics Studios</h1>
            <p className="text-xl text-[var(--vermilion)] font-semibold mb-4">
              Video, Film and Digital Contents Production
            </p>
            <p className="text-lg text-[var(--neutral-text)]">
              Bring your brand to life with professional video production,
              stunning graphics design, motion graphics, and live streaming
              services. We create content that captivates and converts.
            </p>
          </div>
          
          {/* Studio Brochure Image */}
          <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/DITRONICS-STUDIOS-DOOR-GRAPHICS-PREVIEW.jpg.jpeg"
              alt="Ditronics Studios - Video, Film and Digital Contents Production"
              width={1000}
              height={700}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section - 3 Columns */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Services</h2>
            <p className="text-lg text-[var(--neutral-text)] max-w-2xl mx-auto">
              Comprehensive creative services to elevate your brand and engage your audience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Video Production */}
            <div className="bg-[var(--off-white)] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center">
                  <Video size={24} className="text-[var(--vermilion)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--anchor-dark)]">Video Production</h3>
              </div>
              <ul className="space-y-3">
                {videoProductionServices.map((service) => (
                  <li key={service} className="text-sm text-[var(--neutral-text)] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--vermilion)] mt-1.5 flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Graphics Designing */}
            <div className="bg-[var(--off-white)] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center">
                  <Palette size={24} className="text-[var(--vermilion)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--anchor-dark)]">Graphics Designing</h3>
              </div>
              <ul className="space-y-3">
                {graphicsDesignServices.map((service) => (
                  <li key={service} className="text-sm text-[var(--neutral-text)] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--vermilion)] mt-1.5 flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Digital Branding */}
            <div className="bg-[var(--off-white)] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center">
                  <Monitor size={24} className="text-[var(--vermilion)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--anchor-dark)]">Digital Branding</h3>
              </div>
              <ul className="space-y-3">
                {digitalBrandingServices.map((service) => (
                  <li key={service} className="text-sm text-[var(--neutral-text)] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--vermilion)] mt-1.5 flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--anchor-dark)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-4">Ready to Create Something Amazing?</h2>
            <p className="text-lg text-gray-400 mb-8">
              Let&apos;s discuss your project and bring your creative vision to life.
              From video production to brand design, we&apos;re here to help.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
