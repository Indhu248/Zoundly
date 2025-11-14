// import { Home } from 'lucide-react'
import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Products from './product-components/Products'
import Banner from './Banner'
import Footer from '../Components/Footer'
import Home from './Home'

const Template = () => {
  return (
    <>
    <Home />
    <FeaturedProducts />
     <Products />
     <Banner />
     <Footer />
    </>
  )
}

export default Template
