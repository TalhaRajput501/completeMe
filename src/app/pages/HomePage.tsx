'use client' 
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Watch, Shirt, ShoppingBag, ShirtIcon, SportShoe, Loader } from 'lucide-react'
import CategoryBanner from '@/components/ui/CategoryBanner'
import WhyUs from '@/components/ui/WhyUs'
import Button from '@/components/ui/Button'
import VideoIntro from '@/components/ui/VideoIntro'
import useLandingInfo from '@/hooks/useLandingInfo'
import { toast } from 'sonner'
import { ProductInfoCardProps } from '../../../types/productTypes' 

function HomePage() {

  const { data, error: landingError, loading } = useLandingInfo()
  if (landingError) {
    toast.error(landingError || "Failed to load landing info")
    // return <div className="flex justify-center items-center h-64 text-gray-900 text-4xl">talha error</div>
  }

  const watches: ProductInfoCardProps[] = data?.watch.map((item) => {
    return {
      id: item._id,
      link: item._id ? `/product/watch/${item._id}/${item.name.replace(/\s+/g, '-').toLowerCase()}` : '#',
      imageSrc: item.images[0],
      name: item.name,
      description: item.description,
      iconName: Watch,
      price: item.price
    }
  })

  const shoes: ProductInfoCardProps[] = data?.shoe.map((item) => {
    return {
      id: item._id,
      link: item._id ? `/product/shoe/${item._id}/${item.name.replace(/\s+/g, '-').toLowerCase()}` : '#',
      imageSrc: item.images[0],
      name: item.name,
      description: item.description,
      iconName: SportShoe,
      price: item.price
    }
  })

  const clothes: ProductInfoCardProps[] = data?.cloth.map((item) => {
    return {
      id: item._id,
      link: item._id ? `/product/cloth/${item._id}/${item.name.replace(/\s+/g, '-').toLowerCase()}` : '#',
      imageSrc: item.images[0],
      name: item.name,
      description: item.description,
      iconName: ShirtIcon,
      price: item.price
    }
  })



  return (
    <div className="bg-white">
      {/* Hero Section */}

      <section className="relative h-[70vh] 2xl:h-[40vh] md:h-[80vh] bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&auto=format&fit=crop"
            alt="Shopping"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Discover Your Style
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Premium watches, elegant clothes, and comfortable shoes. Everything you need to look your best.
            </p>
            <Link href="/products/watch">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer shadow-lg flex items-center gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link> 
          </div>
        </div>
      </section>


      {/* Watches Showcase Banner */}
      <div className="py-16 md:py-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <CategoryBanner heading='Watches' btnLink='/products/watch' products={watches} />
        </div>
      </div>

      <hr className='bg-gray-400' />

      {/* Shoes Showcase Banner */}
      <div className="py-16 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <CategoryBanner heading='Shoes' btnLink='/products/shoe' products={shoes} />
        </div>
      </div>


      {/* Why Choose Us */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <WhyUs />
        </div>
      </div>

      <hr className='bg-gray-400' />

      {/* Clothes Showcase Banner */}
      <div className="py-16 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <CategoryBanner heading='Clothes' btnLink='/products/cloth' products={clothes} />
        </div>
      </div>

      <hr className='bg-gray-400' />

      {/* Video Section */}
      <div className="py-16 md:py-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <VideoIntro />
        </div>
      </div>

      <hr className='bg-gray-400' />


      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover our premium collection today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products/watch">
                <button className="bg-white cursor-pointer text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Explore All Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage