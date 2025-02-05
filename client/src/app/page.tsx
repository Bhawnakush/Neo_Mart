import Link from "next/link"
import HeroSection from "@/components/landing/HeroSection"
import AboutUs from '@/components/landing/AboutUs';
import TrustSection from '@/components/landing/TrustSection';
import Testimonials from '@/components/landing/Testimonials';
import Subscribe from '@/components/landing/Subscribe';
import Footer from '@/components/landing/Footer';
const page = () => {
  return (
    <div>
      <HeroSection/>
      <AboutUs />
      <TrustSection />
      <Testimonials />
      <Subscribe/>
      <Footer/>
    </div>
  )
}

export default page;





