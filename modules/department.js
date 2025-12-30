const mongoose=require('mongoose')
const{Schema}=require('mongoose')
const { v4: uuidv4 } = require('uuid');
const department= new mongoose.Schema({
     _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    department_name:{
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },

    description:{
        type:String,
        
    },
     subCategories: { type: String, ref: "roled" },
     status:{
        type:String,
        enum:['Active','inactive'],
        default:'Active'
     }
     



},{
     timestamps: true
})
module.exports=mongoose.model('depart',department)