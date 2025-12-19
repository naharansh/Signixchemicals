const mongoose=require('mongoose');
const {Schema}=mongoose;
const {v4:uuidv4}=require('uuid');
const employeeLocationSchema=new Schema({
    _id:{
       type: String,
        default: uuidv4,
        unique: true,
        required: true

    },
    employee_id:{
        type: String,
        required: true,
        ref: 'emps'
    },
    latitude:{
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude:{
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    radius_meter:{
        type: Number,
        required: true,
        min: 0,
    
    }
},{
    timestamps: true
})
module.exports=mongoose.model('employee_locations',employeeLocationSchema);