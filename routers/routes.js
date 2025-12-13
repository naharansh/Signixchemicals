const express=require('express')
const controllers=require('../controllers/controller.js')
const middleware=require('../middleware/authmiddleware.js')
const routers=express.Router()
routers.post('/login',controllers.UserLogin).post('/register',controllers.RegisterUser).post('/verify',controllers.VerfiyOTP)
module.exports=routers