/** Pixel breakpoints — mirrors tailwind.config.ts screens */
export const BREAKPOINTS = {
  xs:   480,
  sm:   640,
  md:   768,
  lg:   1024,
  xl:   1280,
  '2xl': 1440,
  '3xl': 1920,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS
