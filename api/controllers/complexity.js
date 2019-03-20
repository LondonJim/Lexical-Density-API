const lexicalDensity = require('../models/lexicalDensity')
const LexicalDensity = lexicalDensity.LexicalDensity

exports.complexity = ((req, res) => {
  let display
  let sentences = req.body.sentences
  let query = req.query.mode
  let lexicalDensity = new LexicalDensity(sentences, query);
  (async () => {
    await lexicalDensity.executeDisplay()
    res.status(200).json( { data: { overall_density: lexicalDensity.density } })
  })()
})
