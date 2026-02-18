import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import connectToDatabase from "@/lib/mongodb";
import { Category, ICategory } from "@/database";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Tea: Australia Online Tea Shop | Chinese Tea Culture",
  description:
    "Our passion is, base on the classical foundation, to source quality, organic teas, to promote elegant and practical tea culture, for your overall enjoyment.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://true-tea.com.au",
  ),
  openGraph: {
    type: "website",
    siteName: "True Tea",
    title: "True Tea: Australia Online Tea Shop | Chinese Tea Culture",
    description:
      "Sourcing authentic, premium Chinese teas directly from the origin. Explore our curated collections of quality, organic teas.",
    url: "/",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "True Tea: Australia Online Tea Shop | Chinese Tea Culture",
    description:
      "Sourcing authentic, premium Chinese teas directly from the origin. Explore our curated collections of quality, organic teas.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDatabase();
  const categories = (await Category.find({ active: true })
    .sort({
      catID: 1,
    })
    .lean()) as ICategory[];

  const serializedCategories = JSON.parse(JSON.stringify(categories));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} bg-teal-50 ${geistMono.variable} antialiased overflow-x-hidden min-h-screen flex flex-col`}
      >
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:bg-emerald-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Toaster position="top-center" />
        <Providers>
          <Navbar categories={serializedCategories} />
          <main id="main-content" className="grow" role="main">
            {children}
          </main>
          <Footer
            email={process.env.NEXT_PUBLIC_EMAIL_TO || "info@true-tea.com.au"}
          />
        </Providers>
      </body>
    </html>
  );
}
