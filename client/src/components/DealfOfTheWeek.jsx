import React, { useState, useEffect } from "react";
import { HiOutlineShoppingCart, HiChevronDown } from "react-icons/hi";
import { BASEHOST } from "../use";
import axios from "axios";
import { addTocart } from "./add";
const CountdownTimer = ({ days, hours, minutes, seconds }) => (
    <div className="flex space-x-2 justify-center mb-4">
        <div className="bg-custom-pink text-white px-2 py-1 rounded">{days}d</div>
        <div className="bg-custom-pink text-white px-2 py-1 rounded">{hours}h</div>
        <div className="bg-custom-pink text-white px-2 py-1 rounded">
            {minutes}m
        </div>
        <div className="bg-custom-pink text-white px-2 py-1 rounded">
            {seconds}s
        </div>
    </div>
);

const ProductCard = ({ image, title, priceRange, features, options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between transform transition-transform hover:scale-105 hover:shadow-lg">
            <div>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-contain mb-4 rounded-md"
                />
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
                    <HiChevronDown
                        className={`transition-transform ${showOptions ? "rotate-180" : ""
                            }`}
                    />
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
            <button
                onClick={() => addTocart({ ...selectedOption, image, title })}
                className="mt-4 bg-[#E4258F] text-white px-4 py-2 rounded-full hover:bg-[#C71B7B] transition flex items-center justify-center"
            >
                <HiOutlineShoppingCart className="mr-2" /> Add to cart - $
                {selectedOption.price.toFixed(2)}
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
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);

    useEffect(() => {
        axios
            .get(`${BASEHOST}/products`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Deal Of The Week
            </h2>
            <CountdownTimer days={7} hours={4} minutes={19} seconds={59} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {currentProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        image={product.image}
                        title={product.name}
                        priceRange={`$${product.price}`}
                        features={[product.description]}
                        options={[
                            { id: 1, name: "Option 1", price: 19.99 },
                            { id: 2, name: "Option 2", price: 24.99 },
                            { id: 3, name: "Option 3", price: 29.99 },
                        ]}
                    />
                ))}
            </div>

            <div className="flex justify-center space-x-2">
                {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(
                    (number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number + 1)}
                            className={`px-3 py-1 rounded-md ${number + 1 === currentPage
                                    ? "bg-custom-pink text-white"
                                    : "bg-gray-200"
                                }`}
                        >
                            {number + 1}
                        </button>
                    )
                )}
            </div>


        </div>
    );
};

export default DealsOfTheWeek;
