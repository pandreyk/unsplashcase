const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('config')

const PORT = process.env.PORT || 5000

const auth = require('./routes/auth')
const history = require('./routes/history')
const favorites = require('./routes/favorites')

const app = express()

app.use(cors({ 
  origin: config.get('corsOrigin')
 }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/auth", auth)
app.use("/history", history)
app.use("/favorites", favorites)

async function start() {
  try{
    await mongoose.connect(config.get("mongoUri")), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    }
    app.listen(PORT, () => console.log('started on port 5000'))
  } catch (e) {
    console.log('Server error\n', e.message)
    process.exit(1)
  }
}

start()