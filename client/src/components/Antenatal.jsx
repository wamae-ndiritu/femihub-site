import React from "react";

const AntenatalInfo = () => {
  return (
    <section className='bg-faded-pink py-16 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center'>
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <img
            src='/images/annetal.png'
            alt='Antenatal Care Information'
            className='w-full rounded-lg shadow-md'
          />
        </div>
        <div className='md:w-1/2 md:pl-8'>
          <h2 className='text-4xl font-bold mb-4'>Antenatal Care</h2>
          <p className='text-gray-700 mb-4'>
            Antenatal care is essential for protecting the health of women and
            their unborn children.
          </p>
          <p className='text-gray-700 mb-4'>
            Through this form of preventive health care, women can learn from
            skilled health personnel about healthy behaviours during pregnancy,
            better understand warning signs during pregnancy and childbirth, and
            receive social, emotional, and psychological support at this
            critical time in their lives.
          </p>
          <a
            href='https://play.google.com/store/apps/details?id=obtek.technologies.bridge_ai'
            className='inline-block bg-custom-pink text-white px-6 py-3 rounded-md shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'
            target='_blank'
            rel='noopener noreferrer'
          >
            Download App To View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AntenatalInfo;
