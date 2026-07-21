import { motion } from 'framer-motion'
import { cn } from '@/utils'
import type { ReactNode } from 'react'

interface ImageCardProps {
  src:        string
  alt:        string
  title?:     string
  subtitle?:  string
  overlay?:   boolean
  aspect?:    'square' | 'video' | 'portrait' | 'wide'
  children?:  ReactNode
  className?: string
}

const aspectMap = {
  square:   'aspect-square',
  video:    'aspect-video',
  portrait: 'aspect-[3/4]',
  wide:     'aspect-[16/7]',
}

export function ImageCard({
  src,
  alt,
  title,
  subtitle,
  overlay = true,
  aspect = 'video',
  children,
  className,
}: ImageCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-xl transition-shadow duration-500',
        aspectMap[aspect],
        className,
      )}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      />

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      )}

      {(title || subtitle || children) && (
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          {subtitle && (
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
              {subtitle}
            </p>
          )}
          {title && (
            <h3 className="font-display font-semibold text-white text-lg leading-snug">
              {title}
            </h3>
          )}
          {children}
        </div>
      )}
    </motion.div>
  )
}
