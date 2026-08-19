import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, Package, LayoutGrid, MapPin, Leaf } from 'lucide-react'
import { Button }    from '@/components/ui/Button'
import { Badge }     from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Container } from '@/components/common/Container'
import { EASE }      from '@/constants'
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/constants/products";

const STATS = [
  {
    Icon: Package,
    value: PRODUCTS.length.toString(),
    label: "Products",
    description: "Premium agricultural products",
  },
  {
    Icon: LayoutGrid,
    value: (PRODUCT_CATEGORIES.length - 1).toString(),
    label: "Categories",
    description: "Product categories available",
  },
  {
    Icon: MapPin,
    value: "Pan India",
    label: "Supply",
    description: "Reliable nationwide distribution",
  },
]


// ─── Animation variants — module-scope, never recreated ──────────────────────

const contentVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.outExpo } },
}

const cardsContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.45 } },
}

const cardVariants = {
  hidden:  { opacity: 0, x: 40, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE.outExpo } },
}

// ─── StatCard sub-component ───────────────────────────────────────────────────

function StatCard({
  Icon,
  value,
  label,
  description,
}: {
  Icon: React.ElementType
  value: string
  label: string
  description: string
}){
  return (
    <motion.div variants={cardVariants}>
      <GlassCard
        variant="dark"
        hover={false}
        padding="md"
        className="flex items-center gap-4 border-white/10"
      >
        {/* Icon */}
        <div
          aria-hidden="true"
          className="shrink-0 w-11 h-11 rounded-xl
                     bg-primary-700/60 border border-primary-600/40
                     flex items-center justify-center text-accent-400"
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-white text-xl leading-none">
              {value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-300">
              {label}
            </span>
          </div>
          <p className="text-xs text-white/50 leading-snug truncate">
            {description}
          </p>
        </div>

        {/* Gold accent dot */}
        <div
          aria-hidden="true"
          className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-accent-400/70"
        />
      </GlassCard>
    </motion.div>
  )
}

// ─── ProductHero ──────────────────────────────────────────────────────────────

export function ProductHero() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-label="Products page hero"
      className="relative overflow-hidden bg-primary-950 pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ── Background layers ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-neutral-950" />

        {/* Radial glow — top left */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full
                        bg-primary-700/20 blur-[120px]" />

        {/* Gold accent — bottom right */}
        <div className="absolute -bottom-32 -right-24 w-[600px] h-[600px] rounded-full
                        bg-accent-600/10 blur-[100px]" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gold accent line — top */}
        <div className="absolute top-0 inset-x-0 h-px
                        bg-gradient-to-r from-transparent via-accent-500/60 to-transparent" />

        {/* Bottom separator */}
        <div className="absolute bottom-0 inset-x-0 h-px
                        bg-gradient-to-r from-transparent via-primary-600/50 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ── LEFT — Content ── */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:gap-7"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="accent"
                size="md"
                dot
                className="bg-accent-500/15 text-accent-300 border-accent-500/30 backdrop-blur-sm"
              >
                <Leaf size={11} aria-hidden="true" className="mr-0.5" />
                Our Products
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h1 className="font-display font-bold text-white leading-[1.08] tracking-tight
                             text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">
                Premium{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-accent">Agricultural</span>
                  {/* Animated underline — scaleX from left, gated by reducedMotion */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.8, ease: EASE.outExpo, delay: 0.65 }
                    }
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full
                               bg-gradient-to-r from-accent-500 to-accent-300 origin-left"
                  />
                </span>
                {' '}Products
              </h1>

              <p className="font-display text-white/70 text-lg sm:text-xl font-normal leading-snug">
                Sourced directly from{' '}
                <span className="text-white/90 font-medium">trusted farmers across India.</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-white/55 text-base leading-relaxed max-w-lg"
            >
              From aromatic spices and nutritious pulses to premium oil seeds, grains and
              specialty seeds — RJ Enterprise delivers consistent quality for every bulk
              agricultural requirement.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Button
                variant="accent"
                size="lg"
                iconRight={<ArrowRight size={17} />}
                className="shadow-[0_8px_32px_rgba(245,158,11,0.35)]
                           hover:shadow-[0_12px_40px_rgba(245,158,11,0.45)]"
                onClick={() => {
                  document
                    .getElementById('all-products-heading')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                Explore Products
              </Button>

              <Button
                variant="white"
                size="lg"
                icon={<Phone size={16} />}
                className="text-primary-900 border-white/40"
                onClick={() => {
  document
    .getElementById("footer")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
}}
              >
                Contact Us
              </Button>
            </motion.div>

            {/* Category chips */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 pt-1"
              aria-label="Product categories"
            >
              {PRODUCT_CATEGORIES.filter((category) => category !== "All").map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             text-xs font-semibold text-white/80
                            border border-white/20 bg-white/8 backdrop-blur-sm
                            select-none"
                >
                  {category}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Stat cards ── */}
          <motion.div
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
            aria-label="Key statistics"
          >
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                Icon={stat.Icon}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                
              />
            ))}

            {/* Decorative bottom accent card */}
            <motion.div variants={cardVariants}>
              <div className="glass rounded-2xl px-6 py-4 border-white/10
                              flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-lg font-bold text-white">
                    Premium Quality
                  </span>

                  <span className="text-xs leading-relaxed text-white/60">
                    Carefully sourced from trusted farming partners across India.
                  </span>
                </div>
                {/* Animated pulse dot */}
                <div aria-hidden="true" className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                  <span className="text-accent-300 text-xs font-semibold uppercase tracking-wider">
                    Live
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
