const models = require('../modules/roles.js')
exports.CreateRoles = async (req, res) => {
    try {
        console.log("SDFsdf")
        const { role_name, description } = req.body
        const result = await models.findOne({ role_name })
        
        if (result) {
            return res.status(404).json({ message: 'role exist in the databaase', id: result._id })
        }
        
        const createrole = await models.create({ role_name, description })
        console.log(createrole)
        await createrole.save()
        res.status(201).json({
            message: 'role is created',
            createrole
        })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: 'some error occured', err: error.message })
    }
}
exports.GetALLRoles = async (req, res) => {
    try {
        const result = await models.find()
        if (result.length === 0) {
            return res.status(404).json({ message: 'role does not exist in the database' })
        }
        res.status(200).json({
            result
        })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.GetSingleRoles = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id) {
            return res.status(404).json({ message: 'id does not exist' })
        }

        const result = await models.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'role does not exist in the database' })
        }
        res.status(200).json({
            result
        })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.DeleteRoles = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({ message: 'id does not exist ' })
        }
        const result = await models.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'role does not exist' })
        }
        res.status(200).json({
            message: 'user is deleted'
        })
    } catch (error) {
        return res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdateRoles = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({ message: 'id does not exist ' })
        }
        const result = await models.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'role does not exist' })
        }
        const updaterole = await models.findByIdAndUpdate(id, req.body, {
            new: true,              // return updated document
            runValidators: true,    // 🔑 enforce schema validations
            context: "query"        // ensures proper validation for certain validators
        }
        )
         return res.status(200).json({ message: 'role is updated',updaterole })
    } catch (error) {
        return res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}