const fs = require('fs')

loadWords = (filePath) => {
  let nonLexicalWords
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(err, data) {
      if(err) {
        reject(err)
      } else {
        nonLexicalWords = resolve(data.toString().split("\n"))
        return nonLexicalWords
      }
    }.bind(this))
  }.bind(this))
}

module.exports = loadWords
