import React from 'react';
import dental from "../assets/dental.png"
import surgery from "../assets/surgery.png"
import diagonsis from "../assets/diagonsis.png"
import cardiology from "../assets/cardiology.png"
import bones from "../assets/bones.png"
import eyecare from "../assets/eyecare.png"

const ServicesSection = () => {
  const services = [
    {
      title: 'Dental treatments',
      image: dental,
      description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalarcu lacus vel facilisis volutpat est velitolm.',
    },
    {
      title: 'Bones treatments',
      image: bones,
      description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalarcu lacus vel facilisis volutpat est velitolm.',
    },
    {
      title: 'Diagnosis',
      image: diagonsis,
      description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalarcu lacus vel facilisis volutpat est velitolm.',
    },
    {
      title: 'Cardiology',
      image: cardiology,
      description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalarcu lacus vel facilisis volutpat est velitolm.',
    },
    {
      title: 'Surgery',
      image: surgery,
      description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalarcu lacus vel facilisis volutpat est velitolm.',
    },
    {
      title: 'Eye care',
      image: eyecare,
      description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalarcu lacus vel facilisis volutpat est velitolm.',
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-2">Services we provide</h2>
        <p className="text-center text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, image, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-teal-600 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href="#" className="text-teal-600 font-medium flex items-center">
          Learn more
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ServicesSection;