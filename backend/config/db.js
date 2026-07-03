const { Pool } = require("pg")
const dotenv = require("dotenv");


require("dotenv").config();
console.log(process.env.PG_PASSWORD)
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "expense_tracker",
    password: process.env.PG_PASSWORD,
    port: 5432,

})
module.exports = pool;