// In your CartContext.jsx (or wherever you define the context)
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItemCount(cart.length);
  };

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Initial load
  useEffect(() => {
    updateCartCount();
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart (same product_id and size if it's a shoe)
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.product_id === item.product_id && 
      (item.category !== 'shoes' || cartItem.size === item.size)
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item if it doesn't exist
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);