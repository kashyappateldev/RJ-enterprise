/** Spacing scale in rem — mirrors Tailwind spacing */
export const SPACING = {
  0:   '0rem',
  1:   '0.25rem',
  2:   '0.5rem',
  3:   '0.75rem',
  4:   '1rem',
  5:   '1.25rem',
  6:   '1.5rem',
  8:   '2rem',
  10:  '2.5rem',
  12:  '3rem',
  16:  '4rem',
  18:  '4.5rem',
  20:  '5rem',
  24:  '6rem',
  32:  '8rem',
  40:  '10rem',
  48:  '12rem',
  64:  '16rem',
} as const

/** Section vertical padding presets */
export const SECTION_PADDING = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
} as const

/** Container max-width presets */
export const CONTAINER_SIZE = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-7xl',
  xl:   'max-w-8xl',
  full: 'max-w-full',
} as const
