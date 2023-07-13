const express = require('express');
const jwt = require('jsonwebtoken');
const { EmployeeModel } = require('../Model/employe.model');
const EmployeRouter = express.Router()

EmployeRouter.post("/employees", async (req, res) => {
    try {
        const payload = req.body
        const data = new EmployeeModel(payload)
        await data.save()
        res.status(200).send({ msg: "Employe Added succesfully", ok: true, Employe: data })

    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})
EmployeRouter.delete("/employeesdelete/:id", async (req, res) => {
    try {
        let { id } = req.params
        const deleteemployee = await EmployeeModel.findByIdAndDelete({ _id: id })
        return res.status(200).send({ msg: "Deleted Employee" })
    } catch (error) {
        res.status(401).send({ msg: error.message })
    }
})

EmployeRouter.get("/", async (req, res) => {
    try {
        const data = await EmployeeModel.find()
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})

EmployeRouter.get("/employees", async (req, res) => {
    const { department } = req.query
    try {
        const filterdata = await EmployeeModel.find({ department })
        res.status(200).send(filterdata)
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})
EmployeRouter.patch("/employees/:id", async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.params
        const updateemp = await EmployeeModel.findByIdAndUpdate({ _id: id }, payload, { new: true })
        res.status(200).send({ msg: "Employee updated Succesfully", ok: true, updateemp })
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})

EmployeRouter.get('/employees/sort', async (req, res) => {
    const { page, department, sort, name } = req.query;
    console.log(req.query, "query");
    let query = {};
    let sortValue = "";
    if (department) { query.department = department }
    if (sort === "asc") { sortValue = 1 }
    else
        if (sort === "asc") { sortValue = -1 }

    if (name) {
        query.firstName = { name: { $regex: name } };
    }
    try {

        const data = await EmployeeModel.find(query).sort({ salary: sortValue }).skip((page * 5) - 5).limit(5);
        res.status(200).send(data)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error occured');
    }
});



module.exports = { EmployeRouter }