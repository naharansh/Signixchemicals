const express= require('express');
const router=express.Router();
const leaveRequestController=require('../controllers/leave_types')
router.post('/create',leaveRequestController.CreateLeaveRequest).get('/all',leaveRequestController.GetAllLeaveRequests).get('/gettypes/:id',leaveRequestController.GetLeaveRequestById).delete('/delete/:id',leaveRequestController.DeleteLeaveRequest).patch('/update/:id',leaveRequestController.UpdateLeaveRequest)
module.exports=router;