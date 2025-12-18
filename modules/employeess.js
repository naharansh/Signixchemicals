const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const employee = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    employee_code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    first_name: {
        type: String,
        required: true,
        trim: true,
    },

    last_name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        trim: true
    },

    password_hash: {
        type: String,
        required: true
    },

    role_id: {
        type: String,
        ref: "roled",
        required: true
    },

    department_id: {
        type: String,
        ref: "e_departments",
        required: true
    },

    reporting_manager_id: {
        type: String,
        ref: "employee",
        default: null
    },

    date_of_joining: {
        type: Date,
        required: true
    },

    employment_type: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract"],
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Inactive", "Resigned"],
        default: "Active"
    }
},
    {
        timestamps: true // creates createdAt & updatedAt
    })
module.exports = mongoose.model('emp',employee)