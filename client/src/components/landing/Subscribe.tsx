import React from 'react';

import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { AnimatedSubscribeButton } from "@/components/ui/animated-subscribe-button";

const Subscribe: React.FC = () => {
  return (
    <section className="relative w-full h-[483px] bg-gradient-to-b from-[#EDF0FD] to-white  flex flex-col items-center justify-center  lg: px-4 sm:px-12 lg:px-16">
      {/* Subscribe Header */}
      <h2 className="text-[#2D3150] font-bold text-4xl text-center mb-2">
        Subscribe Newsletter & Get
      </h2>
      <h3 className="text-[#2D3150] font-light text-3xl text-center mb-10">
        Latest Product Updates
      </h3>

      {/* Input Group */}
      <div className="relative flex items-center">
        <input
          type="email"
          placeholder="Your email"
          className="w-[640px] h-[72px] bg-white shadow-lg rounded-lg px-4 text-gray-500 text-lg focus:outline-none"
        />

        
        <div className="absolute right-8 mt-4  h-[58px] w-[180px] ">
          <AnimatedSubscribeButton
            buttonColor="#686DF1"
            buttonTextColor="#ffffff"
            subscribeStatus={false}
            initialText={
                <span className="group inline-flex items-center">
                Subscribe{" "}
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            }
            changeText={
                <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Subscribed{" "}
                </span>
            }
        />
        </div>

    </div>
    </section>
  );
};

export default Subscribe;
