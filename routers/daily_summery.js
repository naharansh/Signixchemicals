const express=require('express')
const controllers=require('../controllers/daily_summery')
const routers=express.Router()
routers.post('/createdailysummery',controllers.CreateSummery).get('/dailySummery',controllers.GenerateSummeries).get('/task/:id',controllers.GenerateSummery).patch('/updateSummery/:id',controllers.UpdateSummery).delete('/deleteSummery/:id',controllers.DeleteSummery)  
module.exports=routers;
 