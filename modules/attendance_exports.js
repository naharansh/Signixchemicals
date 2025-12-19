const mongoose = require("mongoose")
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');
const employeeLocationSchema = new Schema({
    _id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true

},
    exported_by: {
    type: String,
    required: true,
    ref: 'emps'
},
    from_date: {
    type: Date,
    required: true
},

    to_date: {
    type: Date,
    required: true
},

    file_path: {
    type: String,
    required: true
    // store only filename, e.g. "attendance_jan_2025.xlsx"
},

    exported_at: {
    type: Date,
    default: Date.now
}
}, {

    timestamps: true
})
module.exports = mongoose.model('attendance_exports', employeeLocationSchema);

