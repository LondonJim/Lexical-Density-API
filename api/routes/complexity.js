const express = require('express')
const router = express.Router()

router.post('/complexity', (req, res) => {
  return res.status(200).json( { data: req.body.sentences })
})

module.exports = router
