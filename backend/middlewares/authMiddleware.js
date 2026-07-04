const bcrypt = require("bcrypt")
const pool = require("../config/db")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

require("dotenv").config();
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "token not provided" })
        }
        const decoded = jwt.verify(token, process.env.SECRETKEY)
        const result = await pool.query("select id, name, username, email FROM users where id=$1", [decoded.userId])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "usernot found!" })
        }
        const user = result.rows[0]
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        }
        )
    }
}
module.exports = {authMiddleware}