const express = require('express');
const cors = require('cors');
const { connection } = require('./Connection/connection');
const { userRouter } = require('./Routes/user.Routes');
const { EmployeRouter } = require('./Routes/employe.Routes');
const { auth } = require('./Middleware/auth');
const app = express()
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Home route")
})
app.use("/user", userRouter)
app.use(auth)
app.use("/emp", EmployeRouter)
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Server is connected To DB Sucessfully");
    } catch (error) {
        console.log("error while connecting to DB");
    }
    console.log("server is Connected to port 8080");
})