const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const orders = new Schema({
   _id: {
    type: String,
    default: uuidv4,
    unique: true
  },

    lead_id: {
        type: String,
        required: true,
        ref: 'leads',
        validate: {
            validator: (v) => !v || uuidRegex.test(v),
            message: "Invalid UUID for assigned_to"
        }            // Reference to Role model
    },
    order_status: {
        type: String,
        enum: ["Pending", "Processing", "Dispatched", "Delivered"],
        default: "Pending"
    },
    total_amount: {
        type: Number,
        required: true,
        min: 0

    },
    payment_status: {
        type: String,
        enum: ["Pending", "Paid", "Partial"],
        default: "Pending"
    },
    order_number: {
        type: String,
        unique: [true, 'order_number is unique'],
        required: true,
        trim: true

    },
    created_by: {
        type: String,
        required: true,
        ref: 'users',
        validate: {
            validator: (v) => !v || uuidRegex.test(v),
            message: "Invalid UUID for assigned_to"
        }            // 
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: false
    }

})
module.exports = mongoose.model('orders', orders)