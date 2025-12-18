const express=require('express')
const controllers=require('../controllers/e_department')
const router=express.Router()
router.post('/createedepartememt',controllers.CreateDepartment).get('/gete_department',controllers.GetDepartments).get('/getDepartment/:id',controllers.GetDepartment).patch('/updateDepartment/:id',controllers.UpdateDepartment).delete('/deleteDepartment/:id',controllers.DeleteDepartment)
module.exports=router