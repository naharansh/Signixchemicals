const express=require('express')
const controllers=require('../controllers/permissions_controllers')
const routers=express()
routers.post('/createpermission',controllers.CreatePermission).get('/Allpermission',controllers.GetAllPermission).get('/permission/:id',controllers.GetPermission).delete('/deletePermission/:id',controllers.DeletePermission).patch('/updatePermission/:id',controllers.UpdatePermission)
module.exports=routers