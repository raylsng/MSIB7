const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello there! test!!")
})

const authController = require("./auth/auth.controller");
app.use("/api/auth", authController);

app.listen(PORT, () => {
    console.log('app listening on port'+PORT)
})