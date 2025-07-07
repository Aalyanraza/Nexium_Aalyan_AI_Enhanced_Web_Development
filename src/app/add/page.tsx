'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import quotesData from '../_data/db.json'

export default function AddQuote() {
  const router = useRouter()
  const [quotes, setQuotes] = useState(quotesData)
  const [form, setForm] = useState({ topic: '', label: '', text: '', author: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newQuote = { ...form, id: quotes.length + 1 }
    setQuotes([...quotes, newQuote])
    alert('Quote added! (Temporarily)')
    router.push('/')
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">➕ Add a Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="topic"
          placeholder="Topic (e.g. motivation)"
          value={form.topic}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="label"
          placeholder="Label (e.g. Motivation)"
          value={form.label}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="text"
          placeholder="Quote text"
          value={form.text}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Quote</button>
      </form>
    </main>
  )
}
