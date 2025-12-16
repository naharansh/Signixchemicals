const express=require('express')
const controllers=require('../controllers/categories.js')
const routers=express()
routers.post('/createcategory',controllers.CreateCategories).get('/allcategories',controllers.GetCategories).get('/category/:id',controllers.GetCategory).patch('/updateCategories/:id',controllers.UpdateCategory).delete('/deletecategories/:id',controllers.DeleteCategory)
module.exports=routers