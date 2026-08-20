import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/common'
import { NAV_LINKS, SITE, VARIANTS, BRAND } from '@/constants'
import { useScrollPosition } from '@/hooks'
import { cn } from '@/utils'

export function Navbar() {
  const { isScrolled } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Services is intentionally hidden from the main navigation.
  const visibleNavLinks = NAV_LINKS.filter(
    (link) => link.href !== '/services',
  )

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50',
        'transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft-sm border-b border-neutral-100'
          : 'bg-transparent',
      )}
    >
      <Container>
        <nav
          className="flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          {/* ─────────────────────────────────────────────
              Logo
          ───────────────────────────────────────────── */}

          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl"
            aria-label={`${SITE.name} home`}
          >
            <img
              src={BRAND.logo}
              alt={SITE.name}
              className="h-12 w-auto object-contain"
              loading="eager"
            />

            <span
              className={cn(
                'transition-colors duration-300',
                isScrolled
                  ? 'text-primary-800'
                  : 'text-white',
              )}
            >
              {SITE.name}
            </span>
          </Link>

          {/* ─────────────────────────────────────────────
              Desktop Navigation
              Home / About / Products / Blog / Contact
          ───────────────────────────────────────────── */}

          <ul
            className="
              hidden lg:flex
              absolute left-1/2
              -translate-x-1/2
              items-center gap-1
            "
          >
            {visibleNavLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2',
                      'rounded-full',
                      'text-sm font-medium',
                      'transition-colors duration-200',

                      isActive
                        ? isScrolled
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-primary-800 bg-white'
                        : isScrolled
                          ? [
                              'text-neutral-700',
                              'hover:text-primary-700',
                              'hover:bg-neutral-50',
                            ].join(' ')
                          : [
                              'text-white/90',
                              'hover:text-white',
                              'hover:bg-white/10',
                            ].join(' '),
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ─────────────────────────────────────────────
              Mobile Toggle
          ───────────────────────────────────────────── */}

          <button
            type="button"
            className={cn(
              'lg:hidden',
              'p-2 rounded-lg',
              'transition-colors duration-200',
              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-primary-500',

              isScrolled
                ? [
                    'text-neutral-700',
                    'hover:bg-neutral-100',
                  ].join(' ')
                : [
                    'text-white',
                    'hover:bg-white/10',
                  ].join(' '),
            )}
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={
              mobileOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </nav>
      </Container>

      {/* ─────────────────────────────────────────────
          Mobile Menu
      ───────────────────────────────────────────── */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={VARIANTS.slideDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="
              lg:hidden
              bg-white
              border-t border-neutral-100
              shadow-soft
            "
          >
            <Container>
              <ul className="py-4 flex flex-col gap-1">
                {visibleNavLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block',
                          'px-4 py-3',
                          'rounded-xl',
                          'text-sm font-medium',
                          'transition-colors duration-200',

                          isActive
                            ? 'text-primary-700 bg-primary-50'
                            : [
                                'text-neutral-700',
                                'hover:text-primary-700',
                                'hover:bg-neutral-50',
                              ].join(' '),
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}