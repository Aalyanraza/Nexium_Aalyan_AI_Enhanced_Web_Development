# 📚 Quote Generator Dashboard (Next.js + TypeScript)

This document outlines the implementation of the **Quote Generator Dashboard** built using **Next.js**, **TypeScript**, and **Framer Motion**. It displays a few random quotes from a local JSON file and avoids hydration issues during SSR.

---

## 🚀 Features

- 🎯 Displays 3 random quotes on each page load
- ✅ Fully TypeScript-typed for safety and autocompletion
- 🎨 Animated UI using Framer Motion
- 💡 Hydration-safe rendering (no SSR mismatch errors)
- 🧩 Modular design (supports quote addition & search via links)

---

## 📁 File Structure

```
src/
├── app/
│   ├── page.tsx           ← Main dashboard component
│   └── _data/
│       └── db.json        ← List of all quotes
├── components/
│   └── ui/
│       └── button.tsx     ← Custom button component
└── types/
    └── quote.ts           ← Shared Quote type definition (optional)
```

---

## 🧠 Quote Type

```ts
type Quote = {
  id: number
  text: string
  author: string
  label: string
}
```

You can optionally move this to `types/quote.ts` and import it across files.

## ⚙️ getRandomQuotes Utility

```ts
function getRandomQuotes(data: Quote[], count: number): Quote[] {
  const shuffled = [...data]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}
```

Uses the Fisher-Yates shuffle to select unique random quotes.

## 🧩 Hydration Safety

To avoid React hydration mismatch errors:

- The random quote selection is done inside `useEffect()`, ensuring it only runs on the client side after hydration.
- This avoids SSR rendering inconsistencies between server and client.

## 📦 JSON File Format (db.json)

```json
[
  {
    "id": 1,
    "text": "The best way to predict the future is to create it.",
    "author": "Peter Drucker",
    "label": "Motivation"
  },
  {
    "id": 2,
    "text": "In the middle of every difficulty lies opportunity.",
    "author": "Albert Einstein",
    "label": "Inspiration"
  }
  // ...more quotes
]
```

## 🖥️ UI Preview (Structure)

```
📚 Quote Generator
----------------------------
[ Add a Quote ] [ Search a Quote ]

🌟 Featured Quotes
----------------------------
"Random quote text"
— Author (Label)
```

Each quote fades and animates in with a small delay for polish.

## 🛠️ Future Ideas

- Add a "New Quotes" button to re-randomize on demand
- Store last random quotes in localStorage or cookies
- Implement quote upvoting or bookmarking
- Paginate or filter by label/author

## 📌 Dependencies

- Next.js
- Framer Motion
- Tailwind CSS
- Custom Button component from your design system

## ✅ Best Practices Followed

- `useEffect` for client-only logic
- Clean JSX structure
- Type safety for all data
- Avoided SSR client inconsistencies

## 📎 Related Files

- `page.tsx`
- `db.json`
- `button.tsx`
- `quote.ts`

---

**Built with love using Next.js, TypeScript, and clean design.**
