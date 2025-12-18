const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const update_task = Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    task_id: {
        type: String,
        required: true,
        ref: 'tasks',
    },
    employee_id:{
          type: String,
        required: true,
        ref: 'employee',
    },
     update_note: {
      type: String,
      trim: true,
      maxlength: 1000
    },

    completionPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
},{
    timestamps: {
      createdAt: "createdAt",
      updatedAt: false
    }
})
module.exports=mongoose.model('task_updates',update_task)