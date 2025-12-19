const express=require('express')
const router=express.Router();
const attendenceController=require('../controllers/attendence_logs')
router.post('/create',attendenceController.CreteAttendenceLog);
router.get('/all',attendenceController.GetALLAttendenceLogs);
router.get('/getattendance/:id',attendenceController.GetAttendenceLogById);
router.put('/update/:id',attendenceController.UpdateAttendenceLog).delete('/delete/:id',attendenceController.DeleteAttendenceLog);
module.exports=router;