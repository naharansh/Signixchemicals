const express=require('express')
const controllers=require('../controllers/groupscontrollers')
const routers=express()
routers.post('/createdepartment',controllers.CreateDepartment).get('/allDepartments',controllers.AllDepartments).get('/department/:id',controllers.Specificdepartments).patch('/updateDepartment/:id',controllers.UpdateDepartment).delete('/deleteDepartment/:id',controllers.DeleteDepartment)
module.exports=routers