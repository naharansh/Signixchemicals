const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const roles = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true,
        required:true

    },
    role_name:{
        type:String,
        enum:['Manager','Sales','HR'],
        required:true
    },
    description:{
        type:String,

    },

},{ timestamps: { createdAt: true, updatedAt: false } })
module.exports=mongoose.model('Role',roles)