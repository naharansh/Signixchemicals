const EmployeeDocument = require('../modules/employee_documents.js');
const emp = require('../modules/employeess.js')
const { validate: isUUID } = require("uuid");
const fs = require('fs');
const path = require('path');
exports.CreateEmployeeDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { employee_id, document_type, document_number } = req.body;

    // Check if employee exists
    const employee = await emp.findById(employee_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const newDocument = new EmployeeDocument({
      employee_id,
      document_type,
      document_number,
      file_path: req.file.filename // ⭐ FIX HERE
    });

    await newDocument.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      document: newDocument,
      file_url: `http://localhost:3000/uploads/${newDocument.file_path}`
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
exports.GetEmployeeDocuments = async (req, res) => {
  try {
    const documents = await EmployeeDocument.find();
    if (documents.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}
exports.GetEmployeeDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const document = await EmployeeDocument.findById(id);

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}
exports.DeleteEmployeeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ds")
    if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const document = await EmployeeDocument.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    const deletedocument = await EmployeeDocument.findByIdAndDelete(id);

    if (deletedocument.file_path) {
      const filePath = path.join(__dirname, '..', 'uploads', document.file_path);
      console.log(filePath)
      fs.unlink(filePath, (err) => {
        if (err) {
          throw err;
        }
      })
    }
    if (!deletedocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}
exports.UpdateEmployeeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !isUUID(id)) {
      return res.status(400).json({
        message: "Invalid department UUID"
      });
    }
    const UpdateEmployeeDocument = await EmployeeDocument.findById(id)
    if (!UpdateEmployeeDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    const updateddocument = await EmployeeDocument.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, extended: true })
    if (!updateddocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (req.file) {
      if (updateddocument.file_path) {
        const filename = path.join("./uploads", updateddocument.file_path);
        // ✅ DO NOT SEND RESPONSE HERE
        fs.unlink(filename, (err) => {
          if (err) console.log("File delete error:", err.message);
        });
      }
      req.body.file_path = req.file.filename;
    }
    res.status(200).json({ message: "Document updated successfully", updateddocument })

  } catch (ERROR) {
    CONSOLE.LOG(ERROR)
  }
}
