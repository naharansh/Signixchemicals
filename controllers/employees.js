const bcrypt=require('bcrypt')
const modules=require('../modules/employeess')
exports.CreateEmployee=async (req,res) => {
    try {
        
        const{employee_code,first_name,last_name,email,mobile,password_hash,role_id,department_id,date_of_joining,employment_type}=req.body
        // console.log(password_hash)
        if(!employee_code || !first_name ||!last_name||!email||!mobile||!password_hash||!role_id||!department_id ||!date_of_joining||!employment_type)
        {
            return res.status(404).json({message:'fields are required'})
        }
        const user=await modules.find({employee_code})
        if(user)
        {
            return res.status(404).json({message:'employee exist in the database'})
        }
        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash("mypassword123", salt);
console.log(hashedPassword);

        const employees=await modules.create({employee_code,first_name,last_name,email,mobile,hashedPassword,role_id,department_id,date_of_joining,employment_type})
        res.status(200).json({message:'employee is created',employees})
    } catch (error) {
        res.status(500).json({message:'some error is occur',error:error.message})
    }
    
}