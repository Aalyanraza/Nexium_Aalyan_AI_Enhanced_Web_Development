'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import defaultQuotes from '../_data/db.json'

export default function AddQuote() {
  const router = useRouter()
  const [quotes, setQuotes] = useState(defaultQuotes)
  const [form, setForm] = useState({
    topic: '',
    label: '',
    text: '',
    author: '',
  })

  // ⬇️ Load from localStorage on mount
  useEffect(() => {
    const storedQuotes = localStorage.getItem('quotes')
    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes))
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newQuote = { ...form, id: Date.now() }
    const updatedQuotes = [...quotes, newQuote]

    setQuotes(updatedQuotes)
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes))

    alert('✅ Quote added and saved!')
    router.push('/')
  }

  return (
    <main className="px-4 pt-30 max-w-xl mx-auto">
      <div className="bg-card shadow-lg rounded-xl p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight mb-10 text-center"
        >
          ➕ Add a Quote
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            name="topic"
            placeholder="Topic (e.g. motivation)"
            value={form.topic}
            onChange={handleChange}
            className="bg-muted/40 text-foreground border border-border focus:ring-2 focus:ring-primary"
            required
          />
          <Input
            name="label"
            placeholder="Label (e.g. Motivation)"
            value={form.label}
            onChange={handleChange}
            className="bg-muted/40 text-foreground border border-border focus:ring-2 focus:ring-primary"
            required
          />
          <Textarea
            name="text"
            placeholder="Quote text"
            value={form.text}
            onChange={handleChange}
            rows={4}
            className="bg-muted/40 text-foreground border border-border focus:ring-2 focus:ring-primary rounded-md px-3 py-2"
            required
          />
          <Input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            className="bg-muted/40 text-foreground border border-border focus:ring-2 focus:ring-primary"
            required
          />
          <Button type="submit" className="w-full text-base py-2.5">
            Add Quote
          </Button>
        </motion.form>
      </div>
    </main>

  )
}
