const modules=require('../modules/employee')
const employee=require('../modules/dealers.js')
const depart=require('../modules/department.js')
const { validate: isUUID } = require("uuid");
exports.CreateEmployee=async (req,res) => {
    try {
        const {name,email,phone,dealer_id,department_id}=req.body
        if(!name||!email||!phone||!dealer_id||!department_id)
        {
            return res.status(404).json({message:'fields are requried'})
        }
        const fdepart=await depart.findById(department_id)
        if(!fdepart)
        {
            return res.status(404).json({message:'department does not find'})
        }
         const fdelear=await employee.findById(dealer_id)
        if(!fdelear)
        {
            return res.status(404).json({message:'delear  does not find'})
        }
        const  exist= await  modules.findOne({name})
        if(exist)
            {
                return res.status(404).json({message:'employee exists in the database '})
            }                  
            const employee=await modules.create({name,email,phone,dealer_id,department_id})
            res.status(200).json({message:'employee is created',employee})

    } catch (error) {
         res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.AllEmployees=async (req,res) => {
    try {
        const result=await modules.find().populate('department_id').populate('dealer_id')
        if(result.length === 0)
        {
            return res.status(404).json({message:'employees does not exist'})
        }
         res.status(404).json({message:'employeess',result})
    } catch (error) {
            return res.status(404).json({message:'some error is occur',error:error.message})
    }
}
exports.Employee=async (req,res) => {
    try {
          const { id } = req.params
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const user =await modules.findById(id).populate('department_id').populate('dealer_id')
        if(!user)
        {
            return res.status(404).json({message:'employee  does not found'})
        }
        res.status(200).json({message:'employee is found ',user})


    } catch (error) {
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.UpdateEmployee=async (req,res) => {
    try {
        const {id}=req.params
        if(!id || !isUUID(id))
        {
            return res.status(400).json({message:"Invalid department UUID"})
        }
        const user =await modules.findById(id)
        if(!user)
        {
            return res.status(404).json({message:'employee  does not found'})
        }
        const employee=await modules.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
            context:'query'
        })
        if(!employee)
        {
             return res.status(404).json({message:'employee does not updated'})
        }
        res.status(200).json({message:'updated employee',employee})
    } catch (error) {
        
        res.status(500).json({message:'Some error occured',error:error.message})
    }
}
exports.DeleteEmployee=async (req,res) => {
    try {
        const {id}=req.params
        if(!id || !isUUID(id))
        {
            return res.status(400).json({message:"Invalid department UUID"})
        }
        const user =await modules.findById(id)
        if(!user)
        {
            return res.status(404).json({message:'employee  does not found'})
        }
        const employee=await modules.findByIdAndDelete(id)
        if(!employee)
        {
             return res.status(404).json({message:'employee does not deleted'})
        }
        res.status(200).json({message:'deleted employee'})
    } catch (error) {
        
        res.status(500).json({message:'Some error occured',error:error.message})
    }
}
