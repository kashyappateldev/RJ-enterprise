export interface CompanyStat {
  value:       string
  label:       string
  description: string
  /** True when value is purely numeric (enables CountUp animation) */
  isNumeric:   boolean
  /** Numeric end value — only used when isNumeric is true */
  numericEnd?: number
  /** Suffix appended after the counter — e.g. "+" */
  suffix?:     string
}

export const COMPANY_STATS: CompanyStat[] = [
  {
    value:      '11+',
    label:      'Agricultural Products',
    description: 'Wide range of premium agricultural commodities.',
    isNumeric:  true,
    numericEnd: 11,
    suffix:     '+',
  },
  {
    value:      'Pan India',
    label:      'Business Network',
    description: 'Serving customers across India.',
    isNumeric:  false,
  },
  {
    value:      '100%',
    label:      'Quality Focus',
    description: 'Committed to sourcing premium products.',
    isNumeric:  true,
    numericEnd: 100,
    suffix:     '%',
  },
  {
    value:      'Direct',
    label:      'Farmer Network',
    description: 'Working closely with trusted farmers.',
    isNumeric:  false,
  },
]
