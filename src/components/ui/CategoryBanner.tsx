
import ProductInfoCard from './ProductInfoCard'; 
import Button from './Button';
import Link from 'next/link';
import Heading from './Heading';
import { truncateLetter } from '@/lib/utils';
import { ProductInfoCardProps } from '../../../types/productTypes';

function CategoryBanner({ heading, btnLink, products }: { heading: string; btnLink: string; products: ProductInfoCardProps[] }) {
 
  
  return (
    <section>
      <Heading extraClassName=" text-slate-800 mb-4 text-center">{heading}</Heading>
      {/* <Button children="Browse Collection" onClick={handle} /> */}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        <ProductInfoCard products={products} />
      </div>
      <div className=' flex justify-center mt-4'>
        <Link href={btnLink}>
          <Button children="Shop Now" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer" />
        </Link>
      </div>
    </section>
  )
}

export default CategoryBanner