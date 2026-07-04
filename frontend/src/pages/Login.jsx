import React, { useState } from 'react'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login({
                email, password
            })
            navigate("/profile")

        } catch (error) {
            alert(error.response?.data?.message || "failded")
        }
    }
    return (
        <div>
            <h1>login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" name='email' placeholder='enter email' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name='password' placeholder='enter password' onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit'>login</button>
            </form>
            <Link to="/register">register</Link><br />

        </div>
    )
}

export default Login