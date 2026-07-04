"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={300}>
        {children}
      </TooltipProvider>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'rgba(24, 24, 27, 0.6)', /* Glass card */
            backdropFilter: 'blur(12px)',
            color: '#FAFAFA',
            border: '1px solid rgba(16, 185, 129, 0.4)', /* Green success border */
            borderRadius: '12px',
          },
          className: 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
        }}
      />
    </NextThemesProvider>
  )
}
