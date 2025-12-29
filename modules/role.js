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
 role_name: { type: String, required: true, trim: true },



    description: { type: String, default: "" },
    parentCategory: { type: String, ref: "depart", required: true },

    
},  

 {
    timestamps: true, // creates created_at & updated_at
    versionKey: false,
  })
  module.exports=mongoose.model('roled',Role)
