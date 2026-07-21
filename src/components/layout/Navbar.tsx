import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/common'
import { NAV_LINKS, SITE, VARIANTS } from '@/constants'
import { useScrollPosition } from '@/hooks'
import { cn } from '@/utils'

export function Navbar() {
  const { isScrolled } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft-sm border-b border-neutral-100'
          : 'bg-transparent',
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-primary-800"
          >
            <span className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center text-white text-sm font-bold">
              RJ
            </span>
            <span className={cn('transition-colors', isScrolled ? 'text-primary-800' : 'text-white')}>
              {SITE.name}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'text-primary-700 bg-primary-50'
                        : isScrolled
                          ? 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">
              Get in Touch
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/10',
            )}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={VARIANTS.slideDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden bg-white border-t border-neutral-100 shadow-soft"
          >
            <Container>
              <ul className="py-4 flex flex-col gap-1">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                          isActive
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Get in Touch
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
