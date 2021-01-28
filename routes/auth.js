const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const Token = require('../models/Token')
const authHelpers = require('../helpers/authHelpers')
 
const router = express.Router()

const updateTokens = (userId) => {
  const accessToken = authHelpers.generateAccessToken(userId)
  const refreshToken = authHelpers.generateRefreshToken()

  authHelpers.replaceDbRefreshToken(refreshToken.id, userId)

  return { accessToken, refreshToken : refreshToken.token }
}

router.post('/signUp', async (req, res) => {
  try {
    const { login, password } = req.body

    const candidate = await User.findOne({ login })
    if(candidate){
      throw new Error('Такой пользователь уже существует')
    }
    
    const hashedPassword = await bcrypt.hash(password, 14)

    const user = new User({ login, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'Пользователь создан!' })
  } catch (e) {
    console.log("Ошибка - /signUp", e)
    res.status(500).json({ error: e.message})
  }
})

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body

    const user = await User.findOne({ login })

    if (!user){
      throw new Error('Такого пользователя не существует')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
      throw new Error('Неверный пароль')
    }

    const tokens = updateTokens(user.id)
    res.status(200).json({tokens, message: 'Вы успешно вошли!'})
  } catch (e) {
    console.log("Ошибка - /login", e)
    res.status(500).json({ error: e.message})
  }
})

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body
    
    let payload = jwt.verify(refreshToken, config.get('REFRESH_TOKEN_SECRET'))
    const token = await Token.findOne({ tokenId: payload.id})

    if (token === null) {
      throw new Error('Invalid token!')
    }

    const newTokens = updateTokens(token.userId)    
    res.status(200).json(newTokens)
  } catch (e) {
    console.log("Ошибка - /tokens", e)
    res.status(500).json({ error: e.message})
  }
})

module.exports = router