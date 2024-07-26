// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import MainNavbar from './components/Navbar';
import HeroSwiper from './components/HeroSwiper';
import SearchContainer from './components/SearchContainer';
import ProductSelector from './components/Products';
import DealsOfTheWeek from './components/DealfOfTheWeek';
import BestSellingProducts from './components/BestSelling';
import NewProducts from './components/NewProducts';
import Footer from './components/Footer';
import DoctorConsult from './components/DoctorConsult';
import DoctorForm from './components/DoctorForm';
import Cart from './components/cart';
import Login from './components/login';
import Signup from './components/signup';

const Home = () => (
  <div className='px-2 md:px-[100px] mt-2'>
    {/* <TopNav /> */}
    {/* <MainNavbar /> */}
    <SearchContainer />
    <HeroSwiper />
    <ProductSelector />
    <BestSellingProducts />
    <DealsOfTheWeek />
    <NewProducts />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
        <TopNav />
        <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/productselector' element={<ProductSelector/>}/> */}
        <Route path="/doctor" element={<DoctorConsult />} />
        <Route path="/doctorverify" element={<DoctorForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
