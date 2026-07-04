import Link from "next/link"
import { Layers } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">StudyFlow</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
          <Link href="#features" className="hover:text-text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-text-primary transition-colors">How it works</Link>
          <Link href="#testimonials" className="hover:text-text-primary transition-colors">Testimonials</Link>
          <Link href="#faq" className="hover:text-text-primary transition-colors">FAQ</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}>Log in</Link>
          <Link href="/dashboard" className={buttonVariants()}>Get Started</Link>
        </div>
      </div>
    </header>
  )
}
