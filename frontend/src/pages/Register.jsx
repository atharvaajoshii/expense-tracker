import React, { useState } from 'react'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

function Register(){
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate();

    const handleRegister = async(e)=>{
        e.preventDefault();
        try {
            await authService.register({
                name,email,username,password
            })
            navigate("/login")

        } catch (error) {
            alert(error.response?.data?.message || "failded")
        }
    }
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="email" name='email' placeholder='enter email' onChange={(e)=>setEmail(e.target.value)} required />
                <input type="text" name='name' placeholder='enter name' onChange={(e)=>setName(e.target.value)} required />
                <input type="text" name='username' placeholder='enter username' onChange={(e)=>setUsername(e.target.value)} required />
                <input type="password" name='password' placeholder='enter password' onChange={(e)=>setPassword(e.target.value)} required />
                <button type='submit'>register</button>
            </form>
            <Link to="/login">login</Link><br />
            
        </div>
    )
}

export default Register;