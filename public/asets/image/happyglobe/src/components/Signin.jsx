import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[success,setSuccess] = useState("")
  const[loading,setLoading] = useState("")
  const[error,setError] = useState("")
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
      setLoading("Please wait...")

      try{
        const data = new FormData()
        data.append("email",email)
        data.append("password",password)

      const response = await axios.post('https://ernester1.pythonanywhere.com/api/signin',data)
        setLoading("")
        
        if(response.data.user){
          setSuccess(response.data.message)
          localStorage.setItem("user",JSON.stringify(response.data.user))
          navigate("/")
        }else{
          setError("Login Failed!!")
        }
      }catch {
        setLoading("")
        setSuccess("")
        setError(error.message)
      }
  }

  return (
    <div className='row justify-content-center m-4'>
      <div className="col-md-6 card shadow p-4 ">
        <form onSubmit={submit}>
          <h2>Sign In</h2>
          {success}
          {loading}
          {error}

          <input 
          type="email" 
          placeholder='Enter email'
          className='form-control my-3'
          required
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          />

          <input 
          type="password" 
          placeholder='Enter Password'
          className='form-control my-3'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-success">Sign In ✅</button>
        </form>
      </div>
    </div>
  )
}

export default Signin
