const express=require('express')
const controllers=require('../controllers/departement')
const router=express.Router()
router.post('/createdepartememt',controllers.CreateDepartment).get('/getdepartments',controllers.GetDepartments).get('/getDepartment/:id',controllers.GetDepartment).patch('/updateDepartment/:id',controllers.UpdateDepartment).delete('/deleteDepartment/:id',controllers.DeleteDepartment)
module.exports=router   