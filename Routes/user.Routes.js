const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel } = require('../Model/user.model');
const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body
        const isUserPresent = await userModel.findOne({ email })
        if (isUserPresent) {
            return res.status(400).send({ msg: "User Already Present Direct Login" })
        }
        if (password != confirmpassword) {
            return res.status(400).send({ msg: "Password Mismatch" })

        }
        bcrypt.hash(password, 5, async function (err, hash) {
            const newuser = new userModel({ name, email, password: hash, confirmpassword: hash })
            await newuser.save()
        });
        res.status(200).send({ msg: "Registration Succesfull", ok: true })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const isuserPresent = await userModel.findOne({ email })
        if (!isuserPresent) {
            return res.status(400).send({ msg: "User is Not Present" })
        }
        bcrypt.compare(password, isuserPresent.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ userID: isuserPresent._id }, "secret", { expiresIn: "2hr" });
                res.status(200).send({ msg: "Login Succesfull", ok: true, token, isuserPresent })
            } else {
                return res.status(400).send({ msg: "wrong Credentials" })
            }
        });
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

module.exports = { userRouter }