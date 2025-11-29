import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Testimonials } from "@/components/Testimonials";
import { LaptopCard } from "@/components/LaptopCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  sampleServices,
  sampleLaptops,
  sampleTestimonials,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesGrid services={sampleServices} />

      {/* Featured Laptops Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Laptops</h2>
            <p className="text-lg text-[var(--neutral-text)] max-w-2xl mx-auto">
              Explore our curated selection of enterprise-ready laptops, each
              configured for optimal performance and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleLaptops.slice(0, 3).map((laptop, index) => (
              <LaptopCard key={laptop.id} laptop={laptop} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/laptops">
                View All Laptops
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials testimonials={sampleTestimonials} />

      {/* CTA Section */}
      <section className="py-20 bg-[var(--anchor-dark)]">
        <div className="container text-center">
          <h2 className="text-white mb-4">Ready to Optimize Your Tech?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Join 500+ businesses that trust Ditronics for their IT needs. Get
            started today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                Get Started
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--anchor-dark)]"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
