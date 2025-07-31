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
  title: "Resume Tailor - AI-Powered Resume Builder",
  description: "Create personalized resumes that stand out. Our AI-powered platform helps you craft the perfect resume for every job application.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
       {children}
       <footer className="bg-gray-900 text-white py-4">
         <div className="max-w-7xl mx-auto px-6 text-center">
           <p className="text-sm">
             Created by <span className="font-semibold">Aalyan Raza</span> for{' '}
             <span className="font-semibold">Nexium</span>
           </p>
         </div>
       </footer>
     </body>
   </html>
 );
}
