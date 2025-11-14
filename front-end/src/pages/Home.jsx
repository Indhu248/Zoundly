import React from 'react';
import { BannerImage } from '../assets';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from './FeaturedProducts';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const Navigate = useNavigate();

  return (
    <div className="max-w-full min-h-screen bg-white relative overflow-hidden">
      {/* Background Blurred Rectangles - Above background, below components */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-[#C3FF6A] rounded-3xl blur-3xl opacity-70 -translate-x-1/4 -translate-y-1/4 z-[1]"></div>
      <div className="absolute top-2/3 right-0 w-[500px] h-[400px] bg-[#C3FF6A] rounded-3xl blur-3xl opacity-80 translate-x-1/4 -translate-y-1/2 z-[1]"></div>
      
      <Navbar />

      <div className="relative z-10 py-8 px-6 md:py-12 md:px-16 flex flex-col md:flex-row items-center justify-between text-black gap-8">
        
        {/* Text Section */}
        <div className="text-center md:text-left flex-1">
          <div className="mb-6 justify-center md:justify-start">
            <p className="text-sm md:text-base text-black bg-white rounded-full px-4 py-2 inline-block">
              Meet the new Zoundly Audio Headphones.
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-black lg:leading-none">
            Hear Clarity Re-Defined
          </h1>
          <div className="flex items-center gap-2 mt-4 mb-6 justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-sm md:text-base text-gray-600">
              100k+ happy users
            </span>
          </div>
          <div className="flex justify-center md:justify-start mt-6">
            <button 
              className="flex items-center gap-2 bg-[#C3FF6A] text-black px-4 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-[#B0E85A] transition-colors shadow-md shadow-gray-400"
              // style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
              onClick={() => Navigate('/products')}>
              Explore more
              <div className="bg-black rounded-full p-2">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex-1 flex justify-center items-center">
          <img src={BannerImage} alt="Banner" className="h-[50vh] w-[90vw] md:h-[70vh] md:w-[40vw] p-2 object-contain" />
        </div>
        
      </div>

      {/* Featured Products Section */}
      {/* <div className="relative z-20">
        <FeaturedProducts />
      </div> */}
    </div>

  );
};

export default Home;
