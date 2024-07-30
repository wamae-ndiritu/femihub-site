import React, { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import { useLocation } from "react-router-dom";
import { listProducts } from "../lib/apiCalls";
import { useGlobalContext } from "../context/GlobalContext";

const Search = () => {
  const { setProducts } = useGlobalContext();
  const location = useLocation();
  const keyword = location?.search
    ? location.search.split("=")[1].split("&")[0]
    : "";
  const category = location?.search ? location.search.split("=")[2] : "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([]);
        const products = await listProducts(keyword.replace('-', ' '), category);
        setProducts(products);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (keyword || category) {
      fetchProducts();
    }
  }, [keyword, location]);
  return (
    <div className='px-2 md:px-[100px] mt-2'>
      <ProductSection title='Search Results' />
    </div>
  );
};

export default Search;
