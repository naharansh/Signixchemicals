const express = require('express')
const controllers = require('../controllers/order_item')
const routers = express.Router()
routers.post('/createorder_item', controllers.CreatePermission).get('/getorder_items', controllers.GetAllPermission).get('/getorder/:id', controllers.GetPermission).patch('/updateorder/:id', controllers.UpdatePermission).delete('/deleteorder/:id', controllers.DeletePermission)
module.exports = routers
