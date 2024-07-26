import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASEHOST } from '../use';
const DoctorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      specialization: '',
      licenseNumber: '',
      yearsOfExperience: '',
      hospitalAffiliation: '',
      cv: null,
      licenseImage: null,
      agreement: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phoneNumber: Yup.string().required('Required'),
      specialization: Yup.string().required('Required'),
      licenseNumber: Yup.string().required('Required'),
      yearsOfExperience: Yup.number().positive().integer().required('Required'),
      hospitalAffiliation: Yup.string().required('Required'),
      cv: Yup.mixed().required('Required'),
      licenseImage: Yup.mixed().required('Required'),
      agreement: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: async (values) => {
        console.log('Clicked');
      setIsSubmitting(true);
      setError(null);
      const data = {
        name: values.fullName,
        specialty: values.specialization,
        email: values.email,
        phone_number: values.phoneNumber
      };
      

      try {
        const response = await axios.post(`${BASEHOST}/doctors`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        setSubmitSuccess(true);
      } catch (error) {
        console.log('Error submitting the form:', error);
        setError('There was an error submitting your details. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl px-2 md:px-[100px] mt-5">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Verification Submitted</h2>
        <p className="text-gray-700">
          Thank you for submitting your verification details. Our team will review your information and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-[#E4258F] mb-6">Doctor Verification Form</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input
            id="fullName"
            type="text"
            {...formik.getFieldProps('fullName')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="text-red-500 mt-1">{formik.errors.fullName}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            {...formik.getFieldProps('phoneNumber')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500 mt-1">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="specialization" className="block text-gray-700 font-bold mb-2">Specialization</label>
          <input
            id="specialization"
            type="text"
            {...formik.getFieldProps('specialization')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.specialization && formik.errors.specialization ? (
            <div className="text-red-500 mt-1">{formik.errors.specialization}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="licenseNumber" className="block text-gray-700 font-bold mb-2">License Number</label>
          <input
            id="licenseNumber"
            type="text"
            {...formik.getFieldProps('licenseNumber')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.licenseNumber && formik.errors.licenseNumber ? (
            <div className="text-red-500 mt-1">{formik.errors.licenseNumber}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="yearsOfExperience" className="block text-gray-700 font-bold mb-2">Years of Experience</label>
          <input
            id="yearsOfExperience"
            type="number"
            {...formik.getFieldProps('yearsOfExperience')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience ? (
            <div className="text-red-500 mt-1">{formik.errors.yearsOfExperience}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="hospitalAffiliation" className="block text-gray-700 font-bold mb-2">Hospital Affiliation</label>
          <input
            id="hospitalAffiliation"
            type="text"
            {...formik.getFieldProps('hospitalAffiliation')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.hospitalAffiliation && formik.errors.hospitalAffiliation ? (
            <div className="text-red-500 mt-1">{formik.errors.hospitalAffiliation}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="cv" className="block text-gray-700 font-bold mb-2">Upload CV</label>
          <input
            id="cv"
            name="cv"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("cv", event.currentTarget.files[0]);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.cv && formik.errors.cv ? (
            <div className="text-red-500 mt-1">{formik.errors.cv}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="licenseImage" className="block text-gray-700 font-bold mb-2">Upload License Image</label>
          <input
            id="licenseImage"
            name="licenseImage"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("licenseImage", event.currentTarget.files[0]);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#E4258F]"
          />
          {formik.touched.licenseImage && formik.errors.licenseImage ? (
            <div className="text-red-500 mt-1">{formik.errors.licenseImage}</div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...formik.getFieldProps('agreement')}
              className="mr-2"
            />
            <span className="text-gray-700">I agree to the terms and conditions</span>
          </label>
          {formik.touched.agreement && formik.errors.agreement ? (
            <div className="text-red-500 mt-1">{formik.errors.agreement}</div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E4258F] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#C71B7B] transition duration-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
