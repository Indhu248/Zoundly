import React from 'react'
import {products} from '../../assets/index.js'
import ProductCard from '../../Components/ProductCard.jsx'
// import ProductCard from '../Components/ProductCard.jsx'

const Products = () => {
  return (
    <div className="min-h-screen py-10 px-4 md:px-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
    {products.map((product, index) => (
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

export default Products
