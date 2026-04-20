import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Check,
  Heart,
  ShoppingCart,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { truncateLetter } from '@/lib/utils'
import ImageSkeleton from '@/components/ui/ImageSkeleton'

export type WishListProduct = {
  _id: string
  name: string
  price: number
  image?: string
  note?: string
}

const wishlistProducts: WishListProduct[] = [
  {
    _id: 'wish-1',
    name: 'Chrono Edge Watch',
    price: 149,
    image: '/ecom.webp',
    note: 'Gift this on anniversary.',
  },
  {
    _id: 'wish-2',
    name: 'Urban Comfort Tee',
    price: 39,
    note: '',
  },
  {
    _id: 'wish-3',
    name: 'StrideFlex Sneakers',
    price: 89,
    image: '/ecom.webp',
  },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export default function WishListPage() {
  const totalValue = wishlistProducts.reduce((sum, product) => sum + product.price, 0)
  // const totalSaving = wishlistProducts.reduce(
  //   (sum, item) => sum + ((item.oldPrice || 0) - item.price),
  //   0
  // )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Wish List Top bar */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-4 w-4" />
                Saved for later
              </p>
              <h1 className="mt-3 text-2xl font-bold text-slate-800 md:text-3xl">
                Your Wishlist
              </h1>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Keep track of the products you love and move them to cart anytime.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-slate-500">Items</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">{wishlistProducts.length}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-slate-500">Total Value</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="space-y-4 lg:col-span-2">
            {wishlistProducts.map((product) => (
              <article
                key={product._id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <ImageSkeleton extraClasses="!h-full !w-full !rounded-none" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-semibold text-slate-800">{truncateLetter({
                        text: product.name,
                        limit: 17
                      })}
                      </h2>

                      <div className="mt-3">
                        <label
                          htmlFor={`note-${product._id}`}
                          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                        >
                          Custom Note
                        </label>
                        <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-slate-300 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                          <textarea
                            id={`note-${product._id}`}
                            maxLength={50}
                            rows={1}
                            defaultValue={product.note ?? ''}
                            placeholder="Add a short note (max 50 letters)"
                            className="h-9 w-full resize-none rounded-l-lg bg-transparent px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none overflow-y-hidden"
                          />
                          <button
                            type="button"
                            aria-label={`Save note for ${product.name}`}
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-r-lg border-l border-slate-300 bg-white text-blue-600 transition-colors hover:bg-blue-50"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">50 letters max</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <div className="mr-1">
                      <p className="text-right text-lg font-semibold text-slate-800">
                        {formatCurrency(product.price)}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <Heart className="h-5 w-5 text-blue-600" />
                Wishlist Summary
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Saved Items</span>
                  <span className="font-medium text-slate-800">{wishlistProducts.length}</span>
                </div>
                {/* <div className="flex items-center justify-between text-slate-600">
                  <span>Estimated Savings</span>
                  <span className="font-medium text-emerald-600">{formatCurrency(totalSaving)}</span>
                </div> */}
              </div>
              <div className="mt-5 space-y-2">
                <Link
                  href="/products/watch"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Explore More Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cart"
                  className="flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Go to Cart
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-800">Quick Categories</h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <Link
                  href="/products/watch"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Watches
                </Link>
                <Link
                  href="/products/cloth"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Clothes
                </Link>
                <Link
                  href="/products/shoe"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Shoes
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
