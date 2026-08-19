import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils'
import { EASE } from '@/constants'

// ─── Props ────────────────────────────────────────────────────────────────────

interface CategoryFilterProps {
  categories: readonly string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const pillVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 8,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: EASE.outExpo,
    },
  },
}

// ─── CategoryFilter ───────────────────────────────────────────────────────────

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  const reducedMotion = useReducedMotion() ?? false
  const uid = useId()

  const layoutId = `category-active-bg-${uid}`

  return (
    <div
      className={cn(
        'w-full overflow-x-auto',
        '-mx-4 px-4',
        'sm:mx-0 sm:px-0',
        className,
      )}
      style={{
        scrollbarWidth: 'none',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="group"
        aria-label="Filter products by category"
        className={cn(
          'flex flex-nowrap items-center justify-center gap-2',
          'w-max min-w-full',
          'sm:flex-wrap sm:w-auto sm:min-w-0',
        )}
      >
        {categories.map((category) => {
          const isActive = category === activeCategory

          return (
            <motion.button
              key={category}
              type="button"
              variants={pillVariants}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.04,
                    }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : {
                      scale: 0.96,
                    }
              }
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              aria-label={`Filter by ${category}`}
              className={cn(
                // Base
                'relative isolate shrink-0 overflow-hidden',
                'px-5 py-2.5',
                'rounded-full',
                'text-sm font-semibold',
                'select-none cursor-pointer',
                'transition-all duration-250',

                // Focus
                'focus-visible:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-primary-500',
                'focus-visible:ring-offset-2',
                'focus-visible:ring-offset-white',

                // Active / inactive
                isActive
                  ? 'text-white shadow-md'
                  : [
                      'bg-white',
                      'text-neutral-600',
                      'border border-neutral-200',
                      'shadow-sm',
                      'hover:bg-neutral-50',
                      'hover:border-primary-300',
                      'hover:text-primary-700',
                    ].join(' '),
              )}
            >
              {/* Animated active background */}
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    rounded-full
                    bg-primary-700
                    z-0
                  "
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 32,
                  }}
                />
              )}

              {/* Category text */}
              <span className="relative z-10">
                {category}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}