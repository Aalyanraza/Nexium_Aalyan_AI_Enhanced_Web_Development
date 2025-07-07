'use client'

import { useState } from 'react'
import quotesData from '../_data/db.json'

export default function SearchQuote() {
  const [topic, setTopic] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = () => {
    const filtered = quotesData.filter(q =>
      q.topic.toLowerCase().includes(topic.toLowerCase())
    ).slice(0, 3)
    setResults(filtered)
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔍 Search Quotes by Topic</h1>

      <div className="flex space-x-2 mb-4">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g. life)"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((quote) => (
            <li key={quote.id} className="border p-4 rounded shadow">
              <p className="italic">"{quote.text}"</p>
              <p className="mt-2 text-sm text-gray-700">— {quote.author} ({quote.label})</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No quotes found. Try another topic.</p>
      )}
    </main>
  )
}
