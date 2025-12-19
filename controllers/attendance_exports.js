const AttendenceLog=require('../modules/attendance_exports.js');
const emp=require('../modules/employeess.js');
const { validate: isUUID } = require("uuid");
exports.CreteAttendenceLog=async(req,res)=>{
    try{
    
        const{exported_by,from_date,to_date,file_path,exported_at }=req.body;
        if(!exported_by||!from_date || !to_date ||!file_path ||!exported_at)
        {
            return res.status(400).json({message:"Please provide all required fields"});
        }
        
        const checkEmp=await emp.findById(exported_by);


        if(!checkEmp){
            return res.status(404).json({message:"Employee not found"});
        }
        const newAttendenceLog= await AttendenceLog.create({exported_by,from_date,to_date,file_path,exported_at})
        return res.status(201).json({message:"Attendence exports created successfully",data:newAttendenceLog});

        // const attendenceexports
    }catch(error){
                return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.GetALLAttendenceexports=async(req,res)=>{
    try{
        const allAttendenceexports=await AttendenceLog.find();
        if(allAttendenceexports.length===0){
            return res.status(404).json({message:"No attendence exports found"});
        }
        return res.status(200).json({message:"Attendence exports retrieved successfully",data:allAttendenceexports});


    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.GetAttendenceLogById=async(req,res)=>{
    try{
        const {id}=req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid attendence exports UUID"
            });
        }
        const attendenceLog=await AttendenceLog.findById(id)
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence exports not found"});
        }
        return res.status(200).json({message:"Attendence exports retrieved successfully",data:attendenceLog});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.UpdateAttendenceLog=async(req,res)=>{
    try{
        const {id}=req.params;  
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid attendence exports UUID"
            });
        }
            const attendenceLog=await AttendenceLog.findById(id)
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence exports not found"});
        }
        const updatedAttendenceLog=await AttendenceLog.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,context:'query'});
        if(!updatedAttendenceLog){
            return res.status(404).json({message:"Attendence exports not found for update"});
        }
        return res.status(200).json({message:"Attendence exports updated successfully",data:updatedAttendenceLog});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.DeleteAttendenceLog=async(req,res)=>{
    try{
        const {id}=req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid attendence exports UUID"
            });
        }
        const attendenceLog=await AttendenceLog.findById(id)
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence exports not found"});
        }
        await AttendenceLog.findByIdAndDelete(id);
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence exports could not be deleted"});
        }
        return res.status(200).json({message:"Attendence exports deleted successfully"});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}