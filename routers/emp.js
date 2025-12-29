const express = require('express');
const controllers = require('../controllers/employees');
const router = express.Router();
const uploads=require('../middleware/documentupload.js')
router.post('/createEmployee',uploads,controllers.CreateEmployee)
    .get('/getAllEmployees', controllers.GetAllEmployees)
    .get('/getEmployee/:id', controllers.CreateEmployeeID)
    .patch('/updateEmployee/:id',uploads, controllers.UpdateEmployee)
    .delete('/deleteEmployee/:id', controllers.DeleteEmployee);
module.exports = router;