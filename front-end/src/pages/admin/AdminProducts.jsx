import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import Navbar from '../../Components/Navbar';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'earphones',
    price: '',
    originalPrice: '',
    discount: 0,
    stockQuantity: '',
    sku: '',
    rating: 4.0,
    image: '',
    images: [],
    features: [],
  });
  const [featureInput, setFeatureInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin') {
      alert('You do not have admin access. Redirecting...');
      navigate('/');
      return;
    }
    loadProducts();
  }, [isAuthenticated, user, navigate]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response.data?.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'originalPrice' || name === 'stockQuantity' || name === 'rating' || name === 'discount'
        ? value === '' ? '' : Number(value)
        : value,
    });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (imageInput.trim()) {
      const newImages = [...formData.images, imageInput.trim()];
      setFormData({
        ...formData,
        images: newImages,
        // Set main image to first image if not set
        image: formData.image || imageInput.trim(),
      });
      setImageInput('');
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages,
      // Update main image if we removed it
      image: index === 0 && newImages.length > 0 ? newImages[0] : formData.image,
    });
  };

  const setMainImage = (imageUrl) => {
    setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a copy of formData to avoid mutation
      const productData = { ...formData };
      
      // Ensure images array has at least one image
      if (productData.images.length === 0) {
        if (productData.image) {
          // If main image is set but images array is empty, add it
          productData.images = [productData.image];
        } else {
          alert('Please add at least one product image');
          return;
        }
      }
      
      // Ensure main image is set (use first image if not set)
      if (!productData.image && productData.images.length > 0) {
        productData.image = productData.images[0];
      }

      if (editingProduct) {
        await api.updateProduct(editingProduct._id, productData);
        alert('Product updated successfully');
      } else {
        await api.createProduct(productData);
        alert('Product created successfully');
      }
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert(error.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'earphones',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      discount: product.discount || 0,
      stockQuantity: product.stockQuantity || '',
      sku: product.sku || '',
      rating: product.rating || 4.0,
      image: product.image || '',
      images: product.images || [],
      features: product.features || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      await api.deleteProduct(productId);
      alert('Product deleted successfully');
      loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'earphones',
      price: '',
      originalPrice: '',
      discount: 0,
      stockQuantity: '',
      sku: '',
      rating: 4.0,
      image: '',
      images: [],
      features: [],
    });
    setFeatureInput('');
    setImageInput('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="text-gray-600 hover:text-black transition">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-black">Manage Products</h1>
              <p className="mt-2 text-gray-600">Add, edit, or delete products</p>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-[#272727] transition flex items-center gap-2 font-semibold"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="earphones">Earphones</option>
                    <option value="headphones">Headphones</option>
                    <option value="speakers">Speakers</option>
                    <option value="watches">Watches</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Main Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/image.webp"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be the primary product image</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product Images</label>
                <p className="text-xs text-gray-500 mb-2">Add multiple image URLs (at least one required)</p>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                    placeholder="/image.webp or https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-2">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative border rounded-lg p-2 bg-gray-50"
                    >
                      <img
                        src={img || '/placeholder.png'}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-24 object-cover rounded mb-2"
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <div className="flex gap-1 items-center">
                        {formData.image === img ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Main
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setMainImage(img)}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                          >
                            Set Main
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200 ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {formData.images.length === 0 && (
                  <p className="text-sm text-amber-600">⚠️ Please add at least one product image</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Add a feature"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-[#272727] transition font-semibold"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#272727]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image || '/placeholder.png'}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-[#C3FF6A] text-black">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stockQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-black hover:text-[#272727] transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

