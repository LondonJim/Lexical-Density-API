const express = require('express')
const router = express.Router()

const ComplexityController = require('../controllers/complexity')

router.post('/complexity', ComplexityController.complexity)

module.exports = router
