const modules = require('../modules/permissions.js')
exports.CreatePermission = async (req, res) => {
    try {

        const { permission_key, description } = req.body
        if (!permission_key) {
            return res.status(404).json({ message: 'permission is required' })
        }
        const findpermission = await modules.findOne({ permission_key })
        if (findpermission) {
            return res.status(404).json({
                message: 'permission is existed in the database'
            })
        }
        const result = await modules.create({ permission_key, description })
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
            return res.status(404).json({ message: 'permission does not exist in the database' })
        }
        res.status(200).json({ message: 'All permissions', result })
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
                message: 'id does not send'
            })
        }
        const userPermission = await modules.findById(id)
        if (!userPermission) {
            return res.status(404).json({
                message: 'permission is not found'
            })
        }
        res.status(200).json({
            message: 'your permission is found',
            userPermission
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
            return res.status(404).json({ message: 'permission does not exist' })
        }
        const deletePermission = await modules.findByIdAndDelete(id)
        if (!deletePermission) {
            return res.status(404).json({ message: 'We cannot the non-exsisting permission' })
        }
        res.status(200).json({
            message: 'permission is deleted'
        })

    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdatePermission = async (req, res) => {
    try {
        const id = req.params.id
        if (!permission_key) {
            return res.status(404).json({ message: 'permission is required' })
        }
        if (!id) {
            return res.status(404).json({ message: 'id does not exist ' })
        }
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'permission does not exist' })
        }
        const updatepermission = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        }
        )
        console.log(updatepermission)
        return res.status(200).json({ message: 'permission is updated', updatepermission })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}