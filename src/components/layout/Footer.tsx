import { Link }                                    from 'react-router-dom'
import { motion, useReducedMotion }                from 'framer-motion'
import { MapPin, Phone, Mail,
         Facebook, Instagram, Linkedin, Twitter }  from 'lucide-react'
import { Container }                               from '@/components/common/Container'
import { cn }                                      from '@/utils'
import { SITE, EASE,
         FOOTER_QUICK_LINKS, FOOTER_CONTACT,
         FOOTER_SOCIAL, FOOTER_COPYRIGHT,
         FOOTER_LEGAL_LINKS }                      from '@/constants'
import type { FooterContact, FooterSocial }        from '@/constants'

// ─── Icon maps — resolved at module scope, never recreated ───────────────────

const SOCIAL_ICON_MAP = {
  facebook:  Facebook,
  instagram: Instagram,
  linkedin:  Linkedin,
  twitter:   Twitter,
} as const satisfies Record<FooterSocial['icon'], React.ElementType>

const CONTACT_ICON_MAP = {
  address: MapPin,
  phone:   Phone,
  email:   Mail,
} as const satisfies Record<FooterContact['type'], React.ElementType>

// ─── Animation variant — module-scope ────────────────────────────────────────

const footerVariant = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.7, ease: EASE.outExpo },
  },
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const reducedMotion = useReducedMotion() ?? false
  const year          = new Date().getFullYear()

  // When reduced motion is preferred, skip the reveal animation entirely —
  // no hidden→visible flash, no layout shift, no wasted composite layer.
  const motionProps = reducedMotion
    ? {}
    : {
        variants:    footerVariant,
        initial:     'hidden' as const,
        whileInView: 'visible' as const,
        viewport:    { once: true, margin: '-60px' },
      }

  return (
    <footer
      aria-label={`${SITE.name} site footer`}
      className="relative bg-gradient-to-b from-primary-950 to-neutral-950
                 text-neutral-400 overflow-hidden"
    >
      {/* ── Top accent border ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px
                   bg-gradient-to-r from-transparent via-primary-600/50 to-transparent"
      />

      {/* ── Subtle radial warmth — does not compete with CTA section ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2
                   w-[600px] h-[300px] rounded-full
                   bg-primary-800/20 blur-[80px] pointer-events-none"
      />

      <motion.div {...motionProps}>
        <Container className="relative z-10">

          {/* ── Main grid ── */}
          <div className="pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* ── Col 1 — Brand ── */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 w-fit
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-primary-500 focus-visible:ring-offset-2
                           focus-visible:ring-offset-primary-950 rounded-lg"
                aria-label={`${SITE.name} — go to homepage`}
              >
                <span
                  className="w-9 h-9 rounded-xl bg-primary-700 flex items-center
                             justify-center text-white text-sm font-bold shrink-0"
                  aria-hidden="true"
                >
                  RJ
                </span>
                <span className="font-display font-bold text-lg text-white">
                  {SITE.name}
                </span>
              </Link>

              <p className="text-sm leading-relaxed text-neutral-400 max-w-[260px]">
                {SITE.tagline}. Connecting trusted farmers with businesses across India.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2.5" role="list" aria-label="Social media links">
                {FOOTER_SOCIAL.map((s) => {
                  const Icon = SOCIAL_ICON_MAP[s.icon]
                  return (
                    <a
                      key={s.platform}
                      href={s.href}
                      role="listitem"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${SITE.name} on ${s.platform}`}
                      className="w-9 h-9 rounded-full
                                 bg-white/5 border border-white/10
                                 flex items-center justify-center
                                 text-neutral-400
                                 hover:bg-primary-700 hover:text-white hover:border-primary-700
                                 hover:scale-110
                                 transition-all duration-300
                                 focus-visible:outline-none focus-visible:ring-2
                                 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                                 focus-visible:ring-offset-primary-950"
                    >
                      <Icon size={15} aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* ── Col 2 — Quick Links ── */}
            <div className="flex flex-col gap-5">
              <h3 className="text-white font-semibold text-xs uppercase tracking-[0.12em]">
                Quick Links
              </h3>
              <nav aria-label="Footer quick links">
                <ul className="flex flex-col gap-2.5">
                  {FOOTER_QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-neutral-400
                                   hover:text-primary-400
                                   transition-colors duration-200
                                   focus-visible:outline-none focus-visible:rounded
                                   focus-visible:ring-2 focus-visible:ring-primary-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ── Col 3 — Business Information ── */}
            <div className="flex flex-col gap-5">
              <h3 className="text-white font-semibold text-xs uppercase tracking-[0.12em]">
                Business Information
              </h3>
              {/* <address> is the correct semantic element for contact details */}
              <address className="not-italic flex flex-col gap-3">
                {FOOTER_CONTACT.map((item) => {
                  const Icon = CONTACT_ICON_MAP[item.type]
                  const isPlaceholder = item.value === 'Coming Soon'

                  const inner = (
                    <span className="flex items-start gap-2.5">
                      <Icon
                        size={14}
                        aria-hidden="true"
                        className={cn(
                          'mt-0.5 shrink-0',
                          isPlaceholder ? 'text-neutral-600' : 'text-primary-500',
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm leading-relaxed',
                          isPlaceholder ? 'text-neutral-600 italic' : 'text-neutral-400',
                        )}
                      >
                        {item.value}
                      </span>
                    </span>
                  )

                  // Only render as anchor when a real href exists
                  if (!isPlaceholder && item.href) {
                    return (
                      <a
                        key={item.type}
                        href={item.href}
                        className="hover:text-primary-400 transition-colors duration-200
                                   focus-visible:outline-none focus-visible:rounded
                                   focus-visible:ring-2 focus-visible:ring-primary-500"
                      >
                        {inner}
                      </a>
                    )
                  }

                  return <div key={item.type}>{inner}</div>
                })}
              </address>
            </div>

            {/* ── Col 4 — Follow Us ── */}
            <div className="flex flex-col gap-5">
              <h3 className="text-white font-semibold text-xs uppercase tracking-[0.12em]">
                Follow Us
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Stay connected for updates on premium agricultural products and sourcing.
              </p>
              <ul className="flex flex-col gap-2.5">
                {FOOTER_SOCIAL.map((s) => {
                  const Icon = SOCIAL_ICON_MAP[s.icon]
                  return (
                    <li key={s.platform}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${SITE.name} on ${s.platform}`}
                        className="inline-flex items-center gap-2.5
                                   text-sm text-neutral-400
                                   hover:text-primary-400
                                   transition-colors duration-200
                                   focus-visible:outline-none focus-visible:rounded
                                   focus-visible:ring-2 focus-visible:ring-primary-500"
                      >
                        <Icon size={14} aria-hidden="true" />
                        {s.platform}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div
            className="border-t border-white/8
                       py-6
                       flex flex-col sm:flex-row items-center justify-between
                       gap-3 text-xs text-neutral-600"
          >
            <p>
              © {FOOTER_COPYRIGHT.year ?? year}{' '}
              <span className="text-neutral-500">{FOOTER_COPYRIGHT.companyName}</span>
              . All rights reserved.
            </p>

            <nav aria-label="Legal links">
              <ul className="flex items-center gap-4 list-none p-0 m-0">
                {FOOTER_LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="hover:text-neutral-300 transition-colors duration-200
                                 focus-visible:outline-none focus-visible:rounded
                                 focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </Container>
      </motion.div>
    </footer>
  )
}
