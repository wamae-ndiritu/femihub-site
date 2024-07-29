import React from "react";

const PostnatalInfo = () => {
  return (
    <section className='bg-faded-pink py-16 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center'>
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <img
            src='/images/postnatal.png'
            alt='Postnatal Care Information'
            className='w-full rounded-lg shadow-md'
          />
        </div>
        <div className='md:w-1/2 md:pl-8'>
          <h2 className='text-4xl font-bold mb-4'>Postnatal Care</h2>
          <p className='text-gray-700 mb-4'>
            Postnatal care is essential for protecting the health of women and
            their young children.
          </p>
          <p className='text-gray-700 mb-4'>
            Postnatal refers to the period following the birth of a child,
            commonly known as the postpartum period. This critical time frame
            typically encompasses the first six weeks after delivery, although
            it can extend up to six months as the mother recovers physically and
            emotionally from childbirth.
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

export default PostnatalInfo;
