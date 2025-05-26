import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.js";

const MakePayments = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const img_url = 'https://Noisyintruder2.pythonanywhere.com/static/images/';

  useEffect(() => {
    if (!product) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [product, navigate]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait as we process your payment");
    
    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.product_cost);
      
      const response = await axios.post(
        'https://Noisyintruder2.pythonanywhere.com/api/mpesa_payment', 
        data
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Payment failed. Please try again.");
    }
  }

  return (
    <div className='row justify-content-center mt-5 bg-secondary'>
      <div className="col-md-8 card shadow p-4 bg-dark">
        <form onSubmit={submit}>
          <h3 className='pay'> 
            <img src="/asets/image/Mpesa.png" alt="Mpesa" className='money'/> 
            Lipa na Mpesa 💰
          </h3>
          {message && <div className="alert alert-info">{message}</div>}

          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <img 
                src={img_url + product.product_photo}
                alt="Product" 
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>

            <div className="col-md-6">
              <h3 className='here'>Pay here 👇</h3>
              <input 
                type="tel"  
                placeholder='Enter Phone Number (254...)'
                className='form-control mb-3'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="254[0-9]{9}"
                title="Phone number must start with 254 followed by 9 digits"
              />
            </div>
          </div>
          
          <p className="XOXO">
            Enter Phone Number to pay from starts with 254*********
          </p>
          
          <button type="submit" className="btn btn-outline-success mt-4 w-50">
            Purchase Now 💰 💸
          </button>
        </form>
      </div>
    </div>
  )
}

export default MakePayments;