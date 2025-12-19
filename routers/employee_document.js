const express = require('express');
const multers = require('../middleware/documentupload.js')
const router = express.Router();
const employeeDocumentController = require('../controllers/employee_documents.js');
router.post('/upload', multers, employeeDocumentController.CreateEmployeeDocument).get('/alldocuments',employeeDocumentController.GetEmployeeDocuments).get('/alldocuments/:id',employeeDocumentController.GetEmployeeDocumentById).delete('/deletedocument/:id',employeeDocumentController.DeleteEmployeeDocument).patch('/updatedocument/:id',multers,employeeDocumentController.UpdateEmployeeDocument)
module.exports = router;