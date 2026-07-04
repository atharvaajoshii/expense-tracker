import axios from "axios"

const url = "http://localhost:5000/expense-tracker/auth";

const register = async(userdata)=>{
    const res = await axios.post(`${url}/register`,userdata,
        {
            withCredentials:true,
        }
    )
    return res.data;
}

const login = async(userdata)=>{
        const res = await axios.post(`${url}/login`,userdata,
        {
            withCredentials:true,
        }
    )
    return res.data;
}


const logout = async()=>{
        const res = await axios.post(`${url}/logout`,{},
        {
            withCredentials:true,
        }
    )
    return res.data;
}




export default {
    register,login,logout
}