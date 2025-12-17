const mongoose = require("mongoose");
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const order_item = new Schema({
  _id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  gst: {
    type: Number,
    required: true,
    min: 0
  },
  order_id: {
    type: String,
    required: true,
    ref: 'orders',
    
  },
    product_id: {
    type: String,
    required: true,
    ref: 'Product',
    
  }
}, {
  timestamps: false
})
module.exports = mongoose.model("OrderItem", order_item);