const { Schema, model } = require('mongoose')

const User = new Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: [{type: Object}],
  history: [{type: String}]
})

module.exports = model('User', User)