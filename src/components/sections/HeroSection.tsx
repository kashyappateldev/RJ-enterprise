import { type MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Package,
  MapPin,
  Users,
} from 'lucide-react'
import { Button }    from '@/components/ui/Button'
import { Badge }     from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Container } from '@/components/common'
import { cn }        from '@/utils'
import { TRANSITION, EASE } from '@/constants'

// ─── Static data ─────────────────────────────────────────────────────────────
// Icons resolved at render time — JSX cannot be meaningfully frozen with as const

const TRUST_CHIPS: { label: string; Icon: React.ElementType; size: number }[] = [
  { label: 'Organic Quality', Icon: CheckCircle2, size: 13 },
  { label: 'Farmer Network',  Icon: Users,        size: 13 },
  { label: 'Trusted Broker',  Icon: CheckCircle2, size: 13 },
  { label: 'Pan India',       Icon: MapPin,       size: 13 },
]

const STATS: { Icon: React.ElementType; size: number; value: string; label: string }[] = [
  { Icon: Package, size: 18, value: '11+',       label: 'Products'        },
  { Icon: MapPin,  size: 18, value: 'Pan India', label: 'Business Reach'  },
  { Icon: Users,   size: 18, value: 'Direct',    label: 'Farmer Network'  },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const contentVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.outExpo } },
}

const imageVariants = {
  hidden:  { opacity: 0, x: 60, scale: 0.96 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.9, ease: EASE.outExpo, delay: 0.2 },
  },
}

const statsVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: EASE.outExpo, delay: 0.55 },
  },
}

const chipVariants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.45, ease: EASE.outExpo, delay: 0.55 + i * 0.07 },
  }),
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TrustChip({
  label,
  Icon,
  iconSize,
  index,
}: {
  label:    string
  Icon:     React.ElementType
  iconSize: number
  index:    number
}) {
  return (
    <motion.span
      custom={index}
      variants={chipVariants}
      initial="hidden"
      animate="visible"
      // Scope hover spring to whileHover only — prevents overriding entry transition
      whileHover={{ scale: 1.06, y: -2, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'text-xs font-semibold text-white/90',
        'border border-white/20 bg-white/10 backdrop-blur-sm',
        'cursor-default select-none',
      )}
    >
      <span className="text-accent-400"><Icon size={iconSize} /></span>
      {label}
    </motion.span>
  )
}

