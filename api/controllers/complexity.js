const lexicalDensity = require('../models/lexicalDensity')
const LexicalDensity = lexicalDensity.LexicalDensity

exports.complexity = ((req, res, next) => {

  let sentences = req.body.sentences
  let query = req.query.mode
  let lexicalDensity = new LexicalDensity(sentences, query);

  (async () => {
    try {
      let density = await lexicalDensity.executeDisplay()
      res.status(200).json( { data: { overall_density: density } })
    } catch(event) {
      res.status(500).json( { error: event.stack } )
    }
  })()
})
