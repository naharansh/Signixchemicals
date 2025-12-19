const express = require('express');
const router=express.Router();
const leaveRequestController=require('../controllers/leave_reques.js')
router.post('/create',leaveRequestController.CreateLeaveRequest)
router.get('/all',leaveRequestController.GetAllLeaveRequests)
router.get('/getleave/:id',leaveRequestController.GetLeaveRequestById)
router.delete('/delete/:id',leaveRequestController.DeleteLeaveRequest)
router.patch('/update/:id',leaveRequestController.UpdateLeaveRequest)
module.exports=router;