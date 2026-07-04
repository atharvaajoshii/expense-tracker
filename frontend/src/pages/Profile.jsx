import React from "react";
import authService from "../services/authService";
import { useNavigate } from 'react-router-dom'

function Profile(){
        const navigate = useNavigate();
    
    const handleLogout = async()=>{
        try {
            await authService.logout()
            navigate("/login")
            
        } catch (error) {
            alert(error.response?.data?.message || "failded")
        }
    }
    return(
        <div>
            <h1>Profile</h1>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}
export default Profile;