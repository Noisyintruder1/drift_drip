import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.js";

const CartCheckout = () => {
  const location = useLocation();
  const { cartItems, totalCost } = location.state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const img_url = 'https://Noisyintruder2.pythonanywhere.com/static/images/';

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/cart');
    } else {
      setLoading(false);
    }
  }, [cartItems, navigate]);

  if (loading) return <div className="text-center mt-5 text-light">Loading...</div>;

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait as we process your payment");
    
    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", totalCost);
      
      const response = await axios.post(
        'https://Noisyintruder2.pythonanywhere.com/api/mpesa_payment', 
        data
      );
      
      setMessage(response.data.message);
      
      // Navigate to PaymentSuccess after successful payment initiation
      navigate('/PaymentSuccess', {
        state: {
          paymentDetails: {
            transactionId: response.data.transaction_id || 'N/A',
            phoneNumber: phone
          },
          cartItems: cartItems,
          totalAmount: totalCost
        }
      });
      
      // Clear cart on successful payment
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      
    } catch (error) {
      setMessage("Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
  }

  return (
    <div className="bg-dark min-vh-100 py-5">
      <div className='row justify-content-center'>
        <div className="col-md-8 card shadow p-4 bg-secondary text-light">
          <form onSubmit={submit}>
            <h3 className='pay text-light'> 
              <img src="/asets/image/Mpesa.png" alt="Mpesa" className='money'/> 
              Cart Checkout 💰
            </h3>
            {message && <div className="alert alert-info">{message}</div>}

            <div className="mb-4">
              <h4 className="text-light mb-3">Your Order</h4>
              {cartItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3 p-3 bg-dark rounded">
                  <img 
                    src={img_url + item.product_photo} 
                    alt={item.product_name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                    className="rounded"
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.product_name}</h5>
                    <div className="d-flex justify-content-between">
                      <p className="text-warning mb-0">KSh {item.product_cost}</p>
                      <p className="text-light mb-0">Qty: {item.quantity}</p>
                    </div>
                    {item.size && <p className="text-light mb-0">Size: {item.size}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between mb-4 p-3 bg-dark rounded">
              <h5 className="text-light mb-0">Total Amount:</h5>
              <h5 className="text-warning mb-0">KSh {totalCost.toFixed(2)}</h5>
            </div>

            <div className="mt-4">
              <h4 className='here text-light mb-3'>Enter M-Pesa Details</h4>
              <input 
                type="tel"  
                placeholder='Enter Phone Number (254...)'
                className='form-control mb-3 bg-dark text-light'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="254[0-9]{9}"
                title="Phone number must start with 254 followed by 9 digits"
              />
              <p className="text-light small">
                Enter your M-Pesa phone number starting with 254 (e.g., 254712345678)
              </p>
            </div>
            
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-success py-3">
                Pay Now 💰
              </button>
              <button 
                type="button" 
                className="btn btn-outline-light py-2"
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CartCheckout;