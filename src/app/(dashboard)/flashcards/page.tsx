"use client"

import { useState } from "react"
import { Flashcard } from "@/components/ui/flashcard"
import { Button } from "@/components/ui/button"
import { Play, Plus, GraduationCap, Eye, EyeOff, LayoutTemplate } from "lucide-react"
import { useStudyStore } from "@/store/useStudyStore"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const mockCards = [
  { id: 1, q: "What is the primary difference between a Mutex and a Semaphore?", a: "A Mutex is a locking mechanism used to synchronize access to a resource. A Semaphore is a signaling mechanism that allows multiple threads to access finite resources." },
  { id: 2, q: "What does ACID stand for in DBMS?", a: "Atomicity, Consistency, Isolation, Durability" },
  { id: 3, q: "What is the time complexity of QuickSort in the worst case?", a: "O(n^2), usually when the pivot is chosen poorly (e.g., already sorted array)." },
]

export default function FlashcardsPage() {
  const { toggleFocusMode, isFocusMode, flashcardStats, incrementFlashcardReview } = useStudyStore()
  
  const [currentCard, setCurrentCard] = useState(0)

  const handleReview = (rating: string) => {
    if (currentCard < mockCards.length - 1) {
      setCurrentCard(prev => prev + 1)
      incrementFlashcardReview()
      toast(`Card marked as ${rating}`, { position: "top-center" })
    } else {
      incrementFlashcardReview()
      toast.success("Deck finished!", { icon: "🎉" })
      setTimeout(() => setCurrentCard(0), 1000) // reset for demo
    }
  }

  return (
    <div className={cn("p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 ease-out", isFocusMode && "max-w-4xl")}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Flashcards</h1>
          <p className="text-text-secondary">Master concepts using spaced repetition.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button 
            variant="outline" 
            className="gap-2 transition-all"
            onClick={() => {
              toggleFocusMode()
              toast(isFocusMode ? "Focus mode disabled." : "Focus mode enabled.", { icon: isFocusMode ? "👀" : "🧘" })
            }}
          >
            {isFocusMode ? <LayoutTemplate className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isFocusMode ? "Exit Focus" : "Focus Mode"}
          </Button>
          <Button className="gap-2 shadow-sm" onClick={() => toast.info("Deck creation wizard coming soon.")}>
            <Plus className="w-4 h-4" />
            Create Deck
          </Button>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="bg-secondary/30 border border-border rounded-2xl p-6 flex items-center gap-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Daily Review Goal</h3>
          <p className="text-sm text-text-secondary mb-3">You've reviewed {flashcardStats.reviewedToday} out of {flashcardStats.totalGoal} cards today.</p>
          <div className="w-full max-w-md bg-background rounded-full h-2 border border-border overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${(flashcardStats.reviewedToday / flashcardStats.totalGoal) * 100}%` }} />
          </div>
        </div>
        <Button variant="outline" className="hidden sm:flex hover:bg-secondary">View Stats</Button>
      </div>

      {/* Interactive Deck Area */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">Active Deck: Operating Systems</h3>
          <span className="text-sm font-medium text-text-tertiary">Card {currentCard + 1} of {mockCards.length}</span>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Flashcard 
            key={currentCard} // Force re-render on card change to reset flip state
            frontContent={
              <div>
                <span className="text-sm font-semibold text-text-tertiary uppercase tracking-wider block mb-4">Question</span>
                {mockCards[currentCard].q}
              </div>
            }
            backContent={
              <div className="space-y-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider block mb-2">Answer</span>
                <p>{mockCards[currentCard].a}</p>
              </div>
            }
          />
          
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            <Button variant="outline" size="lg" className="px-8 border-error text-error hover:bg-error hover:text-white transition-all hover:scale-105" onClick={() => handleReview("Again")}>Again</Button>
            <Button variant="outline" size="lg" className="px-8 border-warning text-warning hover:bg-warning hover:text-white transition-all hover:scale-105" onClick={() => handleReview("Hard")}>Hard</Button>
            <Button variant="outline" size="lg" className="px-8 border-success text-success hover:bg-success hover:text-white transition-all hover:scale-105" onClick={() => handleReview("Good")}>Good</Button>
            <Button variant="outline" size="lg" className="px-8 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all hover:scale-105" onClick={() => handleReview("Easy")}>Easy</Button>
          </div>
        </div>
      </div>
      
      {/* Other Decks */}
      {!isFocusMode && (
        <div className="pt-12 border-t border-border animate-in fade-in duration-500">
          <h3 className="text-lg font-semibold tracking-tight mb-6">Your Decks</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { title: "React Hooks", cards: 28, new: 5 },
              { title: "DBMS Normalization", cards: 15, new: 0 },
              { title: "Computer Networks OSI", cards: 35, new: 12 },
              { title: "Design Patterns", cards: 42, new: 8 }
            ].map((deck, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1">
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{deck.title}</h4>
                <div className="flex justify-between items-center text-sm text-text-secondary">
                  <span>{deck.cards} cards</span>
                  {deck.new > 0 && <span className="text-primary font-medium">{deck.new} due</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
