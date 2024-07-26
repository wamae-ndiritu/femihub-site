import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEHOST } from "../use";
import { addTocart } from "./add";
import { TiTick } from "react-icons/ti";

const Product = ({
    cartItems,
    id,
    image,
    category,
    name,
    price,
    salePrice = 0,
    description,
}) => {
    const [buttonText, setButtonText] = useState(cartItems.includes(id) ? "Added" : "Add to cart");

    const handleAddToCart = () => {
        addTocart({ id, name, image, description, price });
        setButtonText("Added");
        // Update the local storage as well
        const updatedCartItems = [...cartItems, id];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };

    return (
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
            <button
                onClick={handleAddToCart}
                className="w-1/2 self-center my-2 rounded-full bg-custom-pink text-white py-2 hover:bg-pink-700 transition-colors mt-auto"
            >
                {buttonText}
            </button>
        </div>
    );
};

const BestSellingProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    useEffect(() => {
        axios
            .get(`${BASEHOST}/products`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Best Selling Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {currentProducts.map((product, index) => (
                    <Product key={index} {...product} cartItems={cartItems} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    className={`mx-1 px-3 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-custom-pink text-white"
                        }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`mx-1 px-3 py-2 rounded-md ${currentPage === page ? "bg-custom-pink text-white" : "bg-gray-300"
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className={`mx-1 px-3 py-2 rounded-md ${currentPage === totalPages
                        ? "bg-gray-300"
                        : "bg-custom-pink text-white"
                        }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BestSellingProducts;
