const express= require('express');
const router=express.Router();
const leaveRequestController=require('../controllers/leave_balence')
router.post('/create',leaveRequestController.CreateLeaveRequest)
router.get('/all',leaveRequestController.GetAllLeaveBalences)
router.get('/getbalence/:id',leaveRequestController.GetLeaveBalenceById)
router.delete('/delete/:id',leaveRequestController.DeleteLeaveBalence)
router.patch('/update/:id',leaveRequestController.UpdateLeaveBalence)
module.exports=router;