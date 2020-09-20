const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const todoRoutes = require('./routes/todos')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))

app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://user:user@cluster0.uiwkz.mongodb.net/todos',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()