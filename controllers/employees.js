const bcrypt = require('bcrypt')
const modules = require('../modules/employeess')
const { validate: isUUID } = require("uuid");
exports.CreateEmployee = async (req, res) => {
    try {

        const { employee_code, first_name, last_name, email, mobile, password_hash, role_id, department_id, date_of_joining, employment_type } = req.body
        if (!employee_code || !first_name || !last_name || !email || !mobile || !password_hash || !role_id || !department_id || !date_of_joining || !employment_type) {
            return res.status(404).json({ message: 'fields are required' })
        }
        const user = await modules.findOne({ employee_code })
        
        if (user) {
            return res.status(404).json({ message: 'employee exist in the database' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password_hash, salt);
        const employees = await modules.create({ employee_code, first_name, last_name, email, mobile, password_hash:hashedPassword, role_id, department_id, date_of_joining, employment_type })
        res.status(200).json({ message: 'employee is created', employees })
    } catch (error) {
        res.status(500).json({ message: 'some error is occur', error: error.message })
    }
}
exports.GetAllEmployees = async (req, res) => {
    try {
        const employees = await modules.find()
        if (employees.length === 0) {
            return res.status(404).json({ message: 'employees not found' })
        }
        res.status(200).json({ message: 'employees found', employees })
    } catch (error) {
        res.status(500).json({ message: 'some error is occur', error: error.message })
    }
}
exports.CreateEmployeeID = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(400).json({ message: 'Employee does not find' })
        }
        res.status(200).json({ message: 'Employee is', result })


    } catch (error) {
        res.status(500).json({ message: 'some error is occur', error: error.message })
    }
}
exports.UpdateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(400).json({ message: 'Employee does not find' })
        }
        const data = await modules.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, context: 'query' })
        if (!data) {
            return res.status(404).json({ message: 'Employee cannot be updated' })
        }
        res.status(200).json({ message: 'Employee is updated', data })
    }catch (error) {
        res.status(500).json({ message: 'some error is occur', error: error.message })                              
    }
}    
exports.DeleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(400).json({ message: 'Employee does not find' })
        }
        const data = await modules.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ message: 'Employee cannot be deleted' })
        }
        res.status(200).json({ message: 'Employee is deleted' })
    } catch (error) {
        res.status(500).json({ message: 'some error is occur', error: error.message })
    }
}