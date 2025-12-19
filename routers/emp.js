const express = require('express');
const controllers = require('../controllers/employees');
const router = express.Router();
router.post('/createEmployee', controllers.CreateEmployee)
    .get('/getAllEmployees', controllers.GetAllEmployees)
    .get('/getEmployee/:id', controllers.CreateEmployeeID)
    .patch('/updateEmployee/:id', controllers.UpdateEmployee)
    .delete('/deleteEmployee/:id', controllers.DeleteEmployee);
module.exports = router;