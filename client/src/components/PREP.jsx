import React from 'react'

const PREP = () => {
  return (
    <section className='bg-gray-100 py-16 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center'>
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <img
            src='/images/prep.png'
            alt='PrEP Information'
            className='w-full rounded-lg shadow-md'
          />
        </div>
        <div className='md:w-1/2 md:pl-8'>
          <h2 className='text-4xl font-bold mb-4'>
            Pre-exposure Prophylaxis (PrEP)
          </h2>
          <p className='text-gray-700 mb-4'>
            Pre-exposure Prophylaxis (PrEP) is a preventive treatment for people
            who are at high risk of contracting HIV. By taking a daily pill, you
            can significantly reduce your risk of getting HIV.
          </p>
          <p className='text-gray-700 mb-4'>
            PrEP is highly effective when taken consistently and as prescribed.
            It is a crucial part of comprehensive HIV prevention strategies.
          </p>
          <p className='text-gray-700 mb-4'>
            If you think you might be at risk of HIV, talk to your healthcare
            provider about whether PrEP is right for you.
          </p>
          <a
            href='https://www.cdc.gov/hiv/basics/prep.html' 
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
}

export default PREP