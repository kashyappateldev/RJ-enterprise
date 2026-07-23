import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeading }           from '@/components/ui/SectionHeading'
import { IconWrapper }               from '@/components/ui/IconWrapper'
import { Container }                 from '@/components/common/Container'
import { BUSINESS_PROCESS, EASE }    from '@/constants'
import type { ProcessStep }          from '@/constants'
import { cn }                        from '@/utils'

// ─── Animation variants — module-scope, never recreated ──────────────────────

const stepsContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const stepVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.6, ease: EASE.outExpo },
  },
}

const lineVariant = {
  hidden:  { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE.outExpo, delay: 0.15 },
  },
}

const lineVariantMobile = {
  hidden:  { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.1, ease: EASE.outExpo, delay: 0.15 },
  },
}

// ─── StepCard ─────────────────────────────────────────────────────────────────

interface StepCardProps {
  step:          ProcessStep
  isLast:        boolean
  reducedMotion: boolean
}

function StepCard({ step, isLast, reducedMotion }: StepCardProps) {
  const { Icon, step: num, title, description } = step

  return (
    <motion.div
      variants={stepVariant}
      className="group relative flex flex-col items-center text-center gap-5
                 px-4 py-2 lg:px-6"
    >
      {/* ── Mobile/tablet vertical connector — right of icon, hidden on lg ── */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="lg:hidden absolute left-1/2 -translate-x-1/2
                     top-[4.5rem] w-px h-[calc(100%+2rem)]
                     bg-gradient-to-b from-primary-200 via-primary-100 to-transparent
                     pointer-events-none"
        />
      )}

      {/* ── Icon cluster ── */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        {/* Step number badge */}
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center
                     w-5 h-5 rounded-full text-[10px] font-bold
                     bg-primary-100 text-primary-700
                     ring-2 ring-white
                     group-hover:bg-accent-400 group-hover:text-white
                     transition-colors duration-300"
        >
          {num}
        </span>

        {/* Icon wrapper — lift on hover via Framer, gated by reducedMotion */}
        <motion.div
          whileHover={
            reducedMotion
              ? undefined
              : { y: -6, transition: { type: 'spring', stiffness: 380, damping: 22 } }
          }
        >
          <IconWrapper
            variant="primary"
            size="xl"
            rounded="xl"
            className="shadow-soft
                       group-hover:bg-primary-700 group-hover:text-white
                       group-hover:shadow-soft-lg
                       transition-colors duration-300"
          >
            <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
          </IconWrapper>
        </motion.div>
      </div>

      {/* ── Text ── */}
      <div className="relative z-10 flex flex-col gap-2 max-w-[220px]">
        {/* Visually-hidden step label for screen readers */}
        <span className="sr-only">Step {num}:</span>

        <h3
          className="font-display font-semibold text-base md:text-lg
                     text-neutral-900 leading-snug
                     group-hover:text-primary-700
                     transition-colors duration-300"
        >
          {title}
        </h3>

        <p className="text-sm text-neutral-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* ── Bottom gold accent line — scaleX on hover ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full
                   bg-gradient-to-r from-accent-400/0 via-accent-400 to-accent-400/0
                   scale-x-0 group-hover:scale-x-100 origin-center
                   transition-transform duration-500 pointer-events-none"
      />

      {/* ── Hover glow — opacity only, GPU composited ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl
                   bg-gradient-to-b from-primary-50/60 to-transparent
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 pointer-events-none"
      />
    </motion.div>
  )
}

// ─── BusinessProcessSection ───────────────────────────────────────────────────

export function BusinessProcessSection() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32"
    >
      {/* ── Subtle background texture ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Top separator from Statistics section */}
        <div
          className="absolute top-0 inset-x-0 h-px
                     bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
        />
        {/* Faint radial warmth — centre */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[900px] h-[500px] rounded-full
                     bg-primary-50/60 blur-[100px]"
        />
        {/* Gold accent — bottom right */}
        <div
          className="absolute -bottom-24 -right-24
                     w-[400px] h-[400px] rounded-full
                     bg-accent-100/30 blur-[80px]"
        />
      </div>

      <Container className="relative z-10">

        {/* ── Heading ── */}
        <SectionHeading
          eyebrow="OUR PROCESS"
          title="From Farm to Business"
          highlight="Farm to Business"
          description="Every agricultural product follows a carefully managed journey to ensure quality, reliability and customer satisfaction."
          align="center"
          titleSize="lg"
          className="mb-16 md:mb-20"
        />

        {/* ── Timeline wrapper ── */}
        <div className="relative">

          {/* ── Desktop horizontal connector line ── */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[3.75rem] inset-x-0
                       h-px overflow-hidden pointer-events-none"
          >
            {/* Track */}
            <div className="absolute inset-0 bg-neutral-200" />
            {/* Animated fill */}
            <motion.div
              variants={lineVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="absolute inset-0 origin-left
                         bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400"
            />
          </div>

          {/* ── Mobile vertical connector line ── */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute left-1/2 -translate-x-1/2
                       top-0 bottom-0 w-px overflow-hidden pointer-events-none"
          >
            <div className="absolute inset-0 bg-neutral-200" />
            <motion.div
              variants={lineVariantMobile}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="absolute inset-0 origin-top
                         bg-gradient-to-b from-primary-400 via-primary-500 to-accent-400"
            />
          </div>

          {/* ── Steps grid ── */}
          <motion.ol
            variants={stepsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={cn(
              'relative grid gap-10 md:gap-8',
              // Mobile: single column vertical
              'grid-cols-1',
              // Tablet: 2×2
              'sm:grid-cols-2',
              // Desktop: 4-column horizontal
              'lg:grid-cols-4 lg:gap-0',
            )}
          >
            {BUSINESS_PROCESS.map((step, i) => (
              <StepCard
                key={step.title}
                step={step}
                isLast={i === BUSINESS_PROCESS.length - 1}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.ol>
        </div>

      </Container>
    </section>
  )
}
