import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEHOST } from "../use";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useGlobalContext} from "../context/GlobalContext";

const Product = ({
    id,
    image,
    category,
    name,
    price,
    description,
}) => {
    const { cartItems, addItemToCart } =
      useGlobalContext();

    const handleAddToCart = () => {
        addItemToCart({ id, name, image, description, price });
        const updatedCartItems = [...cartItems, id];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };

    return (
      <div className='bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px] flex flex-col h-full p-2'>
        <div className='relative h-48'>
          <img src={image} alt={name} className='w-full h-full object-cover' />
        </div>
        <div className='p-4 flex-grow'>
          <h3 className='text-lg text-gray-600 py-1 mb-2'>{name}</h3>
          <span className='text-sm text-gray-500'>{category}</span>
          <h6 className='text-custom-pink text-md'>
              Ush {price}
          </h6>
        </div>
        <button
          onClick={handleAddToCart}
          className='w-full self-center my-2 rounded-md bg-custom-pink text-white py-2 hover:bg-pink-700 transition-colors mt-auto'
        >
          Add to Cart
        </button>
      </div>
    );
};

const BestSellingProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
      <div className='py-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>
          Best Selling Products
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
          {currentProducts.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </div>
        <div className='flex justify-center mt-8'>
          <button
            className={`mx-1 px-3 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : "bg-custom-pink text-white"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-2 rounded-md ${
                currentPage === page
                  ? "bg-custom-pink text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`mx-1 px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-custom-pink text-white"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    );
};

export default BestSellingProducts;
