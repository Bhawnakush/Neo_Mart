// components/AboutUs.tsx
import Image from 'next/image';
import about from '@/../../client/public/images/About.png'

export default function AboutUs() {
  return (
    <section id="about" className="w-full py-16 px-8 bg-gradient-to-b from-white to-blue-100">
      <div className="flex flex-col md:flex-row items-center mt-12 lg:mt-16 px-4 sm:px-12 lg:px-16">
     
        <div className="md:w-1/2 mb-8 md:mb-0">
         <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden ">
          <Image src={about} alt=""/>
        </div>
        </div>
        
        <div className="md:w-1/2 p-6">
          <h2 className="text-6xl font-bold mb-6 text-left">About Trustify</h2>
          <p className="text-lg max-w-2xl text-left">
            Trustify is a marketplace where trust is built through your contacts. Every seller is someone
            within your network, ensuring authenticity and reliability.
          </p>
        </div>
      </div>
    </section>
  );
}
