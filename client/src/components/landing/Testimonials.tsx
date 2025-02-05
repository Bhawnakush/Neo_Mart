import React from 'react';
import person from "@/../public/images/person.png"
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    { id: 1, name: 'Jane Doe', feedback: 'Trustify is super reliable!'},
    { id: 2, name: 'John Smith', feedback: 'I love how easy it is to buy from people I know'},
    { id: 3, name: 'Alice Lee', feedback: 'No more worries about fake sellers!'},
  ];

  return (
    <section id="testimonials" className="w-full py-16 px-8 bg-gradient-to-b from-white via-[#EDF0FD] to-[#EDF0FD]  lg: sm:px-12 lg:px-16">
      <h2 className="text-4xl font-bold text-center mb-8">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card w-[686px] p-4 bg-white shadow-lg rounded-lg">
            <Image src={person} alt={testimonial.name} className="w-12 h-12 rounded-full mb-4" />
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            <p className="text-gray-700">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
