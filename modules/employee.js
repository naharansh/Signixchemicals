const mongoose=require('mongoose')
const{Schema}=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const Employee=new Schema({
    _id:{
         type: String,
        default: uuidv4,
        unique: true
    },
    name:{
       type:String,
       required:true,
       trim:true,
       minlength:2
    },
    email:{
        type:String,
       required:true,
       trim:true,
       minlength:2,
       unique:true
    },
    phone:{
         type:String,
       required:true,
       trim:true,
       minlength:2,
       maxlength:10,
       unique:true
    },
    role:{
        type:String,
        enum:['admin', 'manager', 'employee', 'sales'],
        default:'employee'
    },
    status:{
        type:String,
        enum:['active',' inactive'],
        default:'active'
    },
        dealer_id: {
      type: String, // UUID reference
      ref: "Dealers",
      required: true,
      index: true
    },

    department_id: {
      type: String, // UUID reference
      ref: "depart",
      required: true,
      index: true
    },
},{ createdAt: true, updatedAt: false }) 
module.exports=mongoose.model('employee',Employee)