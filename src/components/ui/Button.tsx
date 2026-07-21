import { forwardRef, useRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'

type Variant = 'primary' | 'outline' | 'accent' | 'ghost' | 'white'
type Size    = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  icon?:     ReactNode
  iconRight?: ReactNode
  loading?:  boolean
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800 shadow-soft hover:shadow-soft-lg border border-primary-700',
  outline: 'bg-transparent text-primary-700 border border-primary-700 hover:bg-primary-700 hover:text-white',
  accent:  'bg-accent-500 text-white hover:bg-accent-600 shadow-soft hover:shadow-soft-lg border border-accent-500',
  ghost:   'bg-transparent text-neutral-700 border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300',
  white:   'bg-white text-primary-800 hover:bg-neutral-50 shadow-soft hover:shadow-soft-lg border border-white/20',
}

const sizes: Record<Size, string> = {
  sm: 'h-9  px-4  text-xs  gap-1.5',
  md: 'h-11 px-6  text-sm  gap-2',
  lg: 'h-12 px-8  text-base gap-2',
  xl: 'h-14 px-10 text-base gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconRight,
      loading = false,
      fullWidth = false,
      className,
      children,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const rippleRef = useRef<HTMLSpanElement | null>(null)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const btn  = e.currentTarget
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const x    = e.clientX - rect.left - size / 2
      const y    = e.clientY - rect.top  - size / 2

      const ripple = document.createElement('span')
      ripple.className = 'ripple-effect'
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`
      btn.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())

      onClick?.(e)
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{   scale: disabled || loading ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'relative overflow-hidden inline-flex items-center justify-center',
          'rounded-full font-medium tracking-wide',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none select-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        onClick={handleClick}
        disabled={disabled || loading}
        {...(props as object)}
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
            {iconRight && <span className="shrink-0">{iconRight}</span>}
          </>
        )}
        <span ref={rippleRef} />
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
