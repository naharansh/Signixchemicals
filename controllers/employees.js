const bcrypt = require('bcrypt')
const modules = require('../modules/employeess')
const { validate: isUUID } = require("uuid");
const fs = require('fs')
const path = require('path')
exports.CreateEmployee = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        const {
            companyName, companyType, sector,
            addressLine1, addressLine2, city, state, country,
            primaryPhone, password, secondaryPhone, email, website
        } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create employee
        const employee = await modules.create({
            companyName,
            companyType,
            sector,
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            primaryPhone,
            password: hashedPassword,
            secondaryPhone,
            email,
            website,
            file_path: req.file ? req.file.filename : null, // save filename only
        });

        res.status(200).json({ message: 'Employee created', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};

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
        const newImagePath = `${req.file.filename}`;
        console.log(newImagePath)
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(400).json({ message: 'Employee does not find' })
        }
        if (result.file_path) {
            const oldPath = path.join(__dirname, "../uploads", result.file_path);
          
            fs.unlink(oldPath, (err) => {
                if (err) console.error("Failed to delete old image:", err);

            })
                ;
        }

        result.file_path = newImagePath;
        await result.save();


        const data = await modules.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!data) {
            return res.status(404).json({ message: 'Employee cannot be updated' })
        }
        res.status(200).json({ message: 'Employee is updated', data })
    } catch (error) {
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