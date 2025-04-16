import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Login = () => {
  const[username,setUsername]=useState("")
  const[password,setPassord]=useState("")
  const[loading,setLoading]=useState("")
  const[success,setSuccess]=useState("")
  const[error,setError]=useState("")
  const navigate=useNavigate

  const submit= async (e) =>{
    e.preventDefault()
    setLoading("The process may take a few minites plerase Wait ...")

    try{
      
      const data=new FormData()
      data.append("username",username)
      data.append("password",password)

      const response=await axios.post("https://noisyintruder2.pythonanywhere.com/api/signin", data)

      setLoading("")

      if(response.data.user){
        setSuccess(response.data.success)

  
        localStorage.setItem("user",JSON.stringify(response.data.user))

        navigate('/')

      }else{
      setError("Login Failed please try again!")
      }
    }
    catch(error){
      setLoading("")
      setError("Sorry! something went wrong")
    }

  }
  return (
    <div>
      <div className='row justify-content-center mt-4'>
        <div className='col-md-5 card shadow p-4'>
          <form onSubmit={submit}>

            {loading}
            {success}
            {error}
            <h2><i>Log in 🚀</i></h2>
            <input type="text"
            placeholder='Enter your Username'
            className='form-control'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            /> <br />

            <input type="password" 
            placeholder='Enter yor Password'
            className='form-control'
            value={password}
            onChange={(e)=>setPassord(e.target.value)}
            required
            /> 

            <button
            type='submit'
            className='btn btn-outline-danger my-5 px-5'
            > log in 🚀
            </button>
            <p>
               I Don't have an account 
               <Link to="/Signup"> Sign up</Link> 
            </p>
          </form>


        </div>
      </div>
    </div>
  )
}

export default Login

