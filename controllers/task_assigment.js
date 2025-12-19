const modules = require('../modules/task_assignments.js')
const emp=require('../modules/employee.js')
const depart=require('../modules/department.js')
const task=require('../modules/task.js')
const { validate: isUUID } = require("uuid");
exports.CreateAssignment = async (req, res) => {
    try {
        const { task_id, employee_id,department_id, completion_percentage, completed_at } = req.body
        if (!task_id|| !employee_id||!department_id||!completion_percentage||!completed_at) {
            return res.status(404).json({ message: 'fields are empty' })
        }
        const fenmployee=await emp.findById(employee_id)
        if(!fenmployee)
        {
            return res.status(404).json({message:'employee does not found'})
        }
        const fdepartment=await depart.findById(department_id)
        if(!fdepartment)
        {
             return res.status(404).json({message:'department does not found'})
        }
        const ftask=await task.findById(task_id)
        if(!ftask)
        {
            return res.status(404).json({message:'task does not found'})
        }
        const result = await modules.create({ task_id, employee_id,department_id, completion_percentage, completed_at })
        res.status(200).json({ message: 'assignment  is created', result })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}
exports.AllTask = async (req, res) => {
    try {
        const result = await modules.find().populate('task_id').populate('employee_id').populate('department_id')
        if (result.length === 0) {
            return res.status(404).json({ message: 'Assignments does not found' })
        }
        res.status(200).json({ message: 'all Assignments', result })

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
        const user = await modules.findById(id).populate('task_id').populate('employee_id').populate('department_id')
           console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'Assignment  does not found' })
        }
        res.status(200).json({ message: 'Assigement', user })

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
                message: "Assignment does not found"
            });
        }
        const result = await modules.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
        })
        if (!result) {
            return res.status(400).json({
                message: "Assignment cannot be updated"
            });
        }
        res.status(200).json({message:'updatedAssignment',result})
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
            return res.status(404).json({message:'Assignment is not formed'})

        }
        const result=await modules.findByIdAndDelete(id)
        if(!result)
        {
            return res.status(404).json({message:'Assignment cannot be deleted'})
        }
        res.status(200).json({message:'Assignment is deleted'})
    } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}