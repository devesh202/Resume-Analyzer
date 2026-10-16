import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL || "test@test.com"
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD || "test123"

const Login = () => {
  const { handleLogin, loading } = useAuth()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [errorMsg, setErrorMsg] = useState("")
  const Navigate = useNavigate()

  const handleFillDemo = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setErrorMsg("")
  }

  const validateForm = () => {
    if (!email || !password) {
      setErrorMsg("All fields are required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Please enter a valid email")
      return false
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters")
      return false
    }
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg("")
    if (!validateForm()) return
    try {
      await handleLogin({ email, password })
      Navigate("/")
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid email or password")
    }
  }

  if (loading) {
    return (<main><h1>loading....</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <div className="demo-credentials-card">
          <div className="demo-header">
            <span className="demo-badge">Test Account</span>
            <button 
              type="button" 
              className="fill-demo-btn" 
              onClick={handleFillDemo}
            >
              Fill Credentials
            </button>
          </div>
          <p className="demo-text">
            <span>Email:</span> <code>{DEMO_EMAIL}</code>
          </p>
          <p className="demo-text">
            <span>Password:</span> <code>{DEMO_PASSWORD}</code>
          </p>
        </div>

        {errorMsg && <p style={{ color: "red", margin: "10px 0" }}>{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              id='email' 
              placeholder="Enter your email" 
              name='email' 
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              id='password' 
              placeholder="Enter your password" 
              name='password' 
            />
          </div>
          <button className='primary-button button'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login