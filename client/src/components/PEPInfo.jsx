import React from "react";

const PEPInfo = () => {
  return (
    <section className='bg-gray-100 py-16 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center'>
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <img
            src='/images/pep.png'
            alt='PEP Information'
            className='w-full rounded-lg shadow-md'
          />
        </div>
        <div className='md:w-1/2 md:pl-8'>
          <h2 className='text-4xl font-bold mb-4'>
            Post-exposure Prophylaxis (PEP)
          </h2>
          <p className='text-gray-700 mb-4'>
            Post-exposure Prophylaxis (PEP) is an emergency treatment for people
            who may have been exposed to HIV. It involves taking antiretroviral
            medicines (ART) within 72 hours after a possible exposure to HIV.
          </p>
          <p className='text-gray-700 mb-4'>
            PEP is effective when started promptly and taken as prescribed. It
            is a critical intervention to prevent HIV infection after a
            potential exposure.
          </p>
          <p className='text-gray-700 mb-4'>
            If you think you may have been exposed to HIV, seek medical care
            immediately and ask your healthcare provider about PEP.
          </p>
          <a
            href='https://www.cdc.gov/hiv/basics/pep.html'
            className='inline-block bg-custom-pink text-white px-6 py-3 rounded-md shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default PEPInfo;
