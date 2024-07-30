import React, { useEffect, useState } from "react";
import { HiSearch, HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../lib/apiCalls";

const SearchContainer = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCatId, setSelectedCatId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([{id: '', name: "All Categories"}]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword || selectedCatId){
      navigate(`/products?search=${keyword.trim().replace(' ', '-')}&catId=${selectedCatId}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await listCategories();
        setCategories(categories.filter((cat) => cat.id !== 4));
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchCategories();
  }, [])

  return (
    <div className='my-2  mx-auto '>
      <div className='relative flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2'>
        <div className='relative w-full sm:w-auto'>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='flex items-center justify-between w-full sm:w-48 px-4 py-2 text-white font-semibold border-2 bg-[#E4258F] rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:border-[#E4258F]-600'
          >
            <span className='truncate'>{selectedCategory}</span>
            <HiChevronDown className='ml-2 h-5 w-5 text-white' />
          </button>
          {isDropdownOpen && (
            <div className='absolute z-10 w-full sm:w-48 mt-1 bg-white rounded-md shadow-lg'>
              {categories.map((category) => (
                <a 
                  key={category.id}
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#E4258F] hover:text-white'
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category.name);
                    setSelectedCatId(category.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  {category.name}
                </a>
              ))}
            </div>
          )}
        </div>
        <form className='flex w-full' onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Search for health and wellness products...'
            className='flex-grow px-4 py-2 text-gray-700 bg-white border-2 rounded-l-full sm:rounded-l-none outline-none focus:border-[#E4258F]'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type='submit'
            className='px-6 py-2 text-white bg-[#E4258F] border-2 border-[#E4258F] rounded-r-full hover:bg-[#C71B7B] focus:outline-none focus:ring-2 focus:ring-[#E4258F] focus:ring-opacity-50'
          >
            <HiSearch className='h-5 w-5' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchContainer;
