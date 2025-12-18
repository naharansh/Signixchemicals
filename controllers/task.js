const modules = require('../modules/task.js')
const dealers=require('../modules/dealers.js')
const { validate: isUUID } = require("uuid");
exports.CreateTask = async (req, res) => {
    try {
        const { title, description, start_date, due_date, status,created_by,dealer_id } = req.body
        if (!title || !start_date || !due_date || !created_by||!dealer_id) {
            return res.status(404).json({ message: 'fields are empty' })
        }
        const fdeal=await dealers.findById(dealer_id)
        if(!fdeal)
        {
             res.status(404).json({ message: 'dealer is not found', result })
        }
        const result = await modules.create({ title, description, start_date, due_date, status,created_by,dealer_id  })
        res.status(200).json({ message: 'result  is created', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.AllTask = async (req, res) => {
    try {
        const result = await modules.find().populate('created_by').populate('dealer_id')
        if (result.length === 0) {
            return res.status(404).json({ message: 'Task does not found' })
        }
        res.status(200).json({ message: 'all Task', result })

    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.Task = async (req, res) => {
    try {
        const { id } = req.params
        // console.log("DFDFD")
        if (!id || !isUUID(id)) {
          
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const user = await modules.findById(id).populate('created_by').populate('dealer_id')
           console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'task  does not found' })
        }
        res.status(200).json({ message: 'task', user })

    } catch (error) {
          console.log(error.message)
    }
}
exports.UpdateTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const task = await modules.findById(id)
        if (!task) {
            return res.status(400).json({
                message: "task does not found"
            });
        }
        const result = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
        })
        if (!result) {
            return res.status(400).json({
                message: "task cannot be updated"
            });
        }
        res.status(200).json({message:'updatedTask',result})
    } catch (error) {
            res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.DeleteTask=async (req,res) => {
    try {
        const{id}=req.params
        if(!id && !!isUUID(id))
        {
            return res.status(404).json({message:'Invalid Id'})
        }
        const findTask=await modules.findById(id)
        if(!findTask)
        {
            return res.status(404).json({message:'task is not formed'})

        }
        const result=await modules.findByIdAndDelete(id)
        if(!result)
        {
            return res.status(404).json({message:'task cannot be deleted'})
        }
        res.status(200).json({message:'task is deleted'})
    } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}