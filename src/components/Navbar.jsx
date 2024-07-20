// Navbar.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/',  },
    { name: 'Shop By Brand', to: 'productselector', offset: -70 },
    { name: 'Shop By Category', to: 'productselector', offset: -70 },
    { name: 'Blog', href: '#' }, // Assuming Blog is an external link
    { name: 'Consult with doctor', href: '/doctor' },
    { name: 'Become a doctor', href: '/doctorverify' },
  ];

  return (
    <nav className="mt-2 px-4 lg:px-[100px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img className="h-8 w-auto" src="/images/femihublogo.png" alt="FemiHub Logo" />
            <span className="ml-2 text-xl font-bold text-gray-800">My<span className='text-[#E4258F]'>FemiHub</span></span>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) =>
                item.to ? (
                  <Link
                    key={item.name}
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={item.offset}
                    className="nav-item text-[#184363] hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a key={item.name} href={item.href} className="nav-item text-[#184363] hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold">
                    {item.name}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <button className="p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white">
              <CiHeart className="h-6 w-6" color='#E4258F' />
            </button>
            <button className="ml-3 p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white" >
              <CiShoppingCart className="h-6 w-6" color='#E4258F'  />
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item.to ? (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={item.offset}
                  className="nav-item text-[#184363] hover:text-gray-900 block px-3 py-2 rounded-md text-base font-bold cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a key={item.name} href={item.href} className="nav-item text-[#184363] hover:text-gray-900 block px-3 py-2 rounded-md text-base font-bold">
                  {item.name}
                </a>
              )
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <button className="p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white">
                <CiHeart className="h-6 w-6" color='#E4258F'/>
              </button>
              <button className="ml-3 p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white">
                <CiShoppingCart className="h-6 w-6" color='#E4258F'/>
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .nav-item {
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 2px;
          background-color: #E4258F;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }

        .nav-item:hover::before {
          transform: translateX(0);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
