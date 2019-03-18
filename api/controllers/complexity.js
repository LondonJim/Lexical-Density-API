let fs = require('fs')

exports.complexity = ((req, res) => {

  class DisplayData {

    constructor(req, res) {
      this.req = req
      this.res = res
      this.sentences = this.req.body.sentences
    }

    executeDisplay() {
      fs.readFile('./nonLexicalWords.txt', function(err, data) {
        if(err) throw err;
        let nonLexical = data.toString().split("\n");
        this.displayData(nonLexical)
      }.bind(this))
    }

    displayData(nonLexical) {
      let wordsArray = this.createWordsArray()
      let totalWords = wordsArray.length

      let totalNonLexicalWords = this.checkNonLexical(wordsArray, nonLexical)

      let totalLexicalWords = totalWords - totalNonLexicalWords
      let density = this.lexicalDensity(totalWords, totalLexicalWords)

      return this.res.status(200).json( { data: { overall_density: density } })
    }

    createWordsArray() {
      if (this.sentences[this.sentences.length - 1] === ".") this.sentences = this.sentences.slice(0, -1)
      let wordsArray = this.sentences.split(" ")
      return wordsArray
    }

    checkNonLexical(words, nonLexical) {
      let totalNonLexical = 0
      for (let i=0; i < words.length - 1; i++) {
        for (let j=0; j < nonLexical.length - 1; j++) {
          if (words[i] === nonLexical[j]) totalNonLexical ++
        }
      }
      return totalNonLexical
    }

    lexicalDensity(totalWords, totalNonLexicalWords) {
      return Math.round((totalNonLexicalWords / totalWords) * 100) / 100
    }
  }

  displayData = new DisplayData(req, res)
  displayData.executeDisplay()

})
