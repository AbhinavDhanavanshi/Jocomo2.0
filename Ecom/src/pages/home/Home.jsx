import React, {useContext} from 'react'
import Layout from '../../components/Layout/Layout'
import MyContext from '../../context/Data/MyContext'
import HeroSection from '../../components/HeroSection/HeroSection'
import Filter from '../../components/Filter/Filter'
import ProductCard from '../../components/ProductCard/ProductCard'
import Testimonials from '../../components/Testimonials/Testimonials'
import Track from '../../components/Track/Track'

export default function Home(){
  return (
    <Layout> 
      <HeroSection/>
      <Filter/>
      <ProductCard/>
      <Track/>
      <Testimonials/>
    </Layout>
  )
}


