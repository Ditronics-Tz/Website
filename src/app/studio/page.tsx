import { ProjectCard } from "@/components/ProjectCard";
import { sampleProjects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — Ditronics",
  description:
    "Explore our portfolio of successful enterprise projects. From migrations to custom builds, see how we've helped businesses transform their tech.",
};

export default function StudioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--off-white)] to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Our Studio</h1>
            <p className="text-xl text-[var(--neutral-text)] mb-8">
              Explore our portfolio of successful enterprise projects. From
              large-scale migrations to custom hardware solutions, see how
              we&apos;ve helped businesses transform their technology.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {sampleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--off-white)]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "150+", label: "Projects Completed" },
              { value: "500+", label: "Happy Clients" },
              { value: "$2M+", label: "Client Savings" },
              { value: "98%", label: "Client Retention" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-[var(--vermilion)] mb-2">
                  {stat.value}
                </p>
                <p className="text-[var(--neutral-text)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Have a Project in Mind?</h2>
            <p className="text-lg text-[var(--neutral-text)] mb-8">
              Let&apos;s discuss how we can help transform your technology
              infrastructure and achieve your business goals.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                Start a Project
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