function StatItem({
  Icon,
  iconSize,
  value,
  label,
  index,
}: {
  Icon:     React.ElementType
  iconSize: number
  value:    string
  label:    string
  index:    number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE.outExpo, delay: 0.7 + index * 0.1 }}
      className={cn(
        'flex flex-col items-center gap-1 flex-1',
        // Use /20 — valid Tailwind token, sufficient visual separation
        index !== STATS.length - 1 && 'border-r border-white/20',
      )}
    >
      <span className="text-accent-400 mb-0.5"><Icon size={iconSize} /></span>
      <span className="font-display font-bold text-white text-lg leading-none">{value}</span>
      {/* /60 passes 3:1 contrast on dark glass background */}
      <span className="text-white/60 text-[11px] font-medium text-center leading-tight">{label}</span>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  // Mouse parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const imgX    = useSpring(useTransform(mouseX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-12, 12]), { stiffness: 60, damping: 20 })
  const imgY    = useSpring(useTransform(mouseY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-8,  8]),  { stiffness: 60, damping: 20 })
  const statsX  = useSpring(useTransform(mouseX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [8,  -8]),  { stiffness: 50, damping: 18 })
  const statsY  = useSpring(useTransform(mouseY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [6,  -6]),  { stiffness: 50, damping: 18 })

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary-950"
    >
      {/* ── Background layers ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-neutral-950" />

        {/* Radial glow — top left */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-primary-700/20 blur-[120px]" />

        {/* Radial glow — bottom right */}
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-accent-600/10 blur-[100px]" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gold accent line — top */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <Container className="relative z-10 py-28 md:py-32 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center w-full">

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
                Trusted All Across India 🌿
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h1 className="font-display font-bold text-white leading-[1.08] tracking-tight text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">
                Premium{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-accent">Agricultural</span>
                  {/* Underline accent */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.7 }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-accent-500 to-accent-300 origin-left"
                  />
                </span>
                {' '}Products
              </h1>
              <p className="font-display text-white/70 text-lg sm:text-xl lg:text-xl xl:text-2xl font-normal leading-snug">
                Connecting Farmers to Businesses{' '}
                <span className="text-white/90 font-medium">Across India.</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-white/55 text-base leading-relaxed max-w-lg"
            >
              RJ Enterprise is a trusted broker and supplier of premium-quality agricultural
              products, connecting farmers with businesses through reliability, transparency,
              and consistent quality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Button
                variant="accent"
                size="lg"
                iconRight={<ArrowRight size={17} />}
                className="shadow-[0_8px_32px_rgba(245,158,11,0.35)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.45)]"
                onClick={() => {}}
              >
                Explore Products
              </Button>
              {/* border-white/40 gives the white button a visible edge on the dark hero background,
                  matching the visual weight of the accent button's glow */}
              <Button
                variant="white"
                size="lg"
                icon={<Phone size={16} />}
                className="text-primary-900 border-white/40"
                onClick={() => {}}
              >
                Contact Us
              </Button>
            </motion.div>

            {/* Trust chips */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
              {TRUST_CHIPS.map((chip, i) => (
                <TrustChip key={chip.label} label={chip.label} Icon={chip.Icon} iconSize={chip.size} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Image + Stats card ── */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            {/* Parallax image wrapper */}
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
            >
              {/* Image — fetchpriority="high" marks this as the LCP candidate for the browser preload scanner */}
              <div className="aspect-[4/5] xl:aspect-[5/6]">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=85&auto=format&fit=crop"
                  alt="Premium agricultural fields — RJ Enterprise"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-950/30 to-transparent" />

              {/* Gold border shimmer */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
            </motion.div>

            {/* ── Floating stats card ── */}
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              style={{ x: statsX, y: statsY }}
              className="absolute -bottom-6 -left-8 xl:-left-12 z-10"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <GlassCard
                  variant="dark"
                  hover={false}
                  padding="md"
                  className="min-w-[280px] xl:min-w-[320px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-white/10"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                    <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                      RJ Enterprise
                    </span>
                  </div>

                  {/* Stats row — AnimatePresence removed, list is static (no conditional mount/unmount) */}
                  <div className="flex items-stretch gap-0">
                    {STATS.map((stat, i) => (
                      <StatItem
                        key={stat.label}
                        Icon={stat.Icon}
                        iconSize={stat.size}
                        value={stat.value}
                        label={stat.label}
                        index={i}
                      />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* ── Floating accent badge — top right ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ duration: 0.6, ease: EASE.outExpo, delay: 0.8 }}
              className="absolute -top-4 -right-4 xl:-right-6 z-10"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: [6, 10, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="glass rounded-2xl px-4 py-3 shadow-soft-lg border-white/15">
                  <p className="text-white font-display font-bold text-2xl leading-none">100%</p>
                  <p className="text-white/60 text-[11px] font-medium mt-0.5">Quality Assured</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </Container>

      {/* ── Mobile stats strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...TRANSITION.base, delay: 0.6 }}
        className="lg:hidden absolute bottom-0 inset-x-0 z-10"
      >
        <div className="glass border-t border-white/10 px-4 py-4">
          <div className="flex items-stretch justify-around gap-0 max-w-sm mx-auto">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  'flex flex-col items-center gap-0.5 flex-1 px-2',
                  // /20 — valid token, replaces non-standard /15
                  i !== STATS.length - 1 && 'border-r border-white/20',
                )}
              >
                <span className="text-accent-400 mb-0.5"><stat.Icon size={stat.size} /></span>
                <span className="font-display font-bold text-white text-base leading-none">{stat.value}</span>
                {/* /50 replaces non-standard /55 — passes 3:1 on dark glass */}
                <span className="text-white/50 text-[10px] font-medium text-center leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
