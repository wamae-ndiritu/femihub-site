import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { BASEHOST } from "../use";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const schema = Joi.object({
    name: Joi.string().required().min(3).max(30).trim(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone_number: Joi.string().optional().allow("", null),
    password: Joi.string().required().min(8),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      toast.error("Validation Errors: " + JSON.stringify(errors));
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
    };

    setLoading(true);

    axios
      .post(`${BASEHOST}/register`, data)
      .then((response) => {
        if (response.status !== 201) {
          toast.error("Signup failed");
          return;
        }
        Cookies.set("authToken", response.data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      
      .catch((error) => {
        console.log(error);
        toast.error("Signup failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-500 mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700 font-bold mb-2">
              Phone number (optional)
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
