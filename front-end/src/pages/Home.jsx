import React from 'react';
import { ellipse1Image, ellipse2Image, earphonesImages, BannerImage } from '../assets';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const Navigate = useNavigate();
  return (
    <div className="max-w-full min-h-screen bg-gradient-to-r from-[#272727] to-[#F1FFC1]">
  <Navbar />

  <div className=" py-8 px-6 md:py-12 md:px-16 flex flex-col md:flex-row items-center justify-between text-white gap-8">
    
    {/* Text Section */}
    <div className="text-center md:text-left flex-1">
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-[#ffffff] lg:leading-none">
        <span className="text-[#F1FFC1]">ZOUNDLY</span> AUDIO HEADPHONES
      </h1>
      <button className="bg-[#F1FFC1] text-black px-6 py-3 rounded-lg mt-6 font-semibold text-sm md:text-base"
      onClick={() => Navigate('/products')}>
        Explore more
      </button>
    </div>

    {/* Image Section */}
    <div className="relative flex-1 flex justify-center items-center">
      <img src={BannerImage} alt="Banner" className="h-[50vh] w-[90vw] md:h-[70vh] md:w-[40vw] p-2 object-contain" />
    </div>
    
  </div>
</div>

  );
};

export default Home;
