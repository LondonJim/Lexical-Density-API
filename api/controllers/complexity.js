let fs = require('fs')

exports.complexity = ((req, res) => {
  let sentences = req.body.sentences

  fs.readFile('./nonLexicalWords.txt', function(err, data) {
    if(err) throw err;
    let nonLexical = data.toString().split("\n");
    displayData(nonLexical)
  })

  displayData = (nonLexical) => {
    return res.status(200).json( { list: nonLexical,
                                   sentence: sentences})
  }

})
