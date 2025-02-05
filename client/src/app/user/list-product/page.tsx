// pages/listing.tsx
import React from 'react';
import Header from '@/components/Header';

const ListingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-b from-[#EDF0FD] to-white pt-20">
      <div className="w-full max-w-screen-lg mt-8 px-8  border-l-emerald-200 shadow-xl rounded-md   bg-slate-50 ">
        
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-3">Add New Product</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Description Section */}
          <div className="col-span-1 md:col-span-2 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Description</h2>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-4 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Product Description"
              className="w-full p-4 border border-gray-300 rounded"
            ></textarea>
            <input
              type="text"
              placeholder="Purchased Date"
              className="w-full p-4 border border-gray-300 rounded"
            />
          </div>

          {/* Product Images Section */}
          <div className="col-span-1 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Product Images</h2>
            {/* <div>
              <p>Click to upload or drag and drop</p>
            </div> */}
            <div className="border border-dashed bg-white border-gray-300 p-6 rounded flex items-center">

              <input type="file" id="image-upload" accept="image/*" />
            </div>
            <button className="bg-blue-600 text-white mx-2 py-2 px-4 rounded-lg hover:bg-blue-700">Upload</button>
          </div>

          {/* Category Section */}
          <div className="col-span-1 md:col-span-2 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Category</h2>
            <select className="w-full p-4 border border-gray-300 rounded">
              <option>Product Category</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Pookie</option>
              <option>Beauty</option>
            </select>
          </div>

          {/* Pricing Section */}
          <div className="col-span-1 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Pricing</h2>
            <input
              type="number"
              placeholder="Price"
              className="w-full p-4 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Discounts"
              className="w-full p-4 border border-gray-300 rounded"
            />
          </div>          
        </div>

        <div className="flex space-x-4 m-5 p-5">
              <button className="bg-gray-200 text-black py-3 px-6 rounded-lg  hover:bg-gray-300">Discard</button>
              <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700">Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
