import React, { useState, createContext } from "react";

// Create context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // ✅ Add product to cart
  const addToCart = (product) => {
    setCartItem((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // ✅ Increase quantity for existing item
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // ✅ Add new product to cart
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Update quantity (+ or -)
  const updateQuantity = (id, qty) => {
    setCartItem((prev) => {
      return prev
        .map((item) => (item.id === id ? { ...item, quantity: qty } : item))
        .filter((item) => item.quantity > 0); // Remove item if qty becomes 0
    });
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
