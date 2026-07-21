import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { cn } from '@/utils'

interface ProductCardProps {
  image:       string
  category?:   string
  title:       string
  description: string
  href:        string
  tag?:        string
  className?:  string
}

export function ProductCard({
  image,
  category,
  title,
  description,
  href,
  tag,
  className,
}: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'group relative bg-white rounded-3xl overflow-hidden',
        'border border-neutral-100 shadow-soft hover:shadow-soft-xl',
        'transition-shadow duration-500',
        className,
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        {tag && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent" size="sm">{tag}</Badge>
          </div>
        )}

        {/* Arrow icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
                     flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        >
          <ArrowUpRight size={16} className="text-primary-700" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-2">
            {category}
          </p>
        )}
        <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700
                     hover:gap-2.5 transition-all duration-300"
        >
          View Product
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.article>
  )
}
