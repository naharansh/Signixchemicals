const express=require('express')
const controllers=require('../controllers/products')
const routers=express()
routers.post('/createproduct',controllers.CreateProduct).get('/allproducts',controllers.GetProducts).get('/product/:id',controllers.GetProduct).patch('/updateproduct/:id',controllers.UpdateProduct).delete('/deleteproduct/:id',controllers.DeleteProduct)
module.exports=routers 