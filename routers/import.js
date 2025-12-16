const express=require('express')
const controllers=require('../controllers/importactivity')
const routers=express()
routers.post('/create',controllers.CreatePermission).get('/allhistory',controllers.GetAllPermission).get('/history/:id',controllers.GetPermission).patch('/updatehistory/:id',controllers.UpdatePermission).delete('/deletehistory/:id',controllers.DeletePermission)
module.exports=routers