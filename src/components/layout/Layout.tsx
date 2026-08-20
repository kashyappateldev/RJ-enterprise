import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { Navbar } from './Navbar'
import { Footer } from './Footer'

import { useLenis } from '@/hooks'

export function Layout() {
  useLenis()

  const { pathname } = useLocation()

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─────────────────────────────────────────────
          Navbar
      ───────────────────────────────────────────── */}

      <Navbar />

      {/* ─────────────────────────────────────────────
          Page Content

          IMPORTANT:
          Keep Outlet directly inside main.
          Do not wrap it with AnimatePresence or
          a pathname-keyed motion component.
      ───────────────────────────────────────────── */}

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ─────────────────────────────────────────────
          Footer
      ───────────────────────────────────────────── */}

      <Footer />
    </div>
  )
}

export default Layout