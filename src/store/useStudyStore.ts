import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { user as mockUser, subjects, recentNotes, upcomingExams, weeklyProgress } from "@/data/mock"

// Types
export interface Note {
  id: string
  title: string
  subject: string
  date: string
  summary: string
  bookmarked: boolean
  size?: string
}

export interface Task {
  id: string
  title: string
  time: string
  subject: string
  completed: boolean
}

export interface QuizAttempt {
  id: string
  title: string
  score: number
  date: string
}

export interface StudyStore {
  // User Data
  user: {
    name: string
    streak: number
    dailyGoal: number
    todayStudied: number
    email: string
    university: string
    major: string
  }
  updateUser: (data: Partial<StudyStore["user"]>) => void
  incrementStudied: (hours: number) => void

  // Focus Mode
  isFocusMode: boolean
  toggleFocusMode: () => void

  // Notes
  notes: Note[]
  addNote: (note: Note) => void
  updateNoteSummary: (id: string, summary: string) => void
  deleteNote: (id: string) => void
  toggleBookmark: (id: string) => void
  
  // Planner Tasks
  tasks: Task[]
  addTask: (task: Task) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void

  // Quizzes & Flashcards
  quizHistory: QuizAttempt[]
  addQuizAttempt: (attempt: QuizAttempt) => void
  flashcardStats: { reviewedToday: number, totalGoal: number }
  incrementFlashcardReview: () => void

  // Achievements
  achievements: string[]
  unlockAchievement: (id: string) => void
}

const initialTasks: Task[] = [
  { id: "1", title: "Review Operating Systems Chapter 4", time: "09:00 AM", subject: "Operating Systems", completed: true },
  { id: "2", title: "Complete DBMS normalization assignment", time: "11:30 AM", subject: "DBMS", completed: false },
  { id: "3", title: "Watch React Hooks tutorial", time: "02:00 PM", subject: "React", completed: false },
  { id: "4", title: "Practice LeetCode DP problems", time: "04:30 PM", subject: "DSA", completed: false },
]

export const useStudyStore = create<StudyStore>()(
  persist(
    (set) => ({
      user: {
        name: mockUser.name,
        streak: mockUser.streak,
        dailyGoal: mockUser.dailyGoal,
        todayStudied: mockUser.todayStudied,
        email: `${mockUser.name.toLowerCase()}@example.com`,
        university: "Stanford University",
        major: "Computer Science"
      },
      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
      incrementStudied: (hours) => set((state) => ({ user: { ...state.user, todayStudied: state.user.todayStudied + hours }})),
      
      isFocusMode: false,
      toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),

      notes: recentNotes,
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      updateNoteSummary: (id, summary) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, summary } : n)
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),
      toggleBookmark: (id) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, bookmarked: !n.bookmarked } : n)
      })),

      tasks: initialTasks,
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),

      quizHistory: [
        { id: "q1", title: "OS: Process Scheduling", score: 85, date: "Yesterday" },
        { id: "q2", title: "React Fundamentals", score: 92, date: "3 days ago" },
      ],
      addQuizAttempt: (attempt) => set((state) => ({ quizHistory: [attempt, ...state.quizHistory] })),

      flashcardStats: { reviewedToday: 24, totalGoal: 50 },
      incrementFlashcardReview: () => set((state) => ({
        flashcardStats: {
          ...state.flashcardStats,
          reviewedToday: Math.min(state.flashcardStats.reviewedToday + 1, state.flashcardStats.totalGoal)
        }
      })),

      achievements: [],
      unlockAchievement: (id) => set((state) => {
        if (!state.achievements.includes(id)) {
          return { achievements: [...state.achievements, id] }
        }
        return state
      })
    }),
    {
      name: "studyflow-storage",
    }
  )
)
