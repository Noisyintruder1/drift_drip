import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <section class="row container-fluid">
        <div class="col-md-12">
            <div class="navbar navbar-expand-md bg-light navbar-light mt-2">
                <a href="index.html" class="navbar-brand text-dark "><b>Happy Globe</b></a>
                <button 
                class="navbar-toggler"
                    data-bs-toggle="collapse" data-bs-target="#navbarcontents">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="navbar-nav ms-auto navbar-collapse collapse" id='navbarcontents'>
                    <Link to ='/signup' className='btn btn-outline-success mx-2 navbar-item active'>Sign Up</Link>
                    <Link to ='/signin'className='btn btn-outline-success mx-2 navbar-item'> Sign In</Link>
                    <Link to='/Jobsavailable' className='btn btn-outline-success mx-2 navbar-item'>Jobs Available</Link>
                    <Link to='/Postajob' className='btn btn-outline-success mx-2 navbar-item'>Post Job</Link>
                    <Link to ='/Apply' className='btn btn-outline-success mx-2 navbar-item'>Apply Now</Link>


                    
                </div>

            </div>
        </div>
     </section>
    </div>
  )
}

export default Navbar
