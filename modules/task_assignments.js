const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const task = Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    task_id: {
        type: String,
        ref: 'tasks',
        required: true,
    },
    employee_id: {
        type: String,
        ref: 'employee',
        required: true,
    },
    department_id: {
        type: String,
        ref: 'depart',
        required: true
    },
    completed_at: {
        type: Date
    },
    assigned_date: {
        type: Date,
        default: Date.now
    },
    completion_percentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },


}, {

    timestamps: false // we already have assigned_date and completed_at

})
module.exports = mongoose.model(' task_assignments', task)