const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { isUUID } = require('validator');
const { v4: uuidv4 } = require('uuid');
const LeaveRequestSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  leave_name: {
    type: String,
    enum: ["CL", "SL", "PL", "LOP"],
    required: true,
    unique: true,
    trim: true
  },
  max_days_per_year: {
    type: Number,
    required: true,
    min: 0
  },
  is_paid: {
    type: Boolean,
    required: true,
  },


  created_at: {
    type: Date,
    default: Date.now()
  }


}, {
  timestamps: false
})
module.exports = mongoose.model('leave_requests', LeaveRequestSchema);