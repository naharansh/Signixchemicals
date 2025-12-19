const AttendenceLog=require('../modules/attendence_logs.js');
const attendance=require('../modules/attendance.js');
const emp=require('../modules/employeess.js');
const { validate: isUUID } = require("uuid");
exports.CreteAttendenceLog=async(req,res)=>{
    try{

        const{ employee_id,type,time,latitude,longitude,address,device_info,attendance_id}=req.body;
        if(!employee_id ||!type || !time ||!attendance_id)
        {
            return res.status(400).json({message:"Please provide all required fields"});
        }
        const attendanceRecord=await attendance.findById(attendance_id);
        if(!attendanceRecord){
            return res.status(404).json({message:"Attendance record not found"});
        }
        const checkEmp=await emp.findById(employee_id);
        if(!checkEmp){
            return res.status(404).json({message:"Employee not found"});
        }
        const newAttendenceLog= await AttendenceLog.create({employee_id,type,time,latitude,longitude,address,device_info,attendance_id})
        return res.status(201).json({message:"Attendence Log created successfully",data:newAttendenceLog});

        // const attendenceLogs
    }catch(error){
                return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.GetALLAttendenceLogs=async(req,res)=>{
    try{
        const allAttendenceLogs=await AttendenceLog.find().populate('employee_id');
        if(allAttendenceLogs.length===0){
            return res.status(404).json({message:"No attendence logs found"});
        }
        return res.status(200).json({message:"Attendence logs retrieved successfully",data:allAttendenceLogs});


    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.GetAttendenceLogById=async(req,res)=>{
    try{
        const {id}=req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid attendence log UUID"
            });
        }
        const attendenceLog=await AttendenceLog.findById(id)
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence log not found"});
        }
        return res.status(200).json({message:"Attendence log retrieved successfully",data:attendenceLog});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.UpdateAttendenceLog=async(req,res)=>{
    try{
        const {id}=req.params;  
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid attendence log UUID"
            });
        }
            const attendenceLog=await AttendenceLog.findById(id)
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence log not found"});
        }
        const updatedAttendenceLog=await AttendenceLog.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,context:'query'});
        if(!updatedAttendenceLog){
            return res.status(404).json({message:"Attendence log not found for update"});
        }
        return res.status(200).json({message:"Attendence log updated successfully",data:updatedAttendenceLog});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}
exports.DeleteAttendenceLog=async(req,res)=>{
    try{
        const {id}=req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid attendence log UUID"
            });
        }
        const attendenceLog=await AttendenceLog.findById(id)
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence log not found"});
        }
        await AttendenceLog.findByIdAndDelete(id);
        if(!attendenceLog){
            return res.status(404).json({message:"Attendence log could not be deleted"});
        }
        return res.status(200).json({message:"Attendence log deleted successfully"});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});
    }
}