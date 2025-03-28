"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "@/lib/constant";

const ListingPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); // Extract userId from query parameters
console.log(userId)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    purchasedDate: "",
    category: "",
    price: "",
    condition: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("condition", formData.condition);
    data.append("price", formData.price);
    data.append("userId", userId);
  
    if (formData.image) {
      data.append("image", formData.image); // Ensure image is appended
    } else {
      alert("Error: Please upload an image.");
      return;
    }
  
    console.log("FormData before sending:");
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/add-product`, {
        method: "POST",
        body: data,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        router.push(`/profile?userId=${userId}`);
      } else {
        alert(result.message || "Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div>
      <Header />
      <div className="min-h-screen flex justify-center items-start bg-gradient-to-b from-[#EDF0FD] to-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-screen-lg mt-8 px-8 border-l-emerald-200 shadow-xl rounded-md bg-slate-50"
        >
          <div className="py-6">
            <h1 className="text-2xl font-bold mb-3">Add New Product</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Description Section */}
            <div className="col-span-1 md:col-span-2 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">Description</h2>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full p-4 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Product Description"
                className="w-full p-4 border border-gray-300 rounded"
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="date"
                name="purchasedDate"
                className="w-full p-4 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />
            </div>

            {/* Product Images Section */}
            <div className="col-span-1 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">Product Images</h2>
              <div className="border border-dashed bg-white border-gray-300 p-6 rounded flex items-center">
                <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            {/* Category Section */}
            <div className="col-span-1 md:col-span-2 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">Category</h2>
              <select
                name="category"
                className="w-full p-4 border border-gray-300 rounded"
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Furniture">Furniture</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>

            {/* Condition Section */}
            <div className="col-span-1 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">Condition</h2>
              <select
                name="condition"
                className="w-full p-4 border border-gray-300 rounded"
                onChange={handleChange}
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>

            {/* Pricing Section */}
            <div className="col-span-1 space-y-4 bg-slate-100 p-5 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">Pricing</h2>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full p-4 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 m-5 p-5">
            <button type="reset" className="bg-gray-200 text-black py-3 px-6 rounded-lg hover:bg-gray-300">
              Discard
            </button>
            <button type="submit" className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingPage;
