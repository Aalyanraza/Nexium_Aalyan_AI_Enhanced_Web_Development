import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Wizard",
  description: "AI-powered blog summarizer made for Nexium.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen`}
      >
        {/* Header/Nav */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            {/* Floating logo/title */}
            <div className="text-2xl text-center font-bold text-black animate-float-x">
              🧠 Blog Wizard
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t text-sm text-gray-700 py-6 px-4">
          <div className="max-w-4xl mx-auto space-y-4 text-center">
            <p>⚙️ Developed by <strong>Syed Aalyan Raza Kazmi</strong></p>
            <p>🔗 Made for <strong>Nexium</strong></p>

            <div>
              <h4 className="font-bold text-lg text-center">⚠️ Known Limitations:</h4>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-center">
                <li>
                  <strong>403 errors</strong> on sites like LinkedIn/OpenAI due to bot protection
                  (e.g., Cloudflare headers).
                </li>
                <li>
                  <strong>Limited Urdu vocabulary</strong> — translation via Google Translate may lack context accuracy.
                </li>
                <li>
                  <strong>Scraping reliability</strong> — dynamic websites or JS-heavy pages may not return clean content.
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
