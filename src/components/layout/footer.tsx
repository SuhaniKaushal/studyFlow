"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Layers } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">StudyFlow</span>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              Build better study habits. StudyFlow is an intelligent study management platform designed for students who want to excel.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Features coming soon.") }} className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Pricing coming soon.") }} className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Changelog coming soon.") }} className="hover:text-primary transition-colors">Changelog</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Download coming soon.") }} className="hover:text-primary transition-colors">Download</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Company</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("About page coming soon.") }} className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Blog coming soon.") }} className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Careers coming soon.") }} className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Contact coming soon.") }} className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Legal</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Privacy Policy coming soon.") }} className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Terms of Service coming soon.") }} className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Cookie Policy coming soon.") }} className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-tertiary">
          <p>© {new Date().getFullYear()} StudyFlow Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Opening Twitter...") }} className="hover:text-text-primary transition-colors">Twitter</Link>
            <Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Opening GitHub...") }} className="hover:text-text-primary transition-colors">GitHub</Link>
            <Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Opening Discord...") }} className="hover:text-text-primary transition-colors">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
