let fs = require('fs')

exports.complexity = ((req, res) => {

  class DisplayData {

    constructor(req, res) {
      this.req = req
      this.res = res
      this.sentenceDensities = []
      this.sentences = this.req.body.sentences.toLowerCase()
    }

    executeDisplay() {
      fs.readFile('./nonLexicalWords.txt', function(err, data) {
        if(err) throw err
        let nonLexical = data.toString().split("\n")
        this.checkQuery()
        this.displayData(nonLexical)
      }.bind(this))
    }

    checkQuery() {
      if (this.req.query.mode === 'verbose') {
        this.showSentenceDensities = true
      } else {
        this.showSentenceDensities = false
      }
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
      this.sentencesArray = this.sentences.split(".")
      if (this.sentencesArray[this.sentencesArray.length - 1] === "") this.sentencesArray.pop()
      let wordsArray = this.sentencesArray.join("")
      return wordsArray.split(" ")
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
