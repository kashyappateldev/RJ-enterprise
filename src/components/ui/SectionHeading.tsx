import { motion } from 'framer-motion'
import { cn } from '@/utils'
import { VARIANTS } from '@/constants'

type Align = 'left' | 'center' | 'right'

interface SectionHeadingProps {
  eyebrow?:    string
  title:       string
  highlight?:  string
  description?: string
  align?:      Align
  className?:  string
  titleSize?:  'md' | 'lg' | 'xl'
}

const alignMap: Record<Align, string> = {
  left:   'items-start text-left',
  center: 'items-center text-center',
  right:  'items-end text-right',
}

const titleSizes = {
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-5xl md:text-6xl',
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
  titleSize = 'lg',
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!highlight) return title
    const parts = title.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="text-gradient-primary">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <motion.div
      variants={VARIANTS.staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('flex flex-col gap-4', alignMap[align], className)}
    >
      {eyebrow && (
        <motion.div variants={VARIANTS.staggerItem}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-700">
            <span className="w-6 h-px bg-primary-500" />
            {eyebrow}
            <span className="w-6 h-px bg-primary-500" />
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={VARIANTS.staggerItem}
        className={cn('font-display font-bold leading-tight tracking-tight text-neutral-900', titleSizes[titleSize])}
      >
        {renderTitle()}
      </motion.h2>

      {description && (
        <motion.p
          variants={VARIANTS.staggerItem}
          className={cn(
            'text-neutral-500 leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
