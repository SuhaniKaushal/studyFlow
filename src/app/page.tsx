import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, BrainCircuit, CalendarDays, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm font-medium text-text-secondary mb-8 border border-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            StudyFlow 1.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-text-primary">
            Study smarter, <br className="hidden md:block" />
            <span className="text-text-tertiary">not harder.</span>
          </h1>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Organize notes, revise efficiently, practice smarter and stay consistent with one modern study platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto gap-2 group")}>
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#features" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>
              View Demo
            </Link>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-24 bg-secondary/30 border-y border-border" id="features">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4 tracking-tight">Everything you need to excel</h2>
              <p className="text-text-secondary max-w-xl mx-auto">A unified workflow designed for serious students. No distractions, just focus.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Smart Notes",
                  desc: "Organize your lectures with folder structures and instant summaries."
                },
                {
                  icon: BrainCircuit,
                  title: "Active Recall",
                  desc: "Build spaced repetition flashcards and test yourself efficiently."
                },
                {
                  icon: CalendarDays,
                  title: "Study Planner",
                  desc: "Schedule sessions with the built-in calendar and Pomodoro timer."
                },
                {
                  icon: LineChart,
                  title: "Progress Analytics",
                  desc: "Track your consistency, study hours, and mastery across subjects."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
