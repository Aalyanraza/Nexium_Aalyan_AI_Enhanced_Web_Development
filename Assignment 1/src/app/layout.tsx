import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quote Generator",
  description: "A simple app to add and search quotes",
  icons: {
    icon: "/icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-white shadow-sm py-4 px-6 mb-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {/* Logo and App Name */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/icon.jpeg"
                alt="Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-xl font-bold tracking-tight text-gray-800">
                QuoteCraft
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex space-x-6 text-sm font-medium">
              <Link href="/" className="text-gray-700 hover:text-primary transition">
                Dashboard
              </Link>
              <Link href="/add" className="text-gray-700 hover:text-primary transition">
                Add Quote
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-primary transition">
                Search Quote
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
