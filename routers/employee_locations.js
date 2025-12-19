const express = require('express')
const router = express.Router();
const controllers=require('../controllers/employee_locations')
router.post('/create',controllers.CreateEmployeeLocation)
router.get('/getall',controllers.GetEmployeeLocations)
router.get('/getbyid/:id',controllers.GetEmployeeLocationById)
router.patch('/update/:id',controllers.UpdateEmployeeLocation)
router.delete('/delete/:id',controllers.DeleteEmployeeLocation)
module.exports=router;