import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useLenis } from '@/hooks'
import { VARIANTS } from '@/constants'

export function Layout() {
  useLenis()
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={VARIANTS.fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
