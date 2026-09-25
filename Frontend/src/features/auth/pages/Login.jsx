import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const { handleLogin, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const Navigate = useNavigate()

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
        {errorMsg && <p style={{ color: "red", margin: "10px 0" }}>{errorMsg}</p>}
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