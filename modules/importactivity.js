const mongoose = require("mongoose");
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const history = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    file_name: {
        type: String,
        required: true,
        trim: true
    },
    imported_by: {
        type: String,
        required: true,
        ref: 'users',

    },
    total_records: {
        type: Number,
        required: true,
        min: 0
    }
},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: false
        }
    }
)
module.exports = mongoose.model('history', history)
