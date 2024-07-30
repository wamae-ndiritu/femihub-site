import React, { useState, useEffect } from "react";
import vitaminbottle from "../assets/vitaminbottle.png";
import supplement from "../assets/supplement.png";
import { BASEHOST } from "../use";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import { CiShoppingCart } from "react-icons/ci";

const ProductCard = ({ id, image, category, name, price, description }) => {
  const { addItemToCart } = useGlobalContext();

  const handleAddToCart = () => {
    addItemToCart({ id, name, image, description, price });
  };

  return (
    <div className='bg-white border border-gray-300 p-2 rounded-lg shadow hover:shadow-md transition-shadow relative'>
      <img src={image} alt={name} className='w-full h-40 object-contain mb-4' />
      <h3 className='text-lg text-gray-600 mb-6'>{name}</h3>
      <div className='text-sm text-gray-500'>{category}</div>
      <div className="absolute bottom-1 right-0 left-0 w-full px-2 flex justify-between items-center">
        <h6 className='text-custom-pink py-1 text-md'>Ush {price}</h6>
        <button
          onClick={handleAddToCart}
          className={`px-3 py-1 rounded text-sm transition-colors bg-white border border-gray-300 text-custom-pink hover:text-white hover:bg-custom-pink`}
        >
          <CiShoppingCart className='h-6 w-6'/>
        </button>
      </div>
    </div>
  );
};

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); 

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

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>New Products</h2>
        <div className='flex space-x-2'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className='text-gray-400 hover:text-gray-600'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(products.length / productsPerPage)
            }
            className='text-gray-400 hover:text-gray-600'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {currentProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      <div className='flex justify-center space-x-2 mt-6'>
        {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 rounded-md ${
                number + 1 === currentPage
                  ? "bg-custom-pink text-white"
                  : "bg-gray-200"
              }`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>

      <div className='mt-12 bg-blue-100 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between'>
        <div className='mb-4 md:mb-0 md:mr-6'>
          <h3 className='text-2xl font-bold mb-2'>Vitamins & Supplements</h3>
          <p className='text-gray-600 mb-4'>Pyridoxine Vitamin B6</p>
          <button className='bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors'>
            View more
          </button>
        </div>
        <div className='flex items-center space-x-4'>
          <img
            src={vitaminbottle}
            alt='Vitamin Bottle'
            className='w-24 h-24 object-contain'
          />
          <img
            src={supplement}
            alt='Supplement Box'
            className='w-24 h-24 object-contain'
          />
        </div>
      </div>

      <h2 className='text-3xl font-bold text-center text-gray-800 mb-8 mt-4'>
        More to love
      </h2>
    </div>
  );
};

export default NewProducts;
