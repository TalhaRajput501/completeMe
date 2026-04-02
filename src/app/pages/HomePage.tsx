'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Watch, Shirt, ShoppingBag } from 'lucide-react'

function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&auto=format&fit=crop"
            alt="Shopping"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Discover Your Style
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Premium watches, elegant clothes, and comfortable shoes. Everything you need to look your best.
            </p>
            <Link href="#categories">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg flex items-center gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our curated collection of premium products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Watches Category */}
            <Link href="/products/watch">
              <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden border border-slate-200 transition-all">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop"
                    alt="Watches"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Watch className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Watches</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Luxury timepieces that combine style with precision. From classic to modern designs.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    Browse Collection
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Clothes Category */}
            <Link href="/products/cloth">
              <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden border border-slate-200 transition-all">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop"
                    alt="Clothes"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Shirt className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Clothes</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Premium apparel crafted for comfort and style. Express yourself with confidence.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    Browse Collection
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Shoes Category */}
            <Link href="/products/shoe">
              <div className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden border border-slate-200 transition-all">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&auto=format&fit=crop"
                    alt="Shoes"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Shoes</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Step into comfort with our premium footwear. Perfect blend of style and functionality.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    Browse Collection
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Shop With Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Premium Quality</h3>
              <p className="text-slate-600">
                All our products are carefully selected to ensure the highest quality standards.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Best Prices</h3>
              <p className="text-slate-600">
                Competitive pricing without compromising on quality. Great value for your money.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Fast Delivery</h3>
              <p className="text-slate-600">
                Quick and secure shipping to your doorstep. Track your order every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover our premium collection today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products/watch">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Explore All Products
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors border border-blue-500">
                  Sign In
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