const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const groups = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    group_name: {
        type: String,
        required: [true, 'group_name is requried'],
        unique: [true, 'group_name should be unique'],
        trim: true,
        match: [
            /^[A-Za-z ]+$/,
            "Group name can contain only letters and spaces"
        ],

    },
    description: {
        type: String,
        trim: true,
       
    }
},{ timestamps: { createdAt: true, updatedAt: false } })
module.exports=mongoose.model('Departments',groups)