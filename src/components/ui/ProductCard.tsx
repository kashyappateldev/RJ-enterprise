import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { cn } from '@/utils'
import { EASE } from '@/constants'

interface ProductCardProps {
  image:          string
  category?:      string
  title:          string
  description:    string
  href:           string
  tag?:           string
  ctaLabel?:      string
  reducedMotion?: boolean
  className?:     string
}

export function ProductCard({
  image,
  category,
  title,
  description,
  href,
  tag,
  ctaLabel      = 'View Product',
  reducedMotion = false,
  className,
}: ProductCardProps) {
  return (
    <motion.article
      whileHover={
        reducedMotion
          ? undefined
          : { y: -8, transition: { type: 'spring', stiffness: 300, damping: 25 } }
      }
      className={cn(
        'group relative bg-white rounded-3xl overflow-hidden',
        'border border-neutral-100 shadow-soft hover:shadow-soft-xl',
        'hover:border-primary-100',
        'transition-shadow transition-colors duration-500',
        className,
      )}
    >
      {/* ── Hover glow — opacity only, GPU composited ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-50/60
                   via-transparent to-transparent opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 pointer-events-none z-10"
      />

      {/* ── Image ── */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          whileHover={reducedMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
        />

        {/* Overlay — fades in on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent
                     to-transparent opacity-0 group-hover:opacity-100
                     transition-opacity duration-500"
        />

        {/* Tag */}
        {tag && (
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="accent" size="sm">{tag}</Badge>
          </div>
        )}

        {/* Arrow icon — appears on hover */}
        <div
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full
                     bg-white/90 backdrop-blur-sm flex items-center justify-center
                     shadow-soft opacity-0 group-hover:opacity-100
                     scale-90 group-hover:scale-100
                     transition-all duration-300"
        >
          <ArrowUpRight size={16} className="text-primary-700" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 p-5">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-2">
            {category}
          </p>
        )}
        <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2
                       group-hover:text-primary-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* CTA — icon slides right on hover */}
        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold
                     text-primary-700 hover:gap-3 transition-all duration-300"
          aria-label={`${ctaLabel}: ${title}`}
        >
          {ctaLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  )
}
