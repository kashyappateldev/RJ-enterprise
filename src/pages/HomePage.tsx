import { SEO }          from '@/components/common'
import { HeroSection }  from '@/components/sections/HeroSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { SITE } from '@/constants'

export default function HomePage() {
  return (
    <>
      <SEO
        title={SITE.name}
        description={SITE.description}
        canonical={SITE.url}
      />
      <HeroSection />
      <TrustSection />
    </>
  )
}
