import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we process your registration...");
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("username",username);
      data.append("email",email);
      data.append("password",password);
      data.append("phone", phone);
      
      const response = await axios.post("https://Noisyintruder2.pythonanywhere.com/api/signup", data);

      setLoading("");
      setSuccess(response.data.success);
      
      // Automatically log in the user after successful signup
      const loginData = new FormData();
      loginData.append("username", username);
      loginData.append("password", password);
            
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      navigate('/login');

    } catch (error) {
      setSuccess("");
      setLoading("");
      setError(error.response?.data?.error || "Sorry, something went wrong during registration");
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-5 card shadow p-4 bg-secondary">
        <form onSubmit={submit} className='form'>
          <h2 className='text-center mb-4'>Sign Up 🖋</h2>
          
          {loading && <div className="alert alert-info">{loading}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <input 
            type="text"
            placeholder='Enter Username' 
            className='form-control' 
            value={username}    
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        
          <input 
            type="email"
            placeholder='Enter Your Email' 
            className='form-control mt-3'   
            value={email}  
            onChange={(e) => setEmail(e.target.value)}
            required
          />
      
          <input 
            type="password"
            placeholder='Enter Password'
            className='form-control mt-3' 
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
            required  
          />
          
          <input 
            type="tel"
            placeholder='Enter Phone Number' 
            className='form-control mt-3'  
            value={phone}  
            onChange={(e) => setPhone(e.target.value)}  
            required
          />
          
          <button
            type='submit'
            className='btn btn-success my-3 w-100'
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sign Up 🖋'}
          </button>
          
          <p className='text-center mt-3'>
            Already have an account? <Link to="/Login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;