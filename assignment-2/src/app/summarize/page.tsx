"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function SummarizePage() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUrdu, setShowUrdu] = useState(false);

  // ✅ Basic English-to-Urdu dictionary
  const dictionary: Record<string, string> = {
    "cancer": "کینسر",
    "death": "موت",
    "preventable": "روکنے کے قابل",
    "people": "لوگ",
    "brother": "بھائی",
    "mawa": "ماوا",
    "still": "ابھی تک",
    "kill": "مارنا",
    "government": "حکومت",
    "smoking": "تمباکو نوشی",
    "disease": "بیماری",
    "health": "صحت",
    "pakistan": "پاکستان",
    "children": "بچے",
    "parents": "والدین",
    // ➕ Add more words as needed
  };

  const translateToUrdu = (text: string): string => {
    return text
      .split(" ")
      .map((word) => dictionary[word.toLowerCase()] || word)
      .join(" ");
  };

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setSummary(null);

    try {
      const response = await fetch("/api/scrape-and-summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok || !data.summary) {
        throw new Error("Failed to fetch or summarize content.");
      }

      setSummary(data.summary);
    } catch (err) {
      setError("Failed to summarize blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-[url('/background.jpg')] bg-cover filter blur-[2px] opacity-30 z-0"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md space-y-4 shadow-lg p-6 rounded-lg bg-white/90 backdrop-blur">
        <h1 className="text-4xl font-bold text-center">Summarize a Blog</h1>

        <Input
          placeholder="Enter blog URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="shadow-inner"
        />
        <Button
          onClick={handleSummarize}
          className="w-full shadow-md"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Summary Card */}
      {summary && (
        <div className="relative z-10 max-w-2xl p-6 mt-6 bg-white/90 shadow-md rounded-lg border backdrop-blur transform transition duration-300 hover:scale-105 hover:shadow-lg">
          {/* Urdu Toggle */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <label className="text-sm text-gray-600">Urdu</label>
            <Switch checked={showUrdu} onCheckedChange={setShowUrdu} />
          </div>

          <h2 className="text-xl font-semibold mb-2">Summary:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {(showUrdu ? summary.map(translateToUrdu) : summary).map(
              (point, index) => (
                <li key={index}>{point}</li>
              )
            )}
          </ul>
        </div>
      )}

      <Link href="/">
        <Button variant="ghost" className="relative z-10 shadow-sm bg-white/100">
          ← Back to Home
        </Button>
      </Link>
    </div>
  );
}
