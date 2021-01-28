const { Schema, model } = require('mongoose')

const Token = new Schema({
  tokenId: String,
  userId: String
})

module.exports = model('Token', Token)