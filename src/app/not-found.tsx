import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FileQuestion } from "lucide-react"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-border">
            <FileQuestion className="w-10 h-10 text-text-tertiary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="text-text-secondary leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}>Go Back Home</Link>
            <Link href="/dashboard" className={cn(buttonVariants(), "w-full sm:w-auto")}>Go to Dashboard</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
