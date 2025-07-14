"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-6xl font-bold text-center mb-4 text-gray-900 drop-shadow-md"
    >
      {text}
    </motion.h1>
  );
}