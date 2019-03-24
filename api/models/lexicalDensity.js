const fs = require('fs')

class LexicalDensity {

  constructor(sentences, query, words) {
    this._overallDensity = []
    this._sentenceDensities = []
    this._words = words
    this._query = query
    this._sentences = sentences.toLowerCase()
  }

  main() {
    return new Promise(function(resolve, reject) {
      resolve(this._calculateData())
    }.bind(this))
  }

  _calculateData() {
    this._parseSentences()
    this._calcOverallDensity()
    if (this._query === 'verbose') this._calcSentenceDensities()

    return { sentences: this._sentenceDensities, overall: this._overallDensity }
  }

  _calcOverallDensity(){
    let totalWordsArray = this._createWordsArray()

    let totals = this._findTotals(totalWordsArray)
    this._overallDensity = this._lexicalDensity(totals.totalWords, totals.totalLexicalWords)
  }

  _calcSentenceDensities() {
    this._sentencesArray.forEach((sentence) => {
      let totals = this._findTotals(sentence)
      this._sentenceDensities.push(this._lexicalDensity(totals.totalWords, totals.totalLexicalWords))
    })
  }

  _findTotals(array) {
    let totalWords = array.length
    let totalNonLexicalWords = this._checkNonLexical(array)
    let totalLexicalWords = totalWords - totalNonLexicalWords
    return { totalWords: totalWords, totalLexicalWords: totalLexicalWords}
  }

  _parseSentences() {
    this._sentencesArray = this._sentences.split(".")
    this._sentencesArray = this._parseSentenceArray()
  }

  _createWordsArray() {
    let totalWordsArray = [].concat.apply([], this._sentencesArray)
    return totalWordsArray
  }

  _parseSentenceArray() {
    let parsedSentenceArray = []
    this._sentencesArray.forEach((sentence) => {
      sentence = sentence.replace(/[.,\/#!£$%\^&\*;:{}=\-_`''~()0-9]/g, '').split(' ')
      sentence = sentence.filter((value, index, arr) => {
        return value !== ""
      })
      if (sentence.length > 0) parsedSentenceArray.push(sentence)
    })
    return parsedSentenceArray
  }

  _checkNonLexical(words) {
    let totalNonLexical = 0
    for (let i=0; i < words.length; i++) {
      for (let j=0; j < this._words.length; j++) {
        if (words[i] === this._words[j]) totalNonLexical ++
      }
    }
    return totalNonLexical
  }

  _lexicalDensity(totalWords, totalNonLexicalWords) {
    return Math.round((totalNonLexicalWords / totalWords) * 100) / 100
  }
}

module.exports = { LexicalDensity: LexicalDensity }
