const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const delears = Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    dealer_name:{
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    contact_person:{
      type: String,
      trim: true,
      maxlength: 100
    },
    phone:{
       type: String,
      trim: true,
      maxlength: 20
    },
    email:{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 100,
      unique:true
    },
    address:{
        type: String
    },
    status:{
         type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true
    }
},{ timestamps: true })
module.exports=mongoose.model('Dealers',delears)