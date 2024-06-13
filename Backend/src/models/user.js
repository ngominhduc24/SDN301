import mongoose from 'mongoose'
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
    default: null
  },
}, {
  timestamps: true
})

const User = mongoose.model('user', UserSchema)

module.exports = User;