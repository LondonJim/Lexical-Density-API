require('../models/nonLexicalWords')
const lexicalDensity = require('../models/lexicalDensity')

const LexicalDensity = lexicalDensity.LexicalDensity

exports.complexity = ((req, res, next) => {
  let sentences = req.body.sentences
  let query = req.query.mode;

  (async () => {
    try {
      let words = await loadWords()
      let lexicalDensity = new LexicalDensity(sentences, query, words)
      let density = await lexicalDensity.main()
      if (query === 'verbose') {
        res.status(200).json( { data: { sentence_density: density.sentences, overall_density: density.overall } })
      } else {
        res.status(200).json( { data: { overall_density: density.overall } })
      }
    } catch(event) {
      res.status(500).json( { error: 'Something went wrong' } )
    }
  })();
})
