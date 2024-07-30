import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASEHOST } from "../use";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
const Login = () => {
  const { user, setUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${BASEHOST}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(data);
      toast.success("Login successful!");
      setTimeout(() => {
        2;
      });

      navigate("/");
    } catch (error) {
      const message = error?.response
        ? error?.response?.data?.error
        : error?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-pink-200'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-pink-500 mb-4'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-pink-500'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-pink-500'
            />
          </div>
          <button
            type='submit'
            className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
