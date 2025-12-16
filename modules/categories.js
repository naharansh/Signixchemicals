const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const categories = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Inactive'],
            message: "Invalid  status"
        },
        default: "Active"
    },
    category_name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

}, {
    timestamps: true,
    versionKey: false,
    _id: false
})
module.exports=mongoose.model('categories',categories)