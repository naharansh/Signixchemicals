const express=require('express')
const controllers=require('../controllers/task.js')
const routers=express.Router()
routers.post('/createtask',controllers.CreateTask).get('/alltask',controllers.AllTask).get('/task/:id',controllers.Task).patch('/updatetask/:id',controllers.UpdateTask).delete('/deletetask/:id',controllers.DeleteTask)
module.exports=routers