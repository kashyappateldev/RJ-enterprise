import { useRef }                          from 'react'
import { motion, useReducedMotion,
         useInView }                        from 'framer-motion'
import CountUp                             from 'react-countup'
import { SectionHeading }                  from '@/components/ui/SectionHeading'
import { GlassCard }                       from '@/components/ui/GlassCard'
import { Container }                       from '@/components/common/Container'
import { COMPANY_STATS, EASE }             from '@/constants'
import type { CompanyStat }                from '@/constants'

// ─── Animation variants — module-scope ───────────────────────────────────────

const sectionVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: { duration: 0.65, ease: EASE.outExpo },
  },
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  stat:          CompanyStat
  reducedMotion: boolean
}

function StatCard({ stat, reducedMotion }: StatCardProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div ref={ref} variants={cardVariants}>
      <GlassCard
        variant="dark"
        hover={!reducedMotion}
        padding="lg"
        className="h-full flex flex-col items-center text-center gap-4
                   border-white/10 hover:border-accent-400/40
                   transition-colors duration-300 group"
      >
        {/* Gold accent top bar — scaleX on hover */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-8 right-8 h-[2px] rounded-full
                     bg-gradient-to-r from-accent-400/0 via-accent-400 to-accent-400/0
                     scale-x-0 group-hover:scale-x-100 origin-center
                     transition-transform duration-500"
        />

        {/* Value */}
        <div
          className="font-display font-bold text-5xl md:text-6xl
                     text-white leading-none tracking-tight"
          aria-label={stat.value}
        >
          {stat.isNumeric && inView && !reducedMotion ? (
            <CountUp
              end={stat.numericEnd!}
              duration={2.2}
              suffix={stat.suffix}
              useEasing
              enableScrollSpy={false}
            />
          ) : (
            <span>{stat.value}</span>
          )}
        </div>

        {/* Label */}
        <p className="font-semibold text-base text-primary-200 tracking-wide uppercase
                      text-xs leading-snug">
          {stat.label}
        </p>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="w-10 h-px bg-gradient-to-r from-transparent
                     via-accent-400/60 to-transparent"
        />

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed max-w-[200px]">
          {stat.description}
        </p>
      </GlassCard>
    </motion.div>
  )
}

// ─── StatisticsSection ────────────────────────────────────────────────────────

export function StatisticsSection() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-labelledby="statistics-heading"
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      {/* ── Background ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Deep green base */}
        <div className="absolute inset-0 bg-primary-900" />

        {/* Soft radial glow — centre */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[900px] h-[600px] rounded-full
                     bg-primary-700/40 blur-[120px]"
        />

        {/* Gold accent — top-right */}
        <div
          className="absolute -top-32 -right-32
                     w-[500px] h-[500px] rounded-full
                     bg-accent-500/10 blur-[100px]"
        />

        {/* Gold accent — bottom-left */}
        <div
          className="absolute -bottom-32 -left-32
                     w-[400px] h-[400px] rounded-full
                     bg-accent-400/8 blur-[90px]"
        />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Top separator from Quality section */}
        <div
          className="absolute top-0 inset-x-0 h-px
                     bg-gradient-to-r from-transparent via-primary-600/60 to-transparent"
        />
      </div>

      {/* ── Content ── */}
      <Container className="relative z-10">

        {/* Heading — override text colours for dark bg */}
        <div className="[&_h2]:text-white [&_p]:text-white/60 [&_span.text-gradient-primary]:text-accent-300
                        [&_.text-gradient-primary]:bg-none [&_.text-gradient-primary]:text-accent-300
                        [&_.text-primary-700]:text-primary-300 [&_.bg-primary-500]:bg-primary-400">
          <SectionHeading
            eyebrow="OUR COMMITMENT"
            title="Trusted Agricultural Excellence"
            highlight="Agricultural Excellence"
            description="Every partnership begins with trust, quality and reliable agricultural sourcing."
            align="center"
            titleSize="lg"
            className="mb-14 md:mb-16"
          />
        </div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
        >
          {COMPANY_STATS.map((stat) => (
            <StatCard
              key={stat.label}
              stat={stat}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

      </Container>
    </section>
  )
}
