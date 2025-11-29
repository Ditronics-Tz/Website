import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { samplePricingTiers } from "@/lib/data";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Ditronics",
  description:
    "Transparent pricing for IT services. Choose from Starter, Pro, or Enterprise plans to fit your business needs.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--off-white)] to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-[var(--neutral-text)]">
              Choose the plan that fits your business. All plans include our
              core features with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {samplePricingTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`relative ${
                  tier.highlighted
                    ? "border-2 border-[var(--vermilion)] shadow-lg"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <Badge
                    variant="default"
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg font-semibold">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[var(--anchor-dark)]">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--neutral-text)] mt-2">
                    {tier.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          size={18}
                          className="text-[var(--teal-green)] flex-shrink-0 mt-0.5"
                        />
                        <span className="text-[var(--neutral-text)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className="w-full"
                    asChild
                  >
                    <Link href={tier.cta.href}>
                      {tier.cta.label}
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--off-white)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I switch plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No, there are no setup fees for any of our plans. You only pay the monthly subscription.",
                },
                {
                  q: "What's included in the Enterprise plan?",
                  a: "Enterprise plans are customized to your specific needs. Contact our sales team for a tailored quote.",
                },
                {
                  q: "Do you offer discounts for annual billing?",
                  a: "Yes, we offer a 15% discount when you pay annually. Contact us for details.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                >
                  <h3 className="font-semibold text-[var(--anchor-dark)] mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-[var(--neutral-text)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--anchor-dark)]">
        <div className="container text-center">
          <h2 className="text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Our enterprise team can create a tailored plan that fits your
            specific requirements and budget.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact?plan=enterprise">
              Contact Sales
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
