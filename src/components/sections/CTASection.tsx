import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button }         from '@/components/ui/Button'
import { Container }      from '@/components/common/Container'
import { EASE }           from '@/constants'

// ─── Static data ──────────────────────────────────────────────────────────────

const TRUST_CHIPS = [
  'Premium Quality',
  'Direct Farmer Network',
  'Pan India Delivery',
] as const

// ─── Animation variants — module-scope, never recreated ──────────────────────

const containerVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.65, ease: EASE.outExpo },
  },
}

const chipContainerVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const chipVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 8 },
  visible: {
    opacity: 1,
    scale:   1,
    y:       0,
    transition: { duration: 0.4, ease: EASE.outExpo },
  },
}

// ─── CTASection ───────────────────────────────────────────────────────────────

export function CTASection() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-24 md:py-32 lg:py-36"
    >
      {/* ── Background ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Base — lighter than Hero (primary-800 vs 950) to avoid repetition */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />

        {/* Centred radial glow — softer than Hero */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[800px] h-[500px] rounded-full
                     bg-primary-600/30 blur-[120px]"
        />

        {/* Gold accent — bottom left */}
        <div
          className="absolute -bottom-20 -left-20
                     w-[450px] h-[450px] rounded-full
                     bg-accent-500/10 blur-[100px]"
        />

        {/* Gold accent — top right */}
        <div
          className="absolute -top-16 -right-16
                     w-[350px] h-[350px] rounded-full
                     bg-accent-400/8 blur-[80px]"
        />

        {/* Subtle grid texture — same as Hero but lower opacity */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top separator from BusinessProcess section */}
        <div
          className="absolute top-0 inset-x-0 h-px
                     bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
        />

        {/* Gold shimmer line — bottom */}
        <div
          className="absolute bottom-0 inset-x-0 h-px
                     bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
        />
      </div>

      {/* ── Content ── */}
      <Container size="md" className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center gap-8"
        >

          {/* ── Heading — CSS selector overrides for dark bg ── */}
          <motion.div
            variants={itemVariants}
            className="w-full
                       [&_h2]:text-white
                       [&_p]:text-white/60
                       [&_.text-gradient-primary]:bg-none
                       [&_.text-gradient-primary]:text-accent-300
                       [&_.text-primary-700]:text-primary-300
                       [&_.bg-primary-500]:bg-primary-400"
          >
            <SectionHeading
              eyebrow="LET'S WORK TOGETHER"
              title="Ready to Source Premium Agricultural Products?"
              highlight="Premium Agricultural Products"
              description="Partner with RJ Enterprise and experience trusted sourcing, premium quality and dependable agricultural supply across India."
              align="center"
              titleSize="lg"
              className="mb-0"
            />
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              variant="accent"
              size="lg"
              iconRight={<ArrowRight size={17} />}
              className="shadow-[0_8px_32px_rgba(245,158,11,0.30)]
                         hover:shadow-[0_12px_40px_rgba(245,158,11,0.42)]
                         min-w-[180px]"
              onClick={() => {}}
            >
              Request a Quote
            </Button>

            <Button
              variant="white"
              size="lg"
              icon={<Phone size={16} />}
              className="text-primary-900 border-white/30 min-w-[160px]"
              onClick={() => {}}
            >
              Contact Us
            </Button>
          </motion.div>

          {/* ── Trust chips ── */}
          <motion.ul
            variants={chipContainerVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 list-none p-0 m-0"
            aria-label="Trust indicators"
          >
            {TRUST_CHIPS.map((label) => (
              <motion.li
                key={label}
                variants={chipVariants}
                className="inline-flex items-center gap-1.5
                           px-3.5 py-1.5 rounded-full
                           text-xs font-semibold text-white/80
                           border border-white/15 bg-white/8
                           backdrop-blur-sm select-none"
              >
                <CheckCircle2
                  size={12}
                  className="text-accent-400 shrink-0"
                  aria-hidden="true"
                />
                {label}
              </motion.li>
            ))}
          </motion.ul>

        </motion.div>
      </Container>
    </section>
  )
}
