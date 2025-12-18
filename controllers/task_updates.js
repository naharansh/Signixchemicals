const task=require('../modules/task.js')
const employee=require('../modules/employee.js')
const updates=require('../modules/task_updates.js')
exports.CreateUpdates=async (req,res) => {
    try {
      
        const {
            task_id,
            employee_id,
            update_note,
            completionPercentage
        } = req.body;

        if (
            !task_id ||
            !employee_id ||
            !update_note ||
            completionPercentage === undefined
        ) {
            return res.status(400).json({ message: "fields are required" });
        }

        const ftask = await task.findById(task_id);
        if (!ftask) {
            return res.status(404).json({ message: "task not found" });
        }

        const etask = await employee.findById(employee_id);
        if (!etask) {
            return res.status(404).json({ message: "employee not found" });
        }

        const result = await updates.create({
            task_id,
            employee_id,
            update_note,
            completionPercentage
        });

        res.status(201).json({
            message: "task updated successfully",
            result
        });
    } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }    
}
exports.GetUpdates=async (req,res) => {
    try{
        const result=await updates.find()
        if(result.length === 0)
        {
            return res.status(404).json({message:'list of updated task does not exist'})
        }
      res.status(200).json({message:'list of updated task ',result})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}
exports.GetUpdate=async (req,res) => {
    try{
          const{id}=req.params
                if(!id && !!isUUID(id))
                {
                    return res.status(404).json({message:'Invalid Id'})
                }
        const result=await updates.findById(id)
        if(!result)
        {
            return res.status(404).json({message:'task update does not exist'})
        }
      res.status(200).json({message:'task is updated',result})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}
exports.UpdateTasks=async (req,res) => {
    try{
          const{id}=req.params
                if(!id && !!isUUID(id))
                {
                    return res.status(404).json({message:'Invalid Id'})
                }
        const result=await updates.findById(id)
        if(!result)
        {
            return res.status(404).json({message:'update list does not exist'})
        }
        const data=await updates.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
            context:'query'
        })
        if(!data)
        {
             return res.status(404).json({message:'task_update cannot be updated'})
        }
      res.status(200).json({message:'task_update is generated',data})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}
exports.DeleteTask=async (req,res) => {
    try{
          const{id}=req.params
                if(!id && !!isUUID(id))
                {
                    return res.status(404).json({message:'Invalid Id'})
                }
          const result=await updates.findById(id)
        if(!result)
        {
            return res.status(404).json({message:'summery reports does not exist'})
        }
        const data=await updates.findByIdAndDelete(id)
        if(!data)
        {
             return res.status(404).json({message:'task-update cannot be deleted'})
        }
      res.status(200).json({message:'task-update  is deleted'})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}