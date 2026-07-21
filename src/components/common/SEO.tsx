import { Helmet } from 'react-helmet-async'
import { SITE } from '@/constants'
import type { SEOMeta } from '@/types'

interface SEOProps extends SEOMeta {}

export function SEO({
  title,
  description = SITE.description,
  keywords = [],
  ogImage,
  canonical,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title === SITE.name ? title : `${title} | ${SITE.name}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE.name} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  )
}
