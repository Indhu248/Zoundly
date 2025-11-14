import React, { useState, useEffect } from 'react'
import ProductCard from '../../Components/ProductCard.jsx'
import { api } from '../../utils/api'
import { Search, X, Filter } from 'lucide-react'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [appliedMinPrice, setAppliedMinPrice] = useState('')
  const [appliedMaxPrice, setAppliedMaxPrice] = useState('')
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const placeholderTexts = ['Wireless Headphones', 'Bluetooth Earphones', 'Smart Watches']

  useEffect(() => {
    loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, appliedMinPrice, appliedMaxPrice])

  useEffect(() => {
    if (searchQuery) {
      setAnimatedPlaceholder('')
      return
    }

    const currentText = placeholderTexts[placeholderIndex]
    let timeout

    if (!isDeleting && charIndex < currentText.length) {
      // Typing
      timeout = setTimeout(() => {
        setAnimatedPlaceholder(currentText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 100)
    } else if (!isDeleting && charIndex === currentText.length) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setAnimatedPlaceholder(currentText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 50)
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next text
      setIsDeleting(false)
      setPlaceholderIndex((placeholderIndex + 1) % placeholderTexts.length)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, placeholderIndex, searchQuery])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchQuery) params.search = searchQuery
      if (selectedCategory) params.category = selectedCategory
      if (appliedMinPrice) params.minPrice = appliedMinPrice
      if (appliedMaxPrice) params.maxPrice = appliedMaxPrice
      
      const response = await api.getProducts(params)
      setProducts(response.data.products || [])
    } catch (err) {
      console.error('Failed to load products:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyPriceFilter = () => {
    setAppliedMinPrice(minPrice)
    setAppliedMaxPrice(maxPrice)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    loadProducts()
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setMinPrice('')
    setMaxPrice('')
    setAppliedMinPrice('')
    setAppliedMaxPrice('')
  }

  const hasActiveFilters = searchQuery || selectedCategory || appliedMinPrice || appliedMaxPrice
  const hasPriceInputs = minPrice || maxPrice

  if (loading) {
    return (
      <div className="min-h-screen py-10 px-4 md:px-12 flex items-center justify-center">
        <p className="text-lg">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-10 px-4 md:px-12 flex items-center justify-center">
        <p className="text-lg text-red-500">Error loading products: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-16">
      {/* Search Bar and Filters */}
      <div className="mb-12 flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder={searchQuery ? '' : animatedPlaceholder + '|'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setAnimatedPlaceholder('')}
              className="w-full pl-12 pr-12 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  loadProducts()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
          >
            <option value="">All</option>
            <option value="earphones">Earphones</option>
            <option value="headphones">Headphones</option>
            <option value="speakers">Speakers</option>
            <option value="watches">Watches</option>
          </select>

          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-sm w-24"
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-sm w-24"
          />

          {hasPriceInputs && (
            <button
              onClick={handleApplyPriceFilter}
              className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
              title="Apply price filter"
            >
              <Filter className="w-4 h-4" />
              Apply
            </button>
          )}

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
        {products.map((product) => (
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
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  )
}

export default Products
