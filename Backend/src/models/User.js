const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /.+@.+\..+/
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 80
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
})

module.exports = mongoose.model('User', UserSchema)
