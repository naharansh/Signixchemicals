const express=require('express')
const controllers=require('../controllers/controller.js')
const middleware=require('../middleware/authmiddleware.js')
const roles=require('../middleware/authrole.js')
const routers=express.Router()
routers.get('/data',middleware.userAuth,roles('admin'),controllers.testing)
module.exports=routers