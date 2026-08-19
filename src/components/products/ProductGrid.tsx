import { motion, useReducedMotion }         from 'framer-motion'
import { cn }                               from '@/utils'
import { ProductCard, productCardVariants } from './ProductCard'
import type { Product }                     from '@/constants/products'

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductGridProps {
  products:      Product[]
  /** Changing this key re-triggers the stagger when filters change */
  animationKey?: string
  className?:    string
}

// ─── Variants — module-scope ──────────────────────────────────────────────────

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

const gridVariantsReduced = {
  hidden:  {},
  visible: {},
}

// ─── ProductGrid ──────────────────────────────────────────────────────────────

export function ProductGrid({ products, animationKey, className }: ProductGridProps) {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <motion.ul
      key={animationKey}
      variants={reducedMotion ? gridVariantsReduced : gridVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7',
        className,
      )}
      aria-label="Products"
    >
      {products.map((product) => (
        <motion.li
          key={product.id}
          variants={reducedMotion ? undefined : productCardVariants}
          className="list-none"
        >
          <ProductCard product={product} />
        </motion.li>
      ))}
    </motion.ul>
  )
}
