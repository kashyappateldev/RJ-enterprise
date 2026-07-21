import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { IconWrapper } from './IconWrapper'
import { cn } from '@/utils'

type FeatureVariant = 'default' | 'bordered' | 'filled'

interface FeatureCardProps {
  icon:        ReactNode
  title:       string
  description: string
  variant?:    FeatureVariant
  className?:  string
  index?:      number
}

const variantMap: Record<FeatureVariant, string> = {
  default:  'bg-white border border-neutral-100 shadow-soft hover:shadow-soft-lg hover:border-primary-200',
  bordered: 'bg-white border-2 border-neutral-200 hover:border-primary-500',
  filled:   'bg-primary-50 border border-primary-100 hover:bg-primary-100',
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = 'default',
  className,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative rounded-2xl p-6 transition-all duration-400 cursor-default',
        variantMap[variant],
        className,
      )}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <IconWrapper
        variant="primary"
        size="lg"
        className="mb-5 group-hover:bg-primary-700 group-hover:text-white transition-colors duration-300"
      >
        {icon}
      </IconWrapper>

      <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-neutral-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
