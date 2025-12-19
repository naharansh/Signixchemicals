const roles=require('../modules/role.js')
const { validate: isUUID } = require("uuid");
exports.CreateRole=async (req,res) => {
    try {
        const{role_name,
            description
        }=req.body
                if(!role_name)
        {
            return res.status(404).json({message:'fields are required'})
        }
        const user=await roles.findOne({role_name})
       
        if(user)
        {
            return res.status(404).json({message:'role exist in the database'})
        }
        const roless=await roles.create({role_name,description})
        res.status(200).json({message:'role is created',roless})
    } catch (error) {
        console.log(error)
         res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.GetRoles=async (req,res) => {
    try{
        const result=await roles.find()
        if(result.length === 0)
        {
            return res.status(404).json({message:'roles does not exist'})
        }
        res.status(200).json({message:'all roles',result})
    }catch(error)
    {
        return res.status(500).json({message:"some error is occured",error:error.message})
    }
}
exports.GetRoles=async (req,res) => {
    try{
        const result=await roles.find()
        if(result.length === 0)
        {
            return res.status(404).json({message:'roles does not exist'})
        }
        res.status(200).json({message:'all roles',result})
    }catch(error)
    {
        return res.status(500).json({message:"some error is occured",error:error.message})
    }
}
exports.GetRole=async (req,res) => {
    try {
        const {id}=req.params
          if (!id || !isUUID(id)) {
                  
                    return res.status(400).json({
                        message: "Invalid department UUID"
                    });
                }
                const role=await roles.findById(id)
                if(!role)
                {
                    return res.status(404).json({message:'role does not found'})
                }
                res.status(200).json({message:'role is found',role})

    } catch (error) {
         res.status(200).json({message:'role is found',error:error.message})
    } 
}
exports.UpdateRole=async (req,res) => {
    try {
        const {id}=req.params
          if (!id || !isUUID(id)) {
                  
                    return res.status(400).json({
                        message: "Invalid department UUID"
                    });
                }
                const frole=await roles.findById(id)
                if(!frole)
                {
                    return res.status(404).json({message:'role does not found'})
                }
                const role=await roles.findByIdAndUpdate(id,req.body,{
                    new:true,
                    runValidators:true,
                    context:"query"
                })

                res.status(200).json({message:'role is found',role})

    } catch (error) {
         res.status(200).json({message:'role is found',error:error.message})
    } 
}
exports.DeleteRole=async (req,res) => {
    try {
        const {id}=req.params
          if (!id || !isUUID(id)) {
                  
                    return res.status(400).json({
                        message: "Invalid department UUID"
                    });
                }
                const frole=await roles.findById(id)
                if(!frole)
                {
                    return res.status(404).json({message:'role does not found'})
                }
                const role=await roles.findByIdAndDelete(id)

                res.status(200).json({message:'role is deleted'})

    } catch (error) {
         res.status(200).json({message:'role is found',error:error.message})
    } 
}
