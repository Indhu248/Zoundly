import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import { api } from '../../utils/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response.data.products || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <p className="text-red-500">Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard
          key={product._id || product.id}
          id={product._id || product.id}
          name={product.name}
          image={product.image}
          desc={product.description}
          price={product.price}
        />
      ))}
      {products.length === 0 && (
        <p className="text-gray-600">No products found</p>
      )}
    </div>
  );
}

export default ProductList;
