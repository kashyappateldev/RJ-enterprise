import { useMemo, useState, useCallback } from 'react'
import { SEO }                            from '@/components/common'
import { ProductHero }                    from '@/components/products/ProductHero'
import { ProductSearch }                  from '@/components/products/ProductSearch'
import { CategoryFilter }                 from '@/components/products/CategoryFilter'
import { FeaturedProducts }               from '@/components/products/FeaturedProducts'
import { ProductGrid }                    from '@/components/products/ProductGrid'
import { EmptyState }                     from '@/components/products/EmptyState'
import { ProductsCTA }                    from '@/components/products/ProductsCTA'
import { Container }                      from '@/components/common/Container'
import { PRODUCTS, PRODUCT_CATEGORIES }   from '@/constants/products'
import { SITE }                           from '@/constants'
import type { ProductCategory }           from '@/constants/products'

type FilterCategory = (typeof PRODUCT_CATEGORIES)[number]

// ─── ProductsPage ─────────────────────────────────────────────────────────────

export default function ProductsPage() {
const [query, setQuery]                   = useState('')
const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')

// Handle category changes from the generic CategoryFilter component
const handleCategoryChange = useCallback((category: string) => {
  if (PRODUCT_CATEGORIES.includes(category as FilterCategory)) {
    setActiveCategory(category as FilterCategory)
  }
}, [])

// Stable reset callback
const handleReset = useCallback(() => {
  setQuery('')
  setActiveCategory('All')
}, [])

  // Derived filtered list — recomputes only when query or category changes
  const filteredProducts = useMemo(() => {
    const normalised = query.trim().toLowerCase()

    return PRODUCTS.filter((p) => {
      // Category filter
      const categoryMatch =
        activeCategory === 'All' || p.category === (activeCategory as ProductCategory)

      // Search filter — name + tags
      const searchMatch =
        !normalised ||
        p.name.toLowerCase().includes(normalised) ||
        p.tags?.some((t) => t.toLowerCase().includes(normalised))

      return categoryMatch && searchMatch
    })
  }, [query, activeCategory])

  // Key for ProductGrid re-stagger — changes whenever filters change
  const gridKey = `${activeCategory}-${query}`

  return (
    <>
      <SEO
        title={`Products — ${SITE.name}`}
        description="Browse premium agricultural products from RJ Enterprise — spices, seeds, pulses, oil seeds and grains sourced directly from trusted farmers across India."
        canonical={`${SITE.url}/products`}
      />

      {/* ── Hero ── */}
      <ProductHero />

      {/* ── Featured Products ── */}
      <FeaturedProducts />

      {/* ── Search + Filter + Grid ── */}
      <section
        aria-labelledby="all-products-heading"
        className="bg-white py-12 md:py-16"
      >
        <Container>
          {/* Section label — visually hidden, used by aria-labelledby */}
          <h2 id="all-products-heading" className="sr-only">
            All Products
          </h2>

          {/* Search + Filter controls */}
          <div className="flex flex-col items-center gap-5 mb-10 md:mb-12">
            <ProductSearch
              value={query}
              onChange={setQuery}
              placeholder="Search products by name, category or keyword..."
            />

            <CategoryFilter
              categories={PRODUCT_CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          {/* Results count */}
          {(query || activeCategory !== 'All') && filteredProducts.length > 0 && (
            <p
              aria-live="polite"
              className="text-sm text-neutral-500 text-center mb-7"
            >
              Showing{' '}
              <span className="font-semibold text-neutral-700">
                {filteredProducts.length}
              </span>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
              {activeCategory !== 'All' && (
                <> in <span className="font-semibold text-primary-700">{activeCategory}</span></>
              )}
              {query && (
                <> for "<span className="font-semibold text-neutral-700">{query}</span>"</>
              )}
            </p>
          )}

          {/* Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              animationKey={gridKey}
            />
          ) : (
            <EmptyState query={query} onReset={handleReset} />
          )}
        </Container>
      </section>

      {/* ── CTA ── */}
      <ProductsCTA />
    </>
  )
}
