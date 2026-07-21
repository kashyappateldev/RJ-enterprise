import { useReducedMotion, motion } from 'framer-motion'
import { Users, ShieldCheck, Truck, Handshake, ArrowRight } from 'lucide-react'
import { ImageCard }     from '@/components/common/ImageCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconWrapper }    from '@/components/ui/IconWrapper'
import { Button }         from '@/components/ui/Button'
import { cn }             from '@/utils'
import { EASE }           from '@/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  Icon:        React.ElementType
  title:       string
  description: string
}

// ─── Static data — plain objects, icons resolved at render time ───────────────

const FEATURES: Feature[] = [
  {
    Icon:        Users,
    title:       'Direct Farmer Network',
    description: 'Direct sourcing from trusted farming communities.',
  },
  {
    Icon:        ShieldCheck,
    title:       'Premium Quality',
    description: 'Carefully selected agricultural commodities.',
  },
  {
    Icon:        Truck,
    title:       'Reliable Supply',
    description: 'Serving businesses across India efficiently.',
  },
  {
    Icon:        Handshake,
    title:       'Trusted Partnerships',
    description: 'Long-term relationships built on transparency.',
  },
]

// ─── Animation variants — module-scope, never recreated on render ─────────────

const imageColVariants = {
  hidden:  { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x:       0,
    transition: { duration: 0.85, ease: EASE.outExpo },
  },
}

const contentColVariants = {
  hidden:  { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x:       0,
    transition: { duration: 0.85, ease: EASE.outExpo, delay: 0.1 },
  },
}

const featureGridVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const featureItemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.55, ease: EASE.outExpo },
  },
}

// ─── FeatureItem sub-component ────────────────────────────────────────────────

function FeatureItem({
  Icon,
  title,
  description,
  reducedMotion,
}: Feature & { reducedMotion: boolean }) {
  return (
    <motion.div
      variants={featureItemVariants}
      className="group flex items-start gap-3.5"
    >
      {/* Icon — scale on hover, scoped spring so entry is unaffected */}
      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : {
                scale: 1.12,
                transition: { type: 'spring', stiffness: 380, damping: 20 },
              }
        }
        className="shrink-0 mt-0.5"
      >
        <IconWrapper
          variant="primary"
          size="md"
          rounded="lg"
          className="group-hover:bg-primary-700 group-hover:text-white transition-colors duration-300"
        >
          <Icon size={18} strokeWidth={1.75} />
        </IconWrapper>
      </motion.div>

      <div className="flex flex-col gap-0.5">
        <h4 className="font-semibold text-sm text-neutral-900 leading-snug
                       group-hover:text-primary-700 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm text-neutral-500 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CompanyStorySection() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-label="About RJ Enterprise"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* ── Background — soft green-tinted, NOT white, NOT dark ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Base: warm green tint */}
        <div className="absolute inset-0 bg-[#f2f8f4]" />

        {/* Radial gradient — top-right warmth */}
        <div
          className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full
                     bg-primary-100/60 blur-[100px]"
        />

        {/* Radial gradient — bottom-left depth */}
        <div
          className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full
                     bg-accent-100/40 blur-[80px]"
        />

        {/* Subtle top separator from previous section */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-200/60 to-transparent" />
      </div>

      {/* ── Watermark — "RJ" at ~3% opacity, behind image column ── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none
                   select-none w-1/2 flex items-center justify-center"
      >
        <span
          className="font-display font-black text-[22rem] leading-none
                     text-primary-900 opacity-[0.028] tracking-tighter"
        >
          RJ
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ════════════════════════════════════════════════════════════
              LEFT — Image column
              Mobile order: 3 (after badge + heading, before story)
              Desktop order: 1 (left)
          ════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={imageColVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="order-3 lg:order-1 relative"
          >
            {/* Floating wrapper — gentle y oscillation */}
            <motion.div
              animate={reducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Decorative shadow blob behind image — GPU opacity only */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl
                           bg-gradient-to-br from-primary-200/40 to-accent-100/20
                           blur-2xl -z-10"
              />

              <ImageCard
                image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80&auto=format&fit=crop"
                alt="RJ Enterprise — premium agricultural sourcing across India"
                aspect="portrait"
                rounded="3xl"
                overlayOpacity={0.28}
                disableHover={reducedMotion}
                lazy
                className="shadow-[0_24px_64px_rgba(21,128,61,0.18)]"
              >
                {/* Floating quality badge inside image — bottom-left slot */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                   bg-white/20 backdrop-blur-md border border-white/30
                                   text-white text-[11px] font-semibold tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                    Premium Sourcing
                  </span>
                </div>
              </ImageCard>
            </motion.div>

            {/* Floating stat chip — bottom-right of image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE.outExpo, delay: 0.5 }}
              animate={reducedMotion ? {} : { y: [0, -6, 0] }}
              // Note: Framer merges whileInView + animate correctly after mount
              className="absolute -bottom-4 -right-4 md:-right-6 z-10"
            >
              <div className={cn(
                'glass-light rounded-2xl px-5 py-4 shadow-soft-lg',
                'border border-primary-100',
              )}>
                <p className="font-display font-bold text-primary-800 text-2xl leading-none">11+</p>
                <p className="text-neutral-500 text-xs font-medium mt-1 leading-tight">
                  Agricultural<br />Products
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT — Content column
              Mobile: badge (order-1), heading (order-2), story (order-4), features (order-5), cta (order-6)
              Desktop: all in natural flow (order-2)
          ════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={contentColVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="order-1 lg:order-2 flex flex-col gap-8"
          >
            {/* Heading — reuses SectionHeading with left alignment */}
            <SectionHeading
              eyebrow="About RJ Enterprise"
              title="Connecting Farmers, Businesses & Trust."
              highlight="Trust"
              align="left"
              titleSize="lg"
              className="order-2 lg:order-none"
            />

            {/* Story paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE.outExpo, delay: 0.2 }}
              className="order-4 lg:order-none flex flex-col gap-4"
            >
              <p className="text-neutral-600 leading-[1.8] text-base">
                RJ Enterprise is a trusted agricultural brokerage and supplier connecting
                farmers with businesses across India. With a strong focus on quality,
                transparency and long-term relationships, we help deliver premium
                agricultural commodities through reliable sourcing and dependable service.
              </p>
              <p className="text-neutral-500 leading-[1.8] text-sm">
                From direct farmer networks to pan-India distribution, every step of our
                process is built on integrity — ensuring businesses receive exactly what
                they need, when they need it.
              </p>
            </motion.div>

            {/* Feature grid — 2×2 */}
            <motion.div
              variants={featureGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="order-5 lg:order-none grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
            >
              {FEATURES.map(f => (
                <FeatureItem
                  key={f.title}
                  {...f}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.div>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="order-6 lg:order-none w-16 h-px
                         bg-gradient-to-r from-primary-400 to-accent-400"
            />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE.outExpo, delay: 0.3 }}
              className="order-7 lg:order-none"
            >
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={17} />}
              >
                Explore Our Products
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
