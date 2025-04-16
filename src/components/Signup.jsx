import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios' 

const Signup = () => {

  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[Password,setPassord]=useState("")
  const[phone,setPhone]=useState("")
  const[loading,setLoading]=useState("")
  const[success,setSuccess]=useState("")
  const[error,setError]=useState("")

  const submit=async(e)=>{
    e.preventDefault()
    setLoading("Please wait as we uplaod your details")

   try{
      const data =new FormData()
      data.append("username",username)
      data.append("email",email)
      data.append("password",Password)
      data.append("phone",phone)
      
      const response=await axios.post("https://noisyintruder2.pythonanywhere.com/api/signup",data)

      setLoading("")
      setSuccess(response.data.success)

      setUsername("")
      setEmail("")
      setPassord("")
      setPhone("")

   }catch(error){
    setSuccess("")
    setLoading("")
    setError("Sorry Something Went Wrong")
   }
  }
  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-5 card shadow p-4">
        <form onSubmit={submit} className='form' >
          {success}   
          {loading}
          {error}
        <h2>Sign Up 🖋</h2>
      <input type="text"
      placeholder='Enter Username' 
      className='form-control' 
      value={username}    
      onChange={(e)=>setUsername(e.target.value)}
      required
      />
    

      <input type="email"
      placeholder=' Enter Your Email' 
      className='form-control mt-3'   
      value={email}  
      onChange={(e)=>setEmail(e.target.value)}
      required
      />
  

      
      <input type="password"
      placeholder='Enter Password'
      className='form-control mt-3' 
      value={Password}  
      onChange={(e)=>setPassord(e.target.value)}  
      required  
      />
      
      
      <input type="tel"
      placeholder='Enter Phone Number' 
      className='form-control mt-3'  
      value={phone}  
      onChange={(e)=>setPhone(e.target.value)}  
      required
      />
    {username} <br />
    {email} <br />
    {phone} <br />
  <button
    type='submit'
   className='btn btn-outline-success my-3 px-5'>Sign up 🖋
  </button>
  <p>Already have an account ?
    <Link to="/Login"> log in</Link>
  </p>
        </form>
      </div>
    </div>
  
  )
}

export default Signup
