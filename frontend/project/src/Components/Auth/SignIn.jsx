import React from 'react'
import './AuthForms.css';

const SignIn = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign In</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        <div className='input'>
        <label>Email</label>
          <input type='text' placeholder='Enter Your Email' />
        </div>

        <div className='input'>
        <label>Password</label>
          <input type='Password' placeholder='Enter Your Password' />
        </div>
      

      </div>

      <div className="forgot-password">forgot Password? <span>Click Here</span></div>

      <div className='submit-container'>
        <button className='signin-button'>Sign In</button>
        <button className='google-signin-button'>Google Sign In</button>
      </div>

      <div className="create-account">Don't Have an Account? <span>Sign Up</span></div>

    </div>

    
  )
}

export default SignIn