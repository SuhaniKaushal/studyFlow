# StudyFlow 🎓

> **Build Better Study Habits.**

StudyFlow is an intelligent study management platform that helps students organize their learning, manage notes, revise efficiently, practice quizzes, build flashcards, track progress, and stay consistent. 

Modern students are overwhelmed by disjointed tools—using one app for notes, another for flashcards, and a third for task management. StudyFlow solves this by unifying the entire learning lifecycle into a single, premium, beautifully designed interface that stays out of your way.

---

## ✨ Features

- **Upload Notes**: Seamlessly organize and manage your study materials.
- **AI Summary (Mock)**: Instantly extract key concepts and save reading time.
- **AI Quiz Generator (Mock)**: Test your knowledge with dynamically generated questions.
- **Flashcards**: Master concepts using spaced repetition and progress tracking.
- **Study Planner**: Organize your schedule, track deadlines, and run Pomodoro sessions.
- **Study Streak**: Build consistency with daily study tracking.
- **Weekly Progress Dashboard**: Visualize your learning patterns with interactive charts.
- **Dark/Light Mode**: Premium, handcrafted UI themes that switch instantly.
- **Responsive UI**: Flawless experience across all screen sizes.
- **Local Storage Persistence**: Your data is securely saved in your browser using Zustand.
- **Smooth Animations**: Tasteful micro-interactions powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Library**: React 
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Deployment**: Vercel

---

## 📸 Screenshots

| Landing Page | Dashboard |
|:---:|:---:|
| <!-- Placeholder: ![Landing Page](docs/landing.png) --> _Coming Soon_ | <!-- Placeholder: ![Dashboard](docs/dashboard.png) --> _Coming Soon_ |

| Notes | Quiz |
|:---:|:---:|
| <!-- Placeholder: ![Notes](docs/notes.png) --> _Coming Soon_ | <!-- Placeholder: ![Quiz](docs/quiz.png) --> _Coming Soon_ |

| Planner | Flashcards |
|:---:|:---:|
| <!-- Placeholder: ![Planner](docs/planner.png) --> _Coming Soon_ | <!-- Placeholder: ![Flashcards](docs/flashcards.png) --> _Coming Soon_ |

---

## 🚀 Live Demo

<!-- Placeholder for Vercel Link -->
[View Live Demo](#)

## 💻 GitHub Repository

<!-- Placeholder for GitHub Link -->
[View Source Code](#)

---

## 🏁 Getting Started

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

### Production Build

Create an optimized production build:

```bash
npm run build
```

---

## 📁 Folder Structure

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── (dashboard)/      # Protected dashboard routes (Notes, Planner, Quiz, etc.)
│   ├── globals.css       # Global styles and Tailwind theme variables
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable React components
│   ├── layout/           # Sidebar, TopNav, Footer
│   └── ui/               # Base UI components (Buttons, Cards, Inputs, etc.)
├── data/                 # Mock data and constants
├── lib/                  # Utility functions (e.g., Tailwind class merging)
└── store/                # Zustand state management and local storage persistence
```

---

## 🎨 Design Philosophy

StudyFlow was built with a relentless focus on **premium UI/UX** and **frontend-first architecture**. 

Rather than focusing on complex backend infrastructure for a prototype, this project emphasizes realistic user interactions, accessibility, and usability. Every button performs a meaningful action, every state transitions smoothly, and all data dynamically persists using the browser's local storage. The goal is to provide an interface that feels exactly like a production-ready, investor-backed SaaS product from the very first click.

---

## 🔮 Future Scope

While the current version operates entirely on the frontend, the architecture is ready for backend integration. Planned future updates include:

- **Real AI Integration**: Hooking up OpenAI/Anthropic for genuine summaries and quiz generation.
- **OCR Integration**: Extracting text directly from images and scanned PDFs.
- **Mobile App**: A React Native port for studying on the go.
- **Cloud Sync**: PostgreSQL database integration for cross-device synchronization.
- **Real Authentication**: Adding NextAuth for secure user accounts.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
