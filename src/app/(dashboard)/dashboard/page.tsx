"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Flame, BrainCircuit, FileUp, ListTodo, Presentation } from "lucide-react"
import { useStudyStore } from "@/store/useStudyStore"
import { weeklyProgress, upcomingExams } from "@/data/mock"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { EmptyState } from "@/components/ui/empty-state"
import { Search } from "lucide-react"

export default function DashboardPage() {
  const { user, notes, tasks } = useStudyStore()

  const pendingTasksCount = tasks.filter(t => !t.completed).length

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user.name}</h1>
          <p className="text-text-secondary">Here is what's happening with your studies today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-border rounded-xl p-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <Flame className={cn("w-5 h-5", user.streak > 0 ? "text-orange-500 group-hover:scale-110 transition-transform" : "text-text-tertiary")} />
          <span className="font-medium"><AnimatedCounter value={user.streak} /> Day Streak</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow group">
          <CardHeader className="pb-2">
            <CardDescription>Today's Goal</CardDescription>
            <CardTitle className="text-4xl flex items-baseline gap-2 group-hover:text-primary transition-colors">
              <AnimatedCounter value={user.todayStudied} decimals={1} /> <span className="text-lg font-medium text-text-tertiary">/ <AnimatedCounter value={user.dailyGoal} />h</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-secondary rounded-full h-2 mt-4 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min((user.todayStudied / user.dailyGoal) * 100, 100)}%` }}
              />
            </div>
            {user.todayStudied >= user.dailyGoal && (
              <p className="text-xs text-success mt-2 font-medium">Daily goal completed! 🎉</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>Weekly Progress (Hours)</CardDescription>
            <div className="flex items-end gap-2 h-[100px] mt-4">
              {weeklyProgress.map((day) => (
                <div key={day.name} className="flex-1 flex flex-col items-center justify-end gap-2 group">
                  <div 
                    className="w-full bg-primary/20 group-hover:bg-primary transition-colors rounded-t-sm cursor-pointer"
                    style={{ height: `${(day.hours / 6) * 80}px` }}
                    title={`${day.hours} hours`}
                  />
                  <span className="text-xs text-text-tertiary font-medium">{day.name}</span>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-lg mb-4 tracking-tight">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/notes?upload=true" className="group flex flex-col items-center justify-center p-6 bg-background border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1 hover:shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileUp className="w-6 h-6" />
            </div>
            <span className="font-medium text-sm">Upload Notes</span>
          </Link>
          <Link href="/quiz" className="group flex flex-col items-center justify-center p-6 bg-background border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1 hover:shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="font-medium text-sm">Generate Quiz</span>
          </Link>
          <Link href="/planner" className="group flex flex-col items-center justify-center p-6 bg-background border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1 hover:shadow-sm relative">
            {pendingTasksCount > 0 && (
              <span className="absolute top-4 right-4 flex w-3 h-3 bg-error rounded-full animate-pulse" />
            )}
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ListTodo className="w-6 h-6" />
            </div>
            <span className="font-medium text-sm">View Planner</span>
          </Link>
          <Link href="/flashcards" className="group flex flex-col items-center justify-center p-6 bg-background border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1 hover:shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Presentation className="w-6 h-6" />
            </div>
            <span className="font-medium text-sm">Flashcards</span>
          </Link>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notes */}
        <Card className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Notes</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 mt-4 flex-1">
            {notes.slice(0, 3).map(note => (
              <Link href="/notes" key={note.id} className="flex items-start justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors group">
                <div>
                  <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{note.title}</h4>
                  <p className="text-xs text-text-tertiary mb-3 line-clamp-1">{note.summary}</p>
                  <Badge variant="secondary" className="text-[10px]">{note.subject}</Badge>
                </div>
                <span className="text-xs text-text-tertiary whitespace-nowrap ml-4">{note.date}</span>
              </Link>
            ))}
            {notes.length === 0 && (
              <EmptyState 
                icon={Search}
                title="No notes yet"
                description="Upload a document to get started."
              />
            )}
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card className="flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Stay ahead of your schedule</CardDescription>
            </div>
            <Calendar className="w-5 h-5 text-text-tertiary" />
          </CardHeader>
          <CardContent className="space-y-4 mt-4 flex-1">
            {upcomingExams.map(exam => (
              <div key={exam.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">{exam.daysLeft}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{exam.title}</h4>
                  <p className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" /> {exam.date}
                  </p>
                </div>
                <Badge variant={exam.daysLeft <= 3 ? "error" : "warning"}>
                  In {exam.daysLeft} days
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
