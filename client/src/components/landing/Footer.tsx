import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PSlogo from "@/../public/images/play-store.png"
import ASlogo from "@/../public/images/app-store.png"
import logo from "@/../public/icons/logoo.png"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white via-[#EDF0FD] to-[#EDF0FD]  text-gray-900 py-8 lg: px-4 sm:px-12 lg:px-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Download */}
          <div className="text-center">
            <h3 className="text-gray text-lg mb-4">Download</h3>
            <p>Download the App for Android and iOS</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="#">
                <Image src={PSlogo} alt="Play Store" width={140} height={40} />
              </a>
              <a href="#">
                <Image src={ASlogo} alt="App Store" width={140} height={40} />
              </a>
            </div>
          </div>

          {/* Column 2: Logo and Info */}
          <div className="text-center">
            <Link href="/">
              <Image src={logo} alt="Logo" className="mx-auto mb-4" width={20} height={20} />
            </Link>
            <p>
              <span className="text-4xl font-bold text-gray-800 mb-4">Trustify</span><br/>
              <span className="text-2xl text-gray-600 mb-6">Buy Smart, Sell Easy</span> 
            </p>
          </div>

          {/* Column 3: Useful Links */}
          <div className="text-center">
            <h3 className="text-gray text-lg mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/coupons" className="hover:text-gray-500">
                  Coupons
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-500">
                  Blog Post
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-gray-500">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-gray-500">
                  Join Affiliate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div className="text-center">
            <h3 className="text-gray text-lg mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://facebook.com" className="hover:text-gray-500">Facebook</a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:text-gray-500">Twitter</a>
              </li>
              <li>
                <a href="https://instagram.com" className="hover:text-gray-500">Instagram</a>
              </li>
              <li>
                <a href="https://linkedin.com" className="hover:text-gray-500">LinkedIn</a>
              </li>
              <li>
                <a href="https://pinterest.com" className="hover:text-gray-500">Pinterest</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <hr className="border-gray-600 my-8" />
        <p className="text-center text-gray-500">
          CopyRight &copy; 2024 | Developed By <span className="text-black">&trade; Web Team</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
