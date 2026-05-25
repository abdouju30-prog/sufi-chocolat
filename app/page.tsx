import HeroSection            from '@/components/homepage/HeroSection'
import TrustBar               from '@/components/homepage/TrustBar'
import OccasionsSection       from '@/components/homepage/OccasionsSection'
import CategoriesSection      from '@/components/homepage/CategoriesSection'
import GiftConfiguratorTeaser from '@/components/homepage/GiftConfiguratorTeaser'
import BestSellers            from '@/components/homepage/BestSellers'
import PersonalizationSection from '@/components/homepage/PersonalizationSection'
import Testimonials           from '@/components/homepage/Testimonials'
import InstagramFeed          from '@/components/homepage/InstagramFeed'
import Newsletter             from '@/components/homepage/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <OccasionsSection />
      <CategoriesSection />
      <GiftConfiguratorTeaser />
      <BestSellers />
      <PersonalizationSection />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}
