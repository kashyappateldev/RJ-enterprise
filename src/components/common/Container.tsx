import type { HTMLAttributes, ElementType } from 'react'
import { cn } from '@/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full'
  as?: ElementType
}

const sizeMap: Record<NonNullable<ContainerProps['size']>, string> = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-7xl',
  xl:   'max-w-[88rem]',
  wide: 'max-w-[96rem]',
  full: 'max-w-full',
}

export function Container({
  size = 'lg',
  as: Tag = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)}
      {...(props as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  )
}
