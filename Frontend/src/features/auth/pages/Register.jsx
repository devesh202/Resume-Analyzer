import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from "../hooks/useAuth"
const Register = () => {
    const { handleRegister, loading } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    async function handleSubmit(e) {
        e.preventDefault()
        setErrorMsg("")
        try {
            await handleRegister({ username, email, password })
            navigate("/")
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Error registering user")
        }
    }

    if (loading) {
        return (<main><h1>loading....</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                {errorMsg && <p style={{ color: "red", margin: "10px 0" }}>{errorMsg}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" id='username' placeholder="Enter your name" name='username' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' placeholder="Enter your email" name='email' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' placeholder="Enter your password" name='password' />
                    </div>
                    <button className='primary-button button'>Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register