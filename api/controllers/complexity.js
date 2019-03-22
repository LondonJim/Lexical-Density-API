require('../models/nonLexicalWords')
const lexicalDensity = require('../models/lexicalDensity')

const LexicalDensity = lexicalDensity.LexicalDensity

exports.complexity = ((req, res, next) => {
  let lexicalDensity
  let words
  let density
  let sentences = req.body.sentences
  let query = req.query.mode;

  (async () => {
    try {
      words = await loadWords()
      lexicalDensity = new LexicalDensity(sentences, query, words)
      density = await lexicalDensity.main()
      if (query === 'verbose') {
        res.status(200).json( { data: { sentence_density: density.sentences, overall_density: density.overall } })
      } else {
        res.status(200).json( { data: { overall_density: density.overall } })
      }
    } catch(event) {
      res.status(500).json( { error: event.stack } )
    }
  })();
})
