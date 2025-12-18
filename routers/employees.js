const express=require('express')
const controllers=require('../controllers/employees')
const routers=express.Router()
routers.post('/createemp',controllers.CreateEmployee)
module.exports=routers;