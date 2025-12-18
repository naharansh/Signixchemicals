const mongoose=require('mongoose')
const{Schema}=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const Role=new Schema({
    _id:{
        type: String,
        default: uuidv4,
        unique: true,
        required:true

    },
   role_name: {
    type: String,
    enum: ['Admin', 'HR', 'Manager'],
    required: true
},

    description:{
        type:String,

    }, 
    
},  {
    timestamps: true, // creates created_at & updated_at
    versionKey: false,
  })
  module.exports=mongoose.model('roled',Role)
