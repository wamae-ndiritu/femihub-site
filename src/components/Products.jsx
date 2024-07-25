import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import herbs from "../assets/herbs.png";
import babyproducts from "../assets/babyproducts.png";
import vitamin from "../assets/vitamin.png";

const ProductSection = ({ title, items, image }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#E4258F]">{title}</h2>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <ul className="space-y-2 mb-4 md:mb-0">
          {items.map((item, index) => (
            <li key={index} className="text-[#184363] text-lg md:text-base">{item}</li>
          ))}
        </ul>
        <img src={image} alt={title} className="w-32 h-32 object-cover rounded-md" />
      </div>
    </div>
    <div className="flex justify-center mt-4">
      <button className="bg-[#E4258F] text-white px-4 py-2 rounded-full hover:bg-[#C71B7B] w-1/2 transition-colors">
        View all
      </button>
    </div>
  </div>
);

const ProductSelector = () => {
  const [category, setCategory] = useState('Category');
  const [brand, setBrand] = useState('Brand');

  const categories = [
    'Vitamins & Supplements',
    'Personal Care',
    'Fitness & Nutrition',
    'Health Devices',
    'Beauty Products',
    'Herbal Remedies',
    'Baby Care',
    'Wellness Services'
  ];

  const brands = [
    'Nature\'s Bounty',
    'GNC',
    'Optimum Nutrition',
    'Neutrogena',
    'Fitbit',
    'Himalaya Herbals',
    'Johnson & Johnson',
    'Philips Healthcare'
  ];

  return (
    <div className="mt-4" id='productselector'>
      <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-8">
        <span className="font-semibold text-[#E4258F] whitespace-nowrap">Select a product</span>
        <div className="flex-grow flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <div className="relative w-full sm:w-1/3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded-md appearance-none border border-[#E4258F] focus:outline-none focus:ring-2 focus:ring-[#E4258F]"
            >
              <option>Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <HiChevronDown className="absolute right-2 top-3 w-5 h-5 text-[#E4258F]" />
          </div>
          <div className="relative w-full sm:w-1/3">
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded-md appearance-none border border-[#E4258F] focus:outline-none focus:ring-2 focus:ring-[#E4258F]"
            >
              <option>Brand</option>
              {brands.map((b, index) => (
                <option key={index} value={b}>{b}</option>
              ))}
            </select>
            <HiChevronDown className="absolute right-2 top-3 w-5 h-5 text-[#E4258F]" />
          </div>
          <span className="hidden sm:inline text-gray-500 self-center">OR</span>
          <input
            type="text"
            placeholder="Enter SKU"
            className="w-full sm:w-1/3 p-2 bg-gray-100 rounded-md border border-[#E4258F] focus:outline-none focus:ring-2 focus:ring-[#E4258F]"
          />
        </div>
        <button className="bg-[#E4258F] text-white px-6 py-2 rounded-full hover:bg-[#C71B7B] transition whitespace-nowrap">
          Shop now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductSection
          title="Vitamins"
          items={['Analgesics', 'Antimalarial Drugs', 'Antipyretics', 'Antibiotics']}
          image={vitamin}
        />
        <ProductSection
          title="Baby Accessories"
          items={['Meal Replacements', 'Protein powder', 'Muscle building', 'Low Calorie Snacks']}
          image={babyproducts}
        />
        <ProductSection
          title="Herbs"
          items={['Gluten Free', 'Sun Care', 'Sugar Free', 'Super foods']}
          image={herbs}
        />
      </div>
    </div>
  );
};

export default ProductSelector;
