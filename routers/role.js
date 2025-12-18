const express=require('express')
const controllers=require('../controllers/roles')
const routers=express.Router()
routers.post('/createrole',controllers.CreateRole).get('/allroles',controllers.GetRoles).get(
    '/role/:id',controllers.GetRole).patch('/roles/:id',controllers.UpdateRole).delete('/delete/:id',controllers.DeleteRole)
module.exports=routers;