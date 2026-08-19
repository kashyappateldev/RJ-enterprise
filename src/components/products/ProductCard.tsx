import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils'
import { EASE } from '@/constants'
import type { Product } from '@/constants/products'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product
  className?: string
  /** When true, image loads eagerly */
  priority?: boolean
}

// ─── Animation variants ───────────────────────────────────────────────────────

export const productCardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE.outExpo,
    },
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_VISIBLE_TAGS = 2

// ─── ProductCard ──────────────────────────────────────────────────────────────

export const ProductCard = memo(function ProductCard({
  product,
  className,
  priority = false,
}: ProductCardProps) {
  const reducedMotion = useReducedMotion() ?? false

  const {
    id,
    name,
    category,
    image,
    alt,
    description,
    available = true,
    origin,
    tags,
  } = product

  const visibleTags = tags?.slice(0, MAX_VISIBLE_TAGS) ?? []

  const overflowCount = Math.max(
    0,
    (tags?.length ?? 0) - visibleTags.length,
  )

  return (
    <Link
      to={`/products/${id}`}
      aria-label={`View details for ${name}`}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      <motion.article
        variants={productCardVariants}
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -6,
                transition: {
                  type: 'spring',
                  stiffness: 320,
                  damping: 26,
                },
              }
        }
        className={cn(
          // ── Card surface ──
          'group relative flex flex-col overflow-hidden rounded-2xl',
          'bg-neutral-900/80 backdrop-blur-sm',
          'border border-white/10',
          'shadow-soft',

          // ── Hover ──
          'hover:shadow-soft-xl',
          'hover:border-accent-400/40',
          'transition-[border-color,box-shadow] duration-400',

          className,
        )}
      >
        {/* ── Image region ── */}
        <div className="relative overflow-hidden aspect-[4/3] shrink-0">
          <img
            src={image}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            className={cn(
              'w-full h-full object-cover',
              'transition-transform duration-700',
              'ease-[cubic-bezier(0.19,1,0.22,1)]',
              !reducedMotion && 'group-hover:scale-[1.06]',
            )}
          />

          {/* Image gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t
                       from-neutral-950/70
                       via-neutral-950/20
                       to-transparent"
          />

          {/* Hover overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0
                       bg-neutral-950/20
                       opacity-0
                       group-hover:opacity-100
                       transition-opacity duration-500
                       pointer-events-none"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center
                         px-2.5 py-1
                         rounded-full
                         text-[10px]
                         font-bold
                         uppercase
                         tracking-[0.12em]
                         bg-black/45
                         backdrop-blur-md
                         border border-white/25
                         text-white"
            >
              {category}
            </span>
          </div>

          {/* Availability */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={cn(
                'inline-flex items-center gap-1.5',
                'px-2.5 py-1 rounded-full',
                'text-[10px] font-semibold',
                'backdrop-blur-md border',

                available
                  ? 'bg-primary-900/70 border-primary-500/50 text-primary-200'
                  : 'bg-neutral-800/70 border-neutral-600/50 text-neutral-300',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'w-1.5 h-1.5 rounded-full shrink-0',
                  available
                    ? 'bg-primary-400'
                    : 'bg-neutral-500',
                )}
              />

              {available ? 'Available' : 'Enquire'}
            </span>
          </div>
        </div>

        {/* ── Content region ── */}
        <div className="flex flex-col flex-1 p-5 gap-3">

          {/* Category */}
          <p
            className="text-[10px]
                       font-bold
                       uppercase
                       tracking-[0.14em]
                       text-accent-400"
          >
            {category}
          </p>

          {/* Product name */}
          <h3
            className="font-display
                       font-semibold
                       text-base
                       leading-snug
                       text-white
                       group-hover:text-accent-300
                       transition-colors duration-300"
          >
            {name}
          </h3>

          {/* Description */}
          <p
            className="text-sm
                       text-white/65
                       leading-relaxed
                       line-clamp-2
                       flex-1"
          >
            {description}
          </p>

          {/* Origin */}
          {origin && (
            <div className="flex items-center gap-1.5">
              <MapPin
                size={11}
                aria-hidden="true"
                className="text-white/45 shrink-0"
              />

              <span
                className="text-[11px]
                           text-white/55
                           font-medium"
              >
                {origin}
              </span>
            </div>
          )}

          {/* Tags */}
          {visibleTags.length > 0 && (
            <div
              className="flex flex-wrap items-center gap-1.5"
              aria-label={`Tags: ${tags?.join(', ')}`}
            >
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center
                             px-2 py-0.5
                             rounded-full
                             text-[10px]
                             font-medium
                             bg-white/10
                             border border-white/15
                             text-white/65"
                >
                  {tag}
                </span>
              ))}

              {overflowCount > 0 && (
                <span
                  aria-label={`${overflowCount} more tags`}
                  className="inline-flex items-center
                             px-2 py-0.5
                             rounded-full
                             text-[10px]
                             font-semibold
                             bg-accent-400/10
                             border border-accent-400/25
                             text-accent-400"
                >
                  +{overflowCount}
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div
            aria-hidden="true"
            className="h-px
                       bg-gradient-to-r
                       from-transparent
                       via-white/15
                       to-transparent"
          />

          {/* View Details */}
          <div className="flex items-center justify-end">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1
                         text-xs
                         font-semibold
                         text-white/55
                         group-hover:text-accent-400
                         transition-colors duration-300"
            >
              View Details

              <ArrowRight
                size={12}
                className="transition-transform
                           duration-300
                           group-hover:translate-x-0.5"
              />
            </span>
          </div>

        </div>
      </motion.article>
    </Link>
  )
})