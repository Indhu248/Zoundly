import React, { useState, useEffect } from 'react'
import ProductCard from '../Components/ProductCard'
import { api } from '../utils/api'

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      const response = await api.getProducts({ limit: 2 })
      setFeaturedProducts(response.data.products || [])
    } catch (error) {
      console.error('Failed to load featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-10 px-6 md:px-16">
      <div className="bg-black rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Blur circle at center top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[250px] bg-[#C3FF6A] rounded-3xl blur-3xl opacity-70 z-[1]"></div>
        
        <div className="relative z-10 min-h-[60vh] flex flex-col lg:flex-row md:flex-row justify-between items-center">
          {/* Text Content */}
          <div className="w-full md:w-[40%] text-center md:text-left">
            <p className="text-sm md:text-base text-white mx-2">Featured Products</p>
            <div className="mx-2 mt-2 inline-block">
              <div className="bg-[#C3FF6A] text-black px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg">
                50% OFF
              </div>
            </div>
            <h1 className="text-xl lg:text-5xl sm:text-xl md:text-2xl font-semibold mt-2 mx-2 text-white">
              Explore more from our brands.
            </h1>
          </div>
      
          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-10">
              <p className="text-white">Loading featured products...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-300">No featured products available</p>
              <p className="text-sm text-gray-400 mt-2">Run "npm run seed" in backend to add products</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center items-center">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  id={product._id || product.id}
                  price={product.price}
                  name={product.name}
                  image={product.image}
                  desc={product.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
