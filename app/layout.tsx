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
        <Toaster position="top-center" />
        <Providers>
          <Navbar categories={serializedCategories} />
          <main className="grow">{children}</main>
          <Footer
            email={process.env.NEXT_PUBLIC_EMAIL_TO || "info@true-tea.com.au"}
          />
        </Providers>
      </body>
    </html>
  );
}
