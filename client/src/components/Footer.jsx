import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { FaCcPaypal, FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import femihublogo from "../../public/images/femihublogo.png"
const Footer = () => {
  return (
    <footer className="bg-custom-pink text-white py-12 w-full fixed botton-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Newsletter */}
          <div className="space-y-4">
            <img src={femihublogo} alt="Logo" className="w-16 h-16" />
            {/* <p className="text-sm">Stay tuned for latest updates and new features</p> */}
            {/* <form className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-grow px-4 py-2 rounded-l-full text-gray-900"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-full transition duration-300"
              >
                Subscribe
              </button>
            </form> */}
            {/* <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded text-orange-500" />
              <label htmlFor="terms" className="text-xs">
                I accept terms and conditions & privacy policy
              </label>
            </div> */}
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              {['About us', 'Delivery information', 'Privacy Policy', 'Sales', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-500 transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              {['Dashboard', 'My orders', 'Account details', 'Returns', 'Wishlist'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-500 transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About / Contacts</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <MdLocationOn className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>70 Washington Square South, New York, NY 10012, United States</span>
              </li>
              <li className="flex items-center space-x-2">
                <MdEmail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:Pavanvkoli@gmail.com" className="hover:text-orange-500 transition duration-300">
                  Pavanvkoli@gmail.com
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {[
                { icon: <FaFacebookF />, name: 'Facebook' },
                { icon: <FaInstagram />, name: 'Instagram' },
                { icon: <FaLinkedinIn />, name: 'LinkedIn' },
                { icon: <FaTwitter />, name: 'Twitter' },
                { icon: <FaYoutube />, name: 'YouTube' },
              ].map((social) => (
                <a key={social.name} href="#" className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Propharm. All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <FaCcPaypal className="h-8 w-auto" />
            <FaCcMastercard className="h-8 w-auto" />
            <FaCcVisa className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;