const mongoose = require('mongoose');
const userObj = {
    name: String,
    email: String,
    password: String,
    confirmpassword : String
}
const userSchem = mongoose.Schema(userObj)
const userModel = mongoose.model("user", userSchem)
module.exports = { userModel }