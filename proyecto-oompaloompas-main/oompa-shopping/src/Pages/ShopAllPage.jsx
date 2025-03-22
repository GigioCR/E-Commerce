import React from 'react'
import Carousel from '../Components/Carousel'
import { sampleProducts } from '../constants'
import ProductGrid from '../Components/ProductGrid'

const ShopAllPage = () => {
  return (
    <div>
        <Carousel/>
        <div className='flex items-center justify-center w-full mt-16 mb-10'>
          <h1 className='font-bold text-5xl text-black'>Our Products</h1>
        </div>
        <div className='mt-16'>
          <ProductGrid products={sampleProducts} />
        </div>

    </div>
  )
}

export default ShopAllPage