const modules = require('../modules/groups.js')
exports.CreateDepartment = async (req, res) => {
    try {
        const { group_name, description } = req.body
        if (!group_name) {
            return res.status(404).json({ message: 'group_name cannot be empty' })
        }
        const data = await modules.findOne({ group_name })
        if (data) {
            return res.status(404).json({ message: 'department exist' })
        }
        const result = await modules.create({ group_name: group_name, description })
        await result.save()
        res.status(201).json({
            message: 'department is created',
            result
        })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.AllDepartments = async (req, res) => {
    try {
        const result = await modules.find()
        if (result.length === 0) {
            return res.status(404).json({
                message: 'department does not exist '
            })
        }
        res.status(200).json({ message: 'All departments', result })
    } catch (error) {
        res.status(500).json({ message: 'some error', err: error.message })
    }
}
exports.Specificdepartments = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(404).json({ message: 'id does not exist is the routes' })
        }
        const result = await modules.findById(id)
        if (!result) {
            res.status(404).json({
                message: 'department does not find'
            })
        }
        res.status(200).json({
            message: 'Department',
            result
        })
    } catch (error) {
        res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.UpdateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(404).json({ message: 'id does not exist is the routes' })
        }
        const data = await modules.findById(id)
        if (!data) {
            res.status(404).json({ message: 'department does not exists' })
        }
        const result = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: "query"

        })
        if (!result) {
            res.status(404).json({ message: 'department does not update' })
        }
        res.status(200).json({ message: 'department is updated', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occureed', err: error.message })
    }
}
exports.DeleteDepartment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(404).json({ message: 'id does not exist is the routes' })
        }
        const data = await modules.findById(id)
        if (!data) {
            res.status(404).json({ message: 'department does not exists' })
        }
        const result = await modules.findByIdAndDelete(id)
        if (!result) {
            res.status(404).json({ message: 'department cannot be deleted' })
        }
        res.status(200).json({ message: 'department is deleted' })

    } catch (error) {
        res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}