import React, { useState } from "react";

const ChatbotModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const sampleQuestions = [
    "What are the early signs of pregnancy?",
    "How can I maintain a healthy diet during pregnancy?",
    "What should I do if I experience morning sickness?",
    "How often should I visit the doctor during pregnancy?",
    "What are some tips for newborn care?",
  ];

  return (
    <div>
      <button
        onClick={toggleModal}
        className='fixed bottom-4 right-4 bg-custom-pink border border-gray-300 h-16 w-16 flex justify-center items-center text-white p-3 rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 5a9 9 0 1 0-6.73-3.29L3 21l1.27-3.77A9 9 0 1 0 21 21z'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='fixed bottom-16 right-4 border border-custom-pink bg-white rounded-lg shadow-lg p-6 max-w-xs w-full z-50'>
          <div className='flex justify-between items-center mb-4 bg-gray-200 px-4 py-2 rounded'>
            <h3 className='text-xl font-bold'>Chat with FemiHub</h3>
            <button
              onClick={toggleModal}
              className='text-gray-600 hover:text-gray-900 focus:outline-none'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='mb-4'>
            <p className='text-gray-700'>
              Here are some sample questions you can ask:
            </p>
            <ul className='list-disc list-inside mt-2 text-gray-700'>
              {sampleQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
          <div>
            <input
              type='text'
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
              placeholder='Type your question...'
            />
            <button className='mt-2 w-full bg-custom-pink text-white p-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotModal;
