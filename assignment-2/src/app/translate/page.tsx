"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TranslatePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-center shadow-sm">
        Translate a Blog
      </h1>
      <div className="w-full max-w-md space-y-4 shadow-lg p-6 rounded-lg bg-white">
        <Input placeholder="Enter blog URL..." className="shadow-inner" />
        <Button className="w-full shadow-md">Translate to Urdu</Button>
      </div>
      <Link href="/">
        <Button variant="ghost" className="shadow-sm">
          ← Back to Home
        </Button>
      </Link>
    </div>
  );
}