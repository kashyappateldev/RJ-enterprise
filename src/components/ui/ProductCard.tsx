import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { cn } from '@/utils'
import { EASE } from '@/constants'

interface ProductCardProps {
  image: string
  category?: string
  title: string
  description: string
  href: string
  tag?: string
  ctaLabel?: string
  reducedMotion?: boolean
  className?: string
  /** Makes the card compact below the sm breakpoint */
  compactOnMobile?: boolean
}

export function ProductCard({
  image,
  category,
  title,
  description,
  href,
  tag,
  ctaLabel = 'View Product',
  reducedMotion = false,
  className,
  compactOnMobile = false,
}: ProductCardProps) {
  return (
    <motion.article
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -8,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25,
              },
            }
      }
      className={cn(
        'group relative bg-white rounded-3xl overflow-hidden',
        'border border-neutral-100 shadow-soft hover:shadow-soft-xl',
        'hover:border-primary-100',
        'transition-shadow transition-colors duration-500',

        compactOnMobile
          ? 'rounded-xl sm:rounded-3xl shadow-sm sm:shadow-soft'
          : '',

        className,
      )}
    >
      {/* ── Hover glow ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-50/60
                   via-transparent to-transparent opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 pointer-events-none z-10"
      />

      {/* ── Image ── */}
      <div
        className={cn(
          'relative overflow-hidden aspect-[4/3]',
          compactOnMobile && 'aspect-square sm:aspect-[4/3]',
        )}
      >
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          whileHover={
            reducedMotion
              ? undefined
              : { scale: 1.06 }
          }
          transition={{
            duration: 0.6,
            ease: EASE.outExpo,
          }}
        />

        {/* Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent
                     to-transparent opacity-0 group-hover:opacity-100
                     transition-opacity duration-500"
        />

        {/* Tag */}
        {tag && (
          <div
            className={cn(
              'absolute top-3 left-3 z-20',
              compactOnMobile &&
                'top-1.5 left-1.5 sm:top-3 sm:left-3',
            )}
          >
            <Badge variant="accent" size="sm">
              {tag}
            </Badge>
          </div>
        )}

        {/* Arrow */}
        <div
          className={cn(
            'absolute top-3 right-3 z-20 w-9 h-9 rounded-full',
            'bg-white/90 backdrop-blur-sm flex items-center justify-center',
            'shadow-soft opacity-0 group-hover:opacity-100',
            'scale-90 group-hover:scale-100',
            'transition-all duration-300',

            compactOnMobile &&
              'top-1.5 right-1.5 w-7 h-7 sm:top-3 sm:right-3 sm:w-9 sm:h-9',
          )}
        >
          <ArrowUpRight
            size={compactOnMobile ? 13 : 16}
            className="text-primary-700"
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className={cn(
          'relative z-20 p-5',
          compactOnMobile && 'p-2.5 sm:p-5',
        )}
      >
        {category && (
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-widest text-primary-600 mb-2',
              compactOnMobile &&
                'text-[8px] sm:text-xs tracking-[0.08em] sm:tracking-widest mb-1 sm:mb-2',
            )}
          >
            {category}
          </p>
        )}

        <h3
          className={cn(
            'font-display font-semibold text-lg text-neutral-900 mb-2',
            'group-hover:text-primary-700 transition-colors duration-300',

            compactOnMobile &&
              'text-[11px] leading-tight mb-1 sm:text-lg sm:leading-normal sm:mb-2',
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            'text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4',

            compactOnMobile &&
              'text-[9px] leading-tight line-clamp-2 mb-2 sm:text-sm sm:leading-relaxed sm:mb-4',
          )}
        >
          {description}
        </p>

        {/* ── CTA ── */}
        <Link
          to={href}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-semibold',
            'text-primary-700 hover:gap-3 transition-all duration-300',

            // Hide Learn More on mobile, keep it from sm breakpoint upward
            compactOnMobile && 'hidden sm:inline-flex',
          )}
          aria-label={`${ctaLabel}: ${title}`}
        >
          {ctaLabel}

          <ArrowRight
            size={compactOnMobile ? 11 : 14}
            className="sm:w-[14px] sm:h-[14px]"
          />
        </Link>
      </div>
    </motion.article>
  )
}