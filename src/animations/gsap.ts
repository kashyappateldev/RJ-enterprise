import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GSAP_DEFAULTS } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

/** Fade + slide up on scroll */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element,
  overrides: gsap.TweenVars = {},
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    {
      opacity:  1,
      y:        0,
      duration: GSAP_DEFAULTS.duration,
      ease:     GSAP_DEFAULTS.ease,
      stagger:  GSAP_DEFAULTS.stagger,
      scrollTrigger: {
        trigger,
        start: 'top 85%',
        once:  true,
      },
      ...overrides,
    },
  )
}

/** Horizontal reveal */
export function revealFromLeft(targets: gsap.TweenTarget, trigger: Element) {
  return gsap.fromTo(
    targets,
    { opacity: 0, x: -60 },
    {
      opacity:  1,
      x:        0,
      duration: GSAP_DEFAULTS.duration,
      ease:     GSAP_DEFAULTS.ease,
      scrollTrigger: { trigger, start: 'top 80%', once: true },
    },
  )
}

/** Parallax effect */
export function parallax(target: gsap.TweenTarget, trigger: Element, yPercent = 20) {
  return gsap.fromTo(
    target,
    { yPercent: -yPercent },
    {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start:  'top bottom',
        end:    'bottom top',
        scrub:  true,
      },
    },
  )
}
