import React from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"
import { useState } from 'react'
import { useNavigate } from 'react-router'
const Login = () => {
  const { handleLogin, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const Navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({ email, password })
    Navigate("/")
  }

  if (loading) {
    return (<main><h1>loading....</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} id='email' placeholder="Enter your email" name='email' />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} id='password' placeholder="Enter your password" name='password' />
          </div>
          <button className='primary-button button'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login