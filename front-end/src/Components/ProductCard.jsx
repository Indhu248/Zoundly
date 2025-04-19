import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({id, name, image, desc}) => {
  const navigate = useNavigate()

  const { dispatch } = useCart()
  const product = {id, name, image, desc}
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // const handleProduct = () => {
  //   Navigate(`/products/${id}`)
  // }
  return (
    <div
    className='h-[420px] p-4 w-[240px] flex flex-col rounded-lg bg-slate-300/10 cursonr-pointer'>
        <div className="cursor-pointer" onClick={() => navigate(`/products/${id}`)}>
        <img src={image} alt={name} className='h-[220px] w-[260px] p-2 object-cover bg-slate-300/30 rounded-lg' />
        <h1 className='text-[16px] text-[#000000] my-2 font-semibold'>{name}</h1>
        {/* <p>⭐⭐⭐⭐⭐</p> */}
        <p className='text-[13px] text-[#4C4B4B] mb-2'>{desc}</p>
        </div>
        <button 
        onClick={handleAddToCart}
        className='text-[13px] bg-[#C3FF6A] px-8 py-2 my-2 self-start rounded-lg'>Add to cart</button>
    </div>
  )
}

export default ProductCard
