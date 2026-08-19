import { useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

// ─── Animation ────────────────────────────────────────────────────────────────

const wrapperVariant = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

const clearVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.6,
    transition: {
      duration: 0.15,
    },
  },
}

// ─── ProductSearch ────────────────────────────────────────────────────────────

export function ProductSearch({
  value,
  onChange,
  placeholder = 'Search products...',
  className,
}: ProductSearchProps) {
  const inputId = useId()
  const hasValue = value.length > 0

  return (
    <motion.div
      variants={wrapperVariant}
      initial="hidden"
      animate="visible"
      className={cn(
        'relative w-full max-w-2xl',
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        Search products
      </label>

      {/* Decorative inner ring */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          rounded-2xl
          ring-1 ring-inset ring-neutral-200/70
          pointer-events-none
        "
      />

      {/* Search icon */}
      <Search
        size={19}
        strokeWidth={2}
        aria-hidden="true"
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2',
          'transition-colors duration-300',
          hasValue
            ? 'text-primary-600'
            : 'text-neutral-400',
        )}
      />

      {/* Input */}
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className={cn(
          'w-full',
          'h-14',
          'rounded-2xl',
          'bg-neutral-50',
          'border border-neutral-200',
          'text-neutral-900',
          'placeholder:text-neutral-400',
          'text-sm sm:text-base',
          'font-medium',
          'pl-12',
          hasValue ? 'pr-12' : 'pr-5',

          'outline-none',
          'transition-all duration-300',

          'hover:bg-white',
          'hover:border-neutral-300',

          'focus:bg-white',
          'focus:border-primary-400',
          'focus:ring-4',
          'focus:ring-primary-100',

          '[&::-webkit-search-cancel-button]:appearance-none',
          '[&::-webkit-search-decoration]:appearance-none',
        )}
      />

      {/* Clear button */}
      <AnimatePresence>
        {hasValue && (
          <motion.button
            key="clear"
            type="button"
            variants={clearVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              text-neutral-400
              hover:text-neutral-700
              hover:bg-neutral-100
              transition-colors
            "
          >
            <X size={16} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}