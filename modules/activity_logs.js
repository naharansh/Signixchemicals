const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const activityLogs = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
     user_id: {
        type: String,
        required: true,
        ref: 'users',
    },
    action: {
        type: String,
        required: true,
        trim: true
    },
    module: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: false
    }
})
module.exports=mongoose.model('activitylogs',activityLogs)