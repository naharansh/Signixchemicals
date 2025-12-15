const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const permissions = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    permission_key: {
        type: String,
        unique: [true, "The permission key should be unique"],

    },
    description: {
        type: String,

    }
},{
    timestamps: true,
    versionKey: false,
    _id: false 
})
module.exports=mongoose.model('permission',permissions)
