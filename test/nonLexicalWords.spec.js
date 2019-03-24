require('../api/models/nonLexicalWords')
const expect = require('chai').expect

describe('#loadWords', () => {

  it('should return array of words from file', async () => {
    let filePath = "./test/testNonLexicalWords.txt"
    let words = await loadWords(filePath)
    expect(words).to.deep.equal(['to','the'])
  })

})
