const dotenv = require("dotenv");
const pool = require("./config/db")
const express = require("express")
const app = express();
const authRoutes = require("./routers/authRouter")
app.use(express.json());
const cookieParser = require("cookie-parser");

app.use(cookieParser());

pool.connect().then((client) => { console.log("conneted to db"); client.close }).catch((err) => { console.log("cant connect to db: ", err) })


app.use("/auth",authRoutes)


app.listen(5000, () => {
    console.log("running!!!!")
})