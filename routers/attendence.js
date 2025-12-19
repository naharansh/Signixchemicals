const express=require('express')
const controllers=require('../controllers/attendence.js')
const routers=express()
routers.post('/create',controllers.CreteAttendance).get('/allattendences',controllers.GetALLAttendance).get('/attendence/:id',controllers.GetAttendanceById).patch('/updateattendence/:id',controllers.UpdateAttendance).delete('/deleteattendence/:id',controllers.DeleteAttendance)
module.exports=routers