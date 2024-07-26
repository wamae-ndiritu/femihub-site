import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Cart = ({ isOpen, setIsOpen }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const handleRemove = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id.id !== itemId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const total = cartItems.reduce((sum, item) => sum + item.id.price * 1, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 overflow-hidden z-50">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)}></div>
                <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                    <div className="w-screen max-w-md">
                        <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                                    <div className="ml-3 h-7 flex items-center">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <FaTimes className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                {cartItems.length === 0 ? (
                                    <div className="mt-8">
                                        <p className="text-center text-gray-500">Your cart is empty.</p>
                                    </div>
                                ) : (
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li key={item.id.id} className="py-6 flex">
                                                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                            <img
                                                                src={item.id.image}
                                                                alt={item.id.title}
                                                                className="w-full h-full object-center object-cover"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex-1 flex flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>{item.id.title}</h3>
                                                                    <p className="ml-4">${item.id.price}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty 1</p>
                                                                <div className="flex">
                                                                    <button 
                                                                        type="button" 
                                                                        className="font-medium text-[#E4258F] hover:text-[#C01F7E]"
                                                                        onClick={() => handleRemove(item.id.id)}
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
                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${total.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#E4258F] hover:bg-[#C01F7E]"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                className="text-[#E4258F] font-medium hover:text-[#C01F7E]"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
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
