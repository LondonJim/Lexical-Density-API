const fs = require('fs')

class LexicalDensity {

  constructor(sentences, query, words) {
    this.overallDensity = []
    this.sentenceDensities = []
    this.words = words
    this.query = query
    this.sentences = sentences.toLowerCase()
  }

  main() {
    return new Promise(function(resolve, reject) {
      resolve(this.calculateData())
    }.bind(this))
  }

  calculateData() {
    this.parseSentences()
    this.calcOverallDensity()
    if (this.query === 'verbose') this.calcSentenceDensities()

    return { sentences: this.sentenceDensities, overall: this.overallDensity }
  }

  calcOverallDensity(){
    let totalWordsArray = this.createWordsArray()

    let totals = this.findTotals(totalWordsArray)
    this.overallDensity = this.lexicalDensity(totals.totalWords, totals.totalLexicalWords)
  }

  calcSentenceDensities() {
    this.sentencesArray.forEach((sentence) => {
      let totals = this.findTotals(sentence)
      this.sentenceDensities.push(this.lexicalDensity(totals.totalWords, totals.totalLexicalWords))
    })
  }

  findTotals(array) {
    let totalWords = array.length
    let totalNonLexicalWords = this.checkNonLexical(array)
    let totalLexicalWords = totalWords - totalNonLexicalWords
    return { totalWords: totalWords, totalLexicalWords: totalLexicalWords}
  }

  parseSentences() {
    this.sentencesArray = this.sentences.split(".")
    this.sentencesArray = this.parseSentenceArray()
  }

  createWordsArray() {
    let totalWordsArray = [].concat.apply([], this.sentencesArray)
    return totalWordsArray
  }

  parseSentenceArray() {
    let parsedSentenceArray = []
    this.sentencesArray.forEach((sentence) => {
      sentence = sentence.replace(/[.,\/#!£$%\^&\*;:{}=\-_`''~()0-9]/g, '').split(' ')
      sentence = sentence.filter((value, index, arr) => {
        return value !== ""
      })
      if (sentence.length > 0) parsedSentenceArray.push(sentence)
    })
    return parsedSentenceArray
  }

  checkNonLexical(words) {
    let totalNonLexical = 0
    for (let i=0; i < words.length; i++) {
      for (let j=0; j < this.words.length; j++) {
        if (words[i] === this.words[j]) totalNonLexical ++
      }
    }
    return totalNonLexical
  }

  lexicalDensity(totalWords, totalNonLexicalWords) {
    return Math.round((totalNonLexicalWords / totalWords) * 100) / 100
  }
}

module.exports = { LexicalDensity: LexicalDensity }
