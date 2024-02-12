import React from 'react'
import './AuthForms.css';

const SignUp = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>SignUp</div>
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

        <div className='input'>
        <label>Confirm Password</label>
          <input type='Password' placeholder='Confirm Password' />
        </div>

      </div>


      <div className='submit-container'>
        <button className='SignUp-button'>SignUp</button>
      </div>

      <div className="Already-registerd">Already Registerd? <span>Sign In</span></div>

    </div>
  )
}

export default SignUp