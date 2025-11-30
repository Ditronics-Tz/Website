import { getLaptopBySlug, getAllLaptops } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LaptopDetailClient } from "./LaptopDetailClient";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const laptop = getLaptopBySlug(slug);
  
  if (!laptop) {
    return {
      title: "Laptop Not Found — Ditronics",
    };
  }

  return {
    title: `${laptop.name} — Ditronics`,
    description: laptop.description || `${laptop.name} - ${laptop.cpu}, ${laptop.ram}, ${laptop.storage}. Available at Ditronics.`,
  };
}

export default async function LaptopDetailPage({ params }: Props) {
  const { slug } = await params;
  const laptop = getLaptopBySlug(slug);

  if (!laptop) {
    notFound();
  }

  // Get related laptops (same brand or similar price range)
  const allLaptops = getAllLaptops();
  const relatedLaptops = allLaptops
    .filter(l => l.id !== laptop.id)
    .filter(l => 
      l.brand === laptop.brand || 
      (l.price >= laptop.price * 0.7 && l.price <= laptop.price * 1.3)
    )
    .slice(0, 3);

  return <LaptopDetailClient laptop={laptop} relatedLaptops={relatedLaptops} />;
}
