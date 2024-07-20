import React, { useState } from 'react';
import { HiOutlineShoppingCart, HiChevronDown } from 'react-icons/hi';
import durex from "../assets/durex.jpg"
import baby from "../assets/baby.jpg"
import mask from "../assets/mask.png"
import covid from "../assets/covid19.png"
const CountdownTimer = ({ days, hours, minutes, seconds }) => (
  <div className="flex space-x-2 justify-center mb-4">
    <div className="bg-custom-pink text-white px-2 py-1 rounded">{days}d</div>
    <div className="bg-custom-pink text-white px-2 py-1 rounded">{hours}h</div>
    <div className="bg-custom-pink text-white px-2 py-1 rounded">{minutes}m</div>
    <div className="bg-custom-pink text-white px-2 py-1 rounded">{seconds}s</div>
  </div>
);

const ProductCard = ({ image, title, priceRange, features, options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between transform transition-transform hover:scale-105 hover:shadow-lg">
      <div>
        <img src={image} alt={title} className="w-full h-48 object-contain mb-4 rounded-md" />
        <h3 className="text-lg font-semibold text-[#E4258F] mb-2">{title}</h3>
        <p className="text-gray-700 mb-2">{priceRange}</p>
        <ul className="text-sm text-gray-600 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left flex items-center justify-between"
        >
          <span>{selectedOption.name}</span>
          <HiChevronDown className={`transition-transform ${showOptions ? 'rotate-180' : ''}`} />
        </button>
        {showOptions && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedOption(option);
                  setShowOptions(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {option.name} - ${option.price.toFixed(2)}
              </button>
            ))}
          </div>
        )}
      </div>
      <button className="mt-4 bg-[#E4258F] text-white px-4 py-2 rounded-full hover:bg-[#C71B7B] transition flex items-center justify-center">
        <HiOutlineShoppingCart className="mr-2" /> Add to cart - ${selectedOption.price.toFixed(2)}
      </button>
    </div>
  );
};

const OfferCard = ({ image, title, subtitle, buttonText }) => (
  <div className="relative overflow-hidden rounded-lg transform transition-transform hover:scale-105 hover:shadow-lg">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
      <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
      <p className="text-white text-sm mb-2">{subtitle}</p>
      <button className="bg-custom-pink text-white px-4 py-2 rounded-full hover:scale-105 transition text-sm">
        {buttonText}
      </button>
    </div>
  </div>
);


const DealsOfTheWeek = () => {
  const vitaminCOptions = [
    { id: 1, name: 'Pack of 1 contains 10', price: 16.00 },
    { id: 2, name: 'Pack of 2 contains 20', price: 25.00 },
    { id: 3, name: 'Pack of 3 contains 30', price: 35.00 },
  ];

  const insulinOptions = [
    { id: 1, name: 'Pack of 1 contains 10', price: 18.88 },
    { id: 2, name: 'Pack of 2 contains 20', price: 25.88 },
    { id: 3, name: 'Pack of 3 contains 30', price: 32.88 },
  ];

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Deal Of The Week</h2>
      <CountdownTimer days={7} hours={4} minutes={19} seconds={59} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <ProductCard 
          image={durex}
          title="Durex women's condoms"
          priceRange="$16.00 – $35.00"
          features={[
            "3 cleaning programs",
            "Digital display",
            "Memory for 1 user"
          ]}
          options={vitaminCOptions}
        />
        <ProductCard 
          image={baby}
          title="Gentle Baby oil: message oil"
          priceRange="$18.88 – $32.88"
          features={[
            "3 cleaning programs",
            "Digital display",
            "Memory for 1 user"
          ]}
          options={insulinOptions}
        />
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Special offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <OfferCard 
          image={mask}
          title="Breathable Face Mask"
          subtitle="From $9.99"
          buttonText="Show now >"
        />
        <OfferCard 
          image={covid}
          title="Covid 19 pack"
          subtitle="Get it now 45% Off"
          buttonText="Show now >"
        />
      </div>
    </div>
  );
};

export default DealsOfTheWeek;