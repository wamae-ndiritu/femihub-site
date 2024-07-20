import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";
import avatar from "../../public/images/logo.png"
import { FaDollarSign } from "react-icons/fa6";
import downarrow from "../../public/images/downarrow.png"

const TopNav = () => {
  return (

    <div className='hidden  lg:flex flex-row items-center justify-between px-2 md:px-[100px] mt-2'>
      <div className='flex flex-row items-center gap-2'>
        <CiLocationOn color='#E4258F' className='h-4 w-4 ' />
        <p className='text-[#56778F] font-semibold text-sm'>60 Washington East, New York, NY 10012, United States</p>
      </div>
      <div className='flex flex-row items-center gap-2 self-center'>
        <CiPhone color='#E4258F' className='h-4 w-4  ' />
        <p className='text-[#56778F] font-semibold text-sm'>Sales & Service Support / 999-456-6782</p>

      </div>
      <div className='flex flex-row items-center gap-4'>
        <div className='flex flex-row items-center gap-2'>
          <img src={avatar} className='h-4 w-4  ' />
          <p className='text-[#56778F] font-semibold text-sm'>My Account</p>
        </div>
        <div className='flex flex-row items-center '>
          <FaDollarSign className='h-4 w-4 ' color='#E4258F' />
          <p className='text-[#56778F] font-semibold text-sm flex flex-row items-center'>USD <span><img src={downarrow} alt="" className='ml-2' /></span></p></div>
      </div>

    </div>

  )
}

export default TopNav
