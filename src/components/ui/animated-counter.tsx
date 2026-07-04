"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export function AnimatedCounter({ value, prefix = "", suffix = "", className, decimals = 0 }: AnimatedCounterProps) {
  const [mounted, setMounted] = useState(false)
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) => current.toFixed(decimals))

  useEffect(() => {
    setMounted(true)
    spring.set(value)
  }, [value, spring])

  if (!mounted) {
    return <span className={className}>{prefix}{value.toFixed(decimals)}{suffix}</span>
  }

  return (
    <span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
