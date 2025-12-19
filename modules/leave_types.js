const mongoose=require('mongoose');
const {Schema}=mongoose;
const {v4:uuidv4}=require('uuid');
const leaveRequestSchema=new Schema({
       _id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    employee_id: {
        type: String,
        required: true,
        ref: 'emps'
    },
    leave_type: {
        type: String,
        required: true,
        ref: 'leave_requests'
    },
    from_date: {
        type: Date,
        required: true
    },
    to_date: {
        type: Date,
        required: true,
            
    },
    total_days:{
        type: Number,
        required: true,
        min:1,
    },
    reason:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum:['Pending','Approved','Rejected'],
        default:'Pending'
    },
    approved_by:{
        type: String,
        ref: 'emps' 
    },
appoved_at:{
        type: Date
    },



},{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
module.exports=mongoose.model('leave_types',leaveRequestSchema);