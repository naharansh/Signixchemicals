const express=require('express')
const controllers=require('../controllers/controller.js')
const middleware=require('../middleware/authmiddleware.js')
const routers=express.Router()
routers.post('/login',controllers.UserLogin).post('/user',controllers.RegisterUser).post('/verifyOTP',controllers.VerfiyOTP).get('/getusers',controllers.Getusers).get('/users/:id',controllers.Getuser).patch('/update/:id',controllers.Updateuser).delete('/deleteuser/:id',controllers.Deleteuser)

module.exports=routers