import React from 'react';
import item from "../assets/item.png";
import item1 from "../assets/item1.png";
import item2 from "../assets/item2.png";
import item3 from "../assets/item3.png";
import item4 from "../assets/item4.png";

const Product = ({ image, category, name, price, salePrice }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px] flex flex-col h-full">
    <div className="relative h-48">
      <img src={image} alt={name} className="w-full h-full object-contain" />
      {salePrice && (
        <span className="absolute top-2 right-2 bg-custom-pink text-white text-xs px-2 py-1 rounded-full">
          Sale
        </span>
      )}
    </div>
    <div className="p-4 flex-grow">
      <span className="text-sm text-gray-500">{category}</span>
      <h3 className="text-lg font-semibold mt-1 mb-2">{name}</h3>
      <div className="text-custom-pink font-bold">
        {salePrice ? (
          <>
            <span className="line-through text-gray-400 mr-2">${price}</span>
            <span>${salePrice}</span>
          </>
        ) : (
          <span>${price}</span>
        )}
      </div>
    </div>
    <button className="w-1/2 self-center my-2 rounded-full bg-custom-pink text-white py-2 hover:bg-pink-700 transition-colors mt-auto">
      Add to cart
    </button>
  </div>
);

const BestSellingProducts = () => {
  const products = [
    { image: item, category: 'Protein', name: 'Nutren Diabetes Vanilla', price: 14.50 },
    { image: item1, category: 'Herbs', name: 'Henry Blooms One Night', price: 44.00, salePrice: 39.00 },
    { image: item2, category: 'Pets', name: 'Spring Leaf Kids Fish Oil 750mg', price: 24.95 },
    { image: item3, category: 'Pets', name: 'Nordic Naturals Arctic-D Cod', price: 42.95, salePrice: 37.45 },
    { image: item4, category: 'Beauty', name: 'Nair Precision Facial Hair', price: 5.50, salePrice: 4.40 },
  ];

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Best Selling Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
