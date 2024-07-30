import React, { useState, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useGlobalContext} from "../context/GlobalContext";
import { listProducts } from "../lib/apiCalls";
import Message from "./Message";
import ProductCard from "./ProductCard";

const ProductSection = ({title}) => {
    const {products, setProducts} = useGlobalContext();
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const products = await listProducts();
         setProducts(products)
       } catch (error) {
         setError(error.message);
       }
     };

     fetchProducts();
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
          {title}
        </h2>
        {error ? (
          <Message onClose={() => setError(null)}>{error}</Message>
        ) : products.length > 0 ? (
          <>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
              {currentProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
            <div className='flex justify-center mt-8'>
              <button
                className={`mx-1 px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300"
                    : "bg-custom-pink text-white"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
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
          </>
        ) : (
          <Message variant="success">No products found!</Message>
        )}
      </div>
    );
};

export default ProductSection;
