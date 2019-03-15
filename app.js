const express = require('express')
const app = express()

app.get('/complexity', (req, res) => {
  res.send("hello world")
})

module.exports = app
