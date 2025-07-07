'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import quotesData from './_data/db.json'
import { Button } from "@/components/ui/button"


export default function Dashboard() {
  const [quotes] = useState(quotesData.slice(0, 3))

  return (
    <main className="p-6">
      <>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
          className="text-7xl font-extrabold tracking-tight mb-2 text-center pb-4 border-b border-border"
        >
          📚 Quote Generator
        </motion.h1>

        <div className="w-120 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full mb-6" />
      </>
      <div className="flex gap-4 mb-6 justify-center">
        <Button asChild className="px-6 py-6 text-xl">
          <Link href="/add">Add a Quote</Link>
        </Button>
        <Button asChild variant="secondary" className="px-6 py-6 text-xl mb-4">
          <Link href="/search">Search a Quote</Link>
        </Button>
      </div>


      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-3xl font-semibold mb-4 text-center"
      >
        🌟 Featured Quotes
      </motion.h2>

      <ul className="space-y-5">
        {quotes.map((quote) => (
          <motion.li
            key={quote.id}
            className="border-2 border-gray-200 bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.98 }}
            exit={{ opacity: 0, y: -10 }}
            // Animate each quote with a staggered effect
  
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: quote.id * 0.1 }}
          >
            <p className="italic text-lg text-gray-800">"{quote.text}"</p>
            <p className="mt-2 text-sm text-gray-600 font-medium">
              — {quote.author} <span className="text-xs text-gray-500">({quote.label})</span>
            </p>
          </motion.li>
        ))}
      </ul>
    </main>
  )
}
