import React, { useState, useEffect } from "react";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { TbCurrencyCent } from "react-icons/tb";
import avatar from "../../public/images/logo.png";
import downarrow from "../../public/images/downarrow.png";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const TopNav = () => {
  const { logout, user } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = useLocation().pathname;
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className='hidden lg:flex flex-row items-center justify-between px-2 md:px-[100px] mt-2'>
      <div className='flex flex-row items-center gap-2'>
        <CiLocationOn color='#E4258F' className='h-4 w-4' />
        <p className='text-[#56778F] font-semibold text-sm'>Kampala, Uganda</p>
      </div>
      <div className='flex flex-row items-center gap-2 self-center'>
        <CiPhone color='#E4258F' className='h-4 w-4' />
        <p className='text-[#56778F] font-semibold text-sm'>
          Sales & Service Support / 999-456-6782
        </p>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <div className='relative'>
          <div
            className='flex flex-row items-center gap-2 cursor-pointer'
            onClick={toggleMenu}
          >
            <img src={avatar} className='h-4 w-4' />
            {user ? (
              <p className='text-[#56778F] font-semibold text-sm'>{user?.user.name}</p>
            ) : (
              <p className='text-[#56778F] font-semibold text-sm'>My Account</p>
            )}
          </div>
          {isOpen && (
            <div className='absolute py-4 px-8 text-sm text-white z-10 right-0 mt-2 bg-[#FF647F] rounded-md shadow-md'>
              <ul>
                {user?.token ? (
                  <li>
                    <button
                      className='hover:text-lg block py-2 px-4'
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to='/login'
                        className='hover:text-lg block py-2'
                        aria-label='Login'
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to='/signup' className=' py-2' aria-label='Sign Up'>
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
                {/* Add more dropdown items here */}
              </ul>
            </div>
          )}
        </div>
        <div className='flex flex-row items-center'>
          <TbCurrencyCent className='h-4 w-4' color='#E4258F' />
          <p className='text-[#56778F] font-semibold text-sm flex flex-row items-center'>
            ugshs{" "}
            <span>
              <img src={downarrow} alt='' className='ml-2' />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
