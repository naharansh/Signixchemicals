const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const rolePermission = new Schema({
    _id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
     role_id: {
    type: String,
    required: true,
    ref: 'Role'            // Reference to Role model
  },
  permission_id: {
    type: String,
    required: true,
    ref: 'permission'      // Reference to Permission model
  }

},
      {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
)
rolePermission.index(
    {role_id: 1, permission_id: 1},
    { unique: true }
)
module.exports=mongoose.model('role_permission',rolePermission)