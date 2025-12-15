const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userTable = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
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
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role_id: {
        type: String,        
        required: true,
        index: true,
        ref: 'Role'     
    },
    department:{
         type: String,        
        required: true,
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
module.exports=mongoose.model('users',userTable)