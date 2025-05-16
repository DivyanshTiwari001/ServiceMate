import React from 'react';
import Hero from '../Components/Hero';
import CarouselSection from '../Components/CarouselSection';
import Service from './Service';
import ServiceSection from '../Components/ServiceSection';
import Testimonials from '../Components/Testimonial';

function Home() {
  return (
    <div className="text-center text-2xl font-bold text-primary">
     <Hero/>
     <CarouselSection/>
     <ServiceSection/>
     <Testimonials/>
    </div>
  );
}

export default Home;
