const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./model/User")
const { configDotenv } = require("dotenv")

const app = express()
app.use(express.json())
app.use(cors())

configDotenv();
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI);


app.post("/login", (req, res) => {

    const {email, password} = req.body;

    UserModel.findOne({email:email})
    .then(user => {
        if(user) {
            if(user.password == password) {
                res.json("Success")
            } else {
                res.json("Incorrect Password")
            }
        } else {
            res.json("User does not exist")
        }
    })
})

app.post("/register", (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running on 3001")
})