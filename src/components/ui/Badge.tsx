import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

type BadgeVariant = 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral' | 'outline'
type BadgeSize    = 'sm' | 'md'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?:    BadgeSize
  dot?:     boolean
  icon?:    ReactNode
}

const variants: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-800 border border-primary-200',
  accent:  'bg-accent-100  text-accent-800  border border-accent-200',
  success: 'bg-green-100   text-green-800   border border-green-200',
  warning: 'bg-amber-100   text-amber-800   border border-amber-200',
  error:   'bg-red-100     text-red-800     border border-red-200',
  neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
  outline: 'bg-transparent text-neutral-700 border border-neutral-300',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2   py-0.5 gap-1',
  md: 'text-xs     px-2.5 py-1   gap-1.5',
}

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-primary-600',
  accent:  'bg-accent-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error:   'bg-red-500',
  neutral: 'bg-neutral-400',
  outline: 'bg-neutral-400',
}

export function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
