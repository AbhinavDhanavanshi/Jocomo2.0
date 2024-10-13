import React from 'react'
import heroImg from './heroImg.jpg'

const HeroSection = () => {
  return (
    <div>
      {/* use the hero image in this folder */}
      <div className="hero-container">
        <img src={heroImg} alt="hero" className="w-full h-80" />
      </div>
    </div>
  )
}

export default HeroSection
