"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { subjects } from "@/data/mock"
import { Search, Plus, Bookmark, Loader2, FileUp, Sparkles, MoreVertical, Share, Edit2, Trash2 } from "lucide-react"
import { useStudyStore } from "@/store/useStudyStore"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function NotesContent() {
  const { notes, addNote, toggleBookmark, unlockAchievement, incrementStudied } = useStudyStore()
  const [search, setSearch] = useState("")
  const [filterSubject, setFilterSubject] = useState<string>("All")
  
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [summaryState, setSummaryState] = useState<{ id: string | null, step: number, result: string | null }>({ id: null, step: 0, result: null })

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("upload") === "true") {
      setTimeout(() => fileInputRef.current?.click(), 500)
    }
  }, [searchParams])

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase())
    const matchesSubject = filterSubject === "All" || n.subject === filterSubject
    return matchesSearch && matchesSubject
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      const newNote = {
        id: Math.random().toString(36).substring(7),
        title: file.name.replace(/\.[^/.]+$/, ""),
        subject: subjects[Math.floor(Math.random() * subjects.length)].name,
        date: "Just now",
        summary: "Click generate summary to extract concepts from this document.",
        bookmarked: false,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      }
      addNote(newNote)
      toast.success("Note uploaded successfully.")
      unlockAchievement("First Upload")
      incrementStudied(0.5)
      
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 2000)
  }

  const generateSummary = (id: string) => {
    setSummaryState({ id, step: 1, result: null })
    
    setTimeout(() => setSummaryState(prev => ({ ...prev, step: 2 })), 1500)
    setTimeout(() => setSummaryState(prev => ({ ...prev, step: 3 })), 3000)
    setTimeout(() => {
      setSummaryState({ 
        id: null, 
        step: 0, 
        result: "This document covers the fundamental principles of the topic. Key concepts include modularity, time-space tradeoffs, and standard optimization techniques. Recommended reading time: 15 mins."
      })
      toast.success("Summary ready.")
      unlockAchievement("Fast Learner")
    }, 4500)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept=".pdf,.docx,.txt"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Notes</h1>
          <p className="text-text-secondary">Organize, read, and summarize your study material.</p>
        </div>
        <Button 
          className="gap-2 shrink-0" 
          onClick={() => fileInputRef.current?.click()}
          isLoading={isUploading}
        >
          {!isUploading && <Plus className="w-4 h-4" />}
          {isUploading ? "Uploading..." : "Upload Notes"}
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:max-w-xs transition-all focus-within:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <Input 
            placeholder="Search notes..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Subjects Filter */}
      <div className="space-y-4">
        <h3 className="font-medium text-text-secondary uppercase text-xs tracking-wider">Subjects</h3>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="outline" 
            className={cn("cursor-pointer py-1.5 px-4 text-sm font-medium transition-colors hover:scale-105", filterSubject === "All" ? "border-primary text-primary bg-primary/5 shadow-sm" : "hover:bg-secondary")}
            onClick={() => setFilterSubject("All")}
          >
            All Subjects
          </Badge>
          {subjects.map(sub => (
            <Badge 
              key={sub.id} 
              variant="outline" 
              className={cn("cursor-pointer py-1.5 px-4 text-sm font-medium transition-colors hover:scale-105", filterSubject === sub.name ? "border-primary text-primary bg-primary/5 shadow-sm" : "hover:bg-secondary")}
              onClick={() => setFilterSubject(sub.name)}
            >
              {sub.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <motion.div 
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full bg-background relative overflow-hidden">
                <CardHeader className="pb-3 flex flex-row items-start justify-between">
                  <Badge variant="secondary" className="font-medium text-xs">{note.subject}</Badge>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(note.id); }}
                      className="text-text-tertiary hover:text-primary transition-colors p-1.5 rounded-full hover:bg-secondary/80"
                    >
                      <Bookmark className={cn("w-4 h-4 transition-transform active:scale-75", note.bookmarked && "fill-primary text-primary")} />
                    </button>
                    
                    {/* Context Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <button className="text-text-tertiary hover:text-primary transition-colors p-1.5 rounded-full hover:bg-secondary/80">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast("Link copied to clipboard.") }}>
                          <Share className="w-4 h-4 mr-2" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Edit2 className="w-4 h-4 mr-2" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-error focus:text-error focus:bg-error/10">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between relative">
                  <div>
                    <CardTitle className="mb-2 text-lg leading-tight group-hover:text-primary transition-colors">{note.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed mb-4 min-h-[60px]">
                      {summaryState.id === note.id ? (
                        <div className="space-y-2 mt-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-4/6" />
                        </div>
                      ) : (
                        summaryState.result && summaryState.id === null ? summaryState.result : note.summary
                      )}
                    </CardDescription>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0"
                      onClick={(e) => { e.stopPropagation(); generateSummary(note.id); }}
                      disabled={summaryState.id !== null}
                    >
                      <Sparkles className="w-3 h-3 text-primary" />
                      Generate Summary
                    </Button>

                    <div className="flex items-center justify-between text-xs text-text-tertiary pt-4 border-t border-border">
                      <span className="font-medium">{note.size || "1.2 MB"}</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                </CardContent>

                {/* Loading Overlay */}
                {summaryState.id === note.id && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-10 animate-in fade-in duration-300">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                    <p className="font-medium text-sm text-text-primary animate-pulse bg-background/80 px-3 py-1 rounded-full shadow-sm">
                      {summaryState.step === 1 && "Analyzing notes..."}
                      {summaryState.step === 2 && "Extracting concepts..."}
                      {summaryState.step === 3 && "Preparing summary..."}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotes.length === 0 && (
          <EmptyState 
            icon={Search}
            title="No notes found"
            description="We couldn't find any notes matching your search or filter criteria."
            action={<Button variant="outline" onClick={() => {setSearch(""); setFilterSubject("All")}}>Clear Filters</Button>}
          />
        )}
      </div>
    </div>
  )
}

export default function NotesPage() {
  return (
    <Suspense fallback={
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
      </div>
    }>
      <NotesContent />
    </Suspense>
  )
}
