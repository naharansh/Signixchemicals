const express=require('express')
const controllers=require('../controllers/payment.js')
const router=express()
router.post('/createpayment',controllers.CreatePayment).get('/payments',controllers.GetPayments).get('/payment/:id',controllers.GetPayment).patch('/updatepayment/:id',controllers.UpdatePayment).delete('/deletepayment/:id',controllers.DeletePayment)
module.exports=router