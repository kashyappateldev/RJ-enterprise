import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionWrapper }  from '@/components/ui/SectionWrapper'
import { SectionHeading }  from '@/components/ui/SectionHeading'
import { ProductCard }     from '@/components/ui/ProductCard'
import { Button }          from '@/components/ui/Button'
import { cn }              from '@/utils'
import { EASE }            from '@/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Seeds' | 'Grains' | 'Spices'

interface Product {
  id:          string
  title:       string
  category:    Exclude<Category, 'All'>
  description: string
  image:       string
  href:        string
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = ['All', 'Seeds', 'Grains', 'Spices']

const PRODUCTS: Product[] = [
  {
    id:          'jeera',
    title:       'Jeera',
    category:    'Spices',
    description: 'Premium quality cumin sourced directly from trusted farmers.',
    image:       'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=75&auto=format&fit=crop',
    href:        '/products/jeera',
  },
  {
    id:          'sesame-seeds',
    title:       'Sesame Seeds',
    category:    'Seeds',
    description: 'High-quality sesame with excellent purity and natural aroma.',
    image:       'https://images.unsplash.com/photo-1612257416648-8a4a3e0e1e1e?w=600&q=75&auto=format&fit=crop',
    href:        '/products/sesame-seeds',
  },
  {
    id:          'coriander-seeds',
    title:       'Coriander Seeds',
    category:    'Spices',
    description: 'Fresh coriander seeds with rich aroma and superior quality.',
    image:       'https://images.unsplash.com/photo-1599909631928-3e5e571e5e1e?w=600&q=75&auto=format&fit=crop',
    href:        '/products/coriander-seeds',
  },
  {
    id:          'ajwain',
    title:       'Ajwain',
    category:    'Spices',
    description: 'Carefully selected ajwain with superior quality and purity.',
    image:       'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=75&auto=format&fit=crop',
    href:        '/products/ajwain',
  },
  {
    id:          'chana',
    title:       'Chana',
    category:    'Grains',
    description: 'Nutritious and premium quality chickpeas from trusted farms.',
    image:       'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=75&auto=format&fit=crop',
    href:        '/products/chana',
  },
  {
    id:          'mustard',
    title:       'Mustard',
    category:    'Seeds',
    description: 'Premium mustard seeds sourced from trusted farms across India.',
    image:       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75&auto=format&fit=crop',
    href:        '/products/mustard',
  },
]

// ─── Animation variants — module-scope, never recreated ──────────────────────

const pillContainerVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const pillVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 8 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.4, ease: EASE.outExpo },
  },
}

const gridVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE.outExpo },
  },
}

const ctaVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE.outExpo },
  },
}

// ─── CategoryPill sub-component ───────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label:    Category
  active:   boolean
  onClick:  () => void
}) {
  return (
    <motion.button
      variants={pillVariants}
      whileHover={
        active
          ? undefined
          : { scale: 1.04, transition: { type: 'spring', stiffness: 380, damping: 22 } }
      }
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'relative px-5 py-2 rounded-full text-sm font-semibold',
        'transition-colors duration-250',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'select-none cursor-pointer',
        active
          ? 'bg-primary-700 text-white shadow-soft'
          : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-700',
      )}
    >
      {/* Active indicator dot */}
      {active && (
        <motion.span
          layoutId="pill-active-bg"
          className="absolute inset-0 rounded-full bg-primary-700 -z-10"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      {label}
    </motion.button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProductsShowcaseSection() {
  const reducedMotion                   = useReducedMotion() ?? false
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  // Derived — no useMemo needed, PRODUCTS is a module constant (6 items max)
  const visibleProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <SectionWrapper
      bg="white"
      pad="lg"
      containerSize="lg"
      aria-label="Featured products"
    >
      {/* ── Heading ── */}
      <SectionHeading
        eyebrow="Featured Products"
        title="Premium Agricultural Commodities"
        highlight="Agricultural Commodities"
        description="Explore some of our carefully sourced agricultural products trusted by businesses across India."
        align="center"
        titleSize="md"
        className="mb-10 md:mb-12"
      />

      {/* ── Category filter pills ── */}
      <motion.div
        variants={pillContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-wrap items-center justify-center gap-2.5 mb-12 md:mb-14"
        role="group"
        aria-label="Filter products by category"
      >
        {CATEGORIES.map(cat => (
          <CategoryPill
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </motion.div>

      {/* ── Product grid ── */}
      <motion.div
        key={activeCategory}               // re-triggers stagger when category changes
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
      >
        {visibleProducts.map(product => (
          <motion.div key={product.id} variants={cardVariants}>
            <ProductCard
              image={product.image}
              category={product.category}
              title={product.title}
              description={product.description}
              href={product.href}
              tag={product.category}
              ctaLabel="Learn More"
              reducedMotion={reducedMotion}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Empty state — shown when a filter returns no results ── */}
      {visibleProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center text-neutral-400 text-sm"
        >
          No products in this category yet.
        </motion.div>
      )}

      {/* ── Bottom CTA ── */}
      <motion.div
        variants={ctaVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-14 md:mt-16 flex flex-col items-center gap-3"
      >
        {/* Divider accent */}
        <div
          aria-hidden="true"
          className="w-16 h-px mb-2 bg-gradient-to-r from-transparent via-primary-300 to-transparent"
        />

        <Link to="/products" tabIndex={-1} aria-hidden="true">
          <Button
            variant="outline"
            size="lg"
            iconRight={<ArrowRight size={17} />}
            aria-label="View all products"
          >
            View All Products
          </Button>
        </Link>

        <p className="text-xs text-neutral-400 font-medium">
          11+ premium agricultural commodities available
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
