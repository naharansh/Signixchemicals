const modules = require('../modules/department.js')
const { validate: isUUID } = require("uuid");
exports.CreateDepartment = async (req, res) => {
    try {
        const { department_name } = req.body
        if (!department_name) {
            return res.status(404).json({ message: 'department_name is requried' })
        }
        const data = await modules.findOne({ department_name })
        if (data) {
            return res.status(404).json({ message: 'department is exist ' })
        }
        const result = await modules.create({ department_name })
        res.status(200).json({ message: 'department_name', result })


    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.GetDepartments = async (req, res) => {
    try {
        const result = await modules.find()
        if (result.length === 0) {
            return res.status(404).json({ message: 'Departments are not exists' })
        }
        res.status(200).json({ message: 'all departments', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.GetDepartment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'department does not exists' })
        }
        res.status(200).json({ message: 'department is', result })

    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'department does not exists' })
        }
        const updated_department = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        })
        if (!updated_department) {
            return res.status(404).json({ message: 'data cannot be updated' })
        }
        res.status(200).json({ message: 'department is updated', updated_department })

    } catch (error) {
        res.status(500).json({ message: 'some error is occurr', err: error.message })

    }
}
exports.DeleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Validate UUID
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }

        // 2️⃣ Delete using UUID field
        const deletedDepartment = await modules.findOneAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        return res.status(200).json({
            message: "Department deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
