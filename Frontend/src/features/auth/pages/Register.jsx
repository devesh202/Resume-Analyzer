import React from 'react'
import { Link, useNavigate } from 'react-router'

const Register = () => {
    function handleSubmit(e){
        e.preventDefault()
        console.log("submitted")
    }

    return (
      <main>
        <div className="form-container">
            <h1>Register</h1>
        <form onSubmit={handleSubmit}>
         <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input type="text" id='username' placeholder="Enter your name" name='username' />
         </div>
         <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' placeholder="Enter your email" name='email' />
         </div>
         <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type="password" id='password' placeholder="Enter your password" name='password' />
         </div>
         <button className='primary-button button'>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </main>
    )
}

export default Register