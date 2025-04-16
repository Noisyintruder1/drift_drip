import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const MakePayments = () => {
  const{product}=useLocation().state || {}
  const[phone,setPhone] =useState("")
  const[message,setMessage] = useState("")
  
  const submit= async(e) =>{
    e.preventDefault()

    setMessage("PLease wait as we process your payment")
    const data = new FormData

    data.append("phone",phone)
    data.append("amount",product.product_cost)
    
    const response = await axios.post('https://Noisyintruder2.pythonanywhere.com/api/mpesa_payment' , data);

    setMessage(response.data.message)
  }
  return (
    <div className='row justify-content-center'>
      <div className="col-md-6 card shadow p-4">
      <form onSubmit={submit}>
      <h2 className='text-success'>LIPA NA MPESA 💰</h2>
      {message}
      <input 
      type="tel" 
      placeholder='Enter Phone Number'
      className='form-control'
      value={phone}
      onChange={(e) => {setPhone(e.target.value)}}
      />
      <p className='text-danger'>Enter Phone Number to pay from starts with 254*********</p>
      <button type='submit' className='btn btn-outline-success mt-4 w-50'>
        Purchase Now 💰 💸
      </button>
      </form>
      </div>

    </div>
  )
}

export default MakePayments
