import { motion } from 'framer-motion'
import {
  Leaf,
  ShieldCheck,
  Truck,
  Handshake,
} from 'lucide-react'
import { Container } from '@/components/common/Container'

const VALUES = [
  {
    icon: Leaf,
    title: 'Direct Farmer Network',
    description:
      'Building trusted connections with farming communities to create dependable sourcing relationships.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    description:
      'A quality-focused approach to agricultural products and sourcing requirements.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply',
    description:
      'Working toward dependable sourcing and supply for businesses across India.',
  },
  {
    icon: Handshake,
    title: 'Trusted Partnerships',
    description:
      'Creating long-term relationships through transparency, communication and mutual trust.',
  },
] as const

export function AboutValuesSection() {
  return (
    <section className="relative bg-neutral-50 py-20 sm:py-28">
      <Container>

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span
            className="text-primary-700
                       text-xs font-bold uppercase
                       tracking-[0.16em]"
          >
            What We Stand For
          </span>

          <h2
            className="mt-4 font-display font-bold
                       text-3xl sm:text-4xl
                       text-neutral-900
                       tracking-tight"
          >
            Built around
            <span className="text-primary-700"> trust and quality</span>
          </h2>

          <p className="mt-5 text-neutral-600 leading-relaxed">
            Our approach is guided by the principles that help us
            build dependable agricultural sourcing relationships
            with farmers and businesses.
          </p>
        </motion.div>


        {/* ── Values grid ── */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((value, index) => {
            const Icon = value.icon

            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group relative
                           bg-white
                           border border-neutral-200
                           rounded-2xl
                           p-6
                           shadow-sm
                           hover:shadow-lg
                           hover:-translate-y-1
                           transition-all duration-300"
              >
                {/* Gold accent */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6
                             h-px
                             bg-gradient-to-r
                             from-transparent
                             via-[#E4C46A]
                             to-transparent
                             opacity-0
                             group-hover:opacity-100
                             transition-opacity duration-300"
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl
                             bg-primary-50
                             border border-primary-100
                             flex items-center justify-center
                             group-hover:bg-primary-700
                             group-hover:border-primary-700
                             transition-colors duration-300"
                >
                  <Icon
                    size={21}
                    className="text-primary-700
                               group-hover:text-[#E4C46A]
                               transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3
                  className="mt-6
                             text-lg font-semibold
                             text-neutral-900"
                >
                  {value.title}
                </h3>

                <p
                  className="mt-3
                             text-sm
                             leading-relaxed
                             text-neutral-500"
                >
                  {value.description}
                </p>

                {/* Number */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-5 right-6
                             text-4xl font-display font-bold
                             text-neutral-100
                             group-hover:text-primary-50
                             transition-colors duration-300"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.article>
            )
          })}
        </div>

      </Container>
    </section>
  )
}

