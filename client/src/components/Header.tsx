"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/icons/Preview.png";
import profileImage from "../../public/images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react'
import { useGetUserQuery } from "@/lib/services/auth";

interface User { name: string; }

const Header = () => {
  const [user, setUser] = useState<User | null>(null)
  const { data, isSuccess } = useGetUserQuery(null);
  useEffect(() => {
    if (data && isSuccess) {
      setUser(data.user)
    }
  }, [data, isSuccess]);

  return (
    <>
    <div className=" fixed z-10 w-full ">
      <header className="top-0 left-0 bg-[#EDF0FD] bg-opacity-10   backdrop-blur-2xl flex justify-around items-center pt-4 bg-transparent mb-5">
        <div className="flex items-center">
          <Link href='/home'>
            <Image src={logo} alt="Logo" width={48} height={60} />
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-800 ml-3 p-2 bg-transparent rounded-sm">
            Trustify
          </h1>
        </div>

        {!user ? (<div className="hidden sm:flex space-x-4 lg:space-x-6">
          <Link href="/home" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Home
          </Link>
          <a href="#" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Products
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            About Us
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Contact
          </a>
        </div>) : (
            <div className="sm:flex space-x-4 lg:space-x-6 w-1/2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-8 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          )
        }

        {user ? (
          <div className="flex items-center justify-center space-x-4">
            
            <Link href="/user/list-product" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                Sell 
            </Link>
            <span className="material-icons text-xl text-gray-600 cursor-pointer"><FontAwesomeIcon icon={faCartShopping} /></span>
            <Link href="/user/profile">
            <div className="flex items-center space-x-2">
              <Image
                // src={user.profileImage || {profileImage}}
                src={profileImage}
                alt="User Profile"
                width={30}
                height={30}
                className="rounded-full"
              />
              {/* <span className="text-gray-800 font-medium">{user.name}</span> */}
              <span className="text-gray-800 font-medium">{user?.name}</span>
            </div>
            </Link>
          </div>
        ):

        (<div className="flex space-x-2 sm:space-x-4 z-49">
          <Link href="/login" className="bg-green-600 text-white py-2 px-3 sm:px-4 rounded hover:bg-green-700 text-sm sm:text-base">
            Log In
          </Link>
          <Link href="/register" className="bg-blue-600 text-white py-2 px-3 sm:px-4 rounded hover:bg-blue-700 text-sm sm:text-base">
            Get Started
          </Link>
        </div>
        )} 
    </header>
    
    { user? (
      <div className=" mt-3 relative w-full h-[50px] bg-[#EDF0FD] bg-opacity-10  rounded-[10px]">
        <div className="flex items-center justify-start px-4 py-2 font-semibold text-gray-800">
          <Link href="/home" className="hover:underline"> HOME </Link>
        </div>
      </div>):(null)
    }
    </div>
    </>
  );
};

export default Header;
