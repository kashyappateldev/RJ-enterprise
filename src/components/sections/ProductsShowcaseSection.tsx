import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'

import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
} from '@/constants/products'

import type { ProductCategory } from '@/constants/products'

import { cn } from '@/utils'
import { EASE } from '@/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'All' | ProductCategory

// ─── Categories ──────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  'All',
  ...PRODUCT_CATEGORIES.filter(
    (category) => category !== 'All',
  ),
]

// ─── Animation variants ──────────────────────────────────────────────────────

const pillContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

const pillVariants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 8,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: EASE.outExpo,
    },
  },
}

const gridVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: EASE.outExpo,
    },
  },
}

const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: EASE.outExpo,
    },
  },
}

// ─── Category Pill ───────────────────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: Category
  active: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      variants={pillVariants}
      whileHover={
        active
          ? undefined
          : {
              scale: 1.04,
              transition: {
                type: 'spring',
                stiffness: 380,
                damping: 22,
              },
            }
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
          : [
              'bg-white',
              'text-neutral-600',
              'border border-neutral-200',
              'hover:border-primary-300',
              'hover:text-primary-700',
            ].join(' '),
      )}
    >
      {active && (
        <motion.span
          layoutId="products-showcase-pill-active"
          className="absolute inset-0 rounded-full bg-primary-700 -z-10"
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {label}
    </motion.button>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ProductsShowcaseSection() {
  const [activeCategory, setActiveCategory] =
    useState<Category>('All')

  // Use the single source of truth from constants/products.ts
  const visibleProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(
          (product) =>
            product.category === activeCategory,
        )

  return (
    <SectionWrapper
      bg="white"
      pad="lg"
      containerSize="lg"
      aria-label="Featured products"
    >
      {/* ─────────────────────────────────────────────────────────────
          Heading
      ───────────────────────────────────────────────────────────── */}

      <SectionHeading
        eyebrow="Featured Products"
        title="Premium Agricultural Commodities"
        highlight="Agricultural Commodities"
        description="Explore some of our carefully sourced agricultural products trusted by businesses across India."
        align="center"
        titleSize="md"
        className="mb-10 md:mb-12"
      />

      {/* ─────────────────────────────────────────────────────────────
          Category Filters
      ───────────────────────────────────────────────────────────── */}

      <motion.div
        variants={pillContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: '-60px',
        }}
        className="flex flex-wrap items-center justify-center gap-2.5 mb-12 md:mb-14"
        role="group"
        aria-label="Filter products by category"
      >
        {CATEGORIES.map((category) => (
          <CategoryPill
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={() =>
              setActiveCategory(category)
            }
          />
        ))}
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          Product Grid
      ───────────────────────────────────────────────────────────── */}

      {visibleProducts.length > 0 ? (
        <motion.div
          key={activeCategory}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 md:gap-7"
        >
          {visibleProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="h-full"
            >
              <Link
                to={`/products/${product.id}`}
                className="
                  block h-full rounded-2xl
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary-500
                  focus-visible:ring-offset-4
                "
                aria-label={`View details for ${product.name}`}
              >
                <ProductCard
                  image={product.image}
                  category={product.category}
                  title={product.name}
                  description={product.description}
                  href={`/products/${product.id}`}
                  tag={product.category}
                  ctaLabel="Learn More"
                  compactOnMobile
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* ───────────────────────────────────────────────────────────
           Empty State
        ─────────────────────────────────────────────────────────── */

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center text-neutral-400 text-sm"
        >
          No products in this category yet.
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          Bottom CTA
      ───────────────────────────────────────────────────────────── */}

      <motion.div
        variants={ctaVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: '-40px',
        }}
        className="mt-14 md:mt-16 flex flex-col items-center gap-3"
      >
        <div
          aria-hidden="true"
          className="
            w-16 h-px mb-2
            bg-gradient-to-r
            from-transparent
            via-primary-300
            to-transparent
          "
        />

        <Link to="/products">
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
          {PRODUCTS.length}+ premium agricultural commodities available
        </p>
      </motion.div>
    </SectionWrapper>
  )
}