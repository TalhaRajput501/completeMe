'use client'
import React, { useCallback } from 'react'
import Heading from './Heading'
import Card from './Card'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ShoeSection() {
  const temp = [1, 2, 3, 4, 5, 6, 7, 8]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') scrollPrev()
    if (e.key === 'ArrowRight') scrollNext()
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none"
      aria-label="Shoe carousel"
    >
      <Heading extraClassName="text-red-500">Shoe Section</Heading>

      <div className="relative">
        {/* Prev Button */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Viewport */}
        <div className="overflow-hidden px-3" ref={emblaRef}>
          {/* Container */}
          <div className="flex">
            {temp.map((_, ind) => (
              <div
                key={ind}
                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] px-2"
              >
                <Card />
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default ShoeSection