import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
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

const UserModel = mongoose.model('users', User)

export default UserModel