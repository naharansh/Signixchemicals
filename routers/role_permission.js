const express = require('express')
const routers = express.Router()
const controllers = require('../controllers/role_permission')
routers.post('/createrole', controllers.CretePermission).get('/allrolepermission',controllers.GetAllRolePermission).get('/role_permission/:id',controllers.GetPermission).patch('/update_permission/:id',controllers.UpdatePermission).delete('/delete_permission/:id',controllers.DeletePermission)
module.exports = routers