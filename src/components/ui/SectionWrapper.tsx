import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'
import { Container } from '@/components/common'

type BgVariant = 'white' | 'light' | 'dark' | 'primary' | 'transparent'
type PadSize   = 'sm' | 'md' | 'lg' | 'xl'
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full'

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  bg?:            BgVariant
  pad?:           PadSize
  containerSize?: ContainerSize
  children:       ReactNode
  as?:            'section' | 'div' | 'article'
}

const bgMap: Record<BgVariant, string> = {
  white:       'bg-white',
  light:       'bg-neutral-50',
  dark:        'bg-neutral-900 text-white',
  primary:     'bg-primary-700 text-white',
  transparent: 'bg-transparent',
}

const padMap: Record<PadSize, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
}

export function SectionWrapper({
  bg = 'white',
  pad = 'md',
  containerSize = 'lg',
  as: Tag = 'section',
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag className={cn(bgMap[bg], padMap[pad], className)} {...props}>
      <Container size={containerSize}>{children}</Container>
    </Tag>
  )
}
