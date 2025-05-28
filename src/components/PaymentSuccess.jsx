import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaymentSuccess = () => {
  const { state } = useLocation();
  const { paymentDetails, cartItems = [], totalAmount = 0 } = state || {};
  const navigate = useNavigate();
  const img_url = 'https://Noisyintruder2.pythonanywhere.com/static/images/';

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <motion.div 
            className="card shadow-lg border-success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body text-center p-5">
              <div className="text-success mb-4">
                <i className="bi bi-check-circle-fill" style={{ fontSize: '5rem' }}></i>
              </div>
              <h2 className="card-title mb-3">Payment Successful!</h2>
              <p className="text-muted mb-4">
                Thank you for your purchase. Your payment has been processed successfully.
              </p>

              {paymentDetails && (
                <div className="mb-4 p-3 bg-light rounded text-start">
                  <h5>Payment Details</h5>
                  <div className="d-flex justify-content-between">
                    <span>Transaction ID:</span>
                    <span className="fw-bold">{paymentDetails.transactionId || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Amount Paid:</span>
                    <span className="fw-bold">KSh {totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Phone Number:</span>
                    <span className="fw-bold">{paymentDetails.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Date:</span>
                    <span className="fw-bold">{new Date().toLocaleString()}</span>
                  </div>
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="mb-4 p-3 bg-light rounded">
                  <h5>Order Summary</h5>
                  {cartItems.map((item, index) => (
                    <div key={index} className="mb-3 pb-2 border-bottom">
                      <div className="d-flex align-items-center">
                        {/* Product Image - matches MakePayments.jsx style */}
                        <div className="me-3" style={{ width: '80px', height: '80px' }}>
                          <img 
                            src={item.product_photo ? img_url + item.product_photo : 'https://via.placeholder.com/80'} 
                            alt={item.product_name}
                            className="img-fluid rounded"
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'contain' 
                            }}
                          />
                        </div>
                        {/* Product Details */}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <span className="fw-bold">{item.product_name}</span>
                            <span>KSh {item.product_cost * item.quantity}</span>
                          </div>
                          <div className="d-flex justify-content-between text-muted">
                            <span>Quantity: {item.quantity}</span>
                            <span>KSh {item.product_cost} each</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mt-3 pt-2 border-top fw-bold">
                    <span>Total:</span>
                    <span>KSh {totalAmount}</span>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/')}
                >
                  <i className="bi bi-house-door me-2"></i>Back to Home
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => window.print()}
                >
                  <i className="bi bi-printer me-2"></i>Print Receipt
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;