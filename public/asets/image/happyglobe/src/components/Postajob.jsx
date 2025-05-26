import React, { useState } from 'react'
import axios from 'axios'



const Postajob = () => {
    const[jobname,setJobname] = useState ('')
    const[jobdescription,setJobdescription] = useState('')
    const[Salary,setSalary] = useState ('')
    const[photo,setPhoto] = useState  ('')
    const[loading,setLoading] = useState  ('')
    const[success,setSuccess] = useState  ('')
    const[error,setError] = useState ('')
  
    const submit = async(e) => {
      e.preventDefault()
  
      setLoading("Please wait as we Upload...")
  
      try{
        const data = new FormData()
        data.append("job_name",jobname)
        data.append("job_description",jobdescription)
        data.append("salary",Salary)
        data.append("job_photo",photo)
  
        const response = await axios.post('https://ernester1.pythonanywhere.com/api/add_product')
        setLoading("")
        setSuccess(response.data.success)
     }catch(error){
        setLoading("")
        setSuccess("")
        setError(error.message)
     }
    }
  
    return (
      <div className='row justify-content-center m-4'>
        <div className='col-md-6 card shadow p-4'>
          <form onSubmit={submit}>
            <h2>Upload Job</h2>
  
            {loading}
            {success}
            {error}
  
            <input type="text"
            placeholder='Job name'
            className='form-control my-4'
            required
            value={jobname}
            onChange={(e) =>{setJobname(e.target.value)}}
            
            />
          
  
            <textarea 
            placeholder='Job Description'
            className='form-control my-4'
            required
            value={jobdescription}
            onChange={(e) =>{setJobdescription(e.target.value)}}
            />
            
  
            <input type="number user"
            placeholder='Salary'
            className='form-control '
            required
            value={Salary}
            onChange={(e) =>{setSalary(e.target.value)}}
            />
            
  
          <lable htmlFor="Productphoto"
          className='mt-4'
          >Choose the Product Photo
          </lable>
            
            <input type="file"
            className='form-control mt-4'
            accept='image/*'
            onChange={(e) => {setPhoto(e.target.files[0])}}
            />
  
            <button type='submit' className='btn btn-primary px-5'>
              Upload
            </button>
            
          </form>
        </div>
        
      </div>
    )
  }
export default Postajob
