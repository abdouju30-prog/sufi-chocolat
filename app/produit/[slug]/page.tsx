import type { Metadata } from 'next'
import ProductGallery        from '@/components/product/ProductGallery'
import ProductInfo           from '@/components/product/ProductInfo'
import ProductPersonalization from '@/components/product/ProductPersonalization'
import ProductTabs           from '@/components/product/ProductTabs'
import CrossSell             from '@/components/product/CrossSell'
import ReviewsSection        from '@/components/product/ReviewsSection'
import Breadcrumb            from '@/components/product/Breadcrumb'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title:       `Bouquet Signature Rosa — Sufi`,
    description: `Découvrez notre Bouquet Signature Rosa, composé de roses fraîches et de pivoines saisonnières. Livraison le jour même disponible.`,
    openGraph: {
      title:  `Bouquet Signature Rosa — Sufi`,
      images: ['https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=1200&q=85'],
    },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-white min-h-screen">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumb items={[
          { label: 'Boutique',  href: '/boutique' },
          { label: 'Bouquets', href: '/boutique/bouquets' },
          { label: 'Bouquet Signature Rosa' },
        ]} />
      </div>

      {/* Main product area */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10"
        aria-label="Détails du produit"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Gallery — 6 cols */}
          <div className="lg:col-span-6">
            <ProductGallery />
          </div>

          {/* Info + Personalization — 6 cols */}
          <div className="lg:col-span-6 space-y-6">
            <ProductInfo />
            <ProductPersonalization />
          </div>
        </div>
      </section>

      {/* Tabs — description, composition, livraison, avis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <ProductTabs />
      </div>

      {/* Cross-sell */}
      <CrossSell />

      {/* Reviews */}
      <ReviewsSection />
    </div>
  )
}
