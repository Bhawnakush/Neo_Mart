"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cardData = [
    { id: 1, imageSrc: "/images/card1.jpg", title: "Product 1", category: "electronics" },
    { id: 2, imageSrc: "/images/card2.jpg", title: "Product 2", category: "clothing" },
    { id: 3, imageSrc: "/images/card3.jpg", title: "Product 3", category: "electronics" },
    { id: 4, imageSrc: "/images/card1.jpg", title: "Product 4", category: "furniture" },
    { id: 5, imageSrc: "/images/card2.jpg", title: "Product 5", category: "clothing" },
    { id: 6, imageSrc: "/images/card3.jpg", title: "Product 6", category: "furniture" },
    { id: 7, imageSrc: "/images/card1.jpg", title: "Product 7", category: "electronics" },
    { id: 8, imageSrc: "/images/card2.jpg", title: "Product 8", category: "clothing" },
    { id: 9, imageSrc: "/images/card3.jpg", title: "Product 9", category: "furniture" },
  ];

  // Filter cards based on the selected category
  const filteredCards =
    selectedCategory === "all"
      ? cardData
      : cardData.filter((card) => card.category === selectedCategory);

  return (
    <div>
      <Header />
      <div className="flex p-20">
        {/* Sidebar */}
        <div className="w-1/4 border-r p-4">
          <h2 className="font-semibold mb-4">Filter by Category</h2>
          <div>
            <div className="mb-2">
              <input
                type="radio"
                id="all"
                name="category"
                value="all"
                checked={selectedCategory === "all"}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="all">All</label>
            </div>
            <div className="mb-2">
              <input
                type="radio"
                id="electronics"
                name="category"
                value="electronics"
                checked={selectedCategory === "electronics"}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
            <div className="mb-2">
              <input
                type="radio"
                id="clothing"
                name="category"
                value="clothing"
                checked={selectedCategory === "clothing"}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="clothing">Clothing</label>
            </div>
            <div className="mb-2">
              <input
                type="radio"
                id="furniture"
                name="category"
                value="furniture"
                checked={selectedCategory === "furniture"}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="furniture">Furniture</label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 grid grid-cols-3 gap-4 p-4">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
            >
              <img
                src={card.imageSrc}
                alt={card.title}
                className="mb-4 rounded-md object-cover w-full h-48"
              />
              <p className="mb-2 font-semibold">{card.title}</p>
              <Button>Add to Cart</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
