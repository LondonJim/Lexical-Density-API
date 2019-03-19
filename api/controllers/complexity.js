const displayData = require('../models/complexity')
const DisplayData = displayData.DisplayData

exports.complexity = ((req, res) => {
  let display
  let sentences = req.body.sentences
  let query = req.query.mode
  let displayData = new DisplayData(sentences, query);
  (async () => {
    display = await displayData.executeDisplay()
    res.status(200).json( { data: { overall_density: display } })
  })()
})
