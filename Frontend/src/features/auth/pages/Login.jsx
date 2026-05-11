import React from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"
const Login = () => {

    function handleSubmit(e){
        e.preventDefault()
        console.log("submitted")
    }

    return (
      <main>
        <div className="form-container">
            <h1>Login</h1>
        <form onSubmit={handleSubmit}>
         <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' placeholder="Enter your email" name='email' />
         </div>
         <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type="password" id='password' placeholder="Enter your password" name='password' />
         </div>
         <button className='primary-button button'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </main>
    )
}

export default Login