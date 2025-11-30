"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Laptop } from "@/lib/db";
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Battery,
  Gpu,
  ArrowLeft,
  Phone,
  MessageCircle,
  CheckCircle,
  Wifi,
  Bluetooth,
  Camera,
  Keyboard,
  Weight,
  Ruler,
  Palette,
  Shield,
  Package,
  Tag,
} from "lucide-react";

interface LaptopDetailClientProps {
  laptop: Laptop;
  relatedLaptops: Laptop[];
}

const stockStatusVariant: Record<string, "success" | "warning" | "muted"> = {
  "In Stock": "success",
  Limited: "warning",
  "Out of Stock": "muted",
};

export function LaptopDetailClient({ laptop, relatedLaptops }: LaptopDetailClientProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${laptop.name} listed at ${formatPrice(laptop.price, laptop.currency)}. Is it still available?`
  );

  const specs = [
    { icon: Cpu, label: "Processor", value: laptop.cpu },
    { icon: MemoryStick, label: "RAM", value: laptop.ram },
    { icon: HardDrive, label: "Storage", value: laptop.storage },
    { icon: Gpu, label: "Graphics", value: laptop.gpu },
    { icon: Monitor, label: "Display", value: laptop.display },
    { icon: Battery, label: "Battery", value: laptop.battery },
  ].filter(spec => spec.value);

  const additionalSpecs = [
    { icon: Package, label: "Brand", value: laptop.brand },
    { icon: Tag, label: "Model", value: laptop.model_number },
    { icon: Monitor, label: "Operating System", value: laptop.os },
    { icon: Camera, label: "Webcam", value: laptop.webcam },
    { icon: Keyboard, label: "Keyboard", value: laptop.keyboard },
    { icon: Wifi, label: "WiFi", value: laptop.wifi },
    { icon: Bluetooth, label: "Bluetooth", value: laptop.bluetooth },
    { icon: Weight, label: "Weight", value: laptop.weight },
    { icon: Ruler, label: "Dimensions", value: laptop.dimensions },
    { icon: Palette, label: "Color", value: laptop.color },
    { icon: Shield, label: "Warranty", value: laptop.warranty },
  ].filter(spec => spec.value);

  const ports = laptop.ports ? laptop.ports.split(',').map(p => p.trim()) : [];

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-4 bg-[var(--off-white)] border-b border-gray-200">
        <div className="container">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[var(--neutral-text)] hover:text-[var(--vermilion)]">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/laptops" className="text-[var(--neutral-text)] hover:text-[var(--vermilion)]">
              Laptops
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[var(--anchor-dark)] font-medium">{laptop.name}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container">
          <Link 
            href="/laptops"
            className="inline-flex items-center gap-2 text-[var(--neutral-text)] hover:text-[var(--vermilion)] mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Laptops
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                {laptop.image ? (
                  <Image
                    src={laptop.image}
                    alt={laptop.name}
                    fill
                    className="object-contain p-8"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Monitor size={120} className="text-gray-300" />
                  </div>
                )}
                <Badge
                  variant={stockStatusVariant[laptop.stock_status]}
                  className="absolute top-6 right-6 text-base px-4 py-2"
                >
                  {laptop.stock_status}
                </Badge>
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Title & Condition */}
              <div className="mb-6">
                {laptop.brand && (
                  <span className="text-sm text-[var(--vermilion)] font-medium uppercase tracking-wider">
                    {laptop.brand}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--anchor-dark)] mt-1 mb-3">
                  {laptop.name}
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {laptop.condition}
                </Badge>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-4xl font-bold text-[var(--vermilion)]">
                  {formatPrice(laptop.price, laptop.currency)}
                </p>
                <p className="text-sm text-[var(--neutral-text)] mt-1">
                  Price inclusive of all taxes
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {specs.map((spec, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-[var(--off-white)] rounded-lg">
                    <spec.icon size={20} className="text-[var(--vermilion)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--neutral-text)] uppercase tracking-wider">{spec.label}</p>
                      <p className="text-sm font-medium text-[var(--anchor-dark)]">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              {laptop.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[var(--anchor-dark)] mb-3">Description</h3>
                  <p className="text-[var(--neutral-text)] leading-relaxed">{laptop.description}</p>
                </div>
              )}

              {/* Notes */}
              {laptop.notes && (
                <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">{laptop.notes}</p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="flex-1" asChild>
                  <a 
                    href={`https://wa.me/255123456789?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    WhatsApp Inquiry
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="flex-1" asChild>
                  <a href="tel:+255123456789">
                    <Phone size={20} className="mr-2" />
                    Call Us
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
                  <CheckCircle size={16} className="text-[var(--teal-green)]" />
                  Quality Assured
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
                  <CheckCircle size={16} className="text-[var(--teal-green)]" />
                  Genuine Products
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
                  <CheckCircle size={16} className="text-[var(--teal-green)]" />
                  Technical Support
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      {(additionalSpecs.length > 0 || ports.length > 0) && (
        <section className="py-12 bg-[var(--off-white)]">
          <div className="container">
            <h2 className="text-2xl font-bold text-[var(--anchor-dark)] mb-8">Full Specifications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Core Specs Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--anchor-dark)] mb-4 flex items-center gap-2">
                    <Cpu size={20} className="text-[var(--vermilion)]" />
                    Performance
                  </h3>
                  <div className="space-y-3">
                    {laptop.cpu && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Processor</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.cpu}</span>
                      </div>
                    )}
                    {laptop.ram && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Memory</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.ram}</span>
                      </div>
                    )}
                    {laptop.storage && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Storage</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.storage}</span>
                      </div>
                    )}
                    {laptop.gpu && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Graphics</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.gpu}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Display Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--anchor-dark)] mb-4 flex items-center gap-2">
                    <Monitor size={20} className="text-[var(--vermilion)]" />
                    Display & Design
                  </h3>
                  <div className="space-y-3">
                    {laptop.display && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Screen</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.display}</span>
                      </div>
                    )}
                    {laptop.color && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Color</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.color}</span>
                      </div>
                    )}
                    {laptop.weight && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Weight</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.weight}</span>
                      </div>
                    )}
                    {laptop.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Dimensions</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.dimensions}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Connectivity Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--anchor-dark)] mb-4 flex items-center gap-2">
                    <Wifi size={20} className="text-[var(--vermilion)]" />
                    Connectivity
                  </h3>
                  <div className="space-y-3">
                    {laptop.wifi && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">WiFi</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.wifi}</span>
                      </div>
                    )}
                    {laptop.bluetooth && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Bluetooth</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.bluetooth}</span>
                      </div>
                    )}
                    {laptop.webcam && (
                      <div className="flex justify-between">
                        <span className="text-[var(--neutral-text)]">Webcam</span>
                        <span className="font-medium text-[var(--anchor-dark)]">{laptop.webcam}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              {additionalSpecs.filter(s => !['brand', 'model_number', 'os', 'webcam', 'wifi', 'bluetooth', 'weight', 'dimensions', 'color'].includes(s.label.toLowerCase())).length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[var(--anchor-dark)] mb-4 flex items-center gap-2">
                      <Package size={20} className="text-[var(--vermilion)]" />
                      Additional Info
                    </h3>
                    <div className="space-y-3">
                      {laptop.os && (
                        <div className="flex justify-between">
                          <span className="text-[var(--neutral-text)]">OS</span>
                          <span className="font-medium text-[var(--anchor-dark)]">{laptop.os}</span>
                        </div>
                      )}
                      {laptop.keyboard && (
                        <div className="flex justify-between">
                          <span className="text-[var(--neutral-text)]">Keyboard</span>
                          <span className="font-medium text-[var(--anchor-dark)]">{laptop.keyboard}</span>
                        </div>
                      )}
                      {laptop.battery && (
                        <div className="flex justify-between">
                          <span className="text-[var(--neutral-text)]">Battery</span>
                          <span className="font-medium text-[var(--anchor-dark)]">{laptop.battery}</span>
                        </div>
                      )}
                      {laptop.warranty && (
                        <div className="flex justify-between">
                          <span className="text-[var(--neutral-text)]">Warranty</span>
                          <span className="font-medium text-[var(--anchor-dark)]">{laptop.warranty}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Ports */}
              {ports.length > 0 && (
                <Card className="md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[var(--anchor-dark)] mb-4">Ports & Slots</h3>
                    <div className="flex flex-wrap gap-2">
                      {ports.map((port, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {port}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Laptops */}
      {relatedLaptops.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold text-[var(--anchor-dark)] mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedLaptops.map((related) => (
                <Link key={related.id} href={`/laptops/${related.slug}`}>
                  <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[4/3] bg-gray-50">
                      {related.image ? (
                        <Image
                          src={related.image}
                          alt={related.name}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Monitor size={48} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[var(--anchor-dark)] group-hover:text-[var(--vermilion)] transition-colors mb-2">
                        {related.name}
                      </h3>
                      <p className="text-lg font-bold text-[var(--vermilion)]">
                        {formatPrice(related.price, related.currency)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-16 bg-[var(--anchor-dark)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Interested in this laptop?</h2>
            <p className="text-gray-300 mb-8">
              Contact us today to check availability, ask questions, or place your order.
              We offer competitive pricing and excellent after-sales support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <a 
                  href={`https://wa.me/255123456789?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-[var(--anchor-dark)]" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
