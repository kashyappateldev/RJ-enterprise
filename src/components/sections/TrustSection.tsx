import { useReducedMotion, motion } from 'framer-motion'
import { Users, ShieldCheck, Truck, Handshake } from 'lucide-react'
import { SectionWrapper }  from '@/components/ui/SectionWrapper'
import { SectionHeading }  from '@/components/ui/SectionHeading'
import { IconWrapper }     from '@/components/ui/IconWrapper'
import { EASE } from '@/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrustCard {
  Icon:        React.ElementType
  title:       string
  description: string
  accent:      'primary' | 'accent'
}

// ─── Static data — plain objects, icons resolved at render time ───────────────

const CARDS: TrustCard[] = [
  {
    Icon:        Users,
    title:       'Direct Farmer Network',
    description: 'We work directly with farmers to ensure authentic sourcing and consistent quality at every step.',
    accent:      'primary',
  },
  {
    Icon:        ShieldCheck,
    title:       'Premium Quality',
    description: 'Every product is carefully selected and verified to maintain the highest agricultural standards.',
    accent:      'accent',
  },
  {
    Icon:        Truck,
    title:       'Pan India Supply',
    description: 'Reliable agricultural products sourced and delivered to businesses across every region of India.',
    accent:      'primary',
  },
  {
    Icon:        Handshake,
    title:       'Trusted Brokerage',
    description: 'Transparent communication and long-term business relationships built on integrity and trust.',
    accent:      'accent',
  },
]

// ─── Animation variants — defined outside component, never recreated ──────────

const gridVariants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.1,
    },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.65, ease: EASE.outExpo },
  },
}

// ─── TrustCard sub-component ──────────────────────────────────────────────────

interface TrustCardProps extends TrustCard {
  index: number
  reducedMotion: boolean
}

function TrustCardItem({ Icon, title, description, accent, reducedMotion }: TrustCardProps) {
  const isAccent = accent === 'accent'

  return (
    <motion.article
      variants={cardVariants}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -8,
              transition: { type: 'spring', stiffness: 320, damping: 24 },
            }
      }
      className="group relative flex flex-col gap-5 rounded-2xl bg-white p-7
                 border border-neutral-100
                 shadow-soft hover:shadow-soft-xl
                 transition-shadow duration-500
                 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
    >
      {/* Hover glow — GPU-composited opacity change only, no layout shift */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-500 pointer-events-none
                    ${isAccent
                      ? 'bg-gradient-to-br from-accent-50/80 via-transparent to-transparent'
                      : 'bg-gradient-to-br from-primary-50/80 via-transparent to-transparent'
                    }`}
      />

      {/* Top accent line — scales in on hover */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-6 right-6 h-[2px] rounded-full
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-500 origin-left
                    ${isAccent
                      ? 'bg-gradient-to-r from-accent-400 to-accent-300'
                      : 'bg-gradient-to-r from-primary-500 to-primary-400'
                    }`}
      />

      {/* Icon */}
      <motion.div
        whileHover={
          reducedMotion
            ? undefined
            : {
                scale:    1.1,
                rotate:   isAccent ? 8 : -8,
                transition: { type: 'spring', stiffness: 400, damping: 18 },
              }
        }
        className="w-fit"
      >
        <IconWrapper
          variant={isAccent ? 'accent' : 'primary'}
          size="lg"
          rounded="xl"
          className={`transition-colors duration-300
            ${isAccent
              ? 'group-hover:bg-accent-500  group-hover:text-white'
              : 'group-hover:bg-primary-700 group-hover:text-white'
            }`}
        >
          <Icon size={22} strokeWidth={1.75} />
        </IconWrapper>
      </motion.div>

      {/* Text */}
      <div className="flex flex-col gap-2 relative">
        <h3
          className={`font-display font-semibold text-lg leading-snug
                      text-neutral-900 transition-colors duration-300
                      ${isAccent
                        ? 'group-hover:text-accent-700'
                        : 'group-hover:text-primary-700'
                      }`}
        >
          {title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom accent dot */}
      <div
        aria-hidden="true"
        className={`mt-auto w-6 h-1 rounded-full
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    ${isAccent ? 'bg-accent-400' : 'bg-primary-500'}`}
      />
    </motion.article>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TrustSection() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <SectionWrapper
      bg="light"
      pad="lg"
      containerSize="lg"
      aria-label="Why businesses trust RJ Enterprise"
    >
      {/* ── Heading ── */}
      <SectionHeading
        eyebrow="Why Choose RJ Enterprise"
        title="Trusted by Businesses Across India"
        highlight="Businesses Across India"
        description="We connect farmers and businesses through quality, transparency, and dependable agricultural sourcing."
        align="center"
        titleSize="lg"
        className="mb-14 md:mb-16"
      />

      {/* ── Card grid ── */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {CARDS.map((card, i) => (
          <TrustCardItem
            key={card.title}
            {...card}
            index={i}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>

      {/* ── Bottom divider accent ── */}
      <div
        aria-hidden="true"
        className="mt-16 md:mt-20 mx-auto w-24 h-px
                   bg-gradient-to-r from-transparent via-primary-300 to-transparent"
      />
    </SectionWrapper>
  )
}
