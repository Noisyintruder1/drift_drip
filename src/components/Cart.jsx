import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiTrash, BiArrowBack, BiCartAlt } from "react-icons/bi";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const img_url = "https://Noisyintruder2.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

  // Generate shoe sizes from 32 to 46
  const shoeSizes = Array.from({ length: 15 }, (_, i) => i + 32);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      // Initialize quantity and size if not present
      const cartWithDefaults = storedCart.map(item => ({
        ...item,
        quantity: item.quantity || 1,
        size: item.size || 38 // Default size if not specified
      }));
      setCartItems(cartWithDefaults);
      setIsLoading(false);
    };
    loadCart();
    
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + (Number(item.product_cost) * (item.quantity || 1)),
      0
    );
    setTotalCost(total);
  }, [cartItems]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateSize = (index, newSize) => {
    const updatedCart = [...cartItems];
    updatedCart[index].size = newSize;
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      localStorage.removeItem("cart");
      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }
    navigate("/cartcheckout", {
      state: {
        cartItems,
        totalCost
      }
    });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-light">
          <BiCartAlt className="me-2" /> Your Shopping Cart
        </h2>
        <button 
          className="btn btn-outline-light"
          onClick={() => navigate("/Getproducts")}
        >
          <BiArrowBack className="me-1" /> Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <div className="empty-cart-icon mb-3">
            <BiCartAlt size={48} className="text-muted" />
          </div>
          <h4 className="text-muted">Your cart is empty</h4>
          <p className="text-muted">Browse our products and add items to your cart</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate("/Getproducts")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {cartItems.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 bg-dark text-light">
                  <div className="card-img-top overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={img_url + item.product_photo}
                      alt={item.product_name}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.product_name}</h5>
                    <p className="text-warning fw-bold mb-3">
                      {Number(item.product_cost * (item.quantity || 1)).toFixed(2)} Ksh
                    </p>
                    
                    {/* Size Selector */}
                    <div className="mb-3">
                      <label htmlFor={`size-${index}`} className="form-label">Size:</label>
                      <select 
                        id={`size-${index}`}
                        className="form-select bg-secondary text-light border-dark"
                        value={item.size || 38}
                        onChange={(e) => updateSize(index, parseInt(e.target.value))}
                      >
                        {shoeSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="d-flex justify-content-center mb-3">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity || 1}</span>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      className="btn btn-outline-danger mt-auto"
                      onClick={() => removeItem(index)}
                    >
                      <BiTrash className="me-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row justify-content-end">
            <div className="col-lg-5">
              <div className="bg-dark p-4 rounded-3 border border-secondary">
                <h5 className="text-light mb-4">Order Summary</h5>
                
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-light">Subtotal ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} items)</span>
                  <span className="text-light">{totalCost.toFixed(2)} Ksh</span>
                </div>
                
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-light">Total</span>
                  <span className="text-warning fw-bold">{totalCost.toFixed(2)} Ksh</span>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-danger py-2" 
                    onClick={clearCart}
                  >
                    <BiTrash className="me-2" /> Clear Cart
                  </button>
                  <button 
                    className="btn btn-success py-3" 
                    onClick={proceedToCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;