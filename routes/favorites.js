const express = require('express')
const User = require('../models/User')
const verifyJWT = require('../helpers/verify')

const router = express.Router()

router.post('/addOrRemoveFavorites', verifyJWT, async (req, res) => {
  try {
    const { userId } = req.user
    const { photo, saved } = req.body

    if (saved) {
      User.findByIdAndUpdate(
        userId,
        {$pull: { favorites: {id: photo.id} }},
        (err) => {
          if (err) {
            throw new Error('При удалении из избранного произошла ошибка')
          } 
          res.status(200).json({ saved: false, message: 'Удалено из избранного!' })
        }
      )
    } else {
      User.findByIdAndUpdate(
        userId,
        {$push: {favorites: photo }},
        (err) => {
          if(err){
            throw new Error('При добавлении в избранное произошла ошибка') 
          }
          res.status(201).json({ message: 'Добавлено в избранное!', saved: true })
        }
      )
    }
  } catch (e) {
      console.log("Ошибка - /addOrRemoveFavorites", e)
      res.status(500).json({ error: e.message })
  }
})

router.get('/getFavorites', verifyJWT, async (req, res) => {     
  try {
    const { userId } = req.user

    User.findById(
      userId,
      {favorites: 1, _id: 0},
      (err, result) => {
        if (err) { 
          throw new Error('Избранные не получены')
        } 
        res.status(200).json(result.favorites.reverse())
      }
    )
  } catch (e) {
    console.log("Ошибка - /getFavorites", e)
    res.status(500).json({ error: e.message })
  }
})

router.post('/getSaved', verifyJWT, async (req, res) => {
  try {
    const { userId } = req.user
    const { id } = req.body

    User.findOne(
      { _id: userId, 'favorites.id': id },
      (err, result) => {
        if (err) {
          throw new Error('Произошла ошибка')
        }

        if (result) {
          res.status(200).json({isSaved: true})
        } else {
          res.status(200).json({isSaved: false})
        }
      }
    )
  } catch (e) {
    console.log("Ошибка - /saved", e)
    res.status(500).json({ error: e.message })
  }
})

module.exports = router