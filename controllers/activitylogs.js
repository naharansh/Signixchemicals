const modules = require('../modules/activity_logs.js')
const isurser=require('../modules/userlogin.js')
exports.CreateUser = async (req, res) => {
    try {
        const { user_id, action, module } = req.body
        if (!user_id || !action || !module) {
            return res.status(404).json({ message: 'fields are required' })
        }
        const data=await isurser.findById(user_id)
        if(!data)
        {
             res.status(404).json({ message: 'user does not exist' })
        }
        const result = await modules.create({ user_id, action, module })
        res.status(201).json({ message: 'activity_log is created', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occur', err: error.message })
    }
}
exports.GetUsers = async (req, res) => {
    try {
        const result = await modules.find()
        if (result.length === 0) {
            return res.status(404).json({ message: 'users are not found' })
        }
        res.status(200).json({ message: 'users are found', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.GetUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(500).json({ message: 'id does not exist in the database', })
        }
        const result = await modules.findById(id)
        if (!result) {
            res.status(404).json({ message: 'user does not found' })
        }
        res.status(200).json({message:'activity_user',result})
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', err: error.message })
    }
}
exports.UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: 'id does not found in the routes' })
        }
        const result = await modules.findById(id);
        console.log(result)
        if (!result) {
            return res.status(404).json({ message: 'user  does not found' })
        }
        
        const data = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        })
        if (!data) {
            return res.status(404).json({ message: 'useractivity does not activated' })
        }
        res.status(200).json({ message: 'user_activity is updated', data })
    } catch (error) {
        res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}
exports.Delete = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({ message: 'id does exist in the database' })
        }
        
        const result = await modules.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'user_activity does not found' })
        }
        const data = await modules.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ message: 'user_activity does deleted' })
        }
        return res.status(200).json({message:'user_activity is deleted'})
    } catch (error) {
        res.status(404).json({ message: 'some error is occured', err: error.message })
    }
}