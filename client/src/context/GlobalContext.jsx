import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const useGlobalContext = () => useContext(Context);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage if available
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [user, setUser] = useState(() => {
    const currentUser = localStorage.getItem("userInfo");
    return currentUser ? JSON.parse(currentUser) : null;
  });
  const [products, setProducts] = useState([]);

  // Save cart and userInfo items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }, [user]);

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

  const removeItemFromCart = (itemId, type = "") => {
    if (type === "all") {
      setCartItems((prevItems) => {
        return prevItems.filter((item) => item.id !== itemId);
      });
    } else {
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

  const logout = () => {
    setUser(null);
  }

  return (
    <Context.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        user,
        setUser,
        logout,
        products,
        setProducts
      }}
    >
      {children}
    </Context.Provider>
  );
};
