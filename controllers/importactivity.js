const modules = require('../modules/importactivity')
const users = require('../modules/userlogin.js')
exports.CreatePermission = async (req, res) => {
    try {

        const { file_name, imported_by, total_records, created_at } = req.body
        if (!file_name || !imported_by || !total_records) {
            return res.status(404).json({ message: 'fields is required' })
        }
        const user = await users.findById(imported_by)
        if (!user) {
            res.status(500).json({
                message: 'user does not exist',
               
            })
        }
        const result = await modules.create({ file_name, imported_by, total_records, created_at })
        res.status(200).json({
            message: 'data is inserted',
            result
        })
    } catch (error) {
        res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.GetAllPermission = async (req, res) => {
    try {
        const result = await modules.find()
        if (result.length === 0) {
            return res.status(404).json({ message: 'history does not exist in the database' })
        }
        res.status(200).json({ message: 'All History', result })
    }
    catch (error) {

        res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.GetPermission = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                message: 'id does not send in the database'
            })
        }
        const userHistory = await modules.findById(id)
        if (!userHistory) {
            return res.status(404).json({
                message: 'history is not found'
            })
        }
        res.status(200).json({
            message: 'your history is found',
            userHistory
        })
    } catch (error) {
        return res.status(500).json({
            message: 'some error is occured',
            err: error.message
        })
    }
}
exports.DeletePermission = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({ message: 'id does not exists' })
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'history does not exist' })
        }
        const deletehistory = await modules.findByIdAndDelete(id)
        if (!deletehistory) {
            return res.status(404).json({ message: 'We cannot delete the history' })
        }
        res.status(200).json({
            message: 'history is deleted'
        })

    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdatePermission = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(404).json({ message: 'id does not exist the database ' })
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'history is not find' })
        }
        const updatehistory = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        }
        )

        return res.status(200).json({ message: 'history is updated', updatehistory })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}