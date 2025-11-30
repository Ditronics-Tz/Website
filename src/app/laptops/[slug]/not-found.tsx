import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Laptop, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Laptop size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-[var(--anchor-dark)] mb-4">Laptop Not Found</h1>
        <p className="text-[var(--neutral-text)] mb-8 max-w-md mx-auto">
          The laptop you&apos;re looking for doesn&apos;t exist or may have been removed from our catalog.
        </p>
        <Button variant="primary" asChild>
          <Link href="/laptops">
            <ArrowLeft size={18} className="mr-2" />
            Browse All Laptops
          </Link>
        </Button>
      </div>
    </div>
  );
}
