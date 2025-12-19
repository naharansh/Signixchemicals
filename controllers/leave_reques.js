const LeaveRequest=require('../modules/leave_request.js')
const { validate: isUUID } = require("uuid");
exports.CreateLeaveRequest=async(req,res)=>{
    try{
        const {leave_name,max_days_per_year,is_paid}=req.body
        if(!leave_name||!max_days_per_year||!is_paid){
            return res.status(400).json({message:"All fields are required"})
    }
    const newleave=await LeaveRequest.create({
        leave_name,
        max_days_per_year,
        is_paid})
    return res.status(201).json({message:"Leave Request Created Successfully",newleave})
}catch(error){
    return res.status(500).json({message:"Internal Server Error",error:error.message})
}
}
exports.GetAllLeaveRequests=async(req,res)=>{
    try{
        const leaves=await LeaveRequest.find()
        if(leaves.length===0){
            return res.status(404).json({message:"No Leave Requests Found"})
        }
        return res.status(200).json(leaves)
    }catch(error){
        return res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}
exports.GetLeaveRequestById=async(req,res)=>{
    try{
        const {id}=req.params
           if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
        const leave=await LeaveRequest.findById(id)
        if(!leave){
            return res.status(404).json({message:"Leave Request Not Found"})
        }
        return res.status(200).json(leave)
}catch(error){
    return res.status(500).json({message:"Internal Server Error",error:error.message})
}
}
exports.DeleteLeaveRequest=async(req,res)=>{
    try{
        const {id}=req.params   
        if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const leave=await LeaveRequest.findById(id)
    if(!leave){
        return res.status(404).json({message:"Leave Request Not Found"})
    }
    const deletedLeave=await LeaveRequest.findByIdAndDelete(id)
    if(!deletedLeave){
        return res.status(500).json({message:"Failed to Delete Leave Request"})
    }
    return res.status(200).json({message:"Leave Request Deleted Successfully"})
}catch(error){
    return res.status(500).json({message:"Internal Server Error",error:error.message})
}
}
exports.UpdateLeaveRequest=async(req,res)=>{
    try{
        const {id}=req.params
        if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const findLeave=await LeaveRequest.findById(id)
    if(!findLeave){
        return res.status(404).json({message:"Leave Request Not Found"})
    }
    const updatedLeave=await LeaveRequest.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,context:'query'})
    if(!updatedLeave){
        return res.status(500).json({message:"Failed to Update Leave Request"})
    }
    return res.status(200).json({message:"Leave Request Updated Successfully",updatedLeave})
}catch(error){
    return res.status(500).json({message:"Internal Server Error",error:error.message})
}
}
// ========================= Leave Management Tables====