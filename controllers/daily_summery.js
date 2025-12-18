const modules=require('../modules/dailyTask')
const emp=require('../modules/employee')
const dealer=require('../modules/dealers')
exports.CreateSummery=async (req,res) => {
    try {
        const {summary_date,dealer_id,employee_id,totalTasks,pendingTasks,overdueTasks,completedTasks}=req.body
        if(!summary_date||!dealer_id||!employee_id||!totalTasks||!pendingTasks||!overdueTasks||!completedTasks)
        {
            return res.status(404).json({message:'cannot generate the reports'})
        }
        const fdepart=await dealer.findById(dealer_id)
        if(!fdepart)
        {
            return res.status(404).json({message:'dealer does not found'})
        }
        const emps=await emp.findById(employee_id)
           if(!emps)
        {
            return res.status(404).json({message:'employee does not found'})
        }
         const doc = new modules({
      summary_date ,
      dealer_id ,
      employee_id ,
      totalTasks ,
      pendingTasks,
      overdueTasks,
      completedTasks
    });

    await doc.save();

        res.status(200).json({message:'summery is created'})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    
}
exports.GenerateSummeries=async (req,res) => {
    try{
        const result=await modules.find()
        if(result.length === 0)
        {
            return res.status(404).json({message:'list of summery reports does not exist'})
        }
      res.status(200).json({message:'summery is generated',result})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}
exports.GenerateSummery=async (req,res) => {
    try{
          const{id}=req.params
                if(!id && !!isUUID(id))
                {
                    return res.status(404).json({message:'Invalid Id'})
                }
        const result=await modules.findById(id)
        if(!result)
        {
            return res.status(404).json({message:'summery reports does not exist'})
        }
      res.status(200).json({message:'summery is generated',result})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}
exports.UpdateSummery=async (req,res) => {
    try{
          const{id}=req.params
                if(!id && !!isUUID(id))
                {
                    return res.status(404).json({message:'Invalid Id'})
                }
        const result=await modules.findById(id)
        if(!result)
        {
            return res.status(404).json({message:'summery reports does not exist'})
        }
        const data=await modules.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
            context:'query'
        })
        if(!data)
        {
             return res.status(404).json({message:'summery record cannot be updated'})
        }
      res.status(200).json({message:'summery is generated',data})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}
exports.DeleteSummery=async (req,res) => {
    try{
          const{id}=req.params
                if(!id && !!isUUID(id))
                {
                    return res.status(404).json({message:'Invalid Id'})
                }
          const result=await modules.findById(id)
        if(!result)
        {
            return res.status(404).json({message:'summery reports does not exist'})
        }
        const data=await modules.findByIdAndDelete(id)
        if(!data)
        {
             return res.status(404).json({message:'summery record cannot be deleted'})
        }
      res.status(200).json({message:'summery is deleted'})

    } catch (error) {
          res.status(500).json({message:'some error is error',error:error.message})
    }    

}