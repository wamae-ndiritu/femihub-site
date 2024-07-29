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
import FAQS from './components/FAQS';
import DownloadAppSection from './components/DownloadAppSection';
import ChatbotModal from './components/ChatbotModal';
import PREP from './components/PREP';
import PEPInfo from './components/PEPInfo';
import AntenatalInfo from './components/Antenatal';
import PostnatalInfo from './components/PostnatalInfo';

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
    <DownloadAppSection />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <TopNav />
      <MainNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/productselector' element={<ProductSelector/>}/> */}
        <Route path='/doctor' element={<DoctorConsult />} />
        <Route path='/doctorverify' element={<DoctorForm />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/faqs' element={<FAQS />} />
        <Route path='/prep' element={<PREP />} />
        <Route path='/pep' element={<PEPInfo />} />
        <Route path='/antenatal' element={<AntenatalInfo />} />
        <Route path='/postnatal' element={<PostnatalInfo/>} />
      </Routes>
      <ChatbotModal />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
