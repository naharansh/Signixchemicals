const monogoose = require('mongoose');
const { Schema } = monogoose;
const { v4: uuidv4 } = require('uuid');
const employeeDocumentSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true

    },
    employee_id: {
        type: String,
        ref: "emps",
        required: true
    },
    document_type: {
        type: String,
        required: true,
        trim: true,
        enum: ["Aadhar", "PAN", "Offer Letter", "Resume"],
    },
    document_number: {
        type: String,
        trim: true,
        sparse: true // useful because not all documents have numbers
    },
     file_path: {
      type: String,
      required: true
    },
    uploaded_at: {
      type: Date,
      default: Date.now
    }



},{
    timestamps: false // uploaded_at is already handled
})
module.exports = monogoose.model('employee_documents', employeeDocumentSchema);