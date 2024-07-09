const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
  fullname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  dob: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: false
  },
  salary: {
    type: String,
    default: null
  },
  violation: {
    type: String,
    require: null
  },
  status: {
    type: String,
    enum: ['active', 'deactive'], 
    default: 'active' 
  },
  role: {
    type: String,
    enum: ['STAFF', 'MANAGER', 'ADMIN'], 
    default: 'STAFF' 
  },
  createBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, {
  timestamps: true
})

const User = mongoose.model('user', UserSchema)

module.exports = User;