const express=require('express')
const controllers=require('../controllers/activitylogs.js')
const routers=express()
routers.post('/createactivity',controllers.CreateUser).get('/allactivity',controllers.GetUsers).get('/activity/:id',controllers.GetUser).patch('/updateActivities/:id',controllers.UpdateUser).delete('/deleteactivity/:id',controllers.Delete)
module.exports=routers 