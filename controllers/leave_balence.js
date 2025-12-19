const LeaveRequest=require('../modules/leave_request.js')
const emp=require('../modules/employeess.js')
const { validate: isUUID } = require("uuid");
const LeaveBalence=require('../modules/leave_balences.js')
exports.CreateLeaveRequest = async (req, res) => {
    // Your implementation here
    try{
    const {employee_id, leave_type, total_days, used_leaves, year}=req.body;
    if(!employee_id || !leave_type || !total_days || used_leaves===undefined || !year){
        return res.status(400).json({message:"All fields are required"})
    }
    const empdata=await emp.findById(employee_id)
    if(!empdata){
        return res.status(404).json({message:"Employee not found"})
    }
    const leavedata=await LeaveRequest.findById(leave_type)
    if(!leavedata){
        return res.status(404).json({message:"Leave type not found"})
    }

    const leaveBalence = new LeaveBalence({
        employee_id,
        leave_type,
        total_days,
        used_leaves,
        year
    });

    await leaveBalence.save();
    res.status(201).json({message:"Leave balance created successfully", data:leaveBalence});
}catch(error){
    res.status(500).json({message:"Server Error", error:error.message});
}
}
exports.GetAllLeaveBalences = async (req, res) => {
    try{
    const leaveBalences = await LeaveBalence.find();
    if(leaveBalences.length===0){
        return res.status(404).json({message:"No leave balances found"})        

    }
    res.status(200).json({data:leaveBalences});
}catch(error){
    res.status(500).json({message:"Server Error", error:error.message});
}
}
exports.GetLeaveBalenceById = async (req, res) => {
    try{
    const {id}=req.params;  
     if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const leaveBalence = await LeaveBalence.findById(id);
    if(!leaveBalence){
        return res.status(404).json({message:"Leave balance not found"})        
    }
    res.status(200).json({data:leaveBalence});
    }catch(error){
        res.status(500).json({message:'some error is occured',error:error.message})
    }
}
exports.DeleteLeaveBalence = async (req, res) => {
    try{
    const {id}=req.params;
     if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const leaveBalence = await LeaveBalence.findById(id);
    if(!leaveBalence){
        return res.status(404).json({message:"Leave balance not found"})        
    }
    const deletedLeaveBalence = await LeaveBalence.findByIdAndDelete(id);
    if(!deletedLeaveBalence){
        return res.status(500).json({message:"Failed to delete leave balance"})        
    }
    res.status(200).json({message:"Leave balance deleted successfully"});
}catch(error){
    res.status(500).json({message:'some error is occured',error:error.message})
}
}
exports.UpdateLeaveBalence = async (req, res) => {
    try{
        const {id}=req.params;
       if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const leaveBalence = await LeaveBalence.findById(id);
    if(!leaveBalence){
        return res.status(404).json({message:"Leave balance not found"})        
    }
    const updatedLeaveBalence = await LeaveBalence.findByIdAndUpdate(id, req.body, {new:true,runValidators:true,context:'query'});
    if(!updatedLeaveBalence){
        return res.status(500).json({message:"Failed to update leave balance"})        
    }
    res.status(200).json({message:"Leave balance updated successfully", data:updatedLeaveBalence})
}catch(error){
    res.status(500).json({message:'some error is occured',error:error.message})
}
}