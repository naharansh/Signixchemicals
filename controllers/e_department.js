const edartment = require('../modules/edepartments.js')
const { validate: isUUID } = require("uuid");
exports.CreateDepartment = async (req, res) => {
    try {
        
        const { department_name, description } = req.body
        if (!department_name) {
            return res.status(404).json({ message: 'fields are required' })
        }
        const fdepartments = await edartment.findOne({ department_name })
      
        if (fdepartments) {
            return res.status(404).json({ message: 'department already exist' })
        }
        const create_depart = await edartment.create({ department_name, description })
        res.status(200).json({ message: 'department already exist', create_depart })
    } catch (error) {
       res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.GetDepartments = async (req, res) => {
    try {
        const fdepartment = await edartment.find()
        if (fdepartment.length === 0) {
            return res.status(404).json({ message: 'department does not exist' })
        }

        res.status(200).json({ message: 'ALL departemnts', fdepartment })
    } catch (error) {

    }
}
exports.UpdateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await edartment.findById(id)
        if (!result) {
            return res.status(400).json({
                message: "Department does not find"
            });
        }
        const data = await edartment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
        })
        if (!data) {
            return res.status(404).json({ message: 'department cannot be updated' })
        }
        res.status(200).json({ message: 'departemnt  is', data })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.DeleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await edartment.findById(id)
        if (!result) {
            return res.status(400).json({
                message: "Department does not find"
            });
        }
        const data = await edartment.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ message: 'department cannot be deleteted' })
        }
        res.status(200).json({ message: 'departemnt  is deleted' })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.GetDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await edartment.findById(id)
        if (!result) {
            return res.status(400).json({
                message: "Department does not find"
            });
        }

        res.status(200).json({ message: 'departemnt  is', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}