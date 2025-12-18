const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const task = Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    start_date: {
        type: Date
    },
    due_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'overdue'],
        default: 'pending'
    },
    created_by: {
    type: String, 
    ref: 'employee',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
    dealer_id: {
    type:String, // FK reference to dealers collection
    ref: 'Dealers'
  },



}, {
    timestamps: false // we already have created_at, disable auto timestamps
})
module.exports=mongoose.model('tasks',task);