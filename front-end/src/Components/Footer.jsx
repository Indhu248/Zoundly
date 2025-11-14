import React from 'react'

const Footer = () => {
  return (
    <div className='min-h-[30vh] bg-white flex flex-col items-center justify-between px-12 py-8'>
        <div className='flex  flex-col justify-between items-center w-full'>
        <h1 className='text-[#C3FF6A] font-bold text-2xl'>Zoundly</h1>
        <p>Delivering premium sound gear since 2020.</p>
        </div>
        <p className='text-[12px] text-slate-800/80'>
        © 2025 Zoundly. All rights reserved. | Terms & Conditions | Privacy Policy
        </p>
    </div>
  )
}

export default Footer
