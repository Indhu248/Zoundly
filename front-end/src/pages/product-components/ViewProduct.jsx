import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import Navbar from "../../Components/Navbar";
import { useCart } from "../../context/CartContext.jsx";

const ViewProduct = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await api.getProduct(id);
      setProduct(response.data.product);
    } catch (err) {
      console.error("Failed to load product:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(product._id || product.id, 1);
    if (result.success) {
      alert("Product added to cart!");
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        type: "buy-now",
        productId: product._id || product.id,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Product not found.</p>
      </div>
    );
  }

  const {
    name,
    description,
    features,
    images,
    image,
    price,
    originalPrice,
    discount,
    rating,
  } = product;

  return (
    <div className="min-h-[80vh] px-6 py-10 md:px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-center lg:items-start gap-10">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <img
          src={image?.startsWith('http://') || image?.startsWith('https://') || image?.startsWith('/') ? image : `/${image}`}
          alt={product.name}
          className="w-full max-w-[300px] sm:max-w-[400px] rounded-lg shadow-md"
          onError={(e) => {
            console.error('Main image failed to load:', image);
            e.target.src = '/placeholder.png';
          }}
          onLoad={() => {
            console.log('Main image loaded successfully:', image);
          }}
        />
        {images && images.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img?.startsWith('http://') || img?.startsWith('https://') || img?.startsWith('/') ? img : `/${img}`}
                alt={`Product ${index}`}
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded cursor-pointer border border-gray-300 hover:border-black"
                onError={(e) => {
                  console.error('Thumbnail image failed to load:', img);
                  e.target.src = '/placeholder.png';
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{name}</h1>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">{description}</p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            ₹{price}
          </span>
          <span className="text-sm sm:text-base text-gray-400 line-through">
            ₹{originalPrice}
          </span>
          <span className="text-sm sm:text-base text-red-500">
            ({discount}% OFF)
          </span>
        </div>

        <p className="text-yellow-600 mb-4 text-sm sm:text-base">
          ⭐ {rating} / 5
        </p>

        <ul className="mb-6 list-disc list-inside text-gray-700 text-sm sm:text-base">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
