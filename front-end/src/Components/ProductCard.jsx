import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'

const ProductCard = ({id, name, image, desc}) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const result = await addToCart(id, 1);
    if (result.success) {
      alert("Product added to cart!");
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // const handleProduct = () => {
  //   Navigate(`/products/${id}`)
  // }
  const getImageUrl = (img) => {
    if (!img) return '/placeholder.png';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/')) return img;
    return `/${img}`;
  };

  return (
    <div className='h-[420px] p-4 w-[240px] flex flex-col rounded-lg bg-white cursor-pointer'>
      <div className="cursor-pointer relative" onClick={() => navigate(`/products/${id}`)}>
        <div className="relative">
          <img 
            src={getImageUrl(image)} 
            alt={name} 
            className='h-[220px] w-[260px] p-2 object-cover bg-slate-300/30 rounded-lg'
            onError={(e) => {
              console.error('Image failed to load:', image);
              e.target.src = '/placeholder.png';
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', image);
            }}
          />
          {/* Icons overlay */}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleLike}
              className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
              aria-label="Like product"
            >
              <Heart 
                className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
              />
            </button>
          </div>
        </div>
        <h1 className='text-[16px] text-[#000000] my-2 font-semibold'>{name}</h1>
        {/* <p>⭐⭐⭐⭐⭐</p> */}
        <p className='text-[13px] text-[#4C4B4B] mb-2'>{desc}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-[#C3FF6A] text-black py-2 px-4 rounded-lg hover:bg-[#B0E85A] transition-colors font-medium text-sm flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" />
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard
