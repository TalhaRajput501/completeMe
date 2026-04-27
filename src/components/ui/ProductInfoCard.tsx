import { ProductInfoCardProps } from '../../../types/productTypes'
import HomeCard from './HomeCard'

function ProductInfoCard({ products }: { products: ProductInfoCardProps[] }) {

  return (
    <>
      {
        products.map((product, idx) =>
          <HomeCard key={idx} product={product} />
        )
      }
    </>

  )
}

export default ProductInfoCard