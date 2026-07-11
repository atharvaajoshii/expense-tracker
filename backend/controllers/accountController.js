const bcrypt = require("bcrypt")
const pool = require("../config/db")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");


const getAccounts = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("user id : ", userId)
        const result = await pool.query("select * from accounts where user_id=$1 order by account_id ", [userId])
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "account not found under this user",
            })
        }
        const accounts = result.rows
        res.json(accounts)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
const createAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("user id : ", userId)

        const { account_name, account_type } = req.body
        const balance = req.body.balance ?? 0;

        const existing = await pool.query(
            `SELECT account_id FROM accounts WHERE user_id = $1 AND account_name = $2 AND account_type = $3`, [userId, account_name, account_type]);
        if (existing.rows.length > 0) {
            return res.status(409).json({
                message: "An account with this name and type already exists."
            });
        }

        const account = await pool.query("insert into accounts (user_id, account_name, account_type, balance) values ($1,$2,$3,$4) returning * ", [userId, account_name, account_type, balance])
        res.status(201).json({
            message: "account created!",
            account: account.rows[0],
        })
        console.log("account added: ", account.rows)

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
const updateAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("user id : ", userId)
        const accountId = req.params.id;
        const { account_name, account_type, balance } = req.body;
        const account = await pool.query(
            `SELECT * FROM accounts WHERE account_id = $1 AND user_id = $2`, [accountId, userId]
        );
        if (account.rows.length === 0) {
            return res.status(404).json({
                message: "Account Doesnt exist!"
            });
        }

        const existing = await pool.query(
            `SELECT account_id FROM accounts WHERE user_id = $1 AND account_name = $2 AND account_type = $3 AND account_id <> $4`, [userId, account_name, account_type, accountId]
        );
        if (existing.rows.length > 0) {
            return res.status(409).json({
                message: "An account with this name and type already exists."
            });
        }

        const result = await pool.query(
            `UPDATE accounts
             SET account_name = $1,
                 account_type = $2,
                 balance = $3
             WHERE account_id = $4 AND user_id = $5 RETURNING *`, [account_name, account_type, balance, accountId, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Account not found",
            });
        }
        res.json({
            message: "Account updated!!",
            account: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("user id : ", userId)
        const accountId = req.params.id;
        
        const result = await pool.query(
            "DELETE FROM accounts WHERE account_id = $1 AND user_id = $2",
            [accountId, userId]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Account not found"
            });
        }
        res.json({
            message: "Account deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }

}


const getAccountById = async (req,res)=>{
    try {
        const accountid = req.params.id 
        const result = await pool.query("select * from accounts where account_id=$1",[accountid])
        if(result.rows.length===0){return res.status(409).json({message:"account not found"})}
        // console.log(result.rows[0])
        res.status(200).json(result.rows[0])
    } catch (error) {
        
    }
}

module.exports = {getAccountById, getAccounts, createAccount, updateAccount, deleteAccount }