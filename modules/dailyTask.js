const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const dailySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4()
    },
    summary_date: {
        type: String,
        required: true,
        index: true
    },
    dealer_id: {
        type: String,
        required: true
    },
    employee_id: {
        type: String,
        required: true
    },
    totalTasks: {
        type: Number,
        required: true,
        min: 0
    },
    pendingTasks: {
        type: Number,
        required: true,
        min: 0
    },
    overdueTasks: {
        type: Number,
        required: true,
        min: 0
    },
    completedTasks: {
        type: Number,
        required: true,
        min: 0
    },
    completionRate: {
        type: Number,
        min: 0,
        max: 100
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: false
    }
});

dailySchema.pre('save', function () {
    this.completionRate =
        this.totalTasks > 0
            ? Number(((this.completedTasks / this.totalTasks) * 100).toFixed(2))
            : 0;
  
});

module.exports = mongoose.model('daily_task_summary', dailySchema);
