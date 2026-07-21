import type { HTMLAttributes } from 'react'
import { cn } from '@/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg'
  as?: 'section' | 'div' | 'article' | 'main'
}

const paddingMap = {
  sm: 'py-10 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
}

export function Section({ size = 'md', as: Tag = 'section', className, children, ...props }: SectionProps) {
  return (
    <Tag className={cn(paddingMap[size], className)} {...props}>
      {children}
    </Tag>
  )
}
