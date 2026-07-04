"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Repeat } from "lucide-react"

interface FlashcardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  className?: string
}

export function Flashcard({ frontContent, backContent, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped)
      setIsAnimating(true)
    }
  }

  return (
    <div 
      className={cn("w-full h-64 md:h-80 perspective-1000 cursor-pointer group", className)}
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {/* Front */}
        <Card className="absolute w-full h-full backface-hidden border-2 hover:border-primary/50 transition-colors flex flex-col">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Repeat className="w-4 h-4 text-text-tertiary" />
          </div>
          <CardContent className="flex-1 flex items-center justify-center p-8 text-center text-lg font-medium">
            {frontContent}
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute w-full h-full backface-hidden border-2 border-primary/30 bg-primary/5 flex flex-col" style={{ transform: "rotateY(180deg)" }}>
          <CardContent className="flex-1 flex items-center justify-center p-8 text-center text-lg">
            {backContent}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
