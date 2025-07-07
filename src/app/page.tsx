'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import quotesData from './_data/db.json'

export default function Dashboard() {
  const [quotes, setQuotes] = useState(quotesData.slice(0, 3))

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Quote Generator</h1>

      <div className="space-x-4 mb-6">
        <Link href="/add" className="px-4 py-2 bg-blue-500 text-white rounded">Add a Quote</Link>
        <Link href="/search" className="px-4 py-2 bg-green-500 text-white rounded">Search a Quote</Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">🌟 Featured Quotes</h2>
      <ul className="space-y-4">
        {quotes.map((quote) => (
          <li key={quote.id} className="border p-4 rounded shadow">
            <p className="italic">"{quote.text}"</p>
            <p className="mt-2 text-sm text-gray-700">— {quote.author} ({quote.label})</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
