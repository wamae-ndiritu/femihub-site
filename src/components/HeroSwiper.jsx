import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images
import sliderimg1 from "../../public/images/sliderimg2.jpg";
import sliderimg2 from "../../public/images/sliderimg3.jpg";

const HeroSwiper = () => {
  const images = [sliderimg1, sliderimg2];

  return (
    <div >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}

        // navigation
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        // className="h-"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className=" h-full relative">
              <img 
                src={src} 
                alt={`Slide ${index + 1}`} 
                className="w-[100vw] min-h-full  object-cover "
              />
              {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSwiper;