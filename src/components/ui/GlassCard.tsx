import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'

type GlassVariant = 'dark' | 'light'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:  GlassVariant
  hover?:    boolean
  padding?:  'sm' | 'md' | 'lg'
  children:  ReactNode
}

const padMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function GlassCard({
  variant = 'dark',
  hover = true,
  padding = 'md',
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'rounded-2xl transition-shadow duration-300',
        variant === 'dark'  && 'glass',
        variant === 'light' && 'glass-light',
        hover && 'hover:shadow-soft-xl cursor-pointer',
        padMap[padding],
        className,
      )}
      {...(props as object)}
    >
      {children}
    </motion.div>
  )
}
