import React from "react";
import mylan from "../assets/mylan.jpeg";
import sureCheck from "../assets/sure-check.jpeg";
import { Link } from "react-router-dom";
import prepAssessment from "../assets/prepAssessment.jpeg";
import hivSelfKit from "../assets/hivSelfKit.jpeg";

const PREP = () => {
  return (
    <section className='bg-white min-h-screen flex items-center justify-center pb-16 px-4 md:px-8'>
      <div className='mx-auto flex flex-col items-center'>
        <h2 className='text-2xl md:text-4xl font-bold text-custom-pink my-8 text-center'>
          Pre-Exposure Prophylaxis (PrEP)
        </h2>
        <div className='w-full md:w-4/5 md:px-8 mb-3'>
          <img
            src='/images/prep.png'
            alt='PrEP Information'
            className='w-full md:h-[300px]'
            style={{objectPosition: "top"}}
          />
        </div>
        <div className='md:w-4/5 md:px-8 text-gray-600 bg-white'>
          <h2 className='text-2xl font-bold my-4'>Facts about PrEP</h2>
          <ul className='list-disc px-8 md:px-6'>
            <li className='py-2'>
              <h5 className='font-semibold mb-2'>Effective</h5>
              <p className='text-gray-700'>
                If used consistently, PrEP can reduce the risk of HIV infection
                by 99%. Consistent use means taking a tablet once-a-day, ideally
                at the same time each day.
              </p>
            </li>
            <li className='py-2'>
              <h5 className='font-semibold mb-2'>Daily</h5>
              <p className='text-gray-700'>
                PrEP is a daily pill. PrEP must be taken every day to ensure
                that you are fully protected.
              </p>
            </li>
            <li className='py-2'>
              <h5 className='font-semibold mb-2'>For Everyone</h5>
              <p className='text-gray-700'>
                PrEP is for anyone who thinks they are at risk of contracting
                HIV regardless of gender, age, religion, race, sexuality, etc.
              </p>
            </li>
            <li className='py-2'>
              <h5 className='font-semibold mb-2'>Other STIs</h5>
              <p className='text-gray-700'>
                PrEP is revolutionary in its protection against HIV; however,
                PrEP does not protect against any other STIs or pregnancy.
                Therefore, it should be used in combination with other barrier
                methods such as condoms.
              </p>
            </li>
          </ul>
          <div className='w-full text-gray-600'>
            <h2 className='text-2xl font-bold my-4'>
              What is PrEP Assessment Like
            </h2>
            <img
              src={prepAssessment}
              alt='Prep Assessment'
              className='w-full md:h-[400px] object-cover my-2'
              style={{ objectPosition: "top" }}
            />
            <p>
              To onboard onto PrEP all patients must complete a PrEP assessment
              to make usre that you are an appropriate patient for Prep. As part
              of this assessment you will be asked questions which assess your
              risk contracting HIV and questions about your medical history to
              make sure PrEP is a safe drug for you to take.
            </p>
            <h2 className='text-2xl font-bold my-4'>HIV Self-testing</h2>
            <img
              src={hivSelfKit}
              alt='HIV Testing'
              className='w-full md:h-[200px] object-contain my-2'
              style={{ objectPosition: "center" }}
            />
            <p>
              There are lots of HIV Self-Tests (HIVST) in the market. MyFemiHub
              offers twi tests for clients onto PrEP - Mylan and SureCheck. Only
              Mylan and Sur Check can be used to onboard through MyFemiHub
              because of the uniqueness of the online onboarding journey.
            </p>

            <h2 className='text-2xl font-bold my-4'>HIV Self-test Kits</h2>
            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-3'>
              <div>
                <div className='w-full relative'>
                  <img src={mylan} alt='Mylan' className='h-32 mx-auto' />
                  <h6 className='font-semibold absolute top-0 left-0 right-0'>
                    MYLAN
                  </h6>
                </div>
                <p>
                  The Mylan HIV self-test is a single use, rapid diagnostic test
                  for the detection of antibodies to HIV in blood. The test is
                  intended to be used by untrained lay users in a private
                  setting as a self-test to aid in the diagnosis of HIV. It
                  gives results within 15 minutes. You can click on this{" "}
                  <Link
                    to={`/products/18`}
                    className='text-custom-pink underline'
                  >
                    link
                  </Link>{" "}
                  to order your Mylan HIV self-test kit.
                </p>
              </div>
              <div>
                <div className='w-full relative mt-4'>
                  <img
                    src={sureCheck}
                    alt='SureCheck'
                    className='h-32 mx-auto'
                  />
                  <h6 className='font-semibold absolute top-0 left-0 right-0'>
                    SureCheck
                  </h6>
                </div>
                <p>
                  The SureCheck HIV self-test is a single use, rapid diagnostic
                  test for the detection of antibodies to HIV in blood. The test
                  is intended to be used by untrained lay users in a private
                  setting as a self-test to aid in the diagnosis of HIV. It
                  gives results within 15 minutes. You can click on this{" "}
                  <Link
                    to={`/products/19`}
                    className='text-custom-pink underline'
                  >
                    link
                  </Link>{" "}
                  to order your SureCheck HIV self-test kit.
                </p>
              </div>
            </div>
            <div className='w-full flex justify-center'>
              <a
                href='https://wa.me/256743799700'
                className='my-4 inline-block bg-custom-pink text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 mx-auto'
                target='_blank'
                rel='noopener noreferrer'
              >
                Book an Online Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PREP;
