import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    icon: "/icon.jpeg", // or .png, .svg etc
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 bg-gray-100 shadow mb-4">
          <nav className="max-w-4xl mx-auto flex space-x-6">
            <Link href="/" className="font-semibold text-black">Dashboard</Link>
            <Link href="/add" className="font-semibold text-black">Add Quote</Link>
            <Link href="/search" className="font-semibold text-black">Search Quote</Link>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
