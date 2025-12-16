const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            unique: true
        },
        category_id: {
            type: String,
            ref: "categories",
            required: true
        },

        product_name: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        gst: {
            type: Number,
            required: true,
            min: 0,
            max: 100 // GST percentage
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: false
        }
    }
);

module.exports = mongoose.model("Product", productSchema);
