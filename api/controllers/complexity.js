let fs = require('fs')

exports.complexity = ((req, res) => {
  fs.readFile('./nonLexicalWords.txt', function(err, data) {
    if(err) throw err;
    let nonLexical = data.toString().split("\n");
    return res.status(200).json( { message: nonLexical })
  });
})
