import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Register from "./pages/Register";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/Profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;