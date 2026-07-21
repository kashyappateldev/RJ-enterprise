import { type MouseEvent, type KeyboardEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { cn } from '@/utils'
import { TRANSITION } from '@/constants'

// ─── Types ───────────────────────────────────────────────────────────────────

type AspectRatio = 'square' | 'video' | 'portrait' | 'wide' | 'auto'
type Rounded     = 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export interface ImageCardProps {
  /** Image source URL */
  image:             string
  /** Alt text — required for accessibility */
  alt:               string
  /** Bold title rendered bottom-left over the overlay */
  title?:            string
  /** Smaller subtitle rendered below the title */
  subtitle?:         string
  /** 0–1 opacity of the gradient overlay. Defaults to 0.55 */
  overlayOpacity?:   number
  /** Aspect ratio preset. Defaults to 'video' */
  aspect?:           AspectRatio
  /** Border-radius preset. Defaults to '2xl' */
  rounded?:          Rounded
  /** Optional click handler — makes the card interactive */
  onClick?:          (e: MouseEvent<HTMLDivElement>) => void
  /** Slot for any extra content rendered inside the overlay area */
  children?:         ReactNode
  /** Extra classes on the root element */
  className?:        string
  /** Disable the hover zoom + lift. Defaults to false */
  disableHover?:     boolean
  /** Lazy-load the image. Defaults to true */
  lazy?:             boolean
}

// ─── Maps ────────────────────────────────────────────────────────────────────

const aspectMap: Record<AspectRatio, string> = {
  square:   'aspect-square',
  video:    'aspect-video',
  portrait: 'aspect-[3/4]',
  wide:     'aspect-[16/7]',
  auto:     '',
}

const roundedMap: Record<Rounded, string> = {
  md:   'rounded-md',
  lg:   'rounded-lg',
  xl:   'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ImageCard({
  image,
  alt,
  title,
  subtitle,
  overlayOpacity = 0.55,
  aspect = 'video',
  rounded = '2xl',
  onClick,
  children,
  className,
  disableHover = false,
  lazy = true,
}: ImageCardProps) {
  const isInteractive = Boolean(onClick)

  // Subtle tilt on mouse move — only when interactive
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disableHover || !isInteractive) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick?.(e as unknown as MouseEvent<HTMLDivElement>)
    }
  }

  return (
    <motion.div
      style={isInteractive && !disableHover ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      whileHover={disableHover ? undefined : { y: -8, scale: 1.01 }}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      transition={TRANSITION.base}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? (title ?? alt) : undefined}
      className={cn(
        'group relative overflow-hidden',
        'shadow-soft hover:shadow-soft-xl transition-shadow duration-500',
        aspectMap[aspect],
        roundedMap[rounded],
        isInteractive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className,
      )}
    >
      {/* ── Image ── */}
      <motion.img
        src={image}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className="w-full h-full object-cover"
        whileHover={disableHover ? undefined : { scale: 1.07 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* ── Gradient overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── Subtle top vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"
      />

      {/* ── Text content ── */}
      {(title || subtitle || children) && (
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1">
          {/* Slide up slightly on hover */}
          <motion.div
            className="flex flex-col gap-1"
            initial={false}
            whileHover={disableHover ? undefined : { y: -4 }}
            transition={TRANSITION.fast}
          >
            {subtitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 leading-none">
                {subtitle}
              </p>
            )}
            {title && (
              <h3 className="font-display font-semibold text-white leading-snug text-base sm:text-lg drop-shadow-sm">
                {title}
              </h3>
            )}
          </motion.div>

          {children && (
            <div className="mt-1">
              {children}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
