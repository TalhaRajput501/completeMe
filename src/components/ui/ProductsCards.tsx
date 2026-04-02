

import { truncate } from "@/lib/utils"


export function ProductCard() {



  const products = [
    { heading: 'Product 1' },
    { heading: 'Product 2' },
    { heading: 'Product 3' },
  ]

  return (
    <div
      className="mt-9"
    >

      <div className='border flex  items-center justify-center flex-col w-full'>
        <h1
          className="text-2xl font-bold text-center text-white"
        >Here will be heading </h1>
        <p
          className="text-white"
        >Product 1 description</p>
      </div>

      <div
        className="flex w-full border flex-wrap justify-evenly mt-4 px-1"
      >
        {
          products.map((item) => (
            <div
              key={item.heading}
              className="card lg:w-104 md:w-96 sm:w-85 w-80 mt-3 shadow-sm ">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  <span className="text-black">
                    {truncate({
                      text: item.heading,
                      limit: 4
                    }
                    )}
                  </span>
                  <div className="badge badge-success px-1.5 text-sm">new</div>
                </h2>
                <p
                  className="text-black text-sm sm:text-md"
                >
                  {truncate({
                    text: 'A card component has a figure, a body part, and inside body there are title and actions parts Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum dicta fuga nulla magni, fugit fugiat optio suscipit dolor assumenda eos quisquam velit reprehenderit esse enim facilis dolorum adipisci maxime consequuntur.',
                    limit: 40
                  }
                  )}</p>
                <div className="card-actions justify-end mt-1">
                  <button className="btn btn-info ">Buy Now</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}