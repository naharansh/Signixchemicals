const express=require('express')
const controllers=require('../controllers/task_updates')
const routers=express.Router()
routers.post('/createtask',controllers.CreateUpdates).get('/tasklist',controllers.GetUpdates).get('/task/:id',controllers.GetUpdate).patch('/updatetask/:id',controllers.UpdateTasks).delete('/deletetask/:id',controllers.DeleteTask)  
module.exports=routers;
