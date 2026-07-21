import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, Users, Package, Truck } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconWrapper }    from '@/components/ui/IconWrapper'
import { cn }             from '@/utils'
import { EASE }           from '@/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pillar {
  Icon:        React.ElementType
  title:       string
  description: string
}

// ─── Static data ──────────────────────────────────────────────────────────────

const PILLARS: Pillar[] = [
  {
    Icon:        ShieldCheck,
    title:       'Premium Quality',
    description: 'Only carefully selected agricultural commodities.',
  },
  {
    Icon:        Users,
    title:       'Direct Farmer Network',
    description: 'Direct sourcing from trusted farming communities.',
  },
  {
    Icon:        Package,
    title:       'Reliable Packaging',
    description: 'Safe handling to preserve freshness and product quality.',
  },
  {
    Icon:        Truck,
    title:       'Pan India Delivery',
    description: 'Reliable agricultural supply across India.',
  },
]

// ─── Animation variants — module-scope, never recreated ──────────────────────

const rowVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
}

const pillarVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.6, ease: EASE.outExpo },
  },
}

// ─── PillarItem sub-component ─────────────────────────────────────────────────

function PillarItem({
  Icon,
  title,
  description,
  isLast,
  reducedMotion,
}: Pillar & { isLast: boolean; reducedMotion: boolean }) {
  return (
    <motion.div
      variants={pillarVariants}
      className={cn(
        'group relative flex flex-col items-center text-center gap-4 px-6 py-8',
        // Vertical divider on desktop — right edge of every card except last
        !isLast && [
          'lg:after:content-[""] lg:after:absolute lg:after:right-0 lg:after:top-1/2',
          'lg:after:-translate-y-1/2 lg:after:h-16 lg:after:w-px',
          'lg:after:bg-gradient-to-b lg:after:from-transparent',
          'lg:after:via-primary-200 lg:after:to-transparent',
        ],
      )}
    >
      {/* ── Hover glow — opacity only, GPU composited ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl
                   bg-gradient-to-b from-primary-50/70 to-transparent
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 pointer-events-none"
      />

      {/* ── Gold accent line — scaleX from left on hover ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full
                   bg-gradient-to-r from-accent-400 via-accent-300 to-accent-400
                   scale-x-0 group-hover:scale-x-100 origin-left
                   transition-transform duration-500"
      />

      {/* ── Icon ── */}
      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -5,
                transition: { type: 'spring', stiffness: 380, damping: 20 },
              }
        }
        className="relative z-10"
      >
        <IconWrapper
          variant="primary"
          size="lg"
          rounded="xl"
          className="group-hover:bg-primary-700 group-hover:text-white
                     transition-colors duration-300"
        >
          <Icon size={22} strokeWidth={1.75} />
        </IconWrapper>
      </motion.div>

      {/* ── Text ── */}
      <div className="relative z-10 flex flex-col gap-1.5">
        <h3
          className="font-display font-semibold text-base text-neutral-900
                     group-hover:text-primary-700 transition-colors duration-300
                     leading-snug"
        >
          {title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed max-w-[200px] mx-auto">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProductQualitySection() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-label="Product quality assurance"
      className="relative overflow-hidden py-16 md:py-20"
    >
      {/* ── Background — soft green-tinted gradient ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Base tint — bridges white Products section and upcoming Statistics */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#eef7f1] to-[#e6f4eb]" />

        {/* Radial warmth — top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2
                     w-[800px] h-[300px] rounded-full
                     bg-primary-100/50 blur-[80px]"
        />

        {/* Gold accent — bottom right */}
        <div
          className="absolute -bottom-16 -right-16
                     w-[400px] h-[400px] rounded-full
                     bg-accent-100/30 blur-[70px]"
        />

        {/* Top separator from Products section */}
        <div className="absolute top-0 inset-x-0 h-px
                        bg-gradient-to-r from-transparent via-primary-200/50 to-transparent" />

        {/* Bottom separator toward Statistics section */}
        <div className="absolute bottom-0 inset-x-0 h-px
                        bg-gradient-to-r from-transparent via-primary-200/50 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading — compact titleSize="md" keeps visual weight appropriate */}
        <SectionHeading
          eyebrow="Quality Assurance"
          title="Why Our Products Stand Out"
          highlight="Stand Out"
          description="Every product reflects our commitment to quality, reliability and trusted agricultural sourcing."
          align="center"
          titleSize="md"
          className="mb-12 md:mb-14"
        />

        {/* ── Pillars row ── */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px' }}
          className={cn(
            // Mobile: single column
            // Tablet: 2×2 grid
            // Desktop: single horizontal row, 4 equal columns
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
            // Outer card border — wraps the whole row on desktop
            'lg:rounded-2xl lg:border lg:border-primary-100/80',
            'lg:bg-white/60 lg:backdrop-blur-sm',
            'lg:shadow-soft',
            // Mobile/tablet gap
            'gap-2 sm:gap-0',
          )}
        >
          {PILLARS.map((pillar, i) => (
            <PillarItem
              key={pillar.title}
              {...pillar}
              isLast={i === PILLARS.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
