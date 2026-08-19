import { useMemo }                          from 'react'
import { motion, useReducedMotion }         from 'framer-motion'
import { SectionHeading }                   from '@/components/ui/SectionHeading'
import { ProductCard, productCardVariants } from './ProductCard'
import { PRODUCTS }                         from '@/constants/products'

// ─── Variants — module-scope ──────────────────────────────────────────────────

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const gridVariantsReduced = {
  hidden:  {},
  visible: {},
}

// ─── FeaturedProducts ─────────────────────────────────────────────────────────

export function FeaturedProducts() {
  const featured = useMemo(() => PRODUCTS.filter((p) => p.featured), [])
  const reducedMotion = useReducedMotion() ?? false

  if (featured.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Featured Selection"
          title="Featured Products"
          highlight="Featured"
          description="A curated selection of our most sought-after agricultural products — trusted by wholesalers, distributors, and food businesses for consistent quality and reliable supply."
          align="center"
          titleSize="md"
          className="mb-12 md:mb-16"
        />

        <motion.ul
          variants={reducedMotion ? gridVariantsReduced : gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
          aria-label="Featured products"
        >
          {featured.map((product, i) => (
            <motion.li
              key={product.id}
              variants={reducedMotion ? undefined : productCardVariants}
              className="list-none"
            >
              <ProductCard product={product} priority={i < 2} />
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  )
}
