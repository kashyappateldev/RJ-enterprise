import { motion } from 'framer-motion'
import { ArrowDown, Leaf, ShieldCheck, Users } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { BRAND, SITE } from '@/constants'
import { AboutValuesSection } from '@/components/sections/AboutValuesSection'

export default function AboutPage() {
  return (
    <main className="overflow-hidden">

      {/* ─────────────────────────────────────────────────────────────
          1. ABOUT HERO
      ───────────────────────────────────────────────────────────── */}

      <section className="relative min-h-[70vh] flex items-center bg-primary-950 text-white">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[500px]
                     rounded-full bg-primary-700/20 blur-[100px]
                     pointer-events-none"
        />

        <Container className="relative z-10 py-24">
          <div className="max-w-4xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="inline-flex items-center gap-2
                           px-4 py-2 rounded-full
                           bg-accent-500/15
                           border border-accent-500/30
                           text-[#E4C46A]
                           text-xs font-semibold uppercase
                           tracking-[0.15em]"
              >
                <Leaf size={14} aria-hidden="true" />
                About RJ Enterprise
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-7 font-display font-bold
                         text-4xl sm:text-5xl lg:text-7xl
                         leading-[1.05] tracking-tight"
            >
              From India&apos;s Farms
              <span className="block text-primary-400">
                to Your Business
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 max-w-2xl
                         text-lg sm:text-xl
                         leading-relaxed text-neutral-300"
            >
              {SITE.tagline}. Connecting trusted farmers with
              businesses through quality-focused agricultural
              sourcing and dependable relationships.
            </motion.p>

            {/* Small brand statement */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex items-center gap-4"
            >
              <div
                className="flex items-center justify-center
                           w-12 h-12 rounded-xl
                           bg-white/5 border border-white/10"
              >
                <span className="text-accent-400 font-bold">
                  RJ
                </span>
              </div>

              <div>
                <p className="text-white font-semibold">
                  {BRAND.company}
                </p>
                <p className="text-sm text-neutral-500">
                  Trusted agricultural sourcing
                </p>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2
                       hidden sm:flex flex-col items-center gap-2
                       text-neutral-500"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">
              Discover
            </span>
            <ArrowDown size={15} aria-hidden="true" />
          </motion.div>
        </Container>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. WHO WE ARE
      ───────────────────────────────────────────────────────────── */}

      <section className="relative bg-white py-20 sm:py-28">
        <Container>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl
                              border border-neutral-200
                              shadow-xl"
              >
                <img
                  src="/images/about-farmer-business.jpg"
                  alt="Connecting farmers with businesses"
                  className="w-full aspect-[4/3]
                             object-cover"
                />
              </div>

              {/* Decorative card */}
              <div
                className="absolute -bottom-6 -right-4 sm:right-6
                           bg-white rounded-2xl
                           border border-neutral-200
                           shadow-lg p-5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl
                               bg-primary-50
                               flex items-center justify-center"
                  >
                    <Users
                      size={19}
                      className="text-primary-700"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      Farmer Network
                    </p>
                    <p className="text-xs text-neutral-500">
                      Built on trusted relationships
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>


            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="text-primary-700
                           text-xs font-bold uppercase
                           tracking-[0.16em]"
              >
                Who We Are
              </span>

              <h2
                className="mt-4 font-display font-bold
                           text-3xl sm:text-4xl
                           text-neutral-900
                           tracking-tight"
              >
                Connecting agriculture
                <span className="block text-primary-700">
                  with opportunity
                </span>
              </h2>

              <div className="mt-6 space-y-5
                              text-neutral-600
                              leading-relaxed"
              >
                <p>
                  {SITE.name} is focused on connecting trusted
                  farmers with businesses looking for reliable
                  agricultural products and sourcing relationships.
                </p>

                <p>
                  We believe that strong agricultural supply begins
                  with trusted connections. By working closely with
                  farming communities and understanding business
                  requirements, we aim to make sourcing simpler,
                  more transparent and dependable.
                </p>

                <p>
                  Our approach is built around quality-focused
                  products, reliable relationships and a commitment
                  to creating long-term value for the businesses and
                  communities we work with.
                </p>
              </div>

              {/* Supporting principles */}
              <div className="mt-9 grid sm:grid-cols-2 gap-5">

                <div className="flex gap-3">
                  <div
                    className="w-9 h-9 rounded-lg
                               bg-primary-50
                               flex items-center justify-center
                               shrink-0"
                  >
                    <ShieldCheck
                      size={18}
                      className="text-primary-700"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      Quality Focus
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                      Focused on dependable agricultural products.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div
                    className="w-9 h-9 rounded-lg
                               bg-primary-50
                               flex items-center justify-center
                               shrink-0"
                  >
                    <Users
                      size={18}
                      className="text-primary-700"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      Trusted Relationships
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                      Building lasting farmer and business connections.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </Container>
      </section>
      <AboutValuesSection />
    </main>
  )
}