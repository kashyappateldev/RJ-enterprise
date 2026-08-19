import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail }         from 'lucide-react'
import { SectionHeading }           from '@/components/ui/SectionHeading'
import { Button }                   from '@/components/ui/Button'
import { Container }                from '@/components/common/Container'
import { EASE }                     from '@/constants'

// ─── Variants — module-scope ──────────────────────────────────────────────────

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

const containerVariantsReduced = {
  hidden:  {},
  visible: {},
}

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE.outExpo } },
}

const itemVariantsReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

// ─── ProductsCTA ──────────────────────────────────────────────────────────────

export function ProductsCTA() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-labelledby="Business Enquiries"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* ── Background ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />

        {/* Centre radial green glow */}
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

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top gold accent separator */}
        <div
          className="absolute top-0 inset-x-0 h-px
                     bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
        />

        {/* Bottom gold shimmer */}
        <div
          className="absolute bottom-0 inset-x-0 h-px
                     bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
        />
      </div>

      {/* ── Content ── */}
      <Container size="md" className="relative z-10">
        <motion.div
          variants={reducedMotion ? containerVariantsReduced : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Heading */}
          <motion.div
            variants={reducedMotion ? itemVariantsReduced : itemVariants}
            className="w-full
                       [&_h2]:text-white
                       [&_p]:text-white/60
                       [&_.text-gradient-primary]:bg-none
                       [&_.text-gradient-primary]:text-accent-300
                       [&_.text-primary-700]:text-primary-300
                       [&_.bg-primary-500]:bg-primary-400"
          >
            <SectionHeading
              
              eyebrow="Business Enquiries"
              title="Looking for Agricultural Products in Bulk?"
              highlight="Agricultural Products in Bulk"
              description="Tell us about your product requirements and our team can discuss suitable agricultural products for your business needs."
              align="center"
              titleSize="lg"
              className="mb-0"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={reducedMotion ? itemVariantsReduced : itemVariants}
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
              Send an Enquiry
            </Button>

            <Button
              variant="white"
              size="lg"
              icon={<Mail size={16} />}
              className="text-primary-900 border-white/30 min-w-[160px]"
              onClick={() => {}}
            >
              Contact Us
            </Button>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  )
}
