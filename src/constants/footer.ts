import { SITE, NAV_LINKS } from './site'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string
  href:  string
}

export interface FooterContact {
  type:  'address' | 'phone' | 'email'
  label: string
  value: string
  /** href for anchor — empty string when not yet available */
  href:  string
}

export interface FooterSocial {
  platform: string
  href:     string
  /** Matches key in the Lucide icon map inside Footer.tsx */
  icon:     'facebook' | 'instagram' | 'linkedin' | 'twitter'
}

// ─── Quick links — sourced from NAV_LINKS, filtered to footer subset ──────────

export const FOOTER_QUICK_LINKS: FooterLink[] = [
  { label: 'Home',     href: NAV_LINKS[0].href },
  { label: 'About',    href: NAV_LINKS[1].href },
  { label: 'Products', href: NAV_LINKS[2].href },
  { label: 'Contact',  href: NAV_LINKS[5].href },
]

// ─── Contact information — use placeholders until real details are confirmed ──

export const FOOTER_CONTACT: FooterContact[] = [
  {
    type:  'address',
    label: 'Address',
    value: 'Coming Soon',
    href:  '',
  },
  {
    type:  'phone',
    label: 'Phone',
    value: 'Coming Soon',
    href:  '',
  },
  {
    type:  'email',
    label: 'Email',
    value: 'Coming Soon',
    href:  '',
  },
]

// ─── Social links — placeholder hrefs until accounts are confirmed ────────────

export const FOOTER_SOCIAL: FooterSocial[] = [
  { platform: 'Facebook',  href: '#', icon: 'facebook'  },
  { platform: 'Instagram', href: '#', icon: 'instagram' },
  { platform: 'LinkedIn',  href: '#', icon: 'linkedin'  },
  { platform: 'Twitter',   href: '#', icon: 'twitter'   },
]

// ─── Bottom bar ───────────────────────────────────────────────────────────────

export const FOOTER_COPYRIGHT = {
  companyName: SITE.name,
  /** Computed at runtime in the component — stored here for easy override */
  year:        null as null | number,
} as const

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy',  href: '/privacy' },
  { label: 'Terms of Service', href: '/terms'   },
]
