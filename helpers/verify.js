const jwt = require('jsonwebtoken')
const config = require('config')

const verifyJWT =  (req, res, next) => {
  const accessToken = req.headers['x-access-token']
  
  if (!accessToken){
    res.send({ message: 'Need token' })
  } else {
    jwt.verify(accessToken, config.get('ACCESS_TOKEN_SECRET'), (err, user) => {
      if (err) {
        return res.send({ loggedIn: false, error: err.message })
      }
      req.user = user
      next()
    })
  }
}

module.exports = verifyJWT