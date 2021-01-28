const express = require('express')
const User = require('../models/User')
const verifyJWT = require('../helpers/verify')

const router = express.Router();

router.post('/addToHistory', verifyJWT, async (req, res) => {
  try {
    const { userId } = req.user
    const stringSearch = req.body.stringSearch.toLowerCase()

    if (stringSearch === '' || stringSearch === 'null' || stringSearch === 'undefined') {
      throw new Error('Неверный формат строки поиска')
    }

    User.findOne(
      { _id: userId, history: stringSearch },
      (err, result) => {
        if (err) {
          throw new Error('Произошла ошибка')
        }
        if (!result){
          User.findByIdAndUpdate(
            userId,
            {$push: { history: stringSearch }},
            (err) => {
              if (err) { 
                throw new Error('Не добавлено в историю поиска')
              }
              res.status(200).json({ok:true})
            }
          )
        } else {
          res.status(200).json({ok:true})
        }
      }
    )
  } catch (e) {
    console.log("Ошибка - /addToHistory", e)
    res.status(500).json({ error: e.message })
  }
})

router.get('/getHistory', verifyJWT, async (req, res) => {
  try {
    const { userId } = req.user

    User.findById(
      userId,
      {history: 1, _id: 0},
      (err, result) => {
        if (err) { 
          throw new Error('История поиска не получена')
        }
        res.status(200).json(result.history.reverse())
      }
    )
  } catch (e) {
    console.log("Ошибка - /getHistory", e)
    res.status(500).json({ error: e.message })
  }
})

router.get('/removeHistory', verifyJWT, async (req, res) => {
  try {
    const { userId } = req.user

    User.findByIdAndUpdate(
      userId,
      { $set: {history: [null]} },
      (err) => {
        if (err) {
          throw new Error('Не удалось удалить историю поиска')
        }
        res.status(200).json({ ok: true })
      }
    )
  } catch (e) {
    console.log("Ошибка - /removeHistory", e)
    res.status(500).json({ error: e.message })
  }
})

module.exports = router