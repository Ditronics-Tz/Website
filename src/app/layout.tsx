import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ditronics — Optimize Your Tech",
  description:
    "Enterprise-grade tech solutions. OS downgrades, custom builds, and hardware support you can trust.",
  keywords: [
    "IT services",
    "OS downgrade",
    "custom PC builds",
    "enterprise hardware",
    "tech support",
  ],
  icons: {
    icon: "/DITRONICS-COMPANY-LOGO.png",
    shortcut: "/DITRONICS-COMPANY-LOGO.png",
    apple: "/DITRONICS-COMPANY-LOGO.png",
  },
  openGraph: {
    title: "Ditronics — Optimize Your Tech",
    description:
      "Enterprise-grade tech solutions. OS downgrades, custom builds, and hardware support you can trust.",
    type: "website",
    locale: "en_US",
    siteName: "Ditronics",
    images: ["/DITRONICS-COMPANY-LOGO.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ditronics — Optimize Your Tech",
    description:
      "Enterprise-grade tech solutions. OS downgrades, custom builds, and hardware support you can trust.",
    images: ["/DITRONICS-COMPANY-LOGO.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-white text-[var(--neutral-text)]`}>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
