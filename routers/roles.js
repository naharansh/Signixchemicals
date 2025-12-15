const express = require('express')
const routers = express.Router()
const controllers = require('../controllers/role_controllers')
routers.post('/createrole', controllers.CreateRoles).get('/showroles', controllers.GetALLRoles).get('/role/:id', controllers.GetSingleRoles).delete('/deleterole/:id', controllers.DeleteRoles).patch(
    '/updaterole/:id', controllers.UpdateRoles
)
module.exports = routers