const LeaveRequest=require('../modules/leave_request.js')
const emp=require('../modules/employeess.js')
const { validate: isUUID } = require("uuid");
const modules=require('../modules/leave_types.js')
exports.CreateLeaveRequest = async (req, res) => {
    // Your implementation here
    try{
     
    const {employee_id, leave_type, from_date, to_date, total_days, reason,approved_by}=req.body;
    if(!employee_id || !leave_type || !from_date || !to_date || !total_days || !reason || !approved_by){
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
    const leaveRequest = await modules.create({employee_id, leave_type, from_date, to_date, total_days, reason,approved_by})
    await leaveRequest.save();
    res.status(201).json({message:"Leave request created successfully", data:leaveRequest});    
}catch(error){
    res.status(500).json({message:"Server Error", error:error.message});
}
}
exports.GetAllLeaveRequests = async (req, res) => {
    try{
    const leaveRequests = await modules.find();
    if(leaveRequests.length===0){
        return res.status(404).json({message:"No leave requests found"})
    }
    res.status(200).json({data:leaveRequests});
}catch(error){
    res.status(500).json({message:"Server Error", error:error.message});
}
}
exports.GetLeaveRequestById = async (req, res) => {
    try{
    const {id}=req.params;
        if (!id || !isUUID(id)) {  
        return res.status(400).json({  message: "Invalid department UUID"  });
        }
    const leaveRequest = await modules.findById(id);
    if(!leaveRequest){
        return res.status(404).json({message:"Leave request not found"})    
    }
    res.status(200).json({data:leaveRequest})
    }catch(error){
    res.status(500).json({message:"Server Error", error:error.message});
}
}
exports.DeleteLeaveRequest = async (req, res) => {
    try{
    const {id}=req.params;
        if (!id || !isUUID(id)) {  
        return res.status(400).json({  message: "Invalid department UUID"  });
        }
        const leaveRequest = await modules.findById(id);
    if(!leaveRequest){
        return res.status(404).json({message:"Leave request not found"})    
    }
    const leaveRequests = await modules.findByIdAndDelete(id);
    if(!leaveRequests){
        return res.status(404).json({message:"Leave request not found"})    
    }
    res.status(200).json({message:"Leave request deleted successfully"});
      }catch(error){
    res.status(500).json({message:"Server Error", error:error.message});

    }
}
exports.UpdateLeaveRequest = async (req, res) => {
    try{
    const {id}=req.params;
        if (!id || !isUUID(id)) {  
        return res.status(400).json({  message: "Invalid department UUID"  });
        }
        const leaveRequest = await modules.findById(id);
    if(!leaveRequest){
        return res.status(404).json({message:"Leave request not found"})    
    }
    const leaveRequests = await modules.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,context:'query'});
    if(!leaveRequests){
        return res.status(404).json({message:"Leave request not found"})    
    }
    res.status(200).json({message:"Leave request updated successfully"});
      }catch(error){
    res.status(500).json({message:"Server Error", error:error.message});

    }
}