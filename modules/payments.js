const mongoose = require("mongoose");
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const payments = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    payment_mode: {
        type: String,
        enum: ["Cash", "UPI", "Bank"],
        required: true
    },
    payment_date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["Paid", "Pending"],
        
    },
      order_id: {
      type: String,
      ref: "Order",
      required: true
    },
}, {
    timestamps: false
})
module.exports = mongoose.model("Payment",payments);
