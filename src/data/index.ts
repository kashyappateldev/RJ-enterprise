/** Static data — replace with CMS API calls when ready */

export const STATS = [
  { label: 'Years of Excellence', value: 25,   suffix: '+' },
  { label: 'Products Exported',   value: 500,  suffix: '+' },
  { label: 'Global Partners',     value: 120,  suffix: '+' },
  { label: 'Countries Served',    value: 40,   suffix: '+' },
] as const

export const FEATURES = [
  {
    id:          'quality',
    title:       'Premium Quality',
    description: 'Every product meets the highest international agricultural standards.',
    icon:        'award',
  },
  {
    id:          'sustainable',
    title:       'Sustainable Farming',
    description: 'Committed to eco-friendly practices that protect our planet.',
    icon:        'leaf',
  },
  {
    id:          'global',
    title:       'Global Reach',
    description: 'Trusted by partners across 40+ countries worldwide.',
    icon:        'globe',
  },
  {
    id:          'innovation',
    title:       'Innovation Driven',
    description: 'Leveraging modern agri-tech for superior yields and efficiency.',
    icon:        'zap',
  },
] as const
