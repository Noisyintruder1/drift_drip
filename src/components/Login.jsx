import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",    // Keep this as email since your backend expects it
    password: ""
  });
  
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: null
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({
      loading: true,
      error: null,
      success: null
    });

    try {
      console.log("[DEBUG] Attempting login with:", formData);
      
      const response = await axios.post(
        "https://noisyintruder2.pythonanywhere.com/api/signin",
        {
          email: formData.email,    // Make sure to use email here
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 5000
        }
      );

      console.log("[DEBUG] Full response:", response);

      if (response.data?.user) {
        setStatus({
          loading: false,
          error: null,
          success: "Login successful! Redirecting..."
        });
        
        localStorage.setItem("user", JSON.stringify(response.data.user));
        login(response.data.user);
        setTimeout(() => navigate('/'), 1500);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("[DEBUG] Full error:", error);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (error.response) {
        // Try to extract server error message
        if (error.response.data && typeof error.response.data === 'object') {
          errorMessage = error.response.data.message || 
                        error.response.data.error ||
                        JSON.stringify(error.response.data);
        } else {
          errorMessage = error.response.data || "Invalid request";
        }
      }

      setStatus({
        loading: false,
        error: errorMessage,
        success: null
      });
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <div className='col-md-5 card shadow p-4 bg-secondary'>
        <form onSubmit={submit}>
          <h2 className='text-center mb-4'><i>Log In 🚀</i></h2>
          
          {status.loading && (
            <div className="alert alert-info">
              <span className="spinner-border spinner-border-sm me-2"></span>
              Logging in...
            </div>
          )}
          
          {status.success && (
            <div className="alert alert-success">
              <i className="bi bi-check-circle-fill me-2"></i>
              {status.success}
            </div>
          )}
          
          {status.error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {status.error}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email"    // Changed to email type
              id="email"      // Changed to email
              name="email"    // Changed to email
              className='form-control'
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              className='form-control'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type='submit'
            className='btn btn-outline-danger my-4 w-100'
            disabled={status.loading}
          >
            {status.loading ? 'Logging in...' : 'Log In 🚀'}
          </button>
          
          <p className='text-center mt-3'>
            Don't have an account? <Link to="/Signup" className="link-primary">Sign up</Link>
          </p>
          <p className='text-center'>
            <Link to="/forgot-password" className="link-secondary">Forgot password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
