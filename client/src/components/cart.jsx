import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { BASEHOST } from "../use";
import { toast } from "react-toastify";
import { createOrder } from "../lib/apiCalls";

const Cart = ({ isOpen, setIsOpen }) => {
  const { cartItems, removeItemFromCart, addItemToCart, user, clearCart } =
    useGlobalContext();
  const [totals, setTotals] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      setTotals(total);
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      if (!user) {
        alert("Please log in to proceed with checkout.");
        setLoading(false);
        return;
      }
      await createOrder(user?.user?.id, cartItems);
      toast.success("Your order has been created successfully");
      setTimeout(() => {
        clearCart();
        setIsOpen(false);
      }, 5000);
    } catch (error) {
      const message = error?.response
        ? error?.response?.data?.error
        : error?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 overflow-hidden z-50'>
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          onClick={() => setIsOpen(false)}
        ></div>
        <section className='absolute inset-y-0 right-0 max-w-full flex'>
          <div className='w-screen sm:max-w-sm md:max-w-md'>
            <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
              <div className='flex-1 py-6 overflow-y-auto px-4 sm:px-6'>
                <div className='flex items-start justify-between'>
                  <h2 className='text-lg font-medium text-gray-900'>
                    Shopping cart
                  </h2>
                  <div className='ml-3 h-7 flex items-center'>
                    <button
                      onClick={() => setIsOpen(false)}
                      className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    >
                      <span className='sr-only'>Close panel</span>
                      <FaTimes className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className='mt-8'>
                    <p className='text-center text-gray-500'>
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  <div className='mt-8'>
                    <div className='flow-root'>
                      <ul className='-my-6 divide-y divide-gray-200'>
                        {cartItems.map((item) => (
                          <li key={item.id} className='py-6 flex'>
                            <div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
                              <img
                                src={item.image}
                                alt={item.name}
                                className='w-full h-full object-center object-cover'
                              />
                            </div>
                            <div className='ml-4 flex-1 flex flex-col'>
                              <h3>{item.name}</h3>
                              <div className='flex justify-between items-center my-2 text-base font-medium text-gray-900'>
                                <div className='flex gap-4 items-center'>
                                  <button
                                    className='border border-gray-300 p-0.5 rounded'
                                    onClick={() => removeItemFromCart(item.id)}
                                  >
                                    <RemoveIcon />
                                  </button>
                                  <h6>{item.qty}</h6>
                                  <button
                                    className='border border-gray-300 p-0.5 rounded'
                                    onClick={() => addItemToCart(item)}
                                  >
                                    <AddIcon />
                                  </button>
                                </div>
                                <p className='text-custom-pink'>
                                  Ush {item.price}
                                </p>
                              </div>
                              <div className='flex-1 flex items-end justify-between text-sm'>
                                <div className='flex'>
                                  <button
                                    type='button'
                                    className='font-medium text-[#E4258F] hover:text-[#C01F7E]'
                                    onClick={() =>
                                      removeItemFromCart(item.id, "all")
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                  <div className='flex justify-between text-base font-medium text-gray-900'>
                    <p>Subtotal</p>
                    <p>Ush {totals.toFixed(2)}</p>
                  </div>
                  <p className='mt-0.5 text-sm text-gray-500'>
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className='mt-6'>
                    <button
                      onClick={handleCheckout}
                      className='w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#E4258F] hover:bg-[#C01F7E]'
                      disabled={loading}
                    >
                      {isOpen && loading ? "Processing request..." : "Checkout"}
                    </button>
                  </div>
                  <div className='mt-6 flex justify-center text-sm text-center text-gray-500'>
                    <p>
                      or{" "}
                      <button
                        type='button'
                        className='text-[#E4258F] font-medium hover:text-[#C01F7E]'
                        onClick={() => setIsOpen(false)}
                      >
                        Continue Shopping<span aria-hidden='true'> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
