const mongoose = require('mongoose');
const empobj = {
    firstname: String,
    lastname: String,
    email: String,
    department: String,
    salary: Number
}
const empSchema = mongoose.Schema(empobj)
const EmployeeModel = mongoose.model("employee", empSchema)
module.exports = { EmployeeModel }