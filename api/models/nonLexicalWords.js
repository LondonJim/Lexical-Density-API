const fs = require('fs')

class NonLexicalWords {

  constructor() {
    this.words = []
  }

  loadWords() {
    return new Promise(function(resolve, reject) {
      fs.readFile('./nonLexicalWords.txt', function(err, data) {
        if(err) {
          reject(err)
        } else {
          this.words = data.toString().split("\n")
          resolve(this.words)
        }
      }.bind(this))
    }.bind(this))
  }

}

module.exports = { NonLexicalWords: NonLexicalWords }
