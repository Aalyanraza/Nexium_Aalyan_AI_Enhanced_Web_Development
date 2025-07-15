import { NextResponse } from "next/server";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log("Scraping URL:", url);

    // Fetch HTML content
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    // Extract main readable content
    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return NextResponse.json(
        { error: "Could not extract main content." },
        { status: 400 }
      );
    }

    const cleanedText = article.textContent
      .replace(/\s+/g, " ")
      .replace(/[\r\n]+/g, " ")
      .trim();

    return NextResponse.json({ content: cleanedText });
  } catch (error: any) {
    console.error("Scraping Error:", error.message);
    return NextResponse.json(
      { error: "Failed to scrape the URL." },
      { status: 500 }
    );
  }
}
