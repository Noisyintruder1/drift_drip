import { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage (if it exists)
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add to cart with quantity (memoized for performance)
  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  // Remove from cart (can specify quantity to remove)
  const removeFromCart = useCallback((productId, removeAll = false) => {
    setCart(prevCart => {
      if (removeAll) {
        return prevCart.filter(item => item.id !== productId);
      }
      
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity - 1;
          if (newQuantity <= 0) {
            return null; // Will be filtered out
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean); // Remove null entries
    });
  }, []);

  // Update item quantity directly
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      return removeFromCart(productId, true);
    }
    
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeFromCart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of all items
  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  ).toFixed(2);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart, 
        cartItemCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};