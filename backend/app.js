const dotenv = require("dotenv");
const pool = require("./db")
const express = require("express")
const app = express();


pool.connect()
.then((client)=>{
    console.log("connected to db")
    client.close
}).catch((err)=>{
    console.log("cant connect to db: ",err)
}
)

app.listen(5000,()=>{
    console.log("running!!!!")
})