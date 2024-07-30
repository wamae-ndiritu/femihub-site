import React from "react";
import maternalWellness from "../assets/maternal-1.png";
import whyUs from "../assets/whyUs.jpeg";
import postnatalCare from "../assets/postnatalCare.jpeg";
import antenatalCare from "../assets/antenatalCare.jpeg";

const MaternalWellness = () => {
  return (
    <section className='bg-white pb-16 px-4 md:px-16'>
      <div className='md:max-w-7xl mx-auto flex flex-col items-center'>
        <h2 className='text-2xl md:text-4xl font-bold text-custom-pink my-8 text-center'>
          Maternal Wellness
        </h2>
        <div className='w-full flex justify-center mb-8'>
          <img
            src={maternalWellness}
            alt='Maternal Wellness Information'
            className='w-full md:w-4/5 md:h-[400px]'
          />
        </div>
        <div className='w-full md:w-4/5'>
          <h2 className='text-gray-900 font-semibold mb-4 text-3xl'>
            Our Mother and Child Health services include:
          </h2>
          <ul className='list-disc px-6 md:px-8'>
            <li>
              <h3 className='text-2xl font-semibold mb-2'>Antenatal Care</h3>
              <p className='text-gray-700 mb-4'>
                Through antenatal care (ANC) we will help both you and your
                unborn baby stay healthy. Even if your pregnancy is going well
                and you’re feeling well, it’s important for you to attend your
                ANC appointments so that any potential risks can be identified
                and prevented, or reduced. During ANC you will have an
                opportunity to ask any questions you have about your pregnancy
                such as what's happening during each trimester, physical
                pregnancy symptoms and the birth itself and also about caring
                for your baby after the birth.
              </p>
              <img
                src={antenatalCare}
                alt='Antenatal Care'
                className='w-full md:h-[400px] object-cover my-2'
                style={{ objectPosition: "top" }}
              />
            </li>
            <li>
              <h3 className='text-2xl font-semibold mb-2'>Postnatal Care</h3>
              <p className='text-gray-700 mb-4'>
                We give postnatal care (PNC) to the mother and her newborn baby
                after first six weeks of life. This is important because
                effective PNC helps in recognizing any deviation from expected
                recovery after birth the health of the baby allowing prompt
                intervention if needed.
              </p>
              <img
                src={postnatalCare}
                alt='Postnatal Care'
                className='w-full md:h-[400px] object-cover my-2'
                style={{ objectPosition: "top" }}
              />
            </li>
            <li>
              <h3 className='text-2xl font-semibold mb-2'>Well-baby Clinic</h3>
              <p className='text-gray-700 mb-4'>
                FemiHub Well-Baby Services are designed to monitor your baby's
                growth through a series of regular wellness check-ups for
                newborn babies and infants. Services are provided by a team of
                experienced nurses and doctors the services we offer in this
                clinic include:
                <ul className='list-disc p-8'>
                  <li>
                    Monitoring of your baby's growth and developmental progress
                    at regular intervals
                  </li>
                  <li>Vaccinations</li>
                  <li>Examinations for common diseases</li>
                  <li>Advice on nutrition</li>
                  <li>
                    Information on preventing childhood illness and your baby's
                    growth
                  </li>
                </ul>
              </p>
            </li>
            <li>
              <h3 className='text-2xl font-semibold mb-2'>
                Family Planning and Child Spacing
              </h3>
              <p className='text-gray-700 mb-4'>
                We provide family planning and contraceptive services to enable
                couples to decide when and if to have children, using the
                information, means and methods they need to do so.
              </p>
            </li>
          </ul>
          <h3 className='text-3xl font-semibold mt-12 mb-8'>
            Why Choose FemiHub for Maternal Wellness
          </h3>
          <img
            src={whyUs}
            alt='PEP Pills'
            className='w-full md:h-[250px] object-cover my-2'
            style={{ objectPosition: "center" }}
          />
          <ul className='px-6 md:px-8 list-disc'>
            <li>
              <p className='text-gray-700 mb-4'>
                <strong>Expert and Compassionate Care:</strong> FemiHub boasts a
                team of skilled healthcare professionals specializing in
                maternal and child health, including nurses and doctors. They
                have extensive knowledge and experience in caring for expectant
                mothers, newborns, and young children.
              </p>
            </li>
            <li>
              <p className='text-gray-700 mb-4'>
                <strong>Continuity of Care:</strong> Our commitment to providing
                comprehensive care begins when you discover you're pregnant and
                continues throughout the early years of your child's life. We
                offer antenatal care to monitor and support you during
                pregnancy, postnatal care to ensure a healthy recovery for both
                mother and baby, and well-baby clinic services to track your
                child's growth and development.
              </p>
            </li>
            <li>
              <p className='text-gray-700 mb-4'>
                <strong> Emphasis on Preventive Care:</strong> We believe in the
                power of prevention. We aim to prevent illness and promote
                healthy development for mothers and children through regular
                check-ups, vaccinations, and screenings. Our well-baby clinic
                monitors growth and milestones and provides valuable information
                on preventing childhood illnesses.
              </p>
            </li>
            <li>
              <p className='text-gray-700 mb-4'>
                <strong>Personalized Support:</strong>Every mother and child is
                unique, and we recognize the importance of personalized care.
                Whether you need advice on nutrition, assistance with
                breastfeeding, or information on family planning, our healthcare
                professionals are dedicated to helping you make informed
                decisions that are best for you and your family.
              </p>
            </li>
          </ul>
          <p className='text-gray-700 mb-4 text-center'></p>
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
    </section>
  );
};

export default MaternalWellness;
