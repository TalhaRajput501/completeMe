import React from 'react'
import { toast } from 'sonner'
import ProductInfoCard, { ProductInfoCardProps } from './ProductInfoCard';
import { Watch } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';
import Heading from './Heading';
import { truncateLetter } from '@/lib/utils';

function CategoryBanner({ heading, btnLink, products }: { heading: string; btnLink: string; products: ProductInfoCardProps[] }) {

  // const products: ProductInfoCardProps[] = [
  //   {
  //     link: "/products/watch",
  //     imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
  //     title: "Royal Watch",
  //     description: "Luxury timepieces that combine style with precision. From classic to modern designs.",
  //     iconName: Watch
  //   },
  //   {
  //     link: "/products/watch",
  //     imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
  //     title: "Smart Watch",
  //     description: "Luxury timepieces that combine style with precision. From classic to modern designs.",
  //     iconName: Watch
  //   },
  //   {
  //     link: "/products/watch",
  //     imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
  //     title: "Classic Watch",
  //     description: "Luxury timepieces that combine style with precision. From classic to modern designs.",
  //     iconName: Watch
  //   },
  // ]

  const handle = () => {
    // toast.info("This feature is coming soon!")


    toast.custom((id) => (
      <div className="bg-zinc-900 text-white p-4 rounded-lg shadow-xl flex justify-between">
        <p>Custom toast content!</p>
        <button onClick={() => toast.dismiss(id)}>Close</button>
      </div>
    ), {
      duration: 1000, // Duration in milliseconds
      onAutoClose: () => toast.success("This feature is coming soon!"),
    });
  }
  return (
    <section>
      <Heading extraClassName=" text-slate-800 mb-4 text-center">{heading}</Heading>
      {/* <Button children="Browse Collection" onClick={handle} /> */}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        <ProductInfoCard products={products} />
      </div>
      <div className=' flex justify-center mt-4'>
        <Link href={btnLink}>
          <Button children="Shop Now" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer" onClick={handle} />
        </Link>
      </div>
    </section>
  )
}

export default CategoryBanner