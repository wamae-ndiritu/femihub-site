import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage if available
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, qty: 1 }];
      }
    });
  };

  const removeItemFromCart = (itemId, type="") => {
    if (type === "all"){
      setCartItems((prevItems) => {
          return prevItems.filter((item) => item.id !== itemId);
      });
    }else{
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === itemId);
        if (existingItem.qty === 1) {
          return prevItems.filter((item) => item.id !== itemId);
        } else {
          return prevItems.map((item) =>
            item.id === itemId ? { ...item, qty: item.qty - 1 } : item
          );
        }
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
