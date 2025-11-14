import React from 'react'
import { earphonesImages } from '../assets'

const Banner = () => {
  return (
    <div className='min-h-[50vh] px-6 md:px-12 py-8 bg-black flex flex-col md:flex-row items-center justify-between gap-8'>
  {/* Left Text */}
  <div className='md:w-[35vw] text-center md:text-left'>
    <h1 className='text-[32px] md:text-[64px] font-extrabold text-white leading-tight'>
      <span className='text-[#C3FF6A]'>Summer</span> Sale is On – Up to <span className='text-[#C3FF6A]'>50%</span> Off!
    </h1>
  </div>

  {/* Image */}
  <div className='md:w-[30vw]'>
    <img
      src={earphonesImages}
      alt="Earphones"
      className='h-[40vh] md:h-[60vh] w-full object-contain'
    />
  </div>

  {/* Right Text & Button */}
  <div className='md:w-[25vw] text-center md:text-right flex flex-col items-center md:items-end justify-end'>
    <p className='text-[14px] md:text-[16px] text-white'>
      Upgrade your sound game this season. Grab your favorite headsets at unbeatable prices. Limited time only – don’t miss out!
    </p>
    <button className='bg-[#C3FF6A] text-black px-6 md:px-10 py-3 md:py-4 rounded-lg mt-6 font-semibold text-[14px] md:text-[16px]'
    onClick={() => window.location.href = '/products'}>
      View Collection
    </button>
  </div>
</div>

  )
}

export default Banner
