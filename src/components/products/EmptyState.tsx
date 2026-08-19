import { motion, useReducedMotion } from 'framer-motion'
import { SearchX }                  from 'lucide-react'
import { cn }                       from '@/utils'
import { EASE }                     from '@/constants'
import { Button }                   from '@/components/ui/Button'

// ─── Props ────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  query?:    string
  onReset:   () => void
  className?: string
}

// ─── Variant — module-scope ───────────────────────────────────────────────────

const containerVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.outExpo } },
}

const containerVariantReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({ query, onReset, className }: EmptyStateProps) {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <motion.div
      variants={reducedMotion ? containerVariantReduced : containerVariant}
      initial="hidden"
      animate="visible"
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'py-20 md:py-28 gap-6',
        className,
      )}
    >
      {/* Icon */}
      <div
        aria-hidden="true"
        className="w-20 h-20 rounded-3xl bg-neutral-100 flex items-center justify-center"
      >
        <SearchX size={34} className="text-neutral-400" />
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="font-display font-semibold text-xl text-neutral-800">
          No Products Found
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed">
          {query
            ? <>No products matched <strong className="text-neutral-700 font-medium">&ldquo;{query}&rdquo;</strong>. Try adjusting your search or clearing the active filters.</>
            : 'No products match the selected category. Try a different filter or browse the full catalogue.'}
        </p>
      </div>

      {/* Reset CTA */}
      <Button
        variant="outline"
        size="md"
        onClick={onReset}
        aria-label="Clear all active filters and search"
      >
        Clear Filters
      </Button>
    </motion.div>
  )
}
