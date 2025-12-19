const mongoose=require('mongoose');
const {Schema}=mongoose;
const {v4:uuidv4}=require('uuid');
const attendenceLogSchema = new Schema({
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
        attendance_id: {
      type:String,
      ref: "attendance",
      required: true,
      index: true
    },
       type: {
      type: String,
      enum: ["Clock In", "Clock Out"],
      required: true
    },
     time: {
      type: Date,
      required: true,
      default: Date.now
    },
      latitude: {
      type: Number,
      min: -90,
      max: 90
    },
longitude: {
      type: Number,
      min: -180,
      max: 180
    },
     address: {
      type: String,
      trim: true
    },
    device_info: {
      type: String,
      trim: true
    }           
},{
     timestamps: false
})
module.exports=mongoose.model('attendence_logs',attendenceLogSchema);