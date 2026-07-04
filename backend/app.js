const dotenv = require("dotenv");
const pool = require("./config/db")
const express = require("express")
const app = express();
const cors = require("cors");
const authRoutes = require("./routers/authRouter")
const accountRoutes = require("./routers/accountRouter")

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

pool.connect().then((client) => { console.log("conneted to db"); client.close }).catch((err) => { console.log("cant connect to db: ", err) })

app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});


app.use("/expense-tracker/auth",authRoutes)
app.use("/expense-tracker/accounts",accountRoutes)


app.listen(5000, () => {
    console.log("running!!!!")
})