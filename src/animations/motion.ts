import { motion } from 'framer-motion'
import { VARIANTS } from '@/constants'

/** Wraps children in a stagger container */
export const StaggerContainer = motion.div

export const staggerContainerProps = {
  variants:  VARIANTS.staggerContainer,
  initial:   'hidden',
  whileInView: 'visible',
  viewport:  { once: true, margin: '-80px' },
} as const

/** Single stagger item */
export const StaggerItem = motion.div

export const staggerItemProps = {
  variants: VARIANTS.staggerItem,
} as const

/** Fade-in on scroll */
export const FadeIn = motion.div

export const fadeInProps = (delay = 0) => ({
  variants:    VARIANTS.fadeIn,
  initial:     'hidden',
  whileInView: 'visible',
  viewport:    { once: true, margin: '-60px' },
  transition:  { delay },
})

/** Slide up on scroll */
export const SlideUp = motion.div

export const slideUpProps = (delay = 0) => ({
  variants:    VARIANTS.slideUp,
  initial:     'hidden',
  whileInView: 'visible',
  viewport:    { once: true, margin: '-60px' },
  transition:  { delay },
})
