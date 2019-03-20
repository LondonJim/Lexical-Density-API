const fs = require('fs')

class LexicalDensity {

  constructor(sentences, query) {
    this.sentenceDensities = []
    this.query = query

    this.density = 0
    this.sentences = sentences.toLowerCase()
  }

  executeDisplay() {
    return new Promise(function(resolve, reject) {
      fs.readFile('./nonLexicalWords.txt', function(err, data) {
        if(err) throw err
        let nonLexical = data.toString().split("\n")
        this.checkQuery()
        resolve(this.displayData(nonLexical))
      }.bind(this))
    }.bind(this))
  }

  checkQuery() {
    if (this.query === 'verbose') {
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

    this.density = density

    return this.density
  }

  createWordsArray() {
    this.sentencesArray = this.sentences.split(".")
    if (this.sentencesArray[this.sentencesArray.length - 1] === "") this.sentencesArray.pop()
    let wordsArray = this.sentencesArray.join("")
    return wordsArray.split(" ")
  }

  checkNonLexical(words, nonLexical) {
    let totalNonLexical = 0
    for (let i=0; i < words.length; i++) {
      for (let j=0; j < nonLexical.length; j++) {
        if (words[i] === nonLexical[j]) totalNonLexical ++
      }
    }
    return totalNonLexical
  }

  lexicalDensity(totalWords, totalNonLexicalWords) {
    return Math.round((totalNonLexicalWords / totalWords) * 100) / 100
  }
}

module.exports = { LexicalDensity: LexicalDensity }
