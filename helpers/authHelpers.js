const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: 'access'
  }
  const secret = config.get('ACCESS_TOKEN_SECRET')
  const options = { expiresIn: '20m' }

  return jwt.sign(payload, secret, options)
}

const generateRefreshToken = () => {
  const payload = {
    id: uuidv4(),
    type: 'refresh'
  }
  const secret = config.get('REFRESH_TOKEN_SECRET')
  const options = { expiresIn: '30d' }

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options)
  }
}

const replaceDbRefreshToken = (tokenId, userId) => {
  Token.findOneAndRemove({userId})
    .exec()
    .then(() => Token.create({ tokenId, userId }))
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken
}
