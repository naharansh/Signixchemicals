const express = require('express')
const controllers = require('../controllers/employee')
const router = express.Router()
router.post('/createEmployee', controllers.CreateEmployee).get('/allemployees', controllers.AllEmployees).get('/employees/:id', controllers.Employee).patch('/updateemployees/:id', controllers.UpdateEmployee).delete('/deleteemployee/:id', controllers.DeleteEmployee)
module.exports = router