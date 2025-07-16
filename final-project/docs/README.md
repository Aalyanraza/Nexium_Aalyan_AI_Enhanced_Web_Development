# 📄 Product Requirements Document (PRD)

## 🧠 Project Name
**Resume Tailor** – AI-Powered Resume Customization Web App

---

## 🎯 Objective

To help job seekers automatically tailor their resume to match any job description using AI. Users upload or paste their resume and a job description, and the system suggests a tailored version that better aligns with the job posting.

---

## 👥 Target Users

- Job seekers and students applying to jobs
- Professionals switching careers
- Resume writers and career coaches

---

## 🛠 Features

### 1. **Authentication**
- Magic link email login using Supabase Auth

### 2. **Resume Input**
- Users can paste text or upload `.docx` or `.pdf` files

### 3. **Job Description Input**
- Text box for pasting the job description

### 4. **AI Tailoring Engine**
- Uses `n8n` + OpenAI to:
  - Extract key skills and responsibilities from the job description
  - Rewrite or recommend changes to the resume
  - Output a tailored version, with improvements clearly shown

### 5. **Results + Export**
- Display side-by-side view: original vs. tailored resume
- Button to export tailored version as `.pdf` or copy to clipboard

---

## 🧭 User Flow

1. User signs up/login with email (magic link)
2. Home page with 2 input fields:
   - Resume input (text box or file upload)
   - Job description (text box)
3. User clicks **"Tailor My Resume"**
4. App shows a loading screen while AI processes input
5. Tailored resume is displayed
6. User can export or copy the new resume

---

## 🧱 Tech Stack

| Layer        | Tool                      |
|--------------|---------------------------|
| Frontend     | Next.js (Vercel)          |
| Backend      | Supabase (Auth, DB)       |
| Workflow     | n8n (calls OpenAI GPT)    |
| AI Model     | OpenAI GPT-4 (via n8n)    |
| DB           | MongoDB (for resumes)     |
| Deployment   | Vercel (CI/CD)            |

---

## ✅ Success Criteria (MVP)

- Magic link auth works on all devices
- Upload and paste both accepted as resume input
- AI suggestions generate within 5–10 seconds
- Tailored resume is noticeably improved and relevant
- Users can export the tailored version as PDF

---

## 📅 Milestones

| Milestone             | Due Date | Push To                    |
|-----------------------|----------|----------------------------|
| PRD + wireframes      | Day 15   | `/grand-project/docs/`     |
| Backend & DB setup    | Day 18   | `/grand-project/api/`      |
| Frontend UI           | Day 21   | `/grand-project/app/`      |
| AI logic + testing    | Day 24   | `/grand-project/ai/`       |
| Public demo live      | Day 27   | —                          |
| Docs + Loom walkthrough| Day 29 | `README.md`                |

---

## 🧰 Future Enhancements (Post-MVP Ideas)

- Highlight AI-changed parts in the resume
- Add cover letter generator
- Save resumes and job posts in dashboard
- Feedback rating to improve tailoring quality

---

## 📎 Appendix

- Wireframes: `/grand-project/docs/wireframes/`
- AI Prompt Examples: `/grand-project/ai/prompts.md`

