
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Jobsavailable = () => {

    const [Jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const img_url = 'https://ernester1.pythonanywhere.com/static/images/';
    const navigate = useNavigate();
    
    // Function to get products
  
    const Jobsavailable = async () => {
  
      try {
  
        const response = await axios.get('https://ernester1.pythonanywhere.com/api/get_products');
        setJobs(response.data);
  
      } catch (error) {
        console.error('Error fetching Jobs:', error);
  
      }
  
    };
  
    useEffect(() => {
      Jobsavailable();
  
    }, []);
  
    // Function to handle search
  
    const filteredJobs = Jobs.filter((Job) =>
      Job.Job_name.toLowerCase().includes(searchTerm.toLowerCase())
  
    );
  
    return (
  
      <div className='container-fluid'>
        <h3>Explore Jobs Available</h3>
  
        <input
  
          type='text'
          className='form-control mb-3'
          placeholder='Search for job...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
  
        />
        <br />
      
  
        <div className='row'>
  
          {filteredJobs.length > 0 ? (
  
            filteredJobs.map((Job, index) => (
              <div className='col-md-3 mb-4' key={index}>
                <div className='card shadow card-margin'>
                  <img src={img_url + Job.Job_photo} className='mt-4 product_img' alt={Job.Job_photo} />
  
                  <div className='card-body'>
  
                    <h5 className='mt-2'>{Job.Job_name}</h5>
                    <p className='text-muted'>{Job.Job_description}</p>
                    <b className='text-warning'>{Job.Job_salary}</b><br />
  
                    <button
  
                      className='btn btn-success mt-2 w-100'
                      onClick={() => navigate('/apply', { state: { Job } })}
  
                    >
  
                      Apply
  
                    </button>
  
                  </div>
  
                </div>
  
              </div>
  
            ))
  
          ) : (
  
            <p className='text-center'>No Job found.</p>
  
          )}
  
        </div>
  
      </div>
  
    );
  
  };

export default Jobsavailable
