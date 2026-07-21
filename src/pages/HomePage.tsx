import { SEO }                     from '@/components/common'
import { HeroSection }             from '@/components/sections/HeroSection'
import { TrustSection }            from '@/components/sections/TrustSection'
import { CompanyStorySection }     from '@/components/sections/CompanyStorySection'
import { ProductsShowcaseSection } from '@/components/sections/ProductsShowcaseSection'
import { ProductQualitySection }   from '@/components/sections/ProductQualitySection'
import { StatisticsSection }       from '@/components/sections/StatisticsSection'
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
      <CompanyStorySection />
      <ProductsShowcaseSection />
      <ProductQualitySection />
      <StatisticsSection />
    </>
  )
}
