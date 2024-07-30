import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import MainNavbar from './components/Navbar';
import HeroSwiper from './components/HeroSwiper';
import SearchContainer from './components/SearchContainer';
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
import MaternalWellness from './components/MaternalWellness';
import ProductSection from './components/ProductSection';
import Search from './components/Search';
import { ToastContainer } from 'react-toastify';
import ProductViewPage from './components/ProductView';

const Home = () => (
  <div className='px-2 md:px-[100px] mt-2'>
    <SearchContainer />
    <HeroSwiper />
    <ProductSection title='Best Selling Products' />
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
        <Route path='/postnatal' element={<PostnatalInfo />} />
        <Route path='/maternal-wellness' element={<MaternalWellness />} />
        <Route path='/products' element={<Search />} />
        <Route path='/products/:id' element={<ProductViewPage />} />
      </Routes>
      <ChatbotModal />
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
