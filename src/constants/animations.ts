import type { Variants, Transition } from 'framer-motion'

// ─── Easings ────────────────────────────────────────────────────────────────

export const EASE = {
  outExpo:   [0.19, 1, 0.22, 1],
  inExpo:    [0.95, 0.05, 0.795, 0.035],
  inOutExpo: [0.87, 0, 0.13, 1],
  outQuart:  [0.25, 1, 0.5, 1],
  spring:    { type: 'spring', stiffness: 100, damping: 20 },
} as const

// ─── Transitions ────────────────────────────────────────────────────────────

export const TRANSITION: Record<string, Transition> = {
  fast:   { duration: 0.3, ease: EASE.outExpo },
  base:   { duration: 0.5, ease: EASE.outExpo },
  slow:   { duration: 0.8, ease: EASE.outExpo },
  spring: { type: 'spring', stiffness: 100, damping: 20 },
}

// ─── Framer Motion Variants ──────────────────────────────────────────────────

export const VARIANTS = {
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: TRANSITION.base },
  } satisfies Variants,

  slideUp: {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: TRANSITION.base },
  } satisfies Variants,

  slideDown: {
    hidden:  { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0, transition: TRANSITION.base },
  } satisfies Variants,

  slideLeft: {
    hidden:  { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0, transition: TRANSITION.base },
  } satisfies Variants,

  slideRight: {
    hidden:  { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: TRANSITION.base },
  } satisfies Variants,

  scaleIn: {
    hidden:  { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: TRANSITION.base },
  } satisfies Variants,

  staggerContainer: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  } satisfies Variants,

  staggerItem: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: TRANSITION.base },
  } satisfies Variants,
} as const

// ─── GSAP Defaults ───────────────────────────────────────────────────────────

export const GSAP_DEFAULTS = {
  duration: 0.8,
  ease: 'power4.out',
  stagger: 0.1,
} as const
