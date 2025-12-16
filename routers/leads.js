const express=require('express')
const controllers=require('../controllers/leadcontroller')
const routers=express.Router()
routers.post('/createlead',controllers.CreateLeads).get('/getleads',controllers.GetLeads).get('/getlead/:id',controllers.GetSingleLead).patch('/updatelead/:id',controllers.UpdateLead).delete('/deleteLead/:id',controllers.DeleteLead)
module.exports=routers