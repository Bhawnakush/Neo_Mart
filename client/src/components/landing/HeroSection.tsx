import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import NeoImage from '@/../public/images/feature.png';
import logo from '@/../public/icons/logoo.png';
import BlurFade from '@/components/ui/blur-fade';
import Header from '../Header';

const Hero: React.FC = () => {
  return (
    <div className=" bg-gradient-to-b from-[#EDF0FD] to-white flex flex-col">
      <Header/>
      <main className="flex flex-col lg:flex-row justify-around items-center mt-12 lg:mt-16 px-4 sm:px-12 lg:px-16">
        <div className="max-w-lg p-6 sm:p-8 m-4 text-center lg:text-left">
          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">Trustify</h1>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 mb-6">Buy Smart, Sell Easy</h2>
          </BlurFade>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 opacity-80 mb-4">
            Trustify is your go-to platform for buying and selling products quickly and safely.
            Enjoy a hassle-free eCommerce experience designed for smart shoppers and sellers.
          </p>

          <div className="flex flex-col space-y-4 sm:space-y-4">
            <p className="text-base sm:text-lg lg:text-xl mb-4">
              <Link href="/register" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </p>
            <p className="text-base sm:text-lg lg:text-xl mt-4">
              <Link  href="/login"   className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700">
                Log In
              </Link>
            </p>

          </div>
        </div>

        <div className="max-w-2xl">
          <Image
            src={NeoImage}
            alt="NeoMart Image"
            className="mr-0"
          />
        </div>

      </main>
    </div>
  );
};

export default Hero;
