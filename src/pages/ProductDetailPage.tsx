import { motion, useReducedMotion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Package,
  Search,
  Sparkles,
} from 'lucide-react'

import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils'
import { EASE } from '@/constants'
import { PRODUCTS } from '@/constants/products'

// ─── Animation variants ──────────────────────────────────────────────────────

const pageVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASE.outExpo,
    },
  },
}

const contentVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
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

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: EASE.outExpo,
    },
  },
}

// ─── ProductDetailPage ───────────────────────────────────────────────────────

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const reducedMotion = useReducedMotion() ?? false

  // Find current product
  const productIndex = PRODUCTS.findIndex(
    (product) => product.id === id,
  )

  const product = PRODUCTS[productIndex]

  // ───────────────────────────────────────────────────────────────────────────
  // Invalid product
  // ───────────────────────────────────────────────────────────────────────────

  if (!product) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-neutral-50">
        <Container>
          <div className="max-w-xl mx-auto text-center py-24">
            <div
              aria-hidden="true"
              className="mx-auto mb-6 w-16 h-16 rounded-2xl
                         bg-primary-50 border border-primary-100
                         flex items-center justify-center
                         text-primary-700"
            >
              <Package size={28} />
            </div>

            <h1 className="font-display font-semibold text-3xl text-neutral-900">
              Product Not Found
            </h1>

            <p className="mt-3 text-neutral-500 leading-relaxed">
              The product you're looking for doesn't exist or may have
              been moved.
            </p>

            <div className="mt-8 flex justify-center">
              <Link to="/products">
                <Button variant="primary" size="md">
                  <ArrowLeft size={16} aria-hidden="true" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
    )
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Previous / next product
  //
  // We intentionally wrap around:
  //
  // First product → previous = last product
  // Last product  → next = first product
  // ───────────────────────────────────────────────────────────────────────────

  const previousIndex =
    productIndex === 0
      ? PRODUCTS.length - 1
      : productIndex - 1

  const nextIndex =
    productIndex === PRODUCTS.length - 1
      ? 0
      : productIndex + 1

  const previousProduct = PRODUCTS[previousIndex]
  const nextProduct = PRODUCTS[nextIndex]

  const specifications = Object.entries(
    product.specifications ?? {},
  )

  const languages = Object.entries(
    product.languages ?? {},
  )

  // ───────────────────────────────────────────────────────────────────────────
  // Reduced motion variants
  // ───────────────────────────────────────────────────────────────────────────

  const activePageVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
      }
    : pageVariants

  const activeContentVariants = reducedMotion
    ? {
        hidden: {},
        visible: {},
      }
    : contentVariants

  const activeItemVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
      }
    : itemVariants

  const activeImageVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
      }
    : imageVariants

  return (
    <motion.main
      variants={activePageVariants}
      initial="hidden"
      animate="visible"
      className="bg-neutral-50 min-h-screen"
    >
      {/* ═════════════════════════════════════════════════════════════════════
          HERO / PRODUCT OVERVIEW
      ═════════════════════════════════════════════════════════════════════ */}

      <section
        aria-labelledby="product-detail-heading"
        className="relative overflow-hidden bg-primary-950 pt-28 pb-16 md:pt-36 md:pb-20"
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          {/* Main gradient */}
          <div
            className="absolute inset-0
                       bg-gradient-to-br
                       from-primary-950
                       via-primary-900
                       to-neutral-950"
          />

          {/* Green glow */}
          <div
            className="absolute -top-48 -left-48
                       w-[650px] h-[650px]
                       rounded-full
                       bg-primary-700/20
                       blur-[120px]"
          />

          {/* Gold glow */}
          <div
            className="absolute -bottom-48 -right-40
                       w-[600px] h-[600px]
                       rounded-full
                       bg-accent-600/10
                       blur-[110px]"
          />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.8) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.8) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Gold top line */}
          <div
            className="absolute top-0 inset-x-0 h-px
                       bg-gradient-to-r
                       from-transparent
                       via-accent-500/60
                       to-transparent"
          />
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.div
            variants={activeItemVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2
                         text-sm font-medium
                         text-white/60
                         hover:text-accent-400
                         transition-colors duration-200"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Back to Products
            </Link>
          </motion.div>

          <motion.div
            variants={activeContentVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2
                       gap-10 lg:gap-16 xl:gap-20
                       items-center"
          >
            {/* ─────────────────────────────────────────────────────────────
                IMAGE
            ───────────────────────────────────────────────────────────── */}

            <motion.div variants={activeImageVariants}>
              <div
                className="group relative overflow-hidden
                           rounded-3xl
                           border border-white/10
                           bg-neutral-900/60
                           shadow-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    className={cn(
                      'w-full h-full object-cover',
                      !reducedMotion &&
                        'transition-transform duration-700',
                      !reducedMotion &&
                        'group-hover:scale-[1.04]',
                    )}
                  />
                </div>

                {/* Image gradient */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0
                             bg-gradient-to-t
                             from-neutral-950/50
                             via-transparent
                             to-transparent
                             pointer-events-none"
                />

                {/* Category */}
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-flex items-center
                               px-3 py-1.5
                               rounded-full
                               bg-black/45
                               backdrop-blur-md
                               border border-white/20
                               text-white/90
                               text-xs font-bold
                               uppercase tracking-[0.12em]"
                  >
                    {product.category}
                  </span>
                </div>

                {/* Availability */}
                <div className="absolute top-4 right-4">
                  <span
                    className={cn(
                      'inline-flex items-center gap-2',
                      'px-3 py-1.5 rounded-full',
                      'text-xs font-semibold',
                      'backdrop-blur-md border',
                      product.available
                        ? [
                            'bg-primary-900/70',
                            'border-primary-500/40',
                            'text-primary-200',
                          ].join(' ')
                        : [
                            'bg-neutral-900/70',
                            'border-white/20',
                            'text-white/60',
                          ].join(' '),
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'w-2 h-2 rounded-full',
                        product.available
                          ? 'bg-primary-400'
                          : 'bg-neutral-500',
                      )}
                    />

                    {product.available
                      ? 'Available'
                      : 'Enquire'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ─────────────────────────────────────────────────────────────
                PRODUCT CONTENT
            ───────────────────────────────────────────────────────────── */}

            <motion.div
              variants={activeContentVariants}
              className="flex flex-col gap-6"
            >
              {/* Category */}
              <motion.div variants={activeItemVariants}>
                <span
                  className="inline-flex items-center gap-2
                             text-xs font-bold uppercase
                             tracking-[0.16em]
                             text-accent-400"
                >
                  <span
                    aria-hidden="true"
                    className="w-8 h-px bg-accent-400"
                  />
                  {product.category}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div variants={activeItemVariants}>
                <h1
                  id="product-detail-heading"
                  className="font-display font-semibold
                             text-4xl sm:text-5xl lg:text-6xl
                             leading-[1.05]
                             text-white"
                >
                  {product.name}
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={activeItemVariants}
                className="max-w-xl
                           text-base sm:text-lg
                           leading-relaxed
                           text-white/60"
              >
                {product.description}
              </motion.p>

              {/* Origin + Availability */}
              <motion.div
                variants={activeItemVariants}
                className="flex flex-wrap items-center gap-3"
              >
                {product.origin && (
                  <div
                    className="inline-flex items-center gap-2
                               px-3 py-2
                               rounded-xl
                               bg-white/5
                               border border-white/10
                               text-sm text-white/60"
                  >
                    <MapPin
                      size={15}
                      aria-hidden="true"
                      className="text-accent-400"
                    />
                    <span>{product.origin}</span>
                  </div>
                )}

                <div
                  className={cn(
                    'inline-flex items-center gap-2',
                    'px-3 py-2 rounded-xl',
                    'border text-sm',
                    product.available
                      ? [
                          'bg-primary-500/10',
                          'border-primary-500/20',
                          'text-primary-300',
                        ].join(' ')
                      : [
                          'bg-white/5',
                          'border-white/10',
                          'text-white/50',
                        ].join(' '),
                  )}
                >
                  <Check
                    size={15}
                    aria-hidden="true"
                  />

                  {product.available
                    ? 'Currently Available'
                    : 'Availability on Enquiry'}
                </div>
              </motion.div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <motion.div
                  variants={activeItemVariants}
                  className="flex flex-wrap gap-2"
                  aria-label="Product tags"
                >
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5
                                 rounded-full
                                 bg-white/5
                                 border border-white/10
                                 text-xs
                                 text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Main CTA */}
              <motion.div
                variants={activeItemVariants}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Link to={`/products/${nextProduct.id}`}>
                  <Button
                    variant="primary"
                    size="md"
                    aria-label={`View next product: ${nextProduct.name}`}
                  >
                    Next Product
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                    />
                  </Button>
                </Link>

                <Link to="/products">
                  <Button
                    variant="outline"
                    size="md"
                  >
                    Browse All Products
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SPECIFICATIONS + LANGUAGE
      ═════════════════════════════════════════════════════════════════════ */}

      <section
        aria-label={`${product.name} specifications`}
        className="py-16 md:py-24 bg-neutral-50"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* ─────────────────────────────────────────────────────────────
                SPECIFICATIONS
            ───────────────────────────────────────────────────────────── */}

            <div
              className={cn(
                'lg:col-span-2',
                'rounded-3xl',
                'bg-white',
                'border border-neutral-200',
                'shadow-sm',
                'overflow-hidden',
              )}
            >
              <div className="p-6 sm:p-8 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-xl
                               bg-primary-50
                               border border-primary-100
                               flex items-center justify-center
                               text-primary-700"
                  >
                    <Package size={19} />
                  </div>

                  <div>
                    <p
                      className="text-[11px] font-bold
                                 uppercase tracking-[0.14em]
                                 text-primary-600"
                    >
                      Product Information
                    </p>

                    <h2
                      className="mt-1 font-display
                                 font-semibold text-2xl
                                 text-neutral-900"
                    >
                      Specifications
                    </h2>
                  </div>
                </div>
              </div>

              {specifications.length > 0 ? (
                <dl className="divide-y divide-neutral-100">
                  {specifications.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-1 sm:grid-cols-[180px_1fr]
                                 gap-2 sm:gap-6
                                 px-6 sm:px-8 py-5
                                 hover:bg-neutral-50
                                 transition-colors duration-200"
                    >
                      <dt
                        className="text-sm font-semibold
                                   text-neutral-500"
                      >
                        {label}
                      </dt>

                      <dd
                        className="text-sm sm:text-base
                                   font-medium
                                   text-neutral-900"
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="px-6 sm:px-8 py-12 text-center">
                  <Package
                    size={28}
                    className="mx-auto text-neutral-300"
                    aria-hidden="true"
                  />

                  <p className="mt-3 text-sm text-neutral-500">
                    Detailed specifications will be available soon.
                  </p>
                </div>
              )}
            </div>

            {/* ─────────────────────────────────────────────────────────────
                OTHER LANGUAGES
            ───────────────────────────────────────────────────────────── */}

            <div
              className="rounded-3xl
                         bg-primary-950
                         border border-primary-900
                         p-6 sm:p-8
                         shadow-sm
                         h-fit"
            >
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-xl
                             bg-white/10
                             border border-white/10
                             flex items-center justify-center
                             text-accent-400"
                >
                  <Sparkles size={18} />
                </div>

                <div>
                  <p
                    className="text-[11px] font-bold
                               uppercase tracking-[0.14em]
                               text-accent-400"
                  >
                    Multilingual
                  </p>

                  <h2
                    className="mt-1 font-display
                               font-semibold text-2xl
                               text-white"
                  >
                    Other Names
                  </h2>
                </div>
              </div>

              {languages.length > 0 ? (
                <div className="mt-7 flex flex-col gap-3">
                  {languages.map(([language, name]) => (
                    <div
                      key={language}
                      className="rounded-2xl
                                 bg-white/5
                                 border border-white/10
                                 px-4 py-4"
                    >
                      <p
                        className="text-[11px]
                                   uppercase tracking-wider
                                   font-semibold
                                   text-white/40"
                      >
                        {language}
                      </p>

                      <p
                        className="mt-1 text-lg
                                   font-semibold
                                   text-white"
                      >
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className="mt-7 text-sm
                             leading-relaxed
                             text-white/50"
                >
                  Other-language names will be added as product
                  information becomes available.
                </p>
              )}

              {/* Search hint */}
              <div
                className="mt-6 pt-6
                           border-t border-white/10"
              >
                <div
                  className="flex items-start gap-3"
                >
                  <Search
                    size={15}
                    className="mt-0.5
                               shrink-0
                               text-accent-400"
                    aria-hidden="true"
                  />

                  <p
                    className="text-xs
                               leading-relaxed
                               text-white/40"
                  >
                    Product names can be searched using
                    their common names and supported
                    language names.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          PREVIOUS / NEXT PRODUCT
      ═════════════════════════════════════════════════════════════════════ */}

      <section
        aria-label="Product navigation"
        className="border-t border-neutral-200 bg-white"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Previous */}
            <Link
              to={`/products/${previousProduct.id}`}
              className="group
                         flex items-center gap-4
                         py-8 md:py-10
                         md:pr-10
                         border-b md:border-b-0
                         md:border-r
                         border-neutral-200
                         hover:bg-neutral-50
                         transition-colors duration-300"
            >
              <div
                aria-hidden="true"
                className="w-11 h-11 shrink-0
                           rounded-full
                           border border-neutral-200
                           flex items-center justify-center
                           text-neutral-500
                           group-hover:border-primary-300
                           group-hover:text-primary-700
                           transition-colors duration-300"
              >
                <ChevronLeft size={20} />
              </div>

              <div className="min-w-0">
                <p
                  className="text-[10px]
                             font-bold uppercase
                             tracking-[0.14em]
                             text-neutral-400"
                >
                  Previous Product
                </p>

                <p
                  className="mt-1 font-display
                             font-semibold
                             text-lg text-neutral-900
                             truncate"
                >
                  {previousProduct.name}
                </p>
              </div>
            </Link>

            {/* Next */}
            <Link
              to={`/products/${nextProduct.id}`}
              className="group
                         flex items-center justify-end
                         gap-4
                         py-8 md:py-10
                         md:pl-10
                         text-right
                         hover:bg-neutral-50
                         transition-colors duration-300"
            >
              <div className="min-w-0">
                <p
                  className="text-[10px]
                             font-bold uppercase
                             tracking-[0.14em]
                             text-neutral-400"
                >
                  Next Product
                </p>

                <p
                  className="mt-1 font-display
                             font-semibold
                             text-lg text-neutral-900
                             truncate"
                >
                  {nextProduct.name}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="w-11 h-11 shrink-0
                           rounded-full
                           border border-neutral-200
                           flex items-center justify-center
                           text-neutral-500
                           group-hover:border-primary-300
                           group-hover:text-primary-700
                           transition-colors duration-300"
              >
                <ChevronRight size={20} />
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          BROWSE MORE / NEXT PRODUCT CTA
      ═════════════════════════════════════════════════════════════════════ */}

      <section
        aria-label="Continue browsing products"
        className="relative overflow-hidden
                   bg-gradient-to-br
                   from-primary-950
                   via-primary-900
                   to-neutral-950
                   py-16 md:py-20"
      >
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute -top-32 left-1/2
                       -translate-x-1/2
                       w-[600px] h-[300px]
                       rounded-full
                       bg-primary-500/10
                       blur-[100px]"
          />

          <div
            className="absolute bottom-0 inset-x-0
                       h-px
                       bg-gradient-to-r
                       from-transparent
                       via-accent-500/60
                       to-transparent"
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="text-xs font-bold
                         uppercase tracking-[0.18em]
                         text-accent-400"
            >
              Continue Exploring
            </p>

            <h2
              className="mt-3 font-display
                         font-semibold
                         text-3xl sm:text-4xl
                         text-white"
            >
              Discover More Agricultural Products
            </h2>

            <p
              className="mt-4
                         text-sm sm:text-base
                         leading-relaxed
                         text-white/55"
            >
              Explore our complete catalogue or continue
              directly to the next product.
            </p>

            <div
              className="mt-8
                         flex flex-wrap
                         justify-center
                         gap-3"
            >
              {/* This is now the actual NEXT PRODUCT action */}
              <Link to={`/products/${nextProduct.id}`}>
                <Button
                  variant="primary"
                  size="md"
                  aria-label={`Browse next product: ${nextProduct.name}`}
                >
                  Browse More Products
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                  />
                </Button>
              </Link>

              <Link to="/products">
                <Button
                  variant="outline"
                  size="md"
                >
                  View Full Catalogue
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </motion.main>
  )
}
export default ProductDetailPage