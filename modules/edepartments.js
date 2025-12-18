const mongoose=require('mongoose')
const {Schema}=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const e_departments=Schema({
    _id:{
          type: String,
        default: uuidv4,
        unique: true,
        required:true
    },
    department_name:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    description:{
        type:String,
        
    }

}, {
    timestamps: true, // creates created_at & updated_at
    versionKey: false,
  })
  module.exports=mongoose.model('e_departments',e_departments)