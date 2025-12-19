const mongoose=require('mongoose');
const {Schema}=mongoose;
const {v4:uuidv4}=require('uuid');

const attendanceSchema = new Schema({
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
    attendance_date:{
        type: Date,
        required: true,
        unique:true,
    
    },
    clock_in_time: {
      type: Date
    },

    clock_out_time: {
      type: Date
    },

    working_hours: {
      type: Number, // stored in HOURS (e.g., 8.5)
      default: 0,
      min: 0
    },
     status: {
      type: String,
      enum: ["Present", "Absent", "Half Day"],
      required: true,
      default: "Present"
    },

    created_at: {
      type: Date,
      default: Date.now
    }
},{
    timestamps: false
  })
  attendanceSchema.pre("save", function (next) {
  if (this.clock_in_time && this.clock_out_time) {
    const diffMs = this.clock_out_time - this.clock_in_time;
    this.working_hours = Math.max(0, diffMs / (1000 * 60 * 60));
  }

});

module.exports=mongoose.model('attendance',attendanceSchema);