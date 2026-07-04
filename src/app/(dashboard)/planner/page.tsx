"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { upcomingExams } from "@/data/mock"
import { Calendar, Play, Pause, RefreshCw, CheckCircle2, Clock, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStudyStore, Task } from "@/store/useStudyStore"
import { toast } from "sonner"
import { motion, Reorder, AnimatePresence } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function PlannerPage() {
  const { tasks, addTask, toggleTask, deleteTask, incrementStudied } = useStudyStore()
  
  // Pomodoro State
  const [pomodoroState, setPomodoroState] = useState<"idle" | "running" | "paused">("idle")
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  
  // Task State
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (pomodoroState === "running" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && pomodoroState === "running") {
      setPomodoroState("idle")
      setTimeLeft(25 * 60)
      toast.success("Focus session complete! Take a 5 minute break.", { icon: "🍅" })
      incrementStudied(25 / 60)
    }
    return () => clearInterval(interval)
  }, [pomodoroState, timeLeft, incrementStudied])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const handleResetPomodoro = () => {
    setPomodoroState("idle")
    setTimeLeft(25 * 60)
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    
    addTask({
      id: Math.random().toString(),
      title: newTaskTitle,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject: "General",
      completed: false
    })
    setNewTaskTitle("")
    toast.success("Task added.")
  }

  const handleDelete = (id: string) => {
    deleteTask(id)
    toast("Task deleted.")
  }

  const totalTime = 25 * 60
  const dashOffset = 283 - ((timeLeft / totalTime) * 283)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Study Planner</h1>
        <p className="text-text-secondary">Organize your schedule and track your daily tasks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Pomodoro & Upcoming */}
        <div className="space-y-8">
          
          {/* Pomodoro Timer */}
          <Card className="border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gradient-to-b from-background to-secondary/20 transition-all hover:shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Pomodoro Focus</CardTitle>
              <CardDescription>Stay focused for 25 minutes</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-6">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="stroke-secondary stroke-[4] fill-none" />
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    className="stroke-primary stroke-[4] fill-none transition-all duration-1000 ease-linear" 
                    strokeDasharray="283" 
                    strokeDashoffset={dashOffset} 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold tracking-tighter tabular-nums">{formatTime(timeLeft)}</span>
                  <span className="text-xs text-text-tertiary font-medium uppercase tracking-widest mt-1">Focus</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={handleResetPomodoro}>
                      <RefreshCw className="w-5 h-5 text-text-secondary" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset Timer</TooltipContent>
                </Tooltip>

                <Button 
                  size="lg" 
                  className={cn("rounded-full px-8 shadow-md transition-all active:scale-95", pomodoroState === "running" ? "bg-warning hover:bg-warning/90 text-white" : "")}
                  onClick={() => setPomodoroState(pomodoroState === "running" ? "paused" : "running")}
                >
                  {pomodoroState === "running" ? (
                    <><Pause className="w-5 h-5 mr-2" /> Pause</>
                  ) : (
                    <><Play className="w-5 h-5 mr-2" /> {timeLeft < 25*60 ? "Resume" : "Start Focus"}</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-text-tertiary" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingExams.map(exam => (
                <div key={exam.id} className="flex flex-col p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{exam.title}</span>
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", exam.daysLeft <= 4 ? "bg-error/10 text-error" : "bg-warning/10 text-warning")}>
                      {exam.daysLeft} days
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">{exam.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Today's Tasks */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-border">
              <div>
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>Stay on top of your study plan. Drag to reorder.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              
              <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
                <Input 
                  placeholder="What do you need to study?" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="gap-2 shrink-0">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </form>

              <div className="space-y-2 overflow-hidden flex-1">
                <Reorder.Group axis="y" values={localTasks} onReorder={setLocalTasks} className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {localTasks.map((task) => (
                      <Reorder.Item 
                        key={task.id} 
                        value={task}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={cn("flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 group cursor-grab active:cursor-grabbing", task.completed ? "bg-secondary/40 border-transparent opacity-70" : "bg-background border-border hover:border-primary/30 shadow-sm hover:shadow-md")}
                      >
                        <button 
                          onClick={() => {
                            toggleTask(task.id)
                            if (!task.completed) toast.success("Task completed!")
                          }}
                          className="mt-0.5 shrink-0 active:scale-75 transition-transform"
                        >
                          <CheckCircle2 className={cn("w-6 h-6 transition-colors", task.completed ? "text-primary" : "text-border hover:text-primary/50")} />
                        </button>
                        
                        <div className="flex-1 space-y-1">
                          <h4 className={cn("font-medium text-sm transition-all", task.completed && "line-through text-text-secondary")}>{task.title}</h4>
                          <div className="flex items-center gap-3 text-xs text-text-tertiary">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {task.time}</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-secondary text-text-secondary font-medium">{task.subject}</span>
                          </div>
                        </div>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-text-tertiary hover:text-error p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Task</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{task.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(task.id)} className="bg-error hover:bg-error/90 text-white">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
                
                {localTasks.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-text-secondary">
                    No tasks for today. Add one above!
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
