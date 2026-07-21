import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

type IconVariant = 'primary' | 'accent' | 'neutral' | 'white' | 'ghost'
type IconSize    = 'sm' | 'md' | 'lg' | 'xl'

interface IconWrapperProps extends HTMLAttributes<HTMLDivElement> {
  variant?:  IconVariant
  size?:     IconSize
  rounded?:  'md' | 'lg' | 'xl' | 'full'
  children:  ReactNode
}

const variants: Record<IconVariant, string> = {
  primary: 'bg-primary-100 text-primary-700',
  accent:  'bg-accent-100  text-accent-700',
  neutral: 'bg-neutral-100 text-neutral-600',
  white:   'bg-white/15    text-white',
  ghost:   'bg-transparent text-neutral-500',
}

const sizes: Record<IconSize, string> = {
  sm: 'w-8  h-8  [&>svg]:w-4 [&>svg]:h-4',
  md: 'w-11 h-11 [&>svg]:w-5 [&>svg]:h-5',
  lg: 'w-14 h-14 [&>svg]:w-6 [&>svg]:h-6',
  xl: 'w-18 h-18 [&>svg]:w-8 [&>svg]:h-8',
}

const roundedMap = {
  md:   'rounded-md',
  lg:   'rounded-xl',
  xl:   'rounded-2xl',
  full: 'rounded-full',
}

export function IconWrapper({
  variant = 'primary',
  size = 'md',
  rounded = 'xl',
  className,
  children,
  ...props
}: IconWrapperProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0 transition-colors duration-300',
        variants[variant],
        sizes[size],
        roundedMap[rounded],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
