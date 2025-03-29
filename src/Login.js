import React, { useState } from 'react'
import './Design/css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import img from './img/logo9.png'

function Login() {
  
    const[values, setValues] = useState({
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
      if(errors.email === "" && errors.password === ""){
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data === "Success"){
              navigate('/home');
            }else{
              alert("No record existed");
            }
        })
        .catch(err => console.log(err));
    }
    }


  return (
    <div className='form-container'>
        {/* <div className='form-header-text'>
          <h2>Login</h2>
        </div> */}

      <div className='form-div2'>
        <div className='content'>
          <h2>Sign in</h2>
          <img src={img} alt="Uploaded" />
          <h6 class="nutriQuotes">"Balanced nutrition"</h6>
          <button class="btnLearnMore">Learn More</button>
        </div>
      </div>
      <div className='form-div'>
        <form action='' onSubmit={handleSubmit}>
            <div className='email-div'>
                <label htmlFor="email">Email</label>
                <input type='email' placeholder='Enter Email' name='email'
                onChange={handleInput} />
                {errors.email && <span className='errors'>{errors.email}</span>}
            </div>
            <div className='password-div'>
                <label htmlFor="pasword">Password</label>
                <input type='password' placeholder='Enter Password' name='password'
                onChange={handleInput} />
                 {errors.password && <span className='errors'>{errors.password}</span>}
            </div>
            <button type='submit' className='btnSignIn'>Sign In</button>
            <p>You are agree to our terms and policies</p>
            <Link to="/signup" className='btn-default'>Create Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
