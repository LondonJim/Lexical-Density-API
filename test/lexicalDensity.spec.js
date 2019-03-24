let lexicalDensity = require('../api/models/lexicalDensity')
let LexicalDensity = lexicalDensity.LexicalDensity
const expect = require('chai').expect

describe('.LexicalDensity', () => {

  beforeEach(() => {
    let sentences = "Kat likes going to the cinema. Jimmy enjoys listening to music."
    let query = 'verbose'
    let words = ['to', 'the']
    newLexicalDensity = new LexicalDensity(sentences, query, words)
  })

  describe('#main', () => {
    it('should return lexical density 0 - 1 for sentences/overall', async () => {
      let result = await newLexicalDensity.main()
      expect(result).to.deep.equal({ sentences: [0.67, 0.8], overall: 0.73 })
    })

    it('should return lexical density 0 - 1 only for overall', async () => {
      let sentences = "Kat likes going to the cinema. Jimmy enjoys listening to music."
      let query = ''
      let words = ['to', 'the']
      noQueryLexicalDensity = new LexicalDensity(sentences, query, words)

      let result = await noQueryLexicalDensity.main()
      expect(result).to.deep.equal({ sentences: [], overall: 0.73 })
    })
  })

})
