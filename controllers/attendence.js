const emp=require('../modules/employeess.js');
const attendance=require('../modules/attendance.js');
const { validate: isUUID } = require("uuid");
exports.CreteAttendance=async(req,res)=>{
    try{
        const{employee_id,attendance_date,clock_in_time,clock_out_time,status}=req.body;
        if(!employee_id || !attendance_date||!clock_in_time||!clock_out_time||!status){
            return res.status(400).json({message:"Employee ID and Attendance Date are required"});
        }
        const checkEmp=await emp.findById(employee_id);
        if(!checkEmp){
            return res.status(404).json({message:"Employee not found"});
        }
        const existingAttendance=await attendance.findOne({attendance_date})
        if(existingAttendance){
            return res.status(409).json({message:"Attendance for this date already exists"});
        }
        const newAttendance= await attendance.create({employee_id,attendance_date,clock_in_time,clock_out_time,status})
        return res.status(201).json({message:"Attendance recorded successfully",data:newAttendance});       

    }catch(error){ 
              return res.status(500).json({message:"some error is occured",error:error.message});       
     }
}
exports.GetALLAttendance=async(req,res)=>{
    try{
        const allAttendance=await attendance.find().populate('employee_id');
        if(allAttendance.length===0){
            return res.status(404).json({message:"No attendance records found"});
        }
        return res.status(200).json({message:"Attendance records retrieved successfully",data:allAttendance});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});       
    }
}
exports.GetAttendanceById=async(req,res)=>{
    try{
        const {id}=req.params;
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const attendanceRecord=await attendance.findById(id).populate('employee_id');
        if(!attendanceRecord){
            return res.status(404).json({message:"Attendance record not found"});
        }
        return res.status(200).json({message:"Attendance record retrieved successfully",data:attendanceRecord});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});       
    }
}
exports.UpdateAttendance=async(req,res)=>{
    try{
        const {id}=req.params;  
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const attendanceRecord=await attendance.findById(id);
        if(!attendanceRecord){
            return res.status(404).json({message:"Attendance record not found"});
        }
        const updatedAttendance=await attendance.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,context:'query'});
        if(!updatedAttendance){
            return res.status(404).json({message:"Attendance record could not be updated"});
        }
        return res.status(200).json({message:"Attendance record updated successfully",data:updatedAttendance});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});       
    }
}
exports.DeleteAttendance=async(req,res)=>{
    try{
        const {id}=req.params;  
        if (!id || !isUUID(id)) {
            return res.status(400).json({
                message: "Invalid department UUID"
            });
        }
        const attendanceRecord=await attendance.findById(id);
        if(!attendanceRecord){
            return res.status(404).json({message:"Attendance record not found"});
        }
        await attendance.findByIdAndDelete(id);
        if(!attendanceRecord){
            return res.status(404).json({message:"Attendance record could not be deleted"});
        }
        return res.status(200).json({message:"Attendance record deleted successfully"});
    }catch(error){
        return res.status(500).json({message:"some error is occured",error:error.message});       
    }
}


