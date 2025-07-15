import { NextResponse } from "next/server";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log("Received URL:", url);

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      throw new Error("Could not extract main content.");
    }

    const cleanedText = article.textContent
      .replace(/\s+/g, " ")
      .replace(/[\r\n]+/g, " ")
      .trim();

    const summarySentences = cleanedText
      .split(/[.!?]\s/)
      .filter((s) => s.length > 40)
      .slice(0, 3);

    const summary = summarySentences.join(". ");

    // ✅ Save to Supabase
    const { error } = await supabase.from("summaries").insert([{ url, summary }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: "Failed to save summary to Supabase." }, { status: 500 });
    }

    return NextResponse.json({ summary: summarySentences });
  } catch (error: any) {
    console.error("Server Error:", error.message);
    return NextResponse.json(
      { error: "Failed to scrape and summarize the URL." },
      { status: 500 }
    );
  }
}
