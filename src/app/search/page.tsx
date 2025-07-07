'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import defaultQuotes from '../_data/db.json'

export default function SearchQuote() {
  const [topic, setTopic] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [allQuotes, setAllQuotes] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('quotes')
    if (stored) {
      setAllQuotes(JSON.parse(stored))
    } else {
      setAllQuotes(defaultQuotes)
    }
  }, [])

  const handleSearch = () => {
    const filtered = allQuotes
      .filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()))
      .slice(0, 3)
    setResults(filtered)
  }

  return (
    <main
      className="max-w-xl w-full mx-auto px-4 pt-10"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-6xl font-extrabold tracking-tight mb-10 text-center"
      >
        🔍 Search Quotes
      </motion.h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch()
        }}
        className="flex gap-3 mb-6"
      >
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g. life)"
          className="bg-[#f7f7f5] text-gray-800 border border-border focus:ring-2 focus:ring-primary"
        />
        <Button type="submit" className="bg-[#f5f2f2] text-gray-800 border border-border hover:bg-gray-200">
          Search
        </Button>
      </form>

      {results.length > 0 ? (
        <ul className="space-y-5">
          <AnimatePresence>
            {results.map((quote, index) => (
              <motion.li
                key={quote.id}
                className="border-2 border-gray-200 bg-gray-100 px-10 py-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="italic text-lg text-gray-800 w-full max-w-xl text-center mx-auto">
                  "{quote.text}"
                </p>
                <p className="mt-2 text-sm text-gray-600 font-medium text-right">
                  — {quote.author}{' '}
                  <span className="text-xs text-gray-500">({quote.label})</span>
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <p className="text-muted-foreground mt-6 text-center">
          No quotes found. Try another topic.
        </p>
      )}
    </main>
  )
}
