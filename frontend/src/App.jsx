import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Accounts from "./pages/Accounts";
import AddAccount from "./pages/AddAccount";
import EditAccount from "./pages/editAccount";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/accounts" element={<Accounts/>} />
                <Route path="/add-account" element={<AddAccount/>} />
                <Route path="/edit/:id" element={<EditAccount/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App; 