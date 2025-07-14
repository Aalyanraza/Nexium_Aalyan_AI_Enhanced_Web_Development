"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-[url('/background.jpg')] bg-cover filter blur-[2px] opacity-30 z-0"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        
        {/* Highlighted & Animated Title */}
        <div className="relative px-10 pt-6 pb-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
          <h1 className="text-7xl font-extrabold text-center text-white drop-shadow-lg leading-tight">
            <span className="relative inline-flex items-center gap-4">
              <span className="text-5xl animate-bounce opacity-90 drop-shadow-md">📖</span>
              <span className="bg-gradient-to-r from-blue-950 via-teal-500 to-green-800 bg-clip-text text-transparent 
                              animate-gradient-shift bg-[length:200%_auto]">
                BlogWizard
              </span>
            </span>
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-10">
          <Link href="/summarize">
            <Button className="shadow-lg hover:shadow-xl transition-shadow text-2xl px-6 py-5 hover:scale-115">
              Summarize
            </Button>
          </Link>
          <Link href="/translate">
            <Button className="shadow-xl hover:shadow-xl transition-shadow text-2xl px-6 py-5 hover:scale-115">
              Translate
            </Button>
          </Link>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
          <ReviewCard 
            name="Sarah K." 
            text="This saved me hours of research!" 
            rating="★★★★★" 
          />
          <ReviewCard 
            name="Mohammed R." 
            text="The Urdu translations are flawless." 
            rating="★★★★☆" 
          />
          <ReviewCard 
            name="Emma L." 
            text="Summaries capture key points perfectly." 
            rating="★★★★★" 
          />
        </div>
      </div>
    </div>
  );
}

// Review Card Component
function ReviewCard({ name, text, rating }: { name: string; text: string; rating: string }) {
  return (
    <div className="review-card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-hard border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{name}</h3>
        <span className="text-yellow-500">{rating}</span>
      </div>
      <p className="mt-3 text-gray-600">{text}</p>
    </div>
  );
}
