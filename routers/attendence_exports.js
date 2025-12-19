const express=require('express')
const controllers=require('../controllers/attendance_exports.js')
const routers=express()
routers.post('/create',controllers.CreteAttendenceLog).get('/allattendences',controllers.GetALLAttendenceexports).get('/attendence/:id',controllers.GetAttendenceLogById).patch('/updateattendence/:id',controllers.UpdateAttendenceLog).delete('/deleteattendence/:id',controllers.DeleteAttendenceLog)
module.exports=routers