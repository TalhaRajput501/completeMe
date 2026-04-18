import { truncate } from '@/lib/utils'
import { ArrowRight, LucideIcon, } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface ProductInfoCardProps {
  link: string;
  imageSrc: string;
  title: string;
  description: string;
  iconName: LucideIcon;
}

function ProductInfoCard({ products }: { products: ProductInfoCardProps[] }) {
  return (
    <>
      {
        products.map((product, idx) =>
        (
          <Link key={idx} href={product.link} >
            <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden border border-slate-200 transition-all">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <product.iconName className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{product.title}</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  {
                    truncate({
                      text: product.description,
                      limit: 12
                    })
                  }
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  Browse Collection
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        )
        )
      }
    </>

  )
}

export default ProductInfoCard