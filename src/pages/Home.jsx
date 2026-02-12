import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Security from '../components/Security';

function Home() {
  return (
    <div >
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Security />
    </div>
  );
}
export default Home;