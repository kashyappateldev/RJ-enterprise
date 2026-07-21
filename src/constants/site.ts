export const SITE = {
  name:        'RJ Enterprise',
  tagline:     'Premium Agricultural Solutions',
  description: 'RJ Enterprise delivers premium agricultural products and solutions, cultivating excellence from farm to table.',
  url:         'https://rjenterprise.com',
  email:       'info@rjenterprise.com',
  phone:       '+1 (800) RJ-FARMS',
  address:     '123 Harvest Road, AgriCity, AC 00001',
} as const

export const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
] as const

export const SOCIAL_LINKS = [
  { platform: 'Facebook',  href: 'https://facebook.com/rjenterprise',  icon: 'facebook' },
  { platform: 'Instagram', href: 'https://instagram.com/rjenterprise', icon: 'instagram' },
  { platform: 'LinkedIn',  href: 'https://linkedin.com/rjenterprise',  icon: 'linkedin' },
  { platform: 'Twitter',   href: 'https://twitter.com/rjenterprise',   icon: 'twitter' },
] as const
