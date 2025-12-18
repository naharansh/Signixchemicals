const express=require('express')
const controllers=require('../controllers/dealers.js')
const router=express.Router()
router.post('/createdealer',controllers.CreateDealer).get('/delears',controllers.GetDealers).patch('/updatedelears/:id',controllers.UpdateDealers).get('/getdealer/:id',controllers.GetDealer).delete('/deletedealer/:id',controllers.DeleteDealers)
module.exports=router;