import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80":
            variant === "default",
          "border-transparent bg-secondary text-text-primary hover:bg-secondary/80":
            variant === "secondary",
          "border-transparent bg-success/10 text-success hover:bg-success/20":
            variant === "success",
          "border-transparent bg-warning/10 text-warning hover:bg-warning/20":
            variant === "warning",
          "border-transparent bg-error/10 text-error hover:bg-error/20":
            variant === "error",
          "text-text-primary": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
