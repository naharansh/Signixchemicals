const EmployeeLocation = require('../modules/employee_locations.js')
const emps = require('../modules/employeess.js')
const { validate: isUUID } = require("uuid");
exports.CreateEmployeeLocation = async (req, res) => {
    try {
        const { employee_id, latitude, longitude, radius_meter } = req.body;
        // Check if employee exists
        if (!employee_id || !latitude || !longitude || !radius_meter) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const employee = await emps.findById(employee_id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        const newLocation = new EmployeeLocation({
            employee_id,
            latitude,
            longitude,
            radius_meter
        })
        await newLocation.save();
        res.status(201).json({ message: "Employee location created successfully", location: newLocation })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
exports.GetEmployeeLocations = async (req, res) => {
    try {
        const locations = await EmployeeLocation.find().populate('employee_id');
        if (locations.length === 0) {
            return res.status(404).json({ message: "No employee locations found" })
        }
        res.status(200).json({ locations })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
exports.GetEmployeeLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const location = await EmployeeLocation.findById(id).populate('employee_id');
        if (!location) {
            return res.status(404).json({ message: "Employee location not found" })
        }
        res.status(200).json({ location })
    }catch(error)
    {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
exports.DeleteEmployeeLocation = async (req, res) => {
    try {
        const { id } = req.params;
       if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const location = await EmployeeLocation.findById(id);
        if (!location) {
            return res.status(404).json({ message: "Employee location not found" })
        }
        const result=await EmployeeLocation.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(500).json({ message: "Failed to delete employee location" })
        }
        res.status(200).json({ message: "Employee location deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}
exports.UpdateEmployeeLocation = async (req, res) => {
    try {
        const { id } = req.params;
       if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const location = await EmployeeLocation.findById(id);
        if (!location) {
            return res.status(404).json({ message: "Employee location not found" })
        }
        const result=await EmployeeLocation.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
            context:'query'
        });
        if(!result)
        {
            return res.status(500).json({ message: "Failed to update employee location" })
        }
        res.status(200).json({ message: "Employee location updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}