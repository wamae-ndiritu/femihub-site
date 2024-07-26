import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import Cart from "./cart";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },

    {
      name: "Maternal Wellness",
      submenu: [
        { name: "Antenatal", href: "/antenatal" },
        { name: "Postnatal", href: "/postnatal" },
        { name: "Consult with Doctor", href: "/doctor" },
      ],
    },
    {
      name: "HIV Services",
      submenu: [
        { name: "PrEP", href: "/prep" },
        { name: "PEP", href: "/pep" },
      ],
    },
    { name: "Doctor Registration", href: "/doctorverify" },
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <nav className="mt-2 px-4 lg:px-[100px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/images/femihublogo.png"
              alt="FemiHub Logo"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">
              My<span className="text-[#E4258F]">FemiHub</span>
            </span>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center">
              {navItems.map((item, index) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className="nav-item text-[#184363] hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold flex items-center cursor-pointer"
                      >
                        {item.name}
                        <FaChevronDown className="ml-1 text-[#E4258F] group-hover:text-gray-900 transition duration-300" />
                      </button>
                      <div
                        className={`absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                          activeSubmenu === index
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="nav-item text-[#184363] hover:text-gray-900 px-3 py-2 rounded-md text-sm font-bold"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <button className="p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white">
              <CiHeart className="h-6 w-6" color="#E4258F" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)} // Toggle isOpen on click
              className="ml-3 p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white"
            >
              <CiShoppingCart className="h-6 w-6" color="#E4258F" />
            </button>
            {isOpen && <Cart isOpen={isOpen} setIsOpen={setIsOpen} />}{" "}
            {/* Pass setIsOpen prop to Cart */}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="w-full text-left nav-item text-[#184363] hover:text-gray-900 block px-3 py-2 rounded-md text-base font-bold flex items-center"
                    >
                      {item.name}
                      <FaChevronDown className="ml-1 text-[#E4258F] group-hover:text-gray-900 transition duration-300" />
                    </button>
                    <div
                      className={`pl-4 transition-all duration-300 ${
                        activeSubmenu === index
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="nav-item text-[#184363] hover:text-gray-900 block px-3 py-2 rounded-md text-base font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <button className="p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white">
                <CiHeart className="h-6 w-6" color="#E4258F" />
              </button>
              <button
                onClick={<Cart isOpen={true} setIsOpen={() => false} />}
                className="ml-3 p-1 rounded-full text-[#184363] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#E4258F] focus:ring-white"
              >
                <CiShoppingCart className="h-6 w-6" color="#E4258F" />
              </button>
            </div>
          </div>
        </div>
      )}
      <style>
        {`
        .nav-item {
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #E4258F;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease;
        }

        .nav-item:hover::before {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
