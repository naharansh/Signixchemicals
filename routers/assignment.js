const express=require('express')
const controllers=require('../controllers/task_assigment')
const router=express.Router()
router.post('/createassignment',controllers.CreateAssignment).get('/assignments',controllers.AllTask).patch('/updateassignment/:id',controllers.UpdateTask).get('/getassignment/:id',controllers.Task).delete('/deleteassignment/:id',controllers.DeleteTask)
module.exports=router;