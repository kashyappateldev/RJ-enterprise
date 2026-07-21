import { useState, useEffect } from 'react'
import { BREAKPOINTS, type Breakpoint } from '@/constants'

export function useBreakpoint(bp: Breakpoint): boolean {
  const [matches, setMatches] = useState(
    () => window.innerWidth >= BREAKPOINTS[bp],
  )

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINTS[bp]}px)`)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [bp])

  return matches
}
