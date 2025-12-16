const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const leadSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  name: {
    type: String,
    required: [true, "Lead name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [100, "Name must be less than 100 characters"],
    match: [/^[A-Za-z ]+$/, "Name can contain only letters and spaces"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: String,
    required: [true, "number is required"],
  },
  source:
  {
    type: String,
    required: [true, "number is required"],
    enum: {
      values: ["Website", "Call", "Excel", "Referral"],
      message: "Invalid lead source"
    }
  },
  status: {
    type: String,
    enum: {
      values: ["New", "Contacted", "Qualified", "Lost", "Converted"],
      message: "Invalid lead status"
    },
    default: "New"
  },
  assigned_to: {
    type: String,
    required: true,
    ref: 'users',
    validate: {
      validator: (v) => !v || uuidRegex.test(v),
      message: "Invalid UUID for assigned_to"
    }            // Reference to Role model
  },
  created_by: {
    type: String,
    required: true,
    validate: {
      validator: (v) => uuidRegex.test(v),
      message: "Invalid UUID for created_by"
    },
    ref: 'users'
  }
}, {
  timestamps: true,
  versionKey: false,
  _id: false
})
module.exports = mongoose.model("leads", leadSchema);
