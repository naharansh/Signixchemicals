const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userTable = new Schema({
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
    date_of_joining: {
        type: Date,
        required: true
    },

    employment_type: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract"],
        // required: true
    },

    status: {
        type: String,
        enum: ["Active", "Inactive", "Resigned"],
        default: "Active"
    },
    email: {
        type: String,
        unique: true,
        required: true,
        true: true,
        index: true
    },
    phone: {
        type: String,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role_id: {
        type: String,

        index: true,
        ref: 'Role'
    },
    department: {
        type: String,

        index: true,
        ref: 'Departments'
    },
    last_login: {
        type: Date,
        default: undefined
    },
    otp: {
        type: String,
        default: undefined
    },
    otp_expiry: {
        type: Date,
        default: undefined
    }

}, {
    timestamps: true,
    versionKey: false,
    _id: false
})
module.exports = mongoose.model('users', userTable)