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
  // Basic vocabulary
  "the": "کی",
  "and": "اور",
  "that": "کہ",
  "have": "ہے",
  "for": "کے لیے",
  "not": "نہیں",
  "with": "کے ساتھ",
  "this": "یہ",
  "they": "وہ",
  "will": "گا",

  // Common verbs
  "be": "ہونا",
  "do": "کرنا",
  "say": "کہنا",
  "get": "حاصل کرنا",
  "make": "بنانا",
  "go": "جانا",
  "see": "دیکھنا",
  "know": "جاننا",
  "take": "لینا",
  "think": "سوچنا",
  "come": "آنا",
  "give": "دینا",
  "look": "دیکھو",
  "use": "استعمال کرنا",
  "find": "تلاش کرنا",
  "tell": "بتانا",
  "ask": "پوچھنا",
  "work": "کام",
  "seem": "لگنا",
  "feel": "محسوس کرنا",
  "try": "کوشش کرنا",
  "leave": "چھوڑنا",
  "call": "بلانا",

  // Common nouns
  "time": "وقت",
  "year": "سال",
  "day": "دن",
  "way": "طریقہ",
  "man": "آدمی",
  "world": "دنیا",
  "life": "زندگی",
  "hand": "ہاتھ",
  "part": "حصہ",
  "child": "بچہ",
  "eye": "آنکھ",
  "woman": "عورت",
  "place": "جگہ",
  "case": "کیس",
  "group": "گروہ",
  "company": "کمپنی",
  "problem": "مسئلہ",
  "fact": "حقیقت",
  "point": "نقطہ",
  "home": "گھر",
  "story": "کہانی",

  // Technology terms
  "technology": "ٹیکنالوجی",
  "internet": "انٹرنیٹ",
  "computer": "کمپیوٹر",
  "phone": "فون",
  "software": "سافٹ ویئر",
  "data": "ڈیٹا",
  "system": "سسٹم",
  "information": "معلومات",
  "network": "نیٹ ورک",
  "digital": "ڈیجیٹل",
  "device": "ڈیوائس",
  "application": "ایپلیکیشن",
  "website": "ویب سائٹ",
  "social": "سوشل",
  "media": "میڈیا",

  // Business/Finance
  "business": "کاروبار",
  "money": "پیسہ",
  "market": "مارکیٹ",
  "price": "قیمت",
  "product": "پروڈکٹ",
  "service": "سروس",
  "customer": "کسٹمر",
  "sale": "سیل",
  "bank": "بینک",
  "investment": "سرمایہ کاری",
  "growth": "ترقی",
  "profit": "منافع",
  "loss": "نقصان",
  "trade": "تجارت",
  "industry": "انڈسٹری",

  // Health/Medical
  "doctor": "ڈاکٹر",
  "hospital": "ہسپتال",
  "patient": "مریض",
  "medicine": "دوا",
  "treatment": "علاج",
  "research": "تحقیق",
  "study": "مطالعہ",
  "test": "ٹیسٹ",
  "result": "نتیجہ",
  "symptom": "علامت",
  "virus": "وائرس",
  "vaccine": "ویکسین",
  "pandemic": "وبا",

  // Education
  "school": "اسکول",
  "student": "طالب علم",
  "teacher": "استاد",
  "class": "کلاس",
  "education": "تعلیم",
  "learning": "سیکھنا",
  "book": "کتاب",
  "university": "یونیورسٹی",
  "exam": "امتحان",
  "knowledge": "علم",
  "skill": "مہارت",

  // Add 100+ more words below...
  "water": "پانی",
  "food": "کھانا",
  "air": "ہوا",
  "fire": "آگ",
  "earth": "زمین",
  "love": "محبت",
  "friend": "دوست",
  "family": "خاندان",
  "city": "شہر",
  "country": "ملک",
  "language": "زبان",
  "culture": "ثقافت",
  "art": "فن",
  "music": "موسیقی",
  "film": "فلم",
  "sport": "کھیل",
  "game": "گیم",
  "news": "خبریں",
  "weather": "موسم",
  "nature": "فطرت",
  "tree": "درخت",
  "flower": "پھول",
  "animal": "جانور",
  "bird": "پرندہ",
  "fish": "مچھلی",
  "color": "رنگ",
  "number": "نمبر",
  "age": "عمر",
  "body": "جسم",
  "heart": "دل",
  "mind": "دماغ",
  "soul": "روح",
  "god": "خدا",
  "religion": "مذہب",
  "politics": "سیاست",
  "law": "قانون",
  "right": "حق",
  "war": "جنگ",
  "peace": "امن",
  "history": "تاریخ",
  "future": "مستقبل",
  "science": "سائنس",
  "space": "خلاء",
  "moon": "چاند",
  "sun": "سورج",
  "star": "ستارہ",
  "light": "روشنی",
  "dark": "اندھیرا",
  "hot": "گرم",
  "cold": "سرد",
  "big": "بڑا",
  "small": "چھوٹا",
  "new": "نیا",
  "old": "پرانا",
  "good": "اچھا",
  "bad": "برا",
  "true": "سچ",
  "false": "جھوٹ",
  "beautiful": "خوبصورت",
  "ugly": "بدصورت",
  "rich": "امیر",
  "poor": "غریب",
  "strong": "مضبوط",
  "weak": "کمزور",
  "happy": "خوش",
  "sad": "اداس",
  "angry": "غصہ",
  "calm": "پرسکون",
  "noise": "شور",
  "quiet": "خاموش",
  "fast": "تیز",
  "slow": "آہستہ",
  "clean": "صاف",
  "dirty": "گندا",
  "full": "بھرا",
  "empty": "خالی",
  "same": "ایک جیسا",
  "different": "مختلف",
  "easy": "آسان",
  "hard": "مشکل",
  "begin": "شروع",
  "end": "ختم",
  "first": "پہلا",
  "last": "آخری",
  "young": "جوان",
  "important": "اہم",
  "interesting": "دلچسپ",
  "boring": "بیزار کن",
  "dangerous": "خطرناک",
  "safe": "محفوظ",
  "free": "آزاد",
  "busy": "مصروف",
  "ready": "تیار",
  "tired": "تھکا ہوا",
  "hungry": "بھوکا",
  "thirsty": "پیاسا",
  "awake": "جاگتا",
  "asleep": "سوتا",
  "alive": "زندہ",
  "dead": "مردہ",
  "present": "موجود",
  "absent": "غائب",
  "correct": "صحیح",
  "wrong": "غلط",
  "open": "کھلا",
  "closed": "بند",
  "public": "عوامی",
  "private": "ذاتی",
  "major": "اہم",
  "minor": "چھوٹا",
  "real": "حقیقی",
  "fake": "جعلی",
  "whole": "پورا",
  "front": "سامنے",
  "back": "پیچھے",
  "left": "بائیں",
  "high": "اونچا",
  "low": "نیچا",
  "near": "قریب",
  "far": "دور",
  "inside": "اندر",
  "outside": "باہر",
  "up": "اوپر",
  "down": "نیچے",
  "early": "جلدی",
  "late": "دیر",
  "always": "ہمیشہ",
  "never": "کبھی نہیں",
  "often": "اکثر",
  "sometimes": "کبھی کبھی",
  "usually": "عام طور پر",
  "very": "بہت",
  "too": "بھی",
  "so": "تو",
  "just": "صرف",
  "now": "اب",
  "then": "پھر",
  "here": "یہاں",
  "there": "وہاں",
  "why": "کیوں",
  "how": "کیسے",
  "what": "کیا",
  "when": "کب",
  "where": "کہاں",
  "who": "کون",
  "which": "کون سا",
  "whose": "کس کا",
  "myself": "میں خود",
  "yourself": "تم خود",
  "himself": "وہ خود",
  "herself": "وہ خود",
  "itself": "یہ خود",
  "ourselves": "ہم خود",
  "yourselves": "تم خود",
  "themselves": "وہ خود",
  "something": "کچھ",
  "anything": "کچھ بھی",
  "nothing": "کچھ نہیں",
  "everything": "سب کچھ",
  "someone": "کوئی",
  "anyone": "کوئی بھی",
  "no one": "کوئی نہیں",
  "everyone": "سب",
  "somewhere": "کہیں",
  "anywhere": "کہیں بھی",
  "nowhere": "کہیں نہیں",
  "everywhere": "ہر جگہ",
  "some": "کچھ",
  "any": "کوئی",
  "no": "نہیں",
  "many": "بہت",
  "few": "کچھ",
  "several": "کئی",
  "all": "سب",
  "both": "دونوں",
  "neither": "نہ ہی",
  "either": "یا تو",
  "each": "ہر ایک",
  "every": "ہر",
  "other": "دوسرا",
  "another": "ایک اور",
  "such": "ایسا",
  "only": "صرف",
  "own": "اپنا",
  "physician": "طبیب",
  "surgeon": "سرجن",
  "nurse": "نرس",
  "dentist": "دانتوں کا ڈاکٹر",
  "pharmacist": "دواساز",
  "veterinarian": "جانوروں کا ڈاکٹر",
  "psychologist": "نفسیات دان",
  "psychiatrist": "نفسیاتی معالج",
  "scientist": "سائنسدان",
  "researcher": "محقق"
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
