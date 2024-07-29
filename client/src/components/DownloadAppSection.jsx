import React from "react";

const DownloadAppSection = () => {
  return (
    <section className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-8 px-4 md:px-8 my-12'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between'>
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <h2 className='text-4xl font-bold mb-4'>
            Get the FemiHub Mobile App
          </h2>
          <p className='mb-6'>
            Stay connected and manage your maternal and child health on the go
            with the FemiHub mobile app. Track your appointments, get health
            tips, and more.
          </p>
          <div className='flex space-x-4 justify-center'>
            <a
              href='https://play.google.com/store/apps/details?id=obtek.technologies.bridge_ai'
              className='bg-white text-purple-600 px-2 rounded-md shadow-md hover:bg-gray-100'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/images/play-store.png'
                alt='Download on Google Play'
                className='h-16 object-contain'
              />
            </a>
          </div>
        </div>
        <div className='md:w-1/2 flex justify-center'>
          <img
            src='/images/femihub.png'
            alt='FemiHub Mobile App'
            className='w-full max-w-xs md:max-w-md rounded-lg'
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
