import React from "react";
import pepPills from "../assets/pep-pills.jpeg";

const PEPInfo = () => {
  return (
    <section className='bg-white min-h-screen flex items-center justify-center py-16 px-4 md:px-8'>
      <div className='mx-auto flex flex-col items-center'>
        <div className='md:w-4/5 px-8 mb-8'>
          <img
            src='/images/pep.png'
            alt='PrEP Information'
            className='w-full h-96 rounded-lg shadow-md'
          />
        </div>
        <div className='md:w-4/5 text-gray-600 bg-white'>
          <p className='px-8'>
            Post-exposure prophylaxis (PEP) is used by HIV negative people after
            a possible exposure to HIV and should be started within 72 hours of
            exposure. PEP is for emergency situations. If taken 72 hours after
            possible exposure, PEP is highly effective in preventing HIV. PEP is
            safe but may cause side effects like nausea in some people.
          </p>
          <p className='px-8 py-2'>
            If you find yourself taking PEP regularly or believe yourself to be
            regularly exposed to HIV then you should start taking PrEP instead.
            PrEP is taken before exposure by HIV negative people who are at risk
            of acquiring HIV. PrEP reduces your chances of being infected with
            HIV.
          </p>
          <h2 className='text-2xl font-bold mt-4 px-8'>Facts about PEP</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-6 rounded-lg'>
              <p className='text-gray-700'>
                PEP are ARV's that may be used to prevent HIV infection in a
                person exposed to HIV within 72 hours. You must take PEP within
                72 hours of exposure for it to work optimally.
              </p>
            </div>
            <div className='p-6 rounded-lg'>
              <p className='text-gray-700'>
                PEP will most likely not prevent HIV infection if it is started
                more than 72 hours after exposure.
              </p>
            </div>
            <div className='p-6 rounded-lg'>
              <p className='text-gray-700'>
                You must take one pill daily for 28 days without skipping a
                dose.
              </p>
            </div>
            <div className='p-6 rounded-lg'>
              <p className='text-gray-700'>
                A HIV test is done prior to initiating PEP, 28 days after taking
                the first PEP dose and 3 months after the initial HIV exposure.
                PEP will not protect you from unplanned pregnancy of other STIs.
              </p>
            </div>
          </div>
          <div className='md:w-4/5 text-gray-600 px-8'>
            <h2 className='text-2xl font-bold my-4'>
              Quick guide to starting PEP
            </h2>
            <p>
              For PEP to work, it must be taken within 72 hours of exposure. The
              sooner you start it the better, every minute counts. You must test
              HIV negative to start PEP. You need to take PEP daily dose for 28
              days. It is given in a pill format. Missing doses of PEP can make
              the treatment less effective. It may be helpful to set a daily
              reminder to remember the time for your dose.
              <img src={pepPills} alt='PEP Pills' className='h-32 mt-3 mx-auto' />
            </p>
            <h2 className='text-2xl font-bold my-4'>
              What is a PEP Assessment Like
            </h2>
            <p>
              Exposure to HIV Is an emergency because HIV establishes infection
              very quickly. A health care worker will evaluate you rapidly for
              PEP initiation when care is sought within 72 hours after potential
              exposure. A HIV test will be done and once confirmed negative PEP
              will be prescribed.
            </p>
            <h2 className='text-2xl font-bold my-4'>HIV Self-testing</h2>
            <p>
              If you have been exposed to HIV infection for instance through a
              burst or broken condom, unprotected sex from a person with a
              positive or unknown HIV status, you will need to test negative for
              HIV to be eligible for PEP. It is important to check that you did
              not have infection before this risk. There are lots of HIV
              Self-Tests (HIVSTs) in the market. MyFemiHub offers two tests for
              clients onboard onto PrEP - Mylan and Sure Check. Only Mylan can
              be used onboard through MyFemiHub because of the uniqueness of the
              online onboarding journey.
            </p>
            <h2 className='text-2xl font-bold my-4'>PrEP after PEP</h2>
            <p>
              If you are continously engaging in behaviour that exposes you to
              contracting HIV or you frequently need PEP, you should consider
              PrEP to protect yourself. After you have finished your 28 day
              course of PEP, and test again for HIV, if you are negative you
              should book a consultation to talk with one of MyFemiHub's
              Clinical Officers about PrEP to protect yourself long-term from
              HIV infection. Taking PrEP will enable you to continue to live
              your life as you are while keeping yourself and your relationships
              HIV free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PEPInfo;
