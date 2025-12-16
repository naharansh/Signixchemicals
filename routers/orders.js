const express=require('express')
const controllers=require('../controllers/orders')
const routers=express.Router()
routers.post('/createorder',controllers.Createorders).get('/getorders',controllers.GetOrders).get('/getorder/:id',controllers.GetOrder).patch('/updateorder/:id',controllers.UpdateOrders).delete('/deleteorder/:id',controllers.DeleteOrders)
module.exports=routers