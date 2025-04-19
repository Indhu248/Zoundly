import React from 'react'
import { featured_products } from '../assets'
import ProductCard from '../Components/ProductCard'

const FeaturedProducts = () => {
  return (
    <div className="min-h-[80vh] py-10 px-6 md:px-16 flex flex-col lg:flex-row md:flex-row justify-between items-center">
  
    {/* Text Content */}
    <div className="w-full md:w-[40%] text-center md:text-left">
      <p className="text-sm md:text-base text-black mx-2">Featured Products</p>
      <h1 className="text-xl lg:text-4xl sm:text-xl md:text-2xl font-semibold mt-2 mx-2">
        Explore more from our brands.
      </h1>
    </div>
  
    {/* Products Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-canter items-center">
      {featured_products.map((product, index) => (
        <ProductCard
        key={index}
        id= {product.id}
        price={product.price}
        cartItemId={product.cartItemId}
        name={product.name}
        image={product.image}
        desc={product.description}
        />
      ))}
    </div>
  
  </div>
  
  )
}

export default FeaturedProducts
