const leads=require('../modules/lead')
const user=require('../modules/userlogin')
exports.CreateLeads=async (req,res) => {
    try {
        const {name,email,phone,source,assigned_to,created_by}=req.body
        if(!name||!email||!phone||!source||!assigned_to||!created_by)
        {
            return res.status(404).json({message:'All valeues are required'})
        }
        const data=await user.findById(assigned_to)
        if(!data)
        {
            return res.status(404).json({message:'user does not exist'})
        }
        const result=await leads.create({name:name,email:email,phone:phone,source:source,assigned_to:assigned_to,created_by:created_by})
       res.status(201).json({message:'lead is  generated',
        result})
    } catch (error) {
        res.status(500).json({message:'some error is occured',
       err:error.message })
    }
}
exports.GetLeads=async (req,res) => {
    try {
        const result= await leads.find().populate('assigned_to')
        if (result.length === 0) {
            return res.status(404).json({message:'leads are not found'})
        }
        res.status(200).json({message:'All Leads',result})

    } catch (error) {
         return res.status(500).json({message:'Some error is occured',err:error.message})
    }
}
exports.GetSingleLead=async (req,res) => {
        try {
            const id =req.params.id
            if(!id)
            {
                res.status(404).json({message:'id does not exist in the route'})
            }
            const result=await leads.findById(id).populate('assigned_to')
            if(!result)
            {
                res.status(404).json({message:'lead does not exist in the database'})
            }
            res.status(200).json({message:'the lead is',result})
        } catch (error) {
             res.status(500).json({message:'some error is occured',err:error.message})
        }     
}
exports.UpdateLead=async (req,res) => {
        try {
            const id =req.params.id
            if(!id)
            {
                res.status(404).json({message:'id does not exist in the route'})
            }
            const result=await leads.findById(id)
            if(!result)
            {
                res.status(404).json({message:'lead does not exist in the database'})
            }
            const updatedlead=await leads.findByIdAndUpdate(id,req.body,{
                new:true,
                runValidators:true,
                context: "query"
            
            })
            if(!updatedlead)
            {
                res.status(404).json({message:'lead cannot be updated'})
            }
            res.status(200).json({message:'updated lead',updatedlead})
        } catch (error) {
             res.status(500).json({message:'some error is occured',err:error.message})
        }     
}
exports.DeleteLead=async (req,res) => {
    try {
          const id =req.params.id
            if(!id)
            {
                res.status(404).json({message:'id does not exist in the route'})
            }
            const result=await leads.findById(id)
            if(!result)
            {
                res.status(404).json({message:'lead does not exist in the database'})
            }
            const updatedlead=await leads.findByIdAndDelete(id)
            if(!updatedlead)
            {
                res.status(404).json({message:'lead cannot be deleted'})
            }
            res.status(200).json({message:'lead is deleted'})
    } catch (error) {
        res.status(500).json({message:'some error is occured',err:error.message})
    }
    
}
