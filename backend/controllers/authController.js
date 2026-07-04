const bcrypt = require("bcrypt")
const pool = require("../config/db")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
require("dotenv").config();

const secretkey = process.env.SECRETKEY;

const register = async (req, res) => {
    try {
        const { email, username, name, password } = req.body;
        if (!email || !username || !name || !password) {
            return res.status(400).json({
                message: "all feilds are necessary"
            });
        }
        const exists = await pool.query(`select * from users where email = $1`, [email])
        if (exists.rows.length > 0) {
            return res.status(409).json({
                message: "Email already in use!"
            });
        }
        const usernameExists = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (usernameExists.rows.length > 0) {
            return res.status(409).json({
                message: "Username already taken"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await pool.query(
            `
            INSERT INTO users(name, username, email, password) VALUES($1, $2, $3, $4) RETURNING id, name, username, email `, [name, username, email, hashedPassword]
        );
        return res.status(201).json({
            message: "Registered successfully!",
            user: user.rows[0]
        });
        console.log("user inserted ", user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "all feilds are necessary"
            });
        }
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(409).json({
                message: "user not found"
            });
        }
        const user = result.rows[0]
        const ispasswordcorrect = await bcrypt.compare(password, user.password || "")
        if (!ispasswordcorrect) {
            return res.status(403).json({
                message: "incorrect password",
            })
        }
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
            }, secretkey,
            {
                expiresIn: "15h"
            }
        )
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: "lax"
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });
        console.log("login successfull!", user)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const logout = async (req, res) => {
        try {
        res.clearCookie("token");
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { register, login, logout }