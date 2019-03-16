let fs = require('fs')

exports.complexity = ((req, res) => {
  let sentences = req.body.sentences

  fs.readFile('./nonLexicalWords.txt', function(err, data) {
    if(err) throw err;
    let nonLexical = data.toString().split("\n");
    displayData(nonLexical)
  })

  displayData = (nonLexical) => {
    let wordsArray = words()
    let totalWords = wordsArray.length
    let totalNonLexicalWords = checkNonLexical(wordsArray, nonLexical)
    let density = nonLexicalDensity(totalWords, totalNonLexicalWords)

    return res.status(200).json( { data: { overall_density: density } })
  }

  words = () => {
    if (sentences[sentences.length - 1] === ".") sentences = sentences.slice(0, -1)
    let wordsArray = sentences.split(" ")
    return wordsArray
  }

  checkNonLexical = (words, nonLexical) => {
    let totalNonLexical = 0
    for (let i=0; i < words.length - 1; i++) {
      for (let j=0; j < nonLexical.length - 1; j++) {
        if (words[i] === nonLexical[j]) totalNonLexical ++
      }
    }
    return totalNonLexical
  }

  nonLexicalDensity = (totalWords, totalNonLexicalWords) => {
    return Math.round((totalNonLexicalWords / totalWords) * 100) / 100
  }

})
