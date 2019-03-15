const express = require('express')
const app = express()

const complexityRoutes = require('./api/routes/complexity')

app.use(express.json())

app.post('/complexity', complexityRoutes)

module.exports = app
