import React, { useState } from "react";

const FAQS = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the common signs of pregnancy?",
      answer:
        "Common signs of pregnancy include missed periods, nausea, vomiting, frequent urination, and fatigue.",
    },
    {
      question: "How can I ensure a healthy pregnancy?",
      answer:
        "Ensure a healthy pregnancy by eating a balanced diet, taking prenatal vitamins, exercising regularly, and attending all prenatal appointments.",
    },
    {
      question: "What should I do if my child has a fever?",
      answer:
        "If your child has a fever, keep them hydrated, dress them in light clothing, and consult a pediatrician if the fever persists or is very high.",
    },
    {
      question: "What are the best practices for breastfeeding?",
      answer:
        "Best practices for breastfeeding include feeding on demand, ensuring a good latch, staying hydrated, and seeking support if you encounter difficulties.",
    },
  ];

  return (
    <div className='bg-faded-pink py-12'>
      <div className='max-w-2xl mx-auto p-4 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>
          Frequently Asked Questions (FAQS)
        </h2>
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='border-b border-gray-200 pb-4'>
              <button
                className='w-full flex justify-between items-center text-left p-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  ></path>
                </svg>
              </button>
              {openIndex === index && (
                <div className='mt-2 p-2 bg-gray-50 rounded-md'>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQS;
