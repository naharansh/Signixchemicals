const models = require('../modules/roles.js')
exports.CreateRoles = async (req, res) => {
    try {
        const { category_id, product_name,price,gst,stock,status } = req.body
        
        const createrole = await models.create({ category_id, product_name,price,gst,stock,status })
        await createrole.save()
        res.status(201).json({
            message: 'role is created',
            createrole
        })
    } catch (error) {
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