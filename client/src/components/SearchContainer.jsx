import React, { useState } from 'react';
import { HiSearch, HiChevronDown } from 'react-icons/hi';

const SearchContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = ['All Categories', 'Supplements', 'Fitness', 'Personal Care', 'Nutrition','Maternal care', 'Sexual wellness', 'Baby products'];

  return (
    <div className="my-2  mx-auto ">
      <div className="relative flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full sm:w-48 px-4 py-2 text-white font-semibold border-2 bg-[#E4258F] rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:border-[#E4258F]-600"
          >
            <span className="truncate">{selectedCategory}</span>
            <HiChevronDown className="ml-2 h-5 w-5 text-white" />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full sm:w-48 mt-1 bg-white rounded-md shadow-lg">
              {categories.map((category) => (
                <a // Added the missing opening tag here
                  key={category}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E4258F] hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                >
                  {category}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="flex w-full">
          <input 
            type="text"
            placeholder="Search for health and wellness products..."
            className="flex-grow px-4 py-2 text-gray-700 bg-white border-2 rounded-l-full sm:rounded-l-none outline-none focus:border-[#E4258F]"
          />
          <button className="px-6 py-2 text-white bg-[#E4258F] border-2 border-[#E4258F] rounded-r-full hover:bg-[#C71B7B] focus:outline-none focus:ring-2 focus:ring-[#E4258F] focus:ring-opacity-50">
            <HiSearch className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
