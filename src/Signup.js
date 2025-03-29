import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation  from './SignupValidation';
import axios from 'axios';
import img from './img/logo9.png'

function Signup() {

    const[values, setValues] = useState({
        name: '',
        email: '',
        password: ''
      })

      const navigate = useNavigate();
  
      const [errors, setErrors] = useState({})
  
      const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
      }
  
      const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
        }
      }

  return (
    <div className='form-container'>

      <div className='form-div2'>
        <div className='content'>
          <h2>Sign up</h2>
          <img src={img} alt="Uploaded" />
          <h6 class="nutriQuotes">"Balanced nutrition"</h6>
          <button class="btnLearnMore">Learn More</button>
        </div>
      </div>

      <div className='form-div'>
        <form action='' onSubmit={handleSubmit}>
            <div className='email-div'>
                <label htmlFor='name'>Name</label>
                <input type='text' placeholder='Enter Name' name='name'
                onChange={handleInput} />
                {errors.name && <span className='errors'>{errors.name}</span>}
            </div>
            <div className='email-div'>
                <label htmlFor="email">Email</label>
                <input type='email' placeholder='Enter Email'name='email'
                onChange={handleInput} />
                {errors.email && <span className='errors'>{errors.email}</span>}
            </div>
            <div className='password-div'>
                <label htmlFor="pasword">Password</label>
                <input type='password' placeholder='Enter Password' name='password'
                onChange={handleInput} />
                {errors.password && <span className='errors'>{errors.password}</span>}
            </div>
            <button type='submit' className='btnSignIn'>Sign up</button>
            <p>You are agree to our terms and policies</p>
            <Link to="/login" className='btn btn-default border'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
