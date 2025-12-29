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
    companyName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    companyType: {
        type: String,
        required: true,
        trim: true,
    },

    sector: {
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },

    addressLine1: {
        type: String,
        required: true,

    },

    addressLine2: {
        type: String,
        required: true,
        trim: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,

    },

    country: {
        type: String,
        
    },

    primaryPhone: {
        type: String,
        minLength:[10,'check the number']

        },

    password: {
        type: String,
        required: true
    },
    secondaryPhone: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    website: {
        type: String,
        unique: true,
        required: true,
    },
    file_path:{
        type:String,
    }


},
    {
        timestamps: true // creates createdAt & updatedAt
    })
module.exports = mongoose.model('emps', employee)