"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { subjects } from "@/data/mock"
import { Play, CheckCircle2, AlertCircle, History, Loader2, ChevronRight, ChevronLeft } from "lucide-react"
import { useStudyStore } from "@/store/useStudyStore"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

const mockQuestions = [
  { q: "Which of the following is a synchronization tool?", options: ["Semaphore", "Thread", "Process", "Socket"], ans: 0 },
  { q: "What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Structured Quiz Language", "Simple Query Language"], ans: 0 },
  { q: "Which protocol is connection-oriented?", options: ["UDP", "IP", "TCP", "ICMP"], ans: 2 },
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], ans: 1 },
  { q: "Which of the following is not a React Hook?", options: ["useState", "useEffect", "useHistory", "useContext"], ans: 2 }
]

export default function QuizPage() {
  const { quizHistory, addQuizAttempt, unlockAchievement } = useStudyStore()
  
  const [quizState, setQuizState] = useState<"idle" | "loading" | "active" | "results">("idle")
  const [activeSubject, setActiveSubject] = useState<string>("")
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})

  const startQuiz = (subjectName: string) => {
    setActiveSubject(subjectName)
    setQuizState("loading")
    setTimeout(() => {
      setQuizState("active")
      toast("Quiz generated.", { icon: "🧠" })
    }, 2000)
  }

  const handleNext = () => {
    if (currentQIndex < mockQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    let correct = 0
    mockQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.ans) correct++
    })
    const score = (correct / mockQuestions.length) * 100
    
    addQuizAttempt({
      id: Math.random().toString(),
      title: activeSubject,
      score: score,
      date: "Just now"
    })
    
    if (score >= 80) unlockAchievement("Quiz Master")

    setQuizState("results")
  }

  if (quizState === "loading") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-bold tracking-tight mb-2 animate-pulse">Generating personalized questions...</h2>
        <p className="text-text-secondary">Analyzing your weak areas in {activeSubject}</p>
      </div>
    )
  }

  if (quizState === "active") {
    const q = mockQuestions[currentQIndex]
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{activeSubject} Quiz</h2>
            <p className="text-text-secondary">Question {currentQIndex + 1} of {mockQuestions.length}</p>
          </div>
          <Button variant="outline" onClick={() => setQuizState("idle")}>Exit</Button>
        </div>

        <div className="w-full bg-secondary rounded-full h-2">
          <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: `${((currentQIndex + 1) / mockQuestions.length) * 100}%` }} />
        </div>

        <Card className="border-primary/20 shadow-md">
          <CardContent className="p-8">
            <h3 className="text-xl font-medium leading-relaxed mb-8">{q.q}</h3>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAnswers(prev => ({ ...prev, [currentQIndex]: i }))}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.01] ${selectedAnswers[currentQIndex] === i ? "border-primary bg-primary/5 font-medium text-primary" : "border-border hover:border-primary/30"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentQIndex === 0} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          
          {currentQIndex === mockQuestions.length - 1 ? (
            <Button onClick={handleSubmit} className="gap-2 px-8">Submit Quiz <CheckCircle2 className="w-4 h-4" /></Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (quizState === "results") {
    const correct = Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === mockQuestions[Number(k)].ans).length
    const score = (correct / mockQuestions.length) * 100

    return (
      <div className="p-8 max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-500 text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight mb-2">Quiz Completed!</h2>
        <p className="text-text-secondary text-lg">You scored {score}% in {activeSubject}</p>

        <div className="grid grid-cols-2 gap-4 mt-8 text-left">
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-4 flex flex-col items-center">
              <span className="text-success font-bold text-2xl">{correct}</span>
              <span className="text-sm text-text-secondary">Correct</span>
            </CardContent>
          </Card>
          <Card className="bg-error/10 border-error/20">
            <CardContent className="p-4 flex flex-col items-center">
              <span className="text-error font-bold text-2xl">{mockQuestions.length - correct}</span>
              <span className="text-sm text-text-secondary">Incorrect</span>
            </CardContent>
          </Card>
        </div>

        <Button size="lg" className="mt-8" onClick={() => {
          setQuizState("idle");
          setCurrentQIndex(0);
          setSelectedAnswers({});
        }}>Return to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Practice Quizzes</h1>
          <p className="text-text-secondary">Test your knowledge and identify weak spots.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Quiz Selection */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold tracking-tight">Select Subject to Practice</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((sub, idx) => (
              <Card 
                key={sub.id} 
                onClick={() => startQuiz(sub.name)}
                className="hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sub.color}`}>
                      <span className="font-bold text-sm">{sub.name.charAt(0)}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase">
                      {12 + idx * 3} Topics
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{sub.name}</h4>
                  <div className="w-full bg-secondary h-1.5 rounded-full mt-4 mb-2 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                  </div>
                  <p className="text-xs text-text-tertiary text-right">Mastery: {Math.floor(Math.random() * 60 + 20)}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar: Recommended & History */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5 shadow-none hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mb-4">
                <h4 className="font-semibold text-lg">DBMS Normalization</h4>
                <p className="text-sm text-text-secondary">You scored 45% in your last attempt. Time for a review.</p>
              </div>
              <Button className="w-full gap-2 group" onClick={() => startQuiz("DBMS")}>
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                Start Recommended Quiz
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-text-secondary" />
                Recent Attempts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <AnimatePresence>
                {quizHistory.slice(0, 5).map((attempt) => (
                  <motion.div 
                    key={attempt.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <h5 className="text-sm font-medium line-clamp-1">{attempt.title}</h5>
                      <p className="text-xs text-text-tertiary">{attempt.date}</p>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2">
                      <span className="text-sm font-bold">{attempt.score.toFixed(0)}%</span>
                      <CheckCircle2 className={`w-4 h-4 ${attempt.score >= 80 ? "text-success" : "text-warning"}`} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
