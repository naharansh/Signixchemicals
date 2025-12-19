const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');
const leaveRequestSchema = new Schema({
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
    total_days: {
        type: Number,
        required: true,
        min: 1
    },
    used_leaves: {
        type: Number,
        required: true,
        min: 0
    },
    remaining_leaves: {
        type: Number,
        min: 0
    },
    year: {
        type: Number,
        required: true,
    }

},
    {
        timestamps: false
    }
)
leaveRequestSchema.pre('save', function (next) {
  this.remaining_leaves = this.total_days - this.used_leaves;
 
});

// Optional: pre-update middleware
leaveRequestSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.used_leaves !== undefined && update.total_days !== undefined) {
    update.remaining_leaves = update.total_days - update.used_leaves;
    this.setUpdate(update);
  }
 
});

module.exports = mongoose.model('leave_balances', leaveRequestSchema);
