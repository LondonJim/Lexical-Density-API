const express = require('express')
const app = express()

app.use(express.json())

app.post('/complexity', (req, res) => {
  return res.status(200).json( { data: req.body.sentences })
})

module.exports = app
